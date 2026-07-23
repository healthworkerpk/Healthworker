"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { useCurrentUser } from "@/lib/useCurrentUser";
import SidebarLayout from "@/components/SidebarLayout";
import { DOCTOR_NAV_ITEMS } from "@/lib/doctor-nav";

// Placeholder reviews — swap for a live Firestore query (reviews
// collection, filtered by doctorId, status == "approved") once the
// Review Moderation module in the Admin Panel is wired up.
const REVIEWS = [
  { patientName: "Hassan R.", rating: 5, comment: "Very thorough and explained everything clearly.", date: "2 weeks ago" },
  { patientName: "Fatima S.", rating: 5, comment: "Short wait time, helpful staff.", date: "1 month ago" },
];

export default function DoctorReviewsPage() {
  const router = useRouter();
  const { user, loading } = useCurrentUser();

  useEffect(() => {
    if (!loading && !user) router.push("/auth/login");
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-ink/50">Loading...</p>
      </main>
    );
  }

  const avg =
    REVIEWS.reduce((sum, r) => sum + r.rating, 0) / (REVIEWS.length || 1);

  return (
    <SidebarLayout navItems={DOCTOR_NAV_ITEMS}>
      <div className="mx-auto max-w-2xl px-4 py-6 md:px-8 md:py-8">
        <h1 className="text-xl font-semibold">My Reviews</h1>

        <div className="mt-5 flex items-center gap-2 rounded-card border border-hairline p-4">
          <span className="text-3xl font-bold">{avg.toFixed(1)}</span>
          <div>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < Math.round(avg) ? "fill-ink text-ink" : "text-hairline"}
                />
              ))}
            </div>
            <p className="text-xs text-ink/60">{REVIEWS.length} reviews</p>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {REVIEWS.map((r, i) => (
            <div key={i} className="rounded-card border border-hairline p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{r.patientName}</p>
                <span className="text-xs text-ink/50">{r.date}</span>
              </div>
              <div className="mt-1 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i2) => (
                  <Star
                    key={i2}
                    size={12}
                    className={i2 < r.rating ? "fill-ink text-ink" : "text-hairline"}
                  />
                ))}
              </div>
              <p className="mt-1 text-sm text-ink/70">{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </SidebarLayout>
  );
}
