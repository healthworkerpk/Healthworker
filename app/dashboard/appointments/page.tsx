"use client";
import { CalendarCheck } from "lucide-react";
import DoctorPanelPlaceholder from "@/components/DoctorPanelPlaceholder";

export default function AppointmentsPage() {
  return (
    <DoctorPanelPlaceholder
      title="Appointments Manager"
      description="Today's & upcoming bookings, cancelled/no-show slot release, and the digital letterhead/prescription builder land here."
      icon={CalendarCheck}
    />
  );
}
