"use client";
import { MapPin } from "lucide-react";
import AdminPanelPlaceholder from "@/components/AdminPanelPlaceholder";

export default function AdminLocationsPage() {
  return (
    <AdminPanelPlaceholder
      title="Locations & Categories"
      description="Manage areas, tehsils, the Local Adda Manager, and medical specializations (ENT, Dentist, etc.) here."
      icon={MapPin}
    />
  );
}
