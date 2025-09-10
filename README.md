# 🚀 Stephen Freerking - Portfolio

A modern, responsive portfolio website built with Next.js and deployed on Cloudflare Workers using OpenNext. Features real-time data integration with Credly, Microsoft Learn, and TryHackMe APIs.

## ✨ Features

- **🎨 Modern Design**: Clean, professional portfolio with dark mode support
- **📊 Live Data**: Real-time certifications and skills from Credly API
- **📚 Microsoft Learn Integration**: Live progress tracking from Microsoft Learn
- **🔓 TryHackMe Integration**: Real-time cybersecurity learning stats and achievements
- **📱 Responsive**: Optimized for all devices and screen sizes (mobile-first design)
- **♿ Accessible**: Built with accessibility in mind using Radix UI components
- **⚡ Fast**: Deployed on Cloudflare Workers for global performance
- **🌙 Dark Mode**: Automatic dark/light mode detection with smooth transitions

## 🛠️ Tech Stack

- **⚛️ Framework**: Next.js 15 with App Router
- **🎨 Styling**: Tailwind CSS with custom dark mode support
- **🧩 UI Components**: Radix UI for accessible, unstyled components
- **☁️ Deployment**: Cloudflare Workers via OpenNext
- **🔗 APIs**: 
  - Credly API for certifications and skills
  - Microsoft Learn API for progress tracking
  - TryHackMe API for cybersecurity achievements
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

3. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 🔨 Building for Production

```bash
pnpm build
```

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
├── hooks/                # Custom React hooks
│   └── useApiData.ts     # Generic API data fetching hook
├── lib/                  # Utility functions
│   ├── api.ts           # API utility functions
│   └── utils.ts         # Tailwind CSS utilities
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

- **📱 Enhanced Responsiveness**: Improved centering and layout on all screen sizes
- **🎯 Better Grid Layout**: Optimized certification grid with proper centering
- **⚡ Performance Optimizations**: Reduced bundle size and improved loading times
- **🎨 UI Polish**: Enhanced visual design and user experience

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
