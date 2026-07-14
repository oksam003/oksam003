"use client";

import { useState } from "react";
import Link from "next/link";
import Sparkline from "./Sparkline";
import { fmtPrice, fmtNum, fmtPct } from "../../lib/format";

const MEME_IDS = new Set([
  "dogecoin",
  "shiba-inu",
  "pepe",
  "dogwifcoin",
  "floki",
  "bonk",
  "book-of-meme",
  "mog-coin",
]);

export default function MarketTable({ coins, showSearch = true }) {
  const [q, setQ] = useState("");
  const filtered = coins.filter(
    (c) =>
      c.name.toLowerCase().includes(q.toLowerCase()) ||
      c.symbol.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <>
      {showSearch && (
        <div className="filters">
          <input
            className="search-box"
            placeholder="Search coin…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      )}
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Last Price</th>
              <th>1h</th>
              <th>24h</th>
              <th>Volume (24h)</th>
              <th>Chart (7d)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => {
              const chg24 = c.price_change_percentage_24h;
              const chg1h = c.price_change_percentage_1h_in_currency;
              const up = (chg24 ?? 0) >= 0;
              return (
                <tr
                  key={c.id}
                  onClick={() => (window.location.href = `/trade/${c.id}`)}
                >
                  <td>
                    <div className="coin-cell">
                      <div className="coin-ic">
                        {c.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={c.image} alt={c.name} />
                        ) : (
                          c.symbol.slice(0, 3).toUpperCase()
                        )}
                      </div>
                      <div>
                        <div className="coin-name">
                          {c.name}
                          {MEME_IDS.has(c.id) && (
                            <span className="badge-meme">MEME</span>
                          )}
                        </div>
                        <div className="coin-sym">{c.symbol}/USDT</div>
                      </div>
                    </div>
                  </td>
                  <td className="mono">{fmtPrice(c.current_price)}</td>
                  <td className={`mono ${(chg1h ?? 0) >= 0 ? "green" : "red"}`}>
                    {fmtPct(chg1h)}
                  </td>
                  <td className={`mono ${up ? "green" : "red"}`}>
                    {fmtPct(chg24)}
                  </td>
                  <td className="mono">{fmtNum(c.total_volume)}</td>
                  <td>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                      <Sparkline data={c.sparkline_in_7d?.price} up={up} />
                    </div>
                  </td>
                  <td>
                    <Link
                      href={`/trade/${c.id}`}
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
    </>
  );
}
