"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, Stethoscope } from "lucide-react";
import Button from "./Button";

const NAV_LINKS = [
  { label: "Find a doctor", href: "/search" },
  // Routes to signup with the doctor role preselected until a dedicated
  // "for clinics" landing page exists as its own module.
  { label: "For clinics", href: "/auth/register" },
];

export default function NavBar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-canvas">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <a href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-control bg-rausch text-white">
            <Stethoscope size={18} />
          </span>
          <span className="text-lg font-semibold tracking-tight">
            Healthworkers
          </span>
        </a>

        {/* Desktop links */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink hover:text-rausch"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a href="/auth/login" className="text-sm font-medium px-3 py-2">
            Log in
          </a>
          <Button size="sm" onClick={() => router.push("/auth/register")}>
            List your clinic
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          className="rounded-control p-2 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile sheet */}
      {open && (
        <div className="border-t border-hairline px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-control px-3 py-3 text-sm font-medium hover:bg-surface-soft"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-hairline pt-3">
              <a
                href="/auth/login"
                className="rounded-control px-3 py-3 text-sm font-medium hover:bg-surface-soft"
              >
                Log in
              </a>
              <Button
                className="w-full"
                onClick={() => router.push("/auth/register")}
              >
                List your clinic
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
