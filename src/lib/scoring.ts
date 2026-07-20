/**
 * Scoring module for Inspectra.
 *
 * Generates deterministic, testable scores from 0-100 for each
 * analysis category. Scores are based entirely on objective findings.
 *
 * Grade scale:
 * - 90-100: Excellent
 * - 75-89: Good
 * - 60-74: Needs Improvement
 * - 40-59: Poor
 * - 0-39: Critical
 */

import type {
  AnalysisCategory,
  CategoryScore,
  Finding,
  Grade,
} from "@/types";

/**
 * Weight of each category in the overall score calculation.
 */
export const CATEGORY_WEIGHTS: Record<AnalysisCategory, number> = {
  performance: 0.15,
  seo: 0.15,
  accessibility: 0.15,
  "mobile-usability": 0.1,
  "content-quality": 0.1,
  ux: 0.1,
  "conversion-readiness": 0.1,
  security: 0.05,
  "technical-quality": 0.1,
};

/**
 * Severity weights for scoring deductions.
 * Higher severity = larger deduction per finding.
 */
const SEVERITY_DEDUCTION: Record<string, number> = {
  critical: 15,
  high: 10,
  medium: 5,
  low: 2,
  info: 0,
};

/**
 * Bonus per passed check.
 */
const PASS_BONUS = 3;

/**
 * Starting score for all categories.
 */
const BASE_SCORE = 100;

/**
 * Calculates a grade from a numeric score.
 *
 * @param score - Score from 0 to 100
 * @returns Grade label
 */
export function calculateGrade(score: number): Grade {
  if (score >= 90) return "Excellent";
  if (score >= 75) return "Good";
  if (score >= 60) return "Needs Improvement";
  if (score >= 40) return "Poor";
  return "Critical";
}

/**
 * Clamps a score to the 0-100 range.
 */
function clampScore(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}

/**
 * Calculates the score for a single analysis category.
 *
 * @param findings - Array of findings for this category
 * @returns CategoryScore with score, grade, and organized findings
 */
export function calculateCategoryScore(findings: Finding[]): CategoryScore {
  let score = BASE_SCORE;

  // Deduct points for failed and warning checks
  for (const finding of findings) {
    if (finding.status === "failed") {
      score -= SEVERITY_DEDUCTION[finding.severity] ?? 0;
    } else if (finding.status === "warning") {
      // Warnings get half the deduction of failures
      score -= Math.floor((SEVERITY_DEDUCTION[finding.severity] ?? 0) / 2);
    } else if (finding.status === "passed") {
      score += PASS_BONUS;
    }
  }

  const clampedScore = clampScore(score);
  const grade = calculateGrade(clampedScore);

  const passedChecks = findings.filter((f) => f.status === "passed");
  const failedChecks = findings.filter((f) => f.status === "failed");
  const warningChecks = findings.filter((f) => f.status === "warning");

  const summary = generateCategorySummary(clampedScore, grade, findings);

  return {
    category: findings[0]?.category ?? "technical-quality",
    score: clampedScore,
    grade,
    summary,
    passedChecks,
    failedChecks,
    warningChecks,
  };
}

/**
 * Generates a human-readable summary for a category score.
 */
function generateCategorySummary(
  score: number,
  grade: Grade,
  findings: Finding[]
): string {
  const passed = findings.filter((f) => f.status === "passed").length;
  const failed = findings.filter((f) => f.status === "failed").length;
  const warnings = findings.filter((f) => f.status === "warning").length;

  if (grade === "Excellent") {
    return `Excellent performance with ${passed} checks passing. Minor opportunities for optimization.`;
  }
  if (grade === "Good") {
    return `Good results with ${passed} checks passing. ${failed > 0 ? `${failed} issue${failed > 1 ? "s" : ""} to address.` : "No critical issues found."}`;
  }
  if (grade === "Needs Improvement") {
    return `${passed} checks passing, but ${failed} issue${failed > 1 ? "s need" : " needs"} attention. ${warnings > 0 ? `${warnings} warning${warnings > 1 ? "s" : ""}.` : ""}`;
  }
  if (grade === "Poor") {
    return `Significant issues found. ${failed} checks failing with ${warnings} warnings. Improvement recommended.`;
  }
  return `Critical issues detected. ${failed} checks failing. Immediate attention recommended.`;
}

/**
 * Calculates the overall score from category scores using weighted averaging.
 *
 * @param categoryScores - Array of category scores
 * @returns Overall score (0-100)
 */
export function calculateOverallScore(categoryScores: CategoryScore[]): number {
  if (categoryScores.length === 0) return 0;

  let totalWeight = 0;
  let weightedSum = 0;

  for (const cs of categoryScores) {
    const weight = CATEGORY_WEIGHTS[cs.category] ?? 0.1;
    weightedSum += cs.score * weight;
    totalWeight += weight;
  }

  if (totalWeight === 0) return 0;

  return clampScore(weightedSum / totalWeight);
}

/**
 * Returns the top N findings sorted by severity and impact.
 *
 * Severity ordering: critical > high > medium > low > info
 * Failed checks come before warnings.
 */
export function getPriorityFindings(
  findings: Finding[],
  limit: number = 10
): Finding[] {
  const severityOrder: Record<string, number> = {
    critical: 0,
    high: 1,
    medium: 2,
    low: 3,
    info: 4,
  };

  return [...findings]
    .sort((a, b) => {
      // Failed checks first
      if (a.status === "failed" && b.status !== "failed") return -1;
      if (b.status === "failed" && a.status !== "failed") return 1;

      // Then by severity
      const sevDiff =
        (severityOrder[a.severity] ?? 5) - (severityOrder[b.severity] ?? 5);
      if (sevDiff !== 0) return sevDiff;

      // Then by effort (low effort first = quick wins)
      const effortOrder: Record<string, number> = { low: 0, medium: 1, high: 2 };
      return (
        (effortOrder[a.effort ?? "medium"] ?? 1) -
        (effortOrder[b.effort ?? "medium"] ?? 1)
      );
    })
    .slice(0, limit);
}

/**
 * Separates findings into quick wins, critical fixes, and other findings.
 */
export function categorizeFindings(findings: Finding[]) {
  const quickWins = findings.filter(
    (f) =>
      f.status === "failed" &&
      f.effort === "low" &&
      (f.severity === "medium" || f.severity === "high" || f.severity === "critical")
  );

  const criticalFixes = findings.filter(
    (f) =>
      f.status === "failed" &&
      (f.severity === "critical" || f.severity === "high")
  );

  return { quickWins, criticalFixes };
}
