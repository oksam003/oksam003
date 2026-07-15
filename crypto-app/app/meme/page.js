import { getMemePairs } from "../../lib/dex";
import MemeTable from "../components/MemeTable";

export const revalidate = 15;

export default async function MemePage() {
  const initial = await getMemePairs();

  return (
    <main className="container">
      <div className="meme-banner">
        <h1>🐕 Meme Coin Zone 🚀</h1>
        <p>
          Live on-chain data from DexScreener — DOGE, SHIB, PEPE, WIF, BONK and
          the whole degen playground. Real DEX prices, volume, liquidity and
          transactions, updating live. High risk, high meme.
        </p>
      </div>

      <MemeTable initial={initial} />
    </main>
  );
}
