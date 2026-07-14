"use client";

import { useEffect, useMemo, useState } from "react";
import { useWallet } from "../../WalletContext";
import { fmtPrice, fmtPct, fmtNum } from "../../../lib/format";
import CandleChart from "../../components/CandleChart";

export default function TradePanel({ coin }) {
  const { wallet, ready, placeOrder } = useWallet();
  const up = (coin.change24h ?? 0) >= 0;
  const symUpper = coin.symbol.toUpperCase();

  return (
    <main className="container">
      <div className="trade-head">
        <div className="coin-ic" style={{ width: 40, height: 40 }}>
          {coin.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={coin.image} alt={coin.name} />
          ) : (
            symUpper.slice(0, 3)
          )}
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 18 }}>
            {symUpper}/USDT
          </div>
          <div className="coin-sym">{coin.name}</div>
        </div>
        <div className={`px-lg mono ${up ? "green" : "red"}`}>
          {fmtPrice(coin.price)}
        </div>
        <div style={{ display: "flex", gap: 24, marginLeft: 12 }}>
          <Stat label="24h Change" value={fmtPct(coin.change24h)} cls={up ? "green" : "red"} />
          <Stat label="24h High" value={fmtPrice(coin.high)} />
          <Stat label="24h Low" value={fmtPrice(coin.low)} />
          <Stat label="24h Volume" value={fmtNum(coin.volume)} />
        </div>
      </div>

      <div className="trade-grid">
        <CandleChart spark={coin.spark} />
        <OrderBook price={coin.price} />
        <OrderForm
          coin={coin}
          symUpper={symUpper}
          wallet={wallet}
          ready={ready}
          placeOrder={placeOrder}
        />
      </div>
    </main>
  );
}

function Stat({ label, value, cls }) {
  return (
    <div>
      <div className="coin-sym">{label}</div>
      <div className={`mono ${cls || ""}`} style={{ fontWeight: 700 }}>
        {value}
      </div>
    </div>
  );
}

function OrderBook({ price }) {
  const [rows, setRows] = useState(null);

  useEffect(() => {
    // Generate a plausible book around the live price, client-side only.
    function build() {
      const asks = [];
      const bids = [];
      for (let i = 1; i <= 10; i++) {
        const spread = price * 0.0004 * i;
        asks.push({
          price: price + spread,
          amount: Math.random() * 4 + 0.1,
        });
        bids.push({
          price: price - spread,
          amount: Math.random() * 4 + 0.1,
        });
      }
      setRows({ asks: asks.reverse(), bids });
    }
    build();
    const t = setInterval(build, 2500);
    return () => clearInterval(t);
  }, [price]);

  if (!rows) return <div className="panel">Loading order book…</div>;
  const maxAmt = Math.max(...[...rows.asks, ...rows.bids].map((r) => r.amount));

  return (
    <div className="panel">
      <div style={{ fontWeight: 700, marginBottom: 8 }}>Order Book</div>
      {rows.asks.map((r, i) => (
        <div className="ob-row" key={"a" + i}>
          <span className="red mono">{fmtPrice(r.price)}</span>
          <span className="amt mono">{r.amount.toFixed(3)}</span>
          <div
            className="ob-fill"
            style={{
              width: `${(r.amount / maxAmt) * 100}%`,
              background: "var(--red-bg)",
            }}
          />
        </div>
      ))}
      <div className={`ob-mid mono ${"green"}`}>{fmtPrice(price)}</div>
      {rows.bids.map((r, i) => (
        <div className="ob-row" key={"b" + i}>
          <span className="green mono">{fmtPrice(r.price)}</span>
          <span className="amt mono">{r.amount.toFixed(3)}</span>
          <div
            className="ob-fill"
            style={{
              width: `${(r.amount / maxAmt) * 100}%`,
              background: "var(--green-bg)",
            }}
          />
        </div>
      ))}
    </div>
  );
}

function OrderForm({ coin, symUpper, wallet, ready, placeOrder }) {
  const [side, setSide] = useState("buy");
  const [amount, setAmount] = useState("");
  const [toast, setToast] = useState(null);

  const price = coin.price;
  const held = wallet.holdings[coin.id] || 0;
  const total = useMemo(() => (Number(amount) || 0) * price, [amount, price]);

  function setPct(pct) {
    if (side === "buy") {
      const max = wallet.usdt / price;
      setAmount(((max * pct) / 100).toFixed(6));
    } else {
      setAmount(((held * pct) / 100).toFixed(6));
    }
  }

  function submit() {
    const amt = Number(amount);
    if (!amt || amt <= 0) {
      setToast({ ok: false, msg: "Enter a valid amount" });
      return;
    }
    const res = placeOrder({
      side,
      coin: coin.id,
      symbol: symUpper,
      price,
      amount: amt,
    });
    if (res.ok) {
      setToast({
        ok: true,
        msg: `${side === "buy" ? "Bought" : "Sold"} ${amt} ${symUpper} @ ${fmtPrice(price)}`,
      });
      setAmount("");
    } else {
      setToast({ ok: false, msg: res.error });
    }
  }

  return (
    <div className="panel">
      <div className="side-toggle">
        <button
          className={`side-btn buy ${side === "buy" ? "active" : ""}`}
          onClick={() => setSide("buy")}
        >
          Buy
        </button>
        <button
          className={`side-btn sell ${side === "sell" ? "active" : ""}`}
          onClick={() => setSide("sell")}
        >
          Sell
        </button>
      </div>

      <div className="field">
        <label>Price (USDT)</label>
        <input value={fmtPrice(price).replace("$", "")} readOnly />
      </div>

      <div className="field">
        <label>Amount ({symUpper})</label>
        <input
          type="number"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="pct-row">
        {[25, 50, 75, 100].map((p) => (
          <button key={p} onClick={() => setPct(p)}>
            {p}%
          </button>
        ))}
      </div>

      <div className="avail">
        <span>Available</span>
        <span className="mono">
          {ready
            ? side === "buy"
              ? `${fmtNum(wallet.usdt)} USDT`
              : `${held.toFixed(6)} ${symUpper}`
            : "…"}
        </span>
      </div>

      <div className="avail">
        <span>Total</span>
        <span className="mono">{fmtPrice(total)}</span>
      </div>

      <button className={`submit-btn ${side}`} onClick={submit}>
        {side === "buy" ? "Buy" : "Sell"} {symUpper}
      </button>

      {toast && (
        <div className={`toast ${toast.ok ? "ok" : "err"}`}>{toast.msg}</div>
      )}
    </div>
  );
}
