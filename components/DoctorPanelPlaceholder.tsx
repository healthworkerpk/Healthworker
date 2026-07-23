"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LucideIcon } from "lucide-react";
import SidebarLayout from "./SidebarLayout";
import { DOCTOR_NAV_ITEMS } from "@/lib/doctor-nav";
import { useCurrentUser } from "@/lib/useCurrentUser";

export default function DoctorPanelPlaceholder({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
}) {
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
    <SidebarLayout navItems={DOCTOR_NAV_ITEMS}>
      <div className="mx-auto max-w-3xl px-4 py-8 md:px-8">
        <h1 className="text-xl font-semibold">{title}</h1>
        <div className="mt-6 rounded-card border border-dashed border-hairline p-10 text-center">
          <Icon size={28} className="mx-auto text-ink/30" />
          <p className="mt-3 text-sm text-ink/60">{description}</p>
        </div>
      </div>
    </SidebarLayout>
  );
}
