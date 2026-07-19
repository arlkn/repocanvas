"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useReadmeStore } from "@/store/readme-store";
import { TEMPLATES } from "@/lib/constants";
import {
  Minimize2,
  GraduationCap,
  Layers,
  Brain,
  GitFork,
  Apple,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

const ICON_MAP: Record<string, React.ElementType> = {
  Minimize2,
  GraduationCap,
  Layers,
  Brain,
  GitFork,
  Apple,
  Sparkles,
};

export function TemplatesPanel() {
  const { loadTemplate } = useReadmeStore();

  const handleLoadTemplate = (templateId: string) => {
    const template = TEMPLATES.find((t) => t.id === templateId);
    if (template) {
      loadTemplate(template.config);
      toast.success(`Loaded "${template.name}" template`);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-1">Templates</h3>
        <p className="text-xs text-muted-foreground">
          Start with a pre-built template and customize it
        </p>
      </div>

      <div className="space-y-2">
        {TEMPLATES.map((template) => {
          const Icon = ICON_MAP[template.icon] || Sparkles;
          return (
            <button
              key={template.id}
              onClick={() => handleLoadTemplate(template.id)}
              className="w-full text-left rounded-lg border border-border p-3 hover:border-primary/30 hover:bg-muted/30 transition-all group"
            >
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                  <Icon className="h-4.5 w-4.5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium">{template.name}</h4>
                    {template.id === "arlkn-example" && (
                      <Badge variant="secondary" className="text-[10px]">
                        Example
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {template.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
