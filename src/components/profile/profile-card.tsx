"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { User } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase";
import { AvatarUpload } from "./avatar-upload";
import { BioEditor } from "./bio-editor";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

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

interface ProfileCardProps {
  profile: Profile;
  user: User;
  onProfileUpdate: (updates: Partial<Profile>) => void;
}

export function ProfileCard({ profile, user, onProfileUpdate }: ProfileCardProps) {
  const [currentProfile, setCurrentProfile] = useState(profile);

  const handleAvatarUpdate = (url: string) => {
    setCurrentProfile((prev) => ({ ...prev, avatar_url: url }));
    onProfileUpdate({ avatar_url: url });
  };

  const handleBioUpdate = (bio: string) => {
    setCurrentProfile((prev) => ({ ...prev, bio }));
    onProfileUpdate({ bio });
  };

  const colors = BRANCH_COLORS[currentProfile.branch] || DEFAULT_COLORS;
  const badgeClass = `${colors.light} ${colors.dark}`;

  return (
    <div className="rounded-xl border border-border bg-card p-8">
      <div className="flex flex-col items-center text-center mb-6">
        <AvatarUpload
          userId={user.id}
          firstName={currentProfile.first_name}
          lastName={currentProfile.last_name}
          avatarUrl={currentProfile.avatar_url}
          onAvatarUpdate={handleAvatarUpdate}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-center gap-2">
          <h2 className="text-xl font-semibold tracking-tight">
            {currentProfile.first_name} {currentProfile.last_name}
          </h2>
          <span title="Name is locked after registration">
            <Lock className="h-4 w-4 text-muted-foreground" />
          </span>
        </div>

        <div className="text-center">
          <p className="font-mono text-sm text-muted-foreground">
            {currentProfile.roll_number}
          </p>
        </div>

        <div className="flex items-center justify-center gap-2">
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeClass}`}>
            {currentProfile.branch}
          </span>
          <span className="text-muted-foreground">&middot;</span>
          <span className="text-sm text-muted-foreground">
            Batch of {currentProfile.year}
          </span>
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>

        <div className="border-t border-border my-6" />

        <BioEditor
          userId={user.id}
          bio={currentProfile.bio}
          onBioUpdate={handleBioUpdate}
        />
      </div>
    </div>
  );
}
