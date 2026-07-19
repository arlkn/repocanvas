import { describe, it, expect } from "vitest";
import { parseGitHubUrl } from "@/features/github/github-service";

describe("parseGitHubUrl", () => {
  it("parses full GitHub URL", () => {
    const result = parseGitHubUrl("https://github.com/arlkn/detach");
    expect(result).toEqual({ owner: "arlkn", repo: "detach" });
  });

  it("parses owner/repo format", () => {
    const result = parseGitHubUrl("arlkn/detach");
    expect(result).toEqual({ owner: "arlkn", repo: "detach" });
  });

  it("parses URL with .git suffix", () => {
    const result = parseGitHubUrl("https://github.com/user/repo.git");
    expect(result).toEqual({ owner: "user", repo: "repo" });
  });

  it("returns null for invalid URL", () => {
    expect(parseGitHubUrl("not-a-url")).toBeNull();
    expect(parseGitHubUrl("")).toBeNull();
    expect(parseGitHubUrl("github.com")).toBeNull();
  });
});
