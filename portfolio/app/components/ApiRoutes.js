import { endpoints } from "../data";

// Renders projects as API endpoints / routes.
export default function ApiRoutes() {
  return (
    <div className="routes">
      {endpoints.map((e) => (
        <a
          key={e.path}
          className="panel route"
          href={e.link}
          target="_blank"
          rel="noreferrer"
        >
          <div className="route-top">
            <span className={`method ${e.method}`}>{e.method}</span>
            <span className="path">{e.path}</span>
            <span className="tag">{e.tag}</span>
            <span className="status">{e.status} OK</span>
          </div>
          <h3>{e.name}</h3>
          <p className="sum">{e.summary}</p>
          <div className="stack">
            {e.stack.map((s) => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
          </div>
          <div className="open">→ view source</div>
        </a>
      ))}
    </div>
  );
}
