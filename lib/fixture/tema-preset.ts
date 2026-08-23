import type { Tema } from "@/lib/tema/jenis";

export interface PresetTema {
  nama: string;
  tema: Tema;
}

export const presetTemaKad: PresetTema[] = [
  {
    nama: "Malam Ungu",
    tema: {
      palet: ["#1b1230", "#3a2a5c", "#9184d9", "#e8d9b5", "#f5f2ec"],
      mood: "Tenang, malam, berpendar",
      hiasan: ["kekisi wajik halus", "pendar lembut"],
      huruf: { tajuk: "Great Vibes", badan: "Cormorant Garamond" },
      sumber: "auto",
      cubaan: 1,
    },
  },
  {
    nama: "Segar Emas",
    tema: {
      palet: ["#2b2013", "#4a3a22", "#d8a54a", "#e9dcc3", "#f8f2e6"],
      mood: "Hangat, mewah, keemasan",
      hiasan: ["garis daun emas"],
      huruf: { tajuk: "Marcellus", badan: "Cormorant Garamond" },
      sumber: "auto",
      cubaan: 1,
    },
  },
  {
    nama: "Korporat Biru",
    tema: {
      palet: ["#0f1420", "#1c2438", "#4f7cff", "#c7cede", "#f4f6fb"],
      mood: "Bersih, profesional, terang",
      hiasan: ["garis geometri halus"],
      huruf: { tajuk: "Inter", badan: "Inter" },
      sumber: "auto",
      cubaan: 1,
    },
  },
];
