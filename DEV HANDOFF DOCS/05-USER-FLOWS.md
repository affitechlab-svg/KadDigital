# 05 — User Flows
**KadDigital** · langkah pengguna mencapai matlamat

---

## Aliran A — Client cipta & terbitkan jemputan (aliran utama)

**Matlamat:** dari tidak tahu apa-apa → ada pautan kad yang boleh dikongsi.
**Peranti:** telefon. **Sasaran masa:** < 12 minit.

| # | Skrin | Tindakan client | Kesan sistem |
|---|---|---|---|
| 1 | `/` | Baca, tengok contoh, tekan **Mula** | — |
| 2 | `/daftar` | Isi nama, e-mel, telefon, kata laluan | Cipta `auth.users` + `profil` |
| 3 | `/buat/pakej` | Pilih Simple / Signature / Luxury → **Teruskan** | `INSERT pesanan` (`status='draf'`, `no_rujukan='KD-xxxx'`) → redirect langkah 4 |
| 4 | `/buat/[id]/maklumat` | Pilih jenis acara (kahwin lalai; kalau *tersuai*, taip nama sendiri). Isi kicker, tajuk A & B, penyambung, tarikh, masa, venue, alamat, Waze, Maps, atur cara (3 baris), kata-kata + penandatangan | Simpan autosave setiap 3 saat |
| 5 | `/buat/[id]/rujukan` | **Rujukan gaya:** muat naik sampai 4 imej atau tampal link. Tanda chip bacaan (warna / hiasan / corak / huruf). **Gambar subjek:** utama, sampingan, logo + bentuk potongan + toggle tunjuk | Upload ke Storage, `INSERT media` |
| 6 | — | Tekan **Bina tema dari rujukan** | `POST /api/palet` → ekstrak palet 5 warna, mood, hiasan, huruf → simpan `pesanan.tema` |
| 7 | `/buat/[id]/tema` | Lihat palet + mood + hiasan + huruf + pratonton kecil. Pilih: **Guna tema ini** / **Jana semula** / **Laras sendiri** | Jana semula tambah `jana_semula_dipakai`; tolak bila kuota habis |
| 8 | `/buat/[id]/motion` | Pilih Sampul / Tirai / Bidai / Larut. Atau **Motion tersuai** → tulis huraian | `motion_kod` disimpan. Jika tersuai: `INSERT permintaan_motion`, `motion_status='semakan'`, pratonton guna `larut` |
| 9 | `/buat/[id]/sentuhan` | Pilih muzik pustaka (atau upload MP3 jika premium), taburan latar, bahasa lalai | |
| 10 | `/buat/[id]/pratonton` | Scroll kad penuh macam tetamu. Boleh patah balik edit mana-mana langkah | Render `<KadJemputan mod="pratonton">` |
| 11 | `/buat/[id]/bayar` | Pilih DuitNow QR / FPX / kad → **Bayar** | `POST /api/bayaran/mula` → `INSERT bayaran (menunggu)` → redirect ke gateway |
| 12 | Gateway | Selesaikan bayaran | Gateway → `POST /api/bayaran/callback` |
| 13 | — | — | Sahkan signature → `bayaran.status='berjaya'` → `terbitkan_pesanan()`: jana slug, `status='terbit'`, `terbit_pada`, `tarikh_tamat` → hantar e-mel resit |
| 14 | `/buat/[id]/selesai` | Lihat "Selesai!", **Salin** pautan, **Share WhatsApp**, **Share Instagram**, **Buka kad saya** | |

**Cabang:**
- **Bayaran gagal/batal** → kembali ke `/buat/[id]/bayar` dengan mesej; pesanan kekal `draf`; boleh cuba semula.
- **Callback lewat** → skrin selesai tunjuk "Sedang mengesahkan bayaran…" + polling 5s (maks 2 minit), cron jadi jaring keselamatan.
- **Client keluar separuh jalan** → pesanan `draf` muncul dalam `/dashboard` dengan butang **Sambung & bayar**.
- **Bacaan rujukan gagal** → tema `sumber='fallback'` + mesej "Kami tak dapat baca rujukan tu — cuba gambar lain atau laras sendiri."

---

## Aliran B — Tetamu terima jemputan

| # | Tindakan | Kesan |
|---|---|---|
| 1 | Buka pautan dari WhatsApp | `GET /i/<slug>` → SSR; semak `terbit` + belum tamat tempoh |
| 2 | Lihat halaman 0 (pembukaan) | Motion pilihan client; teks "Sentuh untuk buka" |
| 3 | Sentuh | Animasi main; overlay hilang bila tamat; kad halaman 1 muncul |
| 4 | Scroll ke bawah | Snap ke halaman 2 (Tempat & masa), 3 (Kata-kata), 4 (Peta & kehadiran); titik penunjuk kanan bergerak |
| 5 | Tekan **Waze** / **Google Maps** | Buka app peta |
| 6 | Isi RSVP: nama, bilangan, hadir/tidak, catatan → **Hantar** | `POST /api/rsvp` → RPC `hantar_rsvp` → mesej "Terima kasih, kehadiran anda direkodkan." |
| 7 | (pilihan) Tekan **RSVP WhatsApp** | Buka `wa.me` ke nombor client dengan teks siap |
| 8 | (pilihan) Toggle BM/EN, butang muzik, **Ulang pembukaan** | Tiada muat semula halaman |

**Cabang:** kuota RSVP penuh → borang ditukar mesej "Kehadiran sudah ditutup" + butang WhatsApp kekal. Pautan ditarik/tamat → halaman mesra.

---

## Aliran C — Client uruskan selepas terbit

| # | Skrin | Tindakan |
|---|---|---|
| 1 | `/dashboard` | Lihat senarai pesanan + status (LIVE / DRAF), salin pautan, share |
| 2 | `/dashboard/[id]/edit` | Betulkan tajuk, tarikh, venue, atur cara, kata-kata, peta → **Simpan** |
| 3 | — | Sistem `revalidatePath('/i/'+slug)` — tetamu nampak perubahan dalam < 60s. **Slug tidak boleh ditukar.** |
| 4 | `/dashboard/[id]/rsvp` | Lihat senarai RSVP, jumlah hadir/tidak, jumlah pax, **Muat turun CSV** |
| 5 | `/dashboard/akaun` | Tukar nama, telefon, kata laluan |

---

## Aliran D — Admin uruskan bisnes

| # | Skrin | Tindakan |
|---|---|---|
| 1 | `/admin/pesanan` | Lihat kad statistik (jualan bulan ini, dah bayar, belum bayar, live sekarang) + jadual semua pesanan |
| 2 | — | Cari ikut nama/e-mel/slug; filter ikut pakej & status |
| 3 | `/admin/pesanan/[id]` | Lihat butiran; **Un-publish** jika bermasalah → `status='ditarik'`, `INSERT log_admin` |
| 4 | `/admin/motion` | Hidup/matikan motion; tetapkan pakej minimum |
| 5 | `/admin/motion/permintaan` | Lihat gilir motion tersuai → tanda `sedang_dibuat` → bila siap, tetapkan `motion_kod_hasil`, `status='siap'`, pesanan `motion_status='siap'` |
| 6 | `/admin/client` / `/admin/bayaran` | Semak senarai client & rekod transaksi |

---

## Aliran E — Motion tersuai (rentas peranan)

```
Client pilih "Motion tersuai" + tulis huraian
   → permintaan_motion (baru), pesanan.motion_status = semakan
   → kad tetap boleh dibayar & terbit, guna "larut" sebagai sementara
   → Admin lihat gilir, tanda sedang_dibuat (SLA 2 hari bekerja)
   → Admin siapkan motion, kaitkan kod, tanda siap
   → pesanan.motion_status = siap; kad awam bertukar motion automatik
   → E-mel makluman ke client
```

---

## Peraturan silang aliran

- Setiap langkah `/buat/*` **autosave**; tiada langkah yang boleh hilang kerja.
- Client boleh **loncat ke belakang** bila-bila masa; loncat ke hadapan hanya jika langkah sebelumnya lengkap.
- Butang **Kembali** wujud pada setiap skrin `/buat/*`.
- Penunjuk **LANGKAH n / 8** pada bahagian atas setiap skrin `/buat/*`.
- Semua mesej ralat dalam BM, mesra, cadangkan tindakan seterusnya.
