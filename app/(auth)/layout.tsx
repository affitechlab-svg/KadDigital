import Link from "next/link";
import type { ReactNode } from "react";

export default function LayoutAuth({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-4 py-12">
      <Link href="/" className="text-lg font-bold text-[var(--color-text)]">
        KadDigital
      </Link>
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}
