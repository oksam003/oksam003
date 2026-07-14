"use client";

import Link from "next/link";
import { useLivePrices } from "./useLivePrice";
import { fmtPrice, fmtPct } from "../../lib/format";

export default function LiveTicker({ coins }) {
  const symbols = coins.map((c) => c.symbol);
  const live = useLivePrices(symbols);

  return (
    <div className="ticker">
      {coins.map((c) => {
        const sym = c.symbol.toUpperCase();
        const l = live[sym];
        const price = l?.price ?? c.current_price;
        const change = l?.change ?? c.price_change_percentage_24h;
        const up = (change ?? 0) >= 0;
        return (
          <Link key={c.id} href={`/trade/${c.id}`} className="ticker-card">
            <div className="sym">
              {sym}/USDT{" "}
              {l && <span className="dot-live" title="Live" />}
            </div>
            <div
              className="px mono"
              style={{
                color: l?.dir > 0 ? "var(--green)" : l?.dir < 0 ? "var(--red)" : undefined,
                transition: "color 0.15s",
              }}
            >
              {fmtPrice(price)}
            </div>
            <div className={`mono ${up ? "green" : "red"}`}>{fmtPct(change)}</div>
          </Link>
        );
      })}
    </div>
  );
}
