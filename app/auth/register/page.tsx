"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Stethoscope } from "lucide-react";
import Button from "@/components/Button";
import { registerWithEmail, roleHomePath, UserRole } from "@/lib/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>("patient");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await registerWithEmail(name, email, password, role);
    setLoading(false);
    if (error) {
      setError(error);
      return;
    }
    // Show a clear confirmation before redirecting, instead of jumping
    // straight to the next page with no acknowledgement.
    setSuccess(true);
    setTimeout(() => {
      router.push(roleHomePath(role));
    }, 1600);
  }

  if (success) {
    return (
      <main className="mx-auto flex min-h-screen max-w-sm flex-col items-center justify-center px-4 py-12 text-center">
        <CheckCircle2 size={48} className="text-rausch" />
        <h1 className="mt-4 text-xl font-semibold">Account created!</h1>
        <p className="mt-1 text-sm text-ink/60">
          Welcome to Healthworkers, {name.split(" ")[0]}.{" "}
          {role === "doctor"
            ? "Taking you to your dashboard..."
            : "Taking you to your account..."}
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4 py-12">
      <div className="mb-6 flex flex-col items-center text-center">
        <Link
          href="/"
          aria-label="Back to home"
          className="flex h-10 w-10 items-center justify-center rounded-control bg-rausch text-white transition-transform hover:scale-105"
        >
          <Stethoscope size={20} />
        </Link>
        <h1 className="mt-3 text-xl font-semibold">Create your account</h1>
        <p className="mt-1 text-sm text-ink/60">
          Join Healthworkers as a patient or a doctor.
        </p>
      </div>

      {/* Role toggle */}
      <div className="mb-5 flex rounded-full border border-hairline p-1">
        {(["patient", "doctor"] as UserRole[]).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRole(r)}
            className={
              "flex-1 rounded-full py-2 text-sm font-medium capitalize transition-colors " +
              (role === r ? "bg-ink text-white" : "text-ink/60")
            }
          >
            {r}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-control bg-rausch/10 px-3 py-2 text-sm text-rausch-dark">
            {error}
          </div>
        )}

        <div>
          <label className="mb-1 block text-sm font-medium">Full name</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-control border border-hairline px-3 py-2.5 text-sm outline-none focus:border-ink"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-control border border-hairline px-3 py-2.5 text-sm outline-none focus:border-ink"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Password</label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-control border border-hairline px-3 py-2.5 text-sm outline-none focus:border-ink"
            placeholder="At least 6 characters"
          />
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          {loading
            ? "Creating account..."
            : role === "doctor"
            ? "Sign up as a doctor"
            : "Create account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink/60">
        Already have an account?{" "}
        <Link href="/auth/login" className="font-medium text-rausch">
          Log in
        </Link>
      </p>
    </main>
  );
}
