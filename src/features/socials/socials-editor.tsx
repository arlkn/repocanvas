"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useReadmeStore } from "@/store/readme-store";
import { SOCIAL_PLATFORMS } from "@/lib/constants";
import type { SocialsData, Social, SocialPlatform } from "@/types";
import { Plus, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SocialsEditor() {
  const { config, activeSection, updateSection } = useReadmeStore();
  const section = config.sections.find((s) => s.id === activeSection);
  if (!section || section.type !== "socials") return null;

  const data = section.data as SocialsData;

  const addSocial = () => {
    const usedPlatforms = data.socials.map((s) => s.platform);
    const availablePlatform = (
      Object.keys(SOCIAL_PLATFORMS) as SocialPlatform[]
    ).find((p) => !usedPlatforms.includes(p));

    if (availablePlatform) {
      updateSection(section.id, {
        ...data,
        socials: [
          ...data.socials,
          { platform: availablePlatform, url: "", username: "" },
        ],
      });
    }
  };

  const updateSocial = (index: number, socialData: Partial<Social>) => {
    const newSocials = data.socials.map((s, i) =>
      i === index ? { ...s, ...socialData } : s
    );
    updateSection(section.id, { ...data, socials: newSocials });
  };

  const removeSocial = (index: number) => {
    updateSection(section.id, {
      ...data,
      socials: data.socials.filter((_, i) => i !== index),
    });
  };

  const usedPlatforms = data.socials.map((s) => s.platform);
  const availablePlatforms = (
    Object.keys(SOCIAL_PLATFORMS) as SocialPlatform[]
  ).filter((p) => !usedPlatforms.includes(p));

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {data.socials.map((social, index) => {
          const platform = SOCIAL_PLATFORMS[social.platform];
          return (
            <div
              key={index}
              className="rounded-lg border border-border p-3 space-y-2"
            >
              <div className="flex items-center justify-between">
                <Select
                  value={social.platform}
                  onValueChange={(v) =>
                    updateSocial(index, { platform: v as SocialPlatform })
                  }
                >
                  <SelectTrigger className="w-40 h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.entries(SOCIAL_PLATFORMS) as [SocialPlatform, typeof platform][]).map(
                      ([key, p]) => (
                        <SelectItem key={key} value={key}>
                          {p.name}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => removeSocial(index)}
                >
                  <Trash2 className="h-3.5 w-3.5 text-destructive" />
                </Button>
              </div>

              <Input
                value={social.username}
                onChange={(e) => updateSocial(index, { username: e.target.value })}
                placeholder={platform?.placeholder || "Username"}
                className="h-8 text-xs"
              />
              {social.platform !== "email" && (
                <Input
                  value={social.url}
                  onChange={(e) => updateSocial(index, { url: e.target.value })}
                  placeholder="Custom URL (optional)"
                  className="h-8 text-xs"
                />
              )}
            </div>
          );
        })}
      </div>

      {availablePlatforms.length > 0 && (
        <Button
          variant="outline"
          className="w-full gap-2"
          onClick={addSocial}
        >
          <Plus className="h-4 w-4" />
          Add Social Link
        </Button>
      )}
    </div>
  );
}
