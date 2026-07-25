"use client";

import { usePathname, useRouter } from "next/navigation";
import { Home, CalendarDays, MessageCircle, User } from "lucide-react";
import { useCurrentUser } from "@/lib/useCurrentUser";

export default function BottomTabBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, role } = useCurrentUser();

  function goProfile() {
    if (!user) return router.push("/auth/login");
    router.push(role === "doctor" ? "/dashboard" : "/account");
  }

  function goAppointments() {
    if (!user) return router.push("/auth/login");
    router.push(role === "doctor" ? "/dashboard/appointments" : "/account");
  }

  const tabs = [
    { label: "Home", icon: Home, active: pathname === "/", onClick: () => router.push("/") },
    {
      label: "Appointments",
      icon: CalendarDays,
      active: pathname.includes("appointments") || pathname === "/account",
      onClick: goAppointments,
    },
    {
      label: "Chat",
      icon: MessageCircle,
      active: pathname === "/chat",
      onClick: () => router.push(user ? "/chat" : "/auth/login"),
    },
    {
      label: "Profile",
      icon: User,
      active: pathname === "/dashboard" || pathname === "/account",
      onClick: goProfile,
    },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-hairline bg-canvas px-2 py-2 md:hidden">
      {tabs.map(({ label, icon: Icon, active, onClick }) => (
        <button
          key={label}
          onClick={onClick}
          className="flex flex-1 flex-col items-center gap-0.5 py-1"
        >
          <Icon size={20} className={active ? "text-rausch" : "text-ink/50"} />
          <span
            className={
              "text-[11px] font-medium " + (active ? "text-rausch" : "text-ink/50")
            }
          >
            {label}
          </span>
        </button>
      ))}
    </nav>
  );
}
