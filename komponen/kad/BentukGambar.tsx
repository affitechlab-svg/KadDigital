import type { ReactNode } from "react";
import type { BentukPotong } from "@/lib/fixture/jenis";

export interface BentukGambarProps {
  bentuk: BentukPotong;
  className?: string;
  children?: ReactNode;
}

const gayaBentuk: Record<BentukPotong, string> = {
  gerbang: "rounded-t-full",
  bulat: "rounded-full aspect-square",
  segi: "rounded-[12px]",
};

/** Slot gambar dengan bentuk potongan pilihan client — gerbang · bulat · segi. */
export function BentukGambar({ bentuk, className, children }: BentukGambarProps) {
  return (
    <div
      className={`flex items-center justify-center overflow-hidden border ${gayaBentuk[bentuk]} ${className ?? ""}`}
      style={{ borderColor: "var(--kad-aksen)", background: "var(--kad-latar-sekunder)" }}
    >
      {children}
    </div>
  );
}
