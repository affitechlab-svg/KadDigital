import type { MotionKod } from "@/lib/fixture/jenis";

export interface MotionFixture {
  kod: MotionKod;
  nama: string;
  huraian: string;
  pakejMinimum: "ringkas" | "standard" | "premium";
  aktif: boolean;
  susunan: number;
}

export const fixtureMotion: MotionFixture[] = [
  {
    kod: "sampul",
    nama: "Sampul — kepak terbuka",
    huraian: "Penutup terlipat ke belakang, kad naik keluar.",
    pakejMinimum: "standard",
    aktif: true,
    susunan: 1,
  },
  {
    kod: "tirai",
    nama: "Tirai — belah dua",
    huraian: "Dua panel meluncur ke tepi, kad terdedah di tengah.",
    pakejMinimum: "standard",
    aktif: true,
    susunan: 2,
  },
  {
    kod: "bidai",
    nama: "Bidai — angkat ke atas",
    huraian: "Bidai terangkat ke atas mendedahkan kad.",
    pakejMinimum: "standard",
    aktif: true,
    susunan: 3,
  },
  {
    kod: "larut",
    nama: "Larut — pudar & zum",
    huraian: "Tanpa sampul: kad membesar keluar dari pendar cahaya.",
    pakejMinimum: "ringkas",
    aktif: true,
    susunan: 4,
  },
];
