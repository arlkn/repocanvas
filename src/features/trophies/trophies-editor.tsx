"use client";

import { useReadmeStore } from "@/store/readme-store";
import type { Section, TrophiesData, TrophyTheme, Alignment } from "@/types";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TrophiesEditorProps {
  section: Section;
}

export function TrophiesEditor({ section }: TrophiesEditorProps) {
  const updateSectionData = useReadmeStore((s) => s.updateSectionData);
  const data = section.data as TrophiesData;

  const update = (updates: Partial<TrophiesData>) => {
    updateSectionData(section.id, { ...data, ...updates });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Theme</Label>
        <Select
          value={data.theme}
          onValueChange={(v) => update({ theme: v as TrophyTheme })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="radical">Radical</SelectItem>
            <SelectItem value="tokyonight">Tokyo Night</SelectItem>
            <SelectItem value="merko">Merko</SelectItem>
            <SelectItem value="gruvbox">Gruvbox</SelectItem>
            <SelectItem value="walnut">Walnut</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Alignment</Label>
        <Select
          value={data.alignment}
          onValueChange={(v) => update({ alignment: v as Alignment })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="right">Right</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="show-rank">Show Rank</Label>
        <Switch
          id="show-rank"
          checked={data.showRank}
          onCheckedChange={(checked) => update({ showRank: checked })}
        />
      </div>

      <p className="text-xs text-muted-foreground">
        Displays GitHub achievement trophies. Requires your GitHub username to be set.
      </p>
    </div>
  );
}
