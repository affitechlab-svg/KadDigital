import Link from "next/link";
import { FileQuestion } from "lucide-react";

export default function TidakDijumpai() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[var(--color-bg)] px-6 text-center text-[var(--color-text)]">
      <FileQuestion className="size-10 opacity-50" />
      <h1 className="text-xl font-semibold">Halaman tidak dijumpai</h1>
      <p className="max-w-xs text-sm text-[var(--color-text)]/60">
        Pautan ini tidak wujud atau anda tiada kebenaran untuk mengaksesnya.
      </p>
      <Link href="/" className="mt-2 text-sm text-[var(--color-accent)] underline">
        Kembali ke laman utama
      </Link>
    </main>
  );
}
