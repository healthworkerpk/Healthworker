"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { BadgeCheck, ShieldAlert, XCircle, FileText } from "lucide-react";
import { useCurrentUser } from "@/lib/useCurrentUser";
import { db } from "@/lib/firebase";
import SidebarLayout from "@/components/SidebarLayout";
import { ADMIN_NAV_ITEMS } from "@/lib/admin-nav";
import Button from "@/components/Button";

interface DoctorRow {
  id: string;
  name?: string;
  specialization?: string;
  pmcLicenseNumber?: string;
  pmcLicenseUrl?: string;
  status?: string;
  rejectionReason?: string;
}

const TABS = [
  { key: "pending_approval", label: "Pending Approvals" },
  { key: "active", label: "Approved" },
  { key: "unbilled", label: "Unbilled" },
  { key: "suspended", label: "Banned / Suspended" },
] as const;

export default function AdminDoctorsPage() {
  const router = useRouter();
  const { user, role, loading } = useCurrentUser();
  const [doctors, setDoctors] = useState<DoctorRow[]>([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("pending_approval");
  const [rejectReason, setRejectReason] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!loading && !user) router.push("/auth/login");
  }, [loading, user, router]);

  useEffect(() => {
    async function load() {
      const snap = await getDocs(collection(db, "doctors"));
      setDoctors(snap.docs.map((d) => ({ id: d.id, ...d.data() } as DoctorRow)));
      setLoadingDoctors(false);
    }
    if (role === "admin") load();
  }, [role]);

  async function setStatus(id: string, status: string, reason?: string) {
    await updateDoc(doc(db, "doctors", id), {
      status,
      ...(reason ? { rejectionReason: reason } : {}),
    });
    setDoctors((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status, rejectionReason: reason ?? d.rejectionReason } : d))
    );
  }

  if (loading || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-ink/50">Loading...</p>
      </main>
    );
  }

  if (role !== "admin") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <ShieldAlert size={32} className="text-rausch" />
        <p className="mt-3 text-sm text-ink/60">This account doesn&apos;t have admin access.</p>
      </main>
    );
  }

  const filtered = doctors.filter((d) => (d.status ?? "pending_approval") === tab);

  return (
    <SidebarLayout navItems={ADMIN_NAV_ITEMS}>
      <div className="mx-auto max-w-3xl px-4 py-6 md:px-8 md:py-8">
        <h1 className="text-xl font-semibold">Doctor Management</h1>

        {/* Tabs */}
        <div className="mt-4 flex gap-2 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={
                "shrink-0 rounded-full border px-4 py-2 text-sm font-medium " +
                (tab === t.key
                  ? "border-ink bg-ink text-white"
                  : "border-hairline text-ink/60 hover:border-ink")
              }
            >
              {t.label}
            </button>
          ))}
        </div>

        {loadingDoctors ? (
          <p className="mt-6 text-sm text-ink/50">Loading doctors...</p>
        ) : filtered.length === 0 ? (
          <div className="mt-6 rounded-card border border-dashed border-hairline p-10 text-center">
            <p className="text-sm text-ink/60">No doctors in this list yet.</p>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {filtered.map((d) => (
              <div key={d.id} className="rounded-card border border-hairline p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{d.name ?? "(no name set)"}</p>
                    <p className="text-sm text-ink/60">{d.specialization ?? "—"}</p>
                    <p className="mt-1 text-xs text-ink/50">
                      PMC #: {d.pmcLicenseNumber ?? "—"}
                    </p>
                    {d.pmcLicenseUrl && (
                      <a
                        href={d.pmcLicenseUrl}
                        target="_blank"
                        className="mt-1 flex items-center gap-1 text-xs font-medium text-rausch"
                      >
                        <FileText size={12} />
                        View license
                      </a>
                    )}
                    {d.rejectionReason && (
                      <p className="mt-1 text-xs text-rausch">
                        Reason: {d.rejectionReason}
                      </p>
                    )}
                  </div>

                  {tab === "pending_approval" && (
                    <div className="flex shrink-0 gap-2">
                      <button
                        onClick={() => setStatus(d.id, "active")}
                        aria-label="Approve"
                        className="flex h-8 w-8 items-center justify-center rounded-control border border-hairline text-ink/60 hover:bg-surface-soft"
                      >
                        <BadgeCheck size={15} />
                      </button>
                      <button
                        onClick={() =>
                          setStatus(d.id, "rejected", rejectReason[d.id] || "Not specified")
                        }
                        aria-label="Reject"
                        className="flex h-8 w-8 items-center justify-center rounded-control border border-hairline text-ink/60 hover:bg-surface-soft"
                      >
                        <XCircle size={15} />
                      </button>
                    </div>
                  )}

                  {tab === "active" && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setStatus(d.id, "suspended")}
                    >
                      Suspend
                    </Button>
                  )}

                  {tab === "suspended" && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setStatus(d.id, "active")}
                    >
                      Reactivate
                    </Button>
                  )}
                </div>

                {tab === "pending_approval" && (
                  <input
                    value={rejectReason[d.id] ?? ""}
                    onChange={(e) =>
                      setRejectReason((prev) => ({ ...prev, [d.id]: e.target.value }))
                    }
                    placeholder="Rejection reason (used if you reject)"
                    className="mt-3 w-full rounded-control border border-hairline px-3 py-2 text-xs outline-none focus:border-ink"
                  />
                )}

                {tab === "unbilled" && (
                  <p className="mt-2 text-xs text-ink/60">
                    Hidden from the public directory. Doctor sees "Pay your
                    bill to reactivate your panel" on login. Go to{" "}
                    <button
                      onClick={() => router.push("/admin/collections")}
                      className="font-medium text-rausch underline"
                    >
                      Collections
                    </button>{" "}
                    to reactivate.
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </SidebarLayout>
  );
}
