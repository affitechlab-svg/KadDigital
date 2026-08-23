"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { Butang } from "@/komponen/ui/Butang";
import { Input } from "@/komponen/ui/Input";

/** UI sahaja — auth sebenar (Supabase) dibina dalam Fasa 4. */
export default function HalamanMasuk() {
  const router = useRouter();

  function hantar(e: FormEvent) {
    e.preventDefault();
    router.push("/dashboard");
  }

  return (
    <form onSubmit={hantar} className="flex flex-col gap-4 rounded-[var(--radius)] border border-[var(--color-section-ghost)] bg-[var(--color-surface)] p-6">
      <div>
        <h1 className="text-xl font-semibold text-[var(--color-text)]">Log masuk</h1>
      </div>
      <Input label="E-mel" type="email" placeholder="anda@contoh.com" required />
      <Input label="Kata laluan" type="password" required />
      <div className="text-right">
        <Link href="/lupa-kata-laluan" className="text-xs text-[var(--color-accent)] underline">
          Lupa kata laluan?
        </Link>
      </div>
      <Butang type="submit" className="mt-2 w-full">
        Log masuk
      </Butang>
      <p className="text-center text-sm text-[var(--color-text)]/60">
        Belum ada akaun?{" "}
        <Link href="/daftar" className="text-[var(--color-accent)] underline">
          Daftar
        </Link>
      </p>
    </form>
  );
}
