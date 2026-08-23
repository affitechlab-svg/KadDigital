"use client";

import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

export interface BarAtasProps {
  tajuk: string;
  onKembali?: () => void;
  aksiKanan?: ReactNode;
}

export function BarAtas({ tajuk, onKembali, aksiKanan }: BarAtasProps) {
  return (
    <header className="flex h-14 items-center gap-3 border-b border-[var(--color-section-ghost)] bg-[var(--color-bg)] px-4">
      {onKembali && (
        <button
          type="button"
          onClick={onKembali}
          aria-label="Kembali"
          className="flex size-8 items-center justify-center rounded-full text-[var(--color-text)] hover:bg-[var(--color-surface)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
        >
          <ChevronLeft className="size-5" />
        </button>
      )}
      <h1 className="flex-1 truncate text-base font-semibold text-[var(--color-text)]">
        {tajuk}
      </h1>
      {aksiKanan}
    </header>
  );
}
