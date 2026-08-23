import { BarAtas } from "@/komponen/ui/BarAtas";
import { Jadual } from "@/komponen/ui/Jadual";
import { fixtureBayaran } from "@/lib/fixture/admin";
import { formatRinggit } from "@/lib/fixture/pakej";

export default function AdminBayaran() {
  return (
    <div className="flex min-h-screen flex-col">
      <BarAtas tajuk="Rekod Bayaran" />
      <main className="flex flex-1 flex-col gap-4 px-6 py-6">
        <Jadual
          idBaris={(b) => b.id}
          data={fixtureBayaran}
          lajur={[
            { kunci: "noRujukan", label: "No. Rujukan", papar: (b) => b.noRujukan },
            { kunci: "client", label: "Client", papar: (b) => b.namaClient },
            { kunci: "jumlah", label: "Jumlah", papar: (b) => formatRinggit(b.jumlahSen) },
            { kunci: "kaedah", label: "Kaedah", papar: (b) => b.kaedah },
            { kunci: "status", label: "Status", papar: (b) => b.status },
            { kunci: "tarikh", label: "Tarikh", papar: (b) => b.dicipta },
          ]}
        />
      </main>
    </div>
  );
}
