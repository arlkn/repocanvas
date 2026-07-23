"use client";

import { useReadmeStore } from "@/store/readme-store";
import { SECTION_TYPES } from "@/lib/constants";
import type { SectionType } from "@/types";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Rocket,
  FileText,
  Wrench,
  LayoutGrid,
  BarChart3,
  Users,
  Scale,
  Eye,
  EyeOff,
  Trash2,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Rocket,
  FileText,
  Wrench,
  LayoutGrid,
  BarChart3,
  Users,
  Scale,
};

export function Sidebar() {
  const {
    config,
    selectedSectionId,
    selectSection,
    addSection,
    removeSection,
    moveSection,
    toggleSectionVisibility,
  } = useReadmeStore();

  const existingTypes = new Set(config.sections.map((s) => s.type));
  const availableTypes = (Object.entries(SECTION_TYPES) as [
    SectionType,
    (typeof SECTION_TYPES)[SectionType],
  ][]).filter(([type]) => !existingTypes.has(type));

  return (
    <aside className="flex w-[280px] shrink-0 flex-col border-r border-border bg-card">
      {/* Brand */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <Rocket className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-tight">RepoCanvas</h1>
          <p className="text-[10px] text-muted-foreground">README Builder</p>
        </div>
      </div>

      {/* Sections */}
      <div className="flex items-center justify-between px-4 py-2">
        <span className="text-xs font-medium uppercase text-muted-foreground">
          Sections
        </span>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-1 px-2">
          {config.sections.map((section, index) => {
            const meta = SECTION_TYPES[section.type];
            const Icon = ICON_MAP[meta.icon] ?? FileText;
            const isSelected = section.id === selectedSectionId;

            return (
              <div
                key={section.id}
                className={`group flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors ${
                  isSelected
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <button
                  className="flex flex-1 items-center gap-2 text-left"
                  onClick={() => selectSection(section.id)}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{section.title}</span>
                </button>

                <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    className="rounded p-0.5 hover:bg-muted"
                    onClick={(e) => {
                      e.stopPropagation();
                      moveSection(section.id, "up");
                    }}
                    disabled={index === 0}
                  >
                    <ChevronUp className="h-3 w-3" />
                  </button>
                  <button
                    className="rounded p-0.5 hover:bg-muted"
                    onClick={(e) => {
                      e.stopPropagation();
                      moveSection(section.id, "down");
                    }}
                    disabled={index === config.sections.length - 1}
                  >
                    <ChevronDown className="h-3 w-3" />
                  </button>
                  <button
                    className="rounded p-0.5 hover:bg-muted"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSectionVisibility(section.id);
                    }}
                  >
                    {section.visible ? (
                      <Eye className="h-3 w-3" />
                    ) : (
                      <EyeOff className="h-3 w-3" />
                    )}
                  </button>
                  <button
                    className="rounded p-0.5 hover:bg-destructive/10 hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSection(section.id);
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Add Section */}
      {availableTypes.length > 0 && (
        <div className="border-t border-border p-3">
          <div className="mb-2 text-xs font-medium uppercase text-muted-foreground">
            Add Section
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {availableTypes.map(([type, meta]) => {
              const Icon = ICON_MAP[meta.icon] ?? FileText;
              return (
                <Button
                  key={type}
                  variant="ghost"
                  size="sm"
                  className="justify-start gap-2 text-xs h-8"
                  onClick={() => addSection(type)}
                >
                  <Icon className="h-3 w-3" />
                  {meta.label}
                </Button>
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
}
