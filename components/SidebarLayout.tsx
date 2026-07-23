"use client";

import { useState, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut, Stethoscope, LucideIcon } from "lucide-react";
import { logout } from "@/lib/auth";

export interface SidebarNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export default function SidebarLayout({
  navItems,
  children,
}: {
  navItems: SidebarNavItem[];
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const NavLinks = () => (
    <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href;
        return (
          <button
            key={item.href}
            onClick={() => {
              router.push(item.href);
              setOpen(false);
            }}
            className={
              "flex items-center gap-3 rounded-control px-3 py-2.5 text-left text-sm font-medium transition-colors " +
              (active
                ? "bg-ink text-white"
                : "text-ink/70 hover:bg-surface-soft")
            }
          >
            <Icon size={17} />
            {item.label}
          </button>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen md:flex">
      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-hairline bg-canvas px-4 py-3 md:hidden">
        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="rounded-control p-2 hover:bg-surface-soft"
        >
          <Menu size={22} />
        </button>
        <span className="flex items-center gap-2 text-sm font-semibold">
          <span className="flex h-7 w-7 items-center justify-center rounded-control bg-rausch text-white">
            <Stethoscope size={14} />
          </span>
          Healthworkers
        </span>
        <span className="w-9" /> {/* spacer to balance the menu icon */}
      </div>

      {/* Mobile drawer + overlay */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={() => setOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-canvas shadow-card md:hidden">
            <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
              <span className="flex items-center gap-2 text-sm font-semibold">
                <span className="flex h-7 w-7 items-center justify-center rounded-control bg-rausch text-white">
                  <Stethoscope size={14} />
                </span>
                Healthworkers
              </span>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="rounded-control p-1.5 hover:bg-surface-soft"
              >
                <X size={20} />
              </button>
            </div>
            <NavLinks />
            <div className="border-t border-hairline p-3">
              <button
                onClick={async () => {
                  await logout();
                  router.push("/");
                }}
                className="flex w-full items-center gap-3 rounded-control px-3 py-2.5 text-sm font-medium text-ink/70 hover:bg-surface-soft"
              >
                <LogOut size={17} />
                Log out
              </button>
            </div>
          </aside>
        </>
      )}

      {/* Desktop persistent sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-hairline bg-canvas md:flex">
        <div className="flex items-center gap-2 border-b border-hairline px-4 py-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-control bg-rausch text-white">
            <Stethoscope size={16} />
          </span>
          <span className="text-sm font-semibold">Healthworkers</span>
        </div>
        <NavLinks />
        <div className="border-t border-hairline p-3">
          <button
            onClick={async () => {
              await logout();
              router.push("/");
            }}
            className="flex w-full items-center gap-3 rounded-control px-3 py-2.5 text-sm font-medium text-ink/70 hover:bg-surface-soft"
          >
            <LogOut size={17} />
            Log out
          </button>
        </div>
      </aside>

      {/* Page content */}
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
