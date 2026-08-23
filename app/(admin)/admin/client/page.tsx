import { BarAtas } from "@/komponen/ui/BarAtas";
import { Jadual } from "@/komponen/ui/Jadual";
import { fixtureClient } from "@/lib/fixture/admin";

export default function AdminClient() {
  return (
    <div className="flex min-h-screen flex-col">
      <BarAtas tajuk="Client" />
      <main className="flex flex-1 flex-col gap-4 px-6 py-6">
        <Jadual
          idBaris={(c) => c.id}
          data={fixtureClient}
          lajur={[
            { kunci: "nama", label: "Nama", papar: (c) => c.nama },
            { kunci: "emel", label: "E-mel", papar: (c) => c.emel },
            { kunci: "telefon", label: "Telefon", papar: (c) => c.telefon },
            { kunci: "pesanan", label: "Jumlah Pesanan", papar: (c) => c.jumlahPesanan },
            { kunci: "dicipta", label: "Daftar", papar: (c) => c.dicipta },
          ]}
        />
      </main>
    </div>
  );
}
