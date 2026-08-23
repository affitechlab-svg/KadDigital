"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { BarAtas } from "@/komponen/ui/BarAtas";
import { Amaran } from "@/komponen/ui/Amaran";
import { Butang } from "@/komponen/ui/Butang";
import { Input } from "@/komponen/ui/Input";
import { ciptaKlienPelayar } from "@/lib/supabase/pelayar";

export default function HalamanAkaun() {
  const router = useRouter();
  const supabase = ciptaKlienPelayar();

  const [nama, setNama] = useState("");
  const [emel, setEmel] = useState("");
  const [telefon, setTelefon] = useState("");
  const [kataLaluanBaru, setKataLaluanBaru] = useState("");
  const [disimpan, setDisimpan] = useState(false);
  const [ralat, setRalat] = useState<string | null>(null);
  const [memuat, setMemuat] = useState(false);

  useEffect(() => {
    async function muatkan() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      setEmel(user.email ?? "");
      const { data: profil } = await supabase
        .from("profil")
        .select("nama, telefon")
        .eq("id", user.id)
        .single();
      if (profil) {
        setNama(profil.nama ?? "");
        setTelefon(profil.telefon ?? "");
      }
    }
    void muatkan();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- klien Supabase stabil, cukup jalan sekali
  }, []);

  async function simpan(e: FormEvent) {
    e.preventDefault();
    setRalat(null);
    setMemuat(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setMemuat(false);
      return;
    }

    const { error } = await supabase.from("profil").update({ nama, telefon }).eq("id", user.id);
    setMemuat(false);
    if (error) {
      setRalat("Gagal simpan perubahan.");
      return;
    }
    setDisimpan(true);
  }

  async function kemaskiniKataLaluan() {
    if (kataLaluanBaru.length < 8) {
      setRalat("Kata laluan sekurang-kurangnya 8 aksara.");
      return;
    }
    setRalat(null);
    const { error } = await supabase.auth.updateUser({ password: kataLaluanBaru });
    if (error) {
      setRalat("Gagal kemaskini kata laluan.");
      return;
    }
    setKataLaluanBaru("");
    setDisimpan(true);
  }

  async function logKeluar() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <BarAtas
        tajuk="Akaun Saya"
        aksiKanan={
          <Butang varian="hantu" onClick={logKeluar}>
            <LogOut className="size-3.5" /> Log keluar
          </Butang>
        }
      />
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-4 px-4 py-6">
        {disimpan && <Amaran jenis="berjaya">Perubahan telah disimpan.</Amaran>}
        {ralat && <Amaran jenis="amaran">{ralat}</Amaran>}
        <form onSubmit={simpan} className="flex flex-col gap-4">
          <Input label="Nama" value={nama} onChange={(e) => setNama(e.target.value)} />
          <Input label="E-mel" type="email" value={emel} disabled petunjuk="E-mel tidak boleh ditukar" />
          <Input label="Telefon" value={telefon} onChange={(e) => setTelefon(e.target.value)} />
          <Butang type="submit" memuat={memuat} className="mt-2 w-full">
            Simpan
          </Butang>
        </form>

        <div className="mt-4 flex flex-col gap-3 border-t border-[var(--color-section-ghost)] pt-4">
          <p className="text-sm font-medium text-[var(--color-text)]">Tukar kata laluan</p>
          <Input
            label="Kata laluan baru"
            type="password"
            petunjuk="Sekurang-kurangnya 8 aksara"
            value={kataLaluanBaru}
            onChange={(e) => setKataLaluanBaru(e.target.value)}
          />
          <Butang varian="sekunder" className="w-full" onClick={kemaskiniKataLaluan}>
            Kemaskini kata laluan
          </Butang>
        </div>
      </main>
    </div>
  );
}
