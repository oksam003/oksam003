"use client";

import { useEffect, useRef, useState } from "react";

// Real-time price streaming via Binance's public WebSocket (no API key).
// Falls back gracefully to the initial (CoinGecko) price if a symbol isn't
// listed on Binance or the socket can't connect.
//
// ── REAL-TRADING NOTE ─────────────────────────────────────────────────
// This is a public market-data feed. For authenticated trading you'd open
// a user-data stream with a listenKey from your exchange and route orders
// through its signed REST/WS order endpoints.
// ──────────────────────────────────────────────────────────────────────

const WS_BASE = "wss://stream.binance.com:9443";

// Single-symbol live ticker. `symbol` is a coin symbol like "btc".
export function useLivePrice(symbol, initialPrice, initialChange) {
  const [price, setPrice] = useState(initialPrice);
  const [change, setChange] = useState(initialChange);
  const [dir, setDir] = useState(0); // +1 up tick, -1 down tick (for flashing)
  const [live, setLive] = useState(false);
  const prev = useRef(initialPrice);

  useEffect(() => {
    if (!symbol) return;
    const pair = symbol.toLowerCase() + "usdt";
    let ws;
    try {
      ws = new WebSocket(`${WS_BASE}/ws/${pair}@ticker`);
    } catch {
      return;
    }
    ws.onopen = () => setLive(true);
    ws.onmessage = (ev) => {
      try {
        const d = JSON.parse(ev.data);
        const p = parseFloat(d.c); // last price
        const pct = parseFloat(d.P); // 24h percent change
        if (!isNaN(p)) {
          setDir(p > prev.current ? 1 : p < prev.current ? -1 : 0);
          prev.current = p;
          setPrice(p);
        }
        if (!isNaN(pct)) setChange(pct);
      } catch {}
    };
    ws.onerror = () => setLive(false);
    ws.onclose = () => setLive(false);
    return () => {
      try {
        ws.close();
      } catch {}
    };
  }, [symbol]);

  return { price, change, dir, live };
}

// Multi-symbol live ticker for the markets ticker strip.
// `symbols` is an array of coin symbols; returns a map { SYMBOL: {price, change, dir} }.
export function useLivePrices(symbols) {
  const [map, setMap] = useState({});
  const prev = useRef({});

  useEffect(() => {
    if (!symbols || !symbols.length) return;
    const streams = symbols
      .map((s) => s.toLowerCase() + "usdt@ticker")
      .join("/");
    let ws;
    try {
      ws = new WebSocket(`${WS_BASE}/stream?streams=${streams}`);
    } catch {
      return;
    }
    ws.onmessage = (ev) => {
      try {
        const { data: d } = JSON.parse(ev.data);
        if (!d || !d.s) return;
        const sym = d.s.replace(/USDT$/, "");
        const p = parseFloat(d.c);
        const pct = parseFloat(d.P);
        const before = prev.current[sym] ?? p;
        prev.current[sym] = p;
        setMap((m) => ({
          ...m,
          [sym]: { price: p, change: pct, dir: p > before ? 1 : p < before ? -1 : 0 },
        }));
      } catch {}
    };
    return () => {
      try {
        ws.close();
      } catch {}
    };
  }, [symbols?.join(",")]);

  return map;
}
