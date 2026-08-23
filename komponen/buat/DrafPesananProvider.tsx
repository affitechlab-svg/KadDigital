"use client";

import { createContext, type ReactNode, useContext, useState } from "react";
import { type DrafPesanan, drafPesananLalai } from "@/lib/fixture/draf";

interface KonteksDraf {
  draf: DrafPesanan;
  kemaskini: (perubahan: Partial<DrafPesanan>) => void;
}

const KonteksDrafPesanan = createContext<KonteksDraf | null>(null);

/**
 * Simpan draf pesanan dalam memori React (BUKAN localStorage — CLAUDE.md
 * §3.9 larang localStorage untuk data pesanan). Sesuai untuk Fasa 3 kerana
 * belum ada DB; state akan hilang bila refresh — itu sengaja, digantikan
 * dengan simpanan DB sebenar + autosave dalam Fasa 5.
 */
export function DrafPesananProvider({ children }: { children: ReactNode }) {
  const [draf, setDraf] = useState<DrafPesanan>(drafPesananLalai);

  function kemaskini(perubahan: Partial<DrafPesanan>) {
    setDraf((semasa) => ({ ...semasa, ...perubahan }));
  }

  return (
    <KonteksDrafPesanan.Provider value={{ draf, kemaskini }}>
      {children}
    </KonteksDrafPesanan.Provider>
  );
}

export function useDrafPesanan(): KonteksDraf {
  const konteks = useContext(KonteksDrafPesanan);
  if (!konteks) {
    throw new Error("useDrafPesanan mesti digunakan dalam <DrafPesananProvider>");
  }
  return konteks;
}
