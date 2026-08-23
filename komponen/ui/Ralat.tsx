import { XCircle } from "lucide-react";
import type { ReactNode } from "react";

export interface RalatProps {
  tajuk?: string;
  children: ReactNode;
}

export function Ralat({ tajuk = "Berlaku ralat", children }: RalatProps) {
  return (
    <div
      role="alert"
      className="flex gap-3 rounded-[var(--radius)] border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-200"
    >
      <XCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
      <div className="flex flex-col gap-0.5">
        <p className="font-medium">{tajuk}</p>
        <div className="text-red-200/90">{children}</div>
      </div>
    </div>
  );
}
