"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useReadmeStore } from "@/store/readme-store";
import type { ProjectsData, Project, ProjectStatus } from "@/types";
import { generateId, cn } from "@/lib/utils";
import { Plus, Trash2, ExternalLink, GripVertical } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function ProjectCard({
  project,
  onUpdate,
  onRemove,
}: {
  project: Project;
  onUpdate: (data: Project) => void;
  onRemove: () => void;
}) {
  const [newTech, setNewTech] = React.useState("");

  const addTech = () => {
    if (newTech.trim() && !project.technologies.includes(newTech.trim())) {
      onUpdate({ ...project, technologies: [...project.technologies, newTech.trim()] });
      setNewTech("");
    }
  };

  return (
    <div className="rounded-lg border border-border p-3 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">{project.name || "New Project"}</h4>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onRemove}>
          <Trash2 className="h-3.5 w-3.5 text-destructive" />
        </Button>
      </div>

      <div className="space-y-2">
        <Input
          value={project.name}
          onChange={(e) => onUpdate({ ...project, name: e.target.value })}
          placeholder="Project name"
          className="h-8 text-xs"
        />
        <Textarea
          value={project.description}
          onChange={(e) => onUpdate({ ...project, description: e.target.value })}
          placeholder="Project description"
          className="h-16 text-xs"
        />
        <Input
          value={project.image}
          onChange={(e) => onUpdate({ ...project, image: e.target.value })}
          placeholder="Image URL (optional)"
          className="h-8 text-xs"
        />
        <div className="grid grid-cols-2 gap-2">
          <Input
            value={project.githubLink}
            onChange={(e) => onUpdate({ ...project, githubLink: e.target.value })}
            placeholder="GitHub URL"
            className="h-8 text-xs"
          />
          <Input
            value={project.website}
            onChange={(e) => onUpdate({ ...project, website: e.target.value })}
            placeholder="Website URL"
            className="h-8 text-xs"
          />
        </div>
        <Select
          value={project.status}
          onValueChange={(v) => onUpdate({ ...project, status: v as ProjectStatus })}
        >
          <SelectTrigger className="h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-xs">Technologies</Label>
        <div className="flex flex-wrap gap-1">
          {project.technologies.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="text-[10px] gap-1 pr-1 cursor-pointer"
              onClick={() =>
                onUpdate({
                  ...project,
                  technologies: project.technologies.filter((t) => t !== tech),
                })
              }
            >
              {tech}
              <span className="text-muted-foreground">×</span>
            </Badge>
          ))}
        </div>
        <div className="flex gap-1">
          <Input
            value={newTech}
            onChange={(e) => setNewTech(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTech();
              }
            }}
            placeholder="Add technology"
            className="h-8 text-xs"
          />
          <Button variant="outline" size="sm" className="h-8 px-2" onClick={addTech}>
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ProjectsEditor() {
  const { config, activeSection, updateSection } = useReadmeStore();
  const section = config.sections.find((s) => s.id === activeSection);
  if (!section || section.type !== "projects") return null;

  const data = section.data as ProjectsData;

  const addProject = () => {
    const newProject: Project = {
      id: generateId(),
      name: "",
      description: "",
      image: "",
      githubLink: "",
      website: "",
      technologies: [],
      status: "active",
    };
    updateSection(section.id, {
      ...data,
      projects: [...data.projects, newProject],
    });
  };

  const updateProject = (id: string, projectData: Project) => {
    updateSection(section.id, {
      ...data,
      projects: data.projects.map((p) => (p.id === id ? projectData : p)),
    });
  };

  const removeProject = (id: string) => {
    updateSection(section.id, {
      ...data,
      projects: data.projects.filter((p) => p.id !== id),
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Layout</Label>
        <div className="flex gap-1">
          {(["grid", "list"] as const).map((layout) => (
            <button
              key={layout}
              onClick={() => updateSection(section.id, { ...data, layout })}
              className={cn(
                "px-3 py-1 rounded-md text-xs font-medium transition-all",
                data.layout === layout
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {layout.charAt(0).toUpperCase() + layout.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {data.projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onUpdate={(p) => updateProject(project.id, p)}
            onRemove={() => removeProject(project.id)}
          />
        ))}
      </div>

      <Button variant="outline" className="w-full gap-2" onClick={addProject}>
        <Plus className="h-4 w-4" />
        Add Project
      </Button>
    </div>
  );
}
