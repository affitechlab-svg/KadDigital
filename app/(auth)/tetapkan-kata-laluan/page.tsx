"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { Amaran } from "@/komponen/ui/Amaran";
import { Butang } from "@/komponen/ui/Butang";
import { Input } from "@/komponen/ui/Input";
import { skemaTetapkanKataLaluan } from "@/lib/skema/auth";
import { ciptaKlienPelayar } from "@/lib/supabase/pelayar";

/** Dicapai dari pautan e-mel `resetPasswordForEmail` — Supabase sudah tetapkan sesi sementara. */
export default function HalamanTetapkanKataLaluan() {
  const router = useRouter();
  const [ralat, setRalat] = useState<{ kataLaluan?: string; sahkanKataLaluan?: string; umum?: string }>({});
  const [memuat, setMemuat] = useState(false);

  async function hantar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setRalat({});

    const borang = new FormData(e.currentTarget);
    const hasil = skemaTetapkanKataLaluan.safeParse({
      kataLaluan: borang.get("kataLaluan"),
      sahkanKataLaluan: borang.get("sahkanKataLaluan"),
    });
    if (!hasil.success) {
      const medan = hasil.error.flatten().fieldErrors;
      setRalat({ kataLaluan: medan.kataLaluan?.[0], sahkanKataLaluan: medan.sahkanKataLaluan?.[0] });
      return;
    }

    setMemuat(true);
    const supabase = ciptaKlienPelayar();
    const { error } = await supabase.auth.updateUser({ password: hasil.data.kataLaluan });
    setMemuat(false);

    if (error) {
      setRalat({ umum: "Gagal tetapkan kata laluan. Pautan mungkin telah luput — cuba semula." });
      return;
    }

    router.push("/masuk");
  }

  return (
    <form onSubmit={hantar} className="flex flex-col gap-4 rounded-[var(--radius)] border border-[var(--color-section-ghost)] bg-[var(--color-surface)] p-6">
      <div>
        <h1 className="text-xl font-semibold text-[var(--color-text)]">Tetapkan kata laluan baru</h1>
      </div>
      {ralat.umum && <Amaran jenis="amaran">{ralat.umum}</Amaran>}
      <Input
        name="kataLaluan"
        label="Kata laluan baru"
        type="password"
        petunjuk={ralat.kataLaluan ? undefined : "Sekurang-kurangnya 8 aksara"}
        ralat={ralat.kataLaluan}
      />
      <Input name="sahkanKataLaluan" label="Sahkan kata laluan" type="password" ralat={ralat.sahkanKataLaluan} />
      <Butang type="submit" memuat={memuat} className="mt-2 w-full">
        Tetapkan kata laluan
      </Butang>
    </form>
  );
}
