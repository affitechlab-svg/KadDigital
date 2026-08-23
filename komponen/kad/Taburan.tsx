"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import type { Taburan as JenisTaburan } from "@/lib/fixture/jenis";

export interface TaburanProps {
  jenis: JenisTaburan;
}

const JUMLAH_ZARAH = 10;

/** Taburan latar (kelopak/hati) — warna ikut tema, "tiada" benar-benar tiada elemen. */
export function Taburan({ jenis }: TaburanProps) {
  const zarah = useMemo(
    () =>
      Array.from({ length: JUMLAH_ZARAH }, (_, i) => ({
        kiri: (i * 97) % 100,
        lengah: (i * 0.7) % 4,
        tempoh: 6 + (i % 4),
        saiz: 10 + (i % 3) * 4,
      })),
    [],
  );

  if (jenis === "tiada") return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden>
      {zarah.map((z, i) => (
        <motion.span
          key={i}
          initial={{ y: "-10%", opacity: 0 }}
          animate={{ y: "110%", opacity: [0, 1, 1, 0] }}
          transition={{
            duration: z.tempoh,
            delay: z.lengah,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute"
          style={{ left: `${z.kiri}%`, fontSize: z.saiz, color: "var(--kad-aksen)" }}
        >
          {jenis === "kelopak" ? "❀" : "♥"}
        </motion.span>
      ))}
    </div>
  );
}
