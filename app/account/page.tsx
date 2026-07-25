"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, LogOut, Search } from "lucide-react";
import { useCurrentUser } from "@/lib/useCurrentUser";
import { logout } from "@/lib/auth";
import Button from "@/components/Button";
import BottomTabBar from "@/components/BottomTabBar";

export default function PatientAccountPage() {
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

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 pb-20 md:px-8 md:pb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">
            Hi, {user.displayName?.split(" ")[0] ?? "there"}
          </h1>
          <p className="mt-0.5 text-sm text-ink/60">{user.email}</p>
        </div>
        <button
          onClick={async () => {
            await logout();
            router.push("/");
          }}
          className="flex items-center gap-1.5 rounded-control border border-hairline px-3 py-2 text-sm font-medium hover:bg-surface-soft"
        >
          <LogOut size={14} />
          Log out
        </button>
      </div>

      {/* Upcoming appointments — placeholder until the Booking flow module writes real appointments */}
      <section className="mt-6">
        <h2 className="mb-2 text-sm font-semibold text-ink/70">
          Upcoming appointments
        </h2>
        <div className="rounded-card border border-dashed border-hairline p-8 text-center">
          <CalendarDays size={24} className="mx-auto text-ink/30" />
          <p className="mt-2 text-sm text-ink/60">
            No appointments yet. Find a doctor to book your first visit.
          </p>
          <Button
            className="mt-4"
            onClick={() => router.push("/search")}
          >
            <span className="flex items-center gap-1.5">
              <Search size={14} />
              Find a doctor
            </span>
          </Button>
        </div>
      </section>
      <BottomTabBar />
    </main>
  );
}
