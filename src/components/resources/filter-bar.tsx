"use client";

import { Search } from "lucide-react";

const BRANCHES = [
  "All",
  "CSE",
  "ECE",
  "EEE",
  "MECH",
  "CIVIL",
  "IT",
  "CSE-AI",
  "CSE-DS",
];

const SEMESTERS = [
  "All",
  "Sem 1",
  "Sem 2",
  "Sem 3",
  "Sem 4",
  "Sem 5",
  "Sem 6",
  "Sem 7",
  "Sem 8",
];

interface FilterBarProps {
  branch: string;
  semester: string;
  query: string;
  onBranchChange: (value: string) => void;
  onSemesterChange: (value: string) => void;
  onQueryChange: (value: string) => void;
}

export function FilterBar({
  branch,
  semester,
  query,
  onBranchChange,
  onSemesterChange,
  onQueryChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <select
        value={branch}
        onChange={(e) => onBranchChange(e.target.value)}
        className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-shadow"
      >
        {BRANCHES.map((b) => (
          <option key={b} value={b}>
            {b === "All" ? "All Branches" : b}
          </option>
        ))}
      </select>

      <select
        value={semester}
        onChange={(e) => onSemesterChange(e.target.value)}
        className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-shadow"
      >
        {SEMESTERS.map((s) => (
          <option key={s} value={s}>
            {s === "All" ? "All Semesters" : s}
          </option>
        ))}
      </select>

      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search by subject..."
          className="w-full rounded-lg border border-border bg-background pl-9 pr-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-shadow"
        />
      </div>
    </div>
  );
}
