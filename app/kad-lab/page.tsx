"use client";

import { useMemo, useState } from "react";
import { KadJemputan } from "@/komponen/kad/KadJemputan";
import { BarAtas } from "@/komponen/ui/BarAtas";
import { Pilihan } from "@/komponen/ui/Pilihan";
import { fixturePesanan } from "@/lib/fixture/data";
import type { MotionKod } from "@/lib/fixture/jenis";
import { presetTemaKad } from "@/lib/fixture/tema-preset";

const opsyenPesanan = Object.values(fixturePesanan).map((p) => ({
  nilai: p.slug,
  label: `${p.tajukA}${p.tajukB ? ` ${p.penyambung} ${p.tajukB}` : ""}`,
}));

const opsyenMotion: { nilai: MotionKod; label: string }[] = [
  { nilai: "sampul", label: "Sampul — kepak terbuka" },
  { nilai: "tirai", label: "Tirai — belah dua" },
  { nilai: "bidai", label: "Bidai — angkat ke atas" },
  { nilai: "larut", label: "Larut — pudar & zum" },
];

const opsyenPakej = [
  { nilai: "ringkas", label: "Simple (3 halaman)" },
  { nilai: "standard", label: "Signature (4 halaman)" },
  { nilai: "premium", label: "Luxury (4 halaman)" },
];

export default function KadLab() {
  const [slugPesanan, setSlugPesanan] = useState(opsyenPesanan[0]?.nilai ?? "contoh-kahwin");
  const [motion, setMotion] = useState<MotionKod>("sampul");
  const [indeksTema, setIndeksTema] = useState(0);
  const [pakej, setPakej] = useState("standard");

  const pesananAsas = fixturePesanan[slugPesanan] ?? fixturePesanan["contoh-kahwin"]!;
  const tema = presetTemaKad[indeksTema]?.tema ?? presetTemaKad[0]!.tema;
  const bilHalaman = pakej === "ringkas" ? 3 : 4;

  const pesanan = useMemo(
    () => ({ ...pesananAsas, motionKod: motion, bilHalaman: bilHalaman as 3 | 4 }),
    [pesananAsas, motion, bilHalaman],
  );

  return (
    <div className="flex min-h-screen flex-col">
      <BarAtas tajuk="Kad Lab" />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-4 py-8 lg:flex-row">
        <div className="flex w-full flex-col gap-4 lg:w-72 lg:shrink-0">
          <Pilihan
            label="Jenis acara"
            opsyen={opsyenPesanan}
            value={slugPesanan}
            onChange={(e) => setSlugPesanan(e.target.value)}
          />
          <Pilihan
            label="Motion pembukaan"
            opsyen={opsyenMotion}
            value={motion}
            onChange={(e) => setMotion(e.target.value as MotionKod)}
          />
          <Pilihan
            label="Tema"
            opsyen={presetTemaKad.map((p, i) => ({ nilai: String(i), label: p.nama }))}
            value={String(indeksTema)}
            onChange={(e) => setIndeksTema(Number(e.target.value))}
          />
          <Pilihan
            label="Pakej (bilangan halaman)"
            opsyen={opsyenPakej}
            value={pakej}
            onChange={(e) => setPakej(e.target.value)}
          />
          <p className="text-xs text-[var(--color-text)]/50">
            Tukar motion atau pakej tidak mengubah warna/huruf kad — hanya tema yang
            mengubahnya.
          </p>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="h-[844px] w-[390px] max-w-full overflow-hidden rounded-[32px] border-4 border-[var(--color-section-ghost)] shadow-2xl">
            <KadJemputan pesanan={pesanan} tema={tema} mod="pratonton" />
          </div>
        </div>
      </main>
    </div>
  );
}
