"use client";

const CATEGORIES = [
  "General Physician",
  "Cardiologist",
  "Dentist",
  "Gynecologist",
  "Dermatologist",
  "ENT Specialist",
  "Orthopedic",
  "Pediatrician",
  "Psychiatrist",
  "Urologist",
];

export default function CategoryStrip({
  active,
  onSelect,
}: {
  active?: string;
  onSelect?: (c: string) => void;
}) {
  return (
    <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-1">
      {CATEGORIES.map((c) => {
        const isActive = c === active;
        return (
          <button
            key={c}
            onClick={() => onSelect?.(c)}
            className={
              "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors " +
              (isActive
                ? "border-ink bg-ink text-white"
                : "border-hairline bg-canvas text-ink hover:border-ink")
            }
          >
            {c}
          </button>
        );
      })}
    </div>
  );
}
