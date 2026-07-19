"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useReadmeStore } from "@/store/readme-store";
import type { GitHubWidgetsData } from "@/types";
import { BarChart3, Flame, Activity, Languages, Trophy } from "lucide-react";

const WIDGET_OPTIONS = [
  { key: "stats" as const, label: "GitHub Stats", description: "Show your GitHub statistics", icon: BarChart3 },
  { key: "streak" as const, label: "Streak Stats", description: "Show your commit streak", icon: Flame },
  { key: "activityGraph" as const, label: "Activity Graph", description: "Show your contribution graph", icon: Activity },
  { key: "topLanguages" as const, label: "Top Languages", description: "Show your most used languages", icon: Languages },
  { key: "trophies" as const, label: "Trophies", description: "Show GitHub achievements", icon: Trophy },
];

export function GitHubWidgetsEditor() {
  const { config, activeSection, updateSection } = useReadmeStore();
  const section = config.sections.find((s) => s.id === activeSection);
  if (!section || section.type !== "github-widgets") return null;

  const data = section.data as GitHubWidgetsData;

  const toggleWidget = (key: keyof GitHubWidgetsData) => {
    if (typeof data[key] === "boolean") {
      updateSection(section.id, { ...data, [key]: !data[key] });
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="gh-username">GitHub Username</Label>
        <Input
          id="gh-username"
          value={data.username}
          onChange={(e) => updateSection(section.id, { ...data, username: e.target.value })}
          placeholder="Your GitHub username"
        />
      </div>

      <div className="space-y-3">
        <Label>Widgets</Label>
        {WIDGET_OPTIONS.map(({ key, label, description, icon: Icon }) => (
          <div
            key={key}
            className="flex items-center justify-between rounded-lg border border-border p-3"
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs text-muted-foreground">{description}</p>
              </div>
            </div>
            <Switch
              checked={!!data[key]}
              onCheckedChange={() => toggleWidget(key)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
