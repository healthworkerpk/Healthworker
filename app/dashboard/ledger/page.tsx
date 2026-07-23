"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { CheckCircle2 } from "lucide-react";
import { useCurrentUser } from "@/lib/useCurrentUser";
import { db } from "@/lib/firebase";
import SidebarLayout from "@/components/SidebarLayout";
import { DOCTOR_NAV_ITEMS } from "@/lib/doctor-nav";
import Button from "@/components/Button";

interface LedgerRow {
  id: string;
  type: "credit_online" | "debit_commission";
  amount: number;
  note: string;
  date: string;
}

// Placeholder ledger — swap for a live Firestore query once bookings and
// on-clinic cash entries write real ledger docs (lib/schema.ts LedgerEntryDoc).
const LEDGER: LedgerRow[] = [
  { id: "l1", type: "credit_online", amount: 2000, note: "Online booking — Hassan R.", date: "Jul 22" },
  { id: "l2", type: "debit_commission", amount: -150, note: "Platform commission", date: "Jul 22" },
  { id: "l3", type: "credit_online", amount: 1800, note: "Online booking — Fatima S.", date: "Jul 21" },
];

export default function LedgerPage() {
  const router = useRouter();
  const { user, loading } = useCurrentUser();

  const [bankName, setBankName] = useState("");
  const [accountTitle, setAccountTitle] = useState("");
  const [iban, setIban] = useState("");
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  const netBalance = LEDGER.reduce((sum, row) => sum + row.amount, 0);

  async function handleWithdrawRequest(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    await addDoc(collection(db, "withdrawalRequests"), {
      doctorId: user.uid,
      bankName,
      accountTitle,
      iban,
      amount: Number(amount) || 0,
      status: "pending",
      createdAt: serverTimestamp(),
    });
    setSubmitting(false);
    setSubmitted(true);
    setBankName("");
    setAccountTitle("");
    setIban("");
    setAmount("");
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <SidebarLayout navItems={DOCTOR_NAV_ITEMS}>
      <div className="mx-auto max-w-2xl px-4 py-6 md:px-8 md:py-8">
        <h1 className="text-xl font-semibold">Financial Ledger &amp; Withdrawals</h1>

        <div className="mt-5 rounded-card border border-hairline p-4">
          <p className="text-xs text-ink/60">Net balance</p>
          <p className="text-2xl font-semibold">Rs. {netBalance.toLocaleString()}</p>
        </div>

        <section className="mt-6">
          <h2 className="mb-2 text-sm font-semibold text-ink/70">Recent entries</h2>
          <div className="space-y-2">
            {LEDGER.map((row) => (
              <div
                key={row.id}
                className="flex items-center justify-between rounded-card border border-hairline p-3"
              >
                <div>
                  <p className="text-sm font-medium">{row.note}</p>
                  <p className="text-xs text-ink/60">{row.date}</p>
                </div>
                <span
                  className={
                    "text-sm font-semibold " +
                    (row.amount >= 0 ? "text-ink" : "text-rausch")
                  }
                >
                  {row.amount >= 0 ? "+" : ""}
                  Rs. {row.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="mb-2 text-sm font-semibold text-ink/70">
            Withdraw request
          </h2>
          <form
            onSubmit={handleWithdrawRequest}
            className="space-y-3 rounded-card border border-hairline p-4"
          >
            <input
              required
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="Bank name"
              className="w-full rounded-control border border-hairline px-3 py-2 text-sm outline-none focus:border-ink"
            />
            <input
              required
              value={accountTitle}
              onChange={(e) => setAccountTitle(e.target.value)}
              placeholder="Account title"
              className="w-full rounded-control border border-hairline px-3 py-2 text-sm outline-none focus:border-ink"
            />
            <input
              required
              value={iban}
              onChange={(e) => setIban(e.target.value)}
              placeholder="IBAN"
              className="w-full rounded-control border border-hairline px-3 py-2 text-sm outline-none focus:border-ink"
            />
            <input
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount (Rs.)"
              inputMode="numeric"
              className="w-full rounded-control border border-hairline px-3 py-2 text-sm outline-none focus:border-ink"
            />
            <Button type="submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit request"}
            </Button>
            {submitted && (
              <span className="flex items-center gap-1.5 text-sm text-rausch">
                <CheckCircle2 size={15} />
                Request submitted — the admin will review it.
              </span>
            )}
          </form>
        </section>
      </div>
    </SidebarLayout>
  );
}
