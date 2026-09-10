"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  GraduationCap,
  LogOut,
  Loader2,
  Plus,
  FileText,
  BookOpen,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { supabase, Database } from "@/lib/supabase";
import { createLogger } from "@/lib/logger";
import { ThemeToggle } from "@/components/theme-toggle";
import { FilterBar } from "@/components/resources/filter-bar";
import { ResourceCard } from "@/components/resources/resource-card";
import { UploadModal } from "@/components/resources/upload-modal";

const log = createLogger("Resources");

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type Resource = Database["public"]["Tables"]["resources"]["Row"];

interface ResourceWithUploader extends Resource {
  profiles: { first_name: string; last_name: string } | null;
}

export default function ResourcesPage() {
  const { user, loading: authLoading, signOut } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [resources, setResources] = useState<ResourceWithUploader[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"note" | "pyp">("note");
  const [filterBranch, setFilterBranch] = useState("All");
  const [filterSemester, setFilterSemester] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      log.info("User not authenticated, redirecting to login");
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      log.info("Fetching resources and profile", { userId: user.id });
      Promise.all([
        supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .maybeSingle(),
        supabase
          .from("resources")
          .select("*, profiles!inner(first_name, last_name)")
          .order("created_at", { ascending: false }),
      ]).then(([profileResult, resourcesResult]) => {
        if (profileResult.error) {
          log.error("Failed to fetch profile", profileResult.error, { userId: user.id });
        }
        if (resourcesResult.error) {
          log.error("Failed to fetch resources", resourcesResult.error);
        }
        if (profileResult.data) {
          setProfile(profileResult.data);
        }
        if (resourcesResult.data) {
          setResources(resourcesResult.data as ResourceWithUploader[]);
          log.info("Resources loaded", { count: resourcesResult.data.length });
        }
        setLoading(false);
      });
    }
  }, [user]);

  const filteredResources = useMemo(() => {
    return resources.filter((r) => {
      if (r.resource_type !== activeTab) return false;
      if (filterBranch !== "All" && r.branch !== filterBranch) return false;
      if (filterSemester !== "All" && r.semester_year !== filterSemester) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (
          !r.subject.toLowerCase().includes(q) &&
          !r.title.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [resources, activeTab, filterBranch, filterSemester, searchQuery]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const getUploaderName = (resource: ResourceWithUploader) => {
    if (!resource.profiles) return "Unknown";
    return `${resource.profiles.first_name} ${resource.profiles.last_name}`;
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight mb-1">
              Resources
            </h1>
            <p className="text-sm text-muted-foreground">
              Study notes and previous year papers
            </p>
          </div>
          <button
            onClick={() => setUploadModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Upload
          </button>
        </div>

        <div className="inline-flex rounded-lg border border-border p-0.5 bg-muted mb-6">
          <button
            onClick={() => setActiveTab("note")}
            className={`flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
              activeTab === "note"
                ? "bg-card shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <BookOpen className="h-4 w-4" />
            Study Notes
          </button>
          <button
            onClick={() => setActiveTab("pyp")}
            className={`flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
              activeTab === "pyp"
                ? "bg-card shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <FileText className="h-4 w-4" />
            PYP Bank
          </button>
        </div>

        <FilterBar
          branch={filterBranch}
          semester={filterSemester}
          query={searchQuery}
          onBranchChange={setFilterBranch}
          onSemesterChange={setFilterSemester}
          onQueryChange={setSearchQuery}
        />

        {filteredResources.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-12 text-center">
            <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-sm font-semibold mb-1">
              No {activeTab === "note" ? "notes" : "PYPs"} found
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {filterBranch !== "All" || filterSemester !== "All" || searchQuery
                ? "Try adjusting your filters"
                : `Be the first to upload a ${activeTab === "note" ? "note" : "previous year paper"}`}
            </p>
            {(filterBranch !== "All" || filterSemester !== "All" || searchQuery) && (
              <button
                onClick={() => {
                  setFilterBranch("All");
                  setFilterSemester("All");
                  setSearchQuery("");
                }}
                className="text-sm font-medium text-primary hover:text-primary/90 transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                uploaderName={getUploaderName(resource)}
              />
            ))}
          </div>
        )}
      </main>

      <UploadModal
        open={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onUploadComplete={() => {
          supabase
            .from("resources")
            .select("*, profiles!inner(first_name, last_name)")
            .order("created_at", { ascending: false })
            .then(({ data, error }) => {
              if (error) {
                log.error("Failed to re-fetch resources after upload", error);
              }
              if (data) setResources(data as ResourceWithUploader[]);
            });
        }}
        userId={user.id}
        userBranch={profile.branch}
      />
    </div>
  );
}
