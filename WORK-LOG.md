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
