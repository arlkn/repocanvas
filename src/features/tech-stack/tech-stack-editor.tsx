"use client";

import { useState } from "react";
import { useReadmeStore } from "@/store/readme-store";
import type { Section, TechStackData, TechItem, DisplayStyle } from "@/types";
import { TECHNOLOGIES } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Plus, Search } from "lucide-react";
import { TechIcon } from "@/components/ui/tech-icon";

interface TechStackEditorProps {
  section: Section;
}

export function TechStackEditor({ section }: TechStackEditorProps) {
  const updateSectionData = useReadmeStore((s) => s.updateSectionData);
  const data = section.data as TechStackData;
  const [search, setSearch] = useState("");

  const availableTechs = TECHNOLOGIES.filter(
    (t) =>
      !data.items.some((i) => i.name === t.name) &&
      t.name.toLowerCase().includes(search.toLowerCase())
  );

  const addTech = (tech: TechItem) => {
    updateSectionData(section.id, {
      ...data,
      items: [...data.items, tech],
    });
  };

  const removeTech = (name: string) => {
    updateSectionData(section.id, {
      ...data,
      items: data.items.filter((t) => t.name !== name),
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Display Style</Label>
        <Select
          value={data.displayStyle}
          onValueChange={(v) =>
            updateSectionData(section.id, {
              ...data,
              displayStyle: v as DisplayStyle,
            })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="icons">Icons</SelectItem>
            <SelectItem value="logos">Logos with names</SelectItem>
            <SelectItem value="list">List</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Selected techs */}
      {data.items.length > 0 && (
        <div className="space-y-2">
          <Label>Selected ({data.items.length})</Label>
          <div className="flex flex-wrap gap-1.5">
            {data.items.map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-1.5 rounded-md border border-border bg-muted px-2 py-1 text-xs"
              >
                <TechIcon tech={tech} size={16} />
                <span>{tech.name}</span>
                <button
                  className="ml-0.5 rounded-full p-0.5 hover:bg-destructive/20 hover:text-destructive"
                  onClick={() => removeTech(tech.name)}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search & add */}
      <div className="space-y-2">
        <Label>Add Technologies</Label>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search technologies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 pl-8 text-sm"
          />
        </div>

        <ScrollArea className="h-[200px]">
          <div className="grid grid-cols-2 gap-1">
            {availableTechs.map((tech) => (
              <button
                key={tech.name}
                className="flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs hover:bg-muted"
                onClick={() => addTech(tech)}
              >
                <TechIcon tech={tech} size={14} />
                <span className="truncate">{tech.name}</span>
                <Plus className="ml-auto h-3 w-3 shrink-0 text-muted-foreground" />
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
