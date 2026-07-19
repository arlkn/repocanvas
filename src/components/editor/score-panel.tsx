"use client";

import React from "react";
import { AlertTriangle, CheckCircle, Info, XCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useReadmeStore } from "@/store/readme-store";
import type { ReadmeScore, ReadmeIssue, ReadmeConfig } from "@/types";

function analyzeReadme(config: ReadmeConfig): ReadmeScore {
  const issues: ReadmeIssue[] = [];
  let currentScore = 0;

  const enabledSections = config.sections.filter((s) => s.enabled);
  const hasSection = (type: string) => enabledSections.some((s) => s.type === type);

  if (hasSection("header")) {
    const header = enabledSections.find((s) => s.type === "header");
    if (header) {
      const data = header.data as { name: string; bio: string };
      if (data.name && data.name !== "Your Name") currentScore += 15;
      else issues.push({ type: "warning", message: "Name not set", suggestion: "Set your name in the Header section" });
      if (data.bio) currentScore += 10;
      else issues.push({ type: "info", message: "No bio set", suggestion: "Add a bio to your Header section" });
    }
  } else {
    issues.push({ type: "error", message: "No header section", suggestion: "Add a Header section to your README" });
  }

  if (hasSection("about-me")) {
    currentScore += 10;
    const about = enabledSections.find((s) => s.type === "about-me");
    if (about) {
      const data = about.data as { biography: string };
      if (data.biography) currentScore += 5;
      else issues.push({ type: "warning", message: "About Me is empty", suggestion: "Fill in your About Me section" });
    }
  } else {
    issues.push({ type: "info", message: "No About Me section", suggestion: "Add an About Me section to personalize your README" });
  }

  if (hasSection("tech-stack")) {
    currentScore += 10;
    const tech = enabledSections.find((s) => s.type === "tech-stack");
    if (tech) {
      const data = tech.data as { selectedTech: unknown[] };
      if (data.selectedTech.length > 0) currentScore += 10;
      else issues.push({ type: "warning", message: "No technologies selected", suggestion: "Select technologies in your Tech Stack" });
    }
  } else {
    issues.push({ type: "info", message: "No Tech Stack section", suggestion: "Add a Tech Stack section" });
  }

  if (hasSection("projects")) {
    currentScore += 10;
    const projects = enabledSections.find((s) => s.type === "projects");
    if (projects) {
      const data = projects.data as { projects: { name: string }[] };
      if (data.projects.length > 0) currentScore += 10;
      else issues.push({ type: "warning", message: "No projects added", suggestion: "Add some projects to showcase your work" });
    }
  }

  if (hasSection("socials")) currentScore += 5;
  else issues.push({ type: "info", message: "No Socials section", suggestion: "Add social links so people can connect with you" });

  if (hasSection("github-widgets")) currentScore += 5;

  if (issues.length === 0) currentScore += 15;
  else currentScore += Math.max(0, 15 - issues.length * 3);

  currentScore = Math.min(100, Math.max(0, currentScore));
  return { score: currentScore, maxScore: 100, issues };
}

const ISSUE_ICONS: Record<string, React.ElementType> = {
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const ISSUE_COLORS: Record<string, string> = {
  error: "text-red-500",
  warning: "text-yellow-500",
  info: "text-blue-500",
};

export function ScorePanel() {
  const { config } = useReadmeStore();
  const [score, setScore] = React.useState<ReadmeScore>(() => analyzeReadme(config));

  const handleAnalyze = () => {
    setScore(analyzeReadme(config));
  };

  const computedScore = React.useMemo(() => analyzeReadme(config), [config]);
  const displayScore = score.score === computedScore.score && score.issues.length === computedScore.issues.length ? score : computedScore;

  const percentage = Math.round((displayScore.score / displayScore.maxScore) * 100);
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getScoreColor = () => {
    if (percentage >= 80) return "text-green-500";
    if (percentage >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">README Score</h3>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleAnalyze}>
          <RefreshCw className="h-3.5 w-3.5" />
        </Button>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative w-28 h-28">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6" className="text-muted" />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className={getScoreColor()}
              style={{ transition: "stroke-dashoffset 0.5s ease" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-2xl font-bold ${getScoreColor()}`}>{displayScore.score}</span>
            <span className="text-[10px] text-muted-foreground">/ {displayScore.maxScore}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          {percentage >= 80 ? "Great README!" : percentage >= 50 ? "Good start!" : "Needs improvement"}
        </p>
      </div>

      {displayScore.issues.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Suggestions ({displayScore.issues.length})
          </h4>
          <div className="space-y-2">
            {displayScore.issues.map((issue, i) => {
              const IssueIcon = ISSUE_ICONS[issue.type] || Info;
              return (
                <div
                  key={i}
                  className="rounded-lg border border-border p-3 space-y-1"
                >
                  <div className="flex items-start gap-2">
                    <IssueIcon className={cn("h-4 w-4 mt-0.5 shrink-0", ISSUE_COLORS[issue.type])} />
                    <div>
                      <p className="text-sm font-medium">{issue.message}</p>
                      <p className="text-xs text-muted-foreground">{issue.suggestion}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {displayScore.issues.length === 0 && (
        <div className="flex flex-col items-center py-4">
          <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
          <p className="text-sm font-medium">Your README looks great!</p>
        </div>
      )}
    </div>
  );
}
