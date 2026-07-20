import type {
  ReadmeConfig,
  Section,
  HeaderData,
  AboutMeData,
  TechStackData,
  ProjectsData,
  GitHubWidgetsData,
  SocialsData,
  CustomSectionsData,
} from "@/types";
import { SKILL_ICONS_BASE } from "./constants";

function getTechIconUrl(icon: string): string {
  return `${SKILL_ICONS_BASE}${icon}`;
}

function generateHeaderMarkdown(data: HeaderData): string {
  const lines: string[] = [];

  if (data.banner) {
    lines.push(`![Banner](${data.banner})`);
    lines.push("");
  }

  const alignment = data.alignment === "center" ? "center" : data.alignment === "right" ? "right" : "";

  if (data.avatar) {
    if (alignment === "center") {
      lines.push(`<div align="center">`);
      lines.push("");
      lines.push(`<img src="${data.avatar}" width="150" style="border-radius: 50%;" alt="${data.name}" />`);
    } else if (alignment === "right") {
      lines.push(`<div align="right">`);
      lines.push("");
      lines.push(`<img src="${data.avatar}" width="150" style="border-radius: 50%;" alt="${data.name}" />`);
    } else {
      lines.push(`<img src="${data.avatar}" width="150" style="border-radius: 50%;" alt="${data.name}" />`);
    }
    lines.push("");
  }

  if (alignment) {
    lines.push(`<h1 align="${alignment}">${data.name}</h1>`);
  } else {
    lines.push(`# ${data.name}`);
  }

  if (data.title) {
    if (alignment) {
      lines.push(`<p align="${alignment}"><em>${data.title}</em></p>`);
    } else {
      lines.push(`*${data.title}*`);
    }
  }

  if (data.bio) {
    if (alignment) {
      lines.push(`<p align="${alignment}">${data.bio}</p>`);
    } else {
      lines.push(data.bio);
    }
  }

  if (data.typingAnimation && data.title) {
    lines.push("");
    lines.push(`<p align="center">`);
    lines.push(`  <a href="https://git.io/typing-svg">`);
    lines.push(`    <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&color=22D3EE&center=true&vCenter=true&width=435&lines=${encodeURIComponent(data.title)}" alt="Typing SVG" />`);
    lines.push(`  </a>`);
    lines.push(`</p>`);
  }

  if (alignment) {
    lines.push("");
    lines.push(`</div>`);
  }

  return lines.join("\n");
}

function generateAboutMeMarkdown(data: AboutMeData): string {
  const lines: string[] = [];
  lines.push("## About Me");
  lines.push("");

  if (data.biography) {
    lines.push(data.biography);
    lines.push("");
  }

  const items: Array<{ emoji: string; label: string; value: string }> = [];

  if (data.currentWork) {
    items.push({ emoji: "🔭", label: "I'm currently working on", value: data.currentWork });
  }
  if (data.learning) {
    items.push({ emoji: "🌱", label: "I'm currently learning", value: data.learning });
  }
  if (data.funFact) {
    items.push({ emoji: "⚡", label: "Fun fact", value: data.funFact });
  }
  if (data.contact) {
    items.push({ emoji: "📫", label: "How to reach me", value: data.contact });
  }

  items.forEach((item) => {
    lines.push(`- ${item.emoji} **${item.label}:** ${item.value}`);
  });

  if (items.length > 0) {
    lines.push("");
  }

  return lines.join("\n");
}

function generateTechStackMarkdown(data: TechStackData): string {
  const lines: string[] = [];
  lines.push("## Tech Stack");
  lines.push("");

  if (data.selectedTech.length === 0) {
    lines.push("*Select technologies to display here*");
    lines.push("");
    return lines.join("\n");
  }

  if (data.displayStyle === "badges") {
    lines.push(`<div align="center">`);
    lines.push("");
    data.selectedTech.forEach((tech) => {
      lines.push(`<img src="${getTechIconUrl(tech.icon)}" alt="${tech.name}" width="50" height="50"/>`);
    });
    lines.push("");
    lines.push(`</div>`);
  } else if (data.displayStyle === "grid") {
    lines.push(`<div align="center">`);
    lines.push("");
    data.selectedTech.forEach((tech) => {
      lines.push(`<img src="${getTechIconUrl(tech.icon)}" alt="${tech.name}" width="50" height="50"/>`);
    });
    lines.push("");
    lines.push(`</div>`);
  } else {
    lines.push(`<div align="center">`);
    lines.push("");
    data.selectedTech.forEach((tech) => {
      lines.push(`<img src="${getTechIconUrl(tech.icon)}" alt="${tech.name}" width="25" height="25"/> <strong>${tech.name}</strong>`);
    });
    lines.push("");
    lines.push(`</div>`);
  }

  lines.push("");
  return lines.join("\n");
}

function generateProjectsMarkdown(data: ProjectsData): string {
  const lines: string[] = [];
  lines.push("## Projects");
  lines.push("");

  if (data.projects.length === 0) {
    lines.push("*Add projects to showcase your work*");
    lines.push("");
    return lines.join("\n");
  }

  if (data.layout === "grid") {
    lines.push(`<div align="center">\n`);
  }

  data.projects.forEach((project) => {
    if (data.layout === "grid") {
      lines.push(`### ${project.name}`);
      lines.push("");
      if (project.image) {
        lines.push(`<img src="${project.image}" width="400" alt="${project.name}" />`);
        lines.push("");
      }
      lines.push(project.description);
      lines.push("");
      if (project.technologies.length > 0) {
        lines.push(
          project.technologies.map((t) => `\`${t}\``).join(" ")
        );
        lines.push("");
      }
      const links: string[] = [];
      if (project.githubLink) {
        links.push(`[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](${project.githubLink})`);
      }
      if (project.website) {
        links.push(`[![Website](https://img.shields.io/badge/Website-000000?style=for-the-badge&logo=vercel&logoColor=white)](${project.website})`);
      }
      const statusBadge: Record<string, string> = {
        active: "🟢 Active",
        "in-progress": "🟡 In Progress",
        completed: "🔵 Completed",
        archived: "⚫ Archived",
      };
      if (statusBadge[project.status]) {
        links.push(`*${statusBadge[project.status]}*`);
      }
      if (links.length > 0) {
        lines.push(links.join("\n"));
      }
      lines.push("");
      lines.push("---");
      lines.push("");
    } else {
      lines.push(`- **${project.name}**`);
      lines.push(`  - ${project.description}`);
      if (project.technologies.length > 0) {
        lines.push(`  - Tech: ${project.technologies.join(", ")}`);
      }
      if (project.githubLink) {
        lines.push(`  - [GitHub](${project.githubLink})`);
      }
      if (project.website) {
        lines.push(`  - [Website](${project.website})`);
      }
      lines.push("");
    }
  });

  if (data.layout === "grid") {
    lines.push(`</div>`);
    lines.push("");
  }

  return lines.join("\n");
}

function generateGitHubWidgetsMarkdown(data: GitHubWidgetsData): string {
  const lines: string[] = [];
  const username = data.username || "github";

  lines.push("## GitHub Stats");
  lines.push("");

  if (data.topLanguages) {
    lines.push(`<div align="center">\n`);
    lines.push(`<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&show_icons=true&locale=en&layout=compact&theme=transparent" alt="Top Languages" />`);
    lines.push(`\n</div>`);
    lines.push("");
  }

  if (data.stats) {
    lines.push(`<div align="center">\n`);
    lines.push(`<img src="https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&locale=en&theme=transparent" alt="GitHub Stats" />`);
    lines.push(`\n</div>`);
    lines.push("");
  }

  if (data.streak) {
    lines.push(`<div align="center">\n`);
    lines.push(`<img src="https://streak-stats.demolab.com?user=${username}&theme=transparent" alt="GitHub Streak" />`);
    lines.push(`\n</div>`);
    lines.push("");
  }

  if (data.activityGraph) {
    lines.push(`<div align="center">\n`);
    lines.push(`<img src="https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=github-dark" alt="Activity Graph" width="100%" />`);
    lines.push(`\n</div>`);
    lines.push("");
  }

  if (data.trophies) {
    lines.push(`<div align="center">\n`);
    lines.push(`<img src="https://github-profile-trophy.vercel.app/?username=${username}&no-frame=true&theme=flat" alt="Trophies" />`);
    lines.push(`\n</div>`);
    lines.push("");
  }

  return lines.join("\n");
}

function generateSocialsMarkdown(data: SocialsData): string {
  const lines: string[] = [];

  if (data.socials.length === 0) return "";

  lines.push("## Connect");
  lines.push("");

  const socialBadges: Record<string, { label: string; color: string }> = {
    github: { label: "GitHub", color: "181717" },
    linkedin: { label: "LinkedIn", color: "0077B5" },
    twitter: { label: "Twitter", color: "000000" },
    portfolio: { label: "Portfolio", color: "000000" },
    email: { label: "Email", color: "D44638" },
    discord: { label: "Discord", color: "5865F2" },
  };

  const badges = data.socials
    .filter((s) => s.url || s.username)
    .map((social) => {
      const badge = socialBadges[social.platform] || { label: social.platform, color: "000000" };
      const url =
        social.platform === "email"
          ? `mailto:${social.url || social.username}`
          : social.url || `https://${social.platform}.com/${social.username}`;
      return `[![${badge.label}](https://img.shields.io/badge/${badge.label}-${badge.color}?style=for-the-badge&logo=${social.platform === "twitter" ? "x" : social.platform}&logoColor=white)](${url})`;
    });

  if (badges.length > 0) {
    lines.push(`<div align="center">\n`);
    lines.push(badges.join("\n"));
    lines.push(`\n</div>`);
    lines.push("");
  }

  return lines.join("\n");
}

function generateCustomSectionMarkdown(section: Section): string {
  const data = section.data as CustomSectionsData;
  const lines: string[] = [];

  if (data.sections.length === 0) return "";

  data.sections
    .filter((s) => s.enabled)
    .forEach((customSection) => {
      lines.push(`## ${customSection.title}`);
      lines.push("");
      lines.push(customSection.content);
      lines.push("");
    });

  return lines.join("\n");
}

function generateSectionMarkdown(section: Section): string {
  if (!section.enabled) return "";

  switch (section.type) {
    case "header":
      return generateHeaderMarkdown(section.data as HeaderData);
    case "about-me":
      return generateAboutMeMarkdown(section.data as AboutMeData);
    case "tech-stack":
      return generateTechStackMarkdown(section.data as TechStackData);
    case "projects":
      return generateProjectsMarkdown(section.data as ProjectsData);
    case "github-widgets":
      return generateGitHubWidgetsMarkdown(section.data as GitHubWidgetsData);
    case "socials":
      return generateSocialsMarkdown(section.data as SocialsData);
    case "custom":
      return generateCustomSectionMarkdown(section);
    default:
      return "";
  }
}

export function generateMarkdown(config: ReadmeConfig): string {
  const parts = config.sections
    .map((section) => generateSectionMarkdown(section))
    .filter((part) => part.length > 0);

  const markdown = parts.join("\n");

  return markdown.trim() + "\n";
}
