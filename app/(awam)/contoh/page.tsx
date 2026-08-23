import Link from "next/link";
import { fixturePesanan } from "@/lib/fixture/data";

export default function HalamanContoh() {
  const senarai = Object.values(fixturePesanan);

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-8">
      <h1 className="text-3xl font-bold text-[var(--color-text)]">Contoh Kad</h1>
      <p className="mt-2 text-[var(--color-text)]/70">
        Lihat contoh kad jemputan sebenar — sentuh untuk buka & scroll.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {senarai.map((p) => (
          <Link
            key={p.slug}
            href={`/i/${p.slug}`}
            className="flex flex-col gap-2 rounded-[var(--radius)] border border-[var(--color-section-ghost)] bg-[var(--color-surface)] p-6 text-left transition-colors hover:bg-[var(--color-section)]"
          >
            <span className="text-xs uppercase tracking-widest text-[var(--color-accent)]">
              {p.kicker}
            </span>
            <span className="text-lg font-semibold text-[var(--color-text)]">
              {p.tajukA} {p.tajukB && `${p.penyambung} ${p.tajukB}`}
            </span>
            <span className="text-xs text-[var(--color-text)]/60">Motion: {p.motionKod}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
