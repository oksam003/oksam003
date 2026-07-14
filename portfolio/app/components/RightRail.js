import { trends, whoToFollow } from "../data";

export default function RightRail() {
  return (
    <aside className="right">
      <input className="search" placeholder="🔍 Search" />

      <div className="widget">
        <h2>Tech Trends</h2>
        {trends.map((t) => (
          <div key={t.tag} className="trend">
            <div className="trend-cat">{t.category} · Trending</div>
            <div className="trend-tag">{t.tag}</div>
            <div className="trend-posts">{t.posts} posts</div>
          </div>
        ))}
      </div>

      <div className="widget">
        <h2>You might like</h2>
        {whoToFollow.map((f) => (
          <div key={f.handle} className="follow-row">
            <div className="follow-av">{f.avatar}</div>
            <div className="follow-meta">
              <div className="n">{f.name}</div>
              <div className="h">{f.handle}</div>
            </div>
            <button className="follow-btn">Follow</button>
          </div>
        ))}
      </div>

      <div className="footer">
        © {new Date().getFullYear()} Samuel Okoosi · Built with Next.js ·
        Twitter/X-inspired portfolio
      </div>
    </aside>
  );
}
