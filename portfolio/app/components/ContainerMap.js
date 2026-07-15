import { containers } from "../data";

// Renders the tech stack as a Docker/container architecture map.
export default function ContainerMap() {
  return (
    <div className="containers">
      {containers.map((c) => (
        <div key={c.service} className="panel cnt">
          <div className="svc">
            <span className="cube">▣</span> {c.service}
          </div>
          <div className="img">image: {c.image}</div>
          <div className="port">ports: {c.port}</div>
          <div className="tech">
            {c.tech.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
          {c.depends.length > 0 && (
            <div className="dep">
              depends_on: <b>{c.depends.join(", ")}</b>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
