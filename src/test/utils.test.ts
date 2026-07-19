import { describe, it, expect } from "vitest";
import {
  cn,
  generateId,
  slugify,
  truncate,
  formatDate,
} from "@/lib/utils";

describe("Utility Functions", () => {
  it("cn merges class names", () => {
    const result = cn("text-red-500", "text-blue-500");
    expect(result).toBe("text-blue-500");
  });

  it("cn handles conditional classes", () => {
    const result = cn("base", false && "hidden", "extra");
    expect(result).toContain("base");
    expect(result).toContain("extra");
    expect(result).not.toContain("hidden");
  });

  it("generateId generates unique strings", () => {
    const id1 = generateId();
    const id2 = generateId();
    expect(id1).toBeTruthy();
    expect(id2).toBeTruthy();
    expect(id1).not.toBe(id2);
  });

  it("slugify converts text to slug", () => {
    expect(slugify("Hello World")).toBe("hello-world");
    expect(slugify("My Cool Project")).toBe("my-cool-project");
    expect(slugify("special!@#chars")).toBe("specialchars");
  });

  it("truncate truncates long text", () => {
    expect(truncate("hello", 10)).toBe("hello");
    expect(truncate("hello world this is long", 10)).toBe("hello worl...");
  });

  it("formatDate formats date correctly", () => {
    const date = new Date("2024-01-15");
    const formatted = formatDate(date);
    expect(formatted).toContain("2024");
    expect(formatted).toContain("15");
  });
});
