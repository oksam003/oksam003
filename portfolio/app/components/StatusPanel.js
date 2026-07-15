"use client";

import { useEffect, useState } from "react";

const SERVICES = [
  { name: "frontend", latency: 12 },
  { name: "api", latency: 34 },
  { name: "database", latency: 8 },
  { name: "cache", latency: 3 },
];

export default function StatusPanel() {
  const [uptime, setUptime] = useState(0);
  const [clock, setClock] = useState("--:--:--");

  useEffect(() => {
    const t = setInterval(() => {
      setUptime((u) => u + 1);
      const d = new Date();
      setClock(
        [d.getHours(), d.getMinutes(), d.getSeconds()]
          .map((n) => String(n).padStart(2, "0"))
          .join(":")
      );
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const days = 1000 + Math.floor(uptime / 86400);
  const fmtUp = `${days}d ${String(Math.floor((uptime % 86400) / 3600)).padStart(2, "0")}h ${String(
    Math.floor((uptime % 3600) / 60)
  ).padStart(2, "0")}m ${String(uptime % 60).padStart(2, "0")}s`;

  return (
    <div className="panel status">
      <div className="status-top">
        <div>
          <span className="blink" /> ALL SYSTEMS OPERATIONAL
        </div>
        <div className="mono muted">{clock} UTC</div>
      </div>

      <div className="status-grid">
        <div className="status-metric">
          <div className="sm-k">UPTIME</div>
          <div className="sm-v mono">{fmtUp}</div>
        </div>
        <div className="status-metric">
          <div className="sm-k">BUILD</div>
          <div className="sm-v" style={{ color: "var(--green)" }}>
            passing ✓
          </div>
        </div>
        <div className="status-metric">
          <div className="sm-k">DEPLOYS</div>
          <div className="sm-v mono">30+</div>
        </div>
        <div className="status-metric">
          <div className="sm-k">RESPONSE</div>
          <div className="sm-v" style={{ color: "var(--green)" }}>
            &lt; 40ms
          </div>
        </div>
      </div>

      <div className="svc-list">
        {SERVICES.map((s, i) => (
          <div className="svc-row" key={s.name}>
            <span className="svc-dot" />
            <span className="svc-name">{s.name}</span>
            <div className="svc-bar">
              <span
                className="svc-fill"
                style={{ animationDelay: `${i * 0.4}s` }}
              />
            </div>
            <span className="svc-ms mono">{s.latency}ms</span>
          </div>
        ))}
      </div>
    </div>
  );
}
