"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useWallet } from "../WalletContext";
import { useAuth } from "../AuthContext";
import { getMarkets } from "../../lib/api";
import { fmtPrice, fmtNum } from "../../lib/format";

export default function AssetsPage() {
  const { wallet, ready, reset, deposit, withdraw } = useWallet();
  const { user } = useAuth();
  const [prices, setPrices] = useState({});
  const [fundMode, setFundMode] = useState(null); // "deposit" | "withdraw" | null
  const [depAmt, setDepAmt] = useState("");
  const [fundErr, setFundErr] = useState("");

  useEffect(() => {
    getMarkets({ perPage: 100 }).then((coins) => {
      const map = {};
      coins.forEach((c) => (map[c.id] = c.current_price));
      setPrices(map);
    });
  }, []);

  const holdings = Object.entries(wallet.holdings).filter(([, a]) => a > 1e-9);
  const holdingsValue = holdings.reduce(
    (sum, [id, amt]) => sum + amt * (prices[id] || 0),
    0
  );
  const totalEquity = wallet.usdt + holdingsValue;
  const deposited = wallet.deposited || 0;
  const pnl = totalEquity - deposited;

  if (!user) {
    return (
      <main className="container">
        <div className="empty" style={{ padding: 80 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🔒</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>
            Log in to view your assets
          </div>
          <div style={{ marginBottom: 20 }}>
            Your balance and holdings are tied to your account.
          </div>
          <Link href="/login" className="btn btn-gold">
            Log In / Sign Up
          </Link>
        </div>
      </main>
    );
  }

  function openFund(mode) {
    setFundErr("");
    setDepAmt("");
    setFundMode((m) => (m === mode ? null : mode));
  }

  function submitFund() {
    setFundErr("");
    const res = fundMode === "withdraw" ? withdraw(depAmt) : deposit(depAmt);
    if (res.ok) {
      setDepAmt("");
      setFundMode(null);
    } else {
      setFundErr(res.error);
    }
  }

  return (
    <main className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 className="page-title">Assets</h1>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-gold" onClick={() => openFund("deposit")}>
            Deposit
          </button>
          <button className="btn btn-ghost" onClick={() => openFund("withdraw")}>
            Withdraw
          </button>
          <button className="btn btn-ghost" onClick={reset}>
            Reset
          </button>
        </div>
      </div>
      <p className="page-sub">
        Welcome, {user.name}. Here's your portfolio overview.
      </p>

      {fundMode && (
        <div className="deposit-box">
          <div className="field" style={{ margin: 0, flex: 1 }}>
            <label>
              {fundMode === "withdraw" ? "Withdraw" : "Deposit"} amount (USDT)
            </label>
            <input
              type="number"
              placeholder="0.00"
              value={depAmt}
              onChange={(e) => setDepAmt(e.target.value)}
            />
            {fundErr && (
              <div style={{ color: "var(--red)", fontSize: 12, marginTop: 6 }}>
                {fundErr}
              </div>
            )}
          </div>
          <div className="deposit-quick">
            {fundMode === "withdraw" ? (
              <>
                <button onClick={() => setDepAmt(String(wallet.usdt / 2))}>50%</button>
                <button onClick={() => setDepAmt(String(wallet.usdt))}>Max</button>
              </>
            ) : (
              [100, 1000, 10000].map((a) => (
                <button key={a} onClick={() => setDepAmt(String(a))}>
                  +{a.toLocaleString()}
                </button>
              ))
            )}
          </div>
          <button className="btn btn-gold" onClick={submitFund}>
            Confirm {fundMode === "withdraw" ? "Withdrawal" : "Deposit"}
          </button>
        </div>
      )}

      <div className="stat-row">
        <div className="stat">
          <div className="l">Total Equity (USDT)</div>
          <div className="v mono">{ready ? fmtNum(totalEquity) : "…"}</div>
        </div>
        <div className="stat">
          <div className="l">Available Balance</div>
          <div className="v mono">{ready ? fmtNum(wallet.usdt) : "…"}</div>
        </div>
        <div className="stat">
          <div className="l">Holdings Value</div>
          <div className="v mono">{fmtNum(holdingsValue)}</div>
        </div>
        <div className="stat">
          <div className="l">Total P&L</div>
          <div className={`v mono ${pnl >= 0 ? "green" : "red"}`}>
            {pnl >= 0 ? "+" : ""}
            {fmtNum(pnl)}
          </div>
        </div>
      </div>

      <div className="section-title">Holdings</div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Amount</th>
              <th>Price</th>
              <th>Value</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {holdings.length === 0 ? (
              <tr>
                <td colSpan={5}>
                  <div className="empty">
                    No holdings yet. <Link href="/" style={{ color: "var(--gold)" }}>Start trading →</Link>
                  </div>
                </td>
              </tr>
            ) : (
              holdings.map(([id, amt]) => (
                <tr key={id}>
                  <td style={{ fontWeight: 700 }}>{id.toUpperCase()}</td>
                  <td className="mono">{amt.toFixed(6)}</td>
                  <td className="mono">{fmtPrice(prices[id])}</td>
                  <td className="mono">{fmtNum(amt * (prices[id] || 0))}</td>
                  <td>
                    <Link href={`/trade/${id}`} className="trade-link">
                      Trade
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="section-title">Order History</div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Side</th>
              <th>Pair</th>
              <th>Price</th>
              <th>Amount</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {wallet.orders.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <div className="empty">No orders yet.</div>
                </td>
              </tr>
            ) : (
              wallet.orders.map((o) => (
                <tr key={o.id}>
                  <td className={o.side === "buy" ? "green" : "red"} style={{ textTransform: "uppercase", fontWeight: 700 }}>
                    {o.side}
                  </td>
                  <td>{o.symbol}/USDT</td>
                  <td className="mono">{fmtPrice(o.price)}</td>
                  <td className="mono">{o.amount}</td>
                  <td className="mono">{fmtPrice(o.cost)}</td>
                  <td className="green">{o.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
