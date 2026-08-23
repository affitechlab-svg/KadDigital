import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { beforeAll, describe, expect, it } from "vitest";

/**
 * Ujian RLS automatik — 09-BUILD-PHASES.md Fasa 4 "Done bila…":
 * "Ujian RLS lulus: pengguna A tidak boleh baca pesanan pengguna B".
 *
 * Ujian ini panggil Supabase SEBENAR melalui kunci anon (bukan raw
 * Postgres) — memerlukan `supabase start` jalan tempatan (Docker).
 * Jika tiada instance boleh dicapai, suite dilangkau dengan mesej jelas
 * (bukan gagal senyap) supaya `pnpm test` tetap boleh jalan di persekitaran
 * tanpa Docker (cth. sandbox CI ini).
 */

const URL_SUPABASE = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "http://127.0.0.1:54321";
const KUNCI_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

async function supabaseBolehDicapai(): Promise<boolean> {
  try {
    const kawalan = new AbortController();
    const masaTamat = setTimeout(() => kawalan.abort(), 2000);
    const res = await fetch(`${URL_SUPABASE}/auth/v1/health`, { signal: kawalan.signal });
    clearTimeout(masaTamat);
    return res.ok;
  } catch {
    return false;
  }
}

const bolehDicapai = await supabaseBolehDicapai();

describe.skipIf(!bolehDicapai)("RLS — pesanan & dapatkan_kad", () => {
  const emelA = `ujian-a-${Date.now()}@kaddigital.test`;
  const emelB = `ujian-b-${Date.now()}@kaddigital.test`;
  const kataLaluan = "kataLaluanUjian123";
  let idPesananA: string;
  let klienA: SupabaseClient;
  let klienB: SupabaseClient;

  beforeAll(async () => {
    klienA = createClient(URL_SUPABASE, KUNCI_ANON);
    klienB = createClient(URL_SUPABASE, KUNCI_ANON);

    const { error: ralatA } = await klienA.auth.signUp({ email: emelA, password: kataLaluan });
    if (ralatA) throw ralatA;
    const { error: ralatB } = await klienB.auth.signUp({ email: emelB, password: kataLaluan });
    if (ralatB) throw ralatB;

    const { data: pesanan, error: ralatInsert } = await klienA
      .from("pesanan")
      .insert({ pakej_kod: "ringkas", tajuk_a: "Ujian RLS A", tarikh_majlis: "2027-01-01" })
      .select("id")
      .single();
    if (ralatInsert) throw ralatInsert;
    idPesananA = pesanan.id;
  });

  it("pengguna B tidak boleh baca pesanan pengguna A", async () => {
    const { data } = await klienB.from("pesanan").select("id").eq("id", idPesananA);
    expect(data).toEqual([]);
  });

  it("pengguna A boleh baca pesanan sendiri", async () => {
    const { data } = await klienA.from("pesanan").select("id").eq("id", idPesananA);
    expect(data).toHaveLength(1);
  });

  it("pengguna B tidak boleh INSERT pesanan bagi pihak pengguna A", async () => {
    const { error } = await klienB
      .from("pesanan")
      .insert({ profil_id: idPesananA, pakej_kod: "ringkas", tajuk_a: "Cubaan", tarikh_majlis: "2027-01-01" });
    expect(error).not.toBeNull();
  });

  it("client tidak boleh tukar status ke 'dibayar' terus", async () => {
    const { error } = await klienA.from("pesanan").update({ status: "dibayar" }).eq("id", idPesananA);
    expect(error).not.toBeNull();
  });

  it("dapatkan_kad('contoh-kahwin') memulangkan data", async () => {
    const { data, error } = await klienA.rpc("dapatkan_kad", { p_slug: "contoh-kahwin" });
    expect(error).toBeNull();
    expect(data).toHaveLength(1);
  });

  it("dapatkan_kad('<draf/tidak wujud>') memulangkan kosong", async () => {
    const { data, error } = await klienA.rpc("dapatkan_kad", { p_slug: "tidak-wujud-langsung" });
    expect(error).toBeNull();
    expect(data).toEqual([]);
  });
});

describe.skipIf(bolehDicapai)("RLS (dilangkau)", () => {
  it("Supabase tempatan tidak dikesan — jalankan `supabase start` dahulu", () => {
    console.warn(
      "[rls.test.ts] Supabase tempatan tidak dapat dicapai di " +
        URL_SUPABASE +
        " — ujian RLS dilangkau. Jalankan `supabase start` (perlukan Docker) dahulu.",
    );
    expect(true).toBe(true);
  });
});
