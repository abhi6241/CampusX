"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { createLogger } from "@/lib/logger";

const log = createLogger("Bio");

interface BioEditorProps {
  userId: string;
  bio: string | null;
  onBioUpdate: (bio: string) => void;
}

const MAX_CHARS = 200;

export function BioEditor({ userId, bio, onBioUpdate }: BioEditorProps) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(bio || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    setLoading(true);
    setError("");
    log.info("Saving bio", { userId });

    const trimmed = value.trim();

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ bio: trimmed || null })
      .eq("id", userId);

    if (updateError) {
      log.error("Failed to save bio", updateError, { userId });
      setError(updateError.message);
      setLoading(false);
      return;
    }

    log.info("Bio saved successfully", { userId });
    onBioUpdate(trimmed);
    setEditing(false);
    setLoading(false);
  };

  const handleCancel = () => {
    setValue(bio || "");
    setEditing(false);
    setError("");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium">Bio</h3>
        {!editing ? (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="text-sm font-medium text-primary hover:text-primary/90 transition-colors"
          >
            Edit
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={loading}
              className="rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors inline-flex items-center gap-1.5"
            >
              {loading && <Loader2 className="h-3 w-3 animate-spin" />}
              Save
            </button>
          </div>
        )}
      </div>

      {editing ? (
        <>
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            maxLength={MAX_CHARS}
            placeholder="Add a short bio about yourself..."
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-shadow min-h-[100px] resize-none"
          />
          <p className="text-xs text-muted-foreground text-right mt-1">
            {value.length}/{MAX_CHARS}
          </p>
        </>
      ) : (
        <p className="text-sm text-muted-foreground leading-relaxed">
          {bio || "Add a short bio about yourself..."}
        </p>
      )}

      {error && (
        <p className="text-xs text-destructive mt-2">{error}</p>
      )}
    </div>
  );
}
