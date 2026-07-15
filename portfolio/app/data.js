export const profile = {
  name: "Samuel Olanrewaju Okoosi",
  handle: "oksam003",
  role: "Full-Stack Software Engineer",
  tagline: "I design and ship full-stack systems — from schema to deploy.",
  location: "Lagos, Nigeria",
  email: "Samuelokoosi21@gmail.com",
  github: "https://github.com/oksam003",
  linkedin: "https://www.linkedin.com/in/samuel-okoosi-12b218259",
  revision: "v2.0",
  updated: "2026",
};

// ── Rendered as a SQL schema (CREATE TABLE) ──────────────────────────
export const schema = {
  table: "developer",
  columns: [
    { name: "id", type: "uuid", constraint: "PRIMARY KEY", value: "oksam003" },
    { name: "role", type: "varchar", constraint: "NOT NULL", value: "Full-Stack Engineer" },
    { name: "location", type: "varchar", constraint: "", value: "Lagos, NG" },
    { name: "experience", type: "int", constraint: "CHECK (> 0)", value: "3+ yrs" },
    { name: "focus", type: "text[]", constraint: "", value: "{web, apis, realtime}" },
    { name: "status", type: "enum", constraint: "DEFAULT", value: "open_to_work" },
  ],
  relations: [
    { table: "skills", on: "developer.id = skills.dev_id", type: "1:N" },
    { table: "projects", on: "developer.id = projects.owner_id", type: "1:N" },
  ],
};

// ── Rendered as API routes / endpoints (projects) ────────────────────
export const endpoints = [
  {
    method: "GET",
    path: "/projects/nexa",
    name: "Nexa — Crypto Exchange",
    status: 200,
    summary:
      "Bybit-style crypto & meme-coin exchange with real-time WebSocket price streaming, a TradingView-style candlestick chart, live order book, auth, deposit/withdraw wallet, and an AI trading assistant.",
    stack: ["Next.js 16", "WebSockets", "DexScreener", "Binance WS", "Auth"],
    link: "https://github.com/oksam003/oksam003/tree/main/crypto-app",
    tag: "flagship",
  },
  {
    method: "POST",
    path: "/projects/mae-dealership",
    name: "Mae Car Dealership",
    status: 201,
    summary:
      "Full-stack car dealership platform — browse inventory, filter by make/model/price, book test drives, and manage listings with payments.",
    stack: ["React", "Node.js", "MongoDB", "Stripe"],
    link: "https://github.com/oksam003",
    tag: "full-stack",
  },
  {
    method: "GET",
    path: "/projects/ecommerce",
    name: "E-Commerce Platform",
    status: 200,
    summary:
      "Shopping app with cart, authentication, and a checkout/payment flow.",
    stack: ["React", "Node.js", "MongoDB"],
    link: "https://github.com/oksam003",
    tag: "full-stack",
  },
  {
    method: "PUT",
    path: "/projects/task-manager",
    name: "Task Manager App",
    status: 200,
    summary:
      "Productivity app with drag-and-drop, filtering, and persistent storage.",
    stack: ["React", "CSS", "LocalStorage"],
    link: "https://github.com/oksam003",
    tag: "frontend",
  },
  {
    method: "GET",
    path: "/projects/portfolio-api",
    name: "Portfolio API",
    status: 200,
    summary: "REST API serving portfolio data with JWT auth and Postgres.",
    stack: ["Python", "PostgreSQL", "REST"],
    link: "https://github.com/oksam003",
    tag: "backend",
  },
];

// ── Rendered as a Docker / container architecture map ────────────────
export const containers = [
  {
    service: "frontend",
    image: "react:19-nextjs",
    port: "3000:3000",
    tech: ["React", "Next.js", "JavaScript", "HTML5", "CSS3", "Figma"],
    depends: ["api"],
  },
  {
    service: "api",
    image: "node:20-express",
    port: "8080:8080",
    tech: ["Node.js", "Python", "REST", "WebSockets", "JWT"],
    depends: ["database", "cache"],
  },
  {
    service: "database",
    image: "postgres:16 / mongo:7",
    port: "5432:5432",
    tech: ["PostgreSQL", "MongoDB", "MySQL", "Oracle"],
    depends: [],
  },
  {
    service: "cache",
    image: "redis:7-alpine",
    port: "6379:6379",
    tech: ["Redis", "In-memory"],
    depends: [],
  },
  {
    service: "infra",
    image: "aws / docker",
    port: "—",
    tech: ["AWS", "Docker", "CI/CD", "Netlify"],
    depends: [],
  },
];
