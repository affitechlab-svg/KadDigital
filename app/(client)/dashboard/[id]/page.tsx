import Link from "next/link";
import { notFound } from "next/navigation";
import { BarAtas } from "@/komponen/ui/BarAtas";
import { Butang } from "@/komponen/ui/Butang";
import { fixtureSenaraiPesanan } from "@/lib/fixture/admin";

export default async function ButiranPesanan({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pesanan = fixtureSenaraiPesanan.find((p) => p.id === id);
  if (!pesanan) notFound();

  return (
    <div className="flex min-h-screen flex-col">
      <BarAtas tajuk={pesanan.noRujukan} />
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-4 px-4 py-6">
        <div className="rounded-[var(--radius)] border border-[var(--color-section-ghost)] bg-[var(--color-surface)] p-4">
          <p className="text-lg font-semibold text-[var(--color-text)]">{pesanan.namaClient}</p>
          <p className="text-sm text-[var(--color-text)]/60">
            {pesanan.pakejNama} · {pesanan.tarikhMajlis} · Status: {pesanan.status}
          </p>
          {pesanan.slug && (
            <p className="mt-2 text-xs text-[var(--color-accent)]">
              kaddigital.my/i/{pesanan.slug}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <Link href={`/dashboard/${pesanan.id}/edit`}>
            <Butang varian="sekunder">Edit maklumat</Butang>
          </Link>
          <Link href={`/dashboard/${pesanan.id}/rsvp`}>
            <Butang varian="sekunder">Senarai RSVP</Butang>
          </Link>
          {pesanan.slug && (
            <Link href={`/i/${pesanan.slug}`}>
              <Butang varian="hantu">Lihat kad</Butang>
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}
