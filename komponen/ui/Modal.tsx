"use client";

import { X } from "lucide-react";
import { type ReactNode, useEffect, useRef } from "react";

export interface ModalProps {
  terbuka: boolean;
  onTutup: () => void;
  tajuk: string;
  children: ReactNode;
}

export function Modal({ terbuka, onTutup, tajuk, children }: ModalProps) {
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
      className="m-auto w-full max-w-md rounded-[var(--radius)] border border-[var(--color-section-ghost)] bg-[var(--color-surface)] p-0 text-[var(--color-text)] backdrop:bg-black/60"
    >
      <div className="flex items-center justify-between border-b border-[var(--color-section-ghost)] px-4 py-3">
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
      <div className="p-4">{children}</div>
    </dialog>
  );
}
