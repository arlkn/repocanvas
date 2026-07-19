import type {
  Technology,
  Template,
  SocialPlatform,
  ReadmeConfig,
  HeaderData,
  AboutMeData,
  TechStackData,
  ProjectsData,
  GitHubWidgetsData,
  SocialsData,
  CustomSectionsData,
  Section,
} from "@/types";

export const TECHNOLOGIES: Technology[] = [
  { name: "JavaScript", icon: "javascript", category: "languages" },
  { name: "TypeScript", icon: "typescript", category: "languages" },
  { name: "Python", icon: "python", category: "languages" },
  { name: "Swift", icon: "swift", category: "languages" },
  { name: "Go", icon: "go", category: "languages" },
  { name: "Rust", icon: "rust", category: "languages" },
  { name: "Java", icon: "java", category: "languages" },
  { name: "C#", icon: "csharp", category: "languages" },
  { name: "React", icon: "react", category: "frontend" },
  { name: "Next.js", icon: "nextjs", category: "frontend" },
  { name: "Vue", icon: "vuejs", category: "frontend" },
  { name: "Angular", icon: "angular", category: "frontend" },
  { name: "Tailwind", icon: "tailwindcss", category: "frontend" },
  { name: "HTML", icon: "html5", category: "frontend" },
  { name: "CSS", icon: "css3", category: "frontend" },
  { name: "Node.js", icon: "nodedotjs", category: "backend" },
  { name: "Express", icon: "express", category: "backend" },
  { name: "NestJS", icon: "nestjs", category: "backend" },
  { name: "Django", icon: "django", category: "backend" },
  { name: "Laravel", icon: "laravel", category: "backend" },
  { name: "PostgreSQL", icon: "postgresql", category: "databases" },
  { name: "MongoDB", icon: "mongodb", category: "databases" },
  { name: "Redis", icon: "redis", category: "databases" },
  { name: "SQLite", icon: "sqlite", category: "databases" },
  { name: "Docker", icon: "docker", category: "cloud" },
  { name: "Kubernetes", icon: "kubernetes", category: "cloud" },
  { name: "AWS", icon: "amazonwebservices", category: "cloud" },
  { name: "Cloudflare", icon: "cloudflare", category: "cloud" },
  { name: "Vercel", icon: "vercel", category: "cloud" },
  { name: "Git", icon: "git", category: "tools" },
  { name: "GitHub", icon: "github", category: "tools" },
  { name: "Zed", icon: "zed", category: "tools" },
  { name: "VS Code", icon: "visualstudiocode", category: "tools" },
  { name: "Figma", icon: "figma", category: "tools" },
  { name: "Canva", icon: "canva", category: "tools" },
  { name: "GIMP", icon: "gimp", category: "tools" },
];

export const TECH_CATEGORIES: Record<string, string> = {
  languages: "Languages",
  frontend: "Frontend",
  backend: "Backend",
  databases: "Databases",
  cloud: "Cloud",
  tools: "Tools",
};

export const SOCIAL_PLATFORMS: Record<
  SocialPlatform,
  { name: string; icon: string; placeholder: string }
> = {
  github: { name: "GitHub", icon: "github", placeholder: "username" },
  linkedin: { name: "LinkedIn", icon: "linkedin", placeholder: "profile-url" },
  twitter: { name: "X (Twitter)", icon: "twitter", placeholder: "username" },
  portfolio: { name: "Portfolio", icon: "globe", placeholder: "https://yoursite.com" },
  email: { name: "Email", icon: "mail", placeholder: "email@example.com" },
  discord: { name: "Discord", icon: "discord", placeholder: "username#0000" },
};

export const SKILL_ICONS_BASE = "https://skillicons.dev/icons?i=";
export const SIMPLE_ICONS_BASE = "https://cdn.simpleicons.org/";

function createDefaultHeader(): HeaderData {
  return {
    name: "Your Name",
    title: "Full Stack Developer",
    bio: "Passionate about building great software",
    typingAnimation: true,
    banner: "",
    avatar: "",
    alignment: "center",
  };
}

function createDefaultAboutMe(): AboutMeData {
  return {
    biography: "",
    currentWork: "",
    learning: "",
    funFact: "",
    contact: "",
  };
}

function createDefaultTechStack(): TechStackData {
  return { selectedTech: [], displayStyle: "grid" };
}

function createDefaultProjects(): ProjectsData {
  return { projects: [], layout: "grid" };
}

function createDefaultGitHubWidgets(): GitHubWidgetsData {
  return {
    stats: false,
    streak: false,
    activityGraph: false,
    topLanguages: false,
    trophies: false,
    username: "",
  };
}

function createDefaultSocials(): SocialsData {
  return { socials: [] };
}

function createDefaultCustomSections(): CustomSectionsData {
  return { sections: [] };
}

export function createDefaultSection(type: Section["type"]): Section {
  const defaults: Record<Section["type"], () => Section> = {
    header: () => ({
      id: "header",
      type: "header",
      title: "Header",
      enabled: true,
      data: createDefaultHeader(),
    }),
    "about-me": () => ({
      id: "about-me",
      type: "about-me",
      title: "About Me",
      enabled: true,
      data: createDefaultAboutMe(),
    }),
    "tech-stack": () => ({
      id: "tech-stack",
      type: "tech-stack",
      title: "Tech Stack",
      enabled: true,
      data: createDefaultTechStack(),
    }),
    projects: () => ({
      id: "projects",
      type: "projects",
      title: "Projects",
      enabled: true,
      data: createDefaultProjects(),
    }),
    "github-widgets": () => ({
      id: "github-widgets",
      type: "github-widgets",
      title: "GitHub Widgets",
      enabled: false,
      data: createDefaultGitHubWidgets(),
    }),
    socials: () => ({
      id: "socials",
      type: "socials",
      title: "Socials",
      enabled: true,
      data: createDefaultSocials(),
    }),
    custom: () => ({
      id: `custom-${Date.now()}`,
      type: "custom",
      title: "Custom Section",
      enabled: true,
      data: createDefaultCustomSections(),
    }),
  };
  return defaults[type]();
}

export function createDefaultConfig(): ReadmeConfig {
  return {
    sections: [
      createDefaultSection("header"),
      createDefaultSection("about-me"),
      createDefaultSection("tech-stack"),
      createDefaultSection("projects"),
      createDefaultSection("github-widgets"),
      createDefaultSection("socials"),
      createDefaultSection("custom"),
    ],
    theme: "dark",
    username: "",
  };
}

function createTemplateConfig(overrides: Partial<ReadmeConfig> & { sections: Section[] }): ReadmeConfig {
  return {
    ...createDefaultConfig(),
    ...overrides,
  };
}

export const TEMPLATES: Template[] = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and simple README with essential sections",
    icon: "Minimize2",
    config: createTemplateConfig({
      sections: [
        {
          ...createDefaultSection("header"),
          data: {
            ...createDefaultHeader(),
            typingAnimation: false,
            alignment: "center",
          },
        },
        {
          ...createDefaultSection("about-me"),
          enabled: true,
        },
        createDefaultSection("tech-stack"),
        createDefaultSection("projects"),
        createDefaultSection("socials"),
      ],
    }),
  },
  {
    id: "student",
    name: "Student",
    description: "Perfect for students and new developers",
    icon: "GraduationCap",
    config: createTemplateConfig({
      sections: [
        {
          ...createDefaultSection("header"),
          data: {
            ...createDefaultHeader(),
            title: "Computer Science Student",
            bio: "Learning and growing as a developer",
          },
        },
        {
          ...createDefaultSection("about-me"),
          data: {
            ...createDefaultAboutMe(),
            learning: "Currently learning web development and open source",
          },
        },
        createDefaultSection("tech-stack"),
        createDefaultSection("projects"),
        createDefaultSection("github-widgets"),
        createDefaultSection("socials"),
      ],
    }),
  },
  {
    id: "fullstack",
    name: "Full Stack",
    description: "Showcase your full stack skills",
    icon: "Layers",
    config: createTemplateConfig({
      sections: [
        {
          ...createDefaultSection("header"),
          data: {
            ...createDefaultHeader(),
            title: "Full Stack Developer",
          },
        },
        createDefaultSection("about-me"),
        {
          ...createDefaultSection("tech-stack"),
          data: {
            ...createDefaultTechStack(),
            displayStyle: "badges",
          },
        },
        {
          ...createDefaultSection("projects"),
          data: {
            ...createDefaultProjects(),
            layout: "grid",
          },
        },
        createDefaultSection("github-widgets"),
        createDefaultSection("socials"),
      ],
    }),
  },
  {
    id: "ai-engineer",
    name: "AI Engineer",
    description: "Highlight AI/ML expertise",
    icon: "Brain",
    config: createTemplateConfig({
      sections: [
        {
          ...createDefaultSection("header"),
          data: {
            ...createDefaultHeader(),
            title: "AI/ML Engineer",
            bio: "Building intelligent systems with machine learning",
          },
        },
        createDefaultSection("about-me"),
        createDefaultSection("tech-stack"),
        createDefaultSection("projects"),
        createDefaultSection("github-widgets"),
        createDefaultSection("socials"),
      ],
    }),
  },
  {
    id: "open-source",
    name: "Open Source",
    description: "Optimized for open source contributors",
    icon: "GitFork",
    config: createTemplateConfig({
      sections: [
        {
          ...createDefaultSection("header"),
          data: {
            ...createDefaultHeader(),
            title: "Open Source Contributor",
            bio: "Contributing to the open source community",
          },
        },
        createDefaultSection("about-me"),
        createDefaultSection("tech-stack"),
        createDefaultSection("projects"),
        createDefaultSection("github-widgets"),
        createDefaultSection("socials"),
      ],
    }),
  },
  {
    id: "macos-developer",
    name: "macOS Developer",
    description: "For Apple platform developers",
    icon: "Apple",
    config: createTemplateConfig({
      sections: [
        {
          ...createDefaultSection("header"),
          data: {
            ...createDefaultHeader(),
            title: "macOS / iOS Developer",
            bio: "Building beautiful native applications for Apple platforms",
          },
        },
        createDefaultSection("about-me"),
        createDefaultSection("tech-stack"),
        createDefaultSection("projects"),
        createDefaultSection("github-widgets"),
        createDefaultSection("socials"),
      ],
    }),
  },
  {
    id: "arlkn-example",
    name: "Aral's Example",
    description: "Detach - macOS uninstaller app showcase",
    icon: "Sparkles",
    config: createTemplateConfig({
      username: "arlkn",
      sections: [
        {
          ...createDefaultSection("header"),
          data: {
            name: "Aral",
            title: "macOS Developer & Creator of Detach",
            bio: "Building modern macOS utilities that make your Mac feel brand new",
            typingAnimation: true,
            banner: "",
            avatar: "",
            alignment: "center",
          },
        },
        {
          ...createDefaultSection("about-me"),
          data: {
            biography:
              "I'm a developer passionate about creating clean, native macOS applications. Currently focused on building Detach — a modern uninstaller and optimization utility for macOS.",
            currentWork: "Building Detach, a modern macOS app uninstaller and optimization utility",
            learning: "Exploring SwiftUI advanced patterns and system-level macOS APIs",
            funFact: "I believe every Mac deserves to run like it did on day one",
            contact: "",
          },
        },
        {
          ...createDefaultSection("tech-stack"),
          data: {
            selectedTech: TECHNOLOGIES.filter((t) =>
              ["Swift", "TypeScript", "React", "Next.js", "Node.js", "Docker", "Tailwind"].includes(t.name)
            ),
            displayStyle: "badges",
          },
        },
        {
          ...createDefaultSection("projects"),
          data: {
            projects: [
              {
                id: "detach",
                name: "Detach",
                description:
                  "Modern macOS application uninstaller and optimization utility. Remove apps completely and optimize your Mac's performance.",
                image: "",
                githubLink: "https://github.com/arlkn/detach",
                website: "",
                technologies: ["Swift", "SwiftUI", "TypeScript", "React", "Next.js"],
                status: "active" as const,
              },
            ],
            layout: "grid",
          },
        },
        createDefaultSection("github-widgets"),
        {
          ...createDefaultSection("socials"),
          data: {
            socials: [
              { platform: "github" as const, url: "https://github.com/arlkn", username: "arlkn" },
            ],
          },
        },
      ],
    }),
  },
];

export const SECTION_ICONS: Record<Section["type"], string> = {
  header: "User",
  "about-me": "Heart",
  "tech-stack": "Code",
  projects: "FolderOpen",
  "github-widgets": "BarChart3",
  socials: "Share2",
  custom: "FileText",
};

export const STORAGE_KEYS = {
  README_CONFIG: "repocanvas-config",
  THEME: "repocanvas-theme",
  RECENT_PROJECTS: "repocanvas-recent",
  VIEW_MODE: "repocanvas-view-mode",
} as const;

export const KEYBOARD_SHORTCUTS = {
  UNDO: { key: "z", modifier: "ctrl" },
  REDO: { key: "z", modifier: "ctrl shift" },
  SAVE: { key: "s", modifier: "ctrl" },
  COPY: { key: "c", modifier: "ctrl shift" },
  DOWNLOAD: { key: "d", modifier: "ctrl" },
  COMMAND_PALETTE: { key: "k", modifier: "ctrl" },
  PREVIEW: { key: "p", modifier: "ctrl" },
  EDITOR: { key: "e", modifier: "ctrl" },
} as const;
