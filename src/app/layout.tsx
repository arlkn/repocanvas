import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ToastProvider } from "@/components/layout/toast-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RepoCanvas - Premium GitHub README Builder",
  description:
    "Build beautiful GitHub READMEs without manually writing Markdown. Premium profile and repository branding builder for developers.",
  icons: {
    icon: [
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/icon-1024.png", sizes: "1024x1024", type: "image/png" },
    ],
    apple: [
      { url: "/icon-1024.png", sizes: "1024x1024", type: "image/png" },
    ],
  },
  openGraph: {
    title: "RepoCanvas - Premium GitHub README Builder",
    description:
      "Build beautiful GitHub READMEs without manually writing Markdown.",
    images: [
      {
        url: "/icon-1024.png",
        width: 1024,
        height: 1024,
        alt: "RepoCanvas",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RepoCanvas - Premium GitHub README Builder",
    description:
      "Build beautiful GitHub READMEs without manually writing Markdown.",
    images: ["/icon-1024.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col overflow-hidden">
        <TooltipProvider delayDuration={200}>
          {children}
        </TooltipProvider>
        <ToastProvider />
      </body>
    </html>
  );
}
