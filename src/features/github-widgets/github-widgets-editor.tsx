"use client";

import { useReadmeStore } from "@/store/readme-store";
import type { Section, GitHubWidgetsData, GitHubWidgetTheme } from "@/types";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GitHubWidgetsEditorProps {
  section: Section;
}

export function GitHubWidgetsEditor({ section }: GitHubWidgetsEditorProps) {
  const updateSectionData = useReadmeStore((s) => s.updateSectionData);
  const data = section.data as GitHubWidgetsData;

  const update = (updates: Partial<GitHubWidgetsData>) => {
    updateSectionData(section.id, { ...data, ...updates });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Theme</Label>
        <Select
          value={data.theme}
          onValueChange={(v) => update({ theme: v as GitHubWidgetTheme })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="transparent">Transparent</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="flat">Flat</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="stats">GitHub Stats</Label>
          <Switch
            id="stats"
            checked={data.stats}
            onCheckedChange={(checked) => update({ stats: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="streak">Streak Stats</Label>
          <Switch
            id="streak"
            checked={data.streak}
            onCheckedChange={(checked) => update({ streak: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="languages">Top Languages</Label>
          <Switch
            id="languages"
            checked={data.languages}
            onCheckedChange={(checked) => update({ languages: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="activity">Activity Graph</Label>
          <Switch
            id="activity"
            checked={data.activity}
            onCheckedChange={(checked) => update({ activity: checked })}
          />
        </div>
      </div>
    </div>
  );
}
