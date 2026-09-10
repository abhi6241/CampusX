"use client";

import { FileText, Image, Download, Clock } from "lucide-react";
import { Database } from "@/lib/supabase";

type Resource = Database["public"]["Tables"]["resources"]["Row"];

const BRANCH_COLORS: Record<string, { light: string; dark: string }> = {
  CSE: { light: "bg-blue-100 text-blue-800", dark: "dark:bg-blue-900/30 dark:text-blue-300" },
  ECE: { light: "bg-green-100 text-green-800", dark: "dark:bg-green-900/30 dark:text-green-300" },
  EEE: { light: "bg-amber-100 text-amber-800", dark: "dark:bg-amber-900/30 dark:text-amber-300" },
  MECH: { light: "bg-purple-100 text-purple-800", dark: "dark:bg-purple-900/30 dark:text-purple-300" },
  CIVIL: { light: "bg-rose-100 text-rose-800", dark: "dark:bg-rose-900/30 dark:text-rose-300" },
  IT: { light: "bg-cyan-100 text-cyan-800", dark: "dark:bg-cyan-900/30 dark:text-cyan-300" },
  "CSE-AI": { light: "bg-violet-100 text-violet-800", dark: "dark:bg-violet-900/30 dark:text-violet-300" },
  "CSE-DS": { light: "bg-teal-100 text-teal-800", dark: "dark:bg-teal-900/30 dark:text-teal-300" },
};

const DEFAULT_COLORS = { light: "bg-secondary text-muted-foreground", dark: "" };

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

interface ResourceCardProps {
  resource: Resource;
  uploaderName: string;
}

export function ResourceCard({ resource, uploaderName }: ResourceCardProps) {
  const isPdf = resource.file_type === "application/pdf";
  const colors = BRANCH_COLORS[resource.branch] || DEFAULT_COLORS;

  return (
    <div className="rounded-xl border border-border bg-card p-5 hover:shadow-sm transition-shadow">
      <div className="flex items-start gap-3 mb-3">
        <div className={`shrink-0 rounded-lg p-2 ${isPdf ? "bg-red-100 dark:bg-red-900/30" : "bg-blue-100 dark:bg-blue-900/30"}`}>
          {isPdf ? (
            <FileText className="h-5 w-5 text-red-600 dark:text-red-400" />
          ) : (
            <Image className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold tracking-tight mb-1 line-clamp-2">
            {resource.title}
          </h3>
          <p className="text-xs text-muted-foreground">{resource.subject}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${colors.light} ${colors.dark}`}>
          {resource.branch}
        </span>
        <span className="inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
          {resource.semester_year}
        </span>
        <span className="inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
          {resource.resource_type === "note" ? "Note" : "PYP"}
        </span>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>{uploaderName} &middot; {timeAgo(resource.created_at)}</span>
        </div>
        <a
          href={resource.file_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/90 transition-colors"
        >
          <Download className="h-3 w-3" />
          Download
        </a>
      </div>
    </div>
  );
}
