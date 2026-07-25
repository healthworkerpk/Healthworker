"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import TopHeader from "@/components/TopHeader";
import DoctorCard from "@/components/DoctorCard";
import BottomTabBar from "@/components/BottomTabBar";
import { DOCTORS } from "@/lib/doctors-data";
import { SPECIALIZATIONS } from "@/lib/specializations";
import { Search, MapPin, SlidersHorizontal } from "lucide-react";

function SearchPageInner() {
  const params = useSearchParams();

  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [area, setArea] = useState("");
  const [appliedAt, setAppliedAt] = useState(0);

  // Prefill from URL query params (e.g. coming from the header search or a category tap)
  useEffect(() => {
    const specFromUrl = params.get("specialization") ?? "";
    const areaFromUrl = params.get("area") ?? "";
    if (specFromUrl) {
      // If it matches a known category exactly, treat it as the category
      // filter; otherwise treat it as a free-text keyword.
      const match = SPECIALIZATIONS.find((s) => s.specialization === specFromUrl);
      if (match) setCategory(match.specialization);
      else setKeyword(specFromUrl);
    }
    if (areaFromUrl) setArea(areaFromUrl);
  }, [params]);

  const results = useMemo(() => {
    return DOCTORS.filter((doctor) => {
      const matchesKeyword =
        !keyword ||
        doctor.name.toLowerCase().includes(keyword.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(keyword.toLowerCase());
      const matchesCategory = !category || doctor.specialization === category;
      const matchesArea =
        !area || doctor.area.toLowerCase().includes(area.toLowerCase());
      return matchesKeyword && matchesCategory && matchesArea;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    });
  }, [keyword, category, area, appliedAt]);

  return (
    <main className="pb-20 md:pb-0">
      <TopHeader />

      {/* Filter bar */}
      <section className="border-b border-hairline bg-canvas">
        <div className="mx-auto max-w-7xl px-4 py-4 md:px-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setAppliedAt(Date.now());
            }}
            className="flex flex-col gap-3"
          >
            <label className="flex items-center gap-2 rounded-full border border-hairline px-4 py-2.5">
              <Search size={16} className="shrink-0 text-ink/50" />
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search by doctor name or specialization"
                className="w-full bg-transparent text-sm outline-none placeholder:text-ink/50"
              />
            </label>

            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="flex flex-1 items-center gap-2 rounded-full border border-hairline px-4 py-2.5">
                <SlidersHorizontal size={15} className="shrink-0 text-ink/50" />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-transparent text-sm text-ink outline-none"
                >
                  <option value="">All categories</option>
                  {SPECIALIZATIONS.map((s) => (
                    <option key={s.specialization} value={s.specialization}>
                      {s.specialization}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-1 items-center gap-2 rounded-full border border-hairline px-4 py-2.5">
                <MapPin size={15} className="shrink-0 text-ink/50" />
                <input
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="Area — e.g. Gulberg, Lahore"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-ink/50"
                />
              </label>

              <button
                type="submit"
                className="shrink-0 rounded-full bg-rausch px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rausch-dark"
              >
                Search
              </button>
            </div>
          </form>
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
              No doctors match your search. Try a different category or area.
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

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchPageInner />
    </Suspense>
  );
}
