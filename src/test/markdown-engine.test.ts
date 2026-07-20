import { describe, it, expect } from "vitest";
import {
  generateMarkdown,
  getTechIconUrl,
} from "@/lib/markdown-engine";
import type { ReadmeConfig, TechItem } from "@/types";

describe("getTechIconUrl", () => {
  it("returns simple icons URL for a tech", () => {
    const tech: TechItem = { name: "React", icon: "react" };
    expect(getTechIconUrl(tech)).toBe("https://cdn.simpleicons.org/react");
  });
});

describe("generateMarkdown", () => {
  it("returns placeholder comment when no sections", () => {
    const config: ReadmeConfig = { username: "test", sections: [] };
    expect(generateMarkdown(config)).toContain("Add sections");
  });

  it("generates hero section with tagline", () => {
    const config: ReadmeConfig = {
      username: "test",
      sections: [
        {
          id: "1",
          type: "hero",
          title: "Hero",
          visible: true,
          data: { tagline: "My Project", subtitle: "A cool tool", showBranding: true },
        },
      ],
    };
    const md = generateMarkdown(config);
    expect(md).toContain("# My Project");
    expect(md).toContain("> A cool tool");
    expect(md).toContain("test");
  });

  it("generates about section", () => {
    const config: ReadmeConfig = {
      username: "test",
      sections: [
        {
          id: "1",
          type: "about",
          title: "About",
          visible: true,
          data: { content: "This is my project." },
        },
      ],
    };
    const md = generateMarkdown(config);
    expect(md).toContain("## About");
    expect(md).toContain("This is my project.");
  });

  it("generates tech stack with icons display", () => {
    const config: ReadmeConfig = {
      username: "test",
      sections: [
        {
          id: "1",
          type: "tech-stack",
          title: "Tech Stack",
          visible: true,
          data: {
            items: [
              { name: "React", icon: "react" },
              { name: "TypeScript", icon: "typescript" },
            ],
            displayStyle: "icons",
          },
        },
      ],
    };
    const md = generateMarkdown(config);
    expect(md).toContain("## Tech Stack");
    expect(md).toContain("cdn.simpleicons.org/react");
    expect(md).toContain("cdn.simpleicons.org/typescript");
  });

  it("generates tech stack with list display", () => {
    const config: ReadmeConfig = {
      username: "test",
      sections: [
        {
          id: "1",
          type: "tech-stack",
          title: "Tech Stack",
          visible: true,
          data: {
            items: [{ name: "React", icon: "react" }],
            displayStyle: "list",
          },
        },
      ],
    };
    const md = generateMarkdown(config);
    expect(md).toContain("- <img");
    expect(md).toContain("React");
  });

  it("generates features section", () => {
    const config: ReadmeConfig = {
      username: "test",
      sections: [
        {
          id: "1",
          type: "features",
          title: "Features",
          visible: true,
          data: {
            items: [
              { icon: "⚡", title: "Fast", description: "Blazingly fast" },
            ],
          },
        },
      ],
    };
    const md = generateMarkdown(config);
    expect(md).toContain("## Features");
    expect(md).toContain("### ⚡ Fast");
    expect(md).toContain("Blazingly fast");
  });

  it("generates github widgets with username", () => {
    const config: ReadmeConfig = {
      username: "arlkn",
      sections: [
        {
          id: "1",
          type: "github-widgets",
          title: "GitHub Widgets",
          visible: true,
          data: {
            stats: true,
            streak: true,
            languages: false,
            activity: false,
            theme: "transparent",
          },
        },
      ],
    };
    const md = generateMarkdown(config);
    expect(md).toContain("arlkn");
    expect(md).toContain("github-readme-stats");
    expect(md).toContain("github-readme-streak-stats");
    expect(md).not.toContain("top-langs");
  });

  it("generates social links", () => {
    const config: ReadmeConfig = {
      username: "test",
      sections: [
        {
          id: "1",
          type: "social",
          title: "Social",
          visible: true,
          data: {
            links: [
              { platform: "twitter", url: "https://x.com/test", label: "Twitter" },
            ],
          },
        },
      ],
    };
    const md = generateMarkdown(config);
    expect(md).toContain("## Social");
    expect(md).toContain("[Twitter](https://x.com/test)");
  });

  it("generates license section", () => {
    const config: ReadmeConfig = {
      username: "test",
      sections: [
        {
          id: "1",
          type: "license",
          title: "License",
          visible: true,
          data: { type: "MIT", year: "2025", copyrightHolder: "Test User" },
        },
      ],
    };
    const md = generateMarkdown(config);
    expect(md).toContain("## License");
    expect(md).toContain("MIT");
    expect(md).toContain("2025");
    expect(md).toContain("Test User");
  });

  it("skips hidden sections", () => {
    const config: ReadmeConfig = {
      username: "test",
      sections: [
        {
          id: "1",
          type: "hero",
          title: "Hero",
          visible: false,
          data: { tagline: "Hidden", subtitle: "", showBranding: false },
        },
      ],
    };
    const md = generateMarkdown(config);
    expect(md).not.toContain("Hidden");
  });

  it("skips empty sections", () => {
    const config: ReadmeConfig = {
      username: "test",
      sections: [
        {
          id: "1",
          type: "tech-stack",
          title: "Tech Stack",
          visible: true,
          data: { items: [], displayStyle: "icons" },
        },
      ],
    };
    const md = generateMarkdown(config);
    expect(md).not.toContain("## Tech Stack");
  });
});
