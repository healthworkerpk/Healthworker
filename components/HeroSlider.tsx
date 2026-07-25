"use client";

import { useState } from "react";
import { HeroSlide } from "@/lib/site-content";

export default function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0);

  function handleScroll(e: React.UIEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setActive(index);
  }

  if (slides.length === 0) return null;

  return (
    <div className="px-4 pt-4 md:px-8">
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
              alt={slide.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <span className="rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-medium">
                Limited time
              </span>
              <h3 className="mt-2 text-lg font-semibold">{slide.title}</h3>
              <p className="text-sm text-white/80">{slide.subtitle}</p>
            </div>
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
    </div>
  );
}
