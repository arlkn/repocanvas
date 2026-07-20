"use client";

import { useState } from "react";
import type { TechItem } from "@/types";

interface TechIconProps {
  tech: TechItem;
  size?: number;
}

export function TechIcon({ tech, size = 20 }: TechIconProps) {
  const [useFallback, setUseFallback] = useState(false);

  const primaryUrl = `https://cdn.simpleicons.org/${tech.icon}`;
  const fallbackUrl = `https://img.shields.io/badge/${encodeURIComponent(tech.name)}-blue?style=flat&logo=${tech.icon}&logoColor=white`;

  if (useFallback) {
    return (
      <img
        src={fallbackUrl}
        alt={tech.name}
        width={size}
        height={size}
        style={{ width: size, height: size }}
        crossOrigin="anonymous"
      />
    );
  }

  return (
    <img
      src={primaryUrl}
      alt={tech.name}
      width={size}
      height={size}
      style={{ width: size, height: size }}
      crossOrigin="anonymous"
      onError={() => setUseFallback(true)}
    />
  );
}
