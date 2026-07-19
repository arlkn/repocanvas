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

  it("has the arlkn example template", () => {
    const example = TEMPLATES.find((t) => t.id === "arlkn-example");
    expect(example).toBeDefined();
    expect(example?.name).toBe("Aral's Example");
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

  it("arlkn example has Detach project", () => {
    const example = TEMPLATES.find((t) => t.id === "arlkn-example");
    expect(example).toBeDefined();
    const projectsSection = example?.config.sections.find((s) => s.type === "projects");
    expect(projectsSection).toBeDefined();
    const data = projectsSection?.data as { projects: { name: string }[] };
    expect(data.projects.length).toBe(1);
    expect(data.projects[0].name).toBe("Detach");
  });

  it("arlkn example has Swift and other technologies", () => {
    const example = TEMPLATES.find((t) => t.id === "arlkn-example");
    const techSection = example?.config.sections.find((s) => s.type === "tech-stack");
    expect(techSection).toBeDefined();
    const data = techSection?.data as { selectedTech: { name: string }[] };
    const techNames = data.selectedTech.map((t) => t.name);
    expect(techNames).toContain("Swift");
    expect(techNames).toContain("TypeScript");
    expect(techNames).toContain("React");
  });
});
