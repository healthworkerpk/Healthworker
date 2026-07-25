"use client";

import { useMemo, useState } from "react";
import NavBar from "@/components/NavBar";
import CategoryStrip from "@/components/CategoryStrip";
import DoctorCard from "@/components/DoctorCard";
import BottomTabBar from "@/components/BottomTabBar";
import { DOCTORS } from "@/lib/doctors-data";
import { Search, MapPin } from "lucide-react";

export default function SearchPage() {
  const [specialization, setSpecialization] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState<string | undefined>(undefined);

  const results = useMemo(() => {
    return DOCTORS.filter((doctor) => {
      const matchesSpecialization =
        !specialization ||
        doctor.specialization.toLowerCase().includes(specialization.toLowerCase());
      const matchesArea =
        !area || doctor.area.toLowerCase().includes(area.toLowerCase());
      const matchesCategory = !category || doctor.specialization === category;
      return matchesSpecialization && matchesArea && matchesCategory;
    });
  }, [specialization, area, category]);

  return (
    <main className="pb-20 md:pb-0">
      <NavBar />
      <section className="border-b border-hairline bg-canvas">
        <div className="mx-auto max-w-7xl px-4 py-4 md:px-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <label className="flex flex-1 items-center gap-2 rounded-full border border-hairline px-4 py-2.5">
              <Search size={16} className="shrink-0 text-ink/50" />
              <input
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                placeholder="Specialization"
                className="w-full bg-transparent text-sm outline-none placeholder:text-ink/50"
              />
            </label>
            <label className="flex flex-1 items-center gap-2 rounded-full border border-hairline px-4 py-2.5">
              <MapPin size={16} className="shrink-0 text-ink/50" />
              <input
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="Area"
                className="w-full bg-transparent text-sm outline-none placeholder:text-ink/50"
              />
            </label>
          </div>
          <div className="mt-3">
            <CategoryStrip
              active={category}
              onSelect={(c) => setCategory((prev) => (prev === c ? undefined : c))}
            />
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="mx-auto max-w-7xl px-4 py-6 md:px-8">
        <p className="mb-4 text-sm text-ink/60">
          {results.length} {results.length === 1 ? "doctor" : "doctors"} found
        </p>

        {results.length === 0 ? (
          <div className="rounded-card border border-hairline py-16 text-center">
            <p className="text-sm text-ink/60">
              No doctors match your search. Try a different specialization or
              area.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        )}
      </section>
      <BottomTabBar />
    </main>
  );
}
