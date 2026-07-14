import Link from "next/link";
import { getMarkets } from "../lib/api";
import MarketTable from "./components/MarketTable";
import LiveTicker from "./components/LiveTicker";

export const revalidate = 30; // refresh market data every 30s

export default async function Home() {
  const coins = await getMarkets({ perPage: 50 });
  const top = coins.slice(0, 6);

  return (
    <main className="container">
      <LiveTicker coins={top} />

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
