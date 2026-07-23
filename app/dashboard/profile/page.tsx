"use client";
import { Building2 } from "lucide-react";
import DoctorPanelPlaceholder from "@/components/DoctorPanelPlaceholder";

export default function ProfilePage() {
  return (
    <DoctorPanelPlaceholder
      title="Profile & Multi-Clinic Setup"
      description="Manage shifts across multiple clinic locations, timings, consultation fees, and your PMC/PMDC license details here."
      icon={Building2}
    />
  );
}
