"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Stethoscope } from "lucide-react";
import Button from "@/components/Button";
import { loginWithEmail, roleHomePath } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error, role } = await loginWithEmail(email, password);
    setLoading(false);
    if (error) {
      setError(error);
      return;
    }
    // Doctors land on their dashboard, patients on their account page.
    router.push(roleHomePath(role));
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4 py-12">
      <div className="mb-8 flex flex-col items-center text-center">
        <Link
          href="/"
          aria-label="Back to home"
          className="flex h-10 w-10 items-center justify-center rounded-control bg-rausch text-white transition-transform hover:scale-105"
        >
          <Stethoscope size={20} />
        </Link>
        <h1 className="mt-3 text-xl font-semibold">Log in to Healthworkers</h1>
        <p className="mt-1 text-sm text-ink/60">
          Book appointments and manage your visits.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-control bg-rausch/10 px-3 py-2 text-sm text-rausch-dark">
            {error}
          </div>
        )}

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
            placeholder="••••••••"
          />
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          {loading ? "Logging in..." : "Log in"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink/60">
        Don&apos;t have an account?{" "}
        <Link href="/auth/register" className="font-medium text-rausch">
          Sign up
        </Link>
      </p>
    </main>
  );
}
