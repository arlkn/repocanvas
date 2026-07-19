"use client";

import React from "react";
import dynamic from "next/dynamic";
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useReadmeStore } from "@/store/readme-store";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { Section, SectionType } from "@/types";

const SortableSectionList = dynamic(
  () => import("./sortable-section-list").then((mod) => mod.SortableSectionList),
  {
    ssr: false,
    loading: () => (
      <div className="space-y-1">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm animate-pulse"
          >
            <div className="w-3.5 h-3.5 bg-muted rounded" />
            <div className="h-4 w-4 bg-muted rounded shrink-0" />
            <div className="h-3 bg-muted rounded w-20" />
          </div>
        ))}
      </div>
    ),
  }
);

const SECTION_ICONS: Record<Section["type"], React.ElementType> = {
  header: User,
  "about-me": Heart,
  "tech-stack": Code,
  projects: FolderOpen,
  "github-widgets": BarChart3,
  socials: Share2,
  custom: FileText,
};

export function Sidebar() {
  const {
    config,
    activeSection,
    setActiveSection,
    addSection,
  } = useReadmeStore();

  const [collapsed, setCollapsed] = React.useState(false);
  const [showAddMenu, setShowAddMenu] = React.useState(false);

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
          <SortableSectionList />
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
