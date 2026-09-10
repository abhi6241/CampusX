"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  GraduationCap,
  LogOut,
  ArrowLeft,
  Loader2,
  BookOpen,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { supabase, Database } from "@/lib/supabase";
import { ThemeToggle } from "@/components/theme-toggle";
import { ProfileCard } from "@/components/profile/profile-card";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export default function ProfilePage() {
  const { user, loading: authLoading, signOut } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle()
        .then(({ data, error }) => {
          if (error) {
            console.error("Error fetching profile:", error);
          }
          setProfile(data);
          setLoading(false);
        });
    }
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const handleProfileUpdate = (updates: Partial<Profile>) => {
    setProfile((prev) => (prev ? { ...prev, ...updates } : prev));
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user || !profile) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border bg-background">
        <div className="container-app flex h-16 items-center justify-between">
          <div className="flex items-center gap-2.5">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-base font-semibold tracking-tight">
              CampusConnect
            </span>
          </div>
          <nav className="flex items-center gap-1">
            <ThemeToggle />
            <Link
              href="/resources"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              Resources
            </Link>
            <div className="w-px h-5 bg-border mx-1" />
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1 container-app py-10 max-w-2xl">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <h1 className="text-2xl font-semibold tracking-tight mb-6">
          Your Profile
        </h1>

        <ProfileCard
          profile={profile}
          user={user}
          onProfileUpdate={handleProfileUpdate}
        />
      </main>
    </div>
  );
}
