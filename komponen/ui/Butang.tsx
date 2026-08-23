"use client";

import { Loader2 } from "lucide-react";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/util/cn";

type VarianButang = "utama" | "sekunder" | "hantu" | "bahaya";

export interface ButangProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  varian?: VarianButang;
  memuat?: boolean;
}

const kelasVarian: Record<VarianButang, string> = {
  utama: "bg-[var(--color-accent)] text-[#161826] hover:brightness-110",
  sekunder:
    "bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-section-ghost)] hover:bg-[var(--color-section)]",
  hantu: "bg-transparent text-[var(--color-text)] hover:bg-[var(--color-surface)]",
  bahaya: "bg-red-600 text-white hover:bg-red-500",
};

export const Butang = forwardRef<HTMLButtonElement, ButangProps>(
  ({ varian = "utama", memuat = false, disabled, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || memuat}
        aria-busy={memuat || undefined}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-[var(--radius)] px-4 py-2.5 text-sm font-medium transition-colors",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          kelasVarian[varian],
          className,
        )}
        {...props}
      >
        {memuat && <Loader2 className="size-4 animate-spin" aria-hidden />}
        {children}
      </button>
    );
  },
);
Butang.displayName = "Butang";
