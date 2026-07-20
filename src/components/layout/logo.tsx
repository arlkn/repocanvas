"use client";

import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
} as const;

export function Logo({ className, size = "md" }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 font-bold tracking-tight transition-opacity hover:opacity-80",
        sizeClasses[size],
        className
      )}
    >
      <SpectrumPrism className={cn(size === "sm" ? "h-5 w-5" : size === "lg" ? "h-8 w-8" : "h-6 w-6")} />
      <span className="bg-gradient-to-r from-primary via-accent to-spectrum-violet bg-clip-text text-transparent">
        {APP_NAME}
      </span>
    </Link>
  );
}

interface SpectrumPrismProps {
  className?: string;
}

function SpectrumPrism({ className }: SpectrumPrismProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Prism / W shape with spectrum rays */}
      <path
        d="M4 6L12 26L16 16L20 26L28 6"
        stroke="url(#spectrum-gradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <defs>
        <linearGradient id="spectrum-gradient" x1="4" y1="6" x2="28" y2="26" gradientUnits="userSpaceOnUse">
          <stop stopColor="hsl(var(--spectrum-indigo))" />
          <stop offset="0.5" stopColor="hsl(var(--spectrum-cyan))" />
          <stop offset="1" stopColor="hsl(var(--spectrum-violet))" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export { SpectrumPrism };
