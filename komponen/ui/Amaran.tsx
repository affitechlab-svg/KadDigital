import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/util/cn";

type JenisAmaran = "info" | "amaran" | "berjaya";

export interface AmaranProps {
  jenis?: JenisAmaran;
  tajuk?: string;
  children: ReactNode;
}

const ikonJenis: Record<JenisAmaran, typeof Info> = {
  info: Info,
  amaran: AlertTriangle,
  berjaya: CheckCircle2,
};

const kelasJenis: Record<JenisAmaran, string> = {
  info: "border-[var(--color-accent)]/50 bg-[var(--color-section)] text-[var(--color-text)]",
  amaran: "border-amber-500/50 bg-amber-500/10 text-amber-200",
  berjaya: "border-emerald-500/50 bg-emerald-500/10 text-emerald-200",
};

export function Amaran({ jenis = "info", tajuk, children }: AmaranProps) {
  const Ikon = ikonJenis[jenis];
  return (
    <div
      role="status"
      className={cn(
        "flex gap-3 rounded-[var(--radius)] border p-4 text-sm",
        kelasJenis[jenis],
      )}
    >
      <Ikon className="mt-0.5 size-4 shrink-0" aria-hidden />
      <div className="flex flex-col gap-0.5">
        {tajuk && <p className="font-medium">{tajuk}</p>}
        <div className="text-current/90">{children}</div>
      </div>
    </div>
  );
}
