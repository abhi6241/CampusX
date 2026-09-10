"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  GraduationCap,
  LogOut,
  Calendar,
  Users,
  BookOpen,
  Loader2,
  User,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { supabase, Database } from "@/lib/supabase";
import { createLogger } from "@/lib/logger";
import { ThemeToggle } from "@/components/theme-toggle";
import { OnboardingModal } from "@/components/onboarding/onboarding-modal";

const log = createLogger("Dashboard");

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export default function DashboardPage() {
  const { user, loading: authLoading, signOut } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      log.info("User not authenticated, redirecting to login");
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      log.info("Fetching profile", { userId: user.id });
      supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle()
        .then(({ data, error }) => {
          if (error) {
            log.error("Failed to fetch profile", error, { userId: user.id });
          } else if (!data) {
            log.info("No profile found, showing onboarding", { userId: user.id });
            setNeedsOnboarding(true);
          } else {
            setProfile(data);
            const needsOnboard = !data.first_name && !data.last_name;
            if (needsOnboard) {
              log.info("Profile incomplete, showing onboarding", { userId: user.id });
            }
            setNeedsOnboarding(needsOnboard);
          }
          setLoading(false);
        });
    }
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) return null;

  if (needsOnboarding) {
    return (
      <OnboardingModal
        userId={user.id}
        email={user.email!}
        onComplete={() => {
          setNeedsOnboarding(false);
          supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .maybeSingle()
            .then(({ data, error }) => {
              if (error) {
                log.error("Failed to re-fetch profile after onboarding", error, { userId: user.id });
              }
              if (data) setProfile(data);
            });
        }}
      />
    );
  }

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
            <Link
              href="/profile"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
            >
              <User className="h-4 w-4" />
              Profile
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

      <main className="flex-1 container-app py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight mb-1">
            Welcome, {profile?.first_name || user.email?.split("@")[0]}
          </h1>
          <p className="text-sm text-muted-foreground">
            {profile?.branch} &middot; Batch of {profile?.year} &middot;{" "}
            {profile?.roll_number}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-10">
          <div className="rounded-xl border border-border bg-card p-6">
            <Calendar className="h-5 w-5 text-primary mb-3" />
            <h3 className="text-sm font-semibold mb-1">Schedule</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              View your class schedule, exams, and upcoming events.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <Users className="h-5 w-5 text-primary mb-3" />
            <h3 className="text-sm font-semibold mb-1">Community</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Connect with classmates and join campus groups.
            </p>
          </div>
          <Link
            href="/resources"
            className="rounded-xl border border-border bg-card p-6 hover:shadow-sm transition-shadow block"
          >
            <BookOpen className="h-5 w-5 text-primary mb-3" />
            <h3 className="text-sm font-semibold mb-1">Academics</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Access notes, previous year papers, and study materials.
            </p>
          </Link>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-sm font-semibold mb-4">Profile</h2>
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-muted-foreground mb-0.5">Name</dt>
              <dd className="font-medium">
                {profile?.first_name} {profile?.last_name}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground mb-0.5">Roll Number</dt>
              <dd className="font-medium">{profile?.roll_number}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground mb-0.5">Branch</dt>
              <dd className="font-medium">{profile?.branch}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground mb-0.5">Year</dt>
              <dd className="font-medium">{profile?.year}</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-muted-foreground mb-0.5">Email</dt>
              <dd className="font-medium">{user.email}</dd>
            </div>
          </dl>
        </div>
      </main>
    </div>
  );
}
