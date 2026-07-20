import type {
  SectionType,
  TechItem,
  Template,
  HeroData,
  AboutData,
  TechStackData,
  FeaturesData,
  GitHubWidgetsData,
  SocialData,
  LicenseData,
} from "@/types";

export const APP_NAME = "RepoCanvas";
export const APP_TAGLINE = "Build beautiful GitHub READMEs without manually writing Markdown.";

export const SECTION_TYPES: Record<
  SectionType,
  { label: string; description: string; icon: string }
> = {
  hero: {
    label: "Hero",
    description: "Tagline and subtitle for your README",
    icon: "Rocket",
  },
  about: {
    label: "About",
    description: "About this project section",
    icon: "FileText",
  },
  "tech-stack": {
    label: "Tech Stack",
    description: "Technologies and tools you use",
    icon: "Wrench",
  },
  features: {
    label: "Features",
    description: "Key features of your project",
    icon: "LayoutGrid",
  },
  "github-widgets": {
    label: "GitHub Widgets",
    description: "Stats, streaks, and activity graphs",
    icon: "BarChart3",
  },
  social: {
    label: "Social",
    description: "Connect with you across platforms",
    icon: "Users",
  },
  license: {
    label: "License",
    description: "Project license information",
    icon: "Scale",
  },
};

export const TECHNOLOGIES: TechItem[] = [
  { name: "TypeScript", icon: "typescript" },
  { name: "JavaScript", icon: "javascript" },
  { name: "Python", icon: "python" },
  { name: "Java", icon: "java" },
  { name: "Go", icon: "go" },
  { name: "Rust", icon: "rust" },
  { name: "C", icon: "c" },
  { name: "C++", icon: "cplusplus" },
  { name: "C#", icon: "csharp" },
  { name: "Swift", icon: "swift" },
  { name: "Kotlin", icon: "kotlin" },
  { name: "Ruby", icon: "ruby" },
  { name: "PHP", icon: "php" },
  { name: "Scala", icon: "scala" },
  { name: "Elixir", icon: "elixir" },
  { name: "Haskell", icon: "haskell" },
  { name: "Lua", icon: "lua" },
  { name: "R", icon: "r" },
  { name: "Dart", icon: "dart" },
  { name: "MATLAB", icon: "matlab" },
  { name: "Shell", icon: "shell" },
  { name: "PowerShell", icon: "powershell" },
  { name: "SQL", icon: "sql" },
  { name: "HTML", icon: "html" },
  { name: "CSS", icon: "css" },
  { name: "Sass", icon: "sass" },
  { name: "React", icon: "react" },
  { name: "Next.js", icon: "nextdotjs" },
  { name: "Vue.js", icon: "vuedotjs" },
  { name: "Angular", icon: "angular" },
  { name: "Svelte", icon: "svelte" },
  { name: "Astro", icon: "astro" },
  { name: "Node.js", icon: "nodedotjs" },
  { name: "Express", icon: "express" },
  { name: "Django", icon: "django" },
  { name: "Flask", icon: "flask" },
  { name: "FastAPI", icon: "fastapi" },
  { name: "Spring Boot", icon: "springboot" },
  { name: "Rails", icon: "rubyonrails" },
  { name: "ASP.NET", icon: "dotnet" },
  { name: "Laravel", icon: "laravel" },
  { name: "GraphQL", icon: "graphql" },
  { name: "Docker", icon: "docker" },
  { name: "Kubernetes", icon: "kubernetes" },
  { name: "AWS", icon: "amazonwebservices" },
  { name: "Firebase", icon: "firebase" },
  { name: "Vercel", icon: "vercel" },
  { name: "Netlify", icon: "netlify" },
  { name: "Heroku", icon: "heroku" },
  { name: "DigitalOcean", icon: "digitalocean" },
  { name: "Google Cloud", icon: "googlecloud" },
  { name: "Azure", icon: "microsoftazure" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "MySQL", icon: "mysql" },
  { name: "SQLite", icon: "sqlite" },
  { name: "MongoDB", icon: "mongodb" },
  { name: "Redis", icon: "redis" },
  { name: "Supabase", icon: "supabase" },
  { name: "Prisma", icon: "prisma" },
  { name: "Tailwind CSS", icon: "tailwindcss" },
  { name: "Bootstrap", icon: "bootstrap" },
  { name: "Material UI", icon: "mui" },
  { name: "Flutter", icon: "flutter" },
  { name: "React Native", icon: "react" },
  { name: "Electron", icon: "electron" },
  { name: "Git", icon: "git" },
  { name: "GitHub", icon: "github" },
  { name: "GitLab", icon: "gitlab" },
  { name: "Bitbucket", icon: "bitbucket" },
  { name: "VS Code", icon: "visualstudiocode" },
  { name: "Neovim", icon: "neovim" },
  { name: "Vim", icon: "vim" },
  { name: "IntelliJ", icon: "intellijidea" },
  { name: "Postman", icon: "postman" },
  { name: "Jest", icon: "jest" },
  { name: "Vitest", icon: "vitest" },
  { name: "Cypress", icon: "cypress" },
  { name: "Playwright", icon: "playwright" },
  { name: "Webpack", icon: "webpack" },
  { name: "Vite", icon: "vite" },
  { name: "ESBuild", icon: "esbuild" },
  { name: "Turborepo", icon: "turborepo" },
  { name: "Gradle", icon: "gradle" },
  { name: "Maven", icon: "apachemaven" },
  { name: "NPM", icon: "npm" },
  { name: "Yarn", icon: "yarn" },
  { name: "pnpm", icon: "pnpm" },
  { name: "Notion", icon: "notion" },
  { name: "Jira", icon: "jira" },
  { name: "Figma", icon: "figma" },
];

export const TEMPLATES: Template[] = [
  {
    name: "Minimal",
    description: "Clean and simple with just the essentials",
    icon: "Minimize2",
    config: {
      username: "",
      sections: [
        {
          id: "hero-min",
          type: "hero",
          title: "Hero",
          visible: true,
          data: { tagline: "", subtitle: "", showBranding: true } as HeroData,
        },
        {
          id: "about-min",
          type: "about",
          title: "About",
          visible: true,
          data: { content: "" } as AboutData,
        },
      ],
    },
  },
  {
    name: "Developer",
    description: "Full developer profile with tech stack and GitHub stats",
    icon: "Code",
    config: {
      username: "",
      sections: [
        {
          id: "hero-dev",
          type: "hero",
          title: "Hero",
          visible: true,
          data: { tagline: "", subtitle: "", showBranding: true } as HeroData,
        },
        {
          id: "about-dev",
          type: "about",
          title: "About",
          visible: true,
          data: { content: "" } as AboutData,
        },
        {
          id: "tech-dev",
          type: "tech-stack",
          title: "Tech Stack",
          visible: true,
          data: { items: [], displayStyle: "icons" } as TechStackData,
        },
        {
          id: "gh-dev",
          type: "github-widgets",
          title: "GitHub Widgets",
          visible: true,
          data: {
            stats: true,
            streak: true,
            languages: true,
            activity: true,
            theme: "transparent",
          } as GitHubWidgetsData,
        },
        {
          id: "social-dev",
          type: "social",
          title: "Social",
          visible: true,
          data: { links: [] } as SocialData,
        },
        {
          id: "license-dev",
          type: "license",
          title: "License",
          visible: true,
          data: {
            type: "MIT",
            year: new Date().getFullYear().toString(),
            copyrightHolder: "",
          } as LicenseData,
        },
      ],
    },
  },
  {
    name: "Showcase",
    description: "Highlight features and tech for project READMEs",
    icon: "Monitor",
    config: {
      username: "",
      sections: [
        {
          id: "hero-show",
          type: "hero",
          title: "Hero",
          visible: true,
          data: { tagline: "", subtitle: "", showBranding: true } as HeroData,
        },
        {
          id: "about-show",
          type: "about",
          title: "About",
          visible: true,
          data: { content: "" } as AboutData,
        },
        {
          id: "feat-show",
          type: "features",
          title: "Features",
          visible: true,
          data: { items: [] } as FeaturesData,
        },
        {
          id: "tech-show",
          type: "tech-stack",
          title: "Tech Stack",
          visible: true,
          data: { items: [], displayStyle: "logos" } as TechStackData,
        },
        {
          id: "gh-show",
          type: "github-widgets",
          title: "GitHub Widgets",
          visible: true,
          data: {
            stats: true,
            streak: false,
            languages: true,
            activity: true,
            theme: "dark",
          } as GitHubWidgetsData,
        },
        {
          id: "license-show",
          type: "license",
          title: "License",
          visible: true,
          data: {
            type: "MIT",
            year: new Date().getFullYear().toString(),
            copyrightHolder: "",
          } as LicenseData,
        },
      ],
    },
  },
  {
    name: "Creative",
    description: "Bold design for creative projects and portfolios",
    icon: "Palette",
    config: {
      username: "",
      sections: [
        {
          id: "hero-cre",
          type: "hero",
          title: "Hero",
          visible: true,
          data: { tagline: "", subtitle: "", showBranding: true } as HeroData,
        },
        {
          id: "about-cre",
          type: "about",
          title: "About",
          visible: true,
          data: { content: "" } as AboutData,
        },
        {
          id: "feat-cre",
          type: "features",
          title: "Features",
          visible: true,
          data: { items: [] } as FeaturesData,
        },
        {
          id: "tech-cre",
          type: "tech-stack",
          title: "Tech Stack",
          visible: true,
          data: { items: [], displayStyle: "list" } as TechStackData,
        },
        {
          id: "social-cre",
          type: "social",
          title: "Social",
          visible: true,
          data: { links: [] } as SocialData,
        },
      ],
    },
  },
  {
    name: "Organization",
    description: "Professional template for teams and organizations",
    icon: "Building2",
    config: {
      username: "",
      sections: [
        {
          id: "hero-org",
          type: "hero",
          title: "Hero",
          visible: true,
          data: { tagline: "", subtitle: "", showBranding: true } as HeroData,
        },
        {
          id: "about-org",
          type: "about",
          title: "About",
          visible: true,
          data: { content: "" } as AboutData,
        },
        {
          id: "feat-org",
          type: "features",
          title: "Features",
          visible: true,
          data: { items: [] } as FeaturesData,
        },
        {
          id: "gh-org",
          type: "github-widgets",
          title: "GitHub Widgets",
          visible: true,
          data: {
            stats: true,
            streak: false,
            languages: false,
            activity: true,
            theme: "flat",
          } as GitHubWidgetsData,
        },
        {
          id: "social-org",
          type: "social",
          title: "Social",
          visible: true,
          data: { links: [] } as SocialData,
        },
        {
          id: "license-org",
          type: "license",
          title: "License",
          visible: true,
          data: {
            type: "Apache-2.0",
            year: new Date().getFullYear().toString(),
            copyrightHolder: "",
          } as LicenseData,
        },
      ],
    },
  },
  {
    name: "Blank",
    description: "Start from scratch with an empty canvas",
    icon: "FilePlus",
    config: {
      username: "",
      sections: [],
    },
  },
];

export const STORAGE_KEY = "repocanvas-config";

export function createDefaultSection(type: SectionType): import("@/types").Section {
  const id = `${type}-${Date.now().toString(36)}`;
  switch (type) {
    case "hero":
      return {
        id,
        type,
        title: SECTION_TYPES.hero.label,
        visible: true,
        data: { tagline: "", subtitle: "", showBranding: true } as HeroData,
      };
    case "about":
      return {
        id,
        type,
        title: SECTION_TYPES.about.label,
        visible: true,
        data: { content: "" } as AboutData,
      };
    case "tech-stack":
      return {
        id,
        type,
        title: SECTION_TYPES["tech-stack"].label,
        visible: true,
        data: { items: [], displayStyle: "icons" } as TechStackData,
      };
    case "features":
      return {
        id,
        type,
        title: SECTION_TYPES.features.label,
        visible: true,
        data: { items: [] } as FeaturesData,
      };
    case "github-widgets":
      return {
        id,
        type,
        title: SECTION_TYPES["github-widgets"].label,
        visible: true,
        data: {
          stats: true,
          streak: true,
          languages: true,
          activity: true,
          theme: "transparent",
        } as GitHubWidgetsData,
      };
    case "social":
      return {
        id,
        type,
        title: SECTION_TYPES.social.label,
        visible: true,
        data: { links: [] } as SocialData,
      };
    case "license":
      return {
        id,
        type,
        title: SECTION_TYPES.license.label,
        visible: true,
        data: {
          type: "MIT",
          year: new Date().getFullYear().toString(),
          copyrightHolder: "",
        } as LicenseData,
      };
  }
}
