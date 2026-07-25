// Single source of truth for doctor specializations — used by the
// search page's category filter, the home page category row, and the
// pill strip, so they never drift out of sync.
export interface SpecializationOption {
  label: string;
  specialization: string;
  emoji: string;
}

export const SPECIALIZATIONS: SpecializationOption[] = [
  { label: "General", specialization: "General Physician", emoji: "🩺" },
  { label: "Cardiology", specialization: "Cardiologist", emoji: "❤️" },
  { label: "Dental", specialization: "Dentist", emoji: "🦷" },
  { label: "Gynecology", specialization: "Gynecologist", emoji: "🤰" },
  { label: "Skin", specialization: "Dermatologist", emoji: "✨" },
  { label: "ENT", specialization: "ENT Specialist", emoji: "👂" },
  { label: "Orthopedic", specialization: "Orthopedic", emoji: "🦴" },
  { label: "Child Care", specialization: "Pediatrician", emoji: "👶" },
  { label: "Mental Health", specialization: "Psychiatrist", emoji: "🧠" },
  { label: "Urology", specialization: "Urologist", emoji: "💧" },
];
