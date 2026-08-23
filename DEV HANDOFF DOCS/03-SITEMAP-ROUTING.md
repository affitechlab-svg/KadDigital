# 03 — Sitemap & Routing
**KadDigital** · semua laluan Bahasa Melayu

Legenda akses: **A** = awam · **C** = client log masuk · **P** = pemilik pesanan sahaja · **AD** = admin

---

## 1. Peta laman

```
/                                   A   Laman utama
├── /harga                          A   Pakej & harga
├── /contoh                         A   Contoh kad (demo /i/contoh-kahwin)
├── /soalan-lazim                   A
├── /terma  /privasi                A
├── /daftar                         A   Daftar akaun client
├── /masuk                          A   Log masuk
├── /lupa-kata-laluan               A
├── /tetapkan-kata-laluan           A   (dari pautan e-mel)
│
├── /buat                           C   Aliran cipta (mobile-first, 8 langkah)
│   ├── /buat/pakej                     C   Langkah 1 — pilih pakej → cipta pesanan draf
│   ├── /buat/[id]/maklumat             P   Langkah 2 — jenis acara, tajuk, tarikh, venue, atur cara, kata-kata
│   ├── /buat/[id]/rujukan              P   Langkah 3 — muat naik rujukan gaya + gambar subjek (skrin 04a)
│   ├── /buat/[id]/tema                 P   Langkah 4 — hasil bacaan: palet, mood, hiasan, huruf (skrin 04b)
│   ├── /buat/[id]/motion               P   Langkah 5 — sampul/tirai/bidai/larut/tersuai
│   ├── /buat/[id]/sentuhan             P   Langkah 6 — muzik, taburan, bahasa lalai
│   ├── /buat/[id]/pratonton            P   Langkah 7 — kad penuh (komponen sama dgn /i)
│   ├── /buat/[id]/bayar                P   Langkah 8 — pilih cara bayar → gateway
│   └── /buat/[id]/selesai              P   Pengesahan + pautan + share
│
├── /dashboard                      C   Senarai pesanan sendiri
│   ├── /dashboard/[id]                 P   Butiran satu pesanan
│   ├── /dashboard/[id]/edit            P   Edit maklumat asas (live)
│   ├── /dashboard/[id]/rsvp            P   Senarai RSVP + muat turun CSV
│   └── /dashboard/akaun                C   Nama, telefon, tukar kata laluan
│
├── /i/[slug]                       A   HALAMAN KAD AWAM (tetamu)
│
└── /admin                          AD  Dashboard admin (desktop)
    ├── /admin/pesanan                  AD  Senarai semua pesanan + carian + filter
    ├── /admin/pesanan/[id]             AD  Butiran + un-publish
    ├── /admin/motion                   AD  Pustaka motion (aktif/tidak aktif, pakej minimum)
    ├── /admin/motion/permintaan        AD  Gilir permintaan motion tersuai
    ├── /admin/client                   AD  Senarai client
    └── /admin/bayaran                  AD  Rekod transaksi
```

---

## 2. Jadual laluan penuh

| Laluan | Render | Akses | Nota |
|---|---|---|---|
| `/` | Static | A | CTA "Mula" → `/daftar` (atau `/buat/pakej` jika sudah masuk) |
| `/harga` | Static | A | Data dari jadual `pakej` (ISR 1 jam) |
| `/contoh` | Static | A | Pautan ke `/i/contoh-kahwin`, `/i/contoh-korporat` |
| `/daftar` `/masuk` | Client | A | Redirect ke `?seterusnya=` jika ada |
| `/buat/pakej` | Server | C | POST cipta pesanan → redirect `/buat/{id}/maklumat` |
| `/buat/[id]/*` | Server + Client | P | Middleware sahkan pemilik; jika bukan → 404 |
| `/buat/[id]/pratonton` | Server | P | `<KadJemputan mod="pratonton">` |
| `/buat/[id]/bayar` | Server | P | Jika `status != draf` → redirect `/dashboard/[id]` |
| `/buat/[id]/selesai` | Server | P | Jika `status = draf` → redirect balik ke bayar |
| `/dashboard` | Server | C | |
| `/i/[slug]` | Server, `revalidate 60` | A | `<KadJemputan mod="awam">` |
| `/admin/**` | Server | AD | Middleware sahkan `profil.peranan = 'admin'` |

---

## 3. Peraturan `/i/[slug]`

| Keadaan pesanan | Hasil |
|---|---|
| `terbit` & belum tamat tempoh | Render kad |
| `draf` atau `dibayar` (belum terbit) | 404 mesra: "Jemputan ini belum diterbitkan" |
| `ditarik` | 404 mesra: "Jemputan ini tidak lagi tersedia" |
| Tamat tempoh (`tarikh_tamat < now`) | Halaman: "Jemputan ini telah tamat tempoh" |
| Slug tidak wujud | 404 mesra + pautan ke laman utama |

Metadata: `og:title` = tajuk A & tajuk B · `og:description` = tarikh + venue · `og:image` = gambar utama atau kad OG dijana · `robots: noindex` (jemputan peribadi).

Parameter: `/i/[slug]?bahasa=en` menetapkan bahasa awal (jika pakej menyokong dwibahasa).

---

## 4. API (route handler)

| Kaedah & laluan | Akses | Fungsi |
|---|---|---|
| `POST /api/palet` | P | Terima id pesanan → baca imej rujukan dari Storage → pulang palet/mood/hiasan/huruf. Rate-limit + kira kuota `jana semula` |
| `POST /api/rsvp` | A | Body: slug, nama, bilangan, hadir, catatan. Zod + rate-limit + honeypot + semak kuota |
| `POST /api/bayaran/mula` | P | Cipta rekod `bayaran` + panggil gateway → pulang `urlBayar` |
| `POST /api/bayaran/callback` | Gateway | Sahkan signature → set `dibayar` → jana slug → `terbit` → hantar e-mel |
| `GET /api/pesanan/[id]/rsvp.csv` | P | Muat turun CSV |
| `POST /api/cron/kemas-status` | `CRON_SECRET` | Kerja berjadual |

---

## 5. Middleware

```
/buat/*        -> perlu sesi; jika tiada -> /masuk?seterusnya=<laluan>
/dashboard/*   -> perlu sesi
/admin/*       -> perlu sesi + profil.peranan = 'admin'; jika tidak -> 404
/i/*           -> tiada semakan sesi (awam)
```
Kebenaran **pemilik pesanan** disemak dalam page/route (bukan middleware) supaya RLS jadi lapisan kedua.

---

## 6. Pemetaan skrin design → laluan

| Skrin design | Laluan |
|---|---|
| 01 Laman utama | `/` |
| 02 Daftar / log masuk | `/daftar`, `/masuk` |
| 03 Pilih pakej | `/buat/pakej` |
| 05 Maklumat majlis | `/buat/[id]/maklumat` |
| 04a Muat naik rujukan & gambar | `/buat/[id]/rujukan` |
| 04b Hasil bacaan tema | `/buat/[id]/tema` |
| Motion (Kad-Scroll.html) | `/buat/[id]/motion` |
| Muzik / taburan / bahasa | `/buat/[id]/sentuhan` |
| 06/07 Pratonton | `/buat/[id]/pratonton` |
| 07/08 Bayaran | `/buat/[id]/bayar` |
| 08 Pengesahan & share | `/buat/[id]/selesai` |
| 09 Halaman jemputan | `/i/[slug]` |
| 10 Dashboard client | `/dashboard` |
| 11 Dashboard admin | `/admin/pesanan` |
| 12 (dahulu "urus template") | `/admin/motion` + `/admin/motion/permintaan` |
