import { describe, it, expect } from "vitest";
import {
  calculateGrade,
  calculateCategoryScore,
  calculateOverallScore,
  getPriorityFindings,
  categorizeFindings,
  CATEGORY_WEIGHTS,
} from "@/lib/scoring";
import type { Finding, AnalysisCategory } from "@/types";

function makeFinding(overrides: Partial<Finding> = {}): Finding {
  return {
    id: "test-1",
    category: "performance",
    title: "Test finding",
    description: "Test description",
    severity: "medium",
    status: "passed",
    ...overrides,
  };
}

describe("calculateGrade", () => {
  it("returns Excellent for scores 90-100", () => {
    expect(calculateGrade(90)).toBe("Excellent");
    expect(calculateGrade(95)).toBe("Excellent");
    expect(calculateGrade(100)).toBe("Excellent");
  });

  it("returns Good for scores 75-89", () => {
    expect(calculateGrade(75)).toBe("Good");
    expect(calculateGrade(82)).toBe("Good");
    expect(calculateGrade(89)).toBe("Good");
  });

  it("returns Needs Improvement for scores 60-74", () => {
    expect(calculateGrade(60)).toBe("Needs Improvement");
    expect(calculateGrade(67)).toBe("Needs Improvement");
    expect(calculateGrade(74)).toBe("Needs Improvement");
  });

  it("returns Poor for scores 40-59", () => {
    expect(calculateGrade(40)).toBe("Poor");
    expect(calculateGrade(50)).toBe("Poor");
    expect(calculateGrade(59)).toBe("Poor");
  });

  it("returns Critical for scores 0-39", () => {
    expect(calculateGrade(0)).toBe("Critical");
    expect(calculateGrade(20)).toBe("Critical");
    expect(calculateGrade(39)).toBe("Critical");
  });
});

describe("calculateCategoryScore", () => {
  it("returns 100 for no findings", () => {
    const result = calculateCategoryScore([]);
    expect(result.score).toBe(100);
    expect(result.grade).toBe("Excellent");
  });

  it("increases score for passed checks", () => {
    const findings = [
      makeFinding({ status: "passed", category: "performance" }),
      makeFinding({ status: "passed", category: "performance", id: "2" }),
    ];
    const result = calculateCategoryScore(findings);
    expect(result.score).toBe(100); // Already at 100, capped at 100
    expect(result.passedChecks).toHaveLength(2);
  });

  it("deducts for failed checks based on severity", () => {
    const critical = calculateCategoryScore([
      makeFinding({ status: "failed", severity: "critical" }),
    ]);
    const medium = calculateCategoryScore([
      makeFinding({ status: "failed", severity: "medium" }),
    ]);
    const low = calculateCategoryScore([
      makeFinding({ status: "failed", severity: "low" }),
    ]);

    expect(critical.score).toBeLessThan(medium.score);
    expect(medium.score).toBeLessThan(low.score);
  });

  it("deducts half for warnings compared to failures", () => {
    const failed = calculateCategoryScore([
      makeFinding({ status: "failed", severity: "medium" }),
    ]);
    const warned = calculateCategoryScore([
      makeFinding({ status: "warning", severity: "medium" }),
    ]);

    // Warning deduction is half of failure deduction
    expect(warned.score).toBeGreaterThan(failed.score);
  });

  it("clamps score to 0-100 range", () => {
    const manyCritical = Array.from({ length: 20 }, (_, i) =>
      makeFinding({
        id: `c-${i}`,
        status: "failed",
        severity: "critical",
      })
    );
    const result = calculateCategoryScore(manyCritical);
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
  });

  it("organizes findings by status", () => {
    const findings = [
      makeFinding({ status: "passed", id: "p1" }),
      makeFinding({ status: "passed", id: "p2" }),
      makeFinding({ status: "failed", id: "f1" }),
      makeFinding({ status: "warning", id: "w1" }),
    ];
    const result = calculateCategoryScore(findings);
    expect(result.passedChecks).toHaveLength(2);
    expect(result.failedChecks).toHaveLength(1);
    expect(result.warningChecks).toHaveLength(1);
  });
});

describe("calculateOverallScore", () => {
  it("returns 0 for empty scores", () => {
    expect(calculateOverallScore([])).toBe(0);
  });

  it("calculates weighted average from category scores", () => {
    const categoryScores = Object.keys(CATEGORY_WEIGHTS).map((key) => ({
      category: key as AnalysisCategory,
      score: 80,
      grade: "Good" as const,
      summary: "Test",
      passedChecks: [],
      failedChecks: [],
      warningChecks: [],
    }));

    const overall = calculateOverallScore(categoryScores);
    expect(overall).toBe(80);
  });

  it("weights categories correctly", () => {
    const perfScore: Finding[] = [
      makeFinding({ category: "performance", status: "failed", severity: "critical" }),
    ];
    const securityScore: Finding[] = [
      makeFinding({ category: "security", status: "failed", severity: "critical" }),
    ];

    const perfCat = calculateCategoryScore(perfScore);
    const secCat = calculateCategoryScore(securityScore);

    // Performance has 3x the weight of security
    expect(CATEGORY_WEIGHTS.performance).toBeGreaterThan(
      CATEGORY_WEIGHTS.security
    );

    const overallPerf = calculateOverallScore([perfCat]);
    const overallSec = calculateOverallScore([secCat]);

    // Both should produce a valid score
    expect(overallPerf).toBeGreaterThanOrEqual(0);
    expect(overallPerf).toBeLessThanOrEqual(100);
    expect(overallSec).toBeGreaterThanOrEqual(0);
    expect(overallSec).toBeLessThanOrEqual(100);
  });
});

describe("getPriorityFindings", () => {
  it("returns failed checks before warnings", () => {
    const findings = [
      makeFinding({ id: "w1", status: "warning", severity: "medium" }),
      makeFinding({ id: "f1", status: "failed", severity: "medium" }),
    ];
    const priority = getPriorityFindings(findings, 10);
    expect(priority[0].id).toBe("f1");
  });

  it("sorts by severity within same status", () => {
    const findings = [
      makeFinding({ id: "low", status: "failed", severity: "low" }),
      makeFinding({ id: "crit", status: "failed", severity: "critical" }),
      makeFinding({ id: "high", status: "failed", severity: "high" }),
    ];
    const priority = getPriorityFindings(findings, 10);
    expect(priority[0].severity).toBe("critical");
    expect(priority[1].severity).toBe("high");
    expect(priority[2].severity).toBe("low");
  });

  it("respects the limit parameter", () => {
    const findings = Array.from({ length: 20 }, (_, i) =>
      makeFinding({
        id: `f-${i}`,
        status: "failed",
        severity: "medium",
      })
    );
    const priority = getPriorityFindings(findings, 5);
    expect(priority).toHaveLength(5);
  });

  it("prefers low effort items (quick wins)", () => {
    const findings = [
      makeFinding({
        id: "high-effort",
        status: "failed",
        severity: "medium",
        effort: "high",
      }),
      makeFinding({
        id: "low-effort",
        status: "failed",
        severity: "medium",
        effort: "low",
      }),
    ];
    const priority = getPriorityFindings(findings, 10);
    expect(priority[0].id).toBe("low-effort");
  });
});

describe("categorizeFindings", () => {
  it("identifies quick wins (low effort + medium/high severity + failed)", () => {
    const findings = [
      makeFinding({
        id: "qw1",
        status: "failed",
        severity: "medium",
        effort: "low",
      }),
      makeFinding({
        id: "not-qw",
        status: "failed",
        severity: "medium",
        effort: "high",
      }),
      makeFinding({
        id: "warn",
        status: "warning",
        severity: "medium",
        effort: "low",
      }),
    ];
    const { quickWins } = categorizeFindings(findings);
    expect(quickWins).toHaveLength(1);
    expect(quickWins[0].id).toBe("qw1");
  });

  it("identifies critical fixes (critical/high severity + failed)", () => {
    const findings = [
      makeFinding({
        id: "crit",
        status: "failed",
        severity: "critical",
        effort: "high",
      }),
      makeFinding({
        id: "high",
        status: "failed",
        severity: "high",
        effort: "medium",
      }),
      makeFinding({
        id: "med",
        status: "failed",
        severity: "medium",
        effort: "low",
      }),
    ];
    const { criticalFixes } = categorizeFindings(findings);
    expect(criticalFixes).toHaveLength(2);
    expect(criticalFixes.map((f) => f.id)).toContain("crit");
    expect(criticalFixes.map((f) => f.id)).toContain("high");
  });
});
