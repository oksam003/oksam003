"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Simulated wallet + order execution.
// ── REAL-TRADING HOOK ────────────────────────────────────────────────
// Replace placeOrder() with an authenticated call to your exchange's
// order endpoint, and hydrate balances/holdings from the account API
// instead of localStorage.
// ─────────────────────────────────────────────────────────────────────

const WalletContext = createContext(null);
const STORAGE_KEY = "bybit_clone_wallet_v1";
const START_BALANCE = 100000; // demo USDT

export function WalletProvider({ children }) {
  const [wallet, setWallet] = useState({ usdt: START_BALANCE, holdings: {}, orders: [] });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setWallet(JSON.parse(saved));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(STORAGE_KEY, JSON.stringify(wallet));
  }, [wallet, ready]);

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
    setWallet({ usdt: START_BALANCE, holdings: {}, orders: [] });
  }

  return (
    <WalletContext.Provider value={{ wallet, ready, placeOrder, reset }}>
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
