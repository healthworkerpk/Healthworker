"use client";
import { Megaphone } from "lucide-react";
import AdminPanelPlaceholder from "@/components/AdminPanelPlaceholder";

export default function AdminAdsPage() {
  return (
    <AdminPanelPlaceholder
      title="Ads & Banner Management"
      description="Home page flash sales, discount offers, and sponsored doctor banners land here."
      icon={Megaphone}
    />
  );
}
