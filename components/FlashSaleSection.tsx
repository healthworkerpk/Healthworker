"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, BadgeCheck } from "lucide-react";
import { DoctorProfile } from "@/lib/doctors-data";

type Filter = "all" | "newest" | "popular";

export default function FlashSaleSection({
  title,
  doctors,
}: {
  title: string;
  doctors: DoctorProfile[];
}) {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>("all");
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  const list =
    filter === "popular"
      ? [...doctors].sort((a, b) => b.rating - a.rating)
      : filter === "newest"
      ? [...doctors].slice().reverse()
      : doctors;

  return (
    <section className="px-4 pt-6 md:px-8">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-semibold">{title}</h2>
      </div>

      <div className="mb-3 flex gap-2 overflow-x-auto">
        {(["all", "newest", "popular"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={
              "shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium capitalize " +
              (filter === f
                ? "border-rausch bg-rausch text-white"
                : "border-hairline text-ink/60 hover:border-ink")
            }
          >
            {f}
          </button>
        ))}
      </div>

      <div className="scrollbar-hide flex gap-3 overflow-x-auto pb-2">
        {list.map((doctor) => (
          <div
            key={doctor.id}
            onClick={() => router.push(`/doctor/${doctor.id}`)}
            className="w-40 shrink-0 cursor-pointer overflow-hidden rounded-card border border-hairline"
          >
            <div className="relative aspect-square w-full bg-surface-soft">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={doctor.photoUrl}
                alt={doctor.name}
                className="h-full w-full object-cover"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSaved((prev) => ({ ...prev, [doctor.id]: !prev[doctor.id] }));
                }}
                aria-label="Save doctor"
                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90"
              >
                <Heart
                  size={13}
                  className={saved[doctor.id] ? "fill-rausch text-rausch" : "text-ink/50"}
                />
              </button>
              {doctor.verified && (
                <span className="absolute left-2 top-2 flex items-center gap-0.5 rounded-full bg-white/90 px-1.5 py-0.5 text-[9px] font-medium">
                  <BadgeCheck size={9} className="text-rausch" />
                  Verified
                </span>
              )}
            </div>
            <div className="p-2.5">
              <p className="truncate text-xs font-semibold">{doctor.name}</p>
              <p className="truncate text-[11px] text-ink/60">{doctor.specialization}</p>
              <p className="mt-1 text-[11px] font-medium">Rs. {doctor.fee}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
