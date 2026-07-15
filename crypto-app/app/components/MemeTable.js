"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getMemePairs } from "../../lib/dex";
import { fmtPrice, fmtNum, fmtPct } from "../../lib/format";

export default function MemeTable({ initial }) {
  const [rows, setRows] = useState(initial);
  const [flash, setFlash] = useState({}); // id -> "up" | "down"
  const [updatedAt, setUpdatedAt] = useState(0);
  const prev = useRef(Object.fromEntries(initial.map((r) => [r.id, r.price])));

  // Poll DexScreener live every 15s and flash rows whose price moved.
  useEffect(() => {
    let alive = true;
    async function tick() {
      const next = await getMemePairs();
      if (!alive) return;
      const f = {};
      next.forEach((r) => {
        const before = prev.current[r.id];
        if (before != null && r.price !== before) {
          f[r.id] = r.price > before ? "up" : "down";
        }
        prev.current[r.id] = r.price;
      });
      setRows(next);
      setFlash(f);
      setUpdatedAt((n) => n + 1);
      setTimeout(() => alive && setFlash({}), 700);
    }
    const t = setInterval(tick, 15000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, []);

  return (
    <div className="table-wrap fade-in">
      <div className="meme-live-bar">
        <span className="live-tag">
          <span className="dot-live" /> LIVE · DexScreener
        </span>
        <span className="meme-updated">Auto-refreshing every 15s</span>
      </div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Token</th>
              <th>Price</th>
              <th>5m</th>
              <th>1h</th>
              <th>24h</th>
              <th>Volume (24h)</th>
              <th>Liquidity</th>
              <th>Txns (24h)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => {
              const up = (r.change24h ?? 0) >= 0;
              return (
                <tr
                  key={r.id}
                  className={`meme-row ${flash[r.id] ? "flash-" + flash[r.id] : ""}`}
                  style={{ animationDelay: `${i * 45}ms` }}
                  onClick={() => (window.location.href = `/trade/${r.id}`)}
                >
                  <td>
                    <div className="coin-cell">
                      <div className="coin-ic">
                        {r.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={r.image} alt={r.name} />
                        ) : (
                          r.symbol.slice(0, 3)
                        )}
                      </div>
                      <div>
                        <div className="coin-name">
                          {r.name} <span className="badge-meme">MEME</span>
                        </div>
                        <div className="coin-sym">
                          {r.symbol}/USD · {r.chain} · {r.dex}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="mono">{fmtPrice(r.price)}</td>
                  <td className={`mono ${r.change5m >= 0 ? "green" : "red"}`}>{fmtPct(r.change5m)}</td>
                  <td className={`mono ${r.change1h >= 0 ? "green" : "red"}`}>{fmtPct(r.change1h)}</td>
                  <td className={`mono ${up ? "green" : "red"}`}>{fmtPct(r.change24h)}</td>
                  <td className="mono">{fmtNum(r.volume24h)}</td>
                  <td className="mono">{fmtNum(r.liquidity)}</td>
                  <td className="mono">{r.txns24h.toLocaleString()}</td>
                  <td>
                    <Link
                      href={`/trade/${r.id}`}
                      className="trade-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Trade
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
