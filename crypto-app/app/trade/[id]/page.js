import { getCoin } from "../../../lib/api";
import TradePanel from "./TradePanel";

export const revalidate = 15;

export default async function TradePage({ params }) {
  const { id } = await params;
  const coin = await getCoin(id);

  if (!coin) {
    return (
      <main className="container">
        <div className="empty">Coin “{id}” not found.</div>
      </main>
    );
  }

  // Only pass serialisable fields the client needs.
  const data = {
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol,
    image: coin.image || "",
    price: coin.current_price,
    change24h: coin.price_change_percentage_24h,
    change1h: coin.price_change_percentage_1h_in_currency,
    high: coin.high_24h ?? coin.current_price * 1.03,
    low: coin.low_24h ?? coin.current_price * 0.97,
    volume: coin.total_volume,
    spark: coin.sparkline_in_7d?.price || [],
  };

  return <TradePanel coin={data} />;
}
