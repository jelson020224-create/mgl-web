# Session Change Log

## 2026-06-30 — Layout Modernization & Review System

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
