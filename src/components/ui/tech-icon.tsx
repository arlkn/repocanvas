"use client";

import React from "react";
import { SKILL_ICONS_BASE } from "@/lib/constants";

interface TechIconProps {
  name: string;
  icon: string;
  className?: string;
}

export function TechIcon({ name, icon, className = "w-5 h-5" }: TechIconProps) {
  return (
    <img
      src={`${SKILL_ICONS_BASE}${icon}`}
      alt={name}
      className={`${className} shrink-0`}
    />
  );
}
