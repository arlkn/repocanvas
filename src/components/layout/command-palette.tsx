"use client";

import React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "cmdk";
import {
  Moon,
  Sun,
  Monitor,
  Copy,
  Download,
  Undo2,
  Redo2,
  Plus,
  Sparkles,
  BarChart,
  Upload,
  FileJson,
  User,
  Heart,
  Code,
  FolderOpen,
  BarChart3,
  Share2,
  FileText,
  RotateCcw,
} from "lucide-react";
import { useReadmeStore } from "@/store/readme-store";
import { useTheme } from "@/hooks/use-theme";
import { generateMarkdown } from "@/lib/markdown-engine";
import { copyToClipboard, downloadFile } from "@/lib/utils";
import { toast } from "sonner";
import { TEMPLATES } from "@/lib/constants";
import type { SectionType } from "@/types";

const SECTION_ICONS: Record<SectionType, React.ElementType> = {
  header: User,
  "about-me": Heart,
  "tech-stack": Code,
  projects: FolderOpen,
  "github-widgets": BarChart3,
  socials: Share2,
  custom: FileText,
};

export function CommandPalette() {
  const {
    commandPaletteOpen,
    setCommandPaletteOpen,
    config,
    undo,
    redo,
    addSection,
    loadTemplate,
    resetConfig,
    importConfig,
  } = useReadmeStore();

  const { setTheme } = useTheme();

  const handleCopyMarkdown = async () => {
    const markdown = generateMarkdown(config);
    await copyToClipboard(markdown);
    toast.success("Markdown copied to clipboard!");
    setCommandPaletteOpen(false);
  };

  const handleDownload = () => {
    const markdown = generateMarkdown(config);
    downloadFile(markdown, "README.md");
    toast.success("README.md downloaded!");
    setCommandPaletteOpen(false);
  };

  const handleImportJson = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const parsed = JSON.parse(ev.target?.result as string);
          if (parsed.sections) {
            importConfig(parsed);
            toast.success("Configuration imported!");
          }
        } catch {
          toast.error("Invalid JSON file");
        }
      };
      reader.readAsText(file);
    };
    input.click();
    setCommandPaletteOpen(false);
  };

  const addableSections: { type: SectionType; label: string }[] = [
    { type: "about-me", label: "About Me" },
    { type: "tech-stack", label: "Tech Stack" },
    { type: "projects", label: "Projects" },
    { type: "github-widgets", label: "GitHub Widgets" },
    { type: "socials", label: "Socials" },
    { type: "custom", label: "Custom Section" },
  ];

  return (
    <CommandDialog open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Actions">
          <CommandItem
            onSelect={() => {
              handleCopyMarkdown();
            }}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy Markdown
          </CommandItem>
          <CommandItem
            onSelect={() => {
              handleDownload();
              setCommandPaletteOpen(false);
            }}
          >
            <Download className="mr-2 h-4 w-4" />
            Download README.md
          </CommandItem>
          <CommandItem
            onSelect={() => {
              handleImportJson();
            }}
          >
            <Upload className="mr-2 h-4 w-4" />
            Import Configuration
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Edit">
          <CommandItem
            onSelect={() => {
              undo();
              setCommandPaletteOpen(false);
            }}
          >
            <Undo2 className="mr-2 h-4 w-4" />
            Undo
          </CommandItem>
          <CommandItem
            onSelect={() => {
              redo();
              setCommandPaletteOpen(false);
            }}
          >
            <Redo2 className="mr-2 h-4 w-4" />
            Redo
          </CommandItem>
          <CommandItem
            onSelect={() => {
              resetConfig();
              setCommandPaletteOpen(false);
              toast.success("Reset to default");
            }}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset to Default
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Add Section">
          {addableSections.map(({ type, label }) => {
            const Icon = SECTION_ICONS[type];
            return (
              <CommandItem
                key={type}
                onSelect={() => {
                  addSection(type);
                  setCommandPaletteOpen(false);
                  toast.success(`Added ${label} section`);
                }}
              >
                <Icon className="mr-2 h-4 w-4" />
                Add {label}
              </CommandItem>
            );
          })}
        </CommandGroup>

        <CommandGroup heading="Templates">
          {TEMPLATES.map((template) => (
            <CommandItem
              key={template.id}
              onSelect={() => {
                loadTemplate(template.config);
                setCommandPaletteOpen(false);
                toast.success(`Loaded "${template.name}" template`);
              }}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Load {template.name}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Theme">
          <CommandItem
            onSelect={() => {
              setTheme("light");
              setCommandPaletteOpen(false);
            }}
          >
            <Sun className="mr-2 h-4 w-4" />
            Light Mode
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setTheme("dark");
              setCommandPaletteOpen(false);
            }}
          >
            <Moon className="mr-2 h-4 w-4" />
            Dark Mode
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setTheme("system");
              setCommandPaletteOpen(false);
            }}
          >
            <Monitor className="mr-2 h-4 w-4" />
            System Theme
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
