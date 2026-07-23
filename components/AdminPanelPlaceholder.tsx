"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LucideIcon, ShieldAlert } from "lucide-react";
import SidebarLayout from "./SidebarLayout";
import { ADMIN_NAV_ITEMS } from "@/lib/admin-nav";
import { useCurrentUser } from "@/lib/useCurrentUser";

export default function AdminPanelPlaceholder({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
}) {
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
          This account doesn&apos;t have admin access.
        </p>
      </main>
    );
  }

  return (
    <SidebarLayout navItems={ADMIN_NAV_ITEMS}>
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
