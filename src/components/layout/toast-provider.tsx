"use client";

import React from "react";
import { Toaster } from "sonner";

export function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: "hsl(var(--popover))",
          color: "hsl(var(--popover-foreground))",
          border: "1px solid hsl(var(--border))",
          borderRadius: "0.75rem",
          fontSize: "0.875rem",
        },
      }}
      richColors
      closeButton
    />
  );
}
