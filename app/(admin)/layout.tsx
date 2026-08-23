import Link from "next/link";
import type { ReactNode } from "react";

const navAdmin = [
  { href: "/admin/pesanan", label: "Pesanan" },
  { href: "/admin/motion", label: "Pustaka Motion" },
  { href: "/admin/motion/permintaan", label: "Permintaan Motion" },
  { href: "/admin/client", label: "Client" },
  { href: "/admin/bayaran", label: "Bayaran" },
];

export default function LayoutAdmin({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-56 shrink-0 flex-col gap-1 border-r border-[var(--color-section-ghost)] p-4 lg:flex">
        <p className="mb-3 px-2 text-sm font-bold text-[var(--color-text)]">KadDigital Admin</p>
        {navAdmin.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className="rounded-[var(--radius)] px-3 py-2 text-sm text-[var(--color-text)]/70 hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]"
          >
            {n.label}
          </Link>
        ))}
      </aside>
      <div className="flex-1">{children}</div>
    </div>
  );
}
