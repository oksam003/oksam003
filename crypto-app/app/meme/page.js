import { getMarkets } from "../../lib/api";
import MarketTable from "../components/MarketTable";

export const revalidate = 30;

export default async function MemePage() {
  const coins = await getMarkets({ category: "meme-token", perPage: 40 });

  return (
    <main className="container">
      <div className="meme-banner">
        <h1>🐕 Meme Coin Zone 🚀</h1>
        <p>
          DOGE, SHIB, PEPE, WIF and the whole degen playground — trade the
          hottest meme coins with live prices. High risk, high meme.
        </p>
      </div>

      <MarketTable coins={coins} />
    </main>
  );
}
