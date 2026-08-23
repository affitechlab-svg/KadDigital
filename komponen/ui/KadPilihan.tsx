"use client";

import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/util/cn";

export interface KadPilihanProps {
  nama: string;
  nilai: string;
  dipilih: boolean;
  onPilih: (nilai: string) => void;
  label: string;
  huraian?: string;
  pratonton?: ReactNode;
  disabled?: boolean;
}

export function KadPilihan({
  nama,
  nilai,
  dipilih,
  onPilih,
  label,
  huraian,
  pratonton,
  disabled,
}: KadPilihanProps) {
  return (
    <label
      className={cn(
        "flex cursor-pointer flex-col gap-2 rounded-[var(--radius)] border p-3 transition-colors",
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
      {pratonton && (
        <div className="flex h-20 items-center justify-center rounded-[calc(var(--radius)-2px)] bg-[var(--color-bg)]">
          {pratonton}
        </div>
      )}
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-[var(--color-text)]">{label}</span>
          {huraian && <span className="text-xs text-[var(--color-text)]/60">{huraian}</span>}
        </div>
        {dipilih && (
          <span
            className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-[#161826]"
            aria-hidden
          >
            <Check className="size-3.5" strokeWidth={3} />
          </span>
        )}
      </div>
    </label>
  );
}
