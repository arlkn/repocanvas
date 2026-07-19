"use client";

import type { ReadmeScore, ReadmeIssue, ReadmeConfig } from "@/types";

export function analyzeReadme(config: ReadmeConfig): ReadmeScore {
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
