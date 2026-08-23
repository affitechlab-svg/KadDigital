-- supabase/seed.sql — 04-DATA-MODEL.md §6
-- Dijalankan oleh `supabase db reset` selepas semua migrasi. Data pembangunan
-- tempatan sahaja — JANGAN jalankan fail ini terhadap projek production.

-- 6.1 pakej ---------------------------------------------------------------
insert into pakej (kod, nama_papar, harga_sen, susunan, popular, bil_halaman, motion_dibenar, motion_tersuai,
  had_rujukan, had_jana_semula, laras_manual, gambar_subjek, bentuk_dibenar, had_atur_cara, muzik, taburan,
  dwibahasa, kuota_rsvp, bulan_aktif) values
('ringkas', 'Simple', 3000, 1, false, 3, '{larut}', false, 1, 1, false, '{}', '{}', 3, 'tiada', false, false, 100, 3),
('standard', 'Signature', 4000, 2, true, 4, '{sampul,tirai,bidai,larut}', false, 4, 3, true, '{logo}', '{bulat,segi}', 3, 'pustaka', true, true, 300, 6),
('premium', 'Luxury', 5500, 3, false, 4, '{sampul,tirai,bidai,larut}', true, 4, 10, true, '{utama,sampingan,logo}', '{gerbang,bulat,segi}', 6, 'pustaka_upload', true, true, 1000, 12);

-- 6.2 motion ----------------------------------------------------------------
insert into motion (kod, nama, huraian, pakej_minimum, aktif, susunan) values
('sampul', 'Sampul — kepak terbuka', 'Penutup terlipat ke belakang, kad naik keluar.', 'standard', true, 1),
('tirai', 'Tirai — belah dua', 'Dua panel meluncur ke tepi, kad terdedah di tengah.', 'standard', true, 2),
('bidai', 'Bidai — angkat ke atas', 'Bidai terangkat ke atas mendedahkan kad.', 'standard', true, 3),
('larut', 'Larut — pudar & zum', 'Tanpa sampul: kad membesar keluar dari pendar cahaya.', 'ringkas', true, 4);

-- 6.3 Pustaka muzik ----------------------------------------------------------
-- Metadata sahaja (§6.3) — tiada jadual DB berasingan untuk pustaka muzik
-- dalam skema (04-DATA-MODEL.md §3); `pesanan.muzik_kod` cuma simpan kod
-- teks. Fail sebenar (nasyid-sepohon-kayu, piano-lembut, gambus-rebana)
-- dimuat naik terus ke bucket Storage `muzik-pustaka` semasa Fasa 6/9 —
-- tidak boleh dibuat melalui migrasi SQL.

-- 6.5 Akaun demo (LOCAL SAHAJA — jangan jalankan pada production) -----------
-- Kata laluan dev tetap 'kaddigital123' supaya login tempatan boleh diuji
-- terus lepas `supabase db reset`, tanpa perlu daftar manual setiap kali.
-- // TODO(putus): S-002 — sila rujuk SOALAN.md.
insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, created_at, updated_at,
  raw_app_meta_data, raw_user_meta_data, is_super_admin, confirmation_token
) values
  ('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000001',
   'authenticated', 'authenticated', 'admin@kaddigital.my', crypt('kaddigital123', gen_salt('bf')),
   now(), now(), now(), '{"provider":"email","providers":["email"]}', '{"nama":"Admin KadDigital"}', false, ''),
  ('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000002',
   'authenticated', 'authenticated', 'demo@kaddigital.my', crypt('kaddigital123', gen_salt('bf')),
   now(), now(), now(), '{"provider":"email","providers":["email"]}', '{"nama":"Demo Client"}', false, '')
on conflict (id) do nothing;

-- Trigger `tangani_pengguna_baharu` auto-cipta baris `profil`; naikkan satu ke admin.
update profil set peranan = 'admin' where id = '00000000-0000-0000-0000-000000000001';

-- 6.4 Pesanan contoh (untuk /contoh) -----------------------------------------
insert into pesanan (
  profil_id, pakej_kod, jenis_acara, kicker, tajuk_a, tajuk_b, penyambung,
  tarikh_majlis, masa_teks, venue_nama, venue_alamat, pautan_waze, pautan_maps,
  atur_cara, kata_teks, kata_oleh, tema, motion_kod, taburan,
  status, slug, terbit_pada, tarikh_tamat
) values (
  '00000000-0000-0000-0000-000000000002', 'standard', 'kahwin', 'WALIMATULURUS',
  'Nurul Aina', 'Ahmad Firdaus', '&',
  '2026-11-15', '11:00 PAGI', 'Dewan Seri Melati', 'Jalan Reko, 43000 Kajang, Selangor',
  'https://waze.com/ul?q=Dewan%20Seri%20Melati%20Kajang', 'https://maps.google.com/?q=Dewan+Seri+Melati+Kajang',
  '[["11:00","Ketibaan tetamu"],["12:30","Ketibaan pengantin"],["16:00","Majlis berakhir"]]',
  'Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya.',
  'Ar-Rum, 30:21',
  '{"palet":["#1b1230","#3a2a5c","#9184d9","#e8d9b5","#f5f2ec"],"mood":"Tenang, malam, berpendar","hiasan":["kekisi wajik halus","pendar lembut"],"huruf":{"tajuk":"Great Vibes","badan":"Cormorant Garamond"},"sumber":"auto","cubaan":1}',
  'sampul', 'kelopak',
  'terbit', 'contoh-kahwin', now(), now() + interval '6 months'
),
(
  '00000000-0000-0000-0000-000000000002', 'premium', 'korporat', 'MAJLIS PELANCARAN',
  'Sinar Teknologi', 'Anugerah Tahunan', '—',
  '2026-10-08', '9:00 PAGI', 'Grand Ballroom Level 12', 'Menara Sinar, Kuala Lumpur',
  'https://waze.com/ul?q=Menara%20Sinar%20KL', 'https://maps.google.com/?q=Menara+Sinar+KL',
  '[["09:00","Pendaftaran"],["10:15","Ucapan pembukaan"],["13:00","Jamuan & networking"]]',
  null, null,
  '{"palet":["#0f1420","#1c2438","#4f7cff","#c7cede","#f4f6fb"],"mood":"Bersih, profesional, terang","hiasan":["garis geometri halus"],"huruf":{"tajuk":"Inter","badan":"Inter"},"sumber":"auto","cubaan":1}',
  'tirai', 'tiada',
  'terbit', 'contoh-korporat', now(), now() + interval '12 months'
);
