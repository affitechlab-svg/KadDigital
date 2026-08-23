"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BarAtas } from "@/komponen/ui/BarAtas";
import { Input } from "@/komponen/ui/Input";
import { Jadual } from "@/komponen/ui/Jadual";
import { KadStat } from "@/komponen/ui/KadStat";
import { Paginasi } from "@/komponen/ui/Paginasi";
import { Pilihan } from "@/komponen/ui/Pilihan";
import { fixtureBayaran, fixtureSenaraiPesanan } from "@/lib/fixture/admin";
import { formatRinggit } from "@/lib/fixture/pakej";

export default function AdminPesanan() {
  const [carian, setCarian] = useState("");
  const [statusTapis, setStatusTapis] = useState("semua");
  const [halaman, setHalaman] = useState(1);

  const disenarai = useMemo(() => {
    return fixtureSenaraiPesanan.filter((p) => {
      const cocokCarian =
        !carian ||
        p.namaClient.toLowerCase().includes(carian.toLowerCase()) ||
        p.emelClient.toLowerCase().includes(carian.toLowerCase()) ||
        (p.slug ?? "").toLowerCase().includes(carian.toLowerCase());
      const cocokStatus = statusTapis === "semua" || p.status === statusTapis;
      return cocokCarian && cocokStatus;
    });
  }, [carian, statusTapis]);

  const jualanBulanIni = fixtureBayaran
    .filter((b) => b.status === "berjaya")
    .reduce((a, b) => a + b.jumlahSen, 0);
  const dahBayar = fixtureSenaraiPesanan.filter((p) => p.status === "terbit" || p.status === "dibayar").length;
  const belumBayar = fixtureSenaraiPesanan.filter((p) => p.status === "draf").length;
  const liveSekarang = fixtureSenaraiPesanan.filter((p) => p.status === "terbit").length;

  return (
    <div className="flex min-h-screen flex-col">
      <BarAtas tajuk="Pesanan" />
      <main className="flex flex-1 flex-col gap-6 px-6 py-6">
        <div className="grid grid-cols-4 gap-4">
          <KadStat label="Jualan bulan ini" nilai={formatRinggit(jualanBulanIni)} />
          <KadStat label="Dah bayar" nilai={String(dahBayar)} />
          <KadStat label="Belum bayar" nilai={String(belumBayar)} />
          <KadStat label="Live sekarang" nilai={String(liveSekarang)} />
        </div>

        <div className="flex gap-3">
          <div className="w-64">
            <Input placeholder="Cari nama, e-mel, slug…" value={carian} onChange={(e) => setCarian(e.target.value)} />
          </div>
          <div className="w-48">
            <Pilihan
              opsyen={[
                { nilai: "semua", label: "Semua status" },
                { nilai: "draf", label: "Draf" },
                { nilai: "dibayar", label: "Dibayar" },
                { nilai: "terbit", label: "Terbit" },
                { nilai: "ditarik", label: "Ditarik" },
              ]}
              value={statusTapis}
              onChange={(e) => setStatusTapis(e.target.value)}
            />
          </div>
        </div>

        <Jadual
          idBaris={(p) => p.id}
          data={disenarai}
          lajur={[
            { kunci: "noRujukan", label: "No. Rujukan", papar: (p) => <Link href={`/admin/pesanan/${p.id}`} className="text-[var(--color-accent)] hover:underline">{p.noRujukan}</Link> },
            { kunci: "client", label: "Client", papar: (p) => p.namaClient },
            { kunci: "emel", label: "E-mel", papar: (p) => p.emelClient },
            { kunci: "pakej", label: "Pakej", papar: (p) => p.pakejNama },
            { kunci: "tarikh", label: "Tarikh Majlis", papar: (p) => p.tarikhMajlis },
            { kunci: "status", label: "Status", papar: (p) => p.status },
          ]}
        />
        <Paginasi halamanSemasa={halaman} jumlahHalaman={1} onTukar={setHalaman} />
      </main>
    </div>
  );
}
