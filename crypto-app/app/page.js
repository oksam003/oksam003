import Link from "next/link";
import { getMarkets } from "../lib/api";
import MarketTable from "./components/MarketTable";
import { fmtPrice, fmtPct } from "../lib/format";

export const revalidate = 30; // refresh market data every 30s

export default async function Home() {
  const coins = await getMarkets({ perPage: 50 });
  const top = coins.slice(0, 6);

  return (
    <main className="container">
      <div className="ticker">
        {top.map((c) => {
          const up = (c.price_change_percentage_24h ?? 0) >= 0;
          return (
            <Link key={c.id} href={`/trade/${c.id}`} className="ticker-card">
              <div className="sym">{c.symbol.toUpperCase()}/USDT</div>
              <div className="px mono">{fmtPrice(c.current_price)}</div>
              <div className={`mono ${up ? "green" : "red"}`}>
                {fmtPct(c.price_change_percentage_24h)}
              </div>
            </Link>
          );
        })}
      </div>

      <h1 className="page-title">Markets</h1>
      <p className="page-sub">
        Trade spot crypto and meme coins with live prices.{" "}
        <Link href="/meme" style={{ color: "var(--gold)" }}>
          Explore meme coins →
        </Link>
      </p>

      <MarketTable coins={coins} />
    </main>
  );
}
