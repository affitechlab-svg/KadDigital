export interface MuzikFixture {
  kod: string;
  nama: string;
  tempoh: string;
}

/** Metadata sahaja — fail sebenar dalam bucket `muzik-pustaka` (04-DATA-MODEL.md §6.3). */
export const fixtureMuzik: MuzikFixture[] = [
  { kod: "nasyid-sepohon-kayu", nama: "Nasyid — Sepohon Kayu", tempoh: "2:14" },
  { kod: "piano-lembut", nama: "Piano lembut", tempoh: "3:02" },
  { kod: "gambus-rebana", nama: "Gambus & rebana", tempoh: "2:48" },
];
