import type { CSSProperties } from "react";
import type { Tema } from "@/lib/tema/jenis";
import { nilaiCssFont } from "@/lib/tema/fonts";

/**
 * Suntik tema sebagai CSS variable pada bekas kad sahaja (02-TECH-STACK.md §5).
 * Tema TIDAK ditulis ke Tailwind config — kad jemputan tidak terikat Nocturne.
 */
export function gayaTemaKad(t: Tema): CSSProperties {
  return {
    "--kad-latar": t.palet[0],
    "--kad-latar-sekunder": t.palet[1],
    "--kad-aksen": t.palet[2],
    "--kad-teks-sekunder": t.palet[3],
    "--kad-teks": t.palet[4],
    "--kad-huruf-tajuk": nilaiCssFont(t.huruf.tajuk),
    "--kad-huruf-badan": nilaiCssFont(t.huruf.badan),
  } as CSSProperties;
}
