# ⚡ Nexa — Crypto & Meme Coin Trading (Bybit-style)

A Bybit-inspired cryptocurrency exchange interface with **spot trading**, a dedicated **meme-coin zone**, live prices, an interactive **TradingView-style candlestick chart**, an order book, an **AI assistant**, and **real-time WebSocket price streaming**. Built with **Next.js 16** (App Router).

Market data (prices, volume, 24h change, meme coins) is **real and live** — REST data from the CoinGecko API plus real-time ticks from the Binance public WebSocket. Order execution runs against a virtual balance for now; real-exchange integration points are marked in the code (search for `REAL-TRADING HOOK`).

## ✨ Features

- **Markets** — top coins with live price, 1h/24h change, volume, and 7-day sparklines
- **🐕 Meme Coin Zone** — DOGE, SHIB, PEPE, WIF, BONK & friends (CoinGecko `meme-token` category)
- **Trade view** — live price header, interactive **TradingView-style candlestick chart** (timeframes, crosshair, OHLC readout, volume pane), animated order book, and a Buy/Sell order form with 25/50/75/100% sizing
- **Real-time streaming** — prices tick live via Binance WebSocket (markets ticker + trade header)
- **Login / Sign up** — email/password + social buttons, session persisted client-side
- **Wallet** — buy/sell updates balances & holdings, persisted in `localStorage`
- **Assets/Portfolio** — total equity, P&L, holdings valued at live prices, and full order history
- **Nexa AI** — an in-app assistant that answers with live prices, top gainers/losers, meme-coin lists, and trading help
- **Bybit-style dark theme** — gold accent, green/red price coloring, fully responsive

## 🔌 Data

- **REST market data** — free [CoinGecko API](https://www.coingecko.com/en/api) (no key). Falls back to built-in sample data if rate-limited so the UI never renders empty.
- **Live streaming** — [Binance public WebSocket](https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams) (`@ticker` streams, no key). Symbols not listed on Binance simply keep their REST price.

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
  login/page.js        Login / sign up
  meme/page.js         Meme coin zone
  trade/[id]/          Trade view + order form/book (TradePanel.js)
  assets/page.js       Portfolio & order history
  AuthContext.js       Client auth (REAL-AUTH HOOK)
  WalletContext.js     Wallet + order execution (REAL-TRADING HOOK)
  components/          Header, MarketTable, LiveTicker, CandleChart,
                       useLivePrice (WebSocket), AIBot, Sparkline
lib/
  api.js               CoinGecko data + fallback
  format.js            Price/number/percent formatting
```

## 🛣️ Going real (later)

Search the codebase for `REAL-TRADING HOOK` and `REAL-AUTH HOOK`. To make this a real exchange client you'd:

1. Replace CoinGecko/Binance public reads with your exchange's authenticated market-data feed.
2. Swap the `placeOrder()` simulation in `WalletContext.js` for signed order-placement API calls.
3. Hydrate balances/holdings from the exchange account API instead of `localStorage`.
4. Replace `AuthContext` login/signup with a real auth backend and server sessions (KYC, secure key management).

---

Built with 💛 by [Samuel Okoosi](https://github.com/oksam003)
