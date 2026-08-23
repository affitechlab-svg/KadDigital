# WORK-LOG.md — Log Kerja KadDigital

Format setiap entri:
```
## [Tarikh & Masa]
- Diminta: ...
- Dibuat: ...
- Status: Siap / Belum Siap / Dalam Proses
```

---

## 2026-08-23 05:20 (UTC)
- Diminta: Setup sistem dokumentasi projek sebelum mula membina apa-apa —
  CLAUDE.md (peraturan tetap + ringkasan projek), WORK-LOG.md (log kerja),
  dan PROGRESS.md (senarai peringkat siap/belum).
- Dibuat: Cipta `CLAUDE.md` dengan peraturan tetap (wajib catat log
  selepas setiap tugas, wajib baca WORK-LOG.md & PROGRESS.md sebelum
  sesi baru) serta ringkasan projek & stack (belum ditetapkan). Cipta
  `WORK-LOG.md` (fail ini) dan `PROGRESS.md` dengan peringkat asas
  projek.
- Status: Siap

## 2026-08-23 05:35 (UTC)
- Diminta: Baca & ringkaskan dokumen spesifikasi lengkap (09-BUILD-PHASES + zip 01-PRD,
  02-TECH-STACK, 03-SITEMAP-ROUTING, 04-DATA-MODEL, 05-USER-FLOWS, 06-ACCEPTANCE-CRITERIA,
  CLAUDE.md, 00-README). Cadang struktur projek. Setup projek Next.js — Fasa 0 (Scaffold)
  sahaja dari `09-BUILD-PHASES.md`, guna dummy data, Supabase disambung last.
- Dibuat:
  1. Salin semua dokumen spesifikasi ke `DEV HANDOFF DOCS/` dalam repo.
  2. Kemas kini `CLAUDE.md` root — gantikan versi generik dengan peraturan build rasmi
     projek (bahasa BM, satu sumber render kad, keselamatan RLS, fasa build, dll.),
     kekalkan `WORK-LOG.md`/`PROGRESS.md` sebagai lapisan ringkas + tambah
     `DEV HANDOFF DOCS/CHANGELOG-AUTO.md` sebagai log teknikal (per §5 CLAUDE.md).
  3. Scaffold Next.js 15 (App Router, TypeScript strict + `noUncheckedIndexedAccess`),
     Tailwind v4 dengan token warna Nocturne sebagai CSS variable global, ESLint +
     Prettier, skrip `dev/build/lint/typecheck/test/test:e2e`.
  4. Bina struktur folder kosong (`.gitkeep`) ikut `02-TECH-STACK.md §3`: `/app`
     (route groups awam/auth/client/admin + `/i/[slug]` + `/api/*`), `/komponen`
     (kad, ui, borang), `/lib` (supabase, tema, bayaran, skema, util, fixture),
     `/supabase/migrations` + `seed.sql`.
  5. `.env.example` dengan semua nama pembolehubah dari `02-TECH-STACK.md §6` (nilai
     kosong); `.gitignore` sekat `.env.local` tapi kekalkan `.env.example`.
  6. Vitest (unit smoke test) + Playwright (E2E smoke test) dipasang & lulus.
- Status: Siap — Fasa 0 selesai, semua checkpoint ditanda dalam `PROGRESS.md`.

## 2026-08-23 05:45 (UTC)
- Diminta: Teruskan ke Fasa 1 — Component library (Nocturne): semua kepingan UI platform
  (Butang, Input, TextArea, Pilihan, Toggle, RadioKad, Chip, KadPakej, KadPilihan,
  PenunjukLangkah, BarAtas, Amaran/Ralat/Kosong/Memuat, Modal, Sheet, Jadual+Paginasi,
  KadStat, MuatNaikFail, PetakWarna, TogolBahasa) + halaman `/kitchen-sink`.
- Dibuat: Bina 22 komponen presentational dalam `/komponen/ui` (props sahaja, tiada
  fetch/Supabase), semua label & mesej dalam BM, aksesibiliti (label, aria, focus-visible,
  role) pada setiap satu. Bina halaman `/kitchen-sink` yang paparkan semua komponen dalam
  pelbagai keadaan (normal/fokus/disabled/ralat). Disahkan secara visual dengan screenshot
  pada 360px & 1280px (tiada elemen terpotong), Modal & Sheet diuji buka/tutup, navigasi
  papan kekunci disahkan (fokus kelihatan jelas pada butang).
- Status: Siap — Fasa 1 selesai, semua checkpoint ditanda dalam `PROGRESS.md`.

## 2026-08-23 05:55 (UTC)
- Diminta: Teruskan ke Fasa 2 — Komponen Kad + 4 motion: `<KadJemputan>` (satu sumber
  render), 4 motion pembukaan (Sampul/Tirai/Bidai/Larut), 4 halaman kandungan kad, guna
  fixture data (kahwin & korporat), halaman dev `/kad-lab`.
- Dibuat: Bina fixture data (`lib/fixture`) + jenis TypeScript (Tema, Pesanan). Setup 5
  pasangan huruf tetap via `next/font/google` + helper suntikan tema sebagai CSS variable
  pada bekas kad sahaja. Bina komponen kad: `Pembukaan` (4 motion, sentuh untuk buka,
  butang Ulang pembukaan), `TitikPenunjuk` (offsetTop), `ButangMuzik` (no autoplay),
  `Taburan` (kelopak/hati), `HalamanUtama`, `HalamanTempat`, `HalamanKataKata` (hanya bila
  4 halaman), `HalamanPeta` (Waze/Maps + borang RSVP UI-sahaja + WhatsApp). Gabung semua
  jadi `<KadJemputan pesanan tema mod="pratonton"|"awam" />` dengan scroll-snap-type y
  mandatory, seksyen height:100% bekas (bukan 100vh). Bina `/kad-lab` untuk pilih jenis
  acara/motion/tema/pakej dan lihat kad berubah serta-merta. Disahkan secara visual:
  motion Sampul berfungsi, tukar tema (Malam Ungu ↔ Korporat Biru) tak jejas motion/pakej,
  4 halaman kandungan betul, `grep` sahkan hanya satu definisi `KadJemputan` dalam repo.
- Status: Siap — Fasa 2 selesai. Dua item belum boleh disahkan dalam sandbox ini (ukuran
  CLS Lighthouse & ujian Safari iOS sebenar) — ditangguh ke Fasa 8 Local QA, ditanda dalam
  `PROGRESS.md`.

## 2026-08-23 06:10 (UTC)
- Diminta: Teruskan ke Fasa 3 — Static pages guna seed data: semua skrin dalam sitemap
  wujud & boleh diklik hujung-ke-hujung, guna fixture (belum Supabase/auth/bayaran
  sebenar).
- Dibuat: Bina 36 laluan — 6 awam (`/`, `/harga`, `/contoh`, `/soalan-lazim`, `/terma`,
  `/privasi`), 4 auth UI-sahaja, 9 skrin aliran cipta (`/buat/pakej` + 8 langkah
  `/buat/demo/*` guna wizard state React Context dalam memori — BUKAN localStorage),
  `/i/[slug]` dengan kad awam sebenar (contoh-kahwin/korporat) + 4 halaman keadaan
  (belum terbit/ditarik/tamat tempoh/tidak wujud), 5 skrin dashboard client, 6 skrin
  admin (desktop). Tambah fixture pakej/motion/muzik/senarai pesanan/client/bayaran/
  RSVP/permintaan motion. Disahkan: semua 36 laluan pulang HTTP 200 (`curl`), aliran
  penuh `/` → daftar → 8 langkah → selesai → dashboard dilalui tanpa terperangkap
  (Playwright + screenshot), admin diuji 1280px, tiada import Supabase (`grep`),
  `lint`/`typecheck`/`build` lulus bersih.
- Status: Siap — Fasa 3 selesai, semua checkpoint ditanda dalam `PROGRESS.md`.

## 2026-08-23 12:00 (UTC)
- Diminta: Teruskan ke Fasa 4 — Database & Auth (Supabase lokal): migrasi SQL, RLS,
  seed, pelanggan Supabase, middleware sesi, auth sebenar, tukar /harga & /buat/pakej
  ke DB, ujian RLS automatik.
- Dibuat: Tulis 6 migrasi SQL lengkap (enum, semua 9 jadual, indeks, trigger, 6 fungsi
  termasuk `dapatkan_kad`/`hantar_rsvp`/`terbitkan_pesanan`, RLS pada setiap jadual,
  Storage buckets+polisi) dan `seed.sql`. **PENTING:** `supabase start` (Docker) tak
  boleh jalan dalam sandbox ini — dasar rangkaian sekat Docker Hub. Sebagai gantian,
  saya uji migrasi terhadap Postgres tulen (dipasang terus, bukan Docker) dengan stub
  minimum skema `auth`/`storage`. Semasa ujian ini saya **jumpa jubang keselamatan
  sebenar**: client asalnya boleh tukar `status='dibayar'` terus melalui RLS row-level
  sahaja — dibaiki dengan sekatan peringkat lajur (REVOKE+GRANT). Tulis pelanggan
  Supabase browser/server + middleware sesi, sambung Auth sebenar ke 4 skrin auth +
  log keluar, tukar `/harga`+`/buat/pakej` ke jadual DB sebenar, tulis ujian RLS
  automatik (Vitest) yang langkau dengan mesej jelas bila Supabase tempatan tiada.
- Status: **Kod siap, TAPI BELUM disahkan hujung-ke-hujung** — perlukan Docker yang
  tiada dalam sandbox ini. Anda perlu jalankan `supabase start` di komputer sendiri dan
  ikut langkah pengesahan dalam `PROGRESS.md` sebelum Fasa 4 ditanda 100% siap. Semua
  had & sebab dicatat jelas dalam `PROGRESS.md` dan `CHANGELOG-AUTO.md`.
