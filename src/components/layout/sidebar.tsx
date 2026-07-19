"use client";

import React from "react";
import {
  User,
  Heart,
  Code,
  FolderOpen,
  BarChart3,
  Share2,
  FileText,
  Plus,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useReadmeStore } from "@/store/readme-store";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { Section, SectionType } from "@/types";

const SECTION_ICONS: Record<Section["type"], React.ElementType> = {
  header: User,
  "about-me": Heart,
  "tech-stack": Code,
  projects: FolderOpen,
  "github-widgets": BarChart3,
  socials: Share2,
  custom: FileText,
};

interface SectionItemProps {
  section: Section;
  isActive: boolean;
  index: number;
  total: number;
  onSelect: (id: string) => void;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
}

function SectionItem({
  section,
  isActive,
  index,
  total,
  onSelect,
  onToggle,
  onRemove,
  onMoveUp,
  onMoveDown,
}: SectionItemProps) {
  const Icon = SECTION_ICONS[section.type] || FileText;

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-all duration-150 group cursor-pointer",
        isActive
          ? "bg-primary/10 text-primary border border-primary/20"
          : "hover:bg-muted/50 text-muted-foreground hover:text-foreground border border-transparent"
      )}
      onClick={() => onSelect(section.id)}
    >
      <div className="flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMoveUp(index);
          }}
          disabled={index === 0}
          className="p-0.5 rounded hover:bg-muted/80 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronUp className="h-3 w-3" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMoveDown(index);
          }}
          disabled={index === total - 1}
          className="p-0.5 rounded hover:bg-muted/80 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronDown className="h-3 w-3" />
        </button>
      </div>

      <Icon className="h-4 w-4 shrink-0" />

      <span className="flex-1 truncate font-medium">{section.title}</span>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggle(section.id);
              }}
              className="p-1 rounded-md hover:bg-muted/80 transition-colors"
            >
              {section.enabled ? (
                <Eye className="h-3.5 w-3.5 text-muted-foreground" />
              ) : (
                <EyeOff className="h-3.5 w-3.5 text-destructive" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent>{section.enabled ? "Disable section" : "Enable section"}</TooltipContent>
        </Tooltip>

        {section.type !== "header" && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(section.id);
                }}
                className="p-1 rounded-md hover:bg-destructive/10 transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
              </button>
            </TooltipTrigger>
            <TooltipContent>Remove section</TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  );
}

export function Sidebar() {
  const {
    config,
    activeSection,
    setActiveSection,
    toggleSection,
    removeSection,
    reorderSections,
    addSection,
  } = useReadmeStore();

  const [collapsed, setCollapsed] = React.useState(false);
  const [showAddMenu, setShowAddMenu] = React.useState(false);

  function handleMoveUp(index: number) {
    if (index > 0) {
      reorderSections(index, index - 1);
    }
  }

  function handleMoveDown(index: number) {
    if (index < config.sections.length - 1) {
      reorderSections(index, index + 1);
    }
  }

  const addableSections: { type: SectionType; label: string }[] = [
    { type: "about-me", label: "About Me" },
    { type: "tech-stack", label: "Tech Stack" },
    { type: "projects", label: "Projects" },
    { type: "github-widgets", label: "GitHub Widgets" },
    { type: "socials", label: "Socials" },
    { type: "custom", label: "Custom Section" },
  ];

  const enabledCount = config.sections.filter((s) => s.enabled).length;

  return (
    <aside
      className={cn(
        "h-full border-r border-sidebar-border bg-sidebar flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-72"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">RC</span>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-sidebar-foreground">Sections</h2>
              <p className="text-[11px] text-muted-foreground">
                {enabledCount} of {config.sections.length} enabled
              </p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {!collapsed && (
        <ScrollArea className="flex-1 p-2">
          <div className="space-y-1">
            {config.sections.map((section, index) => (
              <SectionItem
                key={section.id}
                section={section}
                isActive={activeSection === section.id}
                index={index}
                total={config.sections.length}
                onSelect={setActiveSection}
                onToggle={toggleSection}
                onRemove={removeSection}
                onMoveUp={handleMoveUp}
                onMoveDown={handleMoveDown}
              />
            ))}
          </div>
        </ScrollArea>
      )}

      {collapsed && (
        <div className="flex-1 flex flex-col items-center gap-2 p-2">
          {config.sections.map((section) => {
            const Icon = SECTION_ICONS[section.type] || FileText;
            return (
              <Tooltip key={section.id}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setActiveSection(section.id)}
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center transition-all",
                      activeSection === section.id
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted/50 text-muted-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">{section.title}</TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      )}

      {!collapsed && (
        <div className="p-3 border-t border-sidebar-border">
          <div className="relative">
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() => setShowAddMenu(!showAddMenu)}
            >
              <Plus className="h-4 w-4" />
              Add Section
            </Button>

            {showAddMenu && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-popover border rounded-lg shadow-lg p-1 z-50">
                {addableSections.map((item) => (
                  <button
                    key={item.type}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent text-left transition-colors"
                    onClick={() => {
                      addSection(item.type);
                      setShowAddMenu(false);
                    }}
                  >
                    {React.createElement(SECTION_ICONS[item.type] || FileText, {
                      className: "h-4 w-4",
                    })}
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {collapsed && (
        <div className="p-2 border-t border-sidebar-border">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="w-full h-10"
                onClick={() => {
                  setCollapsed(false);
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Add Section</TooltipContent>
          </Tooltip>
        </div>
      )}
    </aside>
  );
}
