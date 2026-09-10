"use client";

import { useState, useRef } from "react";
import { X, Upload, FileText, Image, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

const BRANCHES = ["CSE", "ECE", "EEE", "MECH", "CIVIL", "IT", "CSE-AI", "CSE-DS"];
const SEMESTERS = ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5", "Sem 6", "Sem 7", "Sem 8"];
const MAX_SIZE = 15 * 1024 * 1024;
const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/webp"];

interface UploadModalProps {
  open: boolean;
  onClose: () => void;
  onUploadComplete: () => void;
  userId: string;
  userBranch: string;
}

export function UploadModal({
  open,
  onClose,
  onUploadComplete,
  userId,
  userBranch,
}: UploadModalProps) {
  const [resourceType, setResourceType] = useState<"note" | "pyp">("note");
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [branch, setBranch] = useState(userBranch);
  const [semester, setSemester] = useState("Sem 1");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setTitle("");
    setSubject("");
    setBranch(userBranch);
    setSemester("Sem 1");
    setFile(null);
    setError("");
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setError("");

    if (selected.size > MAX_SIZE) {
      setError("File must be less than 15MB.");
      return;
    }

    if (!ALLOWED_TYPES.includes(selected.type)) {
      setError("Only PDF, JPEG, PNG, and WebP files are allowed.");
      return;
    }

    setFile(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !subject.trim()) {
      setError("Title and subject are required.");
      return;
    }

    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    setLoading(true);

    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filePath = `${branch}/${semester}/${timestamp}-${safeName}`;

    const { error: uploadError } = await supabase.storage
      .from("student-documents")
      .upload(filePath, file);

    if (uploadError) {
      setError(uploadError.message);
      setLoading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("student-documents")
      .getPublicUrl(filePath);

    const { error: insertError } = await supabase.from("resources").insert({
      title: title.trim(),
      resource_type: resourceType,
      subject: subject.trim(),
      branch,
      semester_year: semester,
      file_url: urlData.publicUrl,
      file_type: file.type,
      uploaded_by: userId,
    });

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    reset();
    setLoading(false);
    onUploadComplete();
    onClose();
  };

  if (!open) return null;

  const isPdf = file?.type === "application/pdf";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-xl border border-border bg-card p-8 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 text-muted-foreground hover:text-foreground rounded-md transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-lg font-semibold tracking-tight mb-1">
          Upload Resource
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Share study materials with your peers
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="inline-flex rounded-lg border border-border p-0.5 bg-muted">
            <button
              type="button"
              onClick={() => setResourceType("note")}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                resourceType === "note"
                  ? "bg-card shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Notes
            </button>
            <button
              type="button"
              onClick={() => setResourceType("pyp")}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                resourceType === "pyp"
                  ? "bg-card shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              PYP
            </button>
          </div>

          <div>
            <label htmlFor="upload-title" className="block text-sm font-medium mb-1.5">
              Title
            </label>
            <input
              id="upload-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Data Structures Midterm Notes"
              required
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-shadow"
            />
          </div>

          <div>
            <label htmlFor="upload-subject" className="block text-sm font-medium mb-1.5">
              Subject Name
            </label>
            <input
              id="upload-subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g., Data Structures & Algorithms"
              required
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-shadow"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="upload-branch" className="block text-sm font-medium mb-1.5">
                Branch
              </label>
              <select
                id="upload-branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-shadow"
              >
                {BRANCHES.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="upload-semester" className="block text-sm font-medium mb-1.5">
                Semester
              </label>
              <select
                id="upload-semester"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-shadow"
              >
                {SEMESTERS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              File
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.webp"
              onChange={handleFileSelect}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full rounded-lg border-2 border-dashed border-border p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
            >
              {file ? (
                <div className="flex items-center justify-center gap-2">
                  {isPdf ? (
                    <FileText className="h-5 w-5 text-red-500" />
                  ) : (
                    <Image className="h-5 w-5 text-blue-500" />
                  )}
                  <span className="text-sm font-medium">{file.name}</span>
                  <span className="text-xs text-muted-foreground">
                    ({(file.size / 1024 / 1024).toFixed(1)}MB)
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-1">
                  <Upload className="h-6 w-6 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Click to select a file (PDF, JPEG, PNG, WebP)
                  </span>
                  <span className="text-xs text-muted-foreground">Max 15MB</span>
                </div>
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Upload Resource
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
