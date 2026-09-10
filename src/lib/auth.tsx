"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  ReactNode,
} from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { createLogger } from "@/lib/logger";

const log = createLogger("Auth");

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const isSupabaseConfigured = !!process.env.NEXT_PUBLIC_SUPABASE_URL;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const initialized = useRef(false);

  useEffect(() => {
    if (!isSupabaseConfigured || initialized.current) return;
    initialized.current = true;

    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        log.info("Session restored", { userId: session?.user?.id });
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      })
      .catch((err) => {
        log.error("Failed to restore session", err);
        setLoading(false);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      log.info("Auth state changed", { event, userId: session?.user?.id });
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    log.info("Sign-in attempt", { email });
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      log.error("Sign-in failed", error, { email });
      return { error: error.message };
    }

    log.info("Sign-in successful", { email });
    return {};
  };

  const signUp = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    log.info("Sign-up attempt", { email });
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {},
      },
    });

    if (error) {
      log.error("Sign-up failed", error, { email });
      return { error: error.message };
    }

    log.info("Sign-up successful", { email });
    return {};
  };

  const signOut = async () => {
    log.info("Signing out");
    try {
      await supabase.auth.signOut();
      log.info("Sign-out successful");
    } catch (err) {
      log.error("Sign-out failed", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, session, loading, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
