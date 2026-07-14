# 𝕏 Portfolio — Samuel Okoosi

A personal portfolio built to look and feel like **Twitter / X**. Your profile, skills, and projects are presented as a feed of "posts" — complete with a left nav rail, profile banner, verified badge, and a right-hand trends sidebar.

Built with **Next.js 15** (App Router) and plain CSS.

## ✨ Features

- Twitter/X three-column layout (nav · feed · trends)
- Profile header with banner, avatar, bio, follow button & stats
- Projects shown as tweet "cards" with tech chips and links
- Tech trends & "you might like" widgets
- Fully responsive — collapses to icon rail, then bottom tab bar on mobile
- Dark theme matching X's palette

## 🚀 Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
```

Build for production:

```bash
npm run build
npm run start
```

## 🧩 Customize

All content lives in [`app/data.js`](app/data.js) — edit `profile`, `tweets`, `trends`, and `whoToFollow` to make it yours. No component changes needed.

## 📦 Deploy

Deploy free on [Vercel](https://vercel.com) (creators of Next.js): push to GitHub, import the repo, and select the `portfolio` folder as the root.

---

Built with 💙 by [Samuel Okoosi](https://github.com/oksam003)
