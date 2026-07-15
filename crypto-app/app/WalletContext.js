"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

// Per-user wallet + order execution.
// New accounts start with a real (empty) 0 balance. Users fund via deposit().
// ── REAL-TRADING HOOK ────────────────────────────────────────────────
// Replace placeOrder()/deposit() with authenticated calls to your exchange,
// and hydrate balances/holdings from the account API instead of localStorage.
// ─────────────────────────────────────────────────────────────────────

const WalletContext = createContext(null);
const EMPTY = { usdt: 0, deposited: 0, holdings: {}, orders: [] };

function keyFor(user) {
  return user ? `nexa_wallet_${user.email}` : "nexa_wallet_guest";
}

export function WalletProvider({ children }) {
  const { user, ready: authReady } = useAuth();
  const [wallet, setWallet] = useState(EMPTY);
  const [ready, setReady] = useState(false);

  // Load the wallet for the current user whenever auth state changes.
  useEffect(() => {
    if (!authReady) return;
    try {
      const saved = localStorage.getItem(keyFor(user));
      setWallet(saved ? JSON.parse(saved) : EMPTY);
    } catch {
      setWallet(EMPTY);
    }
    setReady(true);
  }, [user, authReady]);

  useEffect(() => {
    if (ready) localStorage.setItem(keyFor(user), JSON.stringify(wallet));
  }, [wallet, ready, user]);

  function deposit(amount) {
    const amt = Number(amount);
    if (!amt || amt <= 0) return { ok: false, error: "Enter a valid amount" };
    setWallet((w) => ({
      ...w,
      usdt: w.usdt + amt,
      deposited: (w.deposited || 0) + amt,
    }));
    return { ok: true };
  }

  function placeOrder({ side, coin, symbol, price, amount }) {
    const cost = price * amount;
    if (side === "buy") {
      if (cost > wallet.usdt) return { ok: false, error: "Insufficient USDT balance" };
      setWallet((w) => ({
        ...w,
        usdt: w.usdt - cost,
        holdings: { ...w.holdings, [coin]: (w.holdings[coin] || 0) + amount },
        orders: [order(side, symbol, price, amount, cost), ...w.orders].slice(0, 50),
      }));
      return { ok: true };
    } else {
      const held = wallet.holdings[coin] || 0;
      if (amount > held) return { ok: false, error: `Insufficient ${symbol} balance` };
      setWallet((w) => ({
        ...w,
        usdt: w.usdt + cost,
        holdings: { ...w.holdings, [coin]: held - amount },
        orders: [order(side, symbol, price, amount, cost), ...w.orders].slice(0, 50),
      }));
      return { ok: true };
    }
  }

  function reset() {
    setWallet(EMPTY);
  }

  return (
    <WalletContext.Provider value={{ wallet, ready, deposit, placeOrder, reset }}>
      {children}
    </WalletContext.Provider>
  );
}

function order(side, symbol, price, amount, cost) {
  return {
    id: Math.round(cost * 1000) + "-" + amount + "-" + side + symbol,
    side,
    symbol,
    price,
    amount,
    cost,
    status: "Filled",
    time: new Date().toISOString(),
  };
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within WalletProvider");
  return ctx;
}
