import type {
  ReadmeConfig,
  HeroData,
  AboutData,
  TechStackData,
  FeaturesData,
  GitHubWidgetsData,
  SocialData,
  LicenseData,
  TechItem,
} from "@/types";

export function getTechIconUrl(tech: TechItem): string {
  return `https://cdn.simpleicons.org/${tech.icon}`;
}

function generateHeroMarkdown(data: HeroData, username: string): string {
  const lines: string[] = [];
  if (data.tagline) {
    lines.push(`# ${data.tagline}`);
  }
  if (data.subtitle) {
    lines.push(`> ${data.subtitle}`);
  }
  if (data.showBranding && username) {
    lines.push(`> Built by [${username}](https://github.com/${username})`);
  }
  if (lines.length > 0) {
    lines.push("");
  }
  return lines.join("\n");
}

function generateAboutMarkdown(data: AboutData): string {
  if (!data.content) return "";
  return `## About\n\n${data.content}\n`;
}

function generateTechStackMarkdown(data: TechStackData): string {
  if (data.items.length === 0) return "";

  const lines: string[] = ["## Tech Stack", ""];

  if (data.displayStyle === "icons") {
    const icons = data.items
      .map(
        (t) =>
          `<img src="${getTechIconUrl(t)}" alt="${t.name}" width="40" height="40" />`
      )
      .join(" ");
    lines.push(
      `<div align="center">\n\n${icons}\n\n</div>`
    );
  } else if (data.displayStyle === "list") {
    const list = data.items.map((t) => `- <img src="${getTechIconUrl(t)}" alt="${t.name}" width="20" height="20" /> ${t.name}`).join("\n");
    lines.push(list);
  } else {
    const logos = data.items
      .map(
        (t) =>
          `<img src="${getTechIconUrl(t)}" alt="${t.name}" width="40" height="40" /> <b>${t.name}</b>`
      )
      .join(" | ");
    lines.push(
      `<div align="center">\n\n${logos}\n\n</div>`
    );
  }

  lines.push("");
  return lines.join("\n");
}

function generateFeaturesMarkdown(data: FeaturesData): string {
  if (data.items.length === 0) return "";

  const lines: string[] = ["## Features", ""];
  for (const item of data.items) {
    lines.push(`### ${item.icon} ${item.title}`);
    lines.push("");
    lines.push(item.description);
    lines.push("");
  }
  return lines.join("\n");
}

function generateGitHubWidgetsMarkdown(
  data: GitHubWidgetsData,
  username: string
): string {
  if (!username) return "";

  const lines: string[] = ["## GitHub Widgets", ""];
  const divStart = "<div align='center'>";
  const divEnd = "</div>";

  if (data.stats) {
    lines.push(`${divStart}`);
    lines.push(
      `<img src="https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${data.theme}" alt="GitHub Stats" />`
    );
    lines.push(`${divEnd}`);
    lines.push("");
  }

  if (data.streak) {
    lines.push(`${divStart}`);
    lines.push(
      `<img src="https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=${data.theme}" alt="Streak Stats" />`
    );
    lines.push(`${divEnd}`);
    lines.push("");
  }

  if (data.languages) {
    lines.push(`${divStart}`);
    lines.push(
      `<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=${data.theme}" alt="Top Languages" />`
    );
    lines.push(`${divEnd}`);
    lines.push("");
  }

  if (data.activity) {
    lines.push(`${divStart}`);
    lines.push(
      `<img src="https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=github${data.theme === "dark" ? "-dark" : ""}" alt="Activity Graph" />`
    );
    lines.push(`${divEnd}`);
    lines.push("");
  }

  return lines.join("\n");
}

function generateSocialMarkdown(data: SocialData): string {
  if (data.links.length === 0) return "";

  const lines: string[] = ["## Social", "", "<div align='center'>", ""];

  for (const link of data.links) {
    if (link.url) {
      lines.push(`[${link.label || link.platform}](${link.url})`);
    }
  }

  lines.push("");
  lines.push("</div>");
  lines.push("");
  return lines.join("\n");
}

function generateLicenseMarkdown(data: LicenseData): string {
  const holder = data.copyrightHolder || "Author";
  const year = data.year || new Date().getFullYear().toString();

  return `## License

This project is licensed under the ${data.type} License - see the [LICENSE](LICENSE) file for details.

© ${year} ${holder}
`;
}

export function generateMarkdown(config: ReadmeConfig): string {
  const visibleSections = config.sections.filter((s) => s.visible);

  if (visibleSections.length === 0) {
    return "<!-- Add sections to generate your README -->\n";
  }

  const parts: string[] = [];

  for (const section of visibleSections) {
    switch (section.type) {
      case "hero":
        parts.push(generateHeroMarkdown(section.data as HeroData, config.username));
        break;
      case "about":
        parts.push(generateAboutMarkdown(section.data as AboutData));
        break;
      case "tech-stack":
        parts.push(generateTechStackMarkdown(section.data as TechStackData));
        break;
      case "features":
        parts.push(generateFeaturesMarkdown(section.data as FeaturesData));
        break;
      case "github-widgets":
        parts.push(
          generateGitHubWidgetsMarkdown(
            section.data as GitHubWidgetsData,
            config.username
          )
        );
        break;
      case "social":
        parts.push(generateSocialMarkdown(section.data as SocialData));
        break;
      case "license":
        parts.push(generateLicenseMarkdown(section.data as LicenseData));
        break;
    }
  }

  return parts.join("\n");
}
