export type SectionType =
  | "hero"
  | "about"
  | "tech-stack"
  | "features"
  | "github-widgets"
  | "social"
  | "license";

export type DisplayStyle = "icons" | "logos" | "list";

export type GitHubWidgetTheme = "transparent" | "dark" | "flat";

export interface HeroData {
  tagline: string;
  subtitle: string;
  showBranding: boolean;
}

export interface AboutData {
  content: string;
}

export interface TechItem {
  name: string;
  icon: string;
  color?: string;
}

export interface TechStackData {
  items: TechItem[];
  displayStyle: DisplayStyle;
}

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

export interface FeaturesData {
  items: FeatureItem[];
}

export interface GitHubWidgetsData {
  stats: boolean;
  streak: boolean;
  languages: boolean;
  activity: boolean;
  theme: GitHubWidgetTheme;
}

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

export interface SocialData {
  links: SocialLink[];
}

export type LicenseType = "MIT" | "Apache-2.0" | "GPL-3.0" | "BSD-2-Clause" | "Unlicense";

export interface LicenseData {
  type: LicenseType;
  year: string;
  copyrightHolder: string;
}

export type SectionData =
  | HeroData
  | AboutData
  | TechStackData
  | FeaturesData
  | GitHubWidgetsData
  | SocialData
  | LicenseData;

export interface Section {
  id: string;
  type: SectionType;
  title: string;
  visible: boolean;
  data: SectionData;
}

export interface ReadmeConfig {
  username: string;
  sections: Section[];
}

export interface Template {
  name: string;
  description: string;
  icon: string;
  config: ReadmeConfig;
}
