"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useWallet } from "../WalletContext";
import { getMarkets } from "../../lib/api";
import { fmtPrice, fmtNum } from "../../lib/format";

export default function AssetsPage() {
  const { wallet, ready, reset } = useWallet();
  const [prices, setPrices] = useState({});

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
  const START = 100000;
  const pnl = totalEquity - START;

  return (
    <main className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 className="page-title">Assets</h1>
        <button className="btn btn-ghost" onClick={reset}>
          Reset Demo Wallet
        </button>
      </div>
      <p className="page-sub">Your simulated portfolio overview.</p>

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
