"use client";

import { useRouter } from "next/navigation";
import { SPECIALIZATIONS } from "@/lib/specializations";

export default function DoctorCategoryGrid() {
  const router = useRouter();

  return (
    <section className="px-4 pt-6 md:px-8">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-semibold">Category</h2>
      </div>
      <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-1">
        {SPECIALIZATIONS.map(({ label, specialization, emoji }) => (
          <button
            key={specialization}
            onClick={() =>
              router.push(`/search?specialization=${encodeURIComponent(specialization)}`)
            }
            className="flex shrink-0 flex-col items-center gap-2"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-b from-surface-soft to-surface-strong text-3xl shadow-card">
              {emoji}
            </span>
            <span className="w-16 text-center text-xs font-medium leading-tight text-ink/80">
              {label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
