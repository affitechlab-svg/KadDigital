import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/util/cn";

export interface KadStatProps {
  label: string;
  nilai: string;
  ikon?: LucideIcon;
  arahPerubahan?: "naik" | "turun" | "tiada";
  perubahan?: string;
}

export function KadStat({
  label,
  nilai,
  ikon: Ikon,
  arahPerubahan = "tiada",
  perubahan,
}: KadStatProps) {
  return (
    <div className="flex flex-col gap-2 rounded-[var(--radius)] border border-[var(--color-section-ghost)] bg-[var(--color-surface)] p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-[var(--color-text)]/60">
          {label}
        </span>
        {Ikon && <Ikon className="size-4 text-[var(--color-accent)]" aria-hidden />}
      </div>
      <span className="text-2xl font-bold text-[var(--color-text)]">{nilai}</span>
      {perubahan && (
        <span
          className={cn(
            "text-xs",
            arahPerubahan === "naik" && "text-emerald-400",
            arahPerubahan === "turun" && "text-red-400",
            arahPerubahan === "tiada" && "text-[var(--color-text)]/60",
          )}
        >
          {perubahan}
        </span>
      )}
    </div>
  );
}
