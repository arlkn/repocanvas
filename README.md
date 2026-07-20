<div align="center">
    
<svg width="1800" height="520" viewBox="0 0 1800 520" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="34" y1="24" x2="476" y2="496" gradientUnits="userSpaceOnUse">
      <stop stop-color="#7C3AED"/>
      <stop offset="0.52" stop-color="#4F46E5"/>
      <stop offset="1" stop-color="#06B6D4"/>
    </linearGradient>
    <linearGradient id="line" x1="145" y1="112" x2="374" y2="405" gradientUnits="userSpaceOnUse">
      <stop stop-color="white"/>
      <stop offset="1" stop-color="#E0F2FE"/>
    </linearGradient>
  </defs>
  <rect width="1800" height="520" rx="72" fill="#090E1A"/>
  <rect x="32" y="32" width="456" height="456" rx="122" fill="url(#bg)"/>
  <rect x="114" y="100" width="292" height="320" rx="62" fill="#0B1020" fill-opacity="0.86"/>
  <path d="M154 189V157C154 145.954 162.954 137 174 137H206M314 137H346C357.046 137 366 145.954 366 157V189M366 331V363C366 374.046 357.046 383 346 383H314M206 383H174C162.954 383 154 374.046 154 363V331" stroke="url(#line)" stroke-width="17" stroke-linecap="round"/>
  <path d="M210 203V300C210 322.091 227.909 340 250 340H281M210 242H270C292.091 242 310 224.091 310 202V199" stroke="url(#line)" stroke-width="19" stroke-linecap="round"/>
  <circle cx="210" cy="192" r="23" fill="#0B1020" stroke="url(#line)" stroke-width="14"/>
  <circle cx="310" cy="187" r="23" fill="#0B1020" stroke="url(#line)" stroke-width="14"/>
  <circle cx="297" cy="340" r="23" fill="#0B1020" stroke="url(#line)" stroke-width="14"/>

  <text x="560" y="260" fill="white" font-family="Inter, Arial, sans-serif" font-size="154" font-weight="760" letter-spacing="-7">Repo<tspan fill="url(#bg)">Canvas</tspan></text>
  <text x="568" y="338" fill="#9CA3AF" font-family="Inter, Arial, sans-serif" font-size="42" font-weight="500" letter-spacing="1">DESIGN BETTER GITHUB READMES</text>
</svg>

<img width="1800" height="520" alt="repocanvas-wordmark" src="https://github.com/user-attachments/assets/747bb0fa-0066-4e3f-b974-5f7211c9e613" />

### Premium GitHub README Builder

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

**Build beautiful GitHub READMEs without manually writing Markdown.**

[Features](#features) | [Getting Started](#getting-started) | [Tech Stack](#tech-stack) | [Architecture](#architecture) | [Contributing](#contributing)

</div>

---

## About

RepoCanvas is a premium GitHub README, profile, and repository branding builder. Create professional READMEs with a visual editor — no Markdown knowledge required.

Choose from 6 templates, add sections like hero banners, tech stacks, feature lists, GitHub widgets, social links, and licenses. See a live preview as you build, then download or copy your README.md.

## Features

- **Visual Section Editor** — Add, reorder, and configure sections with a point-and-click interface
- **7 Section Types** — Hero, About, Tech Stack, Features, GitHub Widgets, Social, License
- **79 Technologies** — Pre-configured tech icons via skillicons.dev with shields.io fallback
- **Live Markdown Preview** — See your README rendered in real-time as you edit
- **GitHub Widgets** — Stats, streak, top languages, and activity graphs with theme support
- **6 Templates** — Minimal, Developer, Showcase, Creative, Organization, Blank
- **Export & Copy** — Download as README.md or copy to clipboard instantly
- **Command Palette** — Quick search and add sections with keyboard shortcuts
- **Dark Mode** — Premium dark theme with spectrum-inspired accents
- **Persistent Config** — Your work is saved to localStorage automatically

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/arlkn/repocanvas.git

# Navigate to the project
cd repocanvas

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

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
| State | Zustand (with localStorage persist) |
| Markdown | react-markdown, remark-gfm |
| Icons | Lucide React, skillicons.dev |
| Animation | Framer Motion |
| Forms | React Hook Form, Zod |
| Testing | Vitest, React Testing Library |

## Architecture

```
src/
├── app/                        # Next.js App Router
│   ├── page.tsx                # Main builder page
│   └── layout.tsx              # Root layout with theme
├── components/
│   ├── ui/                     # shadcn/ui components + TechIcon
│   ├── layout/                 # Sidebar, TopBar, CommandPalette, ToastProvider
│   ├── editor/                 # Section editor router
│   └── preview/                # Live markdown preview
├── features/
│   ├── hero/                   # Hero section editor
│   ├── about/                  # About section editor
│   ├── tech-stack/             # Tech stack editor (79 technologies)
│   ├── features/               # Features section editor
│   ├── github-widgets/         # GitHub widgets editor
│   ├── social/                 # Social links editor
│   └── license/                # License section editor
├── lib/
│   ├── constants.ts            # Technologies, templates, section types
│   ├── markdown-engine.ts      # Generates README markdown from config
│   └── utils.ts                # Shared utilities
├── store/
│   └── readme-store.ts         # Zustand store with persist
├── types/
│   └── index.ts                # Shared TypeScript types
└── test/
    └── markdown-engine.test.ts # Markdown engine tests
```

## Roadmap

- [ ] Profile README builder (separate from repo READMEs)
- [ ] Custom section types
- [ ] Import existing README for editing
- [ ] More GitHub widgets (contributions, sponsors)
- [ ] SVG badge generator
- [ ] Template sharing via URL
- [ ] Multi-language support

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

---

<div align="center">

**Built with care for developers who want beautiful READMEs**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/arlkn)

</div>
