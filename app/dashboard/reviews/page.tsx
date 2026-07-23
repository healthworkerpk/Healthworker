"use client";
import { Star } from "lucide-react";
import DoctorPanelPlaceholder from "@/components/DoctorPanelPlaceholder";

export default function ReviewsPage() {
  return (
    <DoctorPanelPlaceholder
      title="My Reviews"
      description="See your patient ratings and moderated feedback overview here."
      icon={Star}
    />
  );
}
