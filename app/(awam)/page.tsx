import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Butang } from "@/komponen/ui/Butang";
import { KadPakej } from "@/komponen/ui/KadPakej";
import { fixturePakej, formatRinggit } from "@/lib/fixture/pakej";

export default function LamanUtama() {
  return (
    <main className="flex flex-col gap-20 px-4 py-16 sm:px-8">
      <section className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
        <span className="flex items-center gap-1.5 rounded-full border border-[var(--color-section-ghost)] px-3 py-1 text-xs text-[var(--color-accent)]">
          <Sparkles className="size-3.5" /> Tiada katalog tema — kad anda, gaya anda
        </span>
        <h1 className="text-4xl font-bold leading-tight text-[var(--color-text)] sm:text-5xl">
          Kad jemputan digital, dijana dari rujukan gaya anda sendiri
        </h1>
        <p className="max-w-lg text-[var(--color-text)]/70">
          Muat naik gambar rujukan, biar sistem jana tema — warna, mood, hiasan dan huruf —
          pilih motion pembukaan, bayar, terus dapat kad untuk dikongsi di WhatsApp &
          Instagram.
        </p>
        <div className="flex gap-3">
          <Link href="/daftar">
            <Butang varian="utama">Mula cipta jemputan</Butang>
          </Link>
          <Link href="/contoh">
            <Butang varian="sekunder">Lihat contoh</Butang>
          </Link>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <h2 className="text-center text-2xl font-semibold text-[var(--color-text)]">
          Pilih pakej yang sesuai
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {fixturePakej.map((p) => (
            <KadPakej
              key={p.kod}
              nama={p.namaPapar}
              hargaSen={p.hargaSen}
              popular={p.popular}
              ciri={[
                `${p.bilHalaman} halaman scroll`,
                p.motionTersuai ? "Semua motion + motion tersuai" : `${p.motionDibenar.length} motion pembukaan`,
                `${p.hadRujukan} imej rujukan`,
                `Kuota RSVP ${p.kuotaRsvp}`,
              ]}
            />
          ))}
        </div>
        <p className="text-center text-xs text-[var(--color-text)]/50">
          Harga bermula {formatRinggit(fixturePakej[0]!.hargaSen)} — lihat butiran penuh di{" "}
          <Link href="/harga" className="text-[var(--color-accent)] underline">
            halaman harga
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
