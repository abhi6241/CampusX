# CampusConnect

A modern web application built with Next.js, Tailwind CSS, and Supabase.

---

## Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

### [0.1.0] - 2026-09-07

#### 🚀 Features
- Initialized Next.js project with App Router
- Set up Tailwind CSS v4 for styling
- Added dark/light mode support with `prefers-color-scheme`
- Configured TypeScript with strict mode

#### 📦 Dependencies Installed
- `next` (v16.3.4) - React framework
- `react` / `react-dom` (v19.2.8) - UI library
- `tailwindcss` (v4) - Utility-first CSS framework
- `@supabase/supabase-js` - Supabase client library
- `@upstash/redis` - Redis client for serverless
- `amqplib` - AMQP client for message queues
- `lucide-react` - Beautiful, consistent icons

#### 📁 Files Created/Modified
| File | Description |
|------|-------------|
| `src/app/layout.tsx` | Root layout with metadata and dark mode |
| `src/app/page.tsx` | Home page with Lucide icons |
| `src/app/globals.css` | Global styles with CSS variables |
| `CHANGELOG.md` | This change tracking file |
| `package.json` | Project configuration |
| `tsconfig.json` | TypeScript configuration |
| `postcss.config.mjs` | PostCSS with Tailwind plugin |

#### 🎨 Styling
- Dark mode: `#0a0a0a` background, `#ededed` foreground
- Light mode: `#ffffff` background, `#171717` foreground
- Primary: `#2563eb` (light) / `#3b82f6` (dark)
- Geist Sans and Geist Mono fonts configured
- CSS variables for semantic colors (muted, border, ring, etc.)
- `container-app` utility class for consistent spacing

#### 🏗️ Project Structure
```
campusx/
├── src/
│   └── app/
│       ├── layout.tsx      # Root layout
│       ├── page.tsx        # Home page
│       └── globals.css     # Global styles
├── public/                 # Static assets
├── package.json
├── tsconfig.json
├── postcss.config.mjs
└── CHANGELOG.md
```

---

## Milestones

- [x] **M1: Project Initialization** - Next.js, Tailwind, dependencies ✅ (2026-09-07)
- [ ] **M2: Authentication** - Supabase Auth integration
- [ ] **M3: Database Setup** - Supabase schema and RLS policies
- [ ] **M4: Core Features** - Main application functionality
- [ ] **M5: Deployment** - Production build and deployment

---

### [0.2.0] - 2026-09-07

#### 🎨 Design System Overhaul
- Migrated to Google-inspired minimalist aesthetic (Material You / Google Workspace style)
- Adopted clean, neutral color palette with purposeful accent colors

#### 🎨 Color Palette
| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| Background | `#ffffff` | `#09090b` |
| Foreground | `#09090b` | `#fafafa` |
| Primary | `#1a73e8` (Google Blue) | `#8ab4f8` |
| Secondary | `#f8f9fa` | `#1f1f1f` |
| Muted | `#f1f3f4` | `#1f1f1f` |
| Border | `#e8eaed` | `#2d2d2d` |
| Card | `#ffffff` | `#1f1f1f` |

#### 🔤 Typography
- Replaced Geist with **Inter** for clean, professional sans-serif text
- Tight letter-spacing on headings for crisp appearance
- Anti-aliased font rendering for sharp text

#### 📐 Layout Changes
- Reduced max-width to `max-w-5xl` for tighter, focused layouts
- Card-based layouts with `rounded-xl` corners and 1px borders
- Generous whitespace with `p-6` padding on cards
- Subtle hover states: `hover:bg-secondary` and `hover:bg-primary/5`

#### 🧩 Component Updates
- Minimalist navigation with subtle hover backgrounds
- Flat, solid buttons without glow effects
- Clean outlined secondary buttons
- Thin 1px dividers instead of heavy borders
- Removed `backdrop-blur` and glass effects

#### 📁 Files Modified
| File | Changes |
|------|---------|
| `src/app/globals.css` | New color tokens, Google-inspired palette |
| `src/app/layout.tsx` | Inter font, updated font variables |
| `src/app/page.tsx` | Clean minimal design, removed Sparkles icon |

---

### [0.3.0] - 2026-09-07

#### 🌓 Theme System
- Added class-based dark/light mode toggle
- Theme persisted to localStorage
- System preference detection with manual override
- Three modes: Light, Dark, System

#### 🎨 Color Palette (Updated)
| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| Background | `#ffffff` | `#09090b` |
| Foreground | `#09090b` | `#fafafa` |
| Primary | `#1a73e8` | `#8ab4f8` |
| Secondary | `#f8f9fa` | `#1f1f1f` |
| Border | `#e8eaed` | `#2d2d2d` |
| Card | `#ffffff` | `#1f1f1f` |

#### 🧩 New Components
| Component | Description |
|-----------|-------------|
| `ThemeProvider` | React context provider for theme state |
| `ThemeToggle` | 3-button toggle (Sun/Moon/Monitor) |

#### 📁 Files Created
| File | Description |
|------|-------------|
| `src/lib/theme.tsx` | ThemeProvider + useTheme hook |
| `src/components/theme-toggle.tsx` | Theme toggle button group |

#### 📁 Files Modified
| File | Changes |
|------|---------|
| `src/app/globals.css` | `.dark` class-based mode, removed `prefers-color-scheme` |
| `src/app/layout.tsx` | Wrapped children with ThemeProvider |
| `src/app/page.tsx` | Added ThemeToggle to header nav |

---

### [0.4.0] - 2026-09-07

#### 🔐 Authentication
- Supabase Auth integration with email/password sign-in
- Email domain validation restricted to `@vce.ac.in`
- Regex: `/^1602-\d{2}-\d{3}-\d{3}@vce\.ac\.in$/i`
- Auto-extraction of roll number, branch, and year from email
- Authenticated user session management via AuthProvider

#### 🗄️ Database Schema
| Table | Description |
|-------|-------------|
| `profiles` | User profiles linked to `auth.users` |

**profiles table columns:**
| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID | PK, references auth.users |
| `first_name` | TEXT | Immutable |
| `last_name` | TEXT | Immutable |
| `roll_number` | TEXT | Auto-extracted from email |
| `branch` | TEXT | Auto-extracted (CSE, ECE, IT, etc.) |
| `year` | INTEGER | Auto-extracted from email |
| `avatar_url` | TEXT | Nullable |
| `bio` | TEXT | Nullable |
| `created_at` | TIMESTAMPTZ | Default NOW() |

**Indexes:**
- `idx_profiles_name_unique` - Unique compound index on `LOWER(first_name), LOWER(last_name)`
- `idx_profiles_roll_number` - Unique index on roll_number
- `idx_profiles_branch` - Index on branch for filtering
- `idx_profiles_year` - Index on year for filtering

**Row Level Security:**
- Users can read all profiles
- Users can only update/insert/delete their own profile
- Auto-create profile trigger on user signup

#### 🧩 New Components
| Component | Description |
|-----------|-------------|
| `LoginForm` | Email/password sign-in with validation |
| `SignupForm` | Registration with first/last name fields |
| `UnauthorizedScreen` | Error screen for non-VCE emails |
| `AuthProvider` | Supabase auth context provider |

#### 📁 Files Created
| File | Description |
|------|-------------|
| `src/lib/supabase.ts` | Supabase client + Database types |
| `src/lib/auth.tsx` | AuthProvider + useAuth hook |
| `src/lib/email-validation.ts` | VCE email regex + parsing |
| `src/components/auth/login-form.tsx` | Login form component |
| `src/components/auth/signup-form.tsx` | Signup form component |
| `src/components/auth/unauthorized-screen.tsx` | Unauthorized error UI |
| `src/app/login/page.tsx` | Login route |
| `src/app/signup/page.tsx` | Signup route |
| `src/app/unauthorized/page.tsx` | Unauthorized route |
| `src/app/dashboard/page.tsx` | Dashboard with profile display |
| `supabase/schema.sql` | Database schema + triggers |
| `.env.local.example` | Environment variables template |

#### 📁 Files Modified
| File | Changes |
|------|---------|
| `src/app/layout.tsx` | Added AuthProvider wrapper |
| `src/app/page.tsx` | Updated Sign in/Get started links |

#### 🔧 Setup Required
1. Create Supabase project at [supabase.com](https://supabase.com)
2. Run `supabase/schema.sql` in SQL Editor
3. Copy `.env.local.example` to `.env.local` and add Supabase credentials
4. Enable Email auth in Supabase Dashboard > Authentication > Providers

---

*Last updated: 2026-09-07*
