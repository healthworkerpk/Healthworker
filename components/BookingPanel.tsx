"use client";

import { useState } from "react";
import Button from "./Button";
import { DoctorProfile } from "@/lib/doctors-data";

export default function BookingPanel({ doctor }: { doctor: DoctorProfile }) {
  const [booking, setBooking] = useState(false);

  function handleBook() {
    // Wires into the Booking flow module (appointment write to Firestore).
    setBooking(true);
    setTimeout(() => setBooking(false), 1200);
  }

  return (
    <>
      {/* Desktop: sticky sidebar card */}
      <div className="sticky top-20 hidden rounded-card border border-hairline p-5 shadow-card md:block">
        <div className="flex items-baseline justify-between">
          <span className="text-lg font-semibold">Rs. {doctor.fee}</span>
          <span className="text-sm text-ink/50">consultation</span>
        </div>
        <p className="mt-1 text-sm text-ink/60">{doctor.nextAvailable}</p>
        <Button className="mt-4 w-full" size="lg" onClick={handleBook} disabled={booking}>
          {booking ? "Booking..." : "Book appointment"}
        </Button>
        <p className="mt-3 text-center text-xs text-ink/50">
          No payment required to reserve your slot
        </p>
      </div>

      {/* Mobile: sticky bottom bar, per the brief's responsive rule */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-canvas px-4 py-3 shadow-card md:hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="text-base font-semibold">Rs. {doctor.fee}</span>
            <span className="block text-xs text-ink/50">{doctor.nextAvailable}</span>
          </div>
          <Button size="lg" onClick={handleBook} disabled={booking} className="flex-1">
            {booking ? "Booking..." : "Book appointment"}
          </Button>
        </div>
      </div>
    </>
  );
}
