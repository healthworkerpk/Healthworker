"use client";

import { useRouter } from "next/navigation";
import {
  Stethoscope,
  HeartPulse,
  Smile,
  Flower2,
  Sparkles,
  Ear,
  Bone,
  Baby,
  Brain,
  Droplet,
} from "lucide-react";

const CATEGORIES = [
  { label: "General", specialization: "General Physician", icon: Stethoscope },
  { label: "Cardiology", specialization: "Cardiologist", icon: HeartPulse },
  { label: "Dental", specialization: "Dentist", icon: Smile },
  { label: "Gynecology", specialization: "Gynecologist", icon: Flower2 },
  { label: "Skin", specialization: "Dermatologist", icon: Sparkles },
  { label: "ENT", specialization: "ENT Specialist", icon: Ear },
  { label: "Orthopedic", specialization: "Orthopedic", icon: Bone },
  { label: "Child Care", specialization: "Pediatrician", icon: Baby },
  { label: "Mental Health", specialization: "Psychiatrist", icon: Brain },
  { label: "Urology", specialization: "Urologist", icon: Droplet },
];

export default function DoctorCategoryGrid() {
  const router = useRouter();

  return (
    <section className="px-4 pt-6 md:px-8">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-semibold">Category</h2>
      </div>
      <div className="grid grid-cols-4 gap-y-4 sm:grid-cols-6 lg:grid-cols-10">
        {CATEGORIES.map(({ label, specialization, icon: Icon }) => (
          <button
            key={specialization}
            onClick={() =>
              router.push(`/search?specialization=${encodeURIComponent(specialization)}`)
            }
            className="flex flex-col items-center gap-2"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-soft text-rausch">
              <Icon size={22} />
            </span>
            <span className="text-center text-xs font-medium leading-tight text-ink/80">
              {label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
