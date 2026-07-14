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
    time: "1h",
    project: {
      title: "NexBit — Crypto Exchange",
      desc: "A Bybit-style crypto & meme-coin trading platform with live prices, a TradingView-style candlestick chart, order book, and a simulated wallet. Built with Next.js 16.",
      tech: ["Next.js", "React", "CoinGecko API", "SVG Charts"],
      image:
        "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&q=80&auto=format&fit=crop",
      link: "https://github.com/oksam003/oksam003/tree/main/crypto-app",
    },
    content:
      "🚀 Just shipped NexBit — a full crypto exchange with spot + meme-coin trading, live market data, and an interactive candlestick chart. Trade DOGE, PEPE, BTC & more 📈",
    tags: ["#crypto", "#nextjs", "#trading", "#memecoins"],
    stats: { replies: 51, retweets: 132, likes: 587 },
  },
  {
    id: 4,
    time: "8h",
    project: {
      title: "Mae Car Dealership",
      desc: "A modern car dealership platform — browse inventory, filter by make/model/price, book test drives, and manage listings. Built with React, Node.js & MongoDB.",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      image:
        "https://images.unsplash.com/photo-1567818735868-e71b99932e29?w=800&q=80&auto=format&fit=crop",
      link: "https://github.com/oksam003",
    },
    content:
      "🚗 Introducing Mae Car Dealership — my latest full-stack project. Browse cars, filter, and book test drives right from the app. Here's a look 👇",
    tags: ["#cardealership", "#fullstack", "#react"],
    stats: { replies: 42, retweets: 88, likes: 401 },
  },
  {
    id: 5,
    time: "1d",
    project: {
      title: "E-Commerce Platform",
      desc: "Full-stack shopping app with cart, auth, and payment flow. Built with React + Node.js + MongoDB.",
      tech: ["React", "Node.js", "MongoDB"],
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80&auto=format&fit=crop",
      link: "https://github.com/oksam003",
    },
    content: "🚀 Shipped a full-stack e-commerce platform. Here's a peek 👇",
    stats: { replies: 18, retweets: 44, likes: 189 },
  },
  {
    id: 6,
    time: "3d",
    project: {
      title: "Task Manager App",
      desc: "A productivity app to organize tasks with drag-and-drop, filtering, and persistent storage.",
      tech: ["React", "CSS", "LocalStorage"],
      image:
        "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80&auto=format&fit=crop",
      link: "https://github.com/oksam003",
    },
    content: "✅ Built a sleek task manager to stay organized. Clean UI, smooth UX.",
    stats: { replies: 9, retweets: 21, likes: 98 },
  },
  {
    id: 7,
    time: "5d",
    project: {
      title: "Portfolio API",
      desc: "REST API serving portfolio data with Python. JWT auth and PostgreSQL storage.",
      tech: ["Python", "PostgreSQL", "REST"],
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80&auto=format&fit=crop",
      link: "https://github.com/oksam003",
    },
    content: "🐍 A Python-powered REST API backing my projects.",
    stats: { replies: 7, retweets: 15, likes: 76 },
  },
  {
    id: 8,
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
