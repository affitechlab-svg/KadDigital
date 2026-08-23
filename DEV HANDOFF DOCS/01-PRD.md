# 01 — PRD (Product Requirements Document)
**KadDigital** · v2 · Bahasa: Melayu

---

## 1. Ringkasan produk

KadDigital ialah platform **self-serve** di mana client boleh sendiri pilih pakej, muat naik **rujukan gaya** (gambar atau link), biarkan sistem menjana **tema** (warna, mood, hiasan, huruf), isi maklumat acara, pilih **motion pembukaan**, bayar online, dan terus mendapat **kad jemputan digital beranimasi** untuk dikongsi di WhatsApp/Instagram — tanpa tempahan manual dan tanpa menunggu designer.

**Perbezaan utama dari pesaing:** tiada katalog tema. Setiap kad unik kerana temanya dibaca dari rujukan client sendiri. Yang standard ialah **struktur** (scroll 4 halaman) dan **motion** (4 pembukaan siap).

---

## 2. Matlamat & metrik

| Matlamat | Metrik |
|---|---|
| Client boleh siap sendiri tanpa bantuan | ≥ 80% pesanan dibayar tanpa mesej WhatsApp ke admin |
| Cepat | Median masa daftar → bayar < 12 minit |
| Kad terbuka elok di telefon | Halaman awam LCP < 2.5s pada 4G |
| Bayar terus terbit | 100% pesanan `dibayar` menjadi `terbit` automatik dalam < 10 saat |

---

## 3. Pengguna & peranan

| Peranan | Siapa | Boleh buat |
|---|---|---|
| **Admin** | Fakhri (pemilik studio) | Lihat semua pesanan + status bayaran; carian & filter; un-publish pesanan bermasalah; urus pustaka motion (aktif/tidak aktif); urus gilir permintaan motion tersuai; lihat senarai client; lihat rekod bayaran |
| **Client** | Pengguna berbayar | Daftar/log masuk; pilih pakej; isi maklumat acara; muat naik rujukan & gambar; guna/laras/jana semula tema; pilih motion; pratonton; bayar; dapat & kongsi pautan; log masuk semula untuk edit maklumat asas dan lihat senarai RSVP |
| **Tetamu** | Penerima pautan | Buka `/i/<slug>` tanpa akaun; scroll 4 halaman; buka Waze/Google Maps; hantar RSVP; tukar bahasa BM/EN; main/matikan muzik |

---

## 4. Skop MVP (senarai ciri)

### 4.1 Akaun
- F-01 Daftar client (e-mel + kata laluan) & log masuk
- F-02 Lupa kata laluan (e-mel reset via Supabase Auth)
- F-03 Log masuk admin berasingan (peranan `admin` pada profil, bukan borang berlainan)

### 4.2 Cipta pesanan
- F-10 Pilih pakej (3 pakej, harga tetap) → cipta pesanan `status = draf`
- F-11 Pilih **jenis acara**: kahwin · korporat · pasukan · latihan · **tersuai** (client namakan sendiri)
- F-12 Borang maklumat acara: kicker, tajuk A, tajuk B (penyambung `&` / `—`), tarikh (hari, bulan, tarikh, tahun), masa, nama venue, alamat, link Waze, link Google Maps
- F-13 **Atur cara** — 3 baris (masa + aktiviti), boleh kurang
- F-14 **Kata-kata** — satu petikan/doa + nama penandatangan
- F-15 Muat naik **rujukan gaya**: sampai 4 imej atau link (Pinterest/Instagram); chip pilihan bacaan: *warna · hiasan · corak · gaya huruf*
- F-16 Muat naik **gambar subjek**: gambar utama (halaman 1), gambar sampingan (halaman 3), logo/monogram (kepala & sampul). Bentuk potongan: **gerbang · bulat · segi**. Toggle tunjuk/sembunyi pada kad
- F-17 **Bacaan rujukan** → hasilkan: palet 5 warna, ringkasan mood, senarai hiasan, pasangan huruf (tajuk + badan). Butang **Guna / Jana semula / Laras**
- F-18 Laras manual: tukar mana-mana 5 warna, tukar pasangan huruf, tukar hiasan
- F-19 Pilih **motion pembukaan**: Sampul · Tirai · Bidai · Larut. Pilihan **Motion tersuai** = client tulis huraian → `status = semakan`
- F-20 Pilih **muzik latar** dari pustaka, atau muat naik MP3 (pakej premium)
- F-21 Pilih **taburan latar**: tiada · kelopak bunga · hati gugur
- F-22 Pilih bahasa lalai kad (ms / en) — dwibahasa jika pakej membenarkan
- F-23 **Pratonton live** — komponen kad yang sama seperti halaman awam

### 4.3 Bayaran & terbitan
- F-30 Bayaran online: DuitNow QR · FPX · kad kredit/debit (melalui satu gateway)
- F-31 Callback gateway disahkan → `status = dibayar`
- F-32 Auto-jana **slug** unik (`salmah-osman`, `salmah-osman-2` jika bertindih) → `status = terbit`, tiada kelulusan manual
- F-33 Skrin pengesahan: pautan + butang **Salin**, **Share WhatsApp**, **Share Instagram**, **Buka kad saya**
- F-34 E-mel resit ringkas + pautan kad

### 4.4 Kad awam (tetamu)
- F-40 `/i/<slug>` — bekas scroll-snap, halaman 0 pembukaan + 4 halaman kandungan
- F-41 Titik penunjuk di tepi kanan mengikut kedudukan scroll
- F-42 Motion pembukaan; sentuh untuk buka; overlay hilang selepas animasi; butang **Ulang pembukaan**
- F-43 Butang **Waze** & **Google Maps** + tangkapan peta
- F-44 Borang **RSVP**: nama penuh, bilangan, hadir/tidak, catatan → simpan ke DB
- F-45 Butang **RSVP WhatsApp** (buka WhatsApp client) — kekal sebagai saluran kedua
- F-46 Toggle bahasa BM/EN
- F-47 Butang muzik (tiada autoplay), boleh matikan

### 4.5 Dashboard client
- F-50 Senarai pesanan sendiri + status (draf / dibayar / terbit / ditarik)
- F-51 Salin pautan, share
- F-52 Edit maklumat asas selepas terbit (tajuk, tarikh, venue, atur cara, kata-kata, peta) — perubahan **live serta-merta**
- F-53 Lihat & muat turun senarai RSVP (CSV)
- F-54 Sambung pesanan draf & bayar

### 4.6 Dashboard admin
- F-60 Senarai semua pesanan: client, e-mel, slug, pakej, tarikh acara, bayaran, terbit
- F-61 Kad statistik: jualan bulan ini, dah bayar, belum bayar, live sekarang
- F-62 Carian (nama, e-mel, slug) + filter (pakej, status)
- F-63 **Un-publish** pesanan → `status = ditarik` (pautan jadi 404 mesra)
- F-64 **Pustaka motion**: aktif/tidak aktif setiap motion, pakej minimum
- F-65 **Gilir permintaan motion tersuai**: lihat huraian, tanda `sedang dibuat` / `siap`, lampirkan motion
- F-66 Senarai client & senarai bayaran

---

## 5. Katalog pakej (business rules)

> Harga dan had disimpan dalam jadual `pakej`. **Jangan hardcode dalam komponen.**

| | **Simple** (`ringkas`) | **Signature** (`standard`) | **Luxury** (`premium`) |
|---|---|---|---|
| Harga | **RM30** | **RM40** | **RM55** |
| Halaman scroll | 3 (Utama · Tempat & masa · Peta & kehadiran) | 4 (+ Kata-kata) | 4 |
| Motion pembukaan | **Larut** sahaja | Sampul · Tirai · Bidai · Larut | Semua + **motion tersuai** |
| Rujukan gaya | 1 imej | 4 imej / link | 4 imej / link |
| Jana semula tema | 1 kali | 3 kali | 10 kali |
| Laras warna manual | ❌ | ✅ | ✅ |
| Gambar subjek | ❌ | Logo / monogram sahaja | Utama + sampingan + logo |
| Bentuk potongan gambar | — | Bulat · segi | Gerbang · bulat · segi |
| Atur cara | 3 baris | 3 baris | 6 baris |
| Muzik latar | ❌ | Pustaka | Pustaka + muat naik MP3 |
| Taburan latar | ❌ | ✅ | ✅ |
| Dwibahasa BM/EN | ❌ (satu bahasa) | ✅ | ✅ |
| Kuota RSVP | 100 | 300 | 1000 |
| Tempoh pautan aktif | 3 bulan dari terbit | 6 bulan | 12 bulan |

**Motion tersuai** — tambahan **RM60**, masa pusing **2 hari bekerja**. Semasa menunggu, kad tetap terbit menggunakan **Larut** sebagai pratonton sementara; `pesanan.motion_status = 'semakan'`.

### 5.1 Peraturan lain
- BR-01 Slug dijana dari tajuk A + tajuk B, huruf kecil, tanda sempang, tanpa simbol. Bertindih → tambah `-2`, `-3`.
- BR-02 Slug **tidak boleh** ditukar selepas terbit (pautan sudah diedar).
- BR-03 Naik taraf pakej dibenarkan (bayar beza harga). Turun taraf **tidak** dibenarkan.
- BR-04 Kuota RSVP penuh → borang tunjuk mesej "Kehadiran sudah ditutup", butang WhatsApp kekal.
- BR-05 Pautan tamat tempoh → halaman mesra "Jemputan ini telah tamat tempoh".
- BR-06 Pesanan `draf` yang tidak disentuh 30 hari → tanda `lapuk`, media dipadam (kerja cron).
- BR-07 Un-publish oleh admin tidak memulangkan wang; ia untuk kes kandungan bermasalah.
- BR-08 Satu akaun boleh ada banyak pesanan. Setiap pesanan dibayar berasingan.
- BR-09 Sistem **tidak** menyalin imej rujukan ke dalam kad — hanya warna, mood dan hiasan diambil.

---

## 6. Bacaan rujukan → tema (spesifikasi)

Output bacaan disimpan dalam `pesanan.tema` (jsonb):

```json
{
  "palet": ["#1b1230", "#3a2a5c", "#9184d9", "#e8d9b5", "#f5f2ec"],
  "mood": "Tenang, malam, berpendar",
  "hiasan": ["kekisi wajik halus", "pendar lembut"],
  "huruf": { "tajuk": "Great Vibes", "badan": "Cormorant Garamond" },
  "sumber": "auto | dilaras | fallback",
  "cubaan": 1
}
```

**Peraturan penjana (deterministik, tiada model luar diperlukan untuk MVP):**
1. Kecilkan imej ke 200px, kumpul warna dominan (k-means, k=5), susun ikut kecerahan.
2. Warna aksen = warna dengan **kroma tertinggi** yang nisbah kontrasnya ≥ 3:1 terhadap warna latar.
3. Mood dipilih dari jadual peraturan: purata kecerahan (gelap/terang) × purata ketepuan (pudar/berani) × hue dominan (panas/sejuk) → satu daripada 12 label mood siap tulis.
4. Hiasan dipetakan dari mood (contoh: *gelap + sejuk + pudar* → "kekisi wajik halus + pendar lembut").
5. Pasangan huruf dipetakan dari mood: Elegan (Marcellus/Cormorant), Klasik (Playfair/Lato), Tulisan tangan (Great Vibes/Lato), Lembut (Quicksand), Bersih (Inter).
6. Jika bacaan gagal (imej rosak, palet terlalu rata) → guna preset fallback dalaman dan tandakan `sumber: "fallback"`.

Link Pinterest/Instagram: MVP ambil imej **og:image** sahaja. Jika gagal, minta client muat naik imej.

---

## 7. Tangguh (BUKAN MVP — jangan bina)

Seating chart · QR check-in tetamu · WhatsApp broadcast reminder · peranan Staff/Freelancer · sokongan 2 majlis dalam satu kad (nikah + resepsi) · e-kad ucapan terima kasih pasca-majlis · analitik lawatan terperinci · pautan tersuai (domain sendiri) · buku tetamu bergambar · integrasi hadiah/duit salam · lebih 4 motion · app mobile native · kelulusan admin sebelum terbit.

---

## 8. Risiko

| Risiko | Mitigasi |
|---|---|
| Bacaan rujukan hasilkan tema hodoh | Butang Jana semula + Laras manual; fallback preset |
| Client kecewa tiada katalog | Skrin bacaan tunjuk pratonton kad penuh sebelum bayar |
| Callback gateway gagal | Job semak status setiap 5 minit untuk pesanan `draf` yang ada `bayaran.status = menunggu` |
| Spam RSVP | Rate-limit IP + honeypot + kuota pakej |
| Kad berat di 4G | Imej WebP, lazy-load halaman 2–4, motion guna CSS transform sahaja |
