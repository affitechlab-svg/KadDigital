"use client";

import Link from "next/link";
import { useState } from "react";
import { BarAtas } from "@/komponen/ui/BarAtas";
import { Toggle } from "@/komponen/ui/Toggle";
import { fixtureMotion } from "@/lib/fixture/motion";

export default function AdminMotion() {
  const [statusAktif, setStatusAktif] = useState<Record<string, boolean>>(
    Object.fromEntries(fixtureMotion.map((m) => [m.kod, m.aktif])),
  );

  return (
    <div className="flex min-h-screen flex-col">
      <BarAtas
        tajuk="Pustaka Motion"
        aksiKanan={
          <Link href="/admin/motion/permintaan" className="text-sm text-[var(--color-accent)] hover:underline">
            Permintaan tersuai →
          </Link>
        }
      />
      <main className="flex flex-1 flex-col gap-3 px-6 py-6">
        {fixtureMotion.map((m) => (
          <div
            key={m.kod}
            className="flex items-center justify-between rounded-[var(--radius)] border border-[var(--color-section-ghost)] bg-[var(--color-surface)] p-4"
          >
            <div>
              <p className="font-medium text-[var(--color-text)]">{m.nama}</p>
              <p className="text-xs text-[var(--color-text)]/50">
                {m.huraian} · Pakej minimum: {m.pakejMinimum}
              </p>
            </div>
            <Toggle
              ditogol={statusAktif[m.kod] ?? m.aktif}
              onTogol={(v) => setStatusAktif((s) => ({ ...s, [m.kod]: v }))}
              label={statusAktif[m.kod] ? "Aktif" : "Tidak aktif"}
            />
          </div>
        ))}
        <p className="text-xs text-[var(--color-text)]/50">
          Matikan satu motion menghilangkannya dari pilihan client baharu — kad sedia ada yang
          sudah menggunakannya kekal berfungsi.
        </p>
      </main>
    </div>
  );
}
