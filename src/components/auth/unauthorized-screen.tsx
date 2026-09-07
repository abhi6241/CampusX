"use client";

import Link from "next/link";
import { GraduationCap, ShieldX, ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function UnauthorizedScreen() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border bg-background">
        <div className="container-app flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-base font-semibold tracking-tight">
              CampusConnect
            </span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-sm text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-6">
            <ShieldX className="h-8 w-8 text-destructive" />
          </div>

          <h1 className="text-2xl font-semibold tracking-tight mb-2">
            Access restricted
          </h1>

          <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
            CampusConnect is exclusively available to Vasavi College of
            Engineering students. Please use your official college email address
            ending in <span className="font-medium text-foreground">@vce.ac.in</span> to
            sign in or create an account.
          </p>

          <div className="rounded-xl border border-border bg-card p-4 mb-8">
            <p className="text-xs text-muted-foreground mb-2">
              Valid email format:
            </p>
            <code className="text-sm font-mono text-foreground">
              1602-XX-XXX-XXX@vce.ac.in
            </code>
          </div>

          <a
            href="/login"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to sign in
          </a>
        </div>
      </main>
    </div>
  );
}
