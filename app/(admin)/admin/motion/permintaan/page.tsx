"use client";

import { useState } from "react";
import { BarAtas } from "@/komponen/ui/BarAtas";
import { Butang } from "@/komponen/ui/Butang";
import { Kosong } from "@/komponen/ui/Kosong";
import { fixturePermintaanMotion, type PermintaanMotionFixture } from "@/lib/fixture/admin";

const labelStatus: Record<PermintaanMotionFixture["status"], string> = {
  baru: "Baru",
  sedang_dibuat: "Sedang Dibuat",
  siap: "Siap",
  ditolak: "Ditolak",
};

export default function AdminPermintaanMotion() {
  const [senarai, setSenarai] = useState(fixturePermintaanMotion);

  function majukanStatus(id: string) {
    setSenarai((s) =>
      s.map((p) => {
        if (p.id !== id) return p;
        const seterusnya: PermintaanMotionFixture["status"] =
          p.status === "baru" ? "sedang_dibuat" : p.status === "sedang_dibuat" ? "siap" : p.status;
        return { ...p, status: seterusnya };
      }),
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <BarAtas tajuk="Permintaan Motion Tersuai" />
      <main className="flex flex-1 flex-col gap-3 px-6 py-6">
        {senarai.length === 0 ? (
          <Kosong tajuk="Tiada permintaan" huraian="Belum ada permintaan motion tersuai." />
        ) : (
          senarai.map((p) => (
            <div key={p.id} className="flex items-start justify-between gap-4 rounded-[var(--radius)] border border-[var(--color-section-ghost)] bg-[var(--color-surface)] p-4">
              <div>
                <p className="font-medium text-[var(--color-text)]">
                  {p.namaClient} <span className="text-[var(--color-text)]/40">· {p.noRujukan}</span>
                </p>
                <p className="mt-1 max-w-md text-sm text-[var(--color-text)]/70">{p.huraian}</p>
                <span className="mt-2 inline-block rounded-full bg-[var(--color-section-ghost)] px-2.5 py-1 text-[10px] font-semibold uppercase text-[var(--color-text)]">
                  {labelStatus[p.status]}
                </span>
              </div>
              {p.status !== "siap" && p.status !== "ditolak" && (
                <Butang varian="sekunder" onClick={() => majukanStatus(p.id)}>
                  Tanda {p.status === "baru" ? "sedang dibuat" : "siap"}
                </Butang>
              )}
            </div>
          ))
        )}
      </main>
    </div>
  );
}
