import { describe, it, expect } from "vitest";
import { TEMPLATES } from "@/lib/constants";

describe("Templates", () => {
  it("has all required templates", () => {
    expect(TEMPLATES.length).toBeGreaterThanOrEqual(6);
    const ids = TEMPLATES.map((t) => t.id);
    expect(ids).toContain("minimal");
    expect(ids).toContain("student");
    expect(ids).toContain("fullstack");
    expect(ids).toContain("ai-engineer");
    expect(ids).toContain("open-source");
    expect(ids).toContain("macos-developer");
  });

  it("each template has required fields", () => {
    TEMPLATES.forEach((template) => {
      expect(template.id).toBeTruthy();
      expect(template.name).toBeTruthy();
      expect(template.description).toBeTruthy();
      expect(template.config).toBeDefined();
      expect(template.config.sections).toBeDefined();
      expect(template.config.sections.length).toBeGreaterThan(0);
    });
  });
});
