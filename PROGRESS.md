# PROGRESS.md — Peringkat Projek KadDigital

Legenda: ✅ Siap · 🔄 Dalam Proses · ⬜ Belum Mula

Fasa ikut `DEV HANDOFF DOCS/09-BUILD-PHASES.md`. Satu fasa satu masa — tak lompat.

## Persediaan Dokumentasi
- ✅ Setup `CLAUDE.md`, `WORK-LOG.md`, `PROGRESS.md`
- ✅ Terima & simpan dokumen spesifikasi (`DEV HANDOFF DOCS/00`–`06`, `09-BUILD-PHASES`)

## Fasa 0 — Scaffold
✅ Siap — rangka Next.js, Tailwind, ESLint/Prettier, struktur folder, `.env.example`, Vitest + Playwright smoke test.
- [x] `pnpm dev` jalan tanpa ralat, `pnpm build` lulus
- [x] `pnpm lint` dan `pnpm typecheck` lulus bersih
- [x] `pnpm test` (Vitest smoke) dan `pnpm test:e2e` (Playwright smoke) lulus
- [x] `.env.example` lengkap; `.env.local` tidak ter-track oleh git
- [x] Token Nocturne kelihatan: latar `#161826`, teks `#e9e9ed`, radius 8px (disahkan via screenshot)
- [x] Entri `CHANGELOG-AUTO.md` ditulis

## Fasa 1 — Component library (Nocturne)
✅ Siap — semua kepingan UI platform + halaman `/kitchen-sink`.
- [x] Setiap komponen wujud dan muncul dalam `/kitchen-sink`
- [x] Setiap komponen ada keadaan: normal, fokus, disabled, ralat (mana berkenaan)
- [x] Semua label contoh dalam Bahasa Melayu
- [x] Boleh dinavigasi guna papan kekunci; fokus kelihatan jelas
- [x] Diuji pada 360px dan 1280px — tiada elemen terpotong
- [x] Tiada komponen yang memanggil `fetch` atau Supabase
- [x] `lint` + `typecheck` + `build` lulus; entri changelog ditulis

## Fasa 2 — Komponen Kad + 4 motion
⬜ Belum Mula — `<KadJemputan>`, 4 motion pembukaan, `/kad-lab`.

## Fasa 3 — Static pages guna seed data
⬜ Belum Mula — semua 15+ skrin wujud & boleh diklik, guna data fixture.

## Fasa 4 — Database & Auth (Supabase lokal)
⬜ Belum Mula — migrasi SQL, RLS, seed, auth (Supabase jalan lokal via Docker).

## Fasa 5 — Business logic (aliran cipta)
⬜ Belum Mula — aliran 8 langkah simpan pesanan draf sebenar dalam DB.

## Fasa 6 — Bayaran & terbitan
⬜ Belum Mula — ToyyibPay sandbox → kad terbit automatik di `/i/<slug>`.

## Fasa 7 — Dashboard client & admin
⬜ Belum Mula — urus pesanan, RSVP, un-publish.

## Fasa 8 — Local QA
⬜ Belum Mula — semua AC-0…AC-13 disahkan, `LAPORAN-QA.md`.

## Fasa 9 — GitHub + Supabase cloud
⬜ Belum Mula — CI, Supabase staging, preview deploy.

## Fasa 10 — Deploy production
⬜ Belum Mula — `kaddigital.my` hidup, bayaran live.

---

**Nota database:** Fasa 0–3 guna **dummy/fixture data** sahaja (tiada Supabase). Supabase sebenar disambung mula Fasa 4 (lokal dahulu), baru cloud di Fasa 9.
