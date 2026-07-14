export const profile = {
  name: "Samuel Olanrewaju Okoosi",
  handle: "@oksam003",
  bio: "Software Developer 👨‍💻 | Building for the web with React, Node.js & Python. Anime lover 🎌. Always learning, always shipping.",
  location: "Nigeria 🇳🇬",
  joined: "Joined 2023",
  website: "github.com/oksam003",
  email: "Samuelokoosi21@gmail.com",
  following: 128,
  followers: 342,
  avatar: "SO",
};

export const nav = [
  { icon: "🏠", label: "Home" },
  { icon: "🔍", label: "Explore" },
  { icon: "🔔", label: "Notifications" },
  { icon: "✉️", label: "Messages" },
  { icon: "📌", label: "Projects" },
  { icon: "👤", label: "Profile" },
  { icon: "⚙️", label: "Settings" },
];

// Portfolio content presented as a Twitter/X feed of "tweets"
export const tweets = [
  {
    id: 1,
    pinned: true,
    time: "Pinned",
    content:
      "👋 Hi, I'm Samuel — a passionate Software Developer from Nigeria. I build clean, responsive web apps and love turning ideas into products. Scroll down to see what I've been working on 🧵",
    tags: ["#developer", "#webdev", "#opentowork"],
    stats: { replies: 24, retweets: 58, likes: 210 },
  },
  {
    id: 2,
    time: "2h",
    content:
      "🛠️ My stack: JavaScript, React, Node.js, Python, MongoDB, PostgreSQL, MySQL. Comfortable across the full stack and always exploring new tools.",
    tags: ["#javascript", "#react", "#nodejs", "#python"],
    stats: { replies: 12, retweets: 30, likes: 145 },
  },
  {
    id: 3,
    time: "1d",
    project: {
      title: "E-Commerce Platform",
      desc: "Full-stack shopping app with cart, auth, and payment flow. Built with React + Node.js + MongoDB.",
      tech: ["React", "Node.js", "MongoDB"],
      link: "https://github.com/oksam003",
    },
    content: "🚀 Shipped a full-stack e-commerce platform. Here's a peek 👇",
    stats: { replies: 18, retweets: 44, likes: 189 },
  },
  {
    id: 4,
    time: "3d",
    project: {
      title: "Task Manager App",
      desc: "A productivity app to organize tasks with drag-and-drop, filtering, and persistent storage.",
      tech: ["React", "CSS", "LocalStorage"],
      link: "https://github.com/oksam003",
    },
    content: "✅ Built a sleek task manager to stay organized. Clean UI, smooth UX.",
    stats: { replies: 9, retweets: 21, likes: 98 },
  },
  {
    id: 5,
    time: "5d",
    project: {
      title: "Portfolio API",
      desc: "REST API serving portfolio data with Python. JWT auth and PostgreSQL storage.",
      tech: ["Python", "PostgreSQL", "REST"],
      link: "https://github.com/oksam003",
    },
    content: "🐍 A Python-powered REST API backing my projects.",
    stats: { replies: 7, retweets: 15, likes: 76 },
  },
  {
    id: 6,
    time: "1w",
    content:
      "🎌 Fun fact: outside of coding, I'm a huge anime fan. It keeps the creativity flowing. What's everyone watching this season?",
    tags: ["#anime", "#life"],
    stats: { replies: 33, retweets: 12, likes: 254 },
  },
];

export const trends = [
  { category: "Frontend", tag: "React", posts: "12.4K" },
  { category: "Backend", tag: "Node.js", posts: "9.1K" },
  { category: "Language", tag: "Python", posts: "20.2K" },
  { category: "Database", tag: "MongoDB", posts: "5.6K" },
  { category: "Design", tag: "Figma", posts: "3.3K" },
];

export const whoToFollow = [
  { name: "React", handle: "@reactjs", avatar: "⚛️" },
  { name: "Node.js", handle: "@nodejs", avatar: "🟢" },
  { name: "Python", handle: "@ThePSF", avatar: "🐍" },
];
