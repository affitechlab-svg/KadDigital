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

## [2026-08-23 05:55] — Fasa 2: Komponen Kad + 4 motion
- **Fasa:** Fasa 2 — Komponen Kad + 4 motion
- **Buat apa:** Bina `<KadJemputan pesanan tema mod="pratonton"|"awam" />` sebagai SATU
  sumber render kad (CLAUDE.md §3.2). Komponen sokongan: `Pembukaan` (4 motion — Sampul,
  Tirai, Bidai, Larut — sentuh untuk buka, overlay hilang lepas animasi via `setTimeout`
  sepadan tempoh transisi, butang Ulang pembukaan), `TitikPenunjuk` (indeks aktif dari
  `scrollTop/clientHeight` throttle rAF, klik → `child.offsetTop`), `ButangMuzik` (tiada
  autoplay), `Taburan` (kelopak/hati/tiada, warna ikut tema), `BentukGambar` (gerbang/
  bulat/segi), `HalamanUtama`, `HalamanTempat`, `HalamanKataKata` (hanya bila
  `bilHalaman=4` & ada `kataTeks`), `HalamanPeta` (Waze/Maps + borang RSVP UI-sahaja,
  dimatikan bila `mod="pratonton"`, + butang WhatsApp). Setup 5 pasangan huruf tetap
  (`lib/tema/fonts.ts`) via `next/font/google` dan helper `gayaTemaKad()` yang suntik
  tema sebagai CSS variable (`--kad-latar`, `--kad-aksen`, `--kad-teks`, dll.) pada bekas
  kad sahaja — tidak ditulis ke Tailwind config. Bina fixture data (`lib/fixture/data.ts`)
  ikut `04-DATA-MODEL.md §6.4` (contoh-kahwin, contoh-korporat) + 3 preset tema
  (`lib/fixture/tema-preset.ts`) untuk demo di `/kad-lab`. Bekas scroll guna
  `scroll-snap-type: y mandatory` dan seksyen `height:100%` bekas (bukan `100vh`).
- **Fail disentuh:** `komponen/kad/*.tsx` (10 fail), `lib/fixture/jenis.ts`,
  `lib/fixture/data.ts`, `lib/fixture/tema-preset.ts`, `lib/tema/jenis.ts`,
  `lib/tema/fonts.ts`, `lib/tema/suntik.ts`, `lib/util/tarikh.ts`, `app/kad-lab/page.tsx`
- **Migrasi DB:** tiada
- **Env baru:** tiada
- **Diuji:** `pnpm lint` ✅ · `pnpm typecheck` ✅ · `pnpm build` ✅ · `pnpm test` ✅ ·
  `grep -rl "KadJemputan("` sahkan hanya `KadJemputan.tsx` sendiri (tiada salinan JSX
  kad) · screenshot Chromium 1280px: kad tertutup (Sampul), kad terbuka (HalamanUtama,
  HalamanTempat, HalamanKataKata, HalamanPeta dengan borang RSVP & WhatsApp), tukar
  pesanan+tema ke set korporat (palet biru, huruf Inter) — motion & bilangan halaman
  kekal ikut pilihan berasingan, warna/huruf tema bertukar serentak tanpa reload.
- **Belum siap / TODO:** Ukuran CLS sebenar (Lighthouse) dan ujian Safari iOS sebenar
  belum dapat dijalankan dalam sandbox ini (hanya Chromium tersedia) — ditangguh & ditanda
  eksplisit dalam `PROGRESS.md` untuk disahkan semasa Fasa 8 (Local QA). Penghantaran RSVP
  sebenar (`POST /api/rsvp`), Supabase, dan penjana palet (`POST /api/palet`) sengaja
  belum dibina — di luar skop Fasa 2.
- **Beza dari dokumen:** Reka bentuk "overlay hilang bila animasi tamat" (09-BUILD-PHASES
  §Fasa 2) dilaksanakan sebagai overlay mutlak di atas kandungan kad (bukan halaman
  scroll-snap berasingan) supaya "halaman 0" benar-benar hilang selepas dibuka —
  ditafsir dari perkataan "overlay" dalam spesifikasi, bukan keputusan produk baru.

## [2026-08-23 06:10] — Fasa 3: Static pages guna seed data
- **Fasa:** Fasa 3 — Static pages guna seed data
- **Buat apa:** Bina semua 36 laluan dari `03-SITEMAP-ROUTING.md §1`: 6 awam, 4 auth
  (UI sahaja), 9 skrin aliran cipta (`/buat/pakej` + 8 langkah `/buat/demo/*`), `/i/[slug]`
  (kad awam sebenar untuk `contoh-kahwin`/`contoh-korporat` + 4 halaman keadaan ikut
  `03-SITEMAP §3`), 5 skrin dashboard client, 6 skrin admin desktop. Aliran cipta guna
  `DrafPesananProvider` — React Context dalam memori sahaja (BUKAN `localStorage`, ikut
  larangan `CLAUDE.md §3.9`) untuk kongsi state merentasi 8 langkah; hilang bila refresh
  secara sengaja kerana belum ada DB (autosave sebenar dibina Fasa 5). Tambah fixture:
  `pakej.ts` (bentuk sama jadual DB), `motion.ts`, `muzik.ts`, `admin.ts` (senarai pesanan/
  client/bayaran/RSVP/permintaan motion), `draf.ts` (state wizard + mapper ke
  `PesananFixture` untuk pratonton guna `<KadJemputan>` yang sama).
- **Fail disentuh:** ~40 fail baru merentasi `app/(awam)/*`, `app/(auth)/*`,
  `app/(client)/buat/*`, `app/(client)/dashboard/*`, `app/(admin)/admin/*`, `app/i/[slug]`,
  `komponen/awam/*`, `komponen/buat/*`, `komponen/kad/HalamanKeadaanKad.tsx`,
  `lib/fixture/{pakej,motion,muzik,admin,draf}.ts`
- **Migrasi DB:** tiada
- **Env baru:** tiada
- **Diuji:** `pnpm lint` ✅ · `pnpm typecheck` ✅ · `pnpm build` (32 laluan Next.js) ✅ ·
  `pnpm test` ✅ · `curl` semua 36 laluan → HTTP 200 (tiada 404 tak sengaja) · Playwright
  hujung-ke-hujung: `/` → Mula → daftar → 8 langkah (isi maklumat, rujukan, jana semula
  tema, motion, sentuhan, pratonton, bayar) → selesai → dashboard, tiada terperangkap,
  screenshot disahkan setiap langkah · admin diuji 1280px (sidebar nav, jadual, kad stat)
  · `grep` sahkan tiada import Supabase sebenar (hanya sebutan dalam komen `// Fasa 4`).
- **Belum siap / TODO:** Auth sebenar, Supabase, upload sebenar, penjana palet sebenar,
  bayaran sebenar — semua sengaja di luar skop Fasa 3, dibina bermula Fasa 4.
- **Beza dari dokumen:** Laluan aliran cipta guna segmen `/buat/demo/*` (bukan
  `/buat/[id]/*` sebenar) kerana `09-BUILD-PHASES.md §Fasa 3` sendiri menetapkan
  `/buat/demo/maklumat` dsb. sebagai laluan Fasa 3 (id sebenar datang Fasa 5 bila DB
  wujud) — konsisten dengan dokumen, bukan penyimpangan.

## [2026-08-23 12:00] — Fasa 4: Database & Auth (Supabase lokal) — KOD SIAP, BELUM DISAHKAN PENUH
- **Fasa:** Fasa 4 — Database & Auth (Supabase lokal)
- **Buat apa:** Tulis 6 migrasi SQL bernombor (`supabase/migrations/`): enum + profil +
  pakej + motion; jadual `pesanan` teras + indeks; `media`/`bayaran`/`rsvp`/
  `permintaan_motion`/`log_admin`; 6 fungsi & trigger (`set_dikemas_pada`,
  `jana_no_rujukan`, `semak_had_atur_cara`, `jana_slug`, `terbitkan_pesanan`,
  `dapatkan_kad`, `hantar_rsvp`, `tangani_pengguna_baharu`); RLS pada **setiap** jadual;
  Storage buckets (`rujukan`, `subjek` peribadi; `muzik-pustaka`, `awam` awam) + polisi.
  Tulis `seed.sql` (3 pakej, 4 motion, 2 pesanan contoh `terbit`, 2 akaun demo). Tulis
  pelanggan Supabase browser (`lib/supabase/pelayar.ts`) & server
  (`lib/supabase/pelayan.ts`), `middleware.ts` (sesi `/buat/*`, `/dashboard/*`,
  `/admin/*` + semakan peranan admin), `app/not-found.tsx`. Sambung Auth sebenar:
  `/daftar` (`signUp`), `/masuk` (`signInWithPassword` + redirect `?seterusnya=`),
  `/lupa-kata-laluan` (`resetPasswordForEmail`), `/tetapkan-kata-laluan`
  (`updateUser`), log keluar (`signOut`) di `/dashboard/akaun` (skrin ini juga kini baca/
  tulis `profil` sebenar). Tambah `lib/skema/auth.ts` (Zod). Tukar `/harga` dan
  `/buat/pakej` daripada fixture ke jadual `pakej` sebenar (`lib/supabase/pakej.ts`
  memetakan baris DB snake_case → bentuk `PakejFixture` sedia ada, supaya komponen
  paparan tidak berubah). Tulis ujian RLS automatik (`supabase/tests/rls.test.ts`)
  guna `@supabase/supabase-js` sebenar — reka bentuk langkau (`describe.skipIf`) dengan
  mesej jelas bila Supabase tempatan tiada, supaya `pnpm test` tidak gagal/tersekat di
  persekitaran tanpa Docker.
- **Fail disentuh:** `supabase/migrations/*.sql` (6 fail), `supabase/seed.sql`,
  `supabase/tests/rls.test.ts`, `lib/supabase/{pelayar,pelayan,pakej}.ts`,
  `lib/skema/auth.ts`, `middleware.ts`, `app/not-found.tsx`,
  `app/(auth)/{daftar,masuk,lupa-kata-laluan,tetapkan-kata-laluan}/page.tsx`,
  `app/(client)/dashboard/akaun/page.tsx`, `app/(awam)/page.tsx`,
  `app/(awam)/harga/page.tsx`, `app/(client)/buat/pakej/page.tsx`, `.env.local`
  (tempatan sahaja, tidak di-commit)
- **Migrasi DB:** `20260823113326_enum_dan_rujukan.sql`,
  `20260823113329_jadual_pesanan.sql`, `20260823113333_jadual_sokongan.sql`,
  `20260823113336_fungsi_trigger.sql`, `20260823113339_rls.sql`,
  `20260823113343_storage.sql`
- **Env baru:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
  `SUPABASE_SERVICE_ROLE_KEY` kini **digunakan** (sebelum ini kosong dalam
  `.env.example` sejak Fasa 0)
- **Diuji:** ⚠️ **`supabase start` (Docker) TIDAK DAPAT dijalankan dalam sandbox sesi
  ini** — dasar rangkaian sandbox menyekat capaian ke `production.cloudfront.docker.com`
  (CDN imej Docker Hub), disahkan melalui log ralat 403 berulang dan status proksi
  ejen. Sebagai gantian terbaik yang boleh dilakukan tanpa Docker: pasang PostgreSQL 16
  terus (bukan Docker) dalam sandbox, cipta stub minimum skema `auth`/`storage` +
  peranan (`anon`/`authenticated`/`service_role`) + grant asas meniru bootstrap
  Supabase sebenar, jalankan kesemua 6 migrasi + `seed.sql` terhadapnya — **semua
  berjaya tanpa ralat**. Ujian manual (`psql` + `SET ROLE` + `set_config
  request.jwt.claim.sub`) mengesahkan: `jana_slug` hasilkan `-2` bila tajuk sama;
  `hantar_rsvp` masuk rekod; `semak_had_atur_cara` tolak atur cara melebihi had pakej;
  `dapatkan_kad('contoh-kahwin')` pulang data, slug tidak wujud pulang kosong;
  `terbitkan_pesanan` set slug+status+tarikh tamat betul; **RLS**: pengguna lain nampak
  0 baris pesanan orang lain, pemilik nampak pesanan sendiri, INSERT bagi pihak orang
  lain ditolak. Semasa ujian ini, **jubang keselamatan sebenar ditemui**: dengan RLS
  row-level sahaja, client masih boleh `UPDATE pesanan SET status='dibayar'` pada
  pesanan sendiri — melanggar CLAUDE.md §3.5 & AC-8 secara langsung. Dibaiki dengan
  `REVOKE UPDATE` table-wide + `GRANT UPDATE` hanya pada lajur selamat untuk
  `authenticated`; diuji semula — client kini `permission denied` bila cuba tukar
  `status`, tapi masih boleh edit `tajuk_a` dsb. `pnpm lint` ✅ · `pnpm typecheck` ✅ ·
  `pnpm build` ✅ (32 laluan + middleware, guna `.env.local` kunci demo tempatan piawai
  Supabase) · `pnpm test` ✅ (ujian RLS automatik disahkan **langkau dengan betul** bila
  Supabase tempatan tiada — belum disahkan **jalan penuh** kerana itu) ·
  `grep SERVICE_ROLE .next/static` kosong ✅. **TIDAK dapat diuji dalam sandbox ini:**
  `supabase start`/`db reset` sebenar, log masuk/daftar/keluar sebenar dalam browser,
  ujian RLS automatik terhadap Supabase sebenar (bukan Postgres tulen simulasi).
- **Belum siap / TODO:** Pemilik projek WAJIB jalankan `supabase start` di komputer
  sendiri (dengan Docker) dan ikut langkah pengesahan dalam `PROGRESS.md` §Fasa 4
  sebelum fasa ini ditanda 100% siap — termasuk jalankan `pnpm test` semula untuk
  sahkan suite RLS automatik lulus **penuh** (bukan dilangkau), dan uji aliran
  daftar/masuk/keluar/reset kata laluan sebenar dalam browser.
- **Beza dari dokumen:** (1) `supabase db reset` disahkan guna Postgres tulen + stub,
  bukan stack Supabase penuh — sebab dijelaskan di atas (Docker disekat sandbox).
  (2) Kata laluan akaun demo (`kaddigital123`) di-hardcode dalam `seed.sql` walaupun
  `04-DATA-MODEL.md §6.5` sebut ".env.local sahaja" — keputusan & sebab dicatat penuh
  dalam `DEV HANDOFF DOCS/SOALAN.md` (S-002), tanda `// TODO(putus): S-002` dalam
  `seed.sql`.
