"use client";
import { Landmark } from "lucide-react";
import AdminPanelPlaceholder from "@/components/AdminPanelPlaceholder";

export default function AdminLedgerPage() {
  return (
    <AdminPanelPlaceholder
      title="Financial & Ledger Management"
      description="All doctors' ledger (Dr / Cr / Net Balance view) and withdrawal requests land here."
      icon={Landmark}
    />
  );
}
