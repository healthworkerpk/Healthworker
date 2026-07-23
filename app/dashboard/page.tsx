"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CalendarCheck, Users, Wallet, TrendingUp } from "lucide-react";
import { useCurrentUser } from "@/lib/useCurrentUser";
import SidebarLayout from "@/components/SidebarLayout";
import { DOCTOR_NAV_ITEMS } from "@/lib/doctor-nav";

const STAT_CARDS = [
  { label: "Today's appointments", value: "0", icon: CalendarCheck },
  { label: "Next patient queue", value: "—", icon: Users },
  { label: "Wallet / ledger balance", value: "Rs. 0", icon: Wallet },
  { label: "Promotion points", value: "0", icon: TrendingUp },
];

export default function DoctorDashboardPage() {
  const router = useRouter();
  const { user, role, loading } = useCurrentUser();

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

  return (
    <SidebarLayout navItems={DOCTOR_NAV_ITEMS}>
      <div className="mx-auto max-w-5xl px-4 py-6 md:px-8 md:py-8">
        <div>
          <h1 className="text-xl font-semibold">
            Welcome, {user.displayName ?? "Doctor"}
          </h1>
          <p className="mt-0.5 text-sm text-ink/60">
            {role === "doctor"
              ? "Doctor dashboard"
              : "This account isn't registered as a doctor."}
          </p>
        </div>

        {/* Stat cards — Doctor Panel §1 Dashboard from the brief */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {STAT_CARDS.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="rounded-card border border-hairline p-4"
            >
              <Icon size={18} className="text-rausch" />
              <p className="mt-2 text-lg font-semibold">{value}</p>
              <p className="text-xs text-ink/60">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-card border border-dashed border-hairline p-8 text-center">
          <p className="text-sm text-ink/60">
            Use the menu to explore Appointments, Profile &amp; Clinics,
            Schedule, Ledger, Promotions, and Reviews — each will be built
            out fully in the next Doctor Panel modules.
          </p>
        </div>
      </div>
    </SidebarLayout>
  );
}
