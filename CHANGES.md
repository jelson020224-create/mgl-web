# Session Change Log

## 2026-06-30 (Session 2) — Populous-Inspired Spacing Overhaul

### Global CSS (`src/app/globals.css`)
- Added fluid spacing system via CSS custom properties: `--fluid-section`, `--fluid-hero`, `--fluid-container`, `--fluid-gap`, `--fluid-header-mb`
- Replaced static breakpoint-based padding with `clamp()` values — `.section` now `clamp(4rem, 8vw, 8rem)`, `.hero-section` `clamp(5rem, 10vw, 10rem)`, `.section-container` `clamp(1.25rem, 3vw, 2.5rem)`
- Tightened heading typography: `.section-title` line-height `1.05` (was `1.15`), letter-spacing `-0.03em` (was `-0.01em`), fluid font-size `clamp(1.875rem, 4vw, 3.25rem)`
- `.bento-grid` gap now uses `clamp(1rem, 2vw, 1.5rem)` instead of fixed `1rem`

### Home Page (`src/app/page.tsx`)
- Hero vertical padding: `py-[clamp(6rem,14vw,14rem)]` (was `py-32 md:py-48`)
- Stats bar bottom padding: `pb-[clamp(3rem,6vw,6rem)]`
- Stats grid gap: `gap-[clamp(1rem,2vw,1.5rem)]` (was `gap-5`)
- Divider margin: `mb-[clamp(2rem,4vw,4rem)]` (was `mb-12`)
- CTA section padding: `py-[clamp(5rem,10vw,10rem)]` (was `py-24`)
- Heading line-height tightened to `1.02` on hero, `1.05` on CTA

### All Pages — Standardized Spacing
- **About**: team grid `gap-[clamp(1rem,2vw,1.5rem)]` (was `gap-6`), approach grid `gap-[clamp(1.5rem,3vw,3rem)]` (was `gap-8`), CTA `py-[clamp(4rem,8vw,8rem)]` (was `py-20`), h1 `leading-[1.05]`
- **Services**: grid `gap-[clamp(1rem,2vw,1.5rem)]` (was `gap-6`), CTA `py-[clamp(4rem,8vw,8rem)]`, h1 `leading-[1.05]`
- **Portfolio**: grid `gap-[clamp(1rem,2vw,1.5rem)]` (was `gap-6`), h1 `leading-[1.05]`
- **Contact**: grid `gap-[clamp(1.5rem,3vw,3rem)]` (was `gap-10`), h1 `leading-[1.05]`
- **Track**: hero h1 `leading-[1.05]`
- **Track [id]**: detail sections `py-[clamp(3rem,6vw,6rem)]` (was `py-20 md:py-28`)
- **Service [id]**: h1 `leading-[1.05]`, CTA `py-[clamp(4rem,8vw,8rem)]`
- **Footer**: padding `py-[clamp(3rem,5vw,5rem)]` (was `py-16`), grid `gap-[clamp(1.5rem,3vw,3rem)]` (was `gap-10`)

### Navbar (`src/components/Navbar.tsx`)
- Burger button gets `hidden` class when mobile drawer is open — prevents overlapping close icons (hamburger X animation + drawer's close button were both visible)

## 2026-06-30 (Session 1) — Layout Modernization & Review System

### Global CSS (`src/app/globals.css`)
- Added `border-radius: 0.5rem` to `.btn-primary`, `.btn-secondary`, `.btn-outline`, `.btn-ghost` — standalone buttons were sharp squares
- Added `border: 1px solid var(--sand-light)` to `.card-modern` — white cards were invisible on cream backgrounds
- `card-modern` hover now darkens border + lifts

### Admin Layout (`src/app/admin/(dashboard)/layout.tsx`)
- Removed `card-modern shadow-soft` wrapper around `{children}` — was causing double-padding on admin pages that already have their own cards

### Card Class Migration (22 files)
- Replaced all 37 instances of `class="card"` / `className="card"` with `card-modern shadow-soft` across:
  - Public: about, services (list + detail), portfolio, contact, login, register
  - Client: dashboard, track (search + detail)
  - Admin: dashboard, projects (list + edit + new), services (list + samples), portfolio, testimonials, messages, media (list + upload), samples manager
  - Components: skeleton, samples-gallery
- Removed `card-shine` class usage (merged into `card-modern` hover)

### Review System (new)
- **`src/app/dashboard/review/page.tsx`** — client review form with star rating
- **`src/app/dashboard/review/actions.ts`** — server action, saves as `active: false`
- **`src/lib/queries.ts`** — added `getAllTestimonials()` (no active filter, for admin)
- **`src/lib/admin-actions.ts`** — added `approveTestimonial(id)` action
- **`src/app/admin/(dashboard)/testimonials/page.tsx`** — updated UI: pending/approved badges, approve button, amber left border for pending, pending count banner
- **`src/app/dashboard/client-nav.tsx`** — added "Review" link with star icon

### Account Deletion (new)
- **`src/app/dashboard/actions.ts`** — `deleteAccount()` server action
  - Checks for non-completed projects before deletion
  - Returns error listing active projects if any exist
  - Deletes client + clears session + redirects on success
- **`src/app/dashboard/account-danger.tsx`** — client component with confirmation flow
- **`src/app/dashboard/page.tsx`** — added `AccountDanger` component at bottom

### Button Fixes (globals.css)
- Made `btn-primary`, `btn-secondary`, `btn-outline`, `btn-ghost` **self-contained** — each now has inline-flex, padding, font-size, border-radius, border, line-height, transition, cursor
- Previously they depended on `.btn` base class for padding/font-size/display; 15+ buttons across the site used them standalone and rendered as tiny unstyled squares
- Root cause: track search button, track password submit, media upload, portfolio form, services form, samples form, settings form, edit/new project forms, testimonials add/edit forms all lacked `.btn` class
