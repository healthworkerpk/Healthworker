"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Stethoscope } from "lucide-react";

export default function SearchBar() {
  const router = useRouter();
  const [specialization, setSpecialization] = useState("");
  const [area, setArea] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (specialization) params.set("specialization", specialization);
    if (area) params.set("area", area);
    router.push(`/search?${params.toString()}`);
  }

  return (
    <>
      {/* Desktop / tablet: full pill with segmented fields */}
      <form
        className="mx-auto hidden w-full max-w-2xl items-center rounded-full border border-hairline bg-canvas shadow-card md:flex"
        onSubmit={handleSubmit}
      >
        <label className="flex flex-1 items-center gap-2 px-6 py-3.5">
          <Stethoscope size={16} className="shrink-0 text-ink/60" />
          <input
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            placeholder="Specialization — Cardiologist, Dentist..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-ink/50"
          />
        </label>
        <span className="h-6 w-px bg-hairline" />
        <label className="flex flex-1 items-center gap-2 px-6 py-3.5">
          <MapPin size={16} className="shrink-0 text-ink/60" />
          <input
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="Area — Tehsil, city..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-ink/50"
          />
        </label>
        <button
          type="submit"
          aria-label="Search doctors"
          className="mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rausch text-white hover:bg-rausch-dark"
        >
          <Search size={18} />
        </button>
      </form>

      {/* Mobile: single-tap entry point */}
      <button
        className="flex w-full items-center gap-3 rounded-full border border-hairline bg-canvas px-5 py-3.5 shadow-card md:hidden"
        onClick={() => router.push("/search")}
      >
        <Search size={16} className="text-ink/60" />
        <span className="text-sm text-ink/60">
          Search by specialization or area
        </span>
      </button>
    </>
  );
}
