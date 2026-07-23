import {
  LayoutDashboard,
  Stethoscope,
  ReceiptText,
  Landmark,
  Megaphone,
  Settings2,
  MapPin,
  MessageSquareWarning,
} from "lucide-react";
import { SidebarNavItem } from "@/components/SidebarLayout";

// Mirrors the brief's "Admin Panel Dashboard & Menu Structure" §1–8.
export const ADMIN_NAV_ITEMS: SidebarNavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Doctor Management", href: "/admin/doctors", icon: Stethoscope },
  { label: "Collections & Billing", href: "/admin/collections", icon: ReceiptText },
  { label: "Financial Ledger", href: "/admin/ledger", icon: Landmark },
  { label: "Ads & Banners", href: "/admin/ads", icon: Megaphone },
  { label: "Policy Engine", href: "/admin/policy", icon: Settings2 },
  { label: "Locations & Categories", href: "/admin/locations", icon: MapPin },
  { label: "Review Moderation", href: "/admin/reviews", icon: MessageSquareWarning },
];
