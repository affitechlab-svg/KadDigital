"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { BarAtas } from "@/komponen/ui/BarAtas";
import { Amaran } from "@/komponen/ui/Amaran";
import { Butang } from "@/komponen/ui/Butang";
import { Input } from "@/komponen/ui/Input";

export default function HalamanAkaun() {
  const [disimpan, setDisimpan] = useState(false);

  function simpan(e: FormEvent) {
    e.preventDefault();
    setDisimpan(true);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <BarAtas tajuk="Akaun Saya" />
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-4 px-4 py-6">
        {disimpan && (
          <Amaran jenis="berjaya">Perubahan telah disimpan.</Amaran>
        )}
        <form onSubmit={simpan} className="flex flex-col gap-4">
          <Input label="Nama" defaultValue="Nurul Aina" />
          <Input label="E-mel" type="email" defaultValue="nurul@contoh.com" disabled petunjuk="E-mel tidak boleh ditukar" />
          <Input label="Telefon" defaultValue="+60123456789" />
          <Butang type="submit" className="mt-2 w-full">
            Simpan
          </Butang>
        </form>

        <div className="mt-4 flex flex-col gap-3 border-t border-[var(--color-section-ghost)] pt-4">
          <p className="text-sm font-medium text-[var(--color-text)]">Tukar kata laluan</p>
          <Input label="Kata laluan baru" type="password" petunjuk="Sekurang-kurangnya 8 aksara" />
          <Butang varian="sekunder" className="w-full">
            Kemaskini kata laluan
          </Butang>
        </div>
      </main>
    </div>
  );
}
