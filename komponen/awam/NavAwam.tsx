import Link from "next/link";
import { Butang } from "@/komponen/ui/Butang";

const pautan = [
  { href: "/harga", label: "Harga" },
  { href: "/contoh", label: "Contoh" },
  { href: "/soalan-lazim", label: "Soalan Lazim" },
];

export function NavAwam() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--color-section-ghost)] bg-[var(--color-bg)]/95 px-4 py-3 backdrop-blur sm:px-8">
      <Link href="/" className="text-sm font-bold tracking-wide text-[var(--color-text)]">
        KadDigital
      </Link>
      <nav className="hidden gap-6 sm:flex">
        {pautan.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="text-sm text-[var(--color-text)]/70 hover:text-[var(--color-text)]"
          >
            {p.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <Link
          href="/masuk"
          className="hidden text-sm text-[var(--color-text)]/70 hover:text-[var(--color-text)] sm:inline"
        >
          Log masuk
        </Link>
        <Link href="/daftar">
          <Butang varian="utama">Mula</Butang>
        </Link>
      </div>
    </header>
  );
}
