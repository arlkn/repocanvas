"use client";

import React from "react";
import { useReadmeStore } from "@/store/readme-store";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HeaderEditor } from "@/features/header/header-editor";
import { AboutMeEditor } from "@/features/about-me/about-me-editor";
import { TechStackEditor } from "@/features/tech-stack/tech-stack-editor";
import { ProjectsEditor } from "@/features/projects/projects-editor";
import { GitHubWidgetsEditor } from "@/features/github-widgets/github-widgets-editor";
import { SocialsEditor } from "@/features/socials/socials-editor";
import { CustomSectionsEditor } from "@/features/custom-sections/custom-sections-editor";
import { TemplatesPanel } from "@/features/templates/templates-panel";
import { ScorePanel } from "@/components/editor/score-panel";
import { ImportExportPanel } from "@/components/editor/import-export-panel";
import { AIAssistant } from "@/features/ai/ai-assistant";
import { GitHubImportModal } from "@/features/github/github-import-modal";
import { User, Heart, Code, FolderOpen, BarChart3, Share2, FileText, Sparkles, BarChart, ArrowDownUp, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

const SECTION_EDITORS: Record<string, React.ComponentType> = {
  header: HeaderEditor,
  "about-me": AboutMeEditor,
  "tech-stack": TechStackEditor,
  projects: ProjectsEditor,
  "github-widgets": GitHubWidgetsEditor,
  socials: SocialsEditor,
  custom: CustomSectionsEditor,
};

const SECTION_ICONS: Record<string, React.ElementType> = {
  header: User,
  "about-me": Heart,
  "tech-stack": Code,
  projects: FolderOpen,
  "github-widgets": BarChart3,
  socials: Share2,
  custom: FileText,
};

export function SectionEditor() {
  const { activeSection, config } = useReadmeStore();
  const [activeTab, setActiveTab] = React.useState<"editor" | "templates" | "score" | "import-export" | "ai">("editor");

  const section = config.sections.find((s) => s.id === activeSection);
  const EditorComponent = section ? SECTION_EDITORS[section.type] : null;
  const Icon = section ? SECTION_ICONS[section.type] || FileText : null;

  const tabs = [
    { id: "editor" as const, icon: Icon || User, label: "Editor" },
    { id: "templates" as const, icon: Sparkles, label: "Templates" },
    { id: "ai" as const, icon: Wand2, label: "AI" },
    { id: "score" as const, icon: BarChart, label: "Score" },
    { id: "import-export" as const, icon: ArrowDownUp, label: "Import/Export" },
  ];

  return (
    <div className="h-full flex flex-col bg-card border-r border-border">
      <div className="flex items-center gap-1 px-3 pt-3 border-b border-border shrink-0 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap -mb-px",
              activeTab === tab.id
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <tab.icon className="h-3.5 w-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      <ScrollArea className="flex-1">
        {activeTab === "editor" && (
          <div className="p-4">
            {section && EditorComponent ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {Icon && <Icon className="h-5 w-5 text-primary" />}
                    <h2 className="text-lg font-semibold">{section.title}</h2>
                  </div>
                </div>
                <EditorComponent />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center mb-3">
                  <User className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mb-4">Select a section from the sidebar to edit</p>
                <GitHubImportModal />
              </div>
            )}
          </div>
        )}
        {activeTab === "templates" && <TemplatesPanel />}
        {activeTab === "ai" && (
          <div className="p-4">
            <AIAssistant />
          </div>
        )}
        {activeTab === "score" && <ScorePanel />}
        {activeTab === "import-export" && <ImportExportPanel />}
      </ScrollArea>
    </div>
  );
}
