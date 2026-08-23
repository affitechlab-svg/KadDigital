export default function HalamanPrivasi() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 sm:px-8">
      <h1 className="text-3xl font-bold text-[var(--color-text)]">Dasar Privasi</h1>
      <div className="mt-6 flex flex-col gap-4 text-sm leading-relaxed text-[var(--color-text)]/80">
        <p>
          Kami mengumpul maklumat yang anda berikan semasa mendaftar akaun (nama, e-mel,
          telefon) dan semasa mencipta jemputan (maklumat acara, gambar rujukan/subjek).
        </p>
        <p>
          Halaman jemputan awam (<code>/i/[slug]</code>) hanya boleh dilihat sesiapa yang
          memiliki pautan — halaman ini ditanda <code>noindex</code> dan tidak diindeks oleh
          enjin carian.
        </p>
        <p>
          Data RSVP tetamu (nama, bilangan, kehadiran, catatan) hanya boleh dilihat oleh
          pemilik pesanan dan admin — tidak dipaparkan secara awam.
        </p>
        <p>
          Kami tidak menyalin gambar rujukan gaya anda ke dalam kad — hanya warna, mood dan
          hiasan yang diekstrak daripadanya.
        </p>
      </div>
    </main>
  );
}
