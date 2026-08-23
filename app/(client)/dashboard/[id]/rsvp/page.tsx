"use client";

import { useParams, useRouter } from "next/navigation";
import { Download } from "lucide-react";
import { BarAtas } from "@/komponen/ui/BarAtas";
import { Butang } from "@/komponen/ui/Butang";
import { Jadual } from "@/komponen/ui/Jadual";
import { KadStat } from "@/komponen/ui/KadStat";
import { Kosong } from "@/komponen/ui/Kosong";
import { fixtureRsvp } from "@/lib/fixture/admin";

function muatTurunCsv() {
  const header = "Nama,Bilangan,Hadir,Catatan";
  const baris = fixtureRsvp.map(
    (r) => `${r.nama},${r.bilangan},${r.hadir ? "Ya" : "Tidak"},${r.catatan ?? ""}`,
  );
  // UTF-8 BOM supaya aksara Melayu tidak rosak bila dibuka dalam Excel (AC-11).
  const csv = "﻿" + [header, ...baris].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "rsvp.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export default function SenaraiRsvp() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const jumlahHadir = fixtureRsvp.filter((r) => r.hadir).reduce((a, r) => a + r.bilangan, 0);
  const jumlahTidakHadir = fixtureRsvp.filter((r) => !r.hadir).reduce((a, r) => a + r.bilangan, 0);

  return (
    <div className="flex min-h-screen flex-col">
      <BarAtas
        tajuk="Senarai RSVP"
        onKembali={() => router.push(`/dashboard/${id}`)}
        aksiKanan={
          <Butang varian="sekunder" onClick={muatTurunCsv}>
            <Download className="size-3.5" /> CSV
          </Butang>
        }
      />
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-4 px-4 py-6">
        <div className="grid grid-cols-3 gap-3">
          <KadStat label="Hadir" nilai={String(jumlahHadir)} />
          <KadStat label="Tidak hadir" nilai={String(jumlahTidakHadir)} />
          <KadStat label="Jumlah RSVP" nilai={String(fixtureRsvp.length)} />
        </div>
        {fixtureRsvp.length === 0 ? (
          <Kosong tajuk="Tiada RSVP lagi" huraian="Tetamu belum menghantar sebarang RSVP." />
        ) : (
          <Jadual
            idBaris={(r) => r.id}
            data={fixtureRsvp}
            lajur={[
              { kunci: "nama", label: "Nama", papar: (r) => r.nama },
              { kunci: "bilangan", label: "Bilangan", papar: (r) => r.bilangan },
              { kunci: "hadir", label: "Hadir", papar: (r) => (r.hadir ? "Ya" : "Tidak") },
              { kunci: "catatan", label: "Catatan", papar: (r) => r.catatan ?? "—" },
            ]}
          />
        )}
      </main>
    </div>
  );
}
