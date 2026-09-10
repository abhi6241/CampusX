import { createClient } from "@supabase/supabase-js";
import { createLogger } from "@/lib/logger";

const log = createLogger("Supabase");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  log.warn("Supabase credentials missing — client will fail to connect");
} else {
  log.info("Supabase client initialized", { url: supabaseUrl });
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          roll_number: string;
          branch: string;
          year: number;
          avatar_url: string | null;
          bio: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          first_name: string;
          last_name: string;
          roll_number: string;
          branch: string;
          year: number;
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          first_name?: string;
          last_name?: string;
          roll_number?: string;
          branch?: string;
          year?: number;
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
        };
      };
      resources: {
        Row: {
          id: string;
          title: string;
          resource_type: string;
          subject: string;
          branch: string;
          semester_year: string;
          file_url: string;
          file_type: string;
          uploaded_by: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          resource_type: string;
          subject: string;
          branch: string;
          semester_year: string;
          file_url: string;
          file_type: string;
          uploaded_by: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          resource_type?: string;
          subject?: string;
          branch?: string;
          semester_year?: string;
          file_url?: string;
          file_type?: string;
          uploaded_by?: string;
          created_at?: string;
        };
      };
    };
  };
};
