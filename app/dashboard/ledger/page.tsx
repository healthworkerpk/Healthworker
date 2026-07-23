"use client";
import { Wallet } from "lucide-react";
import DoctorPanelPlaceholder from "@/components/DoctorPanelPlaceholder";

export default function LedgerPage() {
  return (
    <DoctorPanelPlaceholder
      title="Financial Ledger & Withdrawals"
      description="Track online net credit vs. on-clinic cash commission debit, plus the secure withdraw request form."
      icon={Wallet}
    />
  );
}
