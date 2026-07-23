"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Tag, CheckCircle2 } from "lucide-react";
import { useCurrentUser } from "@/lib/useCurrentUser";
import { db } from "@/lib/firebase";
import SidebarLayout from "@/components/SidebarLayout";
import { DOCTOR_NAV_ITEMS } from "@/lib/doctor-nav";
import Button from "@/components/Button";

interface Promo {
  title: string;
  discountPercent: string;
  validUntil: string;
}

export default function PromotionsPage() {
  const router = useRouter();
  const { user, loading } = useCurrentUser();

  const [form, setForm] = useState<Promo>({
    title: "",
    discountPercent: "",
    validUntil: "",
  });
  const [created, setCreated] = useState<Promo[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push("/auth/login");
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-ink/50">Loading...</p>
      </main>
    );
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    await addDoc(collection(db, "promotions"), {
      doctorId: user.uid,
      title: form.title,
      discountPercent: Number(form.discountPercent) || 0,
      validUntil: form.validUntil,
      createdAt: serverTimestamp(),
    });
    setCreated((prev) => [form, ...prev]);
    setForm({ title: "", discountPercent: "", validUntil: "" });
    setSaving(false);
  }

  return (
    <SidebarLayout navItems={DOCTOR_NAV_ITEMS}>
      <div className="mx-auto max-w-2xl px-4 py-6 md:px-8 md:py-8">
        <h1 className="text-xl font-semibold">Self-Promotion &amp; Discounts</h1>
        <p className="mt-1 text-sm text-ink/60">
          Create a Daraz-style flash sale for your own clinic fees.
        </p>

        <form
          onSubmit={handleCreate}
          className="mt-5 space-y-3 rounded-card border border-hairline p-4"
        >
          <input
            required
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="Offer title, e.g. Eid Special — 20% off"
            className="w-full rounded-control border border-hairline px-3 py-2 text-sm outline-none focus:border-ink"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              required
              value={form.discountPercent}
              onChange={(e) =>
                setForm((f) => ({ ...f, discountPercent: e.target.value }))
              }
              placeholder="Discount %"
              inputMode="numeric"
              className="rounded-control border border-hairline px-3 py-2 text-sm outline-none focus:border-ink"
            />
            <input
              required
              type="date"
              value={form.validUntil}
              onChange={(e) =>
                setForm((f) => ({ ...f, validUntil: e.target.value }))
              }
              className="rounded-control border border-hairline px-3 py-2 text-sm outline-none focus:border-ink"
            />
          </div>
          <Button type="submit" disabled={saving}>
            {saving ? "Creating..." : "Create offer"}
          </Button>
        </form>

        {created.length > 0 && (
          <section className="mt-6">
            <h2 className="mb-2 text-sm font-semibold text-ink/70">
              Active offers
            </h2>
            <div className="space-y-2">
              {created.map((promo, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-card border border-hairline p-3"
                >
                  <div className="flex items-center gap-2">
                    <Tag size={15} className="text-rausch" />
                    <div>
                      <p className="text-sm font-medium">{promo.title}</p>
                      <p className="text-xs text-ink/60">
                        {promo.discountPercent}% off · valid until {promo.validUntil}
                      </p>
                    </div>
                  </div>
                  <CheckCircle2 size={16} className="text-rausch" />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </SidebarLayout>
  );
}
