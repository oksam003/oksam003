// Live market data via the public CoinGecko API.
// No key required for these endpoints (rate-limited).
//
// ── REAL-TRADING HOOK ────────────────────────────────────────────────
// For real trading you'd replace these read calls with your exchange's
// market-data websocket/REST feed, and add authenticated endpoints for
// placing/cancelling orders + reading balances. Order execution currently
// lives in the WalletContext as a client-side simulation.
// ─────────────────────────────────────────────────────────────────────

const BASE = "https://api.coingecko.com/api/v3";

async function safeFetch(url) {
  try {
    const res = await fetch(url, { headers: { accept: "application/json" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (e) {
    console.warn("CoinGecko fetch failed, using fallback data:", e.message);
    return null;
  }
}

export async function getMarkets({ category, perPage = 50 } = {}) {
  const params = new URLSearchParams({
    vs_currency: "usd",
    order: "market_cap_desc",
    per_page: String(perPage),
    page: "1",
    sparkline: "true",
    price_change_percentage: "1h,24h,7d",
  });
  if (category) params.set("category", category);
  const data = await safeFetch(`${BASE}/coins/markets?${params}`);
  return data && data.length ? data : fallbackMarkets(category);
}

export async function getCoin(id) {
  const data = await safeFetch(
    `${BASE}/coins/markets?vs_currency=usd&ids=${id}&sparkline=true&price_change_percentage=1h,24h,7d`
  );
  if (data && data[0]) return data[0];
  return fallbackMarkets().find((c) => c.id === id) || null;
}

// Offline fallback so the UI never renders empty if the API is rate-limited.
function fallbackMarkets(category) {
  const spark = (base) =>
    Array.from({ length: 24 }, (_, i) => base * (1 + Math.sin(i / 3) * 0.03));
  const meme = [
    ["dogecoin", "DOGE", "Dogecoin", 0.162, 6.2],
    ["shiba-inu", "SHIB", "Shiba Inu", 0.0000241, -3.1],
    ["pepe", "PEPE", "Pepe", 0.0000119, 12.4],
    ["dogwifcoin", "WIF", "dogwifhat", 2.31, 8.7],
    ["floki", "FLOKI", "Floki", 0.000159, -1.9],
    ["bonk", "BONK", "Bonk", 0.0000276, 15.2],
    ["book-of-meme", "BOME", "BOOK OF MEME", 0.0091, -4.5],
    ["mog-coin", "MOG", "Mog Coin", 0.0000018, 22.1],
  ];
  const majors = [
    ["bitcoin", "BTC", "Bitcoin", 97250, 1.8],
    ["ethereum", "ETH", "Ethereum", 3420, 2.4],
    ["solana", "SOL", "Solana", 214, 5.1],
    ["binancecoin", "BNB", "BNB", 640, 0.7],
    ["ripple", "XRP", "XRP", 2.28, -1.2],
    ["cardano", "ADA", "Cardano", 0.92, 3.3],
    ["avalanche-2", "AVAX", "Avalanche", 39.5, 4.0],
    ["chainlink", "LINK", "Chainlink", 22.4, 1.1],
  ];
  const rows = category === "meme-token" ? meme : [...majors, ...meme];
  return rows.map(([id, symbol, name, price, chg], i) => ({
    id,
    symbol: symbol.toLowerCase(),
    name,
    image: "",
    current_price: price,
    price_change_percentage_24h: chg,
    price_change_percentage_1h_in_currency: chg / 3,
    price_change_percentage_7d_in_currency: chg * 1.5,
    market_cap: price * 1e9 * (10 - i),
    total_volume: price * 1e8 * (8 - (i % 5)),
    sparkline_in_7d: { price: spark(price) },
  }));
}
