import type { BentukPotong, MotionKod } from "@/lib/fixture/jenis";

export interface PakejFixture {
  kod: "ringkas" | "standard" | "premium";
  namaPapar: string;
  hargaSen: number;
  susunan: number;
  popular: boolean;
  bilHalaman: 3 | 4;
  motionDibenar: MotionKod[];
  motionTersuai: boolean;
  hadRujukan: number;
  hadJanaSemula: number;
  larasManual: boolean;
  gambarSubjek: ("utama" | "sampingan" | "logo")[];
  bentukDibenar: BentukPotong[];
  hadAturCara: number;
  muzik: "tiada" | "pustaka" | "pustaka_upload";
  taburan: boolean;
  dwibahasa: boolean;
  kuotaRsvp: number;
  bulanAktif: number;
  aktif: boolean;
}

/** Bentuk sama seperti jadual `pakej` DB (04-DATA-MODEL.md §6.1) — Fasa 4 tukar sumber sahaja. */
export const fixturePakej: PakejFixture[] = [
  {
    kod: "ringkas",
    namaPapar: "Simple",
    hargaSen: 3000,
    susunan: 1,
    popular: false,
    bilHalaman: 3,
    motionDibenar: ["larut"],
    motionTersuai: false,
    hadRujukan: 1,
    hadJanaSemula: 1,
    larasManual: false,
    gambarSubjek: [],
    bentukDibenar: [],
    hadAturCara: 3,
    muzik: "tiada",
    taburan: false,
    dwibahasa: false,
    kuotaRsvp: 100,
    bulanAktif: 3,
    aktif: true,
  },
  {
    kod: "standard",
    namaPapar: "Signature",
    hargaSen: 4000,
    susunan: 2,
    popular: true,
    bilHalaman: 4,
    motionDibenar: ["sampul", "tirai", "bidai", "larut"],
    motionTersuai: false,
    hadRujukan: 4,
    hadJanaSemula: 3,
    larasManual: true,
    gambarSubjek: ["logo"],
    bentukDibenar: ["bulat", "segi"],
    hadAturCara: 3,
    muzik: "pustaka",
    taburan: true,
    dwibahasa: true,
    kuotaRsvp: 300,
    bulanAktif: 6,
    aktif: true,
  },
  {
    kod: "premium",
    namaPapar: "Luxury",
    hargaSen: 5500,
    susunan: 3,
    popular: false,
    bilHalaman: 4,
    motionDibenar: ["sampul", "tirai", "bidai", "larut"],
    motionTersuai: true,
    hadRujukan: 4,
    hadJanaSemula: 10,
    larasManual: true,
    gambarSubjek: ["utama", "sampingan", "logo"],
    bentukDibenar: ["gerbang", "bulat", "segi"],
    hadAturCara: 6,
    muzik: "pustaka_upload",
    taburan: true,
    dwibahasa: true,
    kuotaRsvp: 1000,
    bulanAktif: 12,
    aktif: true,
  },
];

export function cariPakej(kod: string): PakejFixture {
  return fixturePakej.find((p) => p.kod === kod) ?? fixturePakej[1]!;
}

export function formatRinggit(sen: number): string {
  return `RM${(sen / 100).toFixed(0)}`;
}
