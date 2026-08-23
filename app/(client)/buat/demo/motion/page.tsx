"use client";

import { useState } from "react";
import { useDrafPesanan } from "@/komponen/buat/DrafPesananProvider";
import { BingkaiLangkah } from "@/komponen/buat/BingkaiLangkah";
import { Amaran } from "@/komponen/ui/Amaran";
import { KadPilihan } from "@/komponen/ui/KadPilihan";
import { TextArea } from "@/komponen/ui/TextArea";
import type { MotionKod } from "@/lib/fixture/jenis";
import { fixtureMotion } from "@/lib/fixture/motion";
import { cariPakej } from "@/lib/fixture/pakej";

export default function LangkahMotion() {
  const { draf, kemaskini } = useDrafPesanan();
  const pakej = cariPakej(draf.pakejKod);
  const [motionTersuaiDipilih, setMotionTersuaiDipilih] = useState(false);
  const [huraianTersuai, setHuraianTersuai] = useState("");

  const motionDibenar = fixtureMotion.filter(
    (m) => m.aktif && pakej.motionDibenar.includes(m.kod),
  );

  return (
    <BingkaiLangkah
      tajuk="Motion Pembukaan"
      semasa={5}
      jumlah={8}
      laluanKembali="/buat/demo/tema"
      laluanTeruskan="/buat/demo/sentuhan"
      bolehTeruskan={!motionTersuaiDipilih || huraianTersuai.trim().length > 0}
    >
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          {motionDibenar.map((m) => (
            <KadPilihan
              key={m.kod}
              nama="motion"
              nilai={m.kod}
              dipilih={!motionTersuaiDipilih && draf.motionKod === m.kod}
              onPilih={(v) => {
                setMotionTersuaiDipilih(false);
                kemaskini({ motionKod: v as MotionKod });
              }}
              label={m.nama.split(" — ")[0] ?? m.nama}
              huraian={m.huraian}
              pratonton={<span className="text-xs text-[var(--color-text)]/40">pratonton</span>}
            />
          ))}
        </div>

        {pakej.motionTersuai && (
          <div className="flex flex-col gap-2 rounded-[var(--radius)] border border-dashed border-[var(--color-section-ghost)] p-4">
            <button
              type="button"
              onClick={() => setMotionTersuaiDipilih((v) => !v)}
              className="text-left text-sm font-medium text-[var(--color-accent)]"
            >
              {motionTersuaiDipilih ? "✓ " : ""}Minta motion tersuai (+RM60)
            </button>
            {motionTersuaiDipilih && (
              <>
                <TextArea
                  label="Huraikan motion yang anda mahu"
                  value={huraianTersuai}
                  onChange={(e) => setHuraianTersuai(e.target.value)}
                  required
                />
                <Amaran jenis="amaran">
                  Masa pusing 2 hari bekerja. Semasa menunggu, kad tetap terbit menggunakan
                  motion Larut sebagai pratonton sementara.
                </Amaran>
              </>
            )}
          </div>
        )}
      </div>
    </BingkaiLangkah>
  );
}
