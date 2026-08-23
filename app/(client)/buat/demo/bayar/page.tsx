"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, QrCode, Wallet } from "lucide-react";
import { useDrafPesanan } from "@/komponen/buat/DrafPesananProvider";
import { BingkaiLangkah } from "@/komponen/buat/BingkaiLangkah";
import { Butang } from "@/komponen/ui/Butang";
import { RadioKad } from "@/komponen/ui/RadioKad";
import { cariPakej, formatRinggit } from "@/lib/fixture/pakej";

const kaedahBayaran = [
  { nilai: "duitnow", label: "DuitNow QR", ikon: QrCode },
  { nilai: "fpx", label: "FPX (perbankan online)", ikon: Wallet },
  { nilai: "kad", label: "Kad kredit/debit", ikon: CreditCard },
];

export default function LangkahBayar() {
  const router = useRouter();
  const { draf } = useDrafPesanan();
  const pakej = cariPakej(draf.pakejKod);
  const [kaedah, setKaedah] = useState("duitnow");
  const [memproses, setMemproses] = useState(false);

  function bayar() {
    setMemproses(true);
    window.setTimeout(() => router.push("/buat/demo/selesai"), 900);
  }

  return (
    <BingkaiLangkah tajuk="Bayaran" semasa={8} jumlah={8} laluanKembali="/buat/demo/pratonton">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between rounded-[var(--radius)] border border-[var(--color-section-ghost)] bg-[var(--color-surface)] p-4">
          <div>
            <p className="text-sm text-[var(--color-text)]/60">Pakej {pakej.namaPapar}</p>
            <p className="text-xs text-[var(--color-text)]/40">Kad {draf.tajukA || "Anda"}</p>
          </div>
          <p className="text-xl font-bold text-[var(--color-text)]">{formatRinggit(pakej.hargaSen)}</p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-[var(--color-text)]">Cara bayaran</p>
          {kaedahBayaran.map((k) => (
            <RadioKad
              key={k.nilai}
              nama="kaedah"
              nilai={k.nilai}
              dipilih={kaedah === k.nilai}
              onPilih={setKaedah}
              tajuk={k.label}
            />
          ))}
        </div>

        <Butang className="w-full" memuat={memproses} onClick={bayar}>
          Bayar {formatRinggit(pakej.hargaSen)}
        </Butang>
        <p className="text-center text-xs text-[var(--color-text)]/40">
          Simulasi Fasa 3 — gateway ToyyibPay sebenar disambung dalam Fasa 6.
        </p>
      </div>
    </BingkaiLangkah>
  );
}
