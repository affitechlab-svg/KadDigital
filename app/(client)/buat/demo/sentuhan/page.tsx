"use client";

import { useDrafPesanan } from "@/komponen/buat/DrafPesananProvider";
import { BingkaiLangkah } from "@/komponen/buat/BingkaiLangkah";
import { MuatNaikFail } from "@/komponen/ui/MuatNaikFail";
import { RadioKad } from "@/komponen/ui/RadioKad";
import { Toggle } from "@/komponen/ui/Toggle";
import type { Taburan } from "@/lib/fixture/jenis";
import { fixtureMuzik } from "@/lib/fixture/muzik";
import { cariPakej } from "@/lib/fixture/pakej";

const opsyenTaburan: { nilai: Taburan; label: string }[] = [
  { nilai: "tiada", label: "Tiada" },
  { nilai: "kelopak", label: "Kelopak bunga" },
  { nilai: "hati", label: "Hati gugur" },
];

export default function LangkahSentuhan() {
  const { draf, kemaskini } = useDrafPesanan();
  const pakej = cariPakej(draf.pakejKod);

  return (
    <BingkaiLangkah
      tajuk="Sentuhan Akhir"
      semasa={6}
      jumlah={8}
      laluanKembali="/buat/demo/motion"
      laluanTeruskan="/buat/demo/pratonton"
    >
      <div className="flex flex-col gap-6">
        {pakej.muzik !== "tiada" && (
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-[var(--color-text)]">Muzik latar</p>
            {fixtureMuzik.map((m) => (
              <RadioKad
                key={m.kod}
                nama="muzik"
                nilai={m.kod}
                dipilih={draf.muzikKod === m.kod}
                onPilih={(v) => kemaskini({ muzikKod: v })}
                tajuk={m.nama}
                huraian={m.tempoh}
              />
            ))}
            {pakej.muzik === "pustaka_upload" && (
              <MuatNaikFail label="Atau muat naik MP3 sendiri" hadSaizMb={5} terima="audio/mpeg" onFail={() => {}} />
            )}
          </div>
        )}

        {pakej.taburan && (
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-[var(--color-text)]">Taburan latar</p>
            <div className="grid grid-cols-3 gap-2">
              {opsyenTaburan.map((t) => (
                <RadioKad
                  key={t.nilai}
                  nama="taburan"
                  nilai={t.nilai}
                  dipilih={draf.taburan === t.nilai}
                  onPilih={(v) => kemaskini({ taburan: v as Taburan })}
                  tajuk={t.label}
                />
              ))}
            </div>
          </div>
        )}

        {pakej.dwibahasa && (
          <Toggle
            ditogol={draf.dwibahasa}
            onTogol={(v) => kemaskini({ dwibahasa: v })}
            label="Bolehkan tetamu tukar bahasa BM/EN"
          />
        )}
      </div>
    </BingkaiLangkah>
  );
}
