# 02 — Tech Stack
**KadDigital** · Next.js + Tailwind + Supabase + Vercel

---

## 1. Ringkasan

| Lapisan | Pilihan | Sebab |
|---|---|---|
| Framework | **Next.js 15 (App Router)** + TypeScript strict | SSR untuk kad awam (SEO + LCP), route handler untuk callback bayaran |
| Styling | **Tailwind CSS v4** | Pantas, dan tema kad disuntik melalui CSS variable |
| Animasi | **CSS transform/opacity** + `framer-motion` untuk motion pembukaan sahaja | Motion mesti lancar di telefon murah |
| Pangkalan data | **Supabase Postgres** | RLS, mudah untuk satu orang urus |
| Auth | **Supabase Auth** (e-mel + kata laluan) | Termasuk reset kata laluan |
| Storan fail | **Supabase Storage** (bucket `rujukan`, `subjek`, `muzik`) | Berdekatan dengan DB & RLS |
| Hosting | **Vercel** | Edge, preview deploy, cron |
| Bayaran | **ToyyibPay** (FPX + DuitNow QR) — melalui adapter | Paling murah untuk MYR kecil; adapter supaya boleh tukar |
| E-mel | **Resend** | Resit + reset kata laluan |
| Validasi | **Zod** | Satu skema, guna di client & server |
| Borang | **react-hook-form** + `@hookform/resolvers/zod` | |
| Warna/imej | **sharp** (server) + **colorthief**/k-means sendiri, **culori** untuk OKLCH & kontras | Penjana palet |
| Ikon | **lucide-react** | |
| Uji | **Vitest** (unit) + **Playwright** (E2E aliran utama) | |

---

## 2. Versi & pakej dibenarkan

```
next@15.x          react@19.x        typescript@5.x
tailwindcss@4.x    framer-motion@11.x
@supabase/supabase-js@2.x   @supabase/ssr@0.5.x
zod@3.x            react-hook-form@7.x   @hookform/resolvers@3.x
sharp@0.33.x       culori@4.x        lucide-react
resend@4.x         nanoid@5.x        slugify@1.x
vitest@2.x         @playwright/test@1.x
```

**Sebarang pakej di luar senarai ini perlu kelulusan dahulu** (lihat `CLAUDE.md §4.9`).

---

## 3. Struktur folder

```
/app
  /(awam)                 -> laman utama, harga, contoh
  /(auth)/masuk /daftar /lupa-kata-laluan
  /(client)/buat/...      -> aliran cipta pesanan
  /(client)/dashboard/...
  /(admin)/admin/...
  /i/[slug]/page.tsx      -> kad awam (SSR)
  /api/palet/route.ts
  /api/rsvp/route.ts
  /api/bayaran/mula/route.ts
  /api/bayaran/callback/route.ts
  /api/cron/kemas-status/route.ts
/komponen
  /kad                    -> KadJemputan + 5 seksyen + motion   <-- SATU SUMBER RENDER
  /ui                     -> butang, input, kad, chip (Nocturne)
  /borang
/lib
  /supabase               -> pelanggan browser & server
  /tema                   -> penjana palet, peta mood, peta huruf
  /bayaran                -> adapter gateway (antaramuka + toyyibpay)
  /skema                  -> skema Zod
  /util
/supabase/migrations      -> SQL bernombor
/supabase/seed.sql
```

---

## 4. Komponen kad — satu sumber render

```
<KadJemputan pesanan={p} tema={t} mod="pratonton" | "awam" />
  ├─ <Pembukaan motion="sampul|tirai|bidai|larut" />   (halaman 0)
  ├─ <HalamanUtama />        (kicker, gambar utama, tajuk, tarikh)
  ├─ <HalamanTempat />       (venue, alamat, atur cara)
  ├─ <HalamanKataKata />     (petikan + penandatangan)   [pakej standard+]
  └─ <HalamanPeta />         (peta, Waze, Maps, borang RSVP)
```
`mod="pratonton"` mematikan penghantaran RSVP dan menunjukkan bar alat client. Tiada perbezaan visual lain.

---

## 5. Suntikan tema

Tema **tidak** ditulis ke Tailwind config. Ia disuntik sebagai inline style pada bekas kad:

```tsx
<div className="kad" style={{
  "--kad-latar": t.palet[0],
  "--kad-teks": t.palet[4],
  "--kad-aksen": t.palet[2],
  "--kad-huruf-tajuk": t.huruf.tajuk,
  "--kad-huruf-badan": t.huruf.badan,
} as React.CSSProperties}>
```
Font tajuk dimuatkan dinamik melalui `next/font/google` dengan senarai tetap (5 pasangan sahaja — jangan muat font sewenang-wenangnya).

---

## 6. Pembolehubah persekitaran

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=        # server sahaja
NEXT_PUBLIC_SITE_URL=https://kaddigital.my
TOYYIBPAY_SECRET_KEY=
TOYYIBPAY_CATEGORY_CODE=
TOYYIBPAY_CALLBACK_SECRET=
RESEND_API_KEY=
CRON_SECRET=
```

---

## 7. Adapter bayaran

```ts
export interface GatewayBayaran {
  mulaBayaran(input: { pesananId: string; jumlahSen: number; emel: string; nama: string }):
    Promise<{ rujukanGateway: string; urlBayar: string }>;
  sahkanCallback(req: Request): Promise<{ rujukanGateway: string; berjaya: boolean; jumlahSen: number }>;
}
```
Semua kod aplikasi bercakap dengan antaramuka ini sahaja. Tukar gateway = tulis satu fail baru.

---

## 8. Prestasi (belanjawan)

- Halaman awam `/i/[slug]`: JS awal < 120KB gzip; LCP < 2.5s pada 4G
- Halaman 2–4 kandungan dirender SSR tetapi imejnya `loading="lazy"`
- Motion pembukaan guna `transform` + `opacity` sahaja (tiada layout thrash)
- `revalidate` kad awam = 60s; edit dari dashboard memanggil `revalidatePath('/i/'+slug)`

---

## 9. Cron (Vercel)

| Jadual | Kerja |
|---|---|
| `*/5 * * * *` | Semak semula pesanan yang bayarannya `menunggu` > 5 minit |
| `0 3 * * *` | Tanda pesanan draf lapuk (30 hari) + padam medianya; tanda pautan tamat tempoh |
