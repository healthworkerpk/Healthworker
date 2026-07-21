import NavBar from "@/components/NavBar";
import SearchBar from "@/components/SearchBar";
import CategoryStrip from "@/components/CategoryStrip";
import DoctorCard, { Doctor } from "@/components/DoctorCard";

// Placeholder data — replace with a live Firestore query
// (see lib/firestore/doctors.ts) once the backend module is wired up.
const FEATURED_DOCTORS: Doctor[] = [
  {
    id: "dr-amina-khalid",
    name: "Dr. Amina Khalid",
    specialization: "Cardiologist",
    area: "Cantt, Multan",
    clinicName: "Heart Care Clinic",
    rating: 4.9,
    reviewCount: 212,
    fee: 2000,
    photoUrl:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=80",
    verified: true,
    nextAvailable: "Today, 6:30 PM",
  },
  {
    id: "dr-bilal-ahmed",
    name: "Dr. Bilal Ahmed",
    specialization: "Dentist",
    area: "Gulgasht, Multan",
    clinicName: "Smile Studio",
    rating: 4.7,
    reviewCount: 98,
    fee: 1500,
    photoUrl:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&q=80",
    verified: true,
    nextAvailable: "Tomorrow, 10:00 AM",
  },
  {
    id: "dr-sana-riaz",
    name: "Dr. Sana Riaz",
    specialization: "Gynecologist",
    area: "Shah Rukn-e-Alam, Multan",
    clinicName: "Wellness Women's Clinic",
    rating: 4.8,
    reviewCount: 156,
    fee: 1800,
    photoUrl:
      "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=600&q=80",
    verified: true,
    nextAvailable: "Today, 4:00 PM",
  },
];

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
