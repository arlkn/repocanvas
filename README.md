<div align="center">
    
<img width="1536" height="1024" alt="ChatGPT Image Jul 21, 2026, 01_15_50 AM" src="https://github.com/user-attachments/assets/58247c7e-7777-4dc7-a507-a791ae97ec2b" />

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
