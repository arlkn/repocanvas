"use client";

import React from "react";
import { SKILL_ICONS_BASE } from "@/lib/constants";

const SHIELDSIO_COLORS: Record<string, { color: string; logo: string }> = {
  c: { color: "A8B9CC", logo: "c" },
  cplusplus: { color: "00599C", logo: "cplusplus" },
  csharp: { color: "239120", logo: "csharp" },
  css3: { color: "1572B6", logo: "css3" },
  html5: { color: "E34F26", logo: "html5" },
  nodedotjs: { color: "339933", logo: "nodedotjs" },
  javascript: { color: "F7DF1E", logo: "javascript" },
  typescript: { color: "3178C6", logo: "typescript" },
  react: { color: "61DAFB", logo: "react" },
  nextjs: { color: "000000", logo: "nextdotjs" },
  vuejs: { color: "4FC08D", logo: "vuedotjs" },
  angular: { color: "DD0031", logo: "angular" },
  svelte: { color: "FF3E00", logo: "svelte" },
  astro: { color: "FF5D01", logo: "astro" },
  tailwindcss: { color: "06B6D4", logo: "tailwindcss" },
  sass: { color: "CC6699", logo: "sass" },
  flutter: { color: "02569B", logo: "flutter" },
  python: { color: "3776AB", logo: "python" },
  java: { color: "ED8B00", logo: "openjdk" },
  go: { color: "00ADD8", logo: "go" },
  rust: { color: "000000", logo: "rust" },
  swift: { color: "FA7343", logo: "swift" },
  kotlin: { color: "7F52FF", logo: "kotlin" },
  dart: { color: "0175C2", logo: "dart" },
  ruby: { color: "CC342D", logo: "ruby" },
  php: { color: "777BB4", logo: "php" },
  scala: { color: "DC322F", logo: "scala" },
  elixir: { color: "4B275F", logo: "elixir" },
  haskell: { color: "5D4F85", logo: "haskell" },
  lua: { color: "000080", logo: "lua" },
  r: { color: "276DC3", logo: "r" },
  matlab: { color: "FF6C3A", logo: "matlab" },
  bash: { color: "4EAA25", logo: "gnubash" },
  powershell: { color: "5391FE", logo: "powershell" },
  mysql: { color: "4479A1", logo: "mysql" },
  express: { color: "000000", logo: "express" },
  nestjs: { color: "E0234E", logo: "nestjs" },
  django: { color: "092E20", logo: "django" },
  flask: { color: "000000", logo: "flask" },
  fastapi: { color: "009688", logo: "fastapi" },
  springboot: { color: "6DB33F", logo: "springboot" },
  laravel: { color: "FF2D20", logo: "laravel" },
  rubyonrails: { color: "CC0000", logo: "rubyonrails" },
  dotnet: { color: "512BD4", logo: "dotnet" },
  graphql: { color: "E10098", logo: "graphql" },
  firebase: { color: "FFCA28", logo: "firebase" },
  postgresql: { color: "4169E1", logo: "postgresql" },
  mongodb: { color: "47A248", logo: "mongodb" },
  redis: { color: "DC382D", logo: "redis" },
  sqlite: { color: "003B57", logo: "sqlite" },
  supabase: { color: "3FCF8E", logo: "supabase" },
  prisma: { color: "2D3748", logo: "prisma" },
  docker: { color: "2496ED", logo: "docker" },
  kubernetes: { color: "326CE5", logo: "kubernetes" },
  amazonwebservices: { color: "232F3E", logo: "amazonwebservices" },
  googlecloud: { color: "4285F4", logo: "googlecloud" },
  azure: { color: "0089D6", logo: "microsoftazure" },
  cloudflare: { color: "F38020", logo: "cloudflare" },
  vercel: { color: "000000", logo: "vercel" },
  netlify: { color: "00C7B7", logo: "netlify" },
  heroku: { color: "430098", logo: "heroku" },
  digitalocean: { color: "0080FF", logo: "digitalocean" },
  git: { color: "F05032", logo: "git" },
  github: { color: "181717", logo: "github" },
  gitlab: { color: "FC6D26", logo: "gitlab" },
  visualstudiocode: { color: "007ACC", logo: "visualstudiocode" },
  neovim: { color: "57A143", logo: "neovim" },
  zed: { color: "000000", logo: "zed" },
  vim: { color: "019833", logo: "vim" },
  intellij: { color: "000000", logo: "intellijidea" },
  postman: { color: "FF6C37", logo: "postman" },
  figma: { color: "F24E1E", logo: "figma" },
  canva: { color: "00C4CC", logo: "canva" },
  gimp: { color: "585239", logo: "gimp" },
  notion: { color: "000000", logo: "notion" },
  jira: { color: "0052CC", logo: "jira" },
};

interface TechIconProps {
  name: string;
  icon: string;
  className?: string;
}

export function TechIcon({ name, icon, className = "w-5 h-5" }: TechIconProps) {
  const [useFallback, setUseFallback] = React.useState(false);

  if (useFallback) {
    const fb = SHIELDSIO_COLORS[icon];
    const url = fb
      ? `https://img.shields.io/badge/${encodeURIComponent(name)}-${fb.color}?style=flat&logo=${fb.logo}&logoColor=white`
      : `${SKILL_ICONS_BASE}${icon}`;
    return <img src={url} alt={name} className={`${className} shrink-0`} />;
  }

  return (
    <img
      src={`${SKILL_ICONS_BASE}${icon}`}
      alt={name}
      className={`${className} shrink-0`}
      crossOrigin="anonymous"
      onError={() => setUseFallback(true)}
    />
  );
}
