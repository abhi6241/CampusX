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
- [x] **M2: Authentication** - Supabase Auth integration ✅ (2026-09-07)
- [x] **M3: Database Setup** - Supabase schema and RLS policies ✅ (2026-09-07)
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

*Last updated: 2026-09-10*

---

### [0.5.0] - 2026-09-10

#### 🚀 Features
- First-time onboarding modal for new users
- Immutable name logic (names locked after registration)
- Dedicated user profile page with avatar upload and bio editing
- Branch color badges (CSE, ECE, EEE, MECH, CIVIL, IT, CSE-AI, CSE-DS)
- Display name uniqueness validation before save

#### 🔐 Onboarding Flow
- Dashboard checks if profile has empty names → forces onboarding modal
- Two separate input fields: First Name and Last Name
- Warning banner: "Your full name cannot be changed after registration."
- Pre-save duplicate check against `profiles` table unique constraint
- Clear error for duplicate names: "Please add a middle initial or variation."

#### 👤 Profile Management
- Dedicated `/profile` route with full profile view
- Avatar upload to Supabase Storage (`avatars` bucket)
- Bio/status editing with character limit
- Locked name display with lock icon indicator
- Auto-parsed roll number, branch badge, and academic year display

#### 📁 Files Created
| File | Description |
|------|-------------|
| `src/components/onboarding/onboarding-modal.tsx` | Onboarding modal component |
| `src/app/profile/page.tsx` | Profile page route |
| `src/components/profile/profile-card.tsx` | Profile display card |
| `src/components/profile/avatar-upload.tsx` | Avatar upload with preview |
| `src/components/profile/bio-editor.tsx` | Bio text editor |

#### 📁 Files Modified
| File | Changes |
|------|---------|
| `src/lib/auth.tsx` | Removed name metadata from signUp |
| `src/app/dashboard/page.tsx` | Added onboarding check + Profile nav link |
| `next.config.ts` | Added remotePatterns for Supabase Storage |
| `supabase/schema.sql` | Branch renames: ME→MECH, CE→CIVIL, AI→CSE-AI, DS→CSE-DS |
| `src/lib/email-validation.ts` | Branch renames: ME→MECH, CE→CIVIL, AI→CSE-AI, DS→CSE-DS |

#### 🔧 Setup Required
1. Create `avatars` bucket in Supabase Dashboard > Storage
2. Set bucket to public read access for authenticated users

---

*Last updated: 2026-09-10*

---

### [0.6.0] - 2026-09-10

#### 🚀 Features
- Notes & Previous Year Papers (PYP) repository hub
- Tabbed interface: Study Notes and PYP Bank
- File upload with 15MB limit (PDFs, JPEG, PNG, WebP)
- Real-time search filters by Branch, Semester, and Subject
- Resource cards with file type icons, branch badges, and download links
- Upload modal with subject, branch, semester, and file selection

#### 📚 Resources Hub
- Dedicated `/resources` route with enterprise dashboard layout
- Tab toggle between Study Notes and PYP Bank
- Filter bar: Branch dropdown, Semester dropdown, Subject keyword search
- Resource grid with responsive 1/2/3 column layout
- Empty state with contextual messages and clear filters action

#### 📤 Upload Modal
- Resource type toggle (Notes / PYP)
- Form fields: Title, Subject Name, Branch, Semester
- File picker with drag-style drop zone
- Client-side validation: 15MB max, PDF/JPEG/PNG/WebP only
- Upload to Supabase Storage `student-documents` bucket
- File path convention: `{branch}/{semester}/{timestamp}-{filename}`

#### 🗄️ Database Schema
| Table | Description |
|-------|-------------|
| `resources` | Study materials and previous year papers |

**resources table columns:**
| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID | PK, auto-generated |
| `title` | TEXT | Resource title |
| `resource_type` | TEXT | 'note' or 'pyp' |
| `subject` | TEXT | Subject name |
| `branch` | TEXT | CSE, ECE, etc. |
| `semester_year` | TEXT | Sem 1 through Sem 8 |
| `file_url` | TEXT | Supabase Storage URL |
| `file_type` | TEXT | MIME type |
| `uploaded_by` | UUID | FK to auth.users |
| `created_at` | TIMESTAMPTZ | Default NOW() |

**RLS Policies:**
- All authenticated users can read resources
- Authenticated users can insert their own uploads
- Users can delete their own uploads

#### 📁 Files Created
| File | Description |
|------|-------------|
| `src/app/resources/page.tsx` | Resources page with tabs, filters, grid |
| `src/components/resources/upload-modal.tsx` | Upload modal with form + file handling |
| `src/components/resources/resource-card.tsx` | Resource display card |
| `src/components/resources/filter-bar.tsx` | Branch, semester, subject search filters |

#### 📁 Files Modified
| File | Changes |
|------|---------|
| `supabase/schema.sql` | Added `resources` table + RLS policies |
| `src/lib/supabase.ts` | Added `resources` TypeScript types |
| `src/app/dashboard/page.tsx` | Added Resources nav link + linked Academics card |
| `src/app/profile/page.tsx` | Added Resources nav link |

#### 🔧 Setup Required
1. Create `student-documents` bucket in Supabase Dashboard > Storage
2. Set 15MB file size limit in bucket settings
3. Run storage policies SQL for `student-documents` bucket
4. Run `resources` table SQL from `supabase/schema.sql`

---

*Last updated: 2026-09-10*

---

### [0.7.0] - 2026-09-10

#### 📝 Logging & Observability
- Added centralized logger module with structured output
- Log levels: debug, info, warn, error (debug hidden in production)
- Contextual prefixes for filtering: `[Auth]`, `[Dashboard]`, `[Upload]`, etc.
- ISO timestamps for log aggregation and debugging

#### 🔧 Logger Module (`src/lib/logger.ts`)
- Factory pattern: `createLogger("Context")` returns scoped logger
- Four log levels: `debug`, `info`, `warn`, `error`
- Structured format: `[timestamp] [LEVEL] [Context] message`
- `error()` accepts both message and error object for stack traces
- Environment-aware: debug logs hidden in production

#### 📊 Logging Coverage (12 files)
| File | Events Logged |
|------|---------------|
| `src/lib/supabase.ts` | Client init, credential warnings |
| `src/lib/auth.tsx` | Session restore, auth state changes, sign-in/up/out attempts |
| `src/components/auth/login-form.tsx` | Login attempts, validation, success/failure |
| `src/components/auth/signup-form.tsx` | Signup attempts, validation, success/failure |
| `src/components/onboarding/onboarding-modal.tsx` | Name uniqueness check, profile create/update |
| `src/components/profile/avatar-upload.tsx` | File validation, storage upload, DB update |
| `src/components/profile/bio-editor.tsx` | Bio save attempts |
| `src/app/dashboard/page.tsx` | Profile fetch, onboarding detection |
| `src/app/profile/page.tsx` | Profile fetch |
| `src/app/resources/page.tsx` | Resource/profile fetch, re-fetch after upload |
| `src/components/resources/upload-modal.tsx` | Validation, storage upload, DB insert |

#### 🐛 Error Handling Fixes
- Fixed `auth.tsx`: Added `.catch()` to `getSession()` to prevent unhandled rejection
- Fixed `auth.tsx`: Wrapped `signOut()` in try/catch to prevent unhandled rejection
- Fixed `resources/page.tsx`: Added error checking on `Promise.all()` results (critical gap)
- Fixed `resources/page.tsx`: Added error logging on re-fetch after upload
- Fixed `dashboard/page.tsx`: Added error logging on re-fetch after onboarding

#### 📁 Files Created
| File | Description |
|------|-------------|
| `src/lib/logger.ts` | Centralized logger module with levels and context |

#### 📁 Files Modified
| File | Changes |
|------|---------|
| `src/lib/supabase.ts` | Added logger for client init + credential warnings |
| `src/lib/auth.tsx` | Added logging + fixed getSession/signOut error handling |
| `src/components/auth/login-form.tsx` | Added login attempt/result logging |
| `src/components/auth/signup-form.tsx` | Added signup attempt/result logging |
| `src/components/onboarding/onboarding-modal.tsx` | Added onboarding flow logging |
| `src/components/profile/avatar-upload.tsx` | Added avatar upload logging |
| `src/components/profile/bio-editor.tsx` | Added bio save logging |
| `src/app/dashboard/page.tsx` | Added profile fetch logging + fixed error handling |
| `src/app/profile/page.tsx` | Added profile fetch logging |
| `src/app/resources/page.tsx` | Added resource fetch logging + fixed critical error gap |
| `src/components/resources/upload-modal.tsx` | Added upload flow logging |

---

*Last updated: 2026-09-10*
