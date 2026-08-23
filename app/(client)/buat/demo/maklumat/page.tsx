"use client";

import { Plus, Trash2 } from "lucide-react";
import { useDrafPesanan } from "@/komponen/buat/DrafPesananProvider";
import { BingkaiLangkah } from "@/komponen/buat/BingkaiLangkah";
import { Input } from "@/komponen/ui/Input";
import { Pilihan } from "@/komponen/ui/Pilihan";
import { TextArea } from "@/komponen/ui/TextArea";
import { cariPakej } from "@/lib/fixture/pakej";

const opsyenJenisAcara = [
  { nilai: "kahwin", label: "Kahwin" },
  { nilai: "korporat", label: "Korporat" },
  { nilai: "pasukan", label: "Pasukan" },
  { nilai: "latihan", label: "Latihan" },
  { nilai: "tersuai", label: "Tersuai" },
];

export default function LangkahMaklumat() {
  const { draf, kemaskini } = useDrafPesanan();
  const pakej = cariPakej(draf.pakejKod);
  const adaKataKata = pakej.bilHalaman === 4;

  function tambahAturCara() {
    if (draf.aturCara.length >= pakej.hadAturCara) return;
    kemaskini({ aturCara: [...draf.aturCara, { masa: "", aktiviti: "" }] });
  }

  function buangAturCara(indeks: number) {
    kemaskini({ aturCara: draf.aturCara.filter((_, i) => i !== indeks) });
  }

  function tukarAturCara(indeks: number, medan: "masa" | "aktiviti", nilai: string) {
    kemaskini({
      aturCara: draf.aturCara.map((item, i) => (i === indeks ? { ...item, [medan]: nilai } : item)),
    });
  }

  const bolehTeruskan = !!draf.tajukA && !!draf.venueNama && !!draf.tarikhMajlis;

  return (
    <BingkaiLangkah
      tajuk="Maklumat Acara"
      semasa={2}
      jumlah={8}
      laluanKembali="/buat/pakej"
      laluanTeruskan="/buat/demo/rujukan"
      bolehTeruskan={bolehTeruskan}
    >
      <div className="flex flex-col gap-4">
        <Pilihan
          label="Jenis acara"
          opsyen={opsyenJenisAcara}
          value={draf.jenisAcara}
          onChange={(e) => kemaskini({ jenisAcara: e.target.value as typeof draf.jenisAcara })}
        />
        {draf.jenisAcara === "tersuai" && (
          <Input
            label="Nama jenis acara"
            required
            value={draf.jenisTersuai}
            onChange={(e) => kemaskini({ jenisTersuai: e.target.value })}
          />
        )}
        <Input label="Kicker" petunjuk='Cth: "WALIMATULURUS"' value={draf.kicker} onChange={(e) => kemaskini({ kicker: e.target.value })} />
        <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-2">
          <Input label="Tajuk A" required value={draf.tajukA} onChange={(e) => kemaskini({ tajukA: e.target.value })} />
          <div className="pb-2.5 text-center text-sm text-[var(--color-text)]/60">
            {draf.penyambung}
          </div>
          <Input label="Tajuk B" value={draf.tajukB} onChange={(e) => kemaskini({ tajukB: e.target.value })} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Input label="Tarikh majlis" type="date" required value={draf.tarikhMajlis} onChange={(e) => kemaskini({ tarikhMajlis: e.target.value })} />
          <Input label="Masa (paparan)" value={draf.masaTeks} onChange={(e) => kemaskini({ masaTeks: e.target.value })} />
        </div>
        <Input label="Nama venue" required value={draf.venueNama} onChange={(e) => kemaskini({ venueNama: e.target.value })} />
        <TextArea label="Alamat venue" rows={2} value={draf.venueAlamat} onChange={(e) => kemaskini({ venueAlamat: e.target.value })} />
        <div className="grid grid-cols-2 gap-2">
          <Input label="Pautan Waze" value={draf.pautanWaze} onChange={(e) => kemaskini({ pautanWaze: e.target.value })} />
          <Input label="Pautan Google Maps" value={draf.pautanMaps} onChange={(e) => kemaskini({ pautanMaps: e.target.value })} />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[var(--color-text)]">
              Atur cara ({draf.aturCara.length}/{pakej.hadAturCara})
            </span>
            <button
              type="button"
              onClick={tambahAturCara}
              disabled={draf.aturCara.length >= pakej.hadAturCara}
              className="flex items-center gap-1 text-xs text-[var(--color-accent)] disabled:opacity-40"
            >
              <Plus className="size-3.5" /> Tambah baris
            </button>
          </div>
          {draf.aturCara.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                value={item.masa}
                onChange={(e) => tukarAturCara(i, "masa", e.target.value)}
                placeholder="11:00"
                className="w-20 rounded-[var(--radius)] border border-[var(--color-section-ghost)] bg-[var(--color-surface)] px-2 py-1.5 text-sm text-[var(--color-text)]"
              />
              <input
                value={item.aktiviti}
                onChange={(e) => tukarAturCara(i, "aktiviti", e.target.value)}
                placeholder="Aktiviti"
                className="flex-1 rounded-[var(--radius)] border border-[var(--color-section-ghost)] bg-[var(--color-surface)] px-2 py-1.5 text-sm text-[var(--color-text)]"
              />
              <button type="button" onClick={() => buangAturCara(i)} aria-label="Buang baris" className="text-red-400">
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>

        {adaKataKata && (
          <>
            <TextArea
              label="Kata-kata (petikan/doa)"
              value={draf.kataTeks}
              onChange={(e) => kemaskini({ kataTeks: e.target.value })}
            />
            <Input
              label="Nama penandatangan"
              value={draf.kataOleh}
              onChange={(e) => kemaskini({ kataOleh: e.target.value })}
            />
          </>
        )}
      </div>
    </BingkaiLangkah>
  );
}
