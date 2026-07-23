"use client";
import { Megaphone } from "lucide-react";
import DoctorPanelPlaceholder from "@/components/DoctorPanelPlaceholder";

export default function PromotionsPage() {
  return (
    <DoctorPanelPlaceholder
      title="Self-Promotion & Discounts"
      description="Create Daraz-style flash sale and discount offers for your own clinic fees."
      icon={Megaphone}
    />
  );
}
