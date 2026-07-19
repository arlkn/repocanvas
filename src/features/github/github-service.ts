import type { GitHubRepo } from "@/types";

export async function fetchGitHubRepo(
  owner: string,
  repo: string
): Promise<GitHubRepo> {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}`,
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Repository not found: ${owner}/${repo}`);
  }

  const data = await response.json();

  const languagesResponse = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/languages`,
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    }
  );

  const languagesData = languagesResponse.ok
    ? await languagesResponse.json()
    : {};

  return {
    name: data.name || repo,
    description: data.description || "",
    topics: data.topics || [],
    languages: Object.keys(languagesData),
    license: data.license?.spdx_id || "None",
    homepage: data.homepage || "",
    stars: data.stargazers_count || 0,
  };
}

export function parseGitHubUrl(
  url: string
): { owner: string; repo: string } | null {
  const patterns = [
    /github\.com\/([^/]+)\/([^/]+)/,
    /^([^/]+)\/([^/]+)$/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return { owner: match[1], repo: match[2].replace(/\.git$/, "") };
    }
  }

  return null;
}

export function generateRepoBadges(repo: GitHubRepo): string {
  const badges: string[] = [];

  badges.push(
    `![Stars](https://img.shields.io/github/stars/${repo.name}?style=for-the-badge)`
  );

  if (repo.license && repo.license !== "None") {
    badges.push(
      `![License](https://img.shields.io/github/license/${repo.name}?style=for-the-badge)`
    );
  }

  if (repo.topics.length > 0) {
    repo.topics.slice(0, 5).forEach((topic) => {
      badges.push(
        `![${topic}](https://img.shields.io/badge/-${topic}-blue?style=flat-square)`
      );
    });
  }

  return badges.join("\n");
}
