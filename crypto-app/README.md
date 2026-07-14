# ⚡ BitFlex — Crypto & Meme Coin Trading (Bybit-style demo)

A Bybit-inspired cryptocurrency exchange interface with **spot trading**, a dedicated **meme-coin zone**, live prices, an order book, and a simulated wallet with order history. Built with **Next.js 16** (App Router).

> ⚠️ **Demo / portfolio project.** Trades are simulated against a virtual 100,000 USDT balance — no real funds, accounts, or KYC. Real-exchange integration points are marked in the code (search for `REAL-TRADING HOOK`).

## ✨ Features

- **Markets** — top coins with live price, 1h/24h change, volume, and 7-day sparklines
- **🐕 Meme Coin Zone** — DOGE, SHIB, PEPE, WIF, BONK & friends (CoinGecko `meme-token` category)
- **Trade view** — live price header, candle-style chart, animated order book, and a Buy/Sell order form with 25/50/75/100% sizing
- **Simulated wallet** — buy/sell updates balances & holdings, persisted in `localStorage`
- **Assets/Portfolio** — total equity, P&L, holdings valued at live prices, and full order history
- **Bybit-style dark theme** — gold accent, green/red price coloring, fully responsive

## 🔌 Data

Live market data comes from the free **[CoinGecko API](https://www.coingecko.com/en/api)** (no key needed). If the API is rate-limited, the app falls back to built-in sample data so the UI never renders empty.

## 🚀 Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
```

Production:

```bash
npm run build
npm run start
```

## 🧭 Structure

```
app/
  page.js              Markets (home)
  meme/page.js         Meme coin zone
  trade/[id]/          Trade view + order form/book (TradePanel.js)
  assets/page.js       Portfolio & order history
  WalletContext.js     Simulated wallet + order execution
  components/          Header, MarketTable, Sparkline
lib/
  api.js               CoinGecko data + fallback
  format.js            Price/number/percent formatting
```

## 🛣️ Going real (later)

Search the codebase for `REAL-TRADING HOOK`. To make this a real exchange client you'd:

1. Replace CoinGecko reads with your exchange's market-data websocket/REST feed.
2. Swap the `placeOrder()` simulation in `WalletContext.js` for authenticated order-placement API calls.
3. Hydrate balances/holdings from the exchange account API instead of `localStorage`.
4. Add auth, KYC, and secure key management.

---

Built with 💛 by [Samuel Okoosi](https://github.com/oksam003)
