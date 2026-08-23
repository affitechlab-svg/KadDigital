# 04 — Data Model / Schema
**KadDigital** · Supabase Postgres · nama jadual & medan dalam Bahasa Melayu

---

## 1. Gambaran hubungan

```
auth.users 1─1 profil
profil 1─n pesanan
pakej  1─n pesanan
pesanan 1─n media          (rujukan gaya, gambar subjek, muzik)
pesanan 1─n bayaran
pesanan 1─n rsvp
pesanan n─1 motion         (motion.kod)
pesanan 1─0..1 permintaan_motion
profil(admin) 1─n log_admin
```

---

## 2. Enum

```sql
create type peranan_t        as enum ('client','admin');
create type status_pesanan_t as enum ('draf','dibayar','terbit','ditarik','lapuk');
create type jenis_acara_t    as enum ('kahwin','korporat','pasukan','latihan','tersuai');
create type motion_status_t  as enum ('siap','semakan');
create type status_bayaran_t as enum ('menunggu','berjaya','gagal','dibatalkan');
create type jenis_media_t    as enum ('rujukan','gambar_utama','gambar_sampingan','logo','muzik');
create type bentuk_potong_t  as enum ('gerbang','bulat','segi');
create type taburan_t        as enum ('tiada','kelopak','hati');
```

---

## 3. Jadual

### 3.1 `profil`
| Medan | Jenis | Nota |
|---|---|---|
| `id` | uuid PK | = `auth.users.id` |
| `nama` | text not null | |
| `emel` | text not null unique | disalin dari auth |
| `telefon` | text | format MY, cth `+60123456789` |
| `peranan` | `peranan_t` default `'client'` | |
| `dicipta_pada` | timestamptz default now() | |

### 3.2 `pakej`
| Medan | Jenis | Nota |
|---|---|---|
| `kod` | text PK | `ringkas` / `standard` / `premium` |
| `nama_papar` | text | Simple / Signature / Luxury |
| `harga_sen` | int not null | 3000 / 4000 / 5500 |
| `susunan` | int | untuk paparan |
| `popular` | bool default false | badge POPULAR |
| `bil_halaman` | int | 3 atau 4 |
| `motion_dibenar` | text[] | cth `{larut}` |
| `motion_tersuai` | bool | |
| `had_rujukan` | int | 1 / 4 / 4 |
| `had_jana_semula` | int | 1 / 3 / 10 |
| `laras_manual` | bool | |
| `gambar_subjek` | text[] | `{}` / `{logo}` / `{utama,sampingan,logo}` |
| `bentuk_dibenar` | `bentuk_potong_t[]` | |
| `had_atur_cara` | int | 3 / 3 / 6 |
| `muzik` | text | `tiada` / `pustaka` / `pustaka_upload` |
| `taburan` | bool | |
| `dwibahasa` | bool | |
| `kuota_rsvp` | int | 100 / 300 / 1000 |
| `bulan_aktif` | int | 3 / 6 / 12 |
| `aktif` | bool default true | |

### 3.3 `motion` (pustaka)
| Medan | Jenis | Nota |
|---|---|---|
| `kod` | text PK | `sampul`,`tirai`,`bidai`,`larut` |
| `nama` | text | "Sampul — kepak terbuka" |
| `huraian` | text | |
| `pakej_minimum` | text FK→pakej.kod | |
| `aktif` | bool default true | admin boleh matikan |
| `susunan` | int | |

### 3.4 `pesanan` — jadual teras
| Medan | Jenis | Nota |
|---|---|---|
| `id` | uuid PK default gen_random_uuid() | |
| `no_rujukan` | text unique | `KD-0001` (jujukan) |
| `profil_id` | uuid FK→profil not null | |
| `pakej_kod` | text FK→pakej.kod not null | |
| **Acara** | | |
| `jenis_acara` | `jenis_acara_t` not null default `'kahwin'` | |
| `jenis_tersuai` | text | diisi bila `jenis_acara='tersuai'` |
| `kicker` | text | cth `WALIMATULURUS` |
| `tajuk_a` | text not null | |
| `tajuk_b` | text | |
| `penyambung` | text default '&' | `&` atau `—` |
| **Tarikh** | | |
| `tarikh_majlis` | date not null | sumber kebenaran |
| `masa_majlis` | time | |
| `masa_teks` | text | cth `11:00 PAGI` (paparan) |
| **Tempat** | | |
| `venue_nama` | text | |
| `venue_alamat` | text | |
| `pautan_waze` | text | |
| `pautan_maps` | text | |
| `atur_cara` | jsonb default '[]' | `[["11:00","Ketibaan tetamu"], ...]` |
| **Kata-kata** | | |
| `kata_teks` | text | |
| `kata_oleh` | text | |
| **Tema** | | |
| `rujukan_baca` | text[] default `{warna,hiasan,huruf}` | chip pilihan bacaan |
| `tema` | jsonb | palet, mood, hiasan, huruf, sumber, cubaan (lihat 01-PRD §6) |
| `jana_semula_dipakai` | int default 0 | |
| **Gambar** | | |
| `bentuk_potong` | `bentuk_potong_t` default `'gerbang'` | |
| `tunjuk_gambar_utama` | bool default true | |
| **Motion & sentuhan** | | |
| `motion_kod` | text FK→motion.kod default `'larut'` | |
| `motion_status` | `motion_status_t` default `'siap'` | |
| `taburan` | `taburan_t` default `'tiada'` | |
| `muzik_kod` | text | id trek pustaka, atau null |
| `bahasa_lalai` | text default `'ms'` | |
| `dwibahasa` | bool default false | |
| **Status & pautan** | | |
| `status` | `status_pesanan_t` default `'draf'` | |
| `slug` | text unique | dijana selepas bayar |
| `terbit_pada` | timestamptz | |
| `tarikh_tamat` | timestamptz | `terbit_pada + pakej.bulan_aktif` |
| `dicipta_pada` | timestamptz default now() | |
| `dikemas_pada` | timestamptz default now() | trigger |

**Indeks:** `slug` (unique), `profil_id`, `status`, `tarikh_majlis`, `dicipta_pada desc`.

**Kekangan:**
- `jenis_acara='tersuai'` ⇒ `jenis_tersuai` tidak null
- `status='terbit'` ⇒ `slug` tidak null
- `jsonb_array_length(atur_cara) <= pakej.had_atur_cara` (disemak di aplikasi + trigger)

### 3.5 `media`
| Medan | Jenis |
|---|---|
| `id` uuid PK · `pesanan_id` uuid FK cascade · `jenis` `jenis_media_t` · `laluan` text (path Storage) · `nama_asal` text · `saiz_bait` int · `mime` text · `susunan` int · `dicipta_pada` timestamptz |

Untuk rujukan berbentuk link (Pinterest/IG): `jenis='rujukan'`, `laluan` = URL, `mime='text/uri-list'`.

### 3.6 `bayaran`
| Medan | Jenis |
|---|---|
| `id` uuid PK · `pesanan_id` uuid FK · `gateway` text default `'toyyibpay'` · `rujukan_gateway` text unique · `jumlah_sen` int · `kaedah` text (`duitnow`/`fpx`/`kad`) · `status` `status_bayaran_t` default `menunggu` · `mesej` text · `payload` jsonb · `dicipta_pada` · `disahkan_pada` |

### 3.7 `rsvp`
| Medan | Jenis |
|---|---|
| `id` uuid PK · `pesanan_id` uuid FK cascade · `nama` text not null · `bilangan` int default 1 check (1..20) · `hadir` bool not null · `catatan` text · `ip_hash` text · `dicipta_pada` timestamptz |

Indeks: `(pesanan_id, dicipta_pada desc)`.

### 3.8 `permintaan_motion`
| Medan | Jenis |
|---|---|
| `id` uuid PK · `pesanan_id` uuid FK · `huraian` text not null · `status` text default `'baru'` (`baru`/`sedang_dibuat`/`siap`/`ditolak`) · `nota_admin` text · `motion_kod_hasil` text · `dicipta_pada` · `siap_pada` |

### 3.9 `log_admin`
| Medan | Jenis |
|---|---|
| `id` uuid PK · `admin_id` uuid FK→profil · `tindakan` text (`un_publish`, `motion_off`, …) · `sasaran_jenis` text · `sasaran_id` text · `nota` text · `dicipta_pada` |

---

## 4. RLS (ringkas — wajib)

| Jadual | Polisi |
|---|---|
| `profil` | SELECT/UPDATE: `id = auth.uid()`. Admin: semua. |
| `pakej`, `motion` | SELECT: awam (baca sahaja). Tulis: admin. |
| `pesanan` | SELECT/INSERT/UPDATE: `profil_id = auth.uid()`. Admin: semua. **Awam:** tiada akses langsung — kad awam dibaca melalui RPC `dapatkan_kad(slug)` (SECURITY DEFINER) yang hanya memulangkan pesanan `status='terbit'` dan belum tamat tempoh, tanpa medan sensitif. |
| `media` | Ikut pemilik `pesanan`. |
| `bayaran` | SELECT: pemilik. INSERT/UPDATE: service role sahaja. |
| `rsvp` | INSERT: awam melalui RPC `hantar_rsvp(slug, …)` yang menyemak kuota & status terbit. SELECT: pemilik pesanan + admin sahaja. |
| `permintaan_motion` | SELECT/INSERT: pemilik. UPDATE: admin. |
| `log_admin` | Admin sahaja. |

**Storage:** bucket `rujukan` & `subjek` **peribadi**; kad awam guna signed URL (TTL panjang) atau salinan awam yang dioptimum ke bucket `awam` semasa terbit. Bucket `muzik-pustaka` awam.

---

## 5. Trigger & fungsi

| Nama | Kerja |
|---|---|
| `set_dikemas_pada()` | BEFORE UPDATE pada `pesanan` |
| `jana_no_rujukan()` | BEFORE INSERT — `KD-` + jujukan 4 digit |
| `jana_slug(tajuk_a, tajuk_b)` | Slugify + semak unik + tambah `-2`, `-3` |
| `terbitkan_pesanan(pesanan_id)` | Dipanggil callback bayaran: set slug, `status='terbit'`, `terbit_pada`, `tarikh_tamat` |
| `dapatkan_kad(slug)` | SECURITY DEFINER — data kad untuk tetamu |
| `hantar_rsvp(...)` | SECURITY DEFINER — semak terbit + kuota, insert |

---

## 6. Seed data

### 6.1 `pakej`
```sql
insert into pakej (kod,nama_papar,harga_sen,susunan,popular,bil_halaman,motion_dibenar,motion_tersuai,
  had_rujukan,had_jana_semula,laras_manual,gambar_subjek,bentuk_dibenar,had_atur_cara,muzik,taburan,
  dwibahasa,kuota_rsvp,bulan_aktif) values
('ringkas','Simple',3000,1,false,3,'{larut}',false,1,1,false,'{}','{}',3,'tiada',false,false,100,3),
('standard','Signature',4000,2,true,4,'{sampul,tirai,bidai,larut}',false,4,3,true,'{logo}','{bulat,segi}',3,'pustaka',true,true,300,6),
('premium','Luxury',5500,3,false,4,'{sampul,tirai,bidai,larut}',true,4,10,true,'{utama,sampingan,logo}','{gerbang,bulat,segi}',6,'pustaka_upload',true,true,1000,12);
```

### 6.2 `motion`
```sql
insert into motion (kod,nama,huraian,pakej_minimum,aktif,susunan) values
('sampul','Sampul — kepak terbuka','Penutup terlipat ke belakang, kad naik keluar.','standard',true,1),
('tirai','Tirai — belah dua','Dua panel meluncur ke tepi, kad terdedah di tengah.','standard',true,2),
('bidai','Bidai — angkat ke atas','Bidai terangkat ke atas mendedahkan kad.','standard',true,3),
('larut','Larut — pudar & zum','Tanpa sampul: kad membesar keluar dari pendar cahaya.','ringkas',true,4);
```

### 6.3 Pustaka muzik (metadata sahaja; fail dalam bucket `muzik-pustaka`)
```
nasyid-sepohon-kayu   Nasyid — Sepohon Kayu     2:14
piano-lembut          Piano lembut              3:02
gambus-rebana         Gambus & rebana           2:48
```

### 6.4 Pesanan contoh (untuk `/contoh`)
Dua pesanan `status='terbit'` milik akaun demo:
- `contoh-kahwin` — jenis `kahwin`, kicker `WALIMATULURUS`, "Nurul Aina" & "Ahmad Firdaus", Sabtu 15 November 2026, 11:00 pagi, Dewan Seri Melati, Kajang. Atur cara: 11:00 Ketibaan tetamu · 12:30 Ketibaan pengantin · 16:00 Majlis berakhir. Motion `sampul`.
- `contoh-korporat` — jenis `korporat`, kicker `MAJLIS PELANCARAN`, "Sinar Teknologi" — "Anugerah Tahunan", Khamis 8 Oktober 2026, 9:00 pagi, Grand Ballroom Level 12, Menara Sinar KL. Atur cara: 09:00 Pendaftaran · 10:15 Ucapan pembukaan · 13:00 Jamuan & networking. Motion `tirai`.

### 6.5 Akaun demo
`admin@kaddigital.my` (peranan `admin`) dan `demo@kaddigital.my` (client). Kata laluan hanya dalam `.env.local` pembangunan — **jangan commit**.
