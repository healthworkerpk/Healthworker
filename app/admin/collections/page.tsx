"use client";
import { ReceiptText } from "lucide-react";
import AdminPanelPlaceholder from "@/components/AdminPanelPlaceholder";

export default function AdminCollectionsPage() {
  return (
    <AdminPanelPlaceholder
      title="Collections & Billing"
      description="Search a doctor, enter received date & bill amount — the Policy Engine instantly calculates validity days and reactivates their panel."
      icon={ReceiptText}
    />
  );
}
