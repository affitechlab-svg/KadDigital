"use client";

import { useDrafPesanan } from "@/komponen/buat/DrafPesananProvider";
import { BingkaiLangkah } from "@/komponen/buat/BingkaiLangkah";
import { Chip } from "@/komponen/ui/Chip";
import { MuatNaikFail } from "@/komponen/ui/MuatNaikFail";
import { RadioKad } from "@/komponen/ui/RadioKad";
import { Toggle } from "@/komponen/ui/Toggle";
import type { BentukPotong } from "@/lib/fixture/jenis";
import { cariPakej } from "@/lib/fixture/pakej";
import { useState } from "react";

const chipBacaan = [
  { nilai: "warna", label: "Warna" },
  { nilai: "hiasan", label: "Hiasan" },
  { nilai: "corak", label: "Corak" },
  { nilai: "huruf", label: "Gaya huruf" },
];

const labelBentuk: Record<BentukPotong, string> = {
  gerbang: "Gerbang",
  bulat: "Bulat",
  segi: "Segi",
};

export default function LangkahRujukan() {
  const { draf, kemaskini } = useDrafPesanan();
  const pakej = cariPakej(draf.pakejKod);
  const [bacaanDipilih, setBacaanDipilih] = useState<string[]>(["warna", "hiasan", "huruf"]);

  function togolBacaan(nilai: string, on: boolean) {
    setBacaanDipilih((s) => (on ? [...s, nilai] : s.filter((v) => v !== nilai)));
  }

  return (
    <BingkaiLangkah
      tajuk="Rujukan Gaya"
      semasa={3}
      jumlah={8}
      laluanKembali="/buat/demo/maklumat"
      laluanTeruskan="/buat/demo/tema"
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-[var(--color-text)]">
            Muat naik rujukan gaya (had {pakej.hadRujukan} imej)
          </p>
          <MuatNaikFail label="Rujukan 1" hadSaizMb={5} onFail={() => {}} />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-[var(--color-text)]">Apa yang perlu dibaca?</p>
          <div className="flex flex-wrap gap-2">
            {chipBacaan.map((c) => (
              <Chip
                key={c.nilai}
                ditogol={bacaanDipilih.includes(c.nilai)}
                onTogol={(on) => togolBacaan(c.nilai, on)}
              >
                {c.label}
              </Chip>
            ))}
          </div>
        </div>

        {pakej.gambarSubjek.length > 0 && (
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-[var(--color-text)]">Gambar subjek</p>
            {pakej.gambarSubjek.includes("utama") && (
              <MuatNaikFail label="Gambar utama (halaman 1)" hadSaizMb={8} onFail={() => {}} />
            )}
            {pakej.gambarSubjek.includes("sampingan") && (
              <MuatNaikFail label="Gambar sampingan (halaman 3)" hadSaizMb={8} onFail={() => {}} />
            )}
            {pakej.gambarSubjek.includes("logo") && (
              <MuatNaikFail label="Logo / monogram" hadSaizMb={8} onFail={() => {}} />
            )}
          </div>
        )}

        {pakej.bentukDibenar.length > 0 && (
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-[var(--color-text)]">Bentuk potongan gambar</p>
            <div className="grid grid-cols-3 gap-2">
              {pakej.bentukDibenar.map((b) => (
                <RadioKad
                  key={b}
                  nama="bentuk"
                  nilai={b}
                  dipilih={draf.bentukPotong === b}
                  onPilih={(v) => kemaskini({ bentukPotong: v as BentukPotong })}
                  tajuk={labelBentuk[b]}
                />
              ))}
            </div>
          </div>
        )}

        <Toggle
          ditogol={draf.tunjukGambarUtama}
          onTogol={(v) => kemaskini({ tunjukGambarUtama: v })}
          label="Tunjuk gambar utama pada kad"
        />
      </div>
    </BingkaiLangkah>
  );
}
