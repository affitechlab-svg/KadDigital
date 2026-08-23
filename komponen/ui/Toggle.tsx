"use client";

import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/util/cn";

export interface ToggleProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  ditogol: boolean;
  onTogol: (nilai: boolean) => void;
  label?: string;
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ ditogol, onTogol, label, disabled, className, id, ...props }, ref) => {
    return (
      <div className="flex items-center gap-2">
        <button
          ref={ref}
          id={id}
          type="button"
          role="switch"
          aria-checked={ditogol}
          disabled={disabled}
          onClick={() => onTogol(!ditogol)}
          className={cn(
            "relative h-6 w-11 shrink-0 rounded-full transition-colors",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            ditogol ? "bg-[var(--color-accent)]" : "bg-[var(--color-section-ghost)]",
            className,
          )}
          {...props}
        >
          <span
            className={cn(
              "absolute top-0.5 size-5 rounded-full bg-white transition-transform",
              ditogol ? "translate-x-[22px]" : "translate-x-0.5",
            )}
          />
        </button>
        {label && (
          <label htmlFor={id} className="text-sm text-[var(--color-text)]">
            {label}
          </label>
        )}
      </div>
    );
  },
);
Toggle.displayName = "Toggle";
