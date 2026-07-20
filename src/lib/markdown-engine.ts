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
  TechGroup,
  Alignment,
} from "@/types";

export function getTechIconUrl(tech: TechItem): string {
  return `https://cdn.simpleicons.org/${tech.icon}`;
}

function generateHeroMarkdown(data: HeroData, username: string): string {
  const lines: string[] = [];
  const align = data.alignment || "center";

  if (data.tagline) {
    lines.push(`<h1 align="${align}">${data.tagline}</h1>`);
  }
  if (data.subtitle) {
    lines.push(`<p align="${align}"><em>${data.subtitle}</em></p>`);
  }
  if (data.showBranding && username) {
    lines.push(
      `<p align="${align}">Built by <a href="https://github.com/${username}">${username}</a></p>`
    );
  }
  if (data.showDivider && lines.length > 0) {
    lines.push(`<div align="${align}"><hr /></div>`);
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

function generateTechItemHtml(tech: TechItem, size: number, showLabel: boolean): string {
  const label = showLabel ? `<br />\n<sub>${tech.name}</sub>` : "";
  return `<img src="${getTechIconUrl(tech)}" alt="${tech.name}" width="${size}" height="${size}" />${label}`;
}

function generateTechGroupGrid(
  group: TechGroup,
  columns: number,
  alignment: Alignment,
  iconSize: number,
  showLabels: boolean
): string {
  if (group.items.length === 0) return "";

  const cellWidth = Math.floor(96 * (iconSize / 40));
  const rows: string[] = [];
  let currentRow: string[] = [];

  for (const tech of group.items) {
    currentRow.push(
      `<td align="${alignment}" width="${cellWidth}">\n${generateTechItemHtml(tech, iconSize, showLabels)}\n</td>`
    );
    if (currentRow.length === columns) {
      rows.push(`  <tr>\n${currentRow.join("\n")}\n  </tr>`);
      currentRow = [];
    }
  }

  if (currentRow.length > 0) {
    while (currentRow.length < columns) {
      currentRow.push(`<td width="${cellWidth}"></td>`);
    }
    rows.push(`  <tr>\n${currentRow.join("\n")}\n  </tr>`);
  }

  return `<table>\n${rows.join("\n")}\n</table>`;
}

function generateTechGroupIcons(
  group: TechGroup,
  iconSize: number,
  showLabels: boolean
): string {
  if (group.items.length === 0) return "";

  if (showLabels) {
    const items = group.items
      .map(
        (t) =>
          `<img src="${getTechIconUrl(t)}" alt="${t.name}" width="${iconSize}" height="${iconSize}" /> <b>${t.name}</b>`
      )
      .join(" | ");
    return `<div align="center">\n\n${items}\n\n</div>`;
  }

  const icons = group.items
    .map(
      (t) =>
        `<img src="${getTechIconUrl(t)}" alt="${t.name}" width="${iconSize}" height="${iconSize}" />`
    )
    .join(" ");
  return `<div align="center">\n\n${icons}\n\n</div>`;
}

function generateTechGroupList(
  group: TechGroup,
  iconSize: number
): string {
  if (group.items.length === 0) return "";

  const listSize = Math.max(16, Math.floor(iconSize * 0.5));
  return group.items
    .map(
      (t) =>
        `- <img src="${getTechIconUrl(t)}" alt="${t.name}" width="${listSize}" height="${listSize}" /> ${t.name}`
    )
    .join("\n");
}

function generateTechStackMarkdown(data: TechStackData): string {
  const nonEmptyGroups = data.groups.filter((g) => g.items.length > 0);
  if (nonEmptyGroups.length === 0) return "";

  const lines: string[] = ["## Tech Stack", ""];

  for (const group of nonEmptyGroups) {
    if (nonEmptyGroups.length > 1 || group.title !== "Tech Stack") {
      lines.push(`### ${group.title}`);
      lines.push("");
    }

    switch (data.displayStyle) {
      case "grid":
        lines.push(
          generateTechGroupGrid(
            group,
            data.gridColumns,
            data.gridAlignment,
            data.iconSize,
            data.showLabels
          )
        );
        break;
      case "list":
        lines.push(generateTechGroupList(group, data.iconSize));
        break;
      case "logos":
        lines.push(
          generateTechGroupIcons(group, data.iconSize, true)
        );
        break;
      case "icons":
      default:
        lines.push(
          generateTechGroupIcons(group, data.iconSize, data.showLabels)
        );
        break;
    }

    lines.push("");
  }

  return lines.join("\n");
}

function generateFeaturesMarkdown(data: FeaturesData): string {
  if (data.items.length === 0) return "";

  const lines: string[] = ["## Features", ""];

  if (data.columns === 1) {
    for (const item of data.items) {
      lines.push(`### ${item.icon} ${item.title}`);
      lines.push("");
      if (data.showDescriptions) {
        lines.push(item.description);
        lines.push("");
      }
    }
  } else {
    lines.push("<table>");
    let currentRow: string[] = [];
    for (const item of data.items) {
      const desc = data.showDescriptions
        ? `<br />\n<p>${item.description}</p>`
        : "";
      currentRow.push(
        `<td>\n\n### ${item.icon} ${item.title}${desc}\n\n</td>`
      );
      if (currentRow.length === data.columns) {
        lines.push(`  <tr>\n${currentRow.map((c) => `    ${c}`).join("\n")}\n  </tr>`);
        currentRow = [];
      }
    }
    if (currentRow.length > 0) {
      while (currentRow.length < data.columns) {
        currentRow.push("<td></td>");
      }
      lines.push(`  <tr>\n${currentRow.map((c) => `    ${c}`).join("\n")}\n  </tr>`);
    }
    lines.push("</table>");
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

  const lines: string[] = ["## Social", ""];
  const align = data.alignment || "center";

  if (data.style === "badges") {
    lines.push(`<div align="${align}">`);
    for (const link of data.links) {
      if (link.url) {
        lines.push(
          `[![${link.label}](https://img.shields.io/badge/${encodeURIComponent(link.label)}-blue?style=for-the-badge&logo=${link.platform}&logoColor=white)](${link.url})`
        );
      }
    }
    lines.push("</div>");
  } else if (data.style === "cards") {
    lines.push(`<div align="${align}">`);
    lines.push("");
    lines.push("| Platform | Link |");
    lines.push("|----------|------|");
    for (const link of data.links) {
      if (link.url) {
        lines.push(`| ${link.label} | [${link.url}](${link.url}) |`);
      }
    }
    lines.push("");
    lines.push("</div>");
  } else {
    lines.push(`<div align="${align}">`);
    for (const link of data.links) {
      if (link.url) {
        lines.push(`[${link.label}](${link.url})`);
      }
    }
    lines.push("</div>");
  }

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
