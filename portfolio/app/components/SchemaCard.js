import { schema } from "../data";

// Renders the developer profile as a SQL CREATE TABLE statement.
export default function SchemaCard() {
  const pad = (s, n) => s + " ".repeat(Math.max(1, n - s.length));
  return (
    <div className="panel sql">
      <div className="bar">
        <span className="dot" />
        <span className="muted">schema.sql — public.{schema.table}</span>
      </div>
      <pre>
        <span className="kw">CREATE TABLE</span> <span className="tbl">{schema.table}</span> (
        {"\n"}
        {schema.columns.map((c, i) => (
          <span key={c.name}>
            {"  "}
            <span className="col">{pad(c.name, 12)}</span>
            <span className="typ">{pad(c.type, 10)}</span>
            <span className="con">{pad(c.constraint, 16)}</span>
            <span className="cmt">
              -- {c.value}
            </span>
            {i < schema.columns.length - 1 ? "," : ""}
            {"\n"}
          </span>
        ))}
        {");"}
      </pre>
      <div className="rel">
        {schema.relations.map((r) => (
          <div key={r.table} className="edge">
            <b>{r.type}</b> → {r.table} <span className="muted">ON {r.on}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
