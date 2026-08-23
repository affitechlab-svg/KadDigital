"use client";

import { useDrafPesanan } from "@/komponen/buat/DrafPesananProvider";
import { BingkaiLangkah } from "@/komponen/buat/BingkaiLangkah";
import { KadJemputan } from "@/komponen/kad/KadJemputan";
import { drafKePesananFixture } from "@/lib/fixture/draf";

export default function LangkahPratonton() {
  const { draf } = useDrafPesanan();
  const pesanan = drafKePesananFixture(draf);

  return (
    <BingkaiLangkah
      tajuk="Pratonton"
      semasa={7}
      jumlah={8}
      laluanKembali="/buat/demo/sentuhan"
      laluanTeruskan="/buat/demo/bayar"
      labelTeruskan="Teruskan ke bayaran"
    >
      <div className="mx-auto h-[70vh] max-h-[700px] w-full max-w-[360px] overflow-hidden rounded-[24px] border-4 border-[var(--color-section-ghost)]">
        <KadJemputan pesanan={pesanan} tema={pesanan.tema} mod="pratonton" />
      </div>
    </BingkaiLangkah>
  );
}
