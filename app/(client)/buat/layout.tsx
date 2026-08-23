import type { ReactNode } from "react";
import { DrafPesananProvider } from "@/komponen/buat/DrafPesananProvider";

export default function LayoutBuat({ children }: { children: ReactNode }) {
  return <DrafPesananProvider>{children}</DrafPesananProvider>;
}
