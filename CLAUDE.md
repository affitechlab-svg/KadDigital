# CLAUDE.md — Peraturan Build KadDigital
**BACA FAIL INI DAHULU SEBELUM MENULIS SEBARANG KOD.**

Projek: **KadDigital** — platform self-serve jemputan digital (kad scroll 4 halaman, tema dijana dari rujukan client, motion pembukaan sebagai pilihan produk).

---

## 0. Status projek

| Perkara | Status |
|---|---|
| Dokumentasi | ✅ Siap (`DEV HANDOFF DOCS/01`–`06`, `09-BUILD-PHASES`) |
| Fasa build (09-BUILD-PHASES) | ✅ Diberi — sedang dijalankan, satu fasa satu masa |
| Kod | 🔄 Dalam pembinaan — ikut fasa semasa dalam `PROGRESS.md` |

---

## 1. Urutan bacaan wajib

1. `CLAUDE.md` (fail ini)
2. `DEV HANDOFF DOCS/01-PRD.md` — skop, business rules, katalog pakej
3. `DEV HANDOFF DOCS/02-TECH-STACK.md` — teknologi & versi
4. `DEV HANDOFF DOCS/03-SITEMAP-ROUTING.md` — struktur URL
5. `DEV HANDOFF DOCS/04-DATA-MODEL.md` — skema DB + seed
6. `DEV HANDOFF DOCS/05-USER-FLOWS.md` — langkah pengguna
7. `DEV HANDOFF DOCS/06-ACCEPTANCE-CRITERIA.md` — checklist QA
8. `DEV HANDOFF DOCS/09-BUILD-PHASES.md` — susunan kerja (fasa semasa)

---

## 2. Hierarki kebenaran (bila dokumen bercanggah)

1. Arahan terus dari **pemilik projek** dalam sesi semasa
2. Fail `DEV HANDOFF DOCS/01`–`06` dan `09-BUILD-PHASES`
3. Andaian sementara ditulis di `SOALAN.md`, tanda `// TODO(putus):` dalam kod

**Jangan reka keputusan produk sendiri.** Kalau dokumen senyap tentang sesuatu, buka isu dalam `SOALAN.md` dan gunakan pilihan paling mudah sebagai sementara.

---

## 3. Peraturan build yang WAJIB diikut

### 3.1 Bahasa
- **Semua UI, label, mesej ralat, dan teks e-mel dalam Bahasa Melayu.** Kad awam menyokong toggle BM/EN.
- **Nama kod (variable, function, table, column) dalam Bahasa Melayu** juga — ikut skema dalam `04-DATA-MODEL.md` (`pesanan`, `tarikh_majlis`, `status_terbit`). Konsisten > cantik.
- Komen kod: BM ringkas dibenarkan.

### 3.2 Satu sumber render untuk kad
- Kad pada **skrin pratonton client** dan **halaman awam tetamu** MESTI komponen yang **sama** (`<KadJemputan />`), berbeza hanya melalui prop `mod="pratonton" | "awam"`.
- Dilarang menyalin JSX kad ke dua tempat.

### 3.3 Scroll kad
- Bekas guna `scroll-snap-type: y mandatory`; setiap seksyen `height: 100%` **bekas**, bukan `100vh`.
- Navigasi titik penunjuk guna `child.offsetTop` — **jangan** pekali px tetap.
- Indeks aktif dikira `Math.round(scrollTop / clientHeight)` dalam `onScroll` (throttle rAF).

### 3.4 Media & autoplay
- Muzik **tidak** autoplay. Butang main manual sahaja.
- Semua imej melalui `next/image` dengan `sizes` yang betul.
- Had saiz: imej rujukan 5MB/fail, gambar subjek 8MB/fail, MP3 5MB.

### 3.5 Keselamatan
- **RLS Supabase WAJIB aktif pada setiap jadual.**
- Client hanya boleh baca/tulis pesanan miliknya sendiri.
- Halaman awam `/i/[slug]` hanya boleh dilihat jika `status = 'terbit'` — guna RPC khas, bukan `select *`.
- **Status bayaran hanya boleh ditukar oleh callback server gateway yang disahkan signature.** Tiada endpoint client boleh set `status = 'dibayar'`.
- `SUPABASE_SERVICE_ROLE_KEY` hanya dalam route handler server. Jangan sekali-kali masuk bundle client.
- Rate-limit `POST /api/rsvp` dan `POST /api/palet`.

### 3.6 Kualiti kod
- TypeScript `strict: true`. **Tiada `any`.**
- Validasi setiap input dengan **Zod**, di server, walaupun sudah divalidasi di client.
- Server Components lalai; `"use client"` hanya bila perlu.
- Tiada `console.log` tertinggal dalam kod yang di-commit.
- Setiap fail komponen < 300 baris.
- Jalankan `pnpm lint && pnpm typecheck && pnpm build` sebelum lapor "siap".

### 3.7 Mobile-first
- Aliran client & kad tetamu direka **mobile dahulu** (390×844). Admin sahaja desktop (1280×840).
- Uji pada viewport 360px lebar sebelum lapor siap.

### 3.8 Design system (UI platform, bukan kad)
Nocturne — dark UI:
```css
--color-bg: #161826;
--color-surface: #232532;
--color-section: #262a60;
--color-section-glow: #353b80;
--color-section-ghost: #4c5397;
--color-accent: #9184d9;
--color-text: #e9e9ed;
--radius: 8px;
--font-body: "Inter", system-ui, sans-serif;
```
**Kad jemputan TIDAK terikat pada Nocturne.** Warna kad datang dari tema rujukan client, disuntik sebagai CSS variable pada bekas kad sahaja.

### 3.9 Larangan
- ❌ Jangan tambah pakej npm luar senarai dalam `02-TECH-STACK.md` tanpa tanya dahulu.
- ❌ Jangan tukar skema DB tanpa kemas kini `04-DATA-MODEL.md` dalam commit yang sama.
- ❌ Jangan bina ciri dalam senarai "Tangguh" (`01-PRD.md §7`).
- ❌ Jangan guna `localStorage` untuk data pesanan — semua state pesanan dalam DB.
- ❌ Jangan hardcode harga dalam komponen. Harga datang dari jadual `pakej`.

### 3.10 Fasa build
- **Satu fasa satu masa.** Fasa N tidak bermula sebelum semua checkpoint fasa N−1 ditanda dalam `09-BUILD-PHASES.md`.
- Kalau checkpoint gagal, baiki dalam fasa itu juga — jangan bawa hutang ke fasa depan.
- Jangan bina ciri dalam senarai Tangguh walau nampak mudah.

---

## 4. Log kerja (dua lapisan)

Projek ini guna **dua** fail log — kedua-dua WAJIB dikemas kini, tujuan berlainan:

1. **`WORK-LOG.md`** (root) — ringkas, bahasa mudah, untuk pemilik projek (bukan developer) baca cepat: apa diminta, apa dibuat, status.
2. **`DEV HANDOFF DOCS/CHANGELOG-AUTO.md`** — teknikal, satu entri per tugas, format tetap (fasa, fail disentuh, migrasi DB, env baru, apa diuji, TODO, beza dari dokumen).

**Selepas SETIAP tugas selesai:**
- Append entri baru ke `WORK-LOG.md`
- Append entri baru ke `DEV HANDOFF DOCS/CHANGELOG-AUTO.md` (format di bawah)
- Kemas kini `PROGRESS.md` (root) — tanda peringkat/fasa yang berubah status

**Sebelum mula sesi/kerja baru** — WAJIB baca `WORK-LOG.md` dan `PROGRESS.md` dahulu untuk faham konteks kerja sebelum ini.

Format entri `CHANGELOG-AUTO.md` (append sahaja, jangan tulis semula fail, jangan susun semula entri lama):

```markdown
## [YYYY-MM-DD HH:MM] — <Tajuk ringkas tugas>
- **Fasa:** <rujukan 09-BUILD-PHASES, atau "luar fasa">
- **Buat apa:** <2–4 baris, bahasa mudah>
- **Fail disentuh:** `path/a.ts`, `path/b.tsx`
- **Migrasi DB:** <nama fail migrasi, atau "tiada">
- **Env baru:** <nama var, atau "tiada">
- **Diuji:** <apa yang diuji dan hasilnya>
- **Belum siap / TODO:** <apa yang tergantung, atau "tiada">
- **Beza dari dokumen:** <jika terpaksa lari dari 01–06, terangkan sebab; kalau tidak, "tiada">
```

Peraturan tambahan:
1. Jika `CHANGELOG-AUTO.md` belum wujud, cipta dengan tajuk `# Log Pembangunan Automatik — KadDigital` kemudian entri pertama.
2. Satu tugas = satu entri. Jangan gabung beberapa tugas jadi satu entri.
3. Jika dokumen 01–06 diubah, entri wajib ada baris `- **Dokumen dikemas kini:** <fail>`.
4. Log ditulis **selepas** kerja siap dan diuji, bukan sebelum.
5. Jangan padam atau edit entri lama. Pembetulan ditulis sebagai entri baru.
6. Semua kerja dan commit dibuat pada branch yang ditetapkan untuk sesi berkenaan — jangan push ke branch lain tanpa kebenaran.

---

## 5. Bila terperangkap

Tulis dalam `DEV HANDOFF DOCS/SOALAN.md` dengan format:
```markdown
### S-001 — <soalan>
- **Konteks:** ...
- **Pilihan A / B / C:** ...
- **Cadangan saya:** ...
- **Andaian sementara yang saya guna:** ...
```
Kemudian teruskan dengan andaian sementara dan tandakan `// TODO(putus): S-001` dalam kod. Jangan berhenti kerja sepenuhnya.

---

## Struktur Dokumentasi

- `CLAUDE.md` — fail ini; peraturan tetap.
- `WORK-LOG.md` — log kronologi ringkas (bahasa mudah) setiap kerja.
- `PROGRESS.md` — senarai fasa/peringkat & status (siap / belum).
- `DEV HANDOFF DOCS/` — spesifikasi penuh (01–06, 09-BUILD-PHASES), `CHANGELOG-AUTO.md` (teknikal), `SOALAN.md` (bila terperangkap).
