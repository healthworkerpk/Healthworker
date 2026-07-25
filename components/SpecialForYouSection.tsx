import { SpecialSlide } from "@/lib/site-content";

export default function SpecialForYouSection({ slides }: { slides: SpecialSlide[] }) {
  if (slides.length === 0) return null;

  return (
    <section className="px-4 pt-6 md:px-8">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-semibold">#SpecialForYou</h2>
      </div>
      <div className="scrollbar-hide flex gap-3 overflow-x-auto pb-1">
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="relative h-32 w-52 shrink-0 overflow-hidden rounded-card"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.imageUrl}
              alt={slide.text}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <p className="absolute bottom-2 left-2 right-2 text-xs font-medium text-white">
              {slide.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
