import { Quote } from "lucide-react";

export interface HalamanKataKataProps {
  kataTeks: string;
  kataOleh?: string;
}

/** Hanya dipapar jika bil_halaman = 4 (pakej standard/premium). */
export function HalamanKataKata({ kataTeks, kataOleh }: HalamanKataKataProps) {
  return (
    <div
      className="flex h-full flex-col items-center justify-center gap-6 overflow-y-auto px-8 py-10 text-center"
      style={{ color: "var(--kad-teks)" }}
    >
      <Quote className="size-6" style={{ color: "var(--kad-aksen)" }} aria-hidden />
      <p className="max-w-sm text-lg leading-relaxed" style={{ fontFamily: "var(--kad-huruf-tajuk)" }}>
        {kataTeks}
      </p>
      {kataOleh && (
        <span
          className="text-xs uppercase tracking-widest"
          style={{ color: "var(--kad-teks-sekunder)", fontFamily: "var(--kad-huruf-badan)" }}
        >
          — {kataOleh}
        </span>
      )}
    </div>
  );
}
