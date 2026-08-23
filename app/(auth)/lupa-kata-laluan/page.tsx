"use client";

import { type FormEvent, useState } from "react";
import { Amaran } from "@/komponen/ui/Amaran";
import { Butang } from "@/komponen/ui/Butang";
import { Input } from "@/komponen/ui/Input";
import { skemaLupaKataLaluan } from "@/lib/skema/auth";
import { ciptaKlienPelayar } from "@/lib/supabase/pelayar";

export default function HalamanLupaKataLaluan() {
  const [dihantar, setDihantar] = useState(false);
  const [ralat, setRalat] = useState<{ emel?: string }>({});
  const [memuat, setMemuat] = useState(false);

  async function hantar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setRalat({});

    const borang = new FormData(e.currentTarget);
    const hasil = skemaLupaKataLaluan.safeParse({ emel: borang.get("emel") });
    if (!hasil.success) {
      setRalat({ emel: hasil.error.flatten().fieldErrors.emel?.[0] });
      return;
    }

    setMemuat(true);
    const supabase = ciptaKlienPelayar();
    await supabase.auth.resetPasswordForEmail(hasil.data.emel, {
      redirectTo: `${window.location.origin}/tetapkan-kata-laluan`,
    });
    setMemuat(false);
    // Sentiasa papar mesej berjaya walau e-mel wujud atau tidak — elak
    // membocorkan kewujudan akaun (enumeration).
    setDihantar(true);
  }

  return (
    <div className="flex flex-col gap-4 rounded-[var(--radius)] border border-[var(--color-section-ghost)] bg-[var(--color-surface)] p-6">
      <div>
        <h1 className="text-xl font-semibold text-[var(--color-text)]">Lupa kata laluan</h1>
        <p className="mt-1 text-sm text-[var(--color-text)]/60">
          Masukkan e-mel anda — pautan tetapkan semula akan dihantar.
        </p>
      </div>
      {dihantar ? (
        <Amaran jenis="berjaya" tajuk="E-mel dihantar">
          Sila semak peti masuk anda untuk pautan tetapkan semula kata laluan.
        </Amaran>
      ) : (
        <form onSubmit={hantar} className="flex flex-col gap-4">
          <Input name="emel" label="E-mel" type="email" placeholder="anda@contoh.com" ralat={ralat.emel} />
          <Butang type="submit" memuat={memuat} className="w-full">
            Hantar pautan
          </Butang>
        </form>
      )}
    </div>
  );
}
