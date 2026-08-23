const soalan = [
  {
    tanya: "Adakah saya boleh pilih tema dari katalog?",
    jawab:
      "Tiada katalog tema. Tema kad anda dijana secara automatik dari gambar rujukan gaya yang anda muat naik — warna, mood, hiasan dan huruf semuanya unik ikut rujukan anda.",
  },
  {
    tanya: "Berapa lama proses siap sebuah kad?",
    jawab: "Purata kurang 12 minit dari daftar sehingga bayar, bergantung kelajuan anda mengisi maklumat.",
  },
  {
    tanya: "Bolehkah saya edit kad selepas ia diterbitkan?",
    jawab: "Boleh. Log masuk ke dashboard anda untuk kemas kini maklumat asas — perubahan terus terpapar pada kad awam.",
  },
  {
    tanya: "Apa jadi bila pautan tamat tempoh?",
    jawab: "Kad akan memaparkan mesej mesra bahawa jemputan telah tamat tempoh. Tempoh aktif bergantung pakej yang dipilih.",
  },
  {
    tanya: "Bagaimana tetamu RSVP?",
    jawab: "Tetamu boleh isi borang RSVP terus pada kad, atau guna butang WhatsApp sebagai saluran kedua.",
  },
];

export default function HalamanSoalanLazim() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 sm:px-8">
      <h1 className="text-3xl font-bold text-[var(--color-text)]">Soalan Lazim</h1>
      <div className="mt-8 flex flex-col divide-y divide-[var(--color-section-ghost)]">
        {soalan.map((s) => (
          <div key={s.tanya} className="py-5">
            <h2 className="font-medium text-[var(--color-text)]">{s.tanya}</h2>
            <p className="mt-1.5 text-sm text-[var(--color-text)]/70">{s.jawab}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
