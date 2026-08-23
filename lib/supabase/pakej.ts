import type { SupabaseClient } from "@supabase/supabase-js";
import type { PakejFixture } from "@/lib/fixture/pakej";

interface BarisPakejDb {
  kod: string;
  nama_papar: string;
  harga_sen: number;
  susunan: number;
  popular: boolean;
  bil_halaman: number;
  motion_dibenar: string[];
  motion_tersuai: boolean;
  had_rujukan: number;
  had_jana_semula: number;
  laras_manual: boolean;
  gambar_subjek: string[];
  bentuk_dibenar: string[];
  had_atur_cara: number;
  muzik: string;
  taburan: boolean;
  dwibahasa: boolean;
  kuota_rsvp: number;
  bulan_aktif: number;
  aktif: boolean;
}

function petakBarisPakej(b: BarisPakejDb): PakejFixture {
  return {
    kod: b.kod as PakejFixture["kod"],
    namaPapar: b.nama_papar,
    hargaSen: b.harga_sen,
    susunan: b.susunan,
    popular: b.popular,
    bilHalaman: b.bil_halaman as 3 | 4,
    motionDibenar: b.motion_dibenar as PakejFixture["motionDibenar"],
    motionTersuai: b.motion_tersuai,
    hadRujukan: b.had_rujukan,
    hadJanaSemula: b.had_jana_semula,
    larasManual: b.laras_manual,
    gambarSubjek: b.gambar_subjek as PakejFixture["gambarSubjek"],
    bentukDibenar: b.bentuk_dibenar as PakejFixture["bentukDibenar"],
    hadAturCara: b.had_atur_cara,
    muzik: b.muzik as PakejFixture["muzik"],
    taburan: b.taburan,
    dwibahasa: b.dwibahasa,
    kuotaRsvp: b.kuota_rsvp,
    bulanAktif: b.bulan_aktif,
    aktif: b.aktif,
  };
}

/**
 * Baca pakej terus dari jadual DB (bukan fixture) — Fasa 4. Bentuk pulangan
 * sama seperti `PakejFixture` supaya komponen paparan tidak perlu berubah.
 */
export async function dapatkanSenaraiPakej(
  klien: SupabaseClient,
): Promise<PakejFixture[]> {
  const { data, error } = await klien
    .from("pakej")
    .select("*")
    .eq("aktif", true)
    .order("susunan");

  if (error || !data) return [];
  return (data as BarisPakejDb[]).map(petakBarisPakej);
}
