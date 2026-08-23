"use client";

import { cn } from "@/lib/util/cn";

export type Bahasa = "ms" | "en";

export interface TogolBahasaProps {
  bahasa: Bahasa;
  onTukar: (bahasa: Bahasa) => void;
}

export function TogolBahasa({ bahasa, onTukar }: TogolBahasaProps) {
  return (
    <div
      role="group"
      aria-label="Tukar bahasa"
      className="inline-flex overflow-hidden rounded-full border border-[var(--color-section-ghost)]"
    >
      {(["ms", "en"] as const).map((b) => (
        <button
          key={b}
          type="button"
          aria-pressed={bahasa === b}
          onClick={() => onTukar(b)}
          className={cn(
            "px-3 py-1 text-xs font-semibold uppercase transition-colors",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]",
            bahasa === b
              ? "bg-[var(--color-accent)] text-[#161826]"
              : "bg-[var(--color-surface)] text-[var(--color-text)]/70 hover:text-[var(--color-text)]",
          )}
        >
          {b}
        </button>
      ))}
    </div>
  );
}
