"use client";

import { BarChart3, CircleDollarSign, Users, Wallet } from "lucide-react";
import { useState } from "react";
import { Amaran } from "@/komponen/ui/Amaran";
import { BarAtas } from "@/komponen/ui/BarAtas";
import { Butang } from "@/komponen/ui/Butang";
import { Chip } from "@/komponen/ui/Chip";
import { Input } from "@/komponen/ui/Input";
import { Jadual } from "@/komponen/ui/Jadual";
import { KadPakej } from "@/komponen/ui/KadPakej";
import { KadPilihan } from "@/komponen/ui/KadPilihan";
import { KadStat } from "@/komponen/ui/KadStat";
import { Kosong } from "@/komponen/ui/Kosong";
import { Memuat } from "@/komponen/ui/Memuat";
import { Modal } from "@/komponen/ui/Modal";
import { MuatNaikFail } from "@/komponen/ui/MuatNaikFail";
import { Paginasi } from "@/komponen/ui/Paginasi";
import { PenunjukLangkah } from "@/komponen/ui/PenunjukLangkah";
import { PetakWarna } from "@/komponen/ui/PetakWarna";
import { Pilihan } from "@/komponen/ui/Pilihan";
import { RadioKad } from "@/komponen/ui/RadioKad";
import { Ralat } from "@/komponen/ui/Ralat";
import { Sheet } from "@/komponen/ui/Sheet";
import { TextArea } from "@/komponen/ui/TextArea";
import { Toggle } from "@/komponen/ui/Toggle";
import { TogolBahasa } from "@/komponen/ui/TogolBahasa";

function Seksyen({ tajuk, children }: { tajuk: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4 border-b border-[var(--color-section-ghost)] pb-8">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">{tajuk}</h2>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}

function Blok({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs uppercase tracking-wide text-[var(--color-text)]/50">{label}</p>
      {children}
    </div>
  );
}

export default function KitchenSink() {
  const [radio, setRadio] = useState("standard");
  const [kadPilihan, setKadPilihan] = useState("sampul");
  const [toggle1, setToggle1] = useState(true);
  const [toggle2, setToggle2] = useState(false);
  const [chip1, setChip1] = useState(true);
  const [chip2, setChip2] = useState(false);
  const [bahasa, setBahasa] = useState<"ms" | "en">("ms");
  const [warna, setWarna] = useState("#9184d9");
  const [modalTerbuka, setModalTerbuka] = useState(false);
  const [sheetTerbuka, setSheetTerbuka] = useState(false);
  const [halaman, setHalaman] = useState(2);

  return (
    <div className="flex min-h-screen flex-col">
      <BarAtas tajuk="Kitchen Sink" onKembali={() => {}} aksiKanan={<TogolBahasa bahasa={bahasa} onTukar={setBahasa} />} />
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-4 py-8">
        <Seksyen tajuk="Butang">
          <div className="flex flex-wrap items-center gap-3">
            <Butang varian="utama">Utama</Butang>
            <Butang varian="sekunder">Sekunder</Butang>
            <Butang varian="hantu">Hantu</Butang>
            <Butang varian="bahaya">Bahaya</Butang>
            <Butang varian="utama" memuat>
              Memuat
            </Butang>
            <Butang varian="utama" disabled>
              Disabled
            </Butang>
          </div>
        </Seksyen>

        <Seksyen tajuk="Input & TextArea">
          <div className="grid gap-4 sm:grid-cols-2">
            <Blok label="Normal">
              <Input label="Nama penuh" placeholder="Cth: Nurul Aina" />
            </Blok>
            <Blok label="Dengan petunjuk">
              <Input label="E-mel" placeholder="anda@contoh.com" petunjuk="Kami hantar resit ke sini" />
            </Blok>
            <Blok label="Ralat">
              <Input label="Kata laluan" type="password" ralat="Kata laluan sekurang-kurangnya 8 aksara" />
            </Blok>
            <Blok label="Disabled">
              <Input label="Slug" defaultValue="salmah-osman" disabled />
            </Blok>
          </div>
          <Blok label="TextArea">
            <TextArea label="Kata-kata" placeholder="Tulis petikan atau doa..." />
          </Blok>
        </Seksyen>

        <Seksyen tajuk="Pilihan (select)">
          <div className="grid gap-4 sm:grid-cols-2">
            <Pilihan
              label="Jenis acara"
              placeholder="Pilih jenis acara"
              opsyen={[
                { nilai: "kahwin", label: "Kahwin" },
                { nilai: "korporat", label: "Korporat" },
                { nilai: "tersuai", label: "Tersuai" },
              ]}
            />
            <Pilihan
              label="Ralat"
              ralat="Sila pilih satu"
              opsyen={[{ nilai: "a", label: "Pilihan A" }]}
            />
          </div>
        </Seksyen>

        <Seksyen tajuk="Toggle">
          <div className="flex flex-col gap-3">
            <Toggle ditogol={toggle1} onTogol={setToggle1} label="Dwibahasa BM/EN" />
            <Toggle ditogol={toggle2} onTogol={setToggle2} label="Taburan latar" />
            <Toggle ditogol={false} onTogol={() => {}} label="Disabled" disabled />
          </div>
        </Seksyen>

        <Seksyen tajuk="RadioKad">
          <div className="grid gap-3 sm:grid-cols-3">
            <RadioKad nama="pakej" nilai="ringkas" dipilih={radio === "ringkas"} onPilih={setRadio} tajuk="Simple" huraian="RM30" />
            <RadioKad nama="pakej" nilai="standard" dipilih={radio === "standard"} onPilih={setRadio} tajuk="Signature" huraian="RM40" />
            <RadioKad nama="pakej" nilai="premium" dipilih={radio === "premium"} onPilih={setRadio} tajuk="Luxury" huraian="RM55" disabled />
          </div>
        </Seksyen>

        <Seksyen tajuk="Chip">
          <div className="flex flex-wrap gap-2">
            <Chip ditogol={chip1} onTogol={setChip1}>
              Warna
            </Chip>
            <Chip ditogol={chip2} onTogol={setChip2}>
              Hiasan
            </Chip>
            <Chip ditogol={false} onTogol={() => {}} disabled>
              Corak (disabled)
            </Chip>
          </div>
        </Seksyen>

        <Seksyen tajuk="KadPakej">
          <div className="grid gap-4 sm:grid-cols-3">
            <KadPakej nama="Simple" hargaSen={3000} ciri={["3 halaman scroll", "Motion Larut sahaja", "1 imej rujukan"]} />
            <KadPakej
              nama="Signature"
              hargaSen={4000}
              ciri={["4 halaman scroll", "4 motion pembukaan", "4 imej rujukan"]}
              popular
              dipilih
            />
            <KadPakej nama="Luxury" hargaSen={5500} ciri={["4 halaman scroll", "Motion tersuai", "Gambar subjek penuh"]} />
          </div>
        </Seksyen>

        <Seksyen tajuk="KadPilihan (motion)">
          <div className="grid gap-3 sm:grid-cols-4">
            {["sampul", "tirai", "bidai", "larut"].map((m) => (
              <KadPilihan
                key={m}
                nama="motion"
                nilai={m}
                dipilih={kadPilihan === m}
                onPilih={setKadPilihan}
                label={m.charAt(0).toUpperCase() + m.slice(1)}
                pratonton={<span className="text-xs text-[var(--color-text)]/40">pratonton</span>}
              />
            ))}
          </div>
        </Seksyen>

        <Seksyen tajuk="KadStat">
          <div className="grid gap-3 sm:grid-cols-4">
            <KadStat label="Jualan bulan ini" nilai="RM 1,240" ikon={CircleDollarSign} arahPerubahan="naik" perubahan="+12% dari bulan lepas" />
            <KadStat label="Dah bayar" nilai="31" ikon={Wallet} />
            <KadStat label="Belum bayar" nilai="4" ikon={BarChart3} arahPerubahan="turun" perubahan="-2 dari minggu lepas" />
            <KadStat label="Live sekarang" nilai="27" ikon={Users} />
          </div>
        </Seksyen>

        <Seksyen tajuk="PenunjukLangkah">
          <PenunjukLangkah semasa={3} jumlah={8} />
        </Seksyen>

        <Seksyen tajuk="Amaran / Ralat / Kosong / Memuat">
          <Amaran jenis="info" tajuk="Maklumat">
            Bacaan tema mengambil masa sehingga 5 saat.
          </Amaran>
          <Amaran jenis="amaran" tajuk="Amaran">
            Baki jana semula: 1 lagi percubaan.
          </Amaran>
          <Amaran jenis="berjaya" tajuk="Berjaya">
            Perubahan telah disimpan.
          </Amaran>
          <Ralat tajuk="Muat naik gagal">Fail melebihi had 5MB.</Ralat>
          <Kosong tajuk="Tiada pesanan lagi" huraian="Mula cipta jemputan pertama anda." aksi={<Butang varian="utama">Mula cipta</Butang>} />
          <Memuat baris={3} />
        </Seksyen>

        <Seksyen tajuk="MuatNaikFail">
          <div className="max-w-sm">
            <MuatNaikFail label="Rujukan gaya" hadSaizMb={5} onFail={() => {}} />
          </div>
        </Seksyen>

        <Seksyen tajuk="PetakWarna">
          <div className="flex flex-wrap gap-4">
            <PetakWarna label="Aksen" nilai={warna} onTukar={setWarna} />
            <PetakWarna label="Latar" nilai="#1b1230" onTukar={() => {}} disabled />
          </div>
        </Seksyen>

        <Seksyen tajuk="Modal & Sheet">
          <div className="flex gap-3">
            <Butang varian="sekunder" onClick={() => setModalTerbuka(true)}>
              Buka Modal
            </Butang>
            <Butang varian="sekunder" onClick={() => setSheetTerbuka(true)}>
              Buka Sheet
            </Butang>
          </div>
          <Modal terbuka={modalTerbuka} onTutup={() => setModalTerbuka(false)} tajuk="Sahkan tindakan">
            <p className="text-sm text-[var(--color-text)]/80">Adakah anda pasti mahu teruskan?</p>
            <div className="mt-4 flex justify-end gap-2">
              <Butang varian="hantu" onClick={() => setModalTerbuka(false)}>
                Batal
              </Butang>
              <Butang varian="utama" onClick={() => setModalTerbuka(false)}>
                Sahkan
              </Butang>
            </div>
          </Modal>
          <Sheet terbuka={sheetTerbuka} onTutup={() => setSheetTerbuka(false)} tajuk="Pilihan tambahan">
            <p className="text-sm text-[var(--color-text)]/80">Kandungan bottom sheet untuk mobile.</p>
          </Sheet>
        </Seksyen>

        <Seksyen tajuk="Jadual + Paginasi">
          <Jadual
            idBaris={(b) => b.id}
            lajur={[
              { kunci: "nama", label: "Nama", papar: (b) => b.nama },
              { kunci: "pakej", label: "Pakej", papar: (b) => b.pakej },
              { kunci: "status", label: "Status", papar: (b) => b.status },
            ]}
            data={[
              { id: "1", nama: "Salmah & Osman", pakej: "Signature", status: "Terbit" },
              { id: "2", nama: "Sinar Teknologi", pakej: "Luxury", status: "Draf" },
            ]}
          />
          <Paginasi halamanSemasa={halaman} jumlahHalaman={5} onTukar={setHalaman} />
        </Seksyen>
      </main>
    </div>
  );
}
