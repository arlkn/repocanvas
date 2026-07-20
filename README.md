<div align="center">

# Inspectra

### AI-Powered Website Analysis Platform

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

**Analyze websites from every angle.**

[Features](#features) | [Getting Started](#getting-started) | [Tech Stack](#tech-stack) | [Architecture](#architecture) | [Roadmap](#roadmap) | [Contributing](#contributing)

</div>

---

## About

Inspectra is an AI-powered website analysis platform that reviews public websites across 9 categories: performance, SEO, accessibility, mobile usability, content quality, UX, conversion readiness, security basics, and technical quality.

It uses real technical tools — not just surface-level checks — to deliver actionable findings with severity ratings, effort estimates, and AI-powered recommendations.

## Features

- **9 Analysis Categories** — Performance, SEO, Accessibility, Mobile Usability, Content Quality, UX, Conversion Readiness, Security, Technical Quality
- **Real Technical Analysis** — HTML parsing, DOM inspection, header analysis, metadata extraction
- **Deterministic Scoring** — Weighted category scores (0-100) with letter grades
- **SSRF Protection** — Blocks private IPs, localhost, cloud metadata endpoints, and encoded bypass attempts
- **Prioritized Findings** — Critical fixes, quick wins, and high-impact improvements sorted by severity and effort
- **AI Recommendations** — Executive summaries, content suggestions, and UX improvements (optional, requires API key)
- **Export & Share** — PDF, JSON, and Markdown report exports
- **Analysis History** — Track previous analyses with local persistence
- **Dark Mode** — Premium dark theme with spectrum-inspired accents

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/arlkn/inspectra.git

# Navigate to the project
cd inspectra

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
AI_PROVIDER=        # Optional: AI provider name
AI_API_KEY=         # Optional: API key for AI recommendations
AI_MODEL=           # Optional: Model to use for AI
APP_URL=            # Your app URL
ANALYSIS_TIMEOUT_MS=30000
MAX_RESPONSE_SIZE_BYTES=5242880
```

### Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run test` | Run tests |
| `npm run lint` | Run linter |

## Tech Stack

| Category | Technologies |
|----------|-------------|
| Framework | Next.js 16, React 19 |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS 4 |
| UI Components | shadcn/ui, Radix UI |
| State | Zustand |
| Icons | Lucide React |
| Animation | Framer Motion |
| Charts | Recharts |
| HTML Parsing | Cheerio |
| Forms | React Hook Form, Zod |
| Testing | Vitest, React Testing Library |

## Architecture

```
src/
├── app/                    # Next.js App Router pages & API routes
│   ├── page.tsx            # Landing page
│   ├── analyze/            # Analysis progress page
│   ├── report/[id]/        # Report dashboard
│   ├── history/            # Analysis history
│   ├── settings/           # User settings
│   └── api/analyze/        # Analysis API endpoint
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── layout/             # Header, Footer, Logo
│   ├── landing/            # Landing page sections
│   ├── report/             # Report dashboard components
│   ├── charts/             # Recharts visualizations
│   └── findings/           # Finding cards and filters
├── features/
│   ├── url-form/           # URL input with validation
│   ├── analyzer/           # Analysis pipeline
│   ├── scoring/            # Category scoring engine
│   ├── ai-review/          # AI recommendation system
│   ├── export/             # PDF/JSON/Markdown export
│   └── screenshots/        # Playwright screenshot capture
├── hooks/                  # Custom React hooks
├── lib/
│   ├── url-validation.ts   # SSRF protection & URL normalization
│   ├── scoring.ts          # Deterministic scoring engine
│   ├── storage.ts          # localStorage persistence
│   ├── constants.ts        # App config & category definitions
│   └── utils.ts            # Shared utilities
├── store/                  # Zustand stores (UI, analysis state)
├── types/                  # Shared TypeScript types
└── test/                   # Unit & integration tests
```

## Security

Inspectra implements SSRF protections when fetching external websites:

- Blocks localhost, private IPs (10.x, 172.16-31.x, 192.168.x), and link-local addresses
- Blocks cloud metadata endpoints (169.254.169.254)
- Blocks `file://`, `ftp://`, `data:`, `javascript:` schemes
- Validates DNS resolution to ensure public addresses
- Limits response size and redirect count
- Sets appropriate User-Agent headers

**Note:** This is not a penetration test or complete security audit tool.

## Roadmap

- [ ] Lighthouse integration
- [ ] Playwright screenshot capture
- [ ] Full analysis pipeline with all 9 categories
- [ ] AI provider abstraction (OpenAI, Anthropic, etc.)
- [ ] PDF export
- [ ] Analysis history with re-run support
- [ ] Demo mode with sample report
- [ ] Mobile-first responsive dashboard

## Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure to:
- Follow the existing code style
- Write tests for new features
- Update documentation as needed

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## Disclaimer

Inspectra provides automated website analysis and heuristic recommendations. It is not a substitute for a complete manual accessibility audit, penetration test, legal review, or professional SEO consultation.

---

<div align="center">

**Built with care for developers, designers, agencies, and small businesses**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/arlkn)

</div>
