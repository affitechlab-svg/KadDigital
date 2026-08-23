"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDrafPesanan } from "@/komponen/buat/DrafPesananProvider";
import { BarAtas } from "@/komponen/ui/BarAtas";
import { KadPakej } from "@/komponen/ui/KadPakej";
import { Memuat } from "@/komponen/ui/Memuat";
import { PenunjukLangkah } from "@/komponen/ui/PenunjukLangkah";
import type { PakejFixture } from "@/lib/fixture/pakej";
import { dapatkanSenaraiPakej } from "@/lib/supabase/pakej";
import { ciptaKlienPelayar } from "@/lib/supabase/pelayar";

export default function HalamanPilihPakej() {
  const router = useRouter();
  const { draf, kemaskini } = useDrafPesanan();
  const [senaraiPakej, setSenaraiPakej] = useState<PakejFixture[] | null>(null);

  useEffect(() => {
    const supabase = ciptaKlienPelayar();
    void dapatkanSenaraiPakej(supabase).then(setSenaraiPakej);
  }, []);

  function pilih(kod: "ringkas" | "standard" | "premium") {
    kemaskini({ pakejKod: kod });
    router.push("/buat/demo/maklumat");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <BarAtas tajuk="Pilih Pakej" onKembali={() => router.push("/harga")} />
      <div className="mx-auto w-full max-w-md px-4 pt-4">
        <PenunjukLangkah semasa={1} jumlah={8} />
      </div>
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-4 px-4 py-6">
        {!senaraiPakej ? (
          <Memuat baris={4} />
        ) : (
          senaraiPakej.map((p) => (
            <KadPakej
              key={p.kod}
              nama={p.namaPapar}
              hargaSen={p.hargaSen}
              popular={p.popular}
              dipilih={draf.pakejKod === p.kod}
              ciri={[
                `${p.bilHalaman} halaman scroll`,
                p.motionTersuai ? "Semua motion + motion tersuai" : `${p.motionDibenar.length} motion pembukaan`,
                `${p.hadRujukan} imej rujukan`,
                `Jana semula tema ${p.hadJanaSemula}x`,
              ]}
              onPilih={() => pilih(p.kod)}
            />
          ))
        )}
      </main>
    </div>
  );
}
