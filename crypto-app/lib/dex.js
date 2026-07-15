// Live meme-coin data from the DexScreener API (public, no key).
// Isomorphic: works on the server (initial render) and in the browser (polling).
// Docs: https://docs.dexscreener.com/api/reference

// Well-known meme tokens (address + chain). We fetch their live pairs in one
// batched call and keep the highest-liquidity pair per token.
// `cg` = CoinGecko id, used for the /trade/[id] route so the trade page can
// resolve the token (its Binance WS symbol comes from there too).
const MEME_TOKENS = [
  { symbol: "PEPE", name: "Pepe", cg: "pepe", address: "0x6982508145454ce325ddbe47a25d4ec3d2311933" },
  { symbol: "SHIB", name: "Shiba Inu", cg: "shiba-inu", address: "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce" },
  { symbol: "FLOKI", name: "Floki", cg: "floki", address: "0xcf0c122c6b73ff809c693db761e7baebe62b6a2e" },
  { symbol: "MOG", name: "Mog Coin", cg: "mog-coin", address: "0xaaee1a9723aadb7afa2810263653a34ba2c21c7a" },
  { symbol: "DOGE", name: "Dogecoin", cg: "dogecoin", address: "0xba2ae424d960c26247dd6c32edc70b295c744c43" },
  { symbol: "BONK", name: "Bonk", cg: "bonk", address: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263" },
  { symbol: "WIF", name: "dogwifhat", cg: "dogwifcoin", address: "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm" },
];

const DEX_BASE = "https://api.dexscreener.com/latest/dex/tokens";

export async function getMemePairs() {
  const addrs = MEME_TOKENS.map((t) => t.address).join(",");
  try {
    const res = await fetch(`${DEX_BASE}/${addrs}`, {
      headers: { accept: "application/json" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const pairs = data.pairs || [];
    const rows = MEME_TOKENS.map((tok) => {
      const matches = pairs.filter(
        (p) => p.baseToken?.address?.toLowerCase() === tok.address.toLowerCase()
      );
      if (!matches.length) return null;
      // pick the deepest-liquidity pair
      const best = matches.sort(
        (a, b) => (b.liquidity?.usd || 0) - (a.liquidity?.usd || 0)
      )[0];
      return normalize(tok, best);
    }).filter(Boolean);
    return rows.length ? rows : fallback();
  } catch (e) {
    if (typeof console !== "undefined") console.warn("DexScreener fetch failed:", e.message);
    return fallback();
  }
}

function normalize(tok, p) {
  return {
    id: tok.cg,
    symbol: tok.symbol,
    name: p.baseToken?.name || tok.name,
    price: parseFloat(p.priceUsd) || 0,
    change5m: p.priceChange?.m5 ?? 0,
    change1h: p.priceChange?.h1 ?? 0,
    change24h: p.priceChange?.h24 ?? 0,
    volume24h: p.volume?.h24 ?? 0,
    liquidity: p.liquidity?.usd ?? 0,
    marketCap: p.marketCap ?? p.fdv ?? 0,
    txns24h: (p.txns?.h24?.buys || 0) + (p.txns?.h24?.sells || 0),
    image: p.info?.imageUrl || "",
    chain: p.chainId || "",
    dex: p.dexId || "",
    url: p.url || "",
  };
}

// Offline fallback so the page never renders empty.
function fallback() {
  const rows = [
    ["pepe", "PEPE", "Pepe", 0.0000119, 12.4, 2.1, 0.4],
    ["shiba-inu", "SHIB", "Shiba Inu", 0.0000241, -3.1, -0.8, 0.2],
    ["floki", "FLOKI", "Floki", 0.000159, -1.9, 0.6, -0.1],
    ["mog-coin", "MOG", "Mog Coin", 0.0000018, 22.1, 4.2, 1.1],
    ["dogecoin", "DOGE", "Dogecoin", 0.162, 6.2, 1.4, 0.3],
    ["bonk", "BONK", "Bonk", 0.0000276, 15.2, 3.3, 0.9],
    ["dogwifcoin", "WIF", "dogwifhat", 2.31, 8.7, 2.0, 0.5],
  ];
  return rows.map(([id, symbol, name, price, c24, c1h, c5m], i) => ({
    id,
    symbol,
    name,
    price,
    change5m: c5m,
    change1h: c1h,
    change24h: c24,
    volume24h: price * 1e8 * (8 - (i % 5)),
    liquidity: price * 1e7 * (6 - (i % 4)),
    marketCap: price * 1e9 * (9 - i),
    txns24h: 4200 - i * 300,
    image: "",
    chain: "ethereum",
    dex: "uniswap",
    url: "https://dexscreener.com",
  }));
}
