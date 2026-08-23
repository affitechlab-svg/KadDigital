"use client";

import { CheckCircle2, Copy, Instagram, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useDrafPesanan } from "@/komponen/buat/DrafPesananProvider";
import { Butang } from "@/komponen/ui/Butang";

export default function LangkahSelesai() {
  const { draf } = useDrafPesanan();
  const [disalin, setDisalin] = useState(false);
  const pautan = "https://kaddigital.my/i/pratonton-demo";

  async function salin() {
    try {
      await navigator.clipboard.writeText(pautan);
      setDisalin(true);
    } catch {
      setDisalin(true);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col items-center justify-center gap-6 px-4 py-12 text-center">
      <CheckCircle2 className="size-16 text-emerald-400" />
      <div>
        <h1 className="text-xl font-semibold text-[var(--color-text)]">Bayaran berjaya!</h1>
        <p className="mt-1 text-sm text-[var(--color-text)]/60">
          Kad jemputan {draf.tajukA || "anda"} kini hidup.
        </p>
      </div>

      <div className="w-full rounded-[var(--radius)] border border-[var(--color-section-ghost)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-text)]">
        {pautan}
      </div>

      <div className="flex w-full flex-col gap-2">
        <Butang varian="sekunder" onClick={salin} className="w-full">
          <Copy className="size-4" /> {disalin ? "Disalin!" : "Salin pautan"}
        </Butang>
        <Butang
          varian="sekunder"
          className="w-full"
          onClick={() =>
            window.open(`https://wa.me/?text=${encodeURIComponent(pautan)}`, "_blank")
          }
        >
          <MessageCircle className="size-4" /> Kongsi ke WhatsApp
        </Butang>
        <Butang varian="sekunder" className="w-full" disabled>
          <Instagram className="size-4" /> Kongsi ke Instagram
        </Butang>
      </div>

      <Link href="/dashboard" className="w-full">
        <Butang className="w-full">Buka dashboard saya</Butang>
      </Link>
    </main>
  );
}
