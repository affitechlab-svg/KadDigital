import { ChevronDown, ImageIcon } from "lucide-react";
import { BentukGambar } from "@/komponen/kad/BentukGambar";
import type { BentukPotong } from "@/lib/fixture/jenis";
import { pecahkanTarikh } from "@/lib/util/tarikh";

export interface HalamanUtamaProps {
  kicker: string;
  tajukA: string;
  tajukB?: string;
  penyambung: string;
  tarikhMajlis: string;
  masaTeks: string;
  bentukPotong: BentukPotong;
  tunjukGambarUtama: boolean;
  gambarUtamaUrl: string;
}

export function HalamanUtama({
  kicker,
  tajukA,
  tajukB,
  penyambung,
  tarikhMajlis,
  masaTeks,
  bentukPotong,
  tunjukGambarUtama,
  gambarUtamaUrl,
}: HalamanUtamaProps) {
  const { hari, bulan, tarikh, tahun } = pecahkanTarikh(tarikhMajlis);

  return (
    <div
      className="flex h-full flex-col items-center justify-center gap-6 overflow-y-auto px-6 py-10 text-center"
      style={{ color: "var(--kad-teks)" }}
    >
      <span
        className="text-xs uppercase tracking-[0.3em]"
        style={{ color: "var(--kad-aksen)", fontFamily: "var(--kad-huruf-badan)" }}
      >
        {kicker}
      </span>

      {tunjukGambarUtama && (
        <BentukGambar bentuk={bentukPotong} className="h-40 w-32">
          {gambarUtamaUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- URL boleh dari Storage luar next/image loader semasa pratonton
            <img src={gambarUtamaUrl} alt="" className="size-full object-cover" />
          ) : (
            <ImageIcon className="size-8 opacity-30" aria-hidden />
          )}
        </BentukGambar>
      )}

      <h1 className="text-3xl leading-tight" style={{ fontFamily: "var(--kad-huruf-tajuk)" }}>
        {tajukA}
        {tajukB && (
          <>
            <span className="mx-2" style={{ color: "var(--kad-aksen)" }}>
              {penyambung}
            </span>
            {tajukB}
          </>
        )}
      </h1>

      <div
        className="flex flex-col gap-1 text-sm"
        style={{ color: "var(--kad-teks-sekunder)", fontFamily: "var(--kad-huruf-badan)" }}
      >
        <span>{hari}</span>
        <span>
          {tarikh} {bulan} {tahun}
        </span>
        <span>{masaTeks}</span>
      </div>

      <div className="mt-4 flex flex-col items-center gap-1 text-xs opacity-70">
        <span>SKROL KE BAWAH</span>
        <ChevronDown className="size-4 animate-bounce" aria-hidden />
      </div>
    </div>
  );
}
