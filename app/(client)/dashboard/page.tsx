import Link from "next/link";
import { Copy, Share2 } from "lucide-react";
import { BarAtas } from "@/komponen/ui/BarAtas";
import { Butang } from "@/komponen/ui/Butang";
import { Kosong } from "@/komponen/ui/Kosong";
import { fixtureSenaraiPesanan, type StatusPesanan } from "@/lib/fixture/admin";

const labelStatus: Record<StatusPesanan, string> = {
  draf: "DRAF",
  dibayar: "MENUNGGU TERBIT",
  terbit: "LIVE",
  ditarik: "DITARIK",
  lapuk: "LAPUK",
};

const kelasStatus: Record<StatusPesanan, string> = {
  draf: "bg-[var(--color-section-ghost)] text-[var(--color-text)]",
  dibayar: "bg-amber-500/20 text-amber-300",
  terbit: "bg-emerald-500/20 text-emerald-300",
  ditarik: "bg-red-500/20 text-red-300",
  lapuk: "bg-[var(--color-section-ghost)] text-[var(--color-text)]/50",
};

export default function HalamanDashboard() {
  const senarai = fixtureSenaraiPesanan;

  return (
    <div className="flex min-h-screen flex-col">
      <BarAtas tajuk="Pesanan Saya" />
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-3 px-4 py-6">
        {senarai.length === 0 ? (
          <Kosong
            tajuk="Tiada pesanan lagi"
            huraian="Mula cipta jemputan pertama anda."
            aksi={
              <Link href="/buat/pakej">
                <Butang>Mula cipta</Butang>
              </Link>
            }
          />
        ) : (
          senarai.map((p) => (
            <div
              key={p.id}
              className="flex flex-col gap-2 rounded-[var(--radius)] border border-[var(--color-section-ghost)] bg-[var(--color-surface)] p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <Link href={`/dashboard/${p.id}`} className="font-medium text-[var(--color-text)] hover:underline">
                    {p.namaClient}
                  </Link>
                  <p className="text-xs text-[var(--color-text)]/50">
                    {p.noRujukan} · {p.pakejNama}
                  </p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${kelasStatus[p.status]}`}>
                  {labelStatus[p.status]}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {p.status === "draf" ? (
                  <Link href="/buat/demo/maklumat">
                    <Butang varian="utama">Sambung & bayar</Butang>
                  </Link>
                ) : (
                  <>
                    <Butang varian="sekunder">
                      <Copy className="size-3.5" /> Salin pautan
                    </Butang>
                    <Butang varian="hantu">
                      <Share2 className="size-3.5" /> Kongsi
                    </Butang>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}
