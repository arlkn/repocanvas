"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { TechIcon } from "@/components/ui/tech-icon";
import { useReadmeStore } from "@/store/readme-store";
import { TECHNOLOGIES, TECH_CATEGORIES } from "@/lib/constants";
import type { TechStackData, Technology, TechnologyCategory } from "@/types";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";

export function TechStackEditor() {
  const { config, activeSection, updateSection } = useReadmeStore();
  const section = config.sections.find((s) => s.id === activeSection);
  const [search, setSearch] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState<TechnologyCategory | "all">("all");

  if (!section || section.type !== "tech-stack") return null;

  const data = section.data as TechStackData;

  const filteredTech = TECHNOLOGIES.filter((tech) => {
    const matchesSearch = tech.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "all" || tech.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleTech = (tech: Technology) => {
    const isSelected = data.selectedTech.some((t) => t.name === tech.name);
    const newSelected = isSelected
      ? data.selectedTech.filter((t) => t.name !== tech.name)
      : [...data.selectedTech, tech];
    updateSection(section.id, { ...data, selectedTech: newSelected });
  };

  const removeTech = (name: string) => {
    updateSection(section.id, {
      ...data,
      selectedTech: data.selectedTech.filter((t) => t.name !== name),
    });
  };

  return (
    <div className="space-y-4">
      {data.selectedTech.length > 0 && (
        <div className="space-y-2">
          <Label>Selected ({data.selectedTech.length})</Label>
          <div className="flex flex-wrap gap-1.5">
            {data.selectedTech.map((tech) => (
              <Badge
                key={tech.name}
                variant="secondary"
                className="gap-1 pr-1 cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors"
                onClick={() => removeTech(tech.name)}
              >
                <TechIcon name={tech.name} icon={tech.icon} className="w-4 h-4" />
                {tech.name}
                <X className="h-3 w-3" />
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label>Display Style</Label>
        <div className="grid grid-cols-3 gap-2">
          {(["grid", "list", "badges"] as const).map((style) => (
            <button
              key={style}
              onClick={() => updateSection(section.id, { ...data, displayStyle: style })}
              className={cn(
                "px-3 py-2 rounded-lg text-xs font-medium border transition-all",
                data.displayStyle === style
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border hover:border-primary/50 text-muted-foreground"
              )}
            >
              {style.charAt(0).toUpperCase() + style.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Search Technologies</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="pl-9"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Categories</Label>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setActiveCategory("all")}
            className={cn(
              "px-2.5 py-1 rounded-md text-xs font-medium transition-all",
              activeCategory === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            All
          </button>
          {Object.entries(TECH_CATEGORIES).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key as TechnologyCategory)}
              className={cn(
                "px-2.5 py-1 rounded-md text-xs font-medium transition-all",
                activeCategory === key
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Available Technologies</Label>
        <div className="grid grid-cols-2 gap-1.5 max-h-64 overflow-y-auto pr-1">
          {filteredTech.map((tech) => {
            const isSelected = data.selectedTech.some((t) => t.name === tech.name);
            return (
              <button
                key={tech.name}
                onClick={() => toggleTech(tech)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border transition-all text-left",
                  isSelected
                    ? "bg-primary/10 text-primary border-primary/30"
                    : "border-border hover:border-primary/30 text-muted-foreground hover:text-foreground"
                )}
              >
                <TechIcon name={tech.name} icon={tech.icon} className="w-5 h-5" />
                {tech.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
