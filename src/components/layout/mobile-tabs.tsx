"use client";

import React from "react";
import {
  PenLine,
  Eye,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useReadmeStore } from "@/store/readme-store";

export function MobileTabs() {
  const { viewMode, setViewMode } = useReadmeStore();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-card border-t border-border flex items-center justify-center gap-2 px-4 z-40">
      <Button
        variant={viewMode === "editor" ? "default" : "ghost"}
        size="sm"
        className="flex-1 gap-2"
        onClick={() => setViewMode("editor")}
      >
        <PenLine className="h-4 w-4" />
        Editor
      </Button>
      <Button
        variant={viewMode === "split" ? "default" : "ghost"}
        size="sm"
        className="flex-1 gap-2"
        onClick={() => setViewMode("split")}
      >
        <Menu className="h-4 w-4" />
        Split
      </Button>
      <Button
        variant={viewMode === "preview" ? "default" : "ghost"}
        size="sm"
        className="flex-1 gap-2"
        onClick={() => setViewMode("preview")}
      >
        <Eye className="h-4 w-4" />
        Preview
      </Button>
    </div>
  );
}
