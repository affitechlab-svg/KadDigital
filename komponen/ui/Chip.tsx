"use client";

import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/util/cn";

export interface ChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  ditogol: boolean;
  onTogol: (nilai: boolean) => void;
}

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  ({ ditogol, onTogol, disabled, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={ditogol}
        disabled={disabled}
        onClick={() => onTogol(!ditogol)}
        className={cn(
          "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          ditogol
            ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[#161826]"
            : "border-[var(--color-section-ghost)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-section)]",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Chip.displayName = "Chip";
