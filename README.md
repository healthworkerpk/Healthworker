# Healthworkers

Doctor discovery & booking platform. Next.js (App Router) + Tailwind +
Firebase + Cloudinary, deployed on Vercel.

## Module 1: Scaffold + Design System + Home Page — done
## Module 2: Search & Doctor Profile — done
## Module 3: Auth (login/register, role-based redirect) — done
## Module 4: Doctor Panel (mobile sidebar + all 7 sections) — done
## Module 5: Admin Panel shell — done

- `app/search/page.tsx` — live filter by specialization/area + category pills.
- `app/doctor/[id]/page.tsx` — profile page: bio, gallery, clinic/timings,
  reviews, and `components/BookingPanel.tsx` (sticky sidebar on desktop,
  sticky bottom bar on mobile per the brief).
- `lib/doctors-data.ts` — single shared data source for home/search/profile;
  swap for a Firestore query once the backend is wired up.
- `app/auth/login/page.tsx`, `app/auth/register/page.tsx` — email/password
  auth via Firebase, role toggle on signup, confirmation screen, and
  role-based redirect (`lib/auth.ts` → `roleHomePath`): doctor → `/dashboard`,
  patient → `/account`, admin → `/admin`.
- `components/SidebarLayout.tsx` — shared shell: persistent sidebar on
  desktop, slide-in drawer + overlay on mobile. Used by both Doctor and
  Admin panels.
- **Doctor Panel** (`app/dashboard/*`) — Dashboard (stat cards),
  Appointments (mock queue + actions + WhatsApp prescription builder),
  Profile & Multi-Clinic (Firestore-backed, Cloudinary PMC license upload),
  Schedule & Timings (working days + Emergency Leave toggle, Firestore-backed),
  Ledger (net balance view + working withdrawal request form → Firestore),
  Promotions (flash sale creator → Firestore), My Reviews.
- **Admin Panel** (`app/admin/*`) — Dashboard (stat cards) + 7 section
  placeholders (Doctor Management, Collections & Billing, Financial Ledger,
  Ads & Banners, Policy Engine, Locations & Categories, Review Moderation),
  all gated on `role === "admin"`.

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

## Making yourself an admin

There is no public admin signup (by design). To access `/admin`:
1. Sign up normally as a patient or doctor (or use an existing account).
2. In Firebase Console → Firestore Database → Data, open `users/{your-uid}`.
3. Edit the `role` field from `patient`/`doctor` to `admin`. Save.
4. Log out and log back in on the site — you'll land on `/admin`.

## Roadmap (next modules, build in this order)

1. **Booking flow** — real slot selection UI, appointment write to
   Firestore, confirmation screen. `BookingPanel.tsx`'s `handleBook` is
   the hook point; Appointments Manager reads from the same collection.
2. **Admin Panel — real data** — wire the 7 placeholder sections to real
   Firestore queries: doctor approvals, the Collections screen (Policy
   Engine auto-activation), ledger, ads/banners, locations/specializations,
   review moderation queue.
3. **Policy Engine** — Cloud Function that runs the amount → validity-days
   rule and the automatic hide-on-expiry check (scheduled function).
4. **Firestore security rules** — replace the open test-mode rules with
   role-based rules (patient reads own bookings, doctor reads own ledger,
   admin reads everything) before going live with real user data.

Say which module to build next and it'll follow this same file structure.
