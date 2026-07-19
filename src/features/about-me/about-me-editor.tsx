"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useReadmeStore } from "@/store/readme-store";
import type { AboutMeData } from "@/types";

export function AboutMeEditor() {
  const { config, activeSection, updateSection } = useReadmeStore();
  const section = config.sections.find((s) => s.id === activeSection);
  if (!section || section.type !== "about-me") return null;

  const data = section.data as AboutMeData;

  const update = (field: keyof AboutMeData, value: string) => {
    updateSection(section.id, { ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="biography">Biography</Label>
        <Textarea
          id="biography"
          value={data.biography}
          onChange={(e) => update("biography", e.target.value)}
          placeholder="Tell us about yourself..."
          className="h-24"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="currentWork">Current Work</Label>
        <Input
          id="currentWork"
          value={data.currentWork}
          onChange={(e) => update("currentWork", e.target.value)}
          placeholder="What are you working on?"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="learning">Learning</Label>
        <Input
          id="learning"
          value={data.learning}
          onChange={(e) => update("learning", e.target.value)}
          placeholder="What are you currently learning?"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="funFact">Fun Fact</Label>
        <Input
          id="funFact"
          value={data.funFact}
          onChange={(e) => update("funFact", e.target.value)}
          placeholder="Something interesting about yourself"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact">Contact</Label>
        <Input
          id="contact"
          value={data.contact}
          onChange={(e) => update("contact", e.target.value)}
          placeholder="How can people reach you?"
        />
      </div>
    </div>
  );
}
