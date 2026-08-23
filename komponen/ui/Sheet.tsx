"use client";

import { X } from "lucide-react";
import { type ReactNode, useEffect, useRef } from "react";

export interface SheetProps {
  terbuka: boolean;
  onTutup: () => void;
  tajuk: string;
  children: ReactNode;
}

export function Sheet({ terbuka, onTutup, tajuk, children }: SheetProps) {
  const rujukanDialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = rujukanDialog.current;
    if (!dialog) return;
    if (terbuka && !dialog.open) dialog.showModal();
    if (!terbuka && dialog.open) dialog.close();
  }, [terbuka]);

  return (
    <dialog
      ref={rujukanDialog}
      onCancel={onTutup}
      onClose={onTutup}
      className="m-0 mt-auto max-h-[85vh] w-full max-w-none rounded-t-[calc(var(--radius)*2)] border-t border-[var(--color-section-ghost)] bg-[var(--color-surface)] p-0 text-[var(--color-text)] backdrop:bg-black/60"
    >
      <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-[var(--color-section-ghost)]" aria-hidden />
      <div className="flex items-center justify-between px-4 py-3">
        <h2 className="text-base font-semibold">{tajuk}</h2>
        <button
          type="button"
          onClick={onTutup}
          aria-label="Tutup"
          className="flex size-8 items-center justify-center rounded-full hover:bg-[var(--color-section)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
        >
          <X className="size-4" />
        </button>
      </div>
      <div className="overflow-y-auto px-4 pb-6">{children}</div>
    </dialog>
  );
}
