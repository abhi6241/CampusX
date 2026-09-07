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

*Last updated: 2026-09-07*
