"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/util/cn";

export interface RadioKadProps {
  nama: string;
  nilai: string;
  dipilih: boolean;
  onPilih: (nilai: string) => void;
  tajuk: string;
  huraian?: string;
  disabled?: boolean;
}

export function RadioKad({
  nama,
  nilai,
  dipilih,
  onPilih,
  tajuk,
  huraian,
  disabled,
}: RadioKadProps) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-[var(--radius)] border p-4 transition-colors",
        "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--color-accent)]",
        dipilih
          ? "border-[var(--color-accent)] bg-[var(--color-section)]"
          : "border-[var(--color-section-ghost)] bg-[var(--color-surface)] hover:bg-[var(--color-section)]",
        disabled && "cursor-not-allowed opacity-50",
      )}
    >
      <input
        type="radio"
        name={nama}
        value={nilai}
        checked={dipilih}
        disabled={disabled}
        onChange={() => onPilih(nilai)}
        className="sr-only"
      />
      <span
        className={cn(
          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border",
          dipilih
            ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[#161826]"
            : "border-[var(--color-section-ghost)]",
        )}
        aria-hidden
      >
        {dipilih && <Check className="size-3.5" strokeWidth={3} />}
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="text-sm font-medium text-[var(--color-text)]">{tajuk}</span>
        {huraian && <span className="text-xs text-[var(--color-text)]/60">{huraian}</span>}
      </span>
    </label>
  );
}
