"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { type FormEvent, Suspense, useState } from "react";
import { Amaran } from "@/komponen/ui/Amaran";
import { Butang } from "@/komponen/ui/Butang";
import { Input } from "@/komponen/ui/Input";
import { skemaMasuk } from "@/lib/skema/auth";
import { ciptaKlienPelayar } from "@/lib/supabase/pelayar";

function BorangMasuk() {
  const router = useRouter();
  const params = useSearchParams();
  const [ralat, setRalat] = useState<{ emel?: string; kataLaluan?: string; umum?: string }>({});
  const [memuat, setMemuat] = useState(false);

  async function hantar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setRalat({});

    const borang = new FormData(e.currentTarget);
    const hasil = skemaMasuk.safeParse({
      emel: borang.get("emel"),
      kataLaluan: borang.get("kataLaluan"),
    });
    if (!hasil.success) {
      const medan = hasil.error.flatten().fieldErrors;
      setRalat({ emel: medan.emel?.[0], kataLaluan: medan.kataLaluan?.[0] });
      return;
    }

    setMemuat(true);
    const supabase = ciptaKlienPelayar();
    const { error } = await supabase.auth.signInWithPassword({
      email: hasil.data.emel,
      password: hasil.data.kataLaluan,
    });
    setMemuat(false);

    if (error) {
      setRalat({ umum: "E-mel atau kata laluan salah." });
      return;
    }

    const seterusnya = params.get("seterusnya") || "/dashboard";
    router.push(seterusnya);
    router.refresh();
  }

  return (
    <form onSubmit={hantar} className="flex flex-col gap-4 rounded-[var(--radius)] border border-[var(--color-section-ghost)] bg-[var(--color-surface)] p-6">
      <div>
        <h1 className="text-xl font-semibold text-[var(--color-text)]">Log masuk</h1>
      </div>
      {ralat.umum && <Amaran jenis="amaran">{ralat.umum}</Amaran>}
      <Input name="emel" label="E-mel" type="email" placeholder="anda@contoh.com" ralat={ralat.emel} />
      <Input name="kataLaluan" label="Kata laluan" type="password" ralat={ralat.kataLaluan} />
      <div className="text-right">
        <Link href="/lupa-kata-laluan" className="text-xs text-[var(--color-accent)] underline">
          Lupa kata laluan?
        </Link>
      </div>
      <Butang type="submit" memuat={memuat} className="mt-2 w-full">
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

export default function HalamanMasuk() {
  return (
    <Suspense>
      <BorangMasuk />
    </Suspense>
  );
}
