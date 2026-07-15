// Entity-Relationship diagram drawn as scalable SVG so connector lines
// always align. developer 1:N skills, developer 1:N projects.
const C = {
  line: "#34506f",
  ink: "#38bdf8",
  amber: "#fbbf24",
  green: "#34d399",
  text: "#cdd9ea",
  muted: "#64748b",
  panel: "#0d1421",
};

function Entity({ x, y, w, title, rows }) {
  const rh = 22;
  const h = 26 + rows.length * rh;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={C.panel} stroke={C.line} />
      <rect x={x} y={y} width={w} height={26} fill="rgba(56,189,248,0.08)" stroke={C.line} />
      <text x={x + 10} y={y + 17} fill={C.amber} fontSize="13" fontWeight="700" fontFamily="monospace">
        ▦ {title}
      </text>
      {rows.map((r, i) => {
        const ry = y + 26 + i * rh;
        return (
          <g key={r.name}>
            {i > 0 && (
              <line x1={x} y1={ry} x2={x + w} y2={ry} stroke={C.line} strokeDasharray="2 3" opacity="0.5" />
            )}
            <text x={x + 10} y={ry + 15} fontSize="11.5" fontFamily="monospace">
              <tspan fill={r.key ? C.ink : C.text} fontWeight={r.key ? "700" : "400"}>
                {r.name}
              </tspan>
              <tspan fill={C.green} dx="8">
                {r.type}
              </tspan>
              {r.key && (
                <tspan fill={C.muted} dx="8">
                  {r.key}
                </tspan>
              )}
            </text>
          </g>
        );
      })}
    </g>
  );
}

// crow's-foot "many" marker
function CrowFoot({ x, y }) {
  return (
    <g stroke={C.ink} strokeWidth="1.5" fill="none">
      <line x1={x} y1={y} x2={x - 12} y2={y - 7} />
      <line x1={x} y1={y} x2={x - 12} y2={y} />
      <line x1={x} y1={y} x2={x - 12} y2={y + 7} />
    </g>
  );
}

export default function ERDDiagram() {
  return (
    <div className="panel erd">
      <div className="erd-bar">
        <span className="muted">erd — entity relationships</span>
        <span className="dim">1:N</span>
      </div>
      <div className="erd-scroll">
        <svg viewBox="0 0 800 380" className="erd-svg" role="img" aria-label="Entity relationship diagram">
          {/* connectors (drawn first, behind boxes) */}
          {/* developer.id -> skills.dev_id */}
          <path d="M 280 150 H 400 V 92 H 500" fill="none" stroke={C.line} strokeWidth="1.5" />
          <CrowFoot x={500} y={92} />
          <circle cx={280} cy={150} r={3} fill={C.ink} />
          {/* developer.id -> projects.owner_id */}
          <path d="M 280 170 H 400 V 268 H 500" fill="none" stroke={C.line} strokeWidth="1.5" />
          <CrowFoot x={500} y={268} />
          <circle cx={280} cy={170} r={3} fill={C.ink} />

          <Entity
            x={40}
            y={110}
            w={240}
            title="developer"
            rows={[
              { name: "id", type: "uuid", key: "PK" },
              { name: "role", type: "varchar" },
              { name: "location", type: "varchar" },
              { name: "status", type: "enum" },
            ]}
          />
          <Entity
            x={500}
            y={30}
            w={260}
            title="skills"
            rows={[
              { name: "dev_id", type: "uuid", key: "FK" },
              { name: "name", type: "varchar" },
              { name: "level", type: "int" },
            ]}
          />
          <Entity
            x={500}
            y={210}
            w={260}
            title="projects"
            rows={[
              { name: "owner_id", type: "uuid", key: "FK" },
              { name: "name", type: "varchar" },
              { name: "stack", type: "text[]" },
            ]}
          />
        </svg>
      </div>
    </div>
  );
}
