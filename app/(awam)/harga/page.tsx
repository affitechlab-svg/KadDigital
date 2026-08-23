import Link from "next/link";
import { Check, X } from "lucide-react";
import { Butang } from "@/komponen/ui/Butang";
import { fixturePakej, formatRinggit } from "@/lib/fixture/pakej";

const baris: { label: string; papar: (p: (typeof fixturePakej)[number]) => React.ReactNode }[] = [
  { label: "Harga", papar: (p) => formatRinggit(p.hargaSen) },
  { label: "Halaman scroll", papar: (p) => p.bilHalaman },
  { label: "Motion pembukaan", papar: (p) => (p.motionTersuai ? "Semua + tersuai" : p.motionDibenar.join(", ")) },
  { label: "Rujukan gaya", papar: (p) => `${p.hadRujukan} imej/link` },
  { label: "Jana semula tema", papar: (p) => `${p.hadJanaSemula}x` },
  { label: "Laras warna manual", papar: (p) => (p.larasManual ? <Check className="size-4 text-[var(--color-accent)]" /> : <X className="size-4 opacity-30" />) },
  { label: "Gambar subjek", papar: (p) => (p.gambarSubjek.length ? p.gambarSubjek.join(", ") : "—") },
  { label: "Bentuk potongan", papar: (p) => (p.bentukDibenar.length ? p.bentukDibenar.join(", ") : "—") },
  { label: "Atur cara", papar: (p) => `${p.hadAturCara} baris` },
  { label: "Muzik latar", papar: (p) => p.muzik },
  { label: "Taburan latar", papar: (p) => (p.taburan ? <Check className="size-4 text-[var(--color-accent)]" /> : <X className="size-4 opacity-30" />) },
  { label: "Dwibahasa BM/EN", papar: (p) => (p.dwibahasa ? <Check className="size-4 text-[var(--color-accent)]" /> : <X className="size-4 opacity-30" />) },
  { label: "Kuota RSVP", papar: (p) => p.kuotaRsvp },
  { label: "Tempoh pautan aktif", papar: (p) => `${p.bulanAktif} bulan` },
];

export default function HalamanHarga() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-[var(--color-text)]">Pakej & Harga</h1>
        <p className="mt-2 text-[var(--color-text)]/70">
          Bandingkan tiga pakej — semua harga sudah termasuk penjanaan tema automatik.
        </p>
      </div>
      <div className="overflow-x-auto rounded-[var(--radius)] border border-[var(--color-section-ghost)]">
        <table className="w-full min-w-max text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--color-section-ghost)]">
              <th className="px-4 py-3" />
              {fixturePakej.map((p) => (
                <th key={p.kod} className="relative px-4 py-3 text-center">
                  {p.popular && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-[var(--color-accent)] px-2 py-0.5 text-[10px] font-semibold text-[#161826]">
                      POPULAR
                    </span>
                  )}
                  <div className="mt-2 text-base font-semibold text-[var(--color-text)]">{p.namaPapar}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {baris.map((b) => (
              <tr key={b.label} className="border-b border-[var(--color-section-ghost)] last:border-0">
                <td className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-[var(--color-text)]/50">
                  {b.label}
                </td>
                {fixturePakej.map((p) => (
                  <td key={p.kod} className="px-4 py-3 text-center text-[var(--color-text)]">
                    <span className="flex items-center justify-center">{b.papar(p)}</span>
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td className="px-4 py-4" />
              {fixturePakej.map((p) => (
                <td key={p.kod} className="px-4 py-4 text-center">
                  <Link href="/daftar">
                    <Butang varian={p.popular ? "utama" : "sekunder"}>Pilih {p.namaPapar}</Butang>
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
