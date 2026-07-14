import { profile } from "../data";

export default function Tweet({ tweet }) {
  const { pinned, time, content, tags, project, stats } = tweet;
  return (
    <article className="tweet">
      <div className="avatar-sm">{profile.avatar}</div>
      <div className="tweet-body">
        {pinned && <div className="pinned-label">📌 Pinned</div>}
        <div className="tweet-head">
          <span className="tweet-name">{profile.name}</span>
          <span className="verified">✔️</span>
          <span className="tweet-handle">{profile.handle}</span>
          <span className="tweet-time">· {time}</span>
        </div>

        <p className="tweet-text">{content}</p>

        {tags && (
          <div className="tags">
            {tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        )}

        {project && (
          <a
            className="project-card"
            href={project.link}
            target="_blank"
            rel="noreferrer"
          >
            <div className="project-thumb">
              {project.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                />
              ) : (
                "🚀"
              )}
            </div>
            <div className="project-info">
              <div className="project-title">{project.title}</div>
              <div className="project-desc">{project.desc}</div>
              <div className="project-tech">
                {project.tech.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </a>
        )}

        <div className="tweet-actions">
          <span className="action">💬 {stats.replies}</span>
          <span className="action rt">🔁 {stats.retweets}</span>
          <span className="action like">❤️ {stats.likes}</span>
          <span className="action">📊 {stats.likes * 12}</span>
          <span className="action">🔖</span>
        </div>
      </div>
    </article>
  );
}
