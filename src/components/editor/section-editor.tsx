"use client";

import { useReadmeStore } from "@/store/readme-store";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HeroEditor } from "@/features/hero/hero-editor";
import { AboutEditor } from "@/features/about/about-editor";
import { TechStackEditor } from "@/features/tech-stack/tech-stack-editor";
import { FeaturesEditor } from "@/features/features/features-editor";
import { GitHubWidgetsEditor } from "@/features/github-widgets/github-widgets-editor";
import { SocialEditor } from "@/features/social/social-editor";
import { LicenseEditor } from "@/features/license/license-editor";

export function SectionEditor() {
  const { config, selectedSectionId } = useReadmeStore();
  const section = config.sections.find((s) => s.id === selectedSectionId);

  if (!section) return null;

  return (
    <ScrollArea className="flex-1">
      <div className="p-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">{section.title}</h2>
          <p className="text-sm text-muted-foreground">
            Edit this section&apos;s content below.
          </p>
        </div>

        {section.type === "hero" && <HeroEditor section={section} />}
        {section.type === "about" && <AboutEditor section={section} />}
        {section.type === "tech-stack" && <TechStackEditor section={section} />}
        {section.type === "features" && <FeaturesEditor section={section} />}
        {section.type === "github-widgets" && (
          <GitHubWidgetsEditor section={section} />
        )}
        {section.type === "social" && <SocialEditor section={section} />}
        {section.type === "license" && <LicenseEditor section={section} />}
      </div>
    </ScrollArea>
  );
}
