import { KadJemputan } from "@/komponen/kad/KadJemputan";
import { HalamanKeadaanKad, type KeadaanKad } from "@/komponen/kad/HalamanKeadaanKad";
import { fixturePesanan } from "@/lib/fixture/data";

/** Slug khas untuk demo QA setiap keadaan (03-SITEMAP-ROUTING.md §3) — bukan pesanan sebenar. */
const slugKeadaanDemo: Record<string, KeadaanKad> = {
  "demo-belum-terbit": "belum_terbit",
  "demo-ditarik": "ditarik",
  "demo-tamat-tempoh": "tamat_tempoh",
};

export default async function HalamanKadAwam({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const pesanan = fixturePesanan[slug];
  if (pesanan) {
    return (
      <div className="h-screen w-screen">
        <KadJemputan pesanan={pesanan} tema={pesanan.tema} mod="awam" />
      </div>
    );
  }

  const keadaan = slugKeadaanDemo[slug] ?? "tidak_wujud";
  return <HalamanKeadaanKad keadaan={keadaan} />;
}
