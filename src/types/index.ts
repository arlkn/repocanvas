export type Theme = "light" | "dark" | "system";

export type SectionType =
  | "header"
  | "about-me"
  | "tech-stack"
  | "projects"
  | "github-widgets"
  | "socials"
  | "custom";

export interface HeaderData {
  name: string;
  title: string;
  bio: string;
  typingAnimation: boolean;
  banner: string;
  avatar: string;
  alignment: "left" | "center" | "right";
}

export interface AboutMeData {
  biography: string;
  currentWork: string;
  learning: string;
  funFact: string;
  contact: string;
}

export type TechnologyCategory =
  | "languages"
  | "frontend"
  | "backend"
  | "databases"
  | "cloud"
  | "tools";

export interface Technology {
  name: string;
  icon: string;
  category: TechnologyCategory;
}

export interface TechStackData {
  selectedTech: Technology[];
  displayStyle: "grid" | "list" | "badges";
}

export type ProjectStatus = "active" | "completed" | "archived" | "in-progress";

export interface Project {
  id: string;
  name: string;
  description: string;
  image: string;
  githubLink: string;
  website: string;
  technologies: string[];
  status: ProjectStatus;
}

export interface ProjectsData {
  projects: Project[];
  layout: "grid" | "list";
}

export interface GitHubWidgetsData {
  stats: boolean;
  streak: boolean;
  activityGraph: boolean;
  topLanguages: boolean;
  trophies: boolean;
  username: string;
}

export type SocialPlatform =
  | "github"
  | "linkedin"
  | "twitter"
  | "portfolio"
  | "email"
  | "discord";

export interface Social {
  platform: SocialPlatform;
  url: string;
  username: string;
}

export interface SocialsData {
  socials: Social[];
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
  enabled: boolean;
}

export interface CustomSectionsData {
  sections: CustomSection[];
}

export interface Section {
  id: string;
  type: SectionType;
  title: string;
  enabled: boolean;
  data: HeaderData | AboutMeData | TechStackData | ProjectsData | GitHubWidgetsData | SocialsData | CustomSectionsData;
}

export interface ReadmeConfig {
  sections: Section[];
  theme: Theme;
  username: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  icon: string;
  config: ReadmeConfig;
}

export interface GitHubRepo {
  name: string;
  description: string;
  topics: string[];
  languages: string[];
  license: string;
  homepage: string;
  stars: number;
}

export interface ReadmeScore {
  score: number;
  maxScore: number;
  issues: ReadmeIssue[];
}

export interface ReadmeIssue {
  type: "error" | "warning" | "info";
  message: string;
  suggestion: string;
}

export interface AIRequest {
  type: "description" | "bio" | "installation" | "features" | "contribution" | "documentation";
  context: string;
  prompt: string;
}

export interface AIResponse {
  content: string;
  error?: string;
}

export type ViewMode = "editor" | "preview" | "split";

export interface AppState {
  config: ReadmeConfig;
  viewMode: ViewMode;
  activeSection: string | null;
  history: ReadmeConfig[];
  historyIndex: number;
}
