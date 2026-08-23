"use client";

import { useState } from "react";
import { useDrafPesanan } from "@/komponen/buat/DrafPesananProvider";
import { BingkaiLangkah } from "@/komponen/buat/BingkaiLangkah";
import { Amaran } from "@/komponen/ui/Amaran";
import { Butang } from "@/komponen/ui/Butang";
import { PetakWarna } from "@/komponen/ui/PetakWarna";
import { cariPakej } from "@/lib/fixture/pakej";
import { presetTemaKad } from "@/lib/fixture/tema-preset";

export default function LangkahTema() {
  const { draf, kemaskini } = useDrafPesanan();
  const pakej = cariPakej(draf.pakejKod);
  const [indeksPreset, setIndeksPreset] = useState(0);
  const [bakiJanaSemula, setBakiJanaSemula] = useState(pakej.hadJanaSemula);
  const [laras, setLaras] = useState(false);

  function janaSemula() {
    if (bakiJanaSemula <= 0) return;
    const seterusnya = (indeksPreset + 1) % presetTemaKad.length;
    setIndeksPreset(seterusnya);
    kemaskini({ tema: presetTemaKad[seterusnya]!.tema });
    setBakiJanaSemula((b) => b - 1);
  }

  function tukarWarna(indeks: number, nilai: string) {
    const paletBaharu = [...draf.tema.palet] as typeof draf.tema.palet;
    paletBaharu[indeks] = nilai;
    kemaskini({ tema: { ...draf.tema, palet: paletBaharu, sumber: "dilaras" } });
  }

  const labelWarna = ["Latar", "Latar sekunder", "Aksen", "Teks sekunder", "Teks"];

  return (
    <BingkaiLangkah
      tajuk="Tema Kad"
      semasa={4}
      jumlah={8}
      laluanKembali="/buat/demo/rujukan"
      laluanTeruskan="/buat/demo/motion"
    >
      <div className="flex flex-col gap-5">
        <Amaran jenis="info">Bacaan tema mengambil masa sehingga 5 saat (simulasi — belum sambung ke penjana sebenar).</Amaran>

        <div
          className="flex flex-col items-center gap-3 rounded-[var(--radius)] border p-6 text-center"
          style={{ background: draf.tema.palet[0], borderColor: draf.tema.palet[2] }}
        >
          <span className="text-xs uppercase tracking-widest" style={{ color: draf.tema.palet[2] }}>
            {presetTemaKad[indeksPreset]?.nama ?? "Tema"}
          </span>
          <span className="text-2xl" style={{ color: draf.tema.palet[4], fontFamily: draf.tema.huruf.tajuk }}>
            {draf.tajukA || "Nama Anda"}
          </span>
          <span className="text-xs" style={{ color: draf.tema.palet[3] }}>
            {draf.tema.mood}
          </span>
          <div className="flex gap-1.5">
            {draf.tema.palet.map((warna, i) => (
              <span key={i} className="size-6 rounded-full border border-white/20" style={{ background: warna }} />
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Butang varian="sekunder" onClick={janaSemula} disabled={bakiJanaSemula <= 0}>
            Jana semula ({bakiJanaSemula} lagi)
          </Butang>
          {pakej.larasManual && (
            <Butang varian={laras ? "utama" : "hantu"} onClick={() => setLaras((v) => !v)}>
              Laras sendiri
            </Butang>
          )}
        </div>

        {laras && pakej.larasManual && (
          <div className="grid grid-cols-2 gap-3 rounded-[var(--radius)] border border-[var(--color-section-ghost)] p-4">
            {draf.tema.palet.map((warna, i) => (
              <PetakWarna key={i} label={labelWarna[i] ?? ""} nilai={warna} onTukar={(v) => tukarWarna(i, v)} />
            ))}
          </div>
        )}
      </div>
    </BingkaiLangkah>
  );
}
