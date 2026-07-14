import { profile } from "../data";

export default function ProfileHeader() {
  return (
    <>
      <div className="banner" />
      <div className="profile-head">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div className="avatar-lg">{profile.avatar}</div>
          <div className="profile-actions">
            <button className="follow-btn">Follow</button>
          </div>
        </div>

        <div className="profile-name">
          {profile.name} <span className="verified">✔️</span>
        </div>
        <div className="profile-handle">{profile.handle}</div>
        <p className="profile-bio">{profile.bio}</p>

        <div className="profile-meta">
          <span>📍 {profile.location}</span>
          <a href={`https://${profile.website}`} target="_blank" rel="noreferrer">
            🔗 {profile.website}
          </a>
          <a href={`mailto:${profile.email}`}>✉️ {profile.email}</a>
          <span>📅 {profile.joined}</span>
        </div>

        <div className="profile-stats">
          <span>
            <b>{profile.following}</b> Following
          </span>
          <span>
            <b>{profile.followers}</b> Followers
          </span>
        </div>
      </div>

      <div className="tabs">
        <div className="tab active">Posts</div>
        <div className="tab">Projects</div>
        <div className="tab">Skills</div>
        <div className="tab">Likes</div>
      </div>
    </>
  );
}
