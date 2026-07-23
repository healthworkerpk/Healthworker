"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { useCurrentUser } from "@/lib/useCurrentUser";
import { db } from "@/lib/firebase";
import SidebarLayout from "@/components/SidebarLayout";
import { DOCTOR_NAV_ITEMS } from "@/lib/doctor-nav";
import Button from "@/components/Button";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function SchedulePage() {
  const router = useRouter();
  const { user, loading } = useCurrentUser();

  const [workingDays, setWorkingDays] = useState<string[]>([
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ]);
  const [startTime, setStartTime] = useState("17:00");
  const [endTime, setEndTime] = useState("21:00");
  const [emergencyClosed, setEmergencyClosed] = useState(false);
  const [loadingSchedule, setLoadingSchedule] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push("/auth/login");
  }, [loading, user, router]);

  useEffect(() => {
    async function load() {
      if (!user) return;
      const snap = await getDoc(doc(db, "doctors", user.uid));
      if (snap.exists()) {
        const data = snap.data();
        if (Array.isArray(data.workingDays)) setWorkingDays(data.workingDays);
        if (data.startTime) setStartTime(data.startTime);
        if (data.endTime) setEndTime(data.endTime);
        if (typeof data.emergencyClosedToday === "boolean")
          setEmergencyClosed(data.emergencyClosedToday);
      }
      setLoadingSchedule(false);
    }
    load();
  }, [user]);

  if (loading || !user || loadingSchedule) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-ink/50">Loading...</p>
      </main>
    );
  }

  function toggleDay(day: string) {
    setWorkingDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  }

  async function handleSave() {
    if (!user) return;
    setSaving(true);
    await setDoc(
      doc(db, "doctors", user.uid),
      {
        workingDays,
        startTime,
        endTime,
        emergencyClosedToday: emergencyClosed,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <SidebarLayout navItems={DOCTOR_NAV_ITEMS}>
      <div className="mx-auto max-w-2xl px-4 py-6 md:px-8 md:py-8">
        <h1 className="text-xl font-semibold">Schedule &amp; Timings</h1>

        {/* Emergency Leave toggle — brief's "instantly blocks online bookings" rule */}
        <div className="mt-5 flex items-center justify-between rounded-card border border-hairline p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle
              size={18}
              className={emergencyClosed ? "text-rausch" : "text-ink/30"}
            />
            <div>
              <p className="text-sm font-medium">Emergency Leave / Close Today</p>
              <p className="text-xs text-ink/60">
                Instantly blocks online bookings for today.
              </p>
            </div>
          </div>
          <button
            onClick={() => setEmergencyClosed((v) => !v)}
            aria-label="Toggle emergency leave"
            className={
              "relative h-6 w-11 shrink-0 rounded-full transition-colors " +
              (emergencyClosed ? "bg-rausch" : "bg-hairline")
            }
          >
            <span
              className={
                "absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform " +
                (emergencyClosed ? "translate-x-5" : "translate-x-0.5")
              }
            />
          </button>
        </div>

        {/* Working days */}
        <section className="mt-6">
          <h2 className="mb-2 text-sm font-semibold text-ink/70">Working days</h2>
          <div className="flex flex-wrap gap-2">
            {DAYS.map((day) => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors " +
                  (workingDays.includes(day)
                    ? "border-ink bg-ink text-white"
                    : "border-hairline text-ink/60 hover:border-ink")
                }
              >
                {day}
              </button>
            ))}
          </div>
        </section>

        {/* Time slots */}
        <section className="mt-6 grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium">Start time</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full rounded-control border border-hairline px-3 py-2 text-sm outline-none focus:border-ink"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">End time</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full rounded-control border border-hairline px-3 py-2 text-sm outline-none focus:border-ink"
            />
          </div>
        </section>

        <div className="mt-6 flex items-center gap-3">
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save schedule"}
          </Button>
          {saved && (
            <span className="flex items-center gap-1.5 text-sm text-rausch">
              <CheckCircle2 size={15} />
              Saved
            </span>
          )}
        </div>
      </div>
    </SidebarLayout>
  );
}
