"use client";

import { useMemo, useState } from "react";
import { fmtPrice } from "../../lib/format";

// TradingView-style candlestick chart rendered as inline SVG.
// Derives OHLC candles from the 7-day sparkline price series (no external lib).
export default function CandleChart({ spark }) {
  const [tf, setTf] = useState("1D");
  const [hover, setHover] = useState(null);

  const candles = useMemo(() => buildCandles(spark, tf), [spark, tf]);

  const W = 900;
  const H = 420;
  const padL = 8;
  const padR = 66; // price axis
  const padT = 12;
  const volH = 70; // volume pane height
  const gap = 12;
  const priceH = H - padT - volH - gap - 22; // 22 = time axis

  if (!candles.length) {
    return <div className="panel chart-panel">No chart data.</div>;
  }

  const highs = candles.map((c) => c.high);
  const lows = candles.map((c) => c.low);
  let max = Math.max(...highs);
  let min = Math.min(...lows);
  const pad = (max - min) * 0.08 || max * 0.02;
  max += pad;
  min -= pad;
  const range = max - min || 1;
  const maxVol = Math.max(...candles.map((c) => c.vol)) || 1;

  const plotW = W - padL - padR;
  const step = plotW / candles.length;
  const bodyW = Math.max(2, step * 0.62);

  const yPrice = (p) => padT + priceH - ((p - min) / range) * priceH;
  const volTop = padT + priceH + gap;
  const yVol = (v) => volTop + volH - (v / maxVol) * volH;

  // price axis gridlines
  const ticks = 5;
  const gridVals = Array.from({ length: ticks + 1 }, (_, i) => min + (range * i) / ticks);
  const last = candles[candles.length - 1];
  const up = last.close >= last.open;

  return (
    <div className="panel chart-panel">
      <div className="chart-toolbar">
        <div className="chart-tfs">
          {["15m", "1H", "4H", "1D", "1W"].map((t) => (
            <button
              key={t}
              className={`tf ${tf === t ? "active" : ""}`}
              onClick={() => setTf(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="ohlc mono">
          {hover ? (
            <>
              <span className="muted">O</span>
              <span className={hover.close >= hover.open ? "green" : "red"}>
                {fmtPrice(hover.open)}
              </span>
              <span className="muted">H</span>
              <span className={hover.close >= hover.open ? "green" : "red"}>
                {fmtPrice(hover.high)}
              </span>
              <span className="muted">L</span>
              <span className={hover.close >= hover.open ? "green" : "red"}>
                {fmtPrice(hover.low)}
              </span>
              <span className="muted">C</span>
              <span className={hover.close >= hover.open ? "green" : "red"}>
                {fmtPrice(hover.close)}
              </span>
            </>
          ) : (
            <span className={up ? "green" : "red"}>
              Last {fmtPrice(last.close)}
            </span>
          )}
        </div>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="candle-svg"
        preserveAspectRatio="none"
        onMouseLeave={() => setHover(null)}
      >
        {/* grid + price axis */}
        {gridVals.map((v, i) => (
          <g key={i}>
            <line
              x1={padL}
              x2={W - padR}
              y1={yPrice(v)}
              y2={yPrice(v)}
              stroke="var(--border)"
              strokeWidth="1"
              strokeDasharray="2 4"
            />
            <text
              x={W - padR + 6}
              y={yPrice(v) + 4}
              fill="var(--text-muted)"
              fontSize="11"
              className="mono"
            >
              {fmtPrice(v).replace("$", "")}
            </text>
          </g>
        ))}

        {/* candles */}
        {candles.map((c, i) => {
          const cx = padL + i * step + step / 2;
          const rising = c.close >= c.open;
          const color = rising ? "var(--green)" : "var(--red)";
          const yOpen = yPrice(c.open);
          const yClose = yPrice(c.close);
          const bodyTop = Math.min(yOpen, yClose);
          const bodyH = Math.max(1, Math.abs(yClose - yOpen));
          return (
            <g
              key={i}
              onMouseEnter={() => setHover(c)}
              style={{ cursor: "crosshair" }}
            >
              {/* hover hit-area */}
              <rect x={cx - step / 2} y={padT} width={step} height={priceH} fill="transparent" />
              {/* wick */}
              <line
                x1={cx}
                x2={cx}
                y1={yPrice(c.high)}
                y2={yPrice(c.low)}
                stroke={color}
                strokeWidth="1"
              />
              {/* body */}
              <rect
                x={cx - bodyW / 2}
                y={bodyTop}
                width={bodyW}
                height={bodyH}
                fill={color}
              />
              {/* volume */}
              <rect
                x={cx - bodyW / 2}
                y={yVol(c.vol)}
                width={bodyW}
                height={volTop + volH - yVol(c.vol)}
                fill={color}
                opacity="0.4"
              />
            </g>
          );
        })}

        {/* last price line */}
        <line
          x1={padL}
          x2={W - padR}
          y1={yPrice(last.close)}
          y2={yPrice(last.close)}
          stroke={up ? "var(--green)" : "var(--red)"}
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0.7"
        />
        <rect
          x={W - padR}
          y={yPrice(last.close) - 9}
          width={padR}
          height="18"
          fill={up ? "var(--green)" : "var(--red)"}
        />
        <text
          x={W - padR + 5}
          y={yPrice(last.close) + 4}
          fill="#0b0e11"
          fontSize="11"
          fontWeight="700"
          className="mono"
        >
          {fmtPrice(last.close).replace("$", "")}
        </text>

        {/* crosshair */}
        {hover && (
          <line
            x1={padL + candles.indexOf(hover) * step + step / 2}
            x2={padL + candles.indexOf(hover) * step + step / 2}
            y1={padT}
            y2={padT + priceH + gap + volH}
            stroke="var(--text-muted)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
        )}
      </svg>
    </div>
  );
}

// Build OHLC candles from a flat price series. Timeframe changes how many
// source points are grouped into each candle (coarser tf → fewer candles).
function buildCandles(spark, tf) {
  if (!spark || spark.length < 4) return [];
  const groupBy = { "15m": 1, "1H": 2, "4H": 4, "1D": 6, "1W": 12 }[tf] || 4;
  const out = [];
  for (let i = 0; i < spark.length; i += groupBy) {
    const slice = spark.slice(i, i + groupBy);
    if (!slice.length) continue;
    const open = slice[0];
    const close = slice[slice.length - 1];
    const high = Math.max(...slice);
    const low = Math.min(...slice);
    // deterministic pseudo-volume from price movement (no Math.random → SSR-safe)
    const vol = Math.abs(close - open) * 1000 + (high - low) * 500 + close * 0.01;
    out.push({ open, high, low, close, vol });
  }
  return out;
}
