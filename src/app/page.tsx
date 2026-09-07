import {
  GraduationCap,
  Calendar,
  Users,
  BookOpen,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-border bg-background">
        <div className="container-app flex h-16 items-center justify-between">
          <div className="flex items-center gap-2.5">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-base font-semibold tracking-tight">CampusConnect</span>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            <a
              href="#features"
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
            >
              Features
            </a>
            <a
              href="#about"
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
            >
              About
            </a>
            <div className="w-px h-5 bg-border mx-1" />
            <ThemeToggle />
            <a
              href="/login"
              className="px-4 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors"
            >
              Sign in
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="container-app py-20 md:py-28">
          <div className="mx-auto max-w-2xl">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl mb-4">
              Campus life,
              <br />
              simplified.
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              A unified platform for academics, scheduling, and campus community.
              Built for the modern university.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Get started
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#learn-more"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium hover:bg-secondary transition-colors"
              >
                Learn more
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <section id="features" className="container-app py-20 border-t border-border">
          <div className="mb-12">
            <h2 className="text-2xl font-semibold tracking-tight mb-2">
              Features
            </h2>
            <p className="text-muted-foreground">
              Everything you need to manage campus life.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-6">
              <Calendar className="h-5 w-5 text-primary mb-3" />
              <h3 className="text-sm font-semibold mb-1">Smart Scheduling</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Manage classes, exams, and events with an intelligent calendar
                that syncs across all your devices.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <Users className="h-5 w-5 text-primary mb-3" />
              <h3 className="text-sm font-semibold mb-1">Community Hub</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Connect with classmates, join clubs, and participate in campus
                discussions all in one place.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <BookOpen className="h-5 w-5 text-primary mb-3" />
              <h3 className="text-sm font-semibold mb-1">Academic Tracker</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Track your grades, assignments, and academic progress with
                detailed analytics and insights.
              </p>
            </div>
          </div>
        </section>

        <section id="about" className="container-app py-20 border-t border-border">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight mb-4">
              Built with modern technology
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              CampusConnect is built on a foundation of modern web technologies
              designed for performance, security, and scalability. From real-time
              database updates to serverless edge functions, every component is
              chosen to deliver a fast, reliable experience.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Next.js 16
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Supabase
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                TypeScript
              </span>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-background">
        <div className="container-app py-6 flex items-center justify-between text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CampusConnect</p>
          <div className="flex items-center gap-4">
            <a href="#privacy" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#terms" className="hover:text-foreground transition-colors">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
