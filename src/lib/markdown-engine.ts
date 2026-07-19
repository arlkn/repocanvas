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

function getTechIconUrl(techName: string): string {
  const iconMap: Record<string, string> = {
    javascript: "js",
    typescript: "ts",
    python: "python",
    swift: "swift",
    go: "go",
    rust: "rust",
    java: "java",
    "c#": "cs",
    react: "react",
    "next.js": "nextjs",
    vue: "vuejs",
    angular: "angular",
    tailwind: "tailwindcss",
    html: "html5",
    css: "css3",
    "node.js": "nodedotjs",
    express: "express",
    nestjs: "nestjs",
    django: "django",
    laravel: "laravel",
    postgresql: "postgresql",
    mongodb: "mongodb",
    redis: "redis",
    sqlite: "sqlite",
    docker: "docker",
    kubernetes: "kubernetes",
    aws: "amazonwebservices",
    cloudflare: "cloudflare",
    vercel: "vercel",
    git: "git",
    github: "github",
    zed: "zed",
    "vs code": "vscode",
    figma: "figma",
    canva: "canva",
    gimp: "gimp",
  };

  const iconKey = iconMap[techName.toLowerCase()] || techName.toLowerCase().replace(/[^a-z0-9]/g, "");
  return `${SKILL_ICONS_BASE}${iconKey}`;
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
    const icons = data.selectedTech
      .map((tech) => `<img src="${getTechIconUrl(tech.name)}" alt="${tech.name}" width="50" height="50"/>`)
      .join("\n");
    lines.push(`<div align="center">\n\n${icons}\n\n</div>`);
  } else if (data.displayStyle === "grid") {
    lines.push(`<div align="center">\n`);
    data.selectedTech.forEach((tech) => {
      lines.push(`![${tech.name}](${getTechIconUrl(tech.name)})`);
    });
    lines.push(`\n</div>`);
  } else {
    data.selectedTech.forEach((tech) => {
      lines.push(`- ${tech.name}`);
    });
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

  if (data.stats || data.topLanguages) {
    lines.push(`<div align="center">\n`);
    if (data.topLanguages) {
      lines.push(`![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&show_icons=true&locale=en&layout=compact)`);
      lines.push("");
    }
    if (data.stats) {
      lines.push(`![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&locale=en)`);
    }
    lines.push(`\n</div>`);
    lines.push("");
  }

  if (data.streak) {
    lines.push(`![GitHub Streak](https://streak-stats.demolab.com?user=${username})`);
    lines.push("");
  }

  if (data.activityGraph) {
    lines.push(`![Activity Graph](https://github-readme-activity-graph.vercel.app/graph?username=${username})`);
    lines.push("");
  }

  if (data.trophies) {
    lines.push(`<div align="center">\n\n![Trophies](https://github-profile-trophy.vercel.app/?username=${username}&no-frame=true)\n\n</div>`);
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

  let markdown = parts.join("\n");

  if (config.username) {
    const statsLine = `\n\n<p align="center"><img src="https://github-readme-stats.vercel.app/api?username=${config.username}&show_icons=true&theme=transparent" alt="${config.username}" /></p>`;
    markdown += statsLine;
  }

  return markdown.trim() + "\n";
}
