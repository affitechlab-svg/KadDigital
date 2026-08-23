export interface PenunjukLangkahProps {
  semasa: number;
  jumlah: number;
}

export function PenunjukLangkah({ semasa, jumlah }: PenunjukLangkahProps) {
  return (
    <div className="flex flex-col gap-1.5" role="progressbar" aria-valuenow={semasa} aria-valuemin={1} aria-valuemax={jumlah}>
      <span className="text-xs font-medium uppercase tracking-widest text-[var(--color-text)]/60">
        Langkah {semasa} / {jumlah}
      </span>
      <div className="flex gap-1">
        {Array.from({ length: jumlah }, (_, i) => (
          <span
            key={i}
            className={
              "h-1 flex-1 rounded-full " +
              (i < semasa ? "bg-[var(--color-accent)]" : "bg-[var(--color-section-ghost)]")
            }
          />
        ))}
      </div>
    </div>
  );
}
