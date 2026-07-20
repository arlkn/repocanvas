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

  it("generates hero section with alignment", () => {
    const config: ReadmeConfig = {
      username: "test",
      sections: [
        {
          id: "1",
          type: "hero",
          title: "Hero",
          visible: true,
          data: {
            tagline: "My Project",
            subtitle: "A cool tool",
            showBranding: true,
            alignment: "center",
            showDivider: false,
          },
        },
      ],
    };
    const md = generateMarkdown(config);
    expect(md).toContain('align="center"');
    expect(md).toContain("My Project");
    expect(md).toContain("A cool tool");
    expect(md).toContain("test");
  });

  it("generates hero with left alignment and divider", () => {
    const config: ReadmeConfig = {
      username: "test",
      sections: [
        {
          id: "1",
          type: "hero",
          title: "Hero",
          visible: true,
          data: {
            tagline: "Left",
            subtitle: "",
            showBranding: false,
            alignment: "left",
            showDivider: true,
          },
        },
      ],
    };
    const md = generateMarkdown(config);
    expect(md).toContain('align="left"');
    expect(md).toContain("<hr />");
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

  it("generates tech stack with groups", () => {
    const config: ReadmeConfig = {
      username: "test",
      sections: [
        {
          id: "1",
          type: "tech-stack",
          title: "Tech Stack",
          visible: true,
          data: {
            groups: [
              {
                id: "g1",
                title: "Frontend",
                items: [
                  { name: "React", icon: "react" },
                  { name: "TypeScript", icon: "typescript" },
                ],
              },
              {
                id: "g2",
                title: "Backend",
                items: [{ name: "Node.js", icon: "nodedotjs" }],
              },
            ],
            displayStyle: "icons",
            gridColumns: 4,
            gridAlignment: "center",
            showLabels: true,
            iconSize: 40,
          },
        },
      ],
    };
    const md = generateMarkdown(config);
    expect(md).toContain("## Tech Stack");
    expect(md).toContain("### Frontend");
    expect(md).toContain("### Backend");
    expect(md).toContain("cdn.simpleicons.org/react");
    expect(md).toContain("cdn.simpleicons.org/typescript");
    expect(md).toContain("cdn.simpleicons.org/nodedotjs");
  });

  it("generates tech stack grid layout", () => {
    const config: ReadmeConfig = {
      username: "test",
      sections: [
        {
          id: "1",
          type: "tech-stack",
          title: "Tech Stack",
          visible: true,
          data: {
            groups: [
              {
                id: "g1",
                title: "Tech Stack",
                items: [
                  { name: "React", icon: "react" },
                  { name: "TypeScript", icon: "typescript" },
                ],
              },
            ],
            displayStyle: "grid",
            gridColumns: 2,
            gridAlignment: "center",
            showLabels: true,
            iconSize: 40,
          },
        },
      ],
    };
    const md = generateMarkdown(config);
    expect(md).toContain("<table>");
    expect(md).toContain('<td align="center"');
    expect(md).toContain("React");
    expect(md).toContain("TypeScript");
  });

  it("generates tech stack list display", () => {
    const config: ReadmeConfig = {
      username: "test",
      sections: [
        {
          id: "1",
          type: "tech-stack",
          title: "Tech Stack",
          visible: true,
          data: {
            groups: [
              {
                id: "g1",
                title: "Tech Stack",
                items: [{ name: "React", icon: "react" }],
              },
            ],
            displayStyle: "list",
            gridColumns: 4,
            gridAlignment: "center",
            showLabels: true,
            iconSize: 40,
          },
        },
      ],
    };
    const md = generateMarkdown(config);
    expect(md).toContain("- <img");
    expect(md).toContain("React");
  });

  it("generates features with columns", () => {
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
              { icon: "🔒", title: "Secure", description: "Very secure" },
            ],
            columns: 2,
            iconSize: "medium",
            showDescriptions: true,
          },
        },
      ],
    };
    const md = generateMarkdown(config);
    expect(md).toContain("## Features");
    expect(md).toContain("<table>");
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

  it("generates social links with badges style", () => {
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
            style: "badges",
            alignment: "center",
          },
        },
      ],
    };
    const md = generateMarkdown(config);
    expect(md).toContain("## Social");
    expect(md).toContain("shields.io/badge");
    expect(md).toContain("https://x.com/test");
  });

  it("generates social links with cards style", () => {
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
            style: "cards",
            alignment: "center",
          },
        },
      ],
    };
    const md = generateMarkdown(config);
    expect(md).toContain("| Platform | Link |");
    expect(md).toContain("| Twitter |");
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
          data: {
            tagline: "Hidden",
            subtitle: "",
            showBranding: false,
            alignment: "center",
            showDivider: false,
          },
        },
      ],
    };
    const md = generateMarkdown(config);
    expect(md).not.toContain("Hidden");
  });

  it("skips empty groups", () => {
    const config: ReadmeConfig = {
      username: "test",
      sections: [
        {
          id: "1",
          type: "tech-stack",
          title: "Tech Stack",
          visible: true,
          data: {
            groups: [
              { id: "g1", title: "Empty Group", items: [] },
            ],
            displayStyle: "icons",
            gridColumns: 4,
            gridAlignment: "center",
            showLabels: true,
            iconSize: 40,
          },
        },
      ],
    };
    const md = generateMarkdown(config);
    expect(md).not.toContain("## Tech Stack");
  });
});
