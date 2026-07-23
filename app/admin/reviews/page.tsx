"use client";
import { MessageSquareWarning } from "lucide-react";
import AdminPanelPlaceholder from "@/components/AdminPanelPlaceholder";

export default function AdminReviewsPage() {
  return (
    <AdminPanelPlaceholder
      title="Review Moderation"
      description="Approve or reject the patient feedback queue here."
      icon={MessageSquareWarning}
    />
  );
}
