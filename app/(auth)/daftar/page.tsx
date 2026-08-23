"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { Amaran } from "@/komponen/ui/Amaran";
import { Butang } from "@/komponen/ui/Butang";
import { Input } from "@/komponen/ui/Input";
import { skemaDaftar } from "@/lib/skema/auth";
import { ciptaKlienPelayar } from "@/lib/supabase/pelayar";

function mesejRalatDaftar(mesej: string): string {
  if (mesej.toLowerCase().includes("already registered") || mesej.toLowerCase().includes("already exists")) {
    return "E-mel ini sudah didaftarkan. Sila log masuk.";
  }
  return "Pendaftaran gagal. Sila cuba lagi.";
}

export default function HalamanDaftar() {
  const router = useRouter();
  const [ralat, setRalat] = useState<{ nama?: string; emel?: string; kataLaluan?: string; umum?: string }>({});
  const [memuat, setMemuat] = useState(false);

  async function hantar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setRalat({});

    const borang = new FormData(e.currentTarget);
    const hasil = skemaDaftar.safeParse({
      nama: borang.get("nama"),
      emel: borang.get("emel"),
      kataLaluan: borang.get("kataLaluan"),
    });
    if (!hasil.success) {
      const medan = hasil.error.flatten().fieldErrors;
      setRalat({ nama: medan.nama?.[0], emel: medan.emel?.[0], kataLaluan: medan.kataLaluan?.[0] });
      return;
    }

    setMemuat(true);
    const supabase = ciptaKlienPelayar();
    const { error } = await supabase.auth.signUp({
      email: hasil.data.emel,
      password: hasil.data.kataLaluan,
      options: { data: { nama: hasil.data.nama } },
    });
    setMemuat(false);

    if (error) {
      setRalat({ umum: mesejRalatDaftar(error.message) });
      return;
    }

    router.push("/buat/pakej");
    router.refresh();
  }

  return (
    <form onSubmit={hantar} className="flex flex-col gap-4 rounded-[var(--radius)] border border-[var(--color-section-ghost)] bg-[var(--color-surface)] p-6">
      <div>
        <h1 className="text-xl font-semibold text-[var(--color-text)]">Daftar akaun</h1>
        <p className="mt-1 text-sm text-[var(--color-text)]/60">
          Mula cipta jemputan digital anda.
        </p>
      </div>
      {ralat.umum && <Amaran jenis="amaran">{ralat.umum}</Amaran>}
      <Input name="nama" label="Nama penuh" placeholder="Cth: Nurul Aina" ralat={ralat.nama} />
      <Input name="emel" label="E-mel" type="email" placeholder="anda@contoh.com" ralat={ralat.emel} />
      <Input
        name="kataLaluan"
        label="Kata laluan"
        type="password"
        petunjuk={ralat.kataLaluan ? undefined : "Sekurang-kurangnya 8 aksara"}
        ralat={ralat.kataLaluan}
      />
      <Butang type="submit" memuat={memuat} className="mt-2 w-full">
        Daftar
      </Butang>
      <p className="text-center text-sm text-[var(--color-text)]/60">
        Sudah ada akaun?{" "}
        <Link href="/masuk" className="text-[var(--color-accent)] underline">
          Log masuk
        </Link>
      </p>
    </form>
  );
}
