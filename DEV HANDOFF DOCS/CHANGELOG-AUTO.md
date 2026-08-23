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
