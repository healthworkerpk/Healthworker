"use client";
import { Clock } from "lucide-react";
import DoctorPanelPlaceholder from "@/components/DoctorPanelPlaceholder";

export default function SchedulePage() {
  return (
    <DoctorPanelPlaceholder
      title="Schedule & Timings"
      description="Set working days and time slots, plus the Emergency Leave / Close Today toggle that instantly blocks online bookings."
      icon={Clock}
    />
  );
}
