"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PaginasiProps {
  halamanSemasa: number;
  jumlahHalaman: number;
  onTukar: (halaman: number) => void;
}

export function Paginasi({ halamanSemasa, jumlahHalaman, onTukar }: PaginasiProps) {
  return (
    <nav aria-label="Paginasi" className="flex items-center justify-between gap-4">
      <button
        type="button"
        disabled={halamanSemasa <= 1}
        onClick={() => onTukar(halamanSemasa - 1)}
        aria-label="Halaman sebelum"
        className="flex size-8 items-center justify-center rounded-[var(--radius)] border border-[var(--color-section-ghost)] text-[var(--color-text)] hover:bg-[var(--color-surface)] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
      >
        <ChevronLeft className="size-4" />
      </button>
      <span className="text-sm text-[var(--color-text)]/70">
        Halaman {halamanSemasa} / {jumlahHalaman}
      </span>
      <button
        type="button"
        disabled={halamanSemasa >= jumlahHalaman}
        onClick={() => onTukar(halamanSemasa + 1)}
        aria-label="Halaman seterus"
        className="flex size-8 items-center justify-center rounded-[var(--radius)] border border-[var(--color-section-ghost)] text-[var(--color-text)] hover:bg-[var(--color-surface)] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
      >
        <ChevronRight className="size-4" />
      </button>
    </nav>
  );
}
