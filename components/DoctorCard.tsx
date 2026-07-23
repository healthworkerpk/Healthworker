"use client";

import { Heart, BadgeCheck, MapPin } from "lucide-react";

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  area: string;
  clinicName: string;
  rating: number; // 0–5
  reviewCount: number;
  fee: number;
  photoUrl: string;
  verified: boolean;
  nextAvailable: string; // e.g. "Today, 6:30 PM"
}

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <a
      href={`/doctor/${doctor.id}`}
      className="group block overflow-hidden rounded-card border border-hairline bg-canvas transition-shadow hover:shadow-card"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-soft">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={doctor.photoUrl}
          alt={doctor.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <button
          aria-label="Save doctor"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink hover:text-rausch"
          onClick={(e) => e.preventDefault()}
        >
          <Heart size={16} />
        </button>
        {doctor.verified && (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-ink">
            <BadgeCheck size={13} className="text-rausch" />
            PMC Verified
          </span>
        )}
      </div>

      <div className="space-y-1 p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-[15px] font-semibold leading-tight">
              {doctor.name}
            </h3>
            <p className="text-sm text-ink/60">{doctor.specialization}</p>
          </div>
          <div className="shrink-0 text-right">
            <span className="text-sm font-semibold">{doctor.rating.toFixed(1)}</span>
            <span className="block text-[11px] text-ink/50">
              {doctor.reviewCount} reviews
            </span>
          </div>
        </div>

        <p className="flex items-center gap-1 text-xs text-ink/60">
          <MapPin size={12} />
          {doctor.clinicName} · {doctor.area}
        </p>

        <div className="flex items-center justify-between pt-1">
          <span className="text-sm">
            <span className="font-semibold">Rs. {doctor.fee}</span>{" "}
            <span className="text-ink/50">consultation</span>
          </span>
          <span className="rounded-full bg-surface-soft px-2.5 py-1 text-[11px] font-medium text-ink/70">
            {doctor.nextAvailable}
          </span>
        </div>
      </div>
    </a>
  );
}
