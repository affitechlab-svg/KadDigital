import type { ReactNode } from "react";
import { FooterAwam } from "@/komponen/awam/FooterAwam";
import { NavAwam } from "@/komponen/awam/NavAwam";

export default function LayoutAwam({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <NavAwam />
      <div className="flex-1">{children}</div>
      <FooterAwam />
    </div>
  );
}
