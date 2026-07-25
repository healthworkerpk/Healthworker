import { notFound } from "next/navigation";
import { BadgeCheck, MapPin, Star } from "lucide-react";
import TopHeader from "@/components/TopHeader";
import BookingPanel from "@/components/BookingPanel";
import { DOCTORS, getDoctorById } from "@/lib/doctors-data";

export function generateStaticParams() {
  return DOCTORS.map((doctor) => ({ id: doctor.id }));
}

export default function DoctorProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const doctor = getDoctorById(params.id);
  if (!doctor) notFound();

  return (
    <main>
      <TopHeader />

      {/* Extra bottom padding on mobile so content isn't hidden behind the sticky bar */}
      <div className="mx-auto max-w-5xl px-4 pb-28 pt-6 md:px-8 md:pb-12">
        {/* Header */}
        <div className="flex items-start gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={doctor.photoUrl}
            alt={doctor.name}
            className="h-20 w-20 shrink-0 rounded-card object-cover md:h-28 md:w-28"
          />
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-semibold md:text-2xl">{doctor.name}</h1>
              {doctor.verified && (
                <span className="flex items-center gap-1 rounded-full bg-surface-soft px-2.5 py-1 text-xs font-medium">
                  <BadgeCheck size={13} className="text-rausch" />
                  PMC Verified
                </span>
              )}
            </div>
            <p className="mt-0.5 text-sm text-ink/60">
              {doctor.specialization} · {doctor.experienceYears} years experience
            </p>
            <p className="mt-1 flex items-center gap-1 text-sm">
              <Star size={14} className="fill-ink text-ink" />
              <span className="font-medium">{doctor.rating.toFixed(1)}</span>
              <span className="text-ink/50">({doctor.reviewCount} reviews)</span>
            </p>
          </div>
        </div>

        {/* Main content + booking panel layout */}
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            {/* Bio */}
            <section>
              <h2 className="mb-2 text-lg font-semibold">About</h2>
              <p className="text-sm leading-relaxed text-ink/70">{doctor.bio}</p>
              <p className="mt-2 text-sm text-ink/60">
                Speaks: {doctor.languages.join(", ")}
              </p>
            </section>

            {/* Gallery */}
            {doctor.gallery.length > 0 && (
              <section>
                <h2 className="mb-2 text-lg font-semibold">Clinic photos</h2>
                <div className="grid grid-cols-2 gap-3">
                  {doctor.gallery.map((src, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={i}
                      src={src}
                      alt={`${doctor.clinicName} photo ${i + 1}`}
                      className="aspect-[4/3] w-full rounded-card object-cover"
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Clinics / shifts */}
            <section>
              <h2 className="mb-2 text-lg font-semibold">Clinic & timings</h2>
              <div className="space-y-3">
                {doctor.clinics.map((clinic, i) => (
                  <div
                    key={i}
                    className="rounded-card border border-hairline p-4"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium">{clinic.clinicName}</p>
                        <p className="flex items-center gap-1 text-sm text-ink/60">
                          <MapPin size={13} />
                          {clinic.address}
                        </p>
                        <p className="mt-1 text-sm text-ink/60">
                          {clinic.shiftLabel}
                        </p>
                      </div>
                      <span className="shrink-0 text-sm font-semibold">
                        Rs. {clinic.fee}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews */}
            <section>
              <h2 className="mb-2 text-lg font-semibold">Patient reviews</h2>
              <div className="space-y-4">
                {doctor.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-hairline pb-4 last:border-0"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{review.patientName}</p>
                      <span className="text-xs text-ink/50">{review.date}</span>
                    </div>
                    <p className="mt-0.5 flex items-center gap-1 text-sm">
                      <Star size={12} className="fill-ink text-ink" />
                      {review.rating.toFixed(1)}
                    </p>
                    <p className="mt-1 text-sm text-ink/70">{review.comment}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Booking panel: sidebar on desktop, sticky bottom bar on mobile */}
          <div>
            <BookingPanel doctor={doctor} />
          </div>
        </div>
      </div>
    </main>
  );
}
