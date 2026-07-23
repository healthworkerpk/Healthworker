# Healthworkers

Doctor discovery & booking platform. Next.js (App Router) + Tailwind +
Firebase + Cloudinary, deployed on Vercel.

## Module 1: Scaffold + Design System + Home Page — done
## Module 2: Search & Doctor Profile — done
## Module 3: Auth (login/register) — done

- `app/search/page.tsx` — live filter by specialization/area + category pills.
- `app/doctor/[id]/page.tsx` — profile page: bio, gallery, clinic/timings,
  reviews, and `components/BookingPanel.tsx` (sticky sidebar on desktop,
  sticky bottom bar on mobile per the brief).
- `lib/doctors-data.ts` — single shared data source for home/search/profile;
  swap for a Firestore query once the backend is wired up.
- `app/auth/login/page.tsx`, `app/auth/register/page.tsx` — email/password
  auth via Firebase, with a patient/doctor role toggle on signup.
- `lib/auth.ts` — wraps Firebase Auth calls, translates error codes into
  plain-language messages, writes a `users/{uid}` profile doc on signup.

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

1. **Booking flow** — slot selection UI, appointment write to Firestore,
   confirmation screen. `BookingPanel.tsx`'s `handleBook` is the hook point.
2. **Doctor panel** — dashboard, appointments manager, multi-clinic
   profile + shift setup, emergency-leave toggle, ledger, withdrawal
   requests, flash-sale creator. Login should route doctors here based on
   their `users/{uid}.role`.
3. **Admin panel** — approvals queue, unbilled tab + login lock, the
   Collections screen (Policy Engine auto-activation), ledger, ads/
   banner manager, location & specialization manager, review moderation.
4. **Policy Engine** — Cloud Function that runs the amount → validity-days
   rule and the automatic hide-on-expiry check (scheduled function).

Say which module to build next and it'll follow this same file structure.
