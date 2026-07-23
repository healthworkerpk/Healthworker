"use client";
import { Stethoscope } from "lucide-react";
import AdminPanelPlaceholder from "@/components/AdminPanelPlaceholder";

export default function AdminDoctorsPage() {
  return (
    <AdminPanelPlaceholder
      title="Doctor Management"
      description="Pending approvals (PMC/PMDC license + rejection reason), approved doctors list, Unbilled/Pending Bills tab, and Banned/Suspended doctors land here."
      icon={Stethoscope}
    />
  );
}
