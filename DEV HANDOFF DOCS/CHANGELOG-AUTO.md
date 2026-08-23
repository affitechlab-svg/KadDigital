# Log Pembangunan Automatik — KadDigital

## [2026-08-23 05:35] — Fasa 0: Scaffold Next.js
- **Fasa:** Fasa 0 — Scaffold
- **Buat apa:** Cipta rangka projek Next.js 15 (App Router, TypeScript strict,
  `noUncheckedIndexedAccess`), Tailwind v4 dengan token Nocturne sebagai CSS variable
  global, ESLint (flat config, `next/core-web-vitals` + `next/typescript`) + Prettier,
  skrip `dev/build/lint/typecheck/test/test:e2e`. Bina struktur folder kosong
  (`.gitkeep`) ikut `02-TECH-STACK.md §3`. Pasang Vitest + Playwright dengan satu
  ujian smoke setiap satu, kedua-duanya lulus. Tiada komponen UI, tiada panggilan
  Supabase, tiada halaman selain `/` — ikut skop Fasa 0.
- **Fail disentuh:** `package.json`, `tsconfig.json`, `eslint.config.mjs`,
  `.prettierrc.json`, `app/globals.css`, `app/layout.tsx`, `app/page.tsx`,
  `.env.example`, `.gitignore`, `vitest.config.ts`, `lib/util/asap.test.ts`,
  `playwright.config.ts`, `e2e/asap.spec.ts`, struktur folder kosong `/app/*`,
  `/komponen/*`, `/lib/*`, `/supabase/*`, `README.md`
- **Migrasi DB:** tiada
- **Env baru:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
  `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_SITE_URL`, `TOYYIBPAY_SECRET_KEY`,
  `TOYYIBPAY_CATEGORY_CODE`, `TOYYIBPAY_CALLBACK_SECRET`, `RESEND_API_KEY`,
  `CRON_SECRET` (semua kosong dalam `.env.example`, belum digunakan dalam kod)
- **Diuji:** `pnpm lint` ✅ · `pnpm typecheck` ✅ · `pnpm build` ✅ · `pnpm test`
  (Vitest, 1 ujian) ✅ · `pnpm test:e2e` (Playwright, 1 ujian) ✅ · `pnpm dev` disahkan
  jalan & screenshot 390×844 mengesahkan tema Nocturne (latar `#161826`, aksen
  `#9184d9`, teks `#e9e9ed`) terpapar dengan betul.
- **Belum siap / TODO:** Fasa 1 (component library Nocturne + `/kitchen-sink`) belum
  bermula.
- **Beza dari dokumen:** Pakej `next` yang dipasang oleh `create-next-app@latest` ialah
  v16.x (bukan v15.x seperti dikehendaki `02-TECH-STACK.md §2`) — sudah dipin semula ke
  `^15.4.0` (terpasang: 15.5.23) selepas scaffold. Ditambah `eslint-config-prettier`,
  `prettier`, `@eslint/eslintrc` (untuk `FlatCompat` — diperlukan kerana
  `eslint-config-next` masih format eslintrc lama), `@vitejs/plugin-react`, `jsdom` —
  semua ini sokongan tooling yang diminta eksplisit dalam skop Fasa 0
  ("ESLint + Prettier", "Vitest + Playwright") tetapi tiada dalam senarai pakej
  `02-TECH-STACK.md §2`; tiada pakej produk/runtime ditambah di luar senarai.

## [2026-08-23 05:45] — Fasa 1: Component library (Nocturne)
- **Fasa:** Fasa 1 — Component library (Nocturne)
- **Buat apa:** Bina 22 komponen presentational dalam `/komponen/ui`: `Butang` (4 varian +
  loading/disabled), `Input`, `TextArea`, `Pilihan` (select), `Toggle`, `RadioKad`, `Chip`,
  `KadPakej`, `KadPilihan`, `PenunjukLangkah`, `BarAtas`, `Amaran`, `Ralat`, `Kosong`,
  `Memuat` (skeleton), `Modal`, `Sheet` (guna elemen native `<dialog>` untuk fokus-trap &
  Esc-to-close percuma), `Jadual`, `Paginasi`, `KadStat`, `MuatNaikFail` (drag/drop +
  pratonton + had saiz), `PetakWarna`, `TogolBahasa`. Semua props-only, tiada `fetch`/
  Supabase. Bina halaman dev `/kitchen-sink` yang paparkan setiap komponen dalam pelbagai
  keadaan. Tambah util kecil `lib/util/cn.ts` (gabung className, tiada pakej luar
  ditambah untuk ini).
- **Fail disentuh:** `komponen/ui/*.tsx` (22 fail), `lib/util/cn.ts`,
  `app/kitchen-sink/page.tsx`
- **Migrasi DB:** tiada
- **Env baru:** tiada
- **Diuji:** `pnpm lint` ✅ · `pnpm typecheck` ✅ · `pnpm build` ✅ · `pnpm test` ✅ ·
  screenshot `/kitchen-sink` pada 360px & 1280px (tiada elemen terpotong) · Modal & Sheet
  diuji buka/tutup dengan Playwright · navigasi papan kekunci (Tab) disahkan — fokus
  kelihatan jelas (outline aksen ungu) pada butang.
- **Belum siap / TODO:** Fasa 2 (`<KadJemputan>` + 4 motion + `/kad-lab`) belum bermula.
- **Beza dari dokumen:** tiada.
