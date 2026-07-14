import Sidebar from "./components/Sidebar";
import RightRail from "./components/RightRail";
import ProfileHeader from "./components/ProfileHeader";
import Tweet from "./components/Tweet";
import { tweets } from "./data";

export default function Home() {
  return (
    <div className="app">
      <Sidebar />

      <main className="feed">
        <div className="feed-header">Profile</div>
        <ProfileHeader />
        {tweets.map((t) => (
          <Tweet key={t.id} tweet={t} />
        ))}
      </main>

      <RightRail />
    </div>
  );
}
