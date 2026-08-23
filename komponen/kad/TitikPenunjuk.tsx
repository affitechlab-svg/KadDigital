"use client";

export interface TitikPenunjukProps {
  jumlah: number;
  aktif: number;
  onKlik: (indeks: number) => void;
}

/** Titik penunjuk tepi kanan — klik lompat ke halaman guna offsetTop (bukan pekali px). */
export function TitikPenunjuk({ jumlah, aktif, onKlik }: TitikPenunjukProps) {
  return (
    <div className="absolute right-3 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-2">
      {Array.from({ length: jumlah }, (_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onKlik(i)}
          aria-label={`Ke halaman ${i + 1}`}
          aria-current={i === aktif}
          className="flex size-4 items-center justify-center"
        >
          <span
            className="size-2 rounded-full transition-all"
            style={{
              background: i === aktif ? "var(--kad-aksen)" : "var(--kad-teks)",
              opacity: i === aktif ? 1 : 0.35,
              transform: i === aktif ? "scale(1.3)" : "scale(1)",
            }}
          />
        </button>
      ))}
    </div>
  );
}
