"use client";

import { useState } from "react";
import { SpecialSlide } from "@/lib/site-content";

export default function SpecialForYouSection({ slides }: { slides: SpecialSlide[] }) {
  const [active, setActive] = useState(0);

  function handleScroll(e: React.UIEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setActive(index);
  }

  if (slides.length === 0) return null;

  return (
    <section className="px-4 pt-4 md:px-8">
      <h2 className="mb-3 text-base font-semibold">#SpecialForYou</h2>

      <div
        onScroll={handleScroll}
        className="scrollbar-hide flex snap-x snap-mandatory gap-3 overflow-x-auto"
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="relative aspect-[16/9] w-full shrink-0 snap-center overflow-hidden rounded-card"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.imageUrl}
              alt={slide.text}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <p className="absolute bottom-4 left-4 right-4 text-base font-semibold text-white">
              {slide.text}
            </p>
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <div className="mt-2 flex justify-center gap-1.5">
          {slides.map((_, i) => (
            <span
              key={i}
              className={
                "h-1.5 rounded-full transition-all " +
                (i === active ? "w-4 bg-rausch" : "w-1.5 bg-hairline")
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}
