"use client";

import { ChevronDown } from "lucide-react";
import { type SelectHTMLAttributes, forwardRef, useId } from "react";
import { cn } from "@/lib/util/cn";

export interface OpsyenPilihan {
  nilai: string;
  label: string;
}

export interface PilihanProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  ralat?: string;
  opsyen: OpsyenPilihan[];
  placeholder?: string;
}

export const Pilihan = forwardRef<HTMLSelectElement, PilihanProps>(
  ({ label, ralat, opsyen, placeholder, id, className, ...props }, ref) => {
    const idAuto = useId();
    const idMedan = id ?? idAuto;
    const idRalat = `${idMedan}-ralat`;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={idMedan} className="text-sm font-medium text-[var(--color-text)]">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={idMedan}
            aria-invalid={!!ralat || undefined}
            aria-describedby={ralat ? idRalat : undefined}
            defaultValue={placeholder ? "" : undefined}
            className={cn(
              "w-full appearance-none rounded-[var(--radius)] border bg-[var(--color-surface)] px-3 py-2 pr-9 text-sm text-[var(--color-text)]",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]",
              "disabled:cursor-not-allowed disabled:opacity-50",
              ralat ? "border-red-500" : "border-[var(--color-section-ghost)]",
              className,
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {opsyen.map((o) => (
              <option key={o.nilai} value={o.nilai}>
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[var(--color-text)]/60"
            aria-hidden
          />
        </div>
        {ralat && (
          <p id={idRalat} className="text-xs text-red-400">
            {ralat}
          </p>
        )}
      </div>
    );
  },
);
Pilihan.displayName = "Pilihan";
