export type SectionType =
  | "hero"
  | "about"
  | "tech-stack"
  | "features"
  | "github-widgets"
  | "social"
  | "visitor-counter"
  | "trophies"
  | "support"
  | "fun-components";

export type DisplayStyle = "icons" | "logos" | "list" | "grid";

export type Alignment = "left" | "center" | "right";

export type GitHubWidgetTheme = "transparent" | "dark" | "flat";

export type SocialStyle = "links" | "badges" | "cards";

export type FeatureColumns = 1 | 2 | 3;

export type FeatureIconSize = "small" | "medium" | "large";

export interface HeroData {
  tagline: string;
  subtitle: string;
  showBranding: boolean;
  alignment: Alignment;
  showDivider: boolean;
}

export interface AboutData {
  content: string;
}

export interface TechItem {
  name: string;
  icon: string;
  color?: string;
}

export interface TechGroup {
  id: string;
  title: string;
  items: TechItem[];
}

export interface TechStackData {
  groups: TechGroup[];
  displayStyle: DisplayStyle;
  gridColumns: number;
  gridAlignment: Alignment;
  showLabels: boolean;
  iconSize: number;
}

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

export interface FeaturesData {
  items: FeatureItem[];
  columns: FeatureColumns;
  iconSize: FeatureIconSize;
  showDescriptions: boolean;
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
  style: SocialStyle;
  alignment: Alignment;
}

export interface VisitorCounterData {
  alignment: Alignment;
}

export type TrophyTheme = "default" | "radical" | "tokyonight" | "merko" | "gruvbox" | "walnut";

export interface TrophiesData {
  theme: TrophyTheme;
  alignment: Alignment;
  showRank: boolean;
}

export interface SupportLink {
  platform: string;
  url: string;
  label: string;
}

export interface SupportData {
  links: SupportLink[];
  style: SocialStyle;
  alignment: Alignment;
}

export type FunContentType = "memes" | "quotes" | "both";

export interface FunComponentsData {
  contentType: FunContentType;
  alignment: Alignment;
}

export type SectionData =
  | HeroData
  | AboutData
  | TechStackData
  | FeaturesData
  | GitHubWidgetsData
  | SocialData
  | VisitorCounterData
  | TrophiesData
  | SupportData
  | FunComponentsData;

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
