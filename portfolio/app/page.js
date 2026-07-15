import { profile } from "./data";
import Reveal from "./components/Reveal";
import SchemaCard from "./components/SchemaCard";
import ApiRoutes from "./components/ApiRoutes";
import ContainerMap from "./components/ContainerMap";

export default function Home() {
  return (
    <>
      <div className="topbar">
        <span className="logo">◧ {profile.handle}</span>
        <span className="dim">{profile.role}</span>
        <nav>
          <a href="#schema">schema</a>
          <a href="#api">api</a>
          <a href="#infra">infra</a>
          <a href="#contact">contact</a>
          <span>
            <span className="blink" /> {profile.revision}
          </span>
        </nav>
      </div>

      <div className="wrap">
        {/* ── Hero / engineering title block ── */}
        <header className="hero">
          <div className="label">// system.blueprint</div>
          <div className="panel titleblock" style={{ marginTop: 12 }}>
            <div className="main">
              <div className="role">{profile.role}</div>
              <h1>
                {profile.name}
                <span className="cursor">_</span>
              </h1>
              <p>{profile.tagline}</p>
              <div className="cta">
                <a className="btn" href="#api">
                  ▸ view build log
                </a>
                <a className="btn ghost" href={profile.github} target="_blank" rel="noreferrer">
                  ⎇ github
                </a>
              </div>
            </div>
            <div className="meta">
              <div className="cell">
                <div className="k">Location</div>
                <div className="v">{profile.location}</div>
              </div>
              <div className="cell">
                <div className="k">Revision</div>
                <div className="v">{profile.revision}</div>
              </div>
              <div className="cell">
                <div className="k">Updated</div>
                <div className="v">{profile.updated}</div>
              </div>
              <div className="cell">
                <div className="k">Status</div>
                <div className="v" style={{ color: "var(--green)" }}>
                  ● open_to_work
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ── SQL schema ── */}
        <Reveal id="schema">
          <div className="section-head">
            <span className="section-no">01</span>
            <span className="section-title">DATA MODEL</span>
            <span className="section-meta">who / developer table</span>
          </div>
          <SchemaCard />
        </Reveal>

        {/* ── API routes / projects ── */}
        <Reveal id="api">
          <div className="section-head">
            <span className="section-no">02</span>
            <span className="section-title">API ROUTES</span>
            <span className="section-meta">what I've shipped</span>
          </div>
          <ApiRoutes />
        </Reveal>

        {/* ── Container / infra map ── */}
        <Reveal id="infra">
          <div className="section-head">
            <span className="section-no">03</span>
            <span className="section-title">SERVICE ARCHITECTURE</span>
            <span className="section-meta">docker-compose / the stack</span>
          </div>
          <ContainerMap />
        </Reveal>

        {/* ── Contact / .env ── */}
        <Reveal id="contact">
          <div className="section-head">
            <span className="section-no">04</span>
            <span className="section-title">CONNECT</span>
            <span className="section-meta">.env</span>
          </div>
          <div className="panel env">
            <div className="row">
              <span className="ek">EMAIL</span>=
              <a className="ev" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </div>
            <div className="row">
              <span className="ek">GITHUB</span>=
              <a className="ev" href={profile.github} target="_blank" rel="noreferrer">
                {profile.github}
              </a>
            </div>
            <div className="row">
              <span className="ek">LINKEDIN</span>=
              <a className="ev" href={profile.linkedin} target="_blank" rel="noreferrer">
                {profile.linkedin}
              </a>
            </div>
            <div className="row">
              <span className="ek">LOCATION</span>=
              <span className="ev">{profile.location}</span>
            </div>
          </div>
        </Reveal>
      </div>

      <footer>
        <div>build passing ✓ · {profile.name} · {profile.updated}</div>
        <div className="dim" style={{ marginTop: 6 }}>
          designed as a system blueprint — schema, routes &amp; containers
        </div>
      </footer>
    </>
  );
}
