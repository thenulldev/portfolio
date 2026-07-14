# 🚀 Stephen Freerking - Portfolio

A modern cybersecurity portfolio built with Next.js 16, featuring live certification data, skill aggregation, a career timeline, and learning progress tracking. Deployed on Cloudflare Workers.

## ✨ Features

- **🏆 Live Certifications**: Real-time data from Credly + OffSec via `*.thenull.dev` proxy workers, with issuer filtering and a click-to-view detail dialog
- **🧠 Skill Aggregation**: Categories (Security, Cloud, Networking, Programming, Infrastructure, Data & Analytics, Tools) with weighted counts built from cert skills — see "Skills Visualization" below
- **💼 Career Timeline**: Interactive experience timeline sourced from local static data
- **📚 Learning Dashboard**: Microsoft Learn, TryHackMe, and Hack The Box progress cards in a unified overview
- **🎨 Modern UI**: Sky-themed design with dark mode, responsive layout, and smooth animations
- **⚡ Fast**: Deployed on Cloudflare Workers for global edge performance

## 🛠️ Tech Stack

- **⚛️ Framework**: Next.js 16 with App Router
- **🎨 Styling**: Tailwind CSS 4 with custom sky color theme
- **🧩 UI Components**: Radix UI (primitive) + custom styled components, FontAwesome icons
- **☁️ Deployment**: Cloudflare Workers via OpenNext
- **📦 Package Manager**: pnpm

## 🔌 API Endpoints

| Endpoint | Description | Env |
|----------|-------------|-----|
| `/api/certifications` | Proxies Credly + OffSec via custom `*.thenull.dev` workers, merges results | none |
| `/api/ms-learn` | Fetches Microsoft Learn learning progress and achievements | none |
| `/api/tryhackme` | Fetches TryHackMe room completions and cybersecurity stats | none |
| `/api/htb` | Fetches Hack The Box profile progress | none |

All four routes are server-rendered on demand by the Cloudflare Worker. None of them require API keys from this project — the `*.thenull.dev` workers handle their own auth upstream.

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
│   │   ├── htb/
│   │   ├── ms-learn/
│   │   └── tryhackme/
│   ├── page.tsx               # Home page (renders PortfolioLayout)
│   ├── layout.tsx             # Root layout
│   ├── robots.ts              # /robots.txt
│   └── sitemap.ts             # /sitemap.xml
├── components/
│   ├── features/
│   │   ├── career/            # Career dashboard (CareerDashboard, CareerTimeline)
│   │   ├── learning/          # Learning dashboard (LearningDashboard, HTBCard, MicrosoftLearnCard, TryHackMeCard)
│   │   ├── skills/            # Skills + certs (SkillsAndCertifications, CertificationGrid, CertificationTimeline)
│   │   └── stats/             # StatsOverview
│   ├── layout/                # AppShell, PortfolioLayout
│   ├── shared/                # Socials
│   └── ui/                    # Base UI components (Card, Badge, Dialog, etc.)
├── hooks/                     # Custom hooks (useCertifications, useData)
├── lib/                       # Shared utilities (api, cache, experience-data, format, static-data, utils)
└── types/                     # TypeScript type definitions
```

### Tabs

The single-page layout is driven by `PortfolioLayout.tsx` and switches between three tabs in `AppShell`:

1. **Skills & Certifications** — live cert cards with issuer filter, click-to-view detail dialog
2. **Career Experience** — career timeline from local static data
3. **Learning Journey** — Microsoft Learn + TryHackMe + Hack The Box progress cards

Data sources tabulated:

| Tab | Source |
|-----|--------|
| Skills & Certifications | `/api/certifications` (Credly + OffSec via proxy) |
| Career Experience | `src/lib/static-data.ts` (local) |
| Learning Journey | `/api/ms-learn`, `/api/tryhackme`, `/api/htb` |

### No blog (deliberate)

The site has no blog. There used to be one — a Markdown scaffolding referenced in earlier READMEs and a Ghost CMS integration (`/api/ghost`, `/api/newsletter`) — but neither ever shipped. Both were removed in the same cleanup commit (`cc0c437`, "remove blog, status page, and dead API routes") that cleaned up the rest of the unused scaffolding. The portfolio's content surface is now:

- **Certifications** (live, from external APIs)
- **Career Experience** (local static data in `src/lib/static-data.ts`)
- **Learning Journey** (live, from external APIs)

If you want to add a blog later, `gray-matter` + `next-mdx-remote` for local MDX is the lowest-overhead path — content ships in the repo, no env vars, no CMS account. See the "Extending the site" section below.

## 🎨 Skills Visualization

The skills system uses a weighted scoring model:

- **Certification Count**: More certs with the same skill = higher score
- **Weight (1-5)**: Core security skills (Penetration Testing, CISSP) weight 5; supporting tools (Nmap, Wireshark) weight 1-2
- **Proficiency Formula**: `40 + min((certCount-1)*8, 40) + (weight-1)*5` capped at 100
- **Categories**: Security, Cloud, Networking, Programming, Infrastructure, Data & Analytics, Tools

The data shape (`{skills, skillCounts}`) is produced by `processCertifications` in `src/lib/skills.ts` from the `/api/certifications` payload. The current consumers are `SkillsAndCertifications` (summary stats, issuer filter, dialog); the cert grid and timeline render directly from the cert list.

Skill categories and weights are defined in `src/types/skills-visualization.ts` (`SKILL_CATEGORIES`, `getSkillWeight`). Adding a new visualisation that consumes `{skills, skillCounts}` is now a single-component addition — see the unit tests in `src/lib/skills.test.ts` for the contract.

## 🔧 Configuration

The site needs no environment variables in normal operation:

- `/api/certifications` calls `credly.thenull.dev` and `offsec.thenull.dev` — your own Cloudflare Workers that handle their own upstream auth
- `/api/ms-learn`, `/api/tryhackme`, `/api/htb` hit public Microsoft / TryHackMe / HTB endpoints

If you fork the project, swap the `thenull.dev` URLs in `src/app/api/certifications/route.ts` for your own equivalent workers.

## 🌍 Deployment

Deployed to Cloudflare Workers via the OpenNext adapter. Pushes to `main` branch auto-deploy via GitHub Actions, or run `pnpm deploy` for a manual push.

## 🛠 Extending the site

Some features have been discussed but deliberately deferred. They're captured here so a future contributor doesn't reopen the same conversations from scratch:

- **Local MDX blog** — add `gray-matter` + `next-mdx-remote`, content in `src/content/posts/*.mdx`, build-time generation. Roughly 1–2 hr of work; ships content as part of the deployable artifact.
- **Skills radar chart** — was originally part of the Skills tab, removed in `cc0c437` along with the blog. The dead radar code was cleared in this branch. Re-adding it as a `SkillsRadar.tsx` widget (~150 lines, single-purpose) was proposed and rejected in favour of the simpler text-only design.
- **Per-cert OG image generation** — Next 16 supports dynamic `opengraph-image.tsx` routes at `app/opengraph-image.tsx`. Easy follow-up if you want richer link previews when posting certs on LinkedIn / X.
- **Pre-commit hook** — Husky + lint-staged to run `tsc --noEmit` + `eslint` before each commit. Avoids landing commits that violate the (now-clean) lint baseline.

---

Built with ❤️ using Next.js 16 and Cloudflare Workers 🚀


