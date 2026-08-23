"use client";

import { type TextareaHTMLAttributes, forwardRef, useId } from "react";
import { cn } from "@/lib/util/cn";

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  ralat?: string;
  petunjuk?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, ralat, petunjuk, id, className, rows = 4, ...props }, ref) => {
    const idAuto = useId();
    const idMedan = id ?? idAuto;
    const idRalat = `${idMedan}-ralat`;
    const idPetunjuk = `${idMedan}-petunjuk`;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={idMedan} className="text-sm font-medium text-[var(--color-text)]">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={idMedan}
          rows={rows}
          aria-invalid={!!ralat || undefined}
          aria-describedby={ralat ? idRalat : petunjuk ? idPetunjuk : undefined}
          className={cn(
            "resize-y rounded-[var(--radius)] border bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text)]/40",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            ralat ? "border-red-500" : "border-[var(--color-section-ghost)]",
            className,
          )}
          {...props}
        />
        {ralat && (
          <p id={idRalat} className="text-xs text-red-400">
            {ralat}
          </p>
        )}
        {!ralat && petunjuk && (
          <p id={idPetunjuk} className="text-xs text-[var(--color-text)]/60">
            {petunjuk}
          </p>
        )}
      </div>
    );
  },
);
TextArea.displayName = "TextArea";
