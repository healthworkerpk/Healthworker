/**
 * Firestore collection schema for Healthworkers.
 * This file is documentation-as-code: it defines the shape of each
 * top-level collection so every module (admin, doctor, public) reads
 * and writes consistent fields. Mirror these types in security rules.
 */

export type DoctorStatus =
  | "pending_approval"
  | "active"
  | "unbilled"
  | "suspended"
  | "rejected";

export interface DoctorDoc {
  id: string;
  name: string;
  specialization: string;
  pmcLicenseNumber: string;
  pmcLicenseUrl: string; // Cloudinary URL
  photoUrl: string; // Cloudinary URL
  status: DoctorStatus;
  rejectionReason?: string;
  clinics: ClinicLocation[];
  billing: {
    lastPaidAt: string | null; // ISO date
    validUntil: string | null; // ISO date, drives the auto-hide rule
    pendingAmount: number;
  };
  ratingAvg: number;
  ratingCount: number;
  createdAt: string;
}

export interface ClinicLocation {
  clinicName: string;
  area: string;
  tehsil: string;
  address: string;
  shifts: { day: string; start: string; end: string; fee: number }[];
  emergencyClosedToday: boolean;
}

export interface AppointmentDoc {
  id: string;
  doctorId: string;
  patientId: string;
  clinicName: string;
  slotStart: string; // ISO datetime
  status: "booked" | "completed" | "cancelled" | "no_show";
  fee: number;
  createdAt: string;
}

export interface LedgerEntryDoc {
  id: string;
  doctorId: string;
  type: "credit_online" | "debit_commission" | "debit_withdrawal";
  amount: number;
  note: string;
  createdAt: string;
}

export interface BillingCollectionDoc {
  id: string;
  doctorId: string;
  amountReceived: number;
  receivedDate: string; // ISO date
  validityDaysGranted: number; // computed by the Policy Engine
  collectedBy: string; // admin uid
  createdAt: string;
}

export interface PolicyRuleDoc {
  id: string;
  amount: number;
  validityDays: number;
}

export interface ReviewDoc {
  id: string;
  doctorId: string;
  patientId: string;
  rating: number;
  comment: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export interface UserDoc {
  id: string; // matches the Firebase Auth uid
  name: string;
  email: string;
  role: "patient" | "doctor";
  createdAt: string;
}
