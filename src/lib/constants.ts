import type { AnalysisCategory } from "@/types";

export const APP_NAME = "Inspectra";
export const APP_TAGLINE = "Analyze websites from every angle.";

export const ANALYSIS_CATEGORIES: Record<
  AnalysisCategory,
  { label: string; description: string; icon: string }
> = {
  performance: {
    label: "Performance",
    description: "Loading speed, Core Web Vitals, and optimization",
    icon: "Zap",
  },
  seo: {
    label: "SEO",
    description: "Search engine optimization and discoverability",
    icon: "Search",
  },
  accessibility: {
    label: "Accessibility",
    description: "WCAG compliance and inclusive design",
    icon: "Eye",
  },
  "mobile-usability": {
    label: "Mobile Usability",
    description: "Responsive design and mobile experience",
    icon: "Smartphone",
  },
  "content-quality": {
    label: "Content Quality",
    description: "Writing quality, structure, and clarity",
    icon: "FileText",
  },
  ux: {
    label: "User Experience",
    description: "Navigation, clarity, and usability heuristics",
    icon: "Layout",
  },
  "conversion-readiness": {
    label: "Conversion Readiness",
    description: "Call-to-action effectiveness and trust signals",
    icon: "Target",
  },
  security: {
    label: "Security Basics",
    description: "HTTPS, headers, and public security indicators",
    icon: "Shield",
  },
  "technical-quality": {
    label: "Technical Quality",
    description: "Code quality, standards, and best practices",
    icon: "Code",
  },
};

export const CATEGORY_LIST = Object.entries(ANALYSIS_CATEGORIES).map(
  ([key, value]) => ({
    id: key as AnalysisCategory,
    ...value,
  })
);

export const FEATURES = [
  {
    title: "Real Technical Analysis",
    description:
      "Powered by Lighthouse, Playwright, and custom analyzers that inspect actual page data.",
    icon: "Activity",
  },
  {
    title: "AI-Powered Insights",
    description:
      "Get intelligent recommendations based on your specific analysis results.",
    icon: "Brain",
  },
  {
    title: "9 Analysis Categories",
    description:
      "From performance and SEO to accessibility, security, and conversion readiness.",
    icon: "Layers",
  },
  {
    title: "Actionable Findings",
    description:
      "Prioritized issues with severity ratings, effort estimates, and clear fixes.",
    icon: "CheckCircle",
  },
  {
    title: "Export & Share",
    description:
      "Download reports as PDF, JSON, or Markdown. Share findings with your team.",
    icon: "Download",
  },
  {
    title: "Analysis History",
    description:
      "Track improvements over time. Re-analyze to measure the impact of changes.",
    icon: "Clock",
  },
] as const;

export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: "Enter a URL",
    description: "Paste any public website URL into the analysis form.",
    icon: "Link",
  },
  {
    step: 2,
    title: "Run Analysis",
    description:
      "Inspectra inspects your site across 9 categories using real technical tools.",
    icon: "Play",
  },
  {
    step: 3,
    title: "Review Results",
    description:
      "Get scores, findings, and AI-powered recommendations in a detailed report.",
    icon: "BarChart3",
  },
  {
    step: 4,
    title: "Take Action",
    description:
      "Export your report and start improving based on prioritized recommendations.",
    icon: "Rocket",
  },
] as const;

export const STORAGE_KEYS = {
  THEME: "inspectra-theme",
  HISTORY: "inspectra-history",
  SETTINGS: "inspectra-settings",
  REPORTS: "inspectra-reports",
} as const;
