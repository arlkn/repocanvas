<div align="center">
<img width="1800" height="520" alt="repocanvas-wordmark" src="https://github.com/user-attachments/assets/d5a8ad38-6701-4f4a-b945-e481a99fe9fa" />

  ### Premium GitHub README, Profile & Repository Branding Builder

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

Build beautiful GitHub READMEs without manually writing Markdown.

[Features](#features) | [Screenshots](#screenshots) | [Getting Started](#getting-started) | [Tech Stack](#tech-stack) | [Roadmap](#roadmap) | [Contributing](#contributing)

</div>

---

## About

RepoCanvas is a premium developer tool that helps you create stunning GitHub READMEs, profiles, and repository branding. No more fighting with Markdown syntax — design your README visually with a live preview, templates, and AI assistance.

## Features

### Core

- **Visual Editor** — Sidebar, editor, and live preview layout
- **Real-time Preview** — See your README as you build it
- **Drag & Drop** — Reorder sections with up/down controls
- **6 Templates** — Minimal, Student, Full Stack, AI Engineer, Open Source, macOS Developer

### Sections

- **Header** — Name, title, bio, typing animation, banner, avatar, alignment
- **About Me** — Biography, current work, learning, fun facts, contact
- **Tech Stack** — 79 searchable technologies with icons (Skill Icons)
- **Projects** — Multiple projects with images, links, technologies, and status badges
- **GitHub Widgets** — Stats, streak, activity graph, top languages, trophies
- **Socials** — GitHub, LinkedIn, X, portfolio, email, Discord
- **Custom Sections** — Unlimited custom markdown sections

### Tools

- **AI Assistant** — Generate descriptions, bios, installation guides, feature lists, and more (OpenAI integration with local fallback)
- **GitHub Import** — Fetch repository data (name, description, topics, languages, license, stars) and auto-populate fields
- **Quality Analyzer** — README score with suggestions for improvement
- **Command Palette** — Quick access to all features (Ctrl+K)
- **Theme Switcher** — Light, dark, and system themes
- **Keyboard Shortcuts** — Undo/Redo, copy, download, and more

### Import / Export

- Copy Markdown
- Download README.md
- Export/Import JSON configuration
- Import from files

## Screenshots

> Coming soon — RepoCanvas in action.

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

> **Note:** If you see outdated data, clear your browser's Local Storage key `repocanvas-config` and refresh.

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
| Framework | Next.js 15, React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| UI Components | shadcn/ui, Radix UI |
| State | Zustand |
| Icons | Lucide React |
| Animation | Framer Motion |
| Markdown | react-markdown, remark-gfm, rehype-raw |
| Forms | React Hook Form, Zod |
| Testing | Vitest, React Testing Library |

## Architecture

```
src/
├── app/              # Next.js App Router
├── components/       # Reusable UI components
│   ├── ui/           # shadcn/ui components
│   ├── layout/       # Layout components (sidebar, top bar, etc.)
│   ├── editor/       # Section editor components
│   └── preview/      # Live preview components
├── features/         # Feature modules
│   ├── header/       # Header section editor
│   ├── about-me/     # About Me section editor
│   ├── tech-stack/   # Tech Stack editor
│   ├── projects/     # Projects editor
│   ├── github-widgets/ # GitHub widgets
│   ├── socials/      # Social links editor
│   ├── custom-sections/ # Custom sections
│   ├── templates/    # Template system
│   ├── github/       # GitHub API integration
│   └── ai/           # AI assistant
├── hooks/            # Custom React hooks
├── lib/              # Utilities and constants
├── store/            # Zustand store
├── types/            # TypeScript types
└── test/             # Test files
```

## Roadmap

- [ ] AI provider support for Anthropic Claude
- [ ] More template options
- [ ] Custom badge generator
- [ ] Emoji picker
- [ ] Icon search
- [ ] Collaborative editing
- [ ] Cloud save & sync
- [ ] VS Code extension

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

**Built with care for the developer community**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/arlkn)

</div>
