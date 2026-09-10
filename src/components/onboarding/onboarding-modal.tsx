"use client";

import { useState } from "react";
import { GraduationCap, AlertTriangle, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { parseVceEmail } from "@/lib/email-validation";
import { createLogger } from "@/lib/logger";

const log = createLogger("Onboarding");

interface OnboardingModalProps {
  userId: string;
  email: string;
  onComplete: () => void;
}

export function OnboardingModal({
  userId,
  email,
  onComplete,
}: OnboardingModalProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!firstName.trim() || !lastName.trim()) {
      setError("Both first name and last name are required.");
      return;
    }

    setLoading(true);

    log.info("Checking name uniqueness", { firstName: firstName.trim(), lastName: lastName.trim() });
    const { data: existing } = await supabase
      .from("profiles")
      .select("id")
      .ilike("first_name", firstName.trim())
      .ilike("last_name", lastName.trim())
      .maybeSingle();

    if (existing) {
      log.warn("Name already taken", { firstName: firstName.trim(), lastName: lastName.trim() });
      setError(
        "This name is already taken. Please add a middle initial or variation."
      );
      setLoading(false);
      return;
    }

    log.info("Checking existing profile", { userId });
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", userId)
      .maybeSingle();

    if (existingProfile) {
      log.info("Updating profile name", { userId });
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          first_name: firstName.trim(),
          last_name: lastName.trim(),
        })
        .eq("id", userId);

      if (updateError) {
        log.error("Failed to update profile", updateError, { userId });
        setError(updateError.message);
        setLoading(false);
        return;
      }
      log.info("Profile name updated successfully", { userId });
    } else {
      const parsed = parseVceEmail(email);
      log.info("Creating new profile", { userId, branch: parsed.branch, year: parsed.year });
      const { error: insertError } = await supabase.from("profiles").insert({
        id: userId,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        roll_number: parsed.rollNumber || "",
        branch: parsed.branch || "Unknown",
        year: parsed.year || new Date().getFullYear(),
      });

      if (insertError) {
        log.error("Failed to create profile", insertError, { userId });
        setError(insertError.message);
        setLoading(false);
        return;
      }
      log.info("Profile created successfully", { userId });
    }

    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-8">
        <div className="text-center mb-6">
          <GraduationCap className="h-8 w-8 text-primary mx-auto mb-3" />
          <h1 className="text-xl font-semibold tracking-tight mb-1">
            Complete your profile
          </h1>
          <p className="text-sm text-muted-foreground">
            Set up your display name for CampusConnect
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="onboarding-first-name"
                className="block text-sm font-medium mb-1.5"
              >
                First name
              </label>
              <input
                id="onboarding-first-name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                required
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-shadow"
              />
            </div>
            <div>
              <label
                htmlFor="onboarding-last-name"
                className="block text-sm font-medium mb-1.5"
              >
                Last name
              </label>
              <input
                id="onboarding-last-name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
                required
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-shadow"
              />
            </div>
          </div>

          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-3 flex items-start gap-2.5">
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
            <p className="text-sm text-amber-800 dark:text-amber-200">
              Warning: Your full name cannot be changed after registration.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Setting up...
              </>
            ) : (
              "Complete setup"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
