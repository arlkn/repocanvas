import { describe, it, expect } from "vitest";
import { generateMarkdown } from "@/lib/markdown-engine";
import { createDefaultConfig } from "@/lib/constants";
import type { HeaderData, AboutMeData, TechStackData, ProjectsData, GitHubWidgetsData, SocialsData } from "@/types";

describe("generateMarkdown", () => {
  it("generates empty markdown for default config with all sections disabled", () => {
    const config = createDefaultConfig();
    config.sections.forEach((s) => (s.enabled = false));
    const markdown = generateMarkdown(config);
    expect(markdown.trim()).toBe("");
  });

  it("generates header markdown with name", () => {
    const config = createDefaultConfig();
    const headerSection = config.sections.find((s) => s.type === "header");
    if (headerSection) {
      headerSection.data = {
        ...headerSection.data,
        name: "John Doe",
        title: "Developer",
        bio: "Building cool stuff",
        typingAnimation: false,
        alignment: "center",
      } as HeaderData;
    }
    const markdown = generateMarkdown(config);
    expect(markdown).toContain("John Doe");
    expect(markdown).toContain("Developer");
    expect(markdown).toContain("Building cool stuff");
  });

  it("generates header with avatar", () => {
    const config = createDefaultConfig();
    const headerSection = config.sections.find((s) => s.type === "header");
    if (headerSection) {
      headerSection.data = {
        name: "Jane",
        title: "Dev",
        bio: "",
        typingAnimation: false,
        avatar: "https://example.com/avatar.png",
        banner: "",
        alignment: "center",
      } as HeaderData;
    }
    const markdown = generateMarkdown(config);
    expect(markdown).toContain("avatar.png");
    expect(markdown).toContain("border-radius: 50%");
  });

  it("generates about me section", () => {
    const config = createDefaultConfig();
    const aboutSection = config.sections.find((s) => s.type === "about-me");
    if (aboutSection) {
      aboutSection.data = {
        biography: "I am a developer",
        currentWork: "Working on Project X",
        learning: "Learning Rust",
        funFact: "I love coffee",
        contact: "email@test.com",
      } as AboutMeData;
    }
    const markdown = generateMarkdown(config);
    expect(markdown).toContain("## About Me");
    expect(markdown).toContain("I am a developer");
    expect(markdown).toContain("Working on Project X");
    expect(markdown).toContain("Learning Rust");
  });

  it("generates tech stack badges", () => {
    const config = createDefaultConfig();
    const techSection = config.sections.find((s) => s.type === "tech-stack");
    if (techSection) {
      techSection.data = {
        selectedTech: [
          { name: "TypeScript", icon: "typescript", category: "languages" },
          { name: "React", icon: "react", category: "frontend" },
        ],
        displayStyle: "badges",
      } as TechStackData;
    }
    const markdown = generateMarkdown(config);
    expect(markdown).toContain("## Tech Stack");
    expect(markdown).toContain("img.shields.io");
    expect(markdown).toContain("TypeScript");
    expect(markdown).toContain("React");
  });

  it("generates projects section", () => {
    const config = createDefaultConfig();
    const projectsSection = config.sections.find((s) => s.type === "projects");
    if (projectsSection) {
      projectsSection.data = {
        projects: [
          {
            id: "1",
            name: "My Project",
            description: "A great project",
            image: "",
            githubLink: "https://github.com/user/project",
            website: "",
            technologies: ["TypeScript", "React"],
            status: "active",
          },
        ],
        layout: "grid",
      } as ProjectsData;
    }
    const markdown = generateMarkdown(config);
    expect(markdown).toContain("## Projects");
    expect(markdown).toContain("My Project");
    expect(markdown).toContain("A great project");
    expect(markdown).toContain("github.com/user/project");
  });

  it("generates github widgets", () => {
    const config = createDefaultConfig();
    const widgetsSection = config.sections.find((s) => s.type === "github-widgets");
    if (widgetsSection) {
      widgetsSection.enabled = true;
      widgetsSection.data = {
        stats: true,
        streak: true,
        activityGraph: false,
        topLanguages: true,
        trophies: false,
        username: "testuser",
      } as GitHubWidgetsData;
    }
    const markdown = generateMarkdown(config);
    expect(markdown).toContain("GitHub Stats");
    expect(markdown).toContain("testuser");
  });

  it("generates social links", () => {
    const config = createDefaultConfig();
    const socialsSection = config.sections.find((s) => s.type === "socials");
    if (socialsSection) {
      socialsSection.data = {
        socials: [
          { platform: "github", url: "https://github.com/user", username: "user" },
          { platform: "linkedin", url: "", username: "user" },
        ],
      } as SocialsData;
    }
    const markdown = generateMarkdown(config);
    expect(markdown).toContain("## Connect");
    expect(markdown).toContain("github.com/user");
    expect(markdown).toContain("LinkedIn");
  });

  it("does not include disabled sections", () => {
    const config = createDefaultConfig();
    const aboutSection = config.sections.find((s) => s.type === "about-me");
    if (aboutSection) aboutSection.enabled = false;
    const markdown = generateMarkdown(config);
    expect(markdown).not.toContain("## About Me");
  });

  it("generates typing animation SVG", () => {
    const config = createDefaultConfig();
    const headerSection = config.sections.find((s) => s.type === "header");
    if (headerSection) {
      headerSection.data = {
        name: "Test",
        title: "Developer",
        bio: "",
        typingAnimation: true,
        avatar: "",
        banner: "",
        alignment: "center",
      } as HeaderData;
    }
    const markdown = generateMarkdown(config);
    expect(markdown).toContain("typing-svg");
    expect(markdown).toContain("Developer");
  });
});
