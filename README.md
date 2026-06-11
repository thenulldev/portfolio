# 🚀 Stephen Freerking - Portfolio

A modern cybersecurity portfolio built with Next.js 16, featuring real-time certification data visualization, an interactive skills radar chart, a blog system, and learning progress tracking. Deployed on Cloudflare Workers.

## ✨ Features

- **📊 Interactive Skills Radar**: Weighted skill visualization with category-based scoring (Security, Cloud, Networking, Programming, Infrastructure, Data & Analytics, Tools)
- **🏆 Live Certifications**: Real-time data from Credly API with issuer filtering (ISC2, CompTIA, TryHackMe, LPI)
- **📚 Learning Dashboard**: Microsoft Learn progress tracking and TryHackMe cybersecurity stats
- **📝 Blog System**: Markdown-based blog with tag filtering, newsletter signup, and syntax highlighting
- **🎨 Modern UI**: Sky-themed design with dark mode, responsive layout, and smooth animations
- **⚡ Fast**: Deployed on Cloudflare Workers for global edge performance
- **🔄 Automated**: Build-time data generation for blog content

## 🛠️ Tech Stack

- **⚛️ Framework**: Next.js 16 with App Router
- **🎨 Styling**: Tailwind CSS with custom sky color theme
- **🧩 UI Components**: Radix UI (primitive) + custom styled components
- **☁️ Deployment**: Cloudflare Workers via OpenNext
- **📝 Content**: Markdown with gray-matter frontmatter parsing
- **📦 Package Manager**: pnpm

## 🔌 API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/api/certifications` | Proxies Credly API — fetches certifications and skills for a user |
| `/api/ms-learn` | Fetches Microsoft Learn learning progress and achievements |
| `/api/tryhackme` | Fetches TryHackMe room completions and cybersecurity stats |
| `/api/ghost` | Proxies Ghost CMS API for blog posts |
| `/api/newsletter` | Newsletter subscription endpoint |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Development

```bash
git clone https://github.com/thenulldev/portfolio.git
cd portfolio
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Building

```bash
pnpm build        # Build for production
pnpm preview      # Test Cloudflare Workers deployment locally
pnpm deploy       # Deploy to Cloudflare Workers
```

## 📁 Project Structure

```
src/
├── app/
│   ├── api/                   # API routes (route handlers)
│   │   ├── certifications/
│   │   ├── ghost/
│   │   ├── ms-learn/
│   │   ├── newsletter/
│   │   └── tryhackme/
│   ├── blog/
│   │   ├── [slug]/           # Blog post pages
│   │   ├── tag/[tag]/         # Tag-filtered blog listing
│   │   └── page.tsx          # Blog listing page
│   ├── page.tsx               # Home page
│   └── layout.tsx             # Root layout
├── components/
│   ├── features/
│   │   ├── blog/             # Blog components (BlogSection, BlogCard, BlogContent, NewsletterSignup)
│   │   ├── learning/          # Learning dashboard (LearningDashboard, MicrosoftLearnCard, TryHackMeCard)
│   │   └── skills/           # Skills visualization (SkillsAndCertifications, SkillsVisualization, SkillList)
│   ├── layout/               # App shell and portfolio layout
│   ├── shared/               # Shared components (Socials)
│   └── ui/                   # Base UI components (Card, Badge, Button, Dialog, etc.)
├── hooks/                    # Custom hooks (useApiData, useCertifications, useGhostPosts)
├── lib/
│   ├── api.ts               # Shared API route handler factory
│   └── utils.ts             # Tailwind + cn() utility
├── types/                    # TypeScript type definitions
│   ├── certifications.ts
│   ├── skills-visualization.ts
│   ├── microsoft-learn.ts
│   └── tryhackme.ts
└── content/
    └── blog/                 # Blog post markdown files
```

## 🎨 Skills Visualization

The skills system uses a weighted scoring model:

- **Certification Count**: More certs with the same skill = higher score
- **Weight (1-5)**: Core security skills (Penetration Testing, CISSP) weight 5; supporting tools (Nmap, Wireshark) weight 1-2
- **Proficiency Formula**: `40 + min((certCount-1)*8, 40) + (weight-1)*5` capped at 100
- **Categories**: Security, Cloud, Networking, Programming, Infrastructure, Data & Analytics, Tools

## 🔧 Configuration

Environment variables (optional — public APIs only):

```env
# No API keys required for:
// - /api/certifications (uses credly-scraper.nulldev.workers.dev)
// - /api/ms-learn
// - /api/tryhackme
```

## 🌍 Deployment

Deployed to Cloudflare Workers via OpenNext adapter. Pushes to `main` branch auto-deploy via GitHub Actions or manual `pnpm deploy`.

## 📝 Blog System

Add posts as markdown files in `src/content/blog/` with frontmatter:

```yaml
---
title: "Post Title"
description: "Brief description"
date: "2024-12-01"
tags: ["tag1", "tag2"]
author: "Stephen Freerking"
readTime: "5 min read"
---
```

Posts are generated into `src/data/blog-posts.json` at build time.

## ⚡ Performance

- Edge computing on Cloudflare Workers
- Static page generation for blog and home
- API routes for dynamic certification data
- Optimized bundle sizes with Next.js

---

Built with ❤️ using Next.js 16 and Cloudflare Workers 🚀

