export default function HalamanTerma() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 sm:px-8">
      <h1 className="text-3xl font-bold text-[var(--color-text)]">Terma Penggunaan</h1>
      <div className="mt-6 flex flex-col gap-4 text-sm leading-relaxed text-[var(--color-text)]/80">
        <p>
          Dengan menggunakan KadDigital, anda bersetuju bahawa kandungan yang dimuat naik
          (gambar rujukan, gambar subjek, teks) adalah hak atau kebenaran anda sendiri untuk
          digunakan.
        </p>
        <p>
          Bayaran yang telah dibuat adalah untuk penerbitan satu kad jemputan digital ikut
          pakej yang dipilih. Naik taraf pakej dibenarkan dengan bayaran beza harga; turun
          taraf tidak dibenarkan.
        </p>
        <p>
          Slug pautan tidak boleh ditukar selepas kad diterbitkan kerana pautan mungkin telah
          diedarkan kepada tetamu.
        </p>
        <p>
          Un-publish oleh pihak admin (disebabkan kandungan bermasalah) tidak memulangkan
          wang yang telah dibayar.
        </p>
        <p>
          Pautan kad akan tamat tempoh mengikut had bulan aktif pakej yang dipilih, bermula
          dari tarikh penerbitan.
        </p>
      </div>
    </main>
  );
}
