"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { Plus, Trash2, UploadCloud, CheckCircle2 } from "lucide-react";
import { useCurrentUser } from "@/lib/useCurrentUser";
import { db } from "@/lib/firebase";
import { uploadToCloudinary } from "@/lib/cloudinary";
import SidebarLayout from "@/components/SidebarLayout";
import { DOCTOR_NAV_ITEMS } from "@/lib/doctor-nav";
import Button from "@/components/Button";

interface ClinicRow {
  clinicName: string;
  area: string;
  address: string;
  shiftLabel: string;
  fee: string;
}

const EMPTY_CLINIC: ClinicRow = {
  clinicName: "",
  area: "",
  address: "",
  shiftLabel: "",
  fee: "",
};

export default function DoctorProfilePage() {
  const router = useRouter();
  const { user, loading } = useCurrentUser();

  const [specialization, setSpecialization] = useState("");
  const [pmcNumber, setPmcNumber] = useState("");
  const [pmcLicenseUrl, setPmcLicenseUrl] = useState("");
  const [clinics, setClinics] = useState<ClinicRow[]>([{ ...EMPTY_CLINIC }]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.push("/auth/login");
  }, [loading, user, router]);

  // Load any previously saved doctor profile doc
  useEffect(() => {
    async function load() {
      if (!user) return;
      const snap = await getDoc(doc(db, "doctors", user.uid));
      if (snap.exists()) {
        const data = snap.data();
        setSpecialization(data.specialization ?? "");
        setPmcNumber(data.pmcLicenseNumber ?? "");
        setPmcLicenseUrl(data.pmcLicenseUrl ?? "");
        if (Array.isArray(data.clinics) && data.clinics.length > 0) {
          setClinics(
            data.clinics.map((c: any) => ({
              clinicName: c.clinicName ?? "",
              area: c.area ?? "",
              address: c.address ?? "",
              shiftLabel: c.shiftLabel ?? "",
              fee: String(c.fee ?? ""),
            }))
          );
        }
      }
      setLoadingProfile(false);
    }
    load();
  }, [user]);

  if (loading || !user || loadingProfile) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-ink/50">Loading...</p>
      </main>
    );
  }

  function updateClinic(index: number, field: keyof ClinicRow, value: string) {
    setClinics((prev) =>
      prev.map((c, i) => (i === index ? { ...c, [field]: value } : c))
    );
  }

  async function handleLicenseUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file, "pmc-licenses");
      setPmcLicenseUrl(url);
    } catch {
      alert("Upload failed. Check Cloudinary is configured (see .env.local).");
    } finally {
      setUploading(false);
    }
  }

  async function handleSave() {
    if (!user) return;
    setSaving(true);
    await setDoc(
      doc(db, "doctors", user.uid),
      {
        name: user.displayName,
        specialization,
        pmcLicenseNumber: pmcNumber,
        pmcLicenseUrl,
        status: "pending_approval",
        clinics: clinics
          .filter((c) => c.clinicName)
          .map((c) => ({ ...c, fee: Number(c.fee) || 0, emergencyClosedToday: false })),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <SidebarLayout navItems={DOCTOR_NAV_ITEMS}>
      <div className="mx-auto max-w-3xl px-4 py-6 md:px-8 md:py-8">
        <h1 className="text-xl font-semibold">Profile &amp; Multi-Clinic Setup</h1>
        <p className="mt-1 text-sm text-ink/60">
          This information is reviewed by the admin before your profile goes
          live in the public directory.
        </p>

        {/* Specialization + license */}
        <section className="mt-6 space-y-3 rounded-card border border-hairline p-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Specialization</label>
            <input
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              placeholder="e.g. Cardiologist"
              className="w-full rounded-control border border-hairline px-3 py-2 text-sm outline-none focus:border-ink"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              PMC / PMDC license number
            </label>
            <input
              value={pmcNumber}
              onChange={(e) => setPmcNumber(e.target.value)}
              placeholder="e.g. PMC-12345"
              className="w-full rounded-control border border-hairline px-3 py-2 text-sm outline-none focus:border-ink"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              License document / photo
            </label>
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-control border border-dashed border-hairline px-3 py-6 text-sm text-ink/60 hover:bg-surface-soft">
              <UploadCloud size={16} />
              {uploading
                ? "Uploading..."
                : pmcLicenseUrl
                ? "Uploaded — tap to replace"
                : "Tap to upload"}
              <input
                type="file"
                accept="image/*,application/pdf"
                className="hidden"
                onChange={handleLicenseUpload}
              />
            </label>
          </div>
        </section>

        {/* Multi-clinic list */}
        <section className="mt-6">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-ink/70">Clinics</h2>
            <button
              onClick={() => setClinics((prev) => [...prev, { ...EMPTY_CLINIC }])}
              className="flex items-center gap-1 text-sm font-medium text-rausch"
            >
              <Plus size={14} />
              Add clinic
            </button>
          </div>
          <div className="space-y-3">
            {clinics.map((clinic, i) => (
              <div key={i} className="rounded-card border border-hairline p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-medium text-ink/50">
                    Clinic {i + 1}
                  </span>
                  {clinics.length > 1 && (
                    <button
                      onClick={() =>
                        setClinics((prev) => prev.filter((_, idx) => idx !== i))
                      }
                      aria-label="Remove clinic"
                      className="text-ink/40 hover:text-rausch"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    value={clinic.clinicName}
                    onChange={(e) => updateClinic(i, "clinicName", e.target.value)}
                    placeholder="Clinic name"
                    className="rounded-control border border-hairline px-3 py-2 text-sm outline-none focus:border-ink"
                  />
                  <input
                    value={clinic.area}
                    onChange={(e) => updateClinic(i, "area", e.target.value)}
                    placeholder="Area / Tehsil"
                    className="rounded-control border border-hairline px-3 py-2 text-sm outline-none focus:border-ink"
                  />
                  <input
                    value={clinic.address}
                    onChange={(e) => updateClinic(i, "address", e.target.value)}
                    placeholder="Full address"
                    className="rounded-control border border-hairline px-3 py-2 text-sm outline-none focus:border-ink sm:col-span-2"
                  />
                  <input
                    value={clinic.shiftLabel}
                    onChange={(e) => updateClinic(i, "shiftLabel", e.target.value)}
                    placeholder="Shift, e.g. Mon–Sat, 5–9 PM"
                    className="rounded-control border border-hairline px-3 py-2 text-sm outline-none focus:border-ink"
                  />
                  <input
                    value={clinic.fee}
                    onChange={(e) => updateClinic(i, "fee", e.target.value)}
                    placeholder="Consultation fee (Rs.)"
                    inputMode="numeric"
                    className="rounded-control border border-hairline px-3 py-2 text-sm outline-none focus:border-ink"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-6 flex items-center gap-3">
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save profile"}
          </Button>
          {saved && (
            <span className="flex items-center gap-1.5 text-sm text-rausch">
              <CheckCircle2 size={15} />
              Saved
            </span>
          )}
        </div>
      </div>
    </SidebarLayout>
  );
}
