export type SumberTema = "auto" | "dilaras" | "fallback";

export interface Tema {
  /** Tepat 5 warna: [0]=latar, [1]=latar sekunder, [2]=aksen, [3]=teks sekunder, [4]=teks */
  palet: [string, string, string, string, string];
  mood: string;
  hiasan: string[];
  huruf: {
    tajuk: string;
    badan: string;
  };
  sumber: SumberTema;
  cubaan: number;
}
