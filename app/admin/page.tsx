"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Stethoscope, CalendarCheck, Wallet, Users, ShieldAlert } from "lucide-react";
import { useCurrentUser } from "@/lib/useCurrentUser";
import SidebarLayout from "@/components/SidebarLayout";
import { ADMIN_NAV_ITEMS } from "@/lib/admin-nav";

const STAT_CARDS = [
  { label: "Active doctors", value: "0", icon: Stethoscope },
  { label: "Today's bookings", value: "0", icon: CalendarCheck },
  { label: "Revenue (this month)", value: "Rs. 0", icon: Wallet },
  { label: "Total users", value: "0", icon: Users },
];

export default function AdminDashboardPage() {
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

  if (role !== "admin") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <ShieldAlert size={32} className="text-rausch" />
        <p className="mt-3 text-sm text-ink/60">
          This account doesn&apos;t have admin access. If you're the site
          owner, set your role to &quot;admin&quot; for this account in
          Firestore → users → your uid.
        </p>
      </main>
    );
  }

  return (
    <SidebarLayout navItems={ADMIN_NAV_ITEMS}>
      <div className="mx-auto max-w-5xl px-4 py-6 md:px-8 md:py-8">
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        <p className="mt-0.5 text-sm text-ink/60">
          Live stats across the platform.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {STAT_CARDS.map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-card border border-hairline p-4">
              <Icon size={18} className="text-rausch" />
              <p className="mt-2 text-lg font-semibold">{value}</p>
              <p className="text-xs text-ink/60">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-card border border-dashed border-hairline p-8 text-center">
          <p className="text-sm text-ink/60">
            These figures populate once doctors, bookings, and payments are
            live via Firestore — the Policy Engine module wires the
            Collections screen and auto-hide-on-expiry rule into this data.
          </p>
        </div>
      </div>
    </SidebarLayout>
  );
}
