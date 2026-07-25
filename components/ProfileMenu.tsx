"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogIn, LogOut, User as UserIcon } from "lucide-react";
import { useCurrentUser } from "@/lib/useCurrentUser";
import { logout, roleHomePath } from "@/lib/auth";

export default function ProfileMenu() {
  const router = useRouter();
  const { user, role } = useCurrentUser();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (!user) {
    return (
      <button
        onClick={() => router.push("/auth/login")}
        aria-label="Log in"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
      >
        <LogIn size={17} />
      </button>
    );
  }

  const initial = (user.displayName ?? user.email ?? "U").charAt(0).toUpperCase();

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Profile menu"
        className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white/90 text-sm font-semibold text-rausch"
      >
        {initial}
      </button>

      {open && (
        <div className="absolute left-0 top-11 z-50 w-64 rounded-card border border-hairline bg-canvas p-4 text-ink shadow-card">
          <div className="flex items-center gap-3 border-b border-hairline pb-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-rausch text-sm font-semibold text-white">
              {initial}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                {user.displayName ?? "Account"}
              </p>
              <p className="truncate text-xs text-ink/60">{user.email}</p>
              <p className="mt-0.5 text-[11px] font-medium capitalize text-rausch">
                {role ?? "..."}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setOpen(false);
              router.push(roleHomePath(role));
            }}
            className="mt-3 flex w-full items-center gap-2 rounded-control px-2 py-2 text-sm font-medium hover:bg-surface-soft"
          >
            <UserIcon size={15} />
            {role === "doctor" ? "My dashboard" : "My account"}
          </button>

          <button
            onClick={async () => {
              setOpen(false);
              await logout();
              router.push("/");
            }}
            className="mt-1 flex w-full items-center gap-2 rounded-control px-2 py-2 text-sm font-medium text-rausch hover:bg-rausch/10"
          >
            <LogOut size={15} />
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
