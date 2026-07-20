"use client";

import React from "react";
import { SKILL_ICONS_BASE } from "@/lib/constants";

interface TechIconProps {
  name: string;
  icon: string;
  className?: string;
}

export function TechIcon({ name, icon, className = "w-5 h-5" }: TechIconProps) {
  const [error, setError] = React.useState(false);

  if (error) {
    return (
      <div
        className={`${className} rounded bg-muted flex items-center justify-center shrink-0 text-[10px] font-bold text-muted-foreground`}
      >
        {name.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <img
      src={`${SKILL_ICONS_BASE}${icon}`}
      alt={name}
      className={`${className} shrink-0`}
      onError={() => setError(true)}
    />
  );
}
