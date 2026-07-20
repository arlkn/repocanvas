export type Theme = "light" | "dark" | "system";

export type AnalysisCategory =
  | "performance"
  | "seo"
  | "accessibility"
  | "mobile-usability"
  | "content-quality"
  | "ux"
  | "conversion-readiness"
  | "security"
  | "technical-quality";

export type FindingSeverity = "critical" | "high" | "medium" | "low" | "info";

export type FindingStatus = "passed" | "failed" | "warning";

export type Effort = "low" | "medium" | "high";

export type Grade = "Excellent" | "Good" | "Needs Improvement" | "Poor" | "Critical";

export interface Finding {
  id: string;
  category: AnalysisCategory;
  title: string;
  description: string;
  severity: FindingSeverity;
  status: FindingStatus;
  evidence?: string;
  recommendation?: string;
  impact?: string;
  effort?: Effort;
}

export interface CategoryScore {
  category: AnalysisCategory;
  score: number;
  grade: Grade;
  summary: string;
  passedChecks: Finding[];
  failedChecks: Finding[];
  warningChecks: Finding[];
}

export interface PerformanceMetrics {
  fcp?: string;
  lcp?: string;
  tbt?: string;
  cls?: string;
  speedIndex?: string;
  tti?: string;
}

export interface PageMetadata {
  finalUrl: string;
  httpStatus: number;
  title: string;
  metaDescription: string;
  canonicalUrl: string;
  language: string;
  characterEncoding: string;
  viewport: string;
  favicon: string;
  contentType: string;
  responseTime: number;
  htmlSize: number;
}

export interface TechnicalMetrics {
  imageCount: number;
  scriptCount: number;
  stylesheetCount: number;
  linkCount: number;
  internalLinks: number;
  externalLinks: number;
  hasRobotsTxt: boolean;
  hasSitemap: boolean;
  hasStructuredData: boolean;
  hasServiceWorker: boolean;
}

export interface SecurityHeaders {
  https: boolean;
  hsts: boolean;
  contentSecurityPolicy: boolean;
  xContentTypeOptions: boolean;
  referrerPolicy: boolean;
  permissionsPolicy: boolean;
  xFrameOptions: boolean;
  mixedContent: boolean;
}

export interface AIRecommendations {
  executiveSummary: string;
  strongestAspects: string[];
  mostImportantWeaknesses: string[];
  quickWins: string[];
  highImpactImprovements: string[];
  suggestedHeadline: string;
  suggestedSubheadline: string;
  suggestedPrimaryCta: string;
  suggestedMetaDescription: string;
  contentImprovements: string[];
  homepageStructure: string[];
  conversionRecommendations: string[];
  accessibilityRecommendations: string[];
}

export interface AnalysisReport {
  id: string;
  url: string;
  title: string;
  screenshot?: string;
  mobileScreenshot?: string;
  analyzedAt: string;
  overallScore: number;
  overallGrade: Grade;
  categoryScores: CategoryScore[];
  findings: Finding[];
  metadata: PageMetadata;
  performanceMetrics: PerformanceMetrics;
  technicalMetrics: TechnicalMetrics;
  securityHeaders: SecurityHeaders;
  aiRecommendations?: AIRecommendations;
}

export interface AnalysisProgress {
  stage: string;
  message: string;
  completed: boolean;
  error?: string;
}

export interface AnalysisState {
  url: string;
  progress: AnalysisProgress[];
  report: AnalysisReport | null;
  error: string | null;
  isAnalyzing: boolean;
}

export interface ReportHistoryEntry {
  id: string;
  url: string;
  title: string;
  overallScore: number;
  overallGrade: Grade;
  screenshot?: string;
  analyzedAt: string;
}

export interface AppSettings {
  theme: Theme;
  aiProvider: string;
  aiModel: string;
  aiEnabled: boolean;
  reportDetail: "summary" | "detailed";
  historyEnabled: boolean;
}
