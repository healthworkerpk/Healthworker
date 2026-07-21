# Healthworkers

Doctor discovery & booking platform. Next.js (App Router) + Tailwind +
Firebase + Cloudinary, deployed on Vercel.

## Module 1 (this drop): Scaffold + Design System + Home Page

- `tailwind.config.ts` — every color, radius, and shadow token from the
  brief, named so components never hardcode a hex value.
- `app/globals.css` — Inter font, white-canvas base, focus-visible rings,
  reduced-motion support.
- `components/` — `Button`, `NavBar` (hamburger sheet below 744px),
  `SearchBar` (pill on desktop, single-tap sheet trigger on mobile),
  `CategoryStrip`, `DoctorCard`.
- `app/page.tsx` — home page: hero search, the 64px/700 trust rating
  moment, specialization strip, featured doctor grid.
- `lib/firebase.ts`, `lib/cloudinary.ts` — client setup, read from env vars.
- `lib/schema.ts` — Firestore collection shapes (doctors, appointments,
  ledger, billing collections, policy rules, reviews) used across every
  later module so the data model stays consistent.

## Local setup

```bash
npm install
cp .env.example .env.local   # fill in Firebase + Cloudinary values
npm run dev
```

## Deploying

1. Push this repo to GitHub.
2. Import it in Vercel → set the same env vars from `.env.example` in
   Project Settings → Environment Variables.
3. Every push to `main` redeploys automatically.

## Roadmap (next modules, build in this order)

1. **Auth & roles** — patient / doctor / admin sign-in via Firebase Auth,
   custom claims for role-based routing.
2. **Search & doctor profile** — Firestore query by specialization/area,
   `app/search/page.tsx`, `app/doctor/[id]/page.tsx` with the sticky
   mobile booking bar.
3. **Booking flow** — slot selection, appointment write, confirmation.
4. **Doctor panel** — dashboard, appointments manager, multi-clinic
   profile + shift setup, emergency-leave toggle, ledger, withdrawal
   requests, flash-sale creator.
5. **Admin panel** — approvals queue, unbilled tab + login lock, the
   Collections screen (Policy Engine auto-activation), ledger, ads/
   banner manager, location & specialization manager, review moderation.
6. **Policy Engine** — Cloud Function that runs the amount → validity-days
   rule and the automatic hide-on-expiry check (scheduled function).

Say which module to build next and it'll follow this same file structure.
