import { nav, profile } from "../data";

export default function Sidebar() {
  return (
    <nav className="sidebar">
      <div className="logo">𝕏</div>
      {nav.map((item, i) => (
        <div key={item.label} className={`nav-item ${i === 0 ? "active" : ""}`}>
          <span className="icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </div>
      ))}
      <button className="tweet-btn">Post</button>
      <div className="sidebar-profile">
        <div className="avatar-sm">{profile.avatar}</div>
        <div className="info nav-label">
          <div style={{ fontWeight: 700 }}>{profile.name.split(" ")[0]}</div>
          <div style={{ color: "var(--text-muted)" }}>{profile.handle}</div>
        </div>
      </div>
    </nav>
  );
}
