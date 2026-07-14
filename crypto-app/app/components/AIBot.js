"use client";

import { useEffect, useRef, useState } from "react";
import { getMarkets } from "../../lib/api";
import { fmtPrice, fmtPct, fmtNum } from "../../lib/format";

// Nexa AI — an in-app assistant. It answers from LIVE market data fetched
// from the CoinGecko API (prices, gainers, losers, meme coins) and helps
// users navigate the exchange.
export default function AIBot() {
  const [open, setOpen] = useState(false);
  const [coins, setCoins] = useState([]);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState([
    {
      from: "bot",
      text: "👋 Hi, I'm Nexa AI. Ask me for a live price (e.g. \"price of bitcoin\"), \"top gainers\", \"meme coins\", or how to trade.",
    },
  ]);
  const [thinking, setThinking] = useState(false);
  const bodyRef = useRef(null);

  // Load live market data once the assistant is first opened.
  useEffect(() => {
    if (open && coins.length === 0) {
      getMarkets({ perPage: 100 }).then(setCoins);
    }
  }, [open, coins.length]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [msgs, thinking]);

  function send(text) {
    const q = (text ?? input).trim();
    if (!q) return;
    setMsgs((m) => [...m, { from: "user", text: q }]);
    setInput("");
    setThinking(true);
    // small delay so it feels like it's "thinking"
    setTimeout(() => {
      const answer = respond(q, coins);
      setMsgs((m) => [...m, { from: "bot", text: answer }]);
      setThinking(false);
    }, 350);
  }

  const chips = ["Price of Bitcoin", "Top gainers", "Meme coins", "How to trade"];

  return (
    <>
      <button
        className="bot-fab"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open Nexa AI"
      >
        {open ? "✕" : "🤖"}
      </button>

      {open && (
        <div className="bot-panel">
          <div className="bot-head">
            <span className="bot-avatar">🤖</span>
            <div>
              <div className="bot-title">Nexa AI</div>
              <div className="bot-status">
                <span className="dot-live" /> Live market data
              </div>
            </div>
          </div>

          <div className="bot-body" ref={bodyRef}>
            {msgs.map((m, i) => (
              <div key={i} className={`bot-msg ${m.from}`}>
                {m.text}
              </div>
            ))}
            {thinking && <div className="bot-msg bot typing">Nexa AI is typing…</div>}
          </div>

          <div className="bot-chips">
            {chips.map((c) => (
              <button key={c} onClick={() => send(c)}>
                {c}
              </button>
            ))}
          </div>

          <form
            className="bot-input"
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Nexa AI…"
            />
            <button type="submit">➤</button>
          </form>
        </div>
      )}
    </>
  );
}

// ── Assistant logic (answers from live `coins` data) ──────────────────
function respond(q, coins) {
  const t = q.toLowerCase();

  if (!coins.length) {
    return "I'm still loading live market data — give me a second and ask again.";
  }

  // greetings / help
  if (/\b(hi|hello|hey|yo)\b/.test(t)) {
    return "Hey! 👋 Ask me for a live price, market movers, or trading help.";
  }
  if (t.includes("how") && (t.includes("trade") || t.includes("buy") || t.includes("sell"))) {
    return "To trade: open a coin from Markets → pick Buy or Sell → enter an amount (or tap 25/50/75/100%) → confirm. Your balance and holdings update instantly, and you can review everything under Assets.";
  }
  if (t.includes("meme")) {
    const meme = coins.filter((c) =>
      ["dogecoin", "shiba-inu", "pepe", "dogwifcoin", "floki", "bonk", "book-of-meme", "mog-coin"].includes(c.id)
    );
    if (!meme.length) return "Check the 🐕 Meme Coins tab for DOGE, SHIB, PEPE, WIF and more!";
    const list = meme
      .slice(0, 5)
      .map((c) => `${c.symbol.toUpperCase()} ${fmtPrice(c.current_price)} (${fmtPct(c.price_change_percentage_24h)})`)
      .join("\n");
    return `🐕 Live meme coins:\n${list}\n\nOpen the Meme Coins tab to trade them.`;
  }
  if (t.includes("gainer") || (t.includes("top") && t.includes("up"))) {
    return movers(coins, "up");
  }
  if (t.includes("loser") || t.includes("down") || t.includes("dip")) {
    return movers(coins, "down");
  }

  // price lookup — match by name or symbol
  const coin = findCoin(t, coins);
  if (coin) {
    const up = (coin.price_change_percentage_24h ?? 0) >= 0;
    return `${coin.name} (${coin.symbol.toUpperCase()})\n💵 Price: ${fmtPrice(coin.current_price)}\n${up ? "📈" : "📉"} 24h: ${fmtPct(coin.price_change_percentage_24h)}\n📊 Volume: ${fmtNum(coin.total_volume)}\n\nTap "Trade" on its market row to buy or sell.`;
  }

  return "I can give you live prices (try \"price of ethereum\"), \"top gainers\", \"top losers\", \"meme coins\", or trading help. Which would you like?";
}

function findCoin(t, coins) {
  // try symbol first (whole-word), then name substring
  for (const c of coins) {
    const sym = c.symbol.toLowerCase();
    if (new RegExp(`\\b${sym}\\b`).test(t)) return c;
  }
  for (const c of coins) {
    if (t.includes(c.name.toLowerCase())) return c;
  }
  return null;
}

function movers(coins, dir) {
  const sorted = [...coins].sort(
    (a, b) =>
      (b.price_change_percentage_24h ?? 0) - (a.price_change_percentage_24h ?? 0)
  );
  const rows = dir === "up" ? sorted.slice(0, 5) : sorted.slice(-5).reverse();
  const list = rows
    .map((c) => `${c.symbol.toUpperCase()} ${fmtPrice(c.current_price)} (${fmtPct(c.price_change_percentage_24h)})`)
    .join("\n");
  return `${dir === "up" ? "📈 Top gainers (24h)" : "📉 Top losers (24h)"}:\n${list}`;
}
