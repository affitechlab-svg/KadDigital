import { Inbox } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export interface KosongProps {
  ikon?: LucideIcon;
  tajuk: string;
  huraian?: string;
  aksi?: ReactNode;
}

export function Kosong({ ikon: Ikon = Inbox, tajuk, huraian, aksi }: KosongProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-[var(--radius)] border border-dashed border-[var(--color-section-ghost)] px-6 py-12 text-center">
      <Ikon className="size-8 text-[var(--color-text)]/40" aria-hidden />
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-[var(--color-text)]">{tajuk}</p>
        {huraian && <p className="text-xs text-[var(--color-text)]/60">{huraian}</p>}
      </div>
      {aksi}
    </div>
  );
}
