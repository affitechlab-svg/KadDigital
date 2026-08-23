import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Clock, EyeOff, FileQuestion, Slash } from "lucide-react";

export type KeadaanKad = "belum_terbit" | "ditarik" | "tamat_tempoh" | "tidak_wujud";

const kandungan: Record<KeadaanKad, { ikon: LucideIcon; tajuk: string; huraian: string }> = {
  belum_terbit: {
    ikon: EyeOff,
    tajuk: "Jemputan ini belum diterbitkan",
    huraian: "Pemilik jemputan belum menyelesaikan pembayaran.",
  },
  ditarik: {
    ikon: Slash,
    tajuk: "Jemputan ini tidak lagi tersedia",
    huraian: "Pautan ini telah ditarik balik oleh pemiliknya.",
  },
  tamat_tempoh: {
    ikon: Clock,
    tajuk: "Jemputan ini telah tamat tempoh",
    huraian: "Tempoh aktif pautan ini telah berakhir.",
  },
  tidak_wujud: {
    ikon: FileQuestion,
    tajuk: "Halaman tidak dijumpai",
    huraian: "Pautan ini tidak wujud atau telah disalah taip.",
  },
};

export function HalamanKeadaanKad({ keadaan }: { keadaan: KeadaanKad }) {
  const { ikon: Ikon, tajuk, huraian } = kandungan[keadaan];
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[var(--color-bg)] px-6 text-center text-[var(--color-text)]">
      <Ikon className="size-10 opacity-50" />
      <h1 className="text-xl font-semibold">{tajuk}</h1>
      <p className="max-w-xs text-sm text-[var(--color-text)]/60">{huraian}</p>
      <Link href="/" className="mt-2 text-sm text-[var(--color-accent)] underline">
        Kembali ke laman utama
      </Link>
    </main>
  );
}
