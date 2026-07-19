"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useReadmeStore } from "@/store/readme-store";
import type { HeaderData } from "@/types";
import { cn } from "@/lib/utils";

export function HeaderEditor() {
  const { config, activeSection, updateSection } = useReadmeStore();
  const section = config.sections.find((s) => s.id === activeSection);
  if (!section || section.type !== "header") return null;

  const data = section.data as HeaderData;

  const update = (field: keyof HeaderData, value: HeaderData[keyof HeaderData]) => {
    updateSection(section.id, { ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={data.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="Your name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Title / Role</Label>
        <Input
          id="title"
          value={data.title}
          onChange={(e) => update("title", e.target.value)}
          placeholder="e.g. Full Stack Developer"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio / Tagline</Label>
        <Textarea
          id="bio"
          value={data.bio}
          onChange={(e) => update("bio", e.target.value)}
          placeholder="A short description about yourself"
          className="h-20"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="avatar">Avatar URL</Label>
        <Input
          id="avatar"
          value={data.avatar}
          onChange={(e) => update("avatar", e.target.value)}
          placeholder="https://example.com/avatar.png"
        />
        {data.avatar && (
          <div className="flex justify-center mt-2">
            <img
              src={data.avatar}
              alt="Avatar preview"
              className="w-20 h-20 rounded-full object-cover border-2 border-border"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="banner">Banner URL</Label>
        <Input
          id="banner"
          value={data.banner}
          onChange={(e) => update("banner", e.target.value)}
          placeholder="https://example.com/banner.png"
        />
        {data.banner && (
          <div className="mt-2 rounded-lg overflow-hidden border border-border">
            <img
              src={data.banner}
              alt="Banner preview"
              className="w-full h-24 object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Typing Animation</Label>
          <p className="text-xs text-muted-foreground">Show animated typing text</p>
        </div>
        <Switch
          checked={data.typingAnimation}
          onCheckedChange={(checked) => update("typingAnimation", checked)}
        />
      </div>

      <div className="space-y-2">
        <Label>Alignment</Label>
        <div className="grid grid-cols-3 gap-2">
          {(["left", "center", "right"] as const).map((align) => (
            <button
              key={align}
              onClick={() => update("alignment", align)}
              className={cn(
                "px-3 py-2 rounded-lg text-xs font-medium border transition-all",
                data.alignment === align
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border hover:border-primary/50 text-muted-foreground"
              )}
            >
              {align.charAt(0).toUpperCase() + align.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
