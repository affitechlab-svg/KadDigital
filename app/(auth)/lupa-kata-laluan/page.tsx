"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Amaran } from "@/komponen/ui/Amaran";
import { Butang } from "@/komponen/ui/Butang";
import { Input } from "@/komponen/ui/Input";

/** UI sahaja — penghantaran e-mel reset sebenar (Supabase Auth) dibina dalam Fasa 4. */
export default function HalamanLupaKataLaluan() {
  const [dihantar, setDihantar] = useState(false);

  function hantar(e: FormEvent) {
    e.preventDefault();
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
          <Input label="E-mel" type="email" placeholder="anda@contoh.com" required />
          <Butang type="submit" className="w-full">
            Hantar pautan
          </Butang>
        </form>
      )}
    </div>
  );
}
