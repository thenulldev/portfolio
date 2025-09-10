# 🚀 Stephen Freerking - Portfolio

A modern, responsive portfolio website built with Next.js and deployed on Cloudflare Workers using OpenNext. Features real-time data integration with Credly, Microsoft Learn, and TryHackMe APIs.

## ✨ Features

- **🎨 Modern Design**: Clean, professional portfolio with dark mode support
- **📊 Live Data**: Real-time certifications and skills from Credly API
- **📚 Microsoft Learn Integration**: Live progress tracking from Microsoft Learn
- **🔓 TryHackMe Integration**: Real-time cybersecurity learning stats and achievements
- **📝 Blog System**: Complete blog functionality with markdown support and dynamic content generation
- **📱 Responsive**: Optimized for all devices and screen sizes (mobile-first design)
- **♿ Accessible**: Built with accessibility in mind using Radix UI components
- **⚡ Fast**: Deployed on Cloudflare Workers for global performance
- **🌙 Dark Mode**: Automatic dark/light mode detection with smooth transitions
- **🔄 Automated Content**: Blog posts automatically generated from markdown files

## 🛠️ Tech Stack

- **⚛️ Framework**: Next.js 15 with App Router
- **🎨 Styling**: Tailwind CSS with custom dark mode support
- **🧩 UI Components**: Radix UI for accessible, unstyled components
- **☁️ Deployment**: Cloudflare Workers via OpenNext
- **🔗 APIs**: 
  - Credly API for certifications and skills
  - Microsoft Learn API for progress tracking
  - TryHackMe API for cybersecurity achievements
- **📝 Content Management**: 
  - Markdown-based blog posts with frontmatter
  - Gray-matter for metadata parsing
  - Custom markdown-to-HTML conversion
- **🎯 Icons**: FontAwesome for social media and UI icons
- **📦 Package Manager**: pnpm for faster, more efficient dependency management

## 🚀 Getting Started

### 📋 Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Cloudflare account (for deployment)

### 💻 Development

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies:
```bash
pnpm install
```

3. Generate blog data (if you have blog posts):
```bash
pnpm generate-blog
```

4. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 🔨 Building for Production

The build process automatically generates blog data:
```bash
pnpm build
```

This command will:
- Generate blog data from markdown files
- Build the Next.js application
- Prepare for deployment

### 🌐 Local Cloudflare Workers Preview

To test the Cloudflare Workers deployment locally:

```bash
pnpm preview
```

This will start the OpenNext build process and run the app using Wrangler dev server.

## 🚀 Deployment

### ☁️ Deploy to Cloudflare Workers

1. Make sure you have Wrangler CLI installed and authenticated:
```bash
npm install -g wrangler
wrangler login
```

2. Deploy the application:
```bash
pnpm deploy
```

This command will:
- 🏗️ Build the Next.js application using OpenNext
- ☁️ Deploy it to Cloudflare Workers
- 🌍 Make it available at your configured domain

### 🔧 Environment Variables

The application uses the following external APIs:
- **🏆 Credly API**: For fetching certifications and skills
- **📚 Microsoft Learn API**: For fetching learning progress
- **🔓 TryHackMe API**: For fetching cybersecurity achievements and stats

No API keys are required as these are public endpoints.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── certifications/ # Credly API proxy
│   │   ├── ms-learn/      # Microsoft Learn API proxy
│   │   └── tryhackme/     # TryHackMe API proxy
│   ├── blog/              # Blog pages and routing
│   │   ├── [id]/          # Dynamic blog post pages
│   │   ├── [slug]/        # Alternative slug-based routing
│   │   └── page.tsx       # Blog listing page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Radix UI components
│   │   ├── badge.tsx     # Badge component
│   │   ├── card.tsx      # Card component
│   │   ├── checkmark-badge.tsx # Checkmark badge
│   │   ├── empty-state.tsx # Empty state component
│   │   ├── error-state.tsx # Error state component
│   │   ├── hover-card.tsx # Hover card component
│   │   ├── loading-state.tsx # Loading state component
│   │   ├── section-container.tsx # Section container
│   │   └── section-header.tsx # Section header
│   ├── creds.tsx         # Certifications component
│   ├── skills.tsx        # Skills component
│   ├── progress.tsx      # Microsoft Learn progress
│   ├── tryhackme.tsx     # TryHackMe stats component
│   ├── socials.tsx       # Social media links
│   └── useCertifications.ts # Custom hook for data fetching
├── content/              # Content management
│   └── blog/             # Blog post markdown files
│       ├── getting-started-with-cybersecurity.md
│       ├── microsoft-learn-journey.md
│       └── tryhackme-learning-path.md
├── data/                 # Generated data files
│   └── blog-posts.json   # Processed blog posts data
├── hooks/                # Custom React hooks
│   └── useApiData.ts     # Generic API data fetching hook
├── lib/                  # Utility functions
│   ├── api.ts           # API utility functions
│   └── utils.ts         # Tailwind CSS utilities
├── scripts/              # Build and deployment scripts
│   ├── generate-blog-data.js # Blog data generation
│   ├── deploy-cloudflare.js  # Cloudflare deployment
│   └── preview-cloudflare.js # Local Cloudflare preview
├── styles/              # Additional styles
│   └── responsive.css   # Responsive design utilities
└── types/               # TypeScript type definitions
    └── index.ts         # Shared type definitions
```

## 🔌 API Endpoints

### `/api/certifications` 🏆
Proxies requests to the Credly API to fetch certifications and skills data.

### `/api/ms-learn` 📚
Proxies requests to the Microsoft Learn API to fetch learning progress and achievements.

### `/api/tryhackme` 🔓
Proxies requests to the TryHackMe API to fetch cybersecurity achievements and statistics.

## 📝 Blog System

The portfolio includes a complete blog system with the following features:

### 📄 Blog Posts
- **Markdown Support**: Write posts in markdown with frontmatter metadata
- **Automatic Generation**: Blog data is generated from markdown files during build
- **Dynamic Routing**: Posts are accessible via `/blog/[slug]` URLs
- **Metadata Support**: Title, description, date, tags, author, and read time

### 🛠️ Blog Management

#### Adding New Posts
1. Create a new `.md` file in `src/content/blog/`
2. Add frontmatter metadata:
```yaml
---
title: "Your Post Title"
description: "Brief description"
date: "2024-12-01"
tags: ["tag1", "tag2"]
author: "Stephen Freerking"
readTime: "5 min read"
---

Your markdown content here...
```

3. Run `pnpm generate-blog` to process the new post
4. The post will be available at `/blog/your-post-slug`

#### Blog Data Generation
The `generate-blog-data.js` script:
- Processes all markdown files in `src/content/blog/`
- Converts markdown to HTML with syntax highlighting
- Extracts frontmatter metadata
- Generates `src/data/blog-posts.json` with all post data
- Sorts posts by date (newest first)

### 🎨 Blog Styling
- Responsive design with mobile-first approach
- Syntax highlighting for code blocks
- Consistent typography and spacing
- Dark mode support
- Accessible navigation and reading experience

## 🎨 Customization

### ➕ Adding New Certifications
Certifications are automatically fetched from your Credly profile. No manual updates required.

### 🔧 Updating Skills
Skills are extracted from your certifications and automatically deduplicated.

### 🎨 Styling
The application uses Tailwind CSS with custom dark mode support. Modify `src/app/globals.css` and component styles as needed.

### 📱 Responsive Design
The portfolio is built with a mobile-first approach and includes:
- Responsive grid layouts for certifications (1-5 columns based on screen size)
- Adaptive typography and spacing
- Touch-friendly interactive elements

## ⚡ Performance

- **🌍 Global CDN**: Deployed on Cloudflare's global network
- **⚡ Edge Computing**: Server-side rendering at the edge
- **📦 Optimized Assets**: Images and fonts are optimized automatically
- **💾 Caching**: Intelligent caching for API responses
- **🚀 Fast Loading**: Optimized bundle sizes and lazy loading

## 🔧 Recent Improvements

### 🏗️ Major Codebase Refactor
- **🔄 Eliminated Code Duplication**: Removed duplicate loading and error states across components
- **🧩 Reusable UI Components**: Created standardized UI components for consistent design
- **📦 Centralized Type Definitions**: Improved type safety with shared interfaces
- **🎯 Standardized Data Fetching**: Generic `useApiData` hook for consistent API handling
- **📁 Better Organization**: Cleaner file structure and import patterns

### 📝 Blog System Implementation
- **📄 Complete Blog Functionality**: Full markdown-based blog system
- **🔄 Automated Content Generation**: Scripts for processing blog posts
- **🎨 Blog Styling**: Responsive design with syntax highlighting
- **📊 Dynamic Routing**: SEO-friendly blog post URLs

### 🎨 UI/UX Enhancements
- **📱 Enhanced Responsiveness**: Improved centering and layout on all screen sizes
- **🎯 Better Grid Layout**: Optimized certification grid with proper centering
- **⚡ Performance Optimizations**: Reduced bundle size and improved loading times
- **🌙 Dark Mode Polish**: Enhanced visual design and user experience

## 🤝 Contributing

1. 🍴 Fork the repository
2. 🌿 Create a feature branch
3. ✏️ Make your changes
4. 🧪 Test thoroughly
5. 📤 Submit a pull request

## 📄 License

This project is private and proprietary.

## 💬 Support

For questions or issues, please contact Stephen Freerking.

---

Built with ❤️ using Next.js and Cloudflare Workers 🚀
