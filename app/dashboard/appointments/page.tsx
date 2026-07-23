"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarCheck, MessageCircle, X, Check } from "lucide-react";
import { useCurrentUser } from "@/lib/useCurrentUser";
import SidebarLayout from "@/components/SidebarLayout";
import { DOCTOR_NAV_ITEMS } from "@/lib/doctor-nav";
import Button from "@/components/Button";

interface Appointment {
  id: string;
  patientName: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled" | "no_show";
}

// Placeholder queue — swap for a live Firestore query (appointments
// collection, filtered by doctorId) once the Booking flow module writes
// real appointments.
const INITIAL_APPOINTMENTS: Appointment[] = [
  { id: "a1", patientName: "Hassan Raza", time: "Today, 5:00 PM", status: "upcoming" },
  { id: "a2", patientName: "Ayesha Malik", time: "Today, 5:30 PM", status: "upcoming" },
  { id: "a3", patientName: "Usman Tariq", time: "Today, 6:00 PM", status: "upcoming" },
];

export default function AppointmentsPage() {
  const router = useRouter();
  const { user, loading } = useCurrentUser();
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);

  // Prescription builder state
  const [rxPatient, setRxPatient] = useState("");
  const [rxPhone, setRxPhone] = useState("");
  const [rxDiagnosis, setRxDiagnosis] = useState("");
  const [rxMedicines, setRxMedicines] = useState("");

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

  function updateStatus(id: string, status: Appointment["status"]) {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
  }

  function buildPrescriptionText() {
    return (
      `*Healthworkers Prescription*\n` +
      `Doctor: ${user?.displayName ?? ""}\n` +
      `Patient: ${rxPatient}\n` +
      `Diagnosis: ${rxDiagnosis}\n\n` +
      `Medicines:\n${rxMedicines}\n\n` +
      `Get well soon.`
    );
  }

  function shareOnWhatsApp() {
    const text = encodeURIComponent(buildPrescriptionText());
    const phone = rxPhone.replace(/\D/g, "");
    const url = phone
      ? `https://wa.me/${phone}?text=${text}`
      : `https://wa.me/?text=${text}`;
    window.open(url, "_blank");
  }

  return (
    <SidebarLayout navItems={DOCTOR_NAV_ITEMS}>
      <div className="mx-auto max-w-3xl px-4 py-6 md:px-8 md:py-8">
        <h1 className="text-xl font-semibold">Appointments Manager</h1>

        {/* Today's & upcoming bookings */}
        <section className="mt-5">
          <h2 className="mb-2 text-sm font-semibold text-ink/70">
            Today &amp; upcoming
          </h2>
          {appointments.filter((a) => a.status === "upcoming").length === 0 ? (
            <div className="rounded-card border border-dashed border-hairline p-8 text-center">
              <CalendarCheck size={24} className="mx-auto text-ink/30" />
              <p className="mt-2 text-sm text-ink/60">No upcoming bookings.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {appointments
                .filter((a) => a.status === "upcoming")
                .map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center justify-between rounded-card border border-hairline p-3"
                  >
                    <div>
                      <p className="text-sm font-medium">{a.patientName}</p>
                      <p className="text-xs text-ink/60">{a.time}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateStatus(a.id, "completed")}
                        aria-label="Mark completed"
                        className="flex h-8 w-8 items-center justify-center rounded-control border border-hairline text-ink/60 hover:bg-surface-soft"
                      >
                        <Check size={15} />
                      </button>
                      <button
                        onClick={() => updateStatus(a.id, "no_show")}
                        aria-label="Cancel / no-show — releases the slot"
                        className="flex h-8 w-8 items-center justify-center rounded-control border border-hairline text-ink/60 hover:bg-surface-soft"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </section>

        {/* Completed / cancelled history */}
        {appointments.some((a) => a.status !== "upcoming") && (
          <section className="mt-6">
            <h2 className="mb-2 text-sm font-semibold text-ink/70">History</h2>
            <div className="space-y-2">
              {appointments
                .filter((a) => a.status !== "upcoming")
                .map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center justify-between rounded-card border border-hairline p-3 opacity-60"
                  >
                    <div>
                      <p className="text-sm font-medium">{a.patientName}</p>
                      <p className="text-xs text-ink/60">{a.time}</p>
                    </div>
                    <span className="text-xs font-medium capitalize">
                      {a.status.replace("_", " ")}
                    </span>
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* Digital Letterhead / Prescription Builder */}
        <section className="mt-8">
          <h2 className="mb-2 text-sm font-semibold text-ink/70">
            Digital Prescription Builder
          </h2>
          <div className="space-y-3 rounded-card border border-hairline p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                value={rxPatient}
                onChange={(e) => setRxPatient(e.target.value)}
                placeholder="Patient name"
                className="rounded-control border border-hairline px-3 py-2 text-sm outline-none focus:border-ink"
              />
              <input
                value={rxPhone}
                onChange={(e) => setRxPhone(e.target.value)}
                placeholder="Patient WhatsApp number (e.g. 923001234567)"
                className="rounded-control border border-hairline px-3 py-2 text-sm outline-none focus:border-ink"
              />
            </div>
            <input
              value={rxDiagnosis}
              onChange={(e) => setRxDiagnosis(e.target.value)}
              placeholder="Diagnosis"
              className="w-full rounded-control border border-hairline px-3 py-2 text-sm outline-none focus:border-ink"
            />
            <textarea
              value={rxMedicines}
              onChange={(e) => setRxMedicines(e.target.value)}
              placeholder={"Medicines, one per line\ne.g. Panadol 500mg — 1 tab twice daily"}
              rows={4}
              className="w-full rounded-control border border-hairline px-3 py-2 text-sm outline-none focus:border-ink"
            />
            <Button onClick={shareOnWhatsApp} disabled={!rxPatient || !rxDiagnosis}>
              <span className="flex items-center gap-1.5">
                <MessageCircle size={15} />
                Share on WhatsApp
              </span>
            </Button>
          </div>
        </section>
      </div>
    </SidebarLayout>
  );
}
