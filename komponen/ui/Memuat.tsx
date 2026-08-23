import { cn } from "@/lib/util/cn";

export interface MemuatProps {
  baris?: number;
  className?: string;
}

export function Memuat({ baris = 3, className }: MemuatProps) {
  return (
    <div role="status" aria-label="Sedang memuatkan" className={cn("flex flex-col gap-2", className)}>
      {Array.from({ length: baris }, (_, i) => (
        <span
          key={i}
          className="h-4 animate-pulse rounded-[var(--radius)] bg-[var(--color-surface)]"
          style={{ width: i === baris - 1 ? "60%" : "100%" }}
        />
      ))}
    </div>
  );
}
