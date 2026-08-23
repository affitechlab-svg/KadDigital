# 09 — BUILD PHASES
**KadDigital** · roadmap pembinaan berperingkat
*(Fail ini disimpan sebagai `09-BUILD-PHASES.md` — nama itu yang di-gate oleh `CLAUDE.md §0`. Rujuk ia sebagai "BUILD-PHASES".)*

---

## Peraturan emas

1. **Satu fasa satu masa. Jangan lompat.** Fasa N tidak boleh bermula sebelum semua checkpoint fasa N−1 ditanda.
2. Setiap fasa berakhir dengan **satu commit** (atau siri commit) + **satu entri** dalam `CHANGELOG-AUTO.md` (`CLAUDE.md §5`).
3. Kalau checkpoint gagal, **baiki dalam fasa itu juga** — jangan bawa hutang ke fasa depan.
4. Kalau sesuatu tidak dijelaskan dokumen, tulis dalam `SOALAN.md`, guna andaian sementara, tanda `// TODO(putus):`, teruskan.
5. **Jangan bina ciri dalam senarai Tangguh** (`01-PRD §7`) walau nampak mudah.

### Peta fasa

| Fasa | Nama | Hasil boleh dilihat |
|---|---|---|
| 0 | Scaffold | Projek boleh `dev` & `build` |
| 1 | Component library (Nocturne) | Halaman `/kitchen-sink` |
| 2 | Komponen Kad + motion | Kad boleh discroll & dibuka (data palsu) |
| 3 | Static pages guna seed data | Semua 15 skrin wujud, boleh diklik |
| 4 | Database & Auth (Supabase lokal) | Boleh daftar, log masuk, RLS lulus |
| 5 | Business logic — aliran cipta | Pesanan draf sebenar tersimpan |
| 6 | Bayaran & terbitan | Bayar (sandbox) → `/i/<slug>` hidup |
| 7 | Dashboard client & admin | Urus pesanan, RSVP, un-publish |
| 8 | Local QA | Semua AC-0…AC-13 ditanda |
| 9 | GitHub + Supabase cloud | Preview deploy hidup dengan data cloud |
| 10 | Deploy production | `kaddigital.my` hidup |

---

## PHASE 0 — Scaffold

**Objektif:** rangka projek yang boleh dijalankan, dengan pagar kualiti sudah terpasang sebelum sebaris logik ditulis.

**Skop — buat:**
- `create-next-app` (Next.js 15, App Router, TypeScript, `src` tidak digunakan — ikut struktur `02-TECH-STACK §3`)
- `tsconfig` `strict: true`, `noUncheckedIndexedAccess: true`
- Tailwind v4 + token Nocturne sebagai CSS variable global (`CLAUDE.md §4.8`)
- ESLint + Prettier; skrip `dev`, `build`, `lint`, `typecheck`, `test`
- Struktur folder kosong penuh mengikut `02-TECH-STACK §3` (dengan `.gitkeep`)
- `.env.example` dengan **semua** nama var dari `02-TECH-STACK §6` (nilai kosong)
- `.gitignore` — pastikan `.env.local` tersekat
- Vitest + Playwright dipasang, satu ujian smoke setiap satu
- Salin `DEV HANDOFF DOCS/` ke dalam repo; `CLAUDE.md` di root repo juga

**Skop — JANGAN buat:** apa-apa komponen UI, apa-apa panggilan Supabase, apa-apa halaman selain `/`.

**Deliverable:** repo tempatan yang boleh `pnpm dev` dan tunjuk halaman kosong bertema Nocturne.

**Done bila…**
- [ ] `pnpm dev` jalan tanpa ralat, `pnpm build` lulus
- [ ] `pnpm lint` dan `pnpm typecheck` lulus bersih
- [ ] `pnpm test` (Vitest smoke) dan `pnpm test:e2e` (Playwright smoke) lulus
- [ ] `.env.example` lengkap; `.env.local` tidak ter-track oleh git
- [ ] Token Nocturne kelihatan: latar `#161826`, teks `#e9e9ed`, radius 8px
- [ ] Entri `CHANGELOG-AUTO.md` ditulis

---

## PHASE 1 — Component library (Nocturne)

**Objektif:** semua kepingan UI platform siap dan konsisten, supaya fasa seterusnya cuma menyusun, bukan mereka.

**Skop — buat** (dalam `/komponen/ui`, semua presentational, props sahaja, tiada fetch):
- `Butang` (utama, sekunder, hantu, bahaya; keadaan loading & disabled)
- `Input`, `TextArea`, `Pilihan`, `Toggle`, `RadioKad`, `Chip` (boleh togol)
- `KadPakej` (harga, senarai ciri, badge POPULAR)
- `KadPilihan` (untuk motion, bentuk potongan, taburan)
- `PenunjukLangkah` ("LANGKAH 3 / 8")
- `BarAtas` (butang ← Kembali + tajuk)
- `Amaran` / `Ralat` / `Kosong` (empty state) / `Memuat` (skeleton)
- `Modal`, `Sheet` (bottom sheet mobile)
- `Jadual` + `Paginasi` (untuk admin)
- `KadStat` (untuk 4 kad statistik admin)
- `MuatNaikFail` (drag/tap, pratonton kecil, papar had saiz)
- `PetakWarna` (papar & tukar satu warna palet)
- `TogolBahasa` (BM/EN)
- Halaman pembangun `/kitchen-sink` yang memaparkan setiap komponen dalam setiap keadaan

**Skop — JANGAN buat:** komponen kad jemputan (itu Fasa 2), apa-apa logik borang, apa-apa DB.

**Deliverable:** `/komponen/ui/*` + `/kitchen-sink`.

**Done bila…**
- [ ] Setiap komponen di atas wujud dan muncul dalam `/kitchen-sink`
- [ ] Setiap komponen ada keadaan: normal, fokus, disabled, ralat (mana berkenaan)
- [ ] Semua label contoh dalam Bahasa Melayu
- [ ] Boleh dinavigasi guna papan kekunci; fokus kelihatan jelas
- [ ] Diuji pada 360px dan 1280px — tiada elemen terpotong
- [ ] Tiada komponen yang memanggil `fetch` atau Supabase
- [ ] `lint` + `typecheck` + `build` lulus; entri changelog ditulis

---

## PHASE 2 — Komponen Kad + 4 motion

**Objektif:** jantung produk. Kad scroll 4 halaman yang lancar di telefon, dengan 4 motion pembukaan — semuanya digerakkan oleh props sahaja.

**Skop — buat** (dalam `/komponen/kad`):
- `<KadJemputan pesanan tema mod="pratonton"|"awam" />` — **satu sumber render** (`CLAUDE.md §4.2`)
- Bekas `scroll-snap-type: y mandatory`; seksyen `height:100%` bekas, **bukan `100vh`** (`CLAUDE.md §4.3`)
- `<Pembukaan>` dengan 4 varian: `sampul` (kepak terbuka), `tirai` (belah dua), `bidai` (angkat ke atas), `larut` (pudar & zum). Sentuh untuk buka; overlay hilang bila animasi tamat; butang **Ulang pembukaan**
- `<HalamanUtama>` — kicker, slot gambar utama (gerbang/bulat/segi), tajuk A + penyambung + tajuk B, blok hari–bulan–tarikh–masa, hint "SKROL KE BAWAH"
- `<HalamanTempat>` — kicker venue, nama, alamat, 3–6 baris atur cara
- `<HalamanKataKata>` — petikan + penandatangan (hanya jika `bil_halaman = 4`)
- `<HalamanPeta>` — tangkapan peta, butang Waze & Google Maps, borang RSVP (UI sahaja, belum hantar), butang RSVP WhatsApp
- Titik penunjuk tepi kanan; indeks aktif dari `scrollTop / clientHeight`; klik titik → `child.offsetTop`
- Suntikan tema melalui CSS variable pada bekas kad (`02-TECH-STACK §5`); 5 pasangan huruf tetap via `next/font`
- Taburan latar: tiada / kelopak / hati — warna ikut tema
- Butang muzik (tiada autoplay), boleh matikan
- Halaman pembangun `/kad-lab` — pilih jenis acara, motion, tema, pakej dari fixture dan lihat kad berubah serta-merta

**Skop — JANGAN buat:** hantar RSVP ke server, ambil data dari DB, penjana palet.

**Fixture:** guna data contoh dalam `04-DATA-MODEL §6.4` (kahwin & korporat) — hardcode dalam `/lib/fixture`.

**Deliverable:** `<KadJemputan>` + `/kad-lab`.

**Done bila…**
- [ ] Empat motion boleh dimainkan dan diulang; tiada kad kelihatan sebelum pembukaan tamat
- [ ] Scroll snap tepat; tiada halaman separa; diuji pada **Safari iOS** (URL bar bergerak) dan Chrome Android
- [ ] Titik penunjuk sentiasa tepat; klik titik melompat ke halaman betul
- [ ] Tukar motion **tidak** mengubah warna atau huruf kad (AC-6)
- [ ] Simple = 3 halaman + pembukaan; Signature/Luxury = 4 + pembukaan
- [ ] Tukar tema fixture → warna, huruf, hiasan kad bertukar tanpa reload
- [ ] Muzik tidak autoplay; butang main/henti berfungsi; keadaan kekal semasa scroll
- [ ] CLS < 0.1 semasa pembukaan tamat; animasi guna `transform`/`opacity` sahaja
- [ ] Hanya **satu** definisi kad dalam repo (`grep` tiada salinan JSX kad)
- [ ] Entri changelog ditulis

---

## PHASE 3 — Static pages guna seed data

**Objektif:** setiap skrin dalam `03-SITEMAP` wujud, boleh diklik hujung ke hujung, guna data fixture — supaya rupa & aliran boleh dinilai sebelum apa-apa logik dibina.

**Skop — buat:**
- Awam: `/`, `/harga`, `/contoh`, `/soalan-lazim`, `/terma`, `/privasi`
- Auth (UI sahaja, belum berfungsi): `/daftar`, `/masuk`, `/lupa-kata-laluan`, `/tetapkan-kata-laluan`
- Aliran cipta (8 skrin, navigasi maju-mundur guna state tempatan): `/buat/pakej`, `/buat/demo/maklumat`, `/rujukan`, `/tema`, `/motion`, `/sentuhan`, `/pratonton`, `/bayar`, `/selesai`
- `/i/contoh-kahwin` dan `/i/contoh-korporat` — `<KadJemputan mod="awam">` dengan fixture
- Dashboard client: `/dashboard`, `/dashboard/[id]`, `/dashboard/[id]/edit`, `/dashboard/[id]/rsvp`, `/dashboard/akaun`
- Admin (desktop): `/admin/pesanan`, `/admin/pesanan/[id]`, `/admin/motion`, `/admin/motion/permintaan`, `/admin/client`, `/admin/bayaran`
- Halaman keadaan `/i/[slug]`: belum terbit · ditarik · tamat tempoh · tidak wujud (`03-SITEMAP §3`)
- Harga & senarai ciri dibaca dari fixture `pakej` yang **sama bentuk** dengan jadual DB (supaya Fasa 4 cuma tukar sumber)

**Skop — JANGAN buat:** Supabase, auth sebenar, upload sebenar, penjana palet, bayaran.

**Deliverable:** aplikasi statik yang boleh dilalui sepenuhnya dengan butang.

**Done bila…**
- [ ] Setiap laluan dalam `03-SITEMAP §2` memberi halaman (bukan 404 tidak sengaja)
- [ ] Boleh berjalan dari `/` → daftar → 8 langkah → selesai → dashboard **tanpa terperangkap**
- [ ] Butang **Kembali** dan **LANGKAH n / 8** ada pada setiap skrin `/buat/*`
- [ ] Empat halaman keadaan `/i/[slug]` boleh dilihat melalui URL demo
- [ ] Semua teks BM; tiada lorem ipsum tertinggal
- [ ] Admin diuji pada 1280px; semua skrin client diuji pada 360px
- [ ] Tiada import Supabase di mana-mana lagi
- [ ] Entri changelog ditulis

---

## PHASE 4 — Database & Auth (Supabase lokal)

**Objektif:** skema sebenar hidup di mesin tempatan, dengan RLS ketat dan auth berfungsi — sebelum apa-apa borang disambung.

**Skop — buat:**
- Supabase CLI + `supabase start` (Docker tempatan)
- Migrasi SQL bernombor untuk **semua** enum & jadual dalam `04-DATA-MODEL §2–3`
- Indeks & kekangan (`04-DATA-MODEL §3.4`)
- **RLS pada setiap jadual** mengikut `04-DATA-MODEL §4`
- Fungsi & trigger: `set_dikemas_pada`, `jana_no_rujukan`, `jana_slug`, `terbitkan_pesanan`, `dapatkan_kad`, `hantar_rsvp` (`04-DATA-MODEL §5`)
- Bucket Storage: `rujukan` (peribadi), `subjek` (peribadi), `muzik-pustaka` (awam), `awam` (aset kad dioptimum) + polisi
- `supabase/seed.sql`: 3 pakej, 4 motion, 3 trek muzik, 2 pesanan contoh, 2 akaun demo (`04-DATA-MODEL §6`)
- Pelanggan Supabase browser & server (`@supabase/ssr`) + middleware sesi (`03-SITEMAP §5`)
- Auth berfungsi betul-betul: daftar (cipta baris `profil`), log masuk, log keluar, lupa/tetapkan kata laluan
- Tukar `/harga` dan `/buat/pakej` daripada fixture kepada jadual `pakej` sebenar
- Ujian RLS automatik (Vitest): pengguna A cuba baca pesanan pengguna B → gagal

**Skop — JANGAN buat:** aliran cipta yang menyimpan pesanan (Fasa 5), bayaran, admin sebenar.

**Deliverable:** migrasi + seed + auth berfungsi tempatan.

**Done bila…**
- [ ] `supabase db reset` membina skema penuh dan seed tanpa ralat
- [ ] AC-1 (Akaun) semua ditanda
- [ ] Ujian RLS lulus: pengguna A **tidak** boleh baca/tulis data pengguna B melalui anon key
- [ ] `dapatkan_kad('contoh-kahwin')` memulangkan data; `dapatkan_kad('<draf>')` memulangkan kosong
- [ ] Buka `/dashboard` tanpa sesi → redirect `/masuk?seterusnya=…`, dan kembali selepas masuk
- [ ] Buka `/admin` sebagai client → 404
- [ ] Tukar `harga_sen` dalam DB → `/harga` berubah tanpa deploy (AC-2)
- [ ] `grep SERVICE_ROLE .next/static -r` kosong
- [ ] Entri changelog ditulis

---

## PHASE 5 — Business logic (aliran cipta)

**Objektif:** client boleh betul-betul membina pesanan draf yang lengkap dan tersimpan — semuanya kecuali bayar.

**Skop — buat:**
- Skema Zod untuk setiap langkah dalam `/lib/skema`, digunakan di client **dan** server
- `/buat/pakej` → `INSERT pesanan` (`draf`, `KD-xxxx`) → redirect ke `/buat/[id]/maklumat`
- Semakan pemilik pesanan pada setiap `/buat/[id]/*` (bukan pemilik → 404)
- Langkah maklumat: 5 jenis acara (+ *tersuai* wajib isi nama), tajuk, penyambung, tarikh/masa, venue, Waze/Maps, atur cara (had ikut pakej), kata-kata
- **Autosave** setiap 3 saat + penunjuk "Disimpan"
- Langkah rujukan: upload ke Storage (had bilangan & saiz ikut pakej), tampal link (ambil `og:image`), chip bacaan, gambar subjek + bentuk potongan + toggle tunjuk
- `POST /api/palet`: sharp → k-means k=5 → aksen dengan kontras ≥ 3:1 → mood → hiasan → pasangan huruf (`01-PRD §6`); fallback bila gagal; rate-limit
- Langkah tema: papar palet/mood/hiasan/huruf + pratonton; **Guna** / **Jana semula** (kira kuota) / **Laras sendiri** (Signature+)
- Langkah motion: tapis ikut `pakej.motion_dibenar` × `motion.aktif`; motion tersuai (Luxury) → `INSERT permintaan_motion`, `motion_status='semakan'`
- Langkah sentuhan: muzik pustaka / upload MP3 (premium), taburan, bahasa lalai
- `/buat/[id]/pratonton` → `<KadJemputan mod="pratonton">` dengan data DB sebenar
- **Gating pakej berpusat**: satu helper `bolehGuna(pakej, ciri)` — ciri di luar pakej tidak dipapar sebagai boleh klik
- Loncat ke belakang bebas; loncat ke hadapan hanya bila langkah sebelumnya lengkap

**Skop — JANGAN buat:** bayaran, penerbitan, dashboard, admin.

**Deliverable:** aliran 8 langkah yang menghasilkan pesanan `draf` lengkap dalam DB.

**Done bila…**
- [ ] AC-3, AC-4, AC-5, AC-6, AC-7 semua ditanda
- [ ] Refresh mana-mana langkah → semua kerja masih ada (autosave)
- [ ] Muat naik 4 imej rujukan sebenar → palet 5 warna + mood + huruf keluar < 5s
- [ ] Kuota jana semula dikira betul dan menghalang bila habis
- [ ] Fail upload **tidak** boleh dicapai melalui URL langsung tanpa token
- [ ] Cuba capai `/buat/<id-orang-lain>/maklumat` → 404
- [ ] Pratonton dan `/i/contoh-kahwin` menggunakan komponen yang sama
- [ ] Entri changelog ditulis

---

## PHASE 6 — Bayaran & terbitan

**Objektif:** duit masuk → kad terbit automatik, dengan selamat dan idempoten.

**Skop — buat:**
- Antaramuka `GatewayBayaran` + pelaksana ToyyibPay (`02-TECH-STACK §7`)
- `POST /api/bayaran/mula` → `INSERT bayaran (menunggu)` → URL gateway
- `/buat/[id]/bayar`: ringkasan pakej + jumlah, pilih DuitNow QR / FPX / kad
- `POST /api/bayaran/callback`: **sahkan signature**, idempoten, → `berjaya` → `terbitkan_pesanan()` (slug, `terbit`, `terbit_pada`, `tarikh_tamat`)
- Pengendalian slug bertindih (`-2`, `-3`) — `BR-01`, `BR-02`
- `/buat/[id]/selesai`: pautan, Salin, Share WhatsApp, Share Instagram, Buka kad saya; polling 5s (maks 2 minit) jika callback lewat
- E-mel resit + pautan (Resend)
- `/i/[slug]` sebenar: RPC `dapatkan_kad`, `revalidate 60`, metadata OG, `noindex`, 4 halaman keadaan
- `POST /api/rsvp` → RPC `hantar_rsvp`: Zod, kuota pakej, rate-limit, honeypot, `ip_hash`
- Cron `/api/cron/kemas-status` (5 minit: bayaran tergantung; harian: draf lapuk + pautan tamat tempoh)

**Skop — JANGAN buat:** dashboard & admin.

**Deliverable:** bayar sandbox → kad hidup di `/i/<slug>` → tetamu boleh RSVP.

**Done bila…**
- [ ] AC-8, AC-9, AC-10 semua ditanda
- [ ] Callback bersignature palsu **ditolak**, tiada perubahan status
- [ ] Callback sah dihantar dua kali → satu penerbitan sahaja (idempoten)
- [ ] Panggilan langsung dari client cuba set `status='terbit'` → gagal (RLS)
- [ ] Dua pesanan bertajuk sama → slug kedua dapat `-2`
- [ ] Pautan ditampal ke WhatsApp → pratonton OG betul
- [ ] Lighthouse mobile pada `/i/<slug>`: LCP < 2.5s, prestasi ≥ 85
- [ ] Kuota RSVP penuh → borang bertukar mesej, butang WhatsApp kekal
- [ ] Endpoint cron tanpa `CRON_SECRET` → 401
- [ ] Entri changelog ditulis

---

## PHASE 7 — Dashboard client & admin

**Objektif:** Fakhri boleh urus bisnes; client boleh urus jemputan sendiri selepas terbit.

**Skop — buat:**
- Client: senarai pesanan sendiri + status; salin/share; **Sambung & bayar** untuk draf
- Client: edit maklumat asas selepas terbit → `revalidatePath('/i/'+slug)`; slug terkunci
- Client: senarai RSVP (jumlah hadir / tidak / pax) + muat turun CSV (UTF-8 BOM)
- Client: `/dashboard/akaun` (nama, telefon, tukar kata laluan)
- Admin: 4 kad statistik (jualan bulan ini, dah bayar, belum bayar, live sekarang)
- Admin: jadual semua pesanan + carian (nama/e-mel/slug) + filter (pakej, status) + paginasi
- Admin: butiran pesanan + **Un-publish** → `ditarik` + `INSERT log_admin`
- Admin: pustaka motion (hidup/mati, pakej minimum) — kad sedia ada yang guna motion dimatikan **kekal berfungsi**
- Admin: gilir permintaan motion tersuai (`baru` → `sedang_dibuat` → `siap`), kaitkan `motion_kod_hasil`, set `pesanan.motion_status='siap'`, e-mel makluman
- Admin: senarai client & senarai bayaran

**Deliverable:** kedua-dua dashboard berfungsi penuh atas data sebenar.

**Done bila…**
- [ ] AC-11 dan AC-12 semua ditanda
- [ ] Edit dari dashboard → `/i/<slug>` dalam tab lain kemas kini ≤ 60s
- [ ] CSV terbuka elok dalam Excel; aksara Melayu tidak rosak
- [ ] RSVP pesanan A tidak boleh dibaca oleh client B (uji anon key)
- [ ] Statistik admin sepadan dengan pertanyaan SQL manual
- [ ] Un-publish → `/i/<slug>` jadi halaman "tidak lagi tersedia"; `log_admin` bertambah
- [ ] Entri changelog ditulis

---

## PHASE 8 — Local QA

**Objektif:** buktikan seluruh sistem memenuhi `06-ACCEPTANCE-CRITERIA` sebelum apa-apa keluar dari mesin.

**Skop — buat:**
- Jalankan **setiap** AC-0 hingga AC-13 satu per satu; tanda dan catat
- Ujian E2E Playwright untuk 3 laluan kritikal: (a) daftar → cipta → bayar sandbox → terbit, (b) tetamu buka kad → RSVP, (c) admin un-publish
- Ujian unit: penjana palet (kontras & determinisme), `jana_slug`, gating pakej, kuota RSVP
- Ujian RLS penuh sebagai suite
- Lighthouse mobile pada `/`, `/harga`, `/i/<slug>`
- Semakan aksesibiliti asas: navigasi papan kekunci, kontras teks, label borang
- Semakan keselamatan: rahsia tiada dalam bundle, endpoint status pesanan tidak boleh dipandu client, rate-limit menendang
- Betulkan semua yang gagal **dalam fasa ini**

**Deliverable:** `LAPORAN-QA.md` dalam `DEV HANDOFF DOCS/` — senarai AC + lulus/gagal + nota.

**Done bila…**
- [ ] Setiap kotak AC-0…AC-13 ditanda ✅ (tiada "nanti")
- [ ] 3 ujian E2E lulus secara konsisten 3 kali berturut-turut
- [ ] Tiada isu kritikal atau tinggi berbaki
- [ ] `LAPORAN-QA.md` ditulis
- [ ] Entri changelog ditulis

---

## PHASE 9 — GitHub + Supabase cloud

**Objektif:** kod di remote, data di cloud, preview deploy hidup — tetapi belum untuk orang awam.

**Skop — buat:**
- Repo GitHub peribadi; branch `main` (production) + `dev`
- Perlindungan branch: PR wajib untuk `main`
- GitHub Actions: `lint` + `typecheck` + `build` + Vitest pada setiap PR
- Projek Supabase cloud (**staging**): `supabase db push` semua migrasi + seed
- Sahkan RLS aktif di cloud (bukan hanya tempatan) — jalankan semula suite RLS terhadap staging
- Semua rahsia dimasukkan sebagai environment variable platform (bukan dalam repo)
- Gateway bayaran masih **sandbox** pada peringkat ini
- Preview deploy dari branch `dev`
- Jalankan semula 3 ujian E2E terhadap preview URL

**Deliverable:** URL preview yang berfungsi dengan Supabase cloud staging.

**Done bila…**
- [ ] `git push` mencetuskan CI dan CI lulus
- [ ] Migrasi berjaya pada Supabase cloud; seed masuk
- [ ] Suite RLS lulus terhadap **staging**, bukan hanya tempatan
- [ ] Aliran penuh boleh dilalui pada URL preview (bayaran sandbox)
- [ ] Tiada rahsia dalam sejarah git (`git log -p | grep` untuk kunci)
- [ ] Entri changelog ditulis

---

## PHASE 10 — Deploy production

> ⚠️ **Nota percanggahan:** arahan asal menyebut **Railway**, tetapi `02-TECH-STACK` menetapkan **Vercel**. Untuk Next.js App Router + ISR + cron, **Vercel disyorkan** dan itulah laluan lalai di bawah. Railway boleh dilakukan tetapi memerlukan Next.js dalam mod `standalone` dan cron digantikan dengan Railway Cron. **Sahkan dengan Fakhri sebelum fasa ini bermula** — jangan pilih sendiri.

**Objektif:** `kaddigital.my` hidup, menerima bayaran sebenar.

**Skop — buat:**
- Projek Supabase **production** berasingan dari staging; `db push` migrasi; seed pakej/motion/muzik sahaja (**tiada** akaun demo, **tiada** pesanan contoh selain `/contoh`)
- Deploy production dari `main`
- Domain `kaddigital.my` + SSL; `NEXT_PUBLIC_SITE_URL` dikemas kini
- Gateway bayaran tukar ke **live**; URL callback production didaftarkan
- Resend: domain e-mel disahkan (SPF/DKIM)
- Cron didaftarkan (`02-TECH-STACK §9`) dan disahkan berjalan
- Backup Supabase harian dihidupkan
- Pemantauan ralat + log; halaman `404` dan `500` bertema
- **Transaksi asap sebenar:** satu pembelian RM30 sebenar oleh Fakhri, hingga kad terbit, kemudian refund/tanda dalam rekod
- Runbook ringkas dalam `DEV HANDOFF DOCS/OPERASI.md`: cara un-publish, cara refund, cara tambah motion, siapa dihubungi bila gateway turun

**Done bila…**
- [ ] `https://kaddigital.my` hidup dengan SSL
- [ ] Transaksi sebenar RM30 → callback → kad terbit → e-mel resit diterima
- [ ] `/i/<slug>` production lulus Lighthouse mobile ≥ 85
- [ ] Kedua-dua cron berjalan mengikut jadual (disahkan dalam log)
- [ ] Backup harian aktif dan satu restore diuji ke staging
- [ ] Suite RLS lulus terhadap **production**
- [ ] `OPERASI.md` ditulis dan Fakhri sudah baca
- [ ] Entri changelog akhir ditulis

---

## Selepas go-live (bukan sebahagian roadmap ini)

Ambil dari `01-PRD §7` (Tangguh) hanya selepas 20 pesanan berbayar sebenar dan maklum balas dikumpul. Jangan mula lebih awal.
