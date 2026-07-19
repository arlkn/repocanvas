"use client";

import React from "react";
import {
  User,
  Heart,
  Code,
  FolderOpen,
  BarChart3,
  Share2,
  FileText,
  GripVertical,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useReadmeStore } from "@/store/readme-store";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Section } from "@/types";

const SECTION_ICONS: Record<Section["type"], React.ElementType> = {
  header: User,
  "about-me": Heart,
  "tech-stack": Code,
  projects: FolderOpen,
  "github-widgets": BarChart3,
  socials: Share2,
  custom: FileText,
};

interface SortableItemProps {
  section: Section;
  isActive: boolean;
  onSelect: (id: string) => void;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

function SortableItem({
  section,
  isActive,
  onSelect,
  onToggle,
  onRemove,
}: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
    opacity: isDragging ? 0.8 : undefined,
  };

  const Icon = SECTION_ICONS[section.type] || FileText;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-all duration-150 group cursor-pointer",
        isActive
          ? "bg-primary/10 text-primary border border-primary/20"
          : "hover:bg-muted/50 text-muted-foreground hover:text-foreground border border-transparent",
        isDragging && "shadow-lg ring-2 ring-primary/20"
      )}
      onClick={() => onSelect(section.id)}
    >
      <button
        className="cursor-grab active:cursor-grabbing touch-none p-0.5 opacity-0 group-hover:opacity-50 hover:!opacity-100 transition-opacity"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-3.5 w-3.5" />
      </button>

      <Icon className="h-4 w-4 shrink-0" />

      <span className="flex-1 truncate font-medium">{section.title}</span>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggle(section.id);
              }}
              className="p-1 rounded-md hover:bg-muted/80 transition-colors"
            >
              {section.enabled ? (
                <Eye className="h-3.5 w-3.5 text-muted-foreground" />
              ) : (
                <EyeOff className="h-3.5 w-3.5 text-destructive" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent>{section.enabled ? "Disable section" : "Enable section"}</TooltipContent>
        </Tooltip>

        {section.type !== "header" && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(section.id);
                }}
                className="p-1 rounded-md hover:bg-destructive/10 transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
              </button>
            </TooltipTrigger>
            <TooltipContent>Remove section</TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  );
}

export function SortableSectionList() {
  const {
    config,
    activeSection,
    setActiveSection,
    toggleSection,
    removeSection,
    reorderSections,
  } = useReadmeStore();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = config.sections.findIndex((s) => s.id === active.id);
    const newIndex = config.sections.findIndex((s) => s.id === over.id);
    reorderSections(oldIndex, newIndex);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={config.sections.map((s) => s.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-1">
          {config.sections.map((section) => (
            <SortableItem
              key={section.id}
              section={section}
              isActive={activeSection === section.id}
              onSelect={setActiveSection}
              onToggle={toggleSection}
              onRemove={removeSection}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
