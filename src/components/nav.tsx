"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Discover" },
  { href: "/compare", label: "Compare" },
  { href: "/predictor", label: "Predictor" },
  { href: "/saved", label: "Saved" },
  { href: "/discuss", label: "Discuss" },
  { href: "/auth", label: "Auth" }
] as const;

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-600 text-lg font-bold text-white shadow-soft">
            C
          </span>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-600">
              College Discovery
            </p>
            <p className="text-xs text-slate-500">Compare. shortlist. decide.</p>
          </div>
        </Link>

        <nav className="flex flex-wrap items-center gap-2 text-sm">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 transition ${
                  active
                    ? "bg-slate-900 text-white shadow-soft"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
