import Link from "next/link";

export function FooterAwam() {
  return (
    <footer className="border-t border-[var(--color-section-ghost)] px-4 py-8 text-center text-xs text-[var(--color-text)]/50 sm:px-8">
      <p>© {new Date().getFullYear()} KadDigital. Hak cipta terpelihara.</p>
      <div className="mt-2 flex justify-center gap-4">
        <Link href="/terma" className="hover:text-[var(--color-text)]">
          Terma
        </Link>
        <Link href="/privasi" className="hover:text-[var(--color-text)]">
          Privasi
        </Link>
      </div>
    </footer>
  );
}
