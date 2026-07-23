import NavBar from "@/components/NavBar";
import SearchBar from "@/components/SearchBar";
import CategoryStrip from "@/components/CategoryStrip";
import DoctorCard from "@/components/DoctorCard";
import { DOCTORS } from "@/lib/doctors-data";

// Swap for a live Firestore query (see lib/schema.ts DoctorDoc) once the
// backend module is wired up — DOCTORS is shared with /search and
// /doctor/[id] so all three stay in sync.
const FEATURED_DOCTORS = DOCTORS;

export default function HomePage() {
  return (
    <main>
      <NavBar />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pb-8 pt-10 md:px-8 md:pt-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-[26px] font-semibold leading-tight tracking-tight md:text-[32px]">
            Find a doctor you trust, book in seconds
          </h1>
          <p className="mt-2 text-sm text-ink/60 md:text-base">
            Verified specialists near you, with real-time slots and upfront
            fees.
          </p>
        </div>
        <div className="mx-auto mt-6 max-w-2xl">
          <SearchBar />
        </div>
      </section>

      {/* Trust moment — the 64px rating figure the brief calls out
          as the single loudest typographic element on the page */}
      <section className="border-y border-hairline bg-surface-soft">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4 py-10 text-center md:px-8">
          <span className="text-rating text-ink">4.8</span>
          <p className="text-sm text-ink/60">
            Average rating across 12,400+ verified patient reviews
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 pt-8 md:px-8">
        <CategoryStrip />
      </section>

      {/* Featured doctors grid */}
      <section className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <h2 className="mb-4 text-lg font-semibold">
          Top-rated near you
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_DOCTORS.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </section>

      <footer className="border-t border-hairline">
        <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-ink/50 md:px-8">
          © {new Date().getFullYear()} Healthworkers. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
