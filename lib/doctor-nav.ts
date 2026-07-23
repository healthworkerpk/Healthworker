import {
  LayoutDashboard,
  CalendarCheck,
  Building2,
  Clock,
  Wallet,
  Megaphone,
  Star,
} from "lucide-react";
import { SidebarNavItem } from "@/components/SidebarLayout";

// Mirrors the brief's "Doctor Panel Menu Structure" section 1–7.
export const DOCTOR_NAV_ITEMS: SidebarNavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Appointments", href: "/dashboard/appointments", icon: CalendarCheck },
  { label: "Profile & Clinics", href: "/dashboard/profile", icon: Building2 },
  { label: "Schedule & Timings", href: "/dashboard/schedule", icon: Clock },
  { label: "Ledger & Withdrawals", href: "/dashboard/ledger", icon: Wallet },
  { label: "Promotions", href: "/dashboard/promotions", icon: Megaphone },
  { label: "My Reviews", href: "/dashboard/reviews", icon: Star },
];
