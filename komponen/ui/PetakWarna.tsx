"use client";

import { useId } from "react";

export interface PetakWarnaProps {
  label: string;
  nilai: string;
  onTukar: (nilai: string) => void;
  disabled?: boolean;
}

export function PetakWarna({ label, nilai, onTukar, disabled }: PetakWarnaProps) {
  const idInput = useId();
  return (
    <div className="flex items-center gap-2">
      <label htmlFor={idInput} className="sr-only">
        {label}
      </label>
      <span
        className="relative size-9 shrink-0 overflow-hidden rounded-[var(--radius)] border border-[var(--color-section-ghost)]"
        style={{ backgroundColor: nilai }}
      >
        <input
          id={idInput}
          type="color"
          value={nilai}
          disabled={disabled}
          onChange={(e) => onTukar(e.target.value)}
          className="absolute inset-0 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
        />
      </span>
      <div className="flex flex-col">
        <span className="text-xs text-[var(--color-text)]/60">{label}</span>
        <span className="font-mono text-sm text-[var(--color-text)]">{nilai}</span>
      </div>
    </div>
  );
}
