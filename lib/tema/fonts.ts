import {
  Cormorant_Garamond,
  Great_Vibes,
  Inter,
  Lato,
  Marcellus,
  Playfair_Display,
  Quicksand,
} from "next/font/google";

// Senarai tetap 5 pasangan huruf sahaja (01-PRD.md §6 peraturan 5) — jangan tambah
// font sewenang-wenangnya (CLAUDE.md §3.6 / 02-TECH-STACK.md §5).
const fontMarcellus = Marcellus({ subsets: ["latin"], weight: "400", variable: "--font-marcellus" });
const fontCormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-cormorant",
});
const fontPlayfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const fontLato = Lato({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-lato" });
const fontGreatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
});
const fontQuicksand = Quicksand({ subsets: ["latin"], variable: "--font-quicksand" });
const fontInter = Inter({ subsets: ["latin"], variable: "--font-inter-kad" });

const semuaFontKad = [
  fontMarcellus,
  fontCormorant,
  fontPlayfair,
  fontLato,
  fontGreatVibes,
  fontQuicksand,
  fontInter,
];

/** ClassName gabungan semua CSS variable font — letak pada bekas kad. */
export const kelasFontKad = semuaFontKad.map((f) => f.variable).join(" ");

const petaFont: Record<string, string> = {
  Marcellus: "var(--font-marcellus), serif",
  "Cormorant Garamond": "var(--font-cormorant), serif",
  "Playfair Display": "var(--font-playfair), serif",
  Lato: "var(--font-lato), sans-serif",
  "Great Vibes": "var(--font-great-vibes), cursive",
  Quicksand: "var(--font-quicksand), sans-serif",
  Inter: "var(--font-inter-kad), sans-serif",
};

export function nilaiCssFont(namaFont: string): string {
  return petaFont[namaFont] ?? "system-ui, sans-serif";
}

export interface PasanganHuruf {
  nama: string;
  tajuk: string;
  badan: string;
}

/** 5 pasangan huruf siap tulis, dipetakan dari mood (01-PRD.md §6 peraturan 5). */
export const pasanganHurufKad: PasanganHuruf[] = [
  { nama: "Elegan", tajuk: "Marcellus", badan: "Cormorant Garamond" },
  { nama: "Klasik", tajuk: "Playfair Display", badan: "Lato" },
  { nama: "Tulisan tangan", tajuk: "Great Vibes", badan: "Lato" },
  { nama: "Lembut", tajuk: "Quicksand", badan: "Quicksand" },
  { nama: "Bersih", tajuk: "Inter", badan: "Inter" },
];
