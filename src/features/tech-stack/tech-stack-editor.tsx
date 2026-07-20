"use client";

import { useState } from "react";
import { useReadmeStore } from "@/store/readme-store";
import type { Section, TechStackData, TechItem, TechGroup, DisplayStyle, Alignment } from "@/types";
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
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { TechIcon } from "@/components/ui/tech-icon";
import {
  Plus,
  X,
  Search,
  ChevronUp,
  ChevronDown,
  Trash2,
  GripVertical,
} from "lucide-react";

interface TechStackEditorProps {
  section: Section;
}

export function TechStackEditor({ section }: TechStackEditorProps) {
  const updateSectionData = useReadmeStore((s) => s.updateSectionData);
  const data = section.data as TechStackData;
  const [search, setSearch] = useState("");
  const [activeGroupId, setActiveGroupId] = useState<string | null>(
    data.groups[0]?.id ?? null
  );
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(data.groups.map((g) => g.id))
  );

  const updateData = (updates: Partial<TechStackData>) => {
    updateSectionData(section.id, { ...data, ...updates });
  };

  const activeGroup = data.groups.find((g) => g.id === activeGroupId);

  const availableTechs = TECHNOLOGIES.filter(
    (t) =>
      !activeGroup?.items.some((i) => i.name === t.name) &&
      t.name.toLowerCase().includes(search.toLowerCase())
  );

  const addGroup = () => {
    const newGroup: TechGroup = {
      id: `g-${Date.now().toString(36)}`,
      title: "New Group",
      items: [],
    };
    updateData({ groups: [...data.groups, newGroup] });
    setActiveGroupId(newGroup.id);
    setExpandedGroups(new Set([...expandedGroups, newGroup.id]));
  };

  const removeGroup = (groupId: string) => {
    const groups = data.groups.filter((g) => g.id !== groupId);
    updateData({ groups });
    if (activeGroupId === groupId) {
      setActiveGroupId(groups[0]?.id ?? null);
    }
  };

  const updateGroupTitle = (groupId: string, title: string) => {
    updateData({
      groups: data.groups.map((g) =>
        g.id === groupId ? { ...g, title } : g
      ),
    });
  };

  const moveGroup = (groupId: string, direction: "up" | "down") => {
    const index = data.groups.findIndex((g) => g.id === groupId);
    if (index === -1) return;
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= data.groups.length) return;
    const groups = [...data.groups];
    [groups[index], groups[newIndex]] = [groups[newIndex], groups[index]];
    updateData({ groups });
  };

  const toggleGroupExpanded = (groupId: string) => {
    const next = new Set(expandedGroups);
    if (next.has(groupId)) {
      next.delete(groupId);
    } else {
      next.add(groupId);
    }
    setExpandedGroups(next);
  };

  const addTechToGroup = (groupId: string, tech: TechItem) => {
    updateData({
      groups: data.groups.map((g) =>
        g.id === groupId ? { ...g, items: [...g.items, tech] } : g
      ),
    });
  };

  const removeTechFromGroup = (groupId: string, techName: string) => {
    updateData({
      groups: data.groups.map((g) =>
        g.id === groupId
          ? { ...g, items: g.items.filter((t) => t.name !== techName) }
          : g
      ),
    });
  };

  const moveTechInGroup = (groupId: string, techName: string, direction: "up" | "down") => {
    updateData({
      groups: data.groups.map((g) => {
        if (g.id !== groupId) return g;
        const items = [...g.items];
        const index = items.findIndex((t) => t.name === techName);
        if (index === -1) return g;
        const newIndex = direction === "up" ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= items.length) return g;
        [items[index], items[newIndex]] = [items[newIndex], items[index]];
        return { ...g, items };
      }),
    });
  };

  return (
    <div className="space-y-4">
      {/* Global Settings */}
      <div className="space-y-3 rounded-lg border border-border p-3">
        <Label className="text-xs font-medium uppercase text-muted-foreground">
          Global Settings
        </Label>

        <div className="space-y-2">
          <Label className="text-xs">Display Style</Label>
          <Select
            value={data.displayStyle}
            onValueChange={(v) => updateData({ displayStyle: v as DisplayStyle })}
          >
            <SelectTrigger className="h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="icons">Icons</SelectItem>
              <SelectItem value="logos">Logos with names</SelectItem>
              <SelectItem value="list">List</SelectItem>
              <SelectItem value="grid">Grid (Excel-like)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs">Icon Size</Label>
            <span className="text-xs text-muted-foreground">{data.iconSize}px</span>
          </div>
          <Slider
            value={[data.iconSize]}
            onValueChange={([v]) => updateData({ iconSize: v })}
            min={16}
            max={64}
            step={4}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-xs" htmlFor="show-labels">Show Labels</Label>
          <Switch
            id="show-labels"
            checked={data.showLabels}
            onCheckedChange={(checked) => updateData({ showLabels: checked })}
          />
        </div>

        {data.displayStyle === "grid" && (
          <>
            <div className="space-y-2">
              <Label className="text-xs">Grid Columns</Label>
              <Select
                value={data.gridColumns.toString()}
                onValueChange={(v) => updateData({ gridColumns: parseInt(v) })}
              >
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[2, 3, 4, 5, 6].map((n) => (
                    <SelectItem key={n} value={n.toString()}>
                      {n} columns
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Cell Alignment</Label>
              <Select
                value={data.gridAlignment}
                onValueChange={(v) => updateData({ gridAlignment: v as Alignment })}
              >
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}
      </div>

      {/* Groups */}
      <div className="space-y-2">
        <Label className="text-xs font-medium uppercase text-muted-foreground">
          Groups ({data.groups.length})
        </Label>

        {data.groups.map((group, groupIndex) => {
          const isExpanded = expandedGroups.has(group.id);
          const isActive = group.id === activeGroupId;

          return (
            <div
              key={group.id}
              className={`rounded-lg border transition-colors ${
                isActive
                  ? "border-primary/50 bg-primary/5"
                  : "border-border"
              }`}
            >
              {/* Group Header */}
              <div className="flex items-center gap-2 px-3 py-2">
                <button
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => toggleGroupExpanded(group.id)}
                >
                  <GripVertical className="h-4 w-4" />
                </button>

                <button
                  className="flex-1 text-left"
                  onClick={() => {
                    setActiveGroupId(group.id);
                    if (!isExpanded) toggleGroupExpanded(group.id);
                  }}
                >
                  <Input
                    value={group.title}
                    onChange={(e) => updateGroupTitle(group.id, e.target.value)}
                    className="h-6 border-0 bg-transparent p-0 text-sm font-medium focus-visible:ring-0"
                    onClick={(e) => e.stopPropagation()}
                  />
                </button>

                <span className="text-xs text-muted-foreground">
                  {group.items.length}
                </span>

                <div className="flex items-center gap-0.5">
                  <button
                    className="rounded p-0.5 hover:bg-muted"
                    onClick={() => moveGroup(group.id, "up")}
                    disabled={groupIndex === 0}
                  >
                    <ChevronUp className="h-3 w-3" />
                  </button>
                  <button
                    className="rounded p-0.5 hover:bg-muted"
                    onClick={() => moveGroup(group.id, "down")}
                    disabled={groupIndex === data.groups.length - 1}
                  >
                    <ChevronDown className="h-3 w-3" />
                  </button>
                  <button
                    className="rounded p-0.5 hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => removeGroup(group.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {/* Group Content */}
              {isExpanded && (
                <div className="border-t border-border px-3 py-2">
                  {/* Selected techs */}
                  {group.items.length > 0 && (
                    <div className="mb-2 flex flex-wrap gap-1">
                      {group.items.map((tech, techIndex) => (
                        <div
                          key={tech.name}
                          className="flex items-center gap-1 rounded-md border border-border bg-muted px-1.5 py-0.5 text-xs"
                        >
                          <TechIcon tech={tech} size={14} />
                          <span>{tech.name}</span>
                          <button
                            className="rounded p-0.5 hover:bg-muted-foreground/20"
                            onClick={() =>
                              moveTechInGroup(group.id, tech.name, "up")
                            }
                            disabled={techIndex === 0}
                          >
                            <ChevronUp className="h-2.5 w-2.5" />
                          </button>
                          <button
                            className="rounded p-0.5 hover:bg-muted-foreground/20"
                            onClick={() =>
                              moveTechInGroup(group.id, tech.name, "down")
                            }
                            disabled={techIndex === group.items.length - 1}
                          >
                            <ChevronDown className="h-2.5 w-2.5" />
                          </button>
                          <button
                            className="rounded p-0.5 hover:bg-destructive/20 hover:text-destructive"
                            onClick={() =>
                              removeTechFromGroup(group.id, tech.name)
                            }
                          >
                            <X className="h-2.5 w-2.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Search & add */}
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Add technology..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="h-7 pl-7 text-xs"
                      onFocus={() => setActiveGroupId(group.id)}
                    />
                  </div>

                  {isActive && search && (
                    <ScrollArea className="mt-1 h-[120px]">
                      <div className="grid grid-cols-2 gap-0.5">
                        {availableTechs.map((tech) => (
                          <button
                            key={tech.name}
                            className="flex items-center gap-1.5 rounded px-1.5 py-1 text-left text-xs hover:bg-muted"
                            onClick={() => {
                              addTechToGroup(group.id, tech);
                              setSearch("");
                            }}
                          >
                            <TechIcon tech={tech} size={12} />
                            <span className="truncate">{tech.name}</span>
                            <Plus className="ml-auto h-2.5 w-2.5 shrink-0 text-muted-foreground" />
                          </button>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </div>
              )}
            </div>
          );
        })}

        <Button
          variant="outline"
          size="sm"
          className="w-full gap-2"
          onClick={addGroup}
        >
          <Plus className="h-4 w-4" />
          Add Group
        </Button>
      </div>
    </div>
  );
}
