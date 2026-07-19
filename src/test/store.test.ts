import { describe, it, expect, beforeEach } from "vitest";
import { useReadmeStore } from "@/store/readme-store";
import { createDefaultConfig, TEMPLATES } from "@/lib/constants";

describe("ReadmeStore", () => {
  beforeEach(() => {
    useReadmeStore.setState({
      config: createDefaultConfig(),
      activeSection: "header",
      viewMode: "split",
      history: [createDefaultConfig()],
      historyIndex: 0,
    });
  });

  it("has default config", () => {
    const { config } = useReadmeStore.getState();
    expect(config.sections.length).toBeGreaterThan(0);
    expect(config.theme).toBe("dark");
  });

  it("updates section data", () => {
    const { activeSection, updateSection } = useReadmeStore.getState();
    if (activeSection) {
      updateSection(activeSection, { name: "Test User" });
      const { config } = useReadmeStore.getState();
      const section = config.sections.find((s) => s.id === activeSection);
      expect(section?.data).toHaveProperty("name", "Test User");
    }
  });

  it("toggles section enabled state", () => {
    const { toggleSection } = useReadmeStore.getState();
    const { config } = useReadmeStore.getState();
    const aboutSection = config.sections.find((s) => s.type === "about-me");
    if (aboutSection) {
      const initialEnabled = aboutSection.enabled;
      toggleSection(aboutSection.id);
      const { config: newConfig } = useReadmeStore.getState();
      const updatedSection = newConfig.sections.find((s) => s.id === aboutSection.id);
      expect(updatedSection?.enabled).toBe(!initialEnabled);
    }
  });

  it("adds a new section", () => {
    const { addSection } = useReadmeStore.getState();
    const { config: beforeConfig } = useReadmeStore.getState();
    const beforeCount = beforeConfig.sections.length;
    addSection("custom");
    const { config: afterConfig } = useReadmeStore.getState();
    expect(afterConfig.sections.length).toBe(beforeCount + 1);
  });

  it("removes a section", () => {
    const { removeSection } = useReadmeStore.getState();
    const { config } = useReadmeStore.getState();
    const customSection = config.sections.find((s) => s.type === "custom");
    if (customSection) {
      removeSection(customSection.id);
      const { config: newConfig } = useReadmeStore.getState();
      expect(newConfig.sections.find((s) => s.id === customSection.id)).toBeUndefined();
    }
  });

  it("supports undo and redo", () => {
    const { updateSection, undo, redo } = useReadmeStore.getState();
    const { config } = useReadmeStore.getState();
    const headerSection = config.sections.find((s) => s.type === "header");
    if (headerSection) {
      updateSection(headerSection.id, { name: "Changed Name" });
      undo();
      const { config: undoneConfig } = useReadmeStore.getState();
      const undoneSection = undoneConfig.sections.find((s) => s.id === headerSection.id);
      const data = undoneSection?.data as { name: string };
      expect(data.name).not.toBe("Changed Name");
      
      redo();
      const { config: redoneConfig } = useReadmeStore.getState();
      const redoneSection = redoneConfig.sections.find((s) => s.id === headerSection.id);
      const redoneData = redoneSection?.data as { name: string };
      expect(redoneData.name).toBe("Changed Name");
    }
  });

  it("loads template", () => {
    const { loadTemplate } = useReadmeStore.getState();
    const minimalTemplate = TEMPLATES.find((t) => t.id === "minimal");
    if (minimalTemplate) {
      loadTemplate(minimalTemplate.config);
      const { config } = useReadmeStore.getState();
      expect(config.sections.length).toBeGreaterThan(0);
    }
  });

  it("exports and imports config as JSON", () => {
    const { exportConfig, importFromJson } = useReadmeStore.getState();
    const json = exportConfig();
    expect(json).toBeTruthy();
    
    const parsed = JSON.parse(json);
    expect(parsed.sections).toBeDefined();
    
    const success = importFromJson(json);
    expect(success).toBe(true);
  });

  it("setViewMode changes view mode", () => {
    const { setViewMode } = useReadmeStore.getState();
    setViewMode("editor");
    expect(useReadmeStore.getState().viewMode).toBe("editor");
    setViewMode("preview");
    expect(useReadmeStore.getState().viewMode).toBe("preview");
    setViewMode("split");
    expect(useReadmeStore.getState().viewMode).toBe("split");
  });
});
