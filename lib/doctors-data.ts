import { Doctor } from "@/components/DoctorCard";

export interface DoctorProfile extends Doctor {
  bio: string;
  experienceYears: number;
  languages: string[];
  clinics: {
    clinicName: string;
    area: string;
    address: string;
    shiftLabel: string; // e.g. "Mon–Sat, 6:00 PM – 9:00 PM"
    fee: number;
  }[];
  gallery: string[];
  reviews: {
    id: string;
    patientName: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

// Placeholder data — swap for a Firestore query (lib/schema.ts DoctorDoc)
// once the backend module is wired up. Keep the id format (kebab-case)
// consistent since it doubles as the /doctor/[id] route param.
export const DOCTORS: DoctorProfile[] = [
  {
    id: "dr-amina-khalid",
    name: "Dr. Amina Khalid",
    specialization: "Cardiologist",
    area: "Cantt, Multan",
    clinicName: "Heart Care Clinic",
    rating: 4.9,
    reviewCount: 212,
    fee: 2000,
    photoUrl:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=80",
    verified: true,
    nextAvailable: "Today, 6:30 PM",
    bio: "Dr. Amina Khalid is a board-certified cardiologist focused on preventive heart care, hypertension management, and non-invasive cardiac diagnostics.",
    experienceYears: 14,
    languages: ["Urdu", "English", "Punjabi"],
    clinics: [
      {
        clinicName: "Heart Care Clinic",
        area: "Cantt, Multan",
        address: "12-B, Cantt Road, near Askari Park",
        shiftLabel: "Mon–Sat, 5:00 PM – 9:00 PM",
        fee: 2000,
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&q=80",
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
    ],
    reviews: [
      {
        id: "r1",
        patientName: "Hassan R.",
        rating: 5,
        comment:
          "Very thorough consultation and clearly explained my ECG results.",
        date: "2 weeks ago",
      },
      {
        id: "r2",
        patientName: "Fatima S.",
        rating: 5,
        comment: "Short wait time and the clinic staff were helpful.",
        date: "1 month ago",
      },
    ],
  },
  {
    id: "dr-bilal-ahmed",
    name: "Dr. Bilal Ahmed",
    specialization: "Dentist",
    area: "Gulgasht, Multan",
    clinicName: "Smile Studio",
    rating: 4.7,
    reviewCount: 98,
    fee: 1500,
    photoUrl:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&q=80",
    verified: true,
    nextAvailable: "Tomorrow, 10:00 AM",
    bio: "Dr. Bilal Ahmed specializes in general and cosmetic dentistry, including root canal treatment, teeth whitening, and dental implants.",
    experienceYears: 9,
    languages: ["Urdu", "English"],
    clinics: [
      {
        clinicName: "Smile Studio",
        area: "Gulgasht, Multan",
        address: "45-A, Gulgasht Colony, opposite City Hospital",
        shiftLabel: "Mon–Sat, 10:00 AM – 8:00 PM",
        fee: 1500,
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80",
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80",
    ],
    reviews: [
      {
        id: "r1",
        patientName: "Ayesha K.",
        rating: 5,
        comment: "Painless filling, very gentle approach.",
        date: "3 days ago",
      },
      {
        id: "r2",
        patientName: "Usman T.",
        rating: 4,
        comment: "Good service, slightly long waiting time.",
        date: "2 weeks ago",
      },
    ],
  },
  {
    id: "dr-sana-riaz",
    name: "Dr. Sana Riaz",
    specialization: "Gynecologist",
    area: "Shah Rukn-e-Alam, Multan",
    clinicName: "Wellness Women's Clinic",
    rating: 4.8,
    reviewCount: 156,
    fee: 1800,
    photoUrl:
      "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=600&q=80",
    verified: true,
    nextAvailable: "Today, 4:00 PM",
    bio: "Dr. Sana Riaz provides comprehensive women's health care including prenatal checkups, family planning, and gynecological screenings.",
    experienceYears: 11,
    languages: ["Urdu", "English", "Saraiki"],
    clinics: [
      {
        clinicName: "Wellness Women's Clinic",
        area: "Shah Rukn-e-Alam, Multan",
        address: "8-C, Shah Rukn-e-Alam Colony",
        shiftLabel: "Mon–Fri, 3:00 PM – 7:00 PM",
        fee: 1800,
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80",
      "https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?w=800&q=80",
    ],
    reviews: [
      {
        id: "r1",
        patientName: "Mahnoor A.",
        rating: 5,
        comment: "Very caring and patient with all my questions.",
        date: "1 week ago",
      },
      {
        id: "r2",
        patientName: "Zainab I.",
        rating: 5,
        comment: "Excellent doctor, highly recommended.",
        date: "3 weeks ago",
      },
    ],
  },
];

export function getDoctorById(id: string): DoctorProfile | undefined {
  return DOCTORS.find((d) => d.id === id);
}
