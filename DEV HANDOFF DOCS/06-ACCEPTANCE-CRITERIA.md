# 06 — Acceptance Criteria
**KadDigital** · checklist QA "siap bila…"

Cara guna: tanda ✅ hanya bila **diuji sendiri pada peranti/viewport yang disebut**. Tulis hasil ujian dalam entri `CHANGELOG-AUTO.md`.

---

## AC-0 Umum (rentas semua ciri)

- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm build` lulus tanpa amaran baru
- [ ] Tiada `any` dalam kod; tiada `console.log` tertinggal
- [ ] Semua teks UI dalam Bahasa Melayu; tiada teks Inggeris tertinggal
- [ ] Diuji pada viewport 360px, 390px dan 1280px
- [ ] Setiap borang menunjuk ralat medan dalam BM, bukan mesej Zod mentah
- [ ] RLS aktif pada **setiap** jadual; ujian: pengguna A tidak boleh baca pesanan pengguna B (uji dengan anon key sebenar)
- [ ] Tiada rahsia dalam bundle client (`grep SERVICE_ROLE .next/static -r` kosong)

---

## AC-1 Akaun

- [ ] Daftar dengan e-mel sah → akaun + baris `profil` tercipta, terus log masuk
- [ ] Daftar dengan e-mel sedia ada → ralat mesra, bukan crash
- [ ] Kata laluan < 8 aksara ditolak
- [ ] Log masuk salah kata laluan → mesej BM
- [ ] Lupa kata laluan → e-mel diterima → boleh tetapkan kata laluan baru
- [ ] Buka `/dashboard` tanpa sesi → redirect `/masuk?seterusnya=/dashboard`, dan selepas masuk kembali ke `/dashboard`
- [ ] Buka `/admin` sebagai client → 404 (bukan 403 yang membocorkan kewujudan)

---

## AC-2 Pilih pakej

- [ ] Tiga pakej dipapar dari jadual `pakej` (bukan hardcode); tukar harga dalam DB → UI berubah tanpa deploy
- [ ] Badge POPULAR pada Signature
- [ ] Butang teruskan tunjuk nama + harga pakej dipilih
- [ ] Klik teruskan → `pesanan` baru `status='draf'` dengan `no_rujukan` format `KD-0001`
- [ ] Ciri yang tidak termasuk dalam pakej **tidak dipapar sebagai boleh klik** di langkah kemudian (contoh: Simple tidak nampak pilihan Sampul/Tirai/Bidai)

---

## AC-3 Maklumat acara

- [ ] Lima jenis acara boleh dipilih; pilih *tersuai* → medan nama acara muncul dan wajib
- [ ] Kicker, tajuk, tarikh, venue disimpan; refresh halaman → data masih ada (autosave)
- [ ] Penyambung boleh tukar `&` ↔ `—`
- [ ] Atur cara: boleh tambah/buang baris sehingga had pakej; cuba lebih → butang tambah dimatikan dengan nota
- [ ] Tarikh lampau memberi amaran (tetapi tidak menyekat)
- [ ] Link Waze/Maps yang bukan URL ditolak

---

## AC-4 Rujukan & gambar

- [ ] Muat naik imej rujukan sehingga had pakej; melebihi had → ditolak dengan mesej
- [ ] Fail > 5MB atau bukan imej → ditolak
- [ ] Link Pinterest/IG boleh ditampal; jika og:image gagal diambil → mesej minta muat naik imej
- [ ] Chip bacaan (warna/hiasan/corak/huruf) boleh ditogol dan disimpan
- [ ] Gambar subjek hanya slot yang dibenarkan pakej dipapar (Simple: tiada; Signature: logo; Luxury: semua)
- [ ] Bentuk potongan gerbang/bulat/segi mengubah pratonton serta-merta
- [ ] Toggle "Tunjuk gambar utama pada kad" berfungsi
- [ ] Fail disimpan dalam bucket **peribadi**; URL langsung tanpa token → ditolak

---

## AC-5 Bacaan tema

- [ ] "Bina tema dari rujukan" menghasilkan tepat **5 warna**, mood, senarai hiasan, pasangan huruf
- [ ] Warna aksen mempunyai kontras ≥ 3:1 terhadap warna latar yang dipilih
- [ ] Pratonton kad pada skrin ini menggunakan tema baharu
- [ ] **Jana semula** mengurangkan baki kuota dan memaparkan baki ("3 lagi percubaan"); kuota habis → butang dimatikan
- [ ] **Laras sendiri** membenarkan tukar warna & huruf (Signature+); Simple tidak nampak butang ini
- [ ] Imej rosak/kosong → tema fallback + mesej mesra, bukan crash
- [ ] Imej rujukan **tidak** muncul di dalam kad

---

## AC-6 Motion

- [ ] Hanya motion yang dibenarkan pakej **dan** `motion.aktif = true` dipapar
- [ ] Tukar motion mengubah pratonton pembukaan tanpa mengubah warna/huruf kad
- [ ] Pilih motion tersuai (Luxury) → medan huraian wajib; hantar → `permintaan_motion` tercipta, `motion_status='semakan'`, nota "2 hari bekerja" dipapar
- [ ] Sementara `semakan`, kad awam guna Larut
- [ ] Admin tandakan siap → kad awam bertukar motion tanpa client buat apa-apa

---

## AC-7 Pratonton

- [ ] Pratonton dan halaman awam menggunakan **komponen yang sama** (semak: satu fail `KadJemputan`, tiada salinan)
- [ ] Bilangan halaman ikut pakej (Simple 3, lain-lain 4) + halaman pembukaan
- [ ] Scroll snap tepat pada setiap halaman; tiada halaman separa
- [ ] Titik penunjuk kanan menunjukkan halaman aktif yang betul
- [ ] Klik titik penunjuk melompat ke halaman betul (guna `offsetTop`, uji pada Safari iOS di mana URL bar bergerak)
- [ ] Penghantaran RSVP dimatikan dalam mod pratonton

---

## AC-8 Bayaran

- [ ] Butang bayar mencipta `bayaran` status `menunggu` dan membawa ke gateway
- [ ] Callback dengan signature **palsu** ditolak dan tiada perubahan status
- [ ] Callback sah → `bayaran.status='berjaya'`, `pesanan.status='terbit'`, slug dijana, `tarikh_tamat` = terbit + `bulan_aktif`
- [ ] Callback yang sama dihantar dua kali → idempoten, tiada pesanan dua kali terbit
- [ ] Bayaran gagal → pesanan kekal `draf`, client boleh cuba semula
- [ ] Tiada endpoint client yang boleh menukar `status` ke `dibayar`/`terbit` (uji dengan panggilan langsung)
- [ ] Slug bertindih (dua "Salmah & Osman") → yang kedua dapat `-2`
- [ ] E-mel resit diterima dengan pautan kad yang betul

---

## AC-9 Halaman awam `/i/[slug]`

- [ ] Slug tidak wujud / draf / ditarik / tamat tempoh → halaman mesra yang betul mengikut `03-SITEMAP §3`
- [ ] Pembukaan: sentuh → animasi main → overlay hilang; **Ulang pembukaan** memainkan semula
- [ ] Empat halaman memaparkan data pesanan sebenar (bukan placeholder)
- [ ] Butang Waze & Google Maps membuka pautan client
- [ ] Muzik **tidak** autoplay; butang main berfungsi; boleh matikan; keadaan kekal semasa scroll
- [ ] Taburan (kelopak/hati) mengambil warna tema; pilihan "tiada" benar-benar tiada elemen
- [ ] Toggle BM/EN menukar label, tarikh dan masa (Signature+); Simple tiada toggle
- [ ] `og:image`/`og:title` betul bila pautan ditampal ke WhatsApp
- [ ] `robots: noindex` hadir
- [ ] LCP < 2.5s pada throttle 4G (Lighthouse mobile), skor prestasi ≥ 85
- [ ] Tiada layout shift ketika pembukaan tamat (CLS < 0.1)

---

## AC-10 RSVP

- [ ] Hantar RSVP sah → rekod tersimpan, mesej terima kasih, borang dikunci
- [ ] Nama kosong / bilangan 0 atau > 20 → ditolak
- [ ] Kuota pakej penuh → borang ditukar mesej "Kehadiran sudah ditutup", butang WhatsApp kekal
- [ ] Hantar 10 kali laju dari IP sama → rate-limit menendang
- [ ] Honeypot terisi → diterima secara senyap tetapi tidak disimpan
- [ ] RSVP pesanan A **tidak** boleh dibaca oleh client B (uji melalui anon key)
- [ ] Butang RSVP WhatsApp membuka `wa.me` dengan nombor & teks yang betul

---

## AC-11 Dashboard client

- [ ] Senarai hanya pesanan sendiri, susun terbaru dahulu
- [ ] Status LIVE / DRAF / DITARIK dipapar betul
- [ ] Salin pautan menyalin URL penuh
- [ ] Edit maklumat asas → simpan → buka `/i/<slug>` dalam tab lain → perubahan kelihatan dalam ≤ 60s
- [ ] Slug **tidak** boleh diedit selepas terbit
- [ ] Halaman RSVP menunjukkan jumlah hadir, tidak hadir, jumlah pax
- [ ] CSV muat turun terbuka elok dalam Excel (UTF-8 BOM, aksara Melayu tidak rosak)
- [ ] Pesanan draf mempunyai butang **Sambung & bayar** yang membawa ke langkah terakhir yang belum lengkap

---

## AC-12 Dashboard admin

- [ ] Empat kad statistik memaparkan nombor yang sepadan dengan DB
- [ ] Jadual menunjukkan semua pesanan semua client
- [ ] Carian nama/e-mel/slug memberi hasil betul; filter pakej & status berfungsi bersama carian
- [ ] Un-publish → `status='ditarik'`, `/i/<slug>` jadi halaman "tidak lagi tersedia", `log_admin` bertambah
- [ ] Matikan satu motion → motion itu hilang dari pilihan client baharu, **tetapi** kad sedia ada yang sudah menggunakannya kekal berfungsi
- [ ] Gilir permintaan motion tersuai boleh ditanda `sedang_dibuat` → `siap`
- [ ] Senarai bayaran sepadan dengan rekod gateway

---

## AC-13 Cron & kes tepi

- [ ] Cron 5-minit menyelesaikan bayaran yang callbacknya hilang
- [ ] Cron harian menanda pesanan draf 30 hari sebagai `lapuk` dan memadam medianya
- [ ] Pesanan yang pautannya tamat tempoh memaparkan halaman tamat tempoh
- [ ] Endpoint cron tanpa `CRON_SECRET` → 401

---

## Definisi "Siap" untuk satu ciri

Satu ciri hanya dianggap **siap** apabila: kod ditulis → semua AC berkaitan ditanda → `lint/typecheck/build` lulus → diuji pada 360px → entri ditulis dalam `CHANGELOG-AUTO.md` mengikut `CLAUDE.md §5`.
