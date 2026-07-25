"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, MapPin, Search, SlidersHorizontal } from "lucide-react";
import ProfileMenu from "./ProfileMenu";

export default function TopHeader() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("specialization", query);
    router.push(`/search?${params.toString()}`);
  }

  return (
    <header className="rounded-b-3xl bg-rausch px-4 pb-5 pt-4 text-white md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Left: profile / login */}
        <ProfileMenu />

        {/* Right: location */}
        <button
          className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5"
          onClick={() => router.push("/search")}
        >
          <div className="text-right">
            <p className="text-[10px] leading-none text-white/70">Location</p>
            <p className="flex items-center gap-1 text-sm font-medium leading-tight">
              <MapPin size={13} />
              Multan, PK
            </p>
          </div>
          <ChevronDown size={14} />
        </button>
      </div>

      {/* Search + filter */}
      <form onSubmit={handleSearch} className="mx-auto mt-4 flex max-w-7xl gap-2">
        <label className="flex flex-1 items-center gap-2 rounded-control bg-white px-4 py-3">
          <Search size={16} className="shrink-0 text-ink/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search doctors, specializations..."
            className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink/40"
          />
        </label>
        <button
          type="button"
          onClick={() => router.push("/search")}
          aria-label="Filters"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-control bg-white text-rausch"
        >
          <SlidersHorizontal size={17} />
        </button>
      </form>
    </header>
  );
}
