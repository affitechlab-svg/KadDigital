import type { Tema } from "@/lib/tema/jenis";

export type JenisAcara = "kahwin" | "korporat" | "pasukan" | "latihan" | "tersuai";
export type MotionKod = "sampul" | "tirai" | "bidai" | "larut";
export type BentukPotong = "gerbang" | "bulat" | "segi";
export type Taburan = "tiada" | "kelopak" | "hati";
export type BahasaKad = "ms" | "en";

export interface AturCaraItem {
  masa: string;
  aktiviti: string;
}

export interface PesananFixture {
  id: string;
  slug: string;
  jenisAcara: JenisAcara;
  jenisTersuai?: string;
  kicker: string;
  tajukA: string;
  tajukB?: string;
  penyambung: string;
  tarikhMajlis: string;
  masaTeks: string;
  venueNama: string;
  venueAlamat: string;
  pautanWaze: string;
  pautanMaps: string;
  aturCara: AturCaraItem[];
  kataTeks?: string;
  kataOleh?: string;
  tema: Tema;
  bentukPotong: BentukPotong;
  tunjukGambarUtama: boolean;
  gambarUtamaUrl: string;
  motionKod: MotionKod;
  taburan: Taburan;
  bahasaLalai: BahasaKad;
  dwibahasa: boolean;
  bilHalaman: 3 | 4;
  kuotaRsvpBaki: number;
  nomborWhatsapp: string;
}
