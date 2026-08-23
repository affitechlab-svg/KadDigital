"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { Butang } from "@/komponen/ui/Butang";
import { Input } from "@/komponen/ui/Input";

/** UI sahaja — dicapai dari pautan e-mel dalam produksi (Fasa 4). */
export default function HalamanTetapkanKataLaluan() {
  const router = useRouter();

  function hantar(e: FormEvent) {
    e.preventDefault();
    router.push("/masuk");
  }

  return (
    <form onSubmit={hantar} className="flex flex-col gap-4 rounded-[var(--radius)] border border-[var(--color-section-ghost)] bg-[var(--color-surface)] p-6">
      <div>
        <h1 className="text-xl font-semibold text-[var(--color-text)]">Tetapkan kata laluan baru</h1>
      </div>
      <Input label="Kata laluan baru" type="password" petunjuk="Sekurang-kurangnya 8 aksara" required minLength={8} />
      <Input label="Sahkan kata laluan" type="password" required minLength={8} />
      <Butang type="submit" className="mt-2 w-full">
        Tetapkan kata laluan
      </Butang>
    </form>
  );
}
