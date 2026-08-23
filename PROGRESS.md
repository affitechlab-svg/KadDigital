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
✅ Siap — `<KadJemputan>`, 4 motion pembukaan, `/kad-lab`.
- [x] Empat motion boleh dimainkan dan diulang; tiada kad kelihatan sebelum pembukaan tamat
- [x] Scroll snap tepat; tiada halaman separa (`scroll-snap-type: y mandatory`, seksyen `height:100%` bekas)
- [x] Titik penunjuk sentiasa tepat; klik titik melompat ke halaman betul (`offsetTop`)
- [x] Tukar motion **tidak** mengubah warna atau huruf kad (disahkan visual — AC-6)
- [x] Simple = 3 halaman + pembukaan; Signature/Luxury = 4 + pembukaan (kawalan pakej di `/kad-lab`)
- [x] Tukar tema fixture → warna, huruf, hiasan kad bertukar tanpa reload (disahkan visual, Malam Ungu ↔ Korporat Biru)
- [x] Muzik tidak autoplay (tiada fail muzik dalam fixture Fasa 2 — `ButangMuzik` hanya papar bila ada `url`)
- [x] Animasi guna `transform`/`opacity` sahaja
- [x] Hanya **satu** definisi kad dalam repo (disahkan `grep` — `KadJemputan.tsx` sahaja)
- [x] Entri changelog ditulis
- [ ] CLS < 0.1 diuji — belum diukur dengan Lighthouse (akan disahkan penuh dalam Fasa 8 Local QA)
- [ ] Diuji Safari iOS sebenar — belum boleh diuji dalam sandbox ini (hanya Chromium); disahkan logik `offsetTop` betul secara kod & visual Chromium

## Fasa 3 — Static pages guna seed data
✅ Siap — semua 36 laluan wujud & boleh diklik, guna data fixture.
- [x] Setiap laluan dalam `03-SITEMAP §2` memberi halaman (disahkan `curl` — semua 36 pulang 200)
- [x] Boleh berjalan dari `/` → daftar → 8 langkah → selesai → dashboard **tanpa terperangkap** (disahkan Playwright hujung-ke-hujung)
- [x] Butang Kembali dan LANGKAH n/8 ada pada setiap skrin `/buat/*`
- [x] Empat halaman keadaan `/i/[slug]` boleh dilihat melalui URL demo (`/i/demo-belum-terbit`, `/i/demo-ditarik`, `/i/demo-tamat-tempoh`, slug rawak → tidak wujud)
- [x] Semua teks BM; tiada lorem ipsum tertinggal
- [x] Admin diuji pada 1280px; semua skrin client diuji pada 360px
- [x] Tiada import Supabase di mana-mana lagi (disahkan `grep`)
- [x] Entri changelog ditulis

## Fasa 4 — Database & Auth (Supabase lokal)
🔄 Kod siap, **tapi belum disahkan hujung-ke-hujung** — sandbox ini tiada akses Docker
(dasar rangkaian sekat `production.cloudfront.docker.com`), jadi `supabase start` tak
boleh jalan di sini. **Anda kena jalankan langkah pengesahan di bawah pada komputer
sendiri (dengan Docker) sebelum fasa ini boleh ditanda 100% siap.**

- [x] Migrasi SQL penuh (enum, semua jadual, indeks, kekangan, trigger, fungsi, RLS,
  Storage) — disahkan jalan bersih terhadap **Postgres tulen** (bukan stack Supabase
  penuh) dalam sandbox ini, sebagai gantian terbaik yang boleh dilakukan tanpa Docker
- [x] `seed.sql` (pakej, motion, 2 pesanan contoh, 2 akaun demo) — disahkan masuk tanpa
  ralat dalam ujian Postgres tulen yang sama
- [x] **Ujian RLS manual** (bukan automatik) dijalankan & LULUS dalam sandbox ini:
  pengguna A tak nampak/tulis pesanan pengguna B, `dapatkan_kad('contoh-kahwin')` pulang
  data, slug tak wujud pulang kosong, `jana_slug` hasilkan `-2` bila tajuk sama,
  `semak_had_atur_cara` tolak lebihan had pakej
- [x] **Jubang keselamatan ditemui & dibaiki**: client asalnya BOLEH tukar
  `status='dibayar'` terus (langgar CLAUDE.md §3.5 & AC-8) — sekarang disekat pada
  peringkat lajur DB (REVOKE + GRANT lajur selamat sahaja), disahkan client masih boleh
  edit medan sendiri (tajuk, venue, dll.)
- [x] Pelanggan Supabase browser (`lib/supabase/pelayar.ts`) & server
  (`lib/supabase/pelayan.ts`) + `middleware.ts` (sesi `/buat/*`, `/dashboard/*`,
  `/admin/*`) — kod lengkap, **belum diuji langsung dalam browser** (perlukan Supabase
  hidup)
- [x] `/daftar`, `/masuk`, `/lupa-kata-laluan`, `/tetapkan-kata-laluan`, log keluar
  (`/dashboard/akaun`) disambung ke Supabase Auth sebenar — kod lengkap dgn Zod +
  mesej ralat BM, **belum diuji langsung**
- [x] `/harga` dan `/buat/pakej` baca terus dari jadual `pakej` (bukan fixture)
- [x] Ujian RLS **automatik** (Vitest, `supabase/tests/rls.test.ts`) ditulis — reka
  bentuk untuk langkau dengan mesej jelas jika Supabase tempatan tiada (disahkan
  langkau betul dalam sandbox ini); akan jalan penuh bila Supabase hidup
- [ ] `supabase db reset` sebenar (bukan simulasi Postgres tulen) — **BELUM disahkan**,
  perlukan Docker
- [ ] Ujian RLS automatik lulus **terhadap Supabase sebenar** (bukan simulasi) — **BELUM
  disahkan**
- [ ] Aliran log masuk/daftar/keluar diuji sebenar dalam browser — **BELUM disahkan**
- [ ] `grep SERVICE_ROLE .next/static -r` kosong — **disahkan** ✅

**Langkah anda perlu buat (sekali sahaja, di komputer dengan Docker):**
```bash
git pull
pnpm install
cp .env.example .env.local
supabase start          # tarik & jalankan Docker (~5-10 minit kali pertama)
                         # — salin URL/anon key/service_role key yang dipaparkan
                         #   ke dalam .env.local (NEXT_PUBLIC_SUPABASE_URL,
                         #   NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY)
supabase db reset       # bina skema + seed
pnpm dev                # jalan di http://localhost:3000
pnpm test                # ujian RLS automatik patut jalan penuh (bukan dilangkau)
```
`.env.local` sengaja tidak di-commit (`.gitignore`) — `supabase start` akan papar nilai
URL/kunci di terminal untuk disalin. Selagi `supabase/config.toml` tidak diubah, nilai
ini tetap (kunci demo piawai Supabase untuk pembangunan tempatan).

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
