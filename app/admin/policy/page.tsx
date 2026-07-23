"use client";
import { Settings2 } from "lucide-react";
import AdminPanelPlaceholder from "@/components/AdminPanelPlaceholder";

export default function AdminPolicyPage() {
  return (
    <AdminPanelPlaceholder
      title="Policy Engine & Settings"
      description="Commission rate settings and panel rent / subscription rules (amount vs. days validity) land here."
      icon={Settings2}
    />
  );
}
