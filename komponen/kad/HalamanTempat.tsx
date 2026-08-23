import type { AturCaraItem } from "@/lib/fixture/jenis";

export interface HalamanTempatProps {
  venueNama: string;
  venueAlamat: string;
  aturCara: AturCaraItem[];
}

export function HalamanTempat({ venueNama, venueAlamat, aturCara }: HalamanTempatProps) {
  return (
    <div
      className="flex h-full flex-col items-center justify-center gap-6 overflow-y-auto px-6 py-10 text-center"
      style={{ color: "var(--kad-teks)" }}
    >
      <span
        className="text-xs uppercase tracking-[0.3em]"
        style={{ color: "var(--kad-aksen)", fontFamily: "var(--kad-huruf-badan)" }}
      >
        Tempat & Masa
      </span>

      <div className="flex flex-col gap-1" style={{ fontFamily: "var(--kad-huruf-tajuk)" }}>
        <h2 className="text-2xl">{venueNama}</h2>
      </div>
      <p
        className="max-w-xs text-sm"
        style={{ color: "var(--kad-teks-sekunder)", fontFamily: "var(--kad-huruf-badan)" }}
      >
        {venueAlamat}
      </p>

      <ul
        className="flex w-full max-w-xs flex-col gap-2 border-t pt-4 text-sm"
        style={{ borderColor: "var(--kad-aksen)", fontFamily: "var(--kad-huruf-badan)" }}
      >
        {aturCara.map((item) => (
          <li key={item.masa} className="flex items-center justify-between gap-4">
            <span style={{ color: "var(--kad-aksen)" }}>{item.masa}</span>
            <span className="flex-1 text-right">{item.aktiviti}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
