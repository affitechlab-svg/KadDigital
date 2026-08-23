-- RLS — WAJIB aktif pada SETIAP jadual (CLAUDE.md §3.5 / 04-DATA-MODEL.md §4)

-- Helper: semak peranan admin tanpa rekursi RLS pada `profil` sendiri.
create function eh_admin() returns boolean as $$
  select exists (
    select 1 from profil where id = auth.uid() and peranan = 'admin'
  );
$$ language sql security definer stable set search_path = public;

-- profil ---------------------------------------------------------------
alter table profil enable row level security;

create policy profil_select on profil
  for select using (id = auth.uid() or eh_admin());

create policy profil_update on profil
  for update using (id = auth.uid() or eh_admin());
-- Tiada polisi INSERT untuk client — baris dicipta oleh trigger
-- `tangani_pengguna_baharu` (SECURITY DEFINER, memintas RLS).

-- pakej — baca awam, tulis admin sahaja -----------------------------------
alter table pakej enable row level security;

create policy pakej_select on pakej
  for select using (true);

create policy pakej_insert_admin on pakej
  for insert with check (eh_admin());

create policy pakej_update_admin on pakej
  for update using (eh_admin());

create policy pakej_delete_admin on pakej
  for delete using (eh_admin());

-- motion — baca awam, tulis admin sahaja -----------------------------------
alter table motion enable row level security;

create policy motion_select on motion
  for select using (true);

create policy motion_insert_admin on motion
  for insert with check (eh_admin());

create policy motion_update_admin on motion
  for update using (eh_admin());

create policy motion_delete_admin on motion
  for delete using (eh_admin());

-- pesanan — pemilik sahaja; awam guna RPC dapatkan_kad() sahaja -----------
alter table pesanan enable row level security;

create policy pesanan_select on pesanan
  for select using (profil_id = auth.uid() or eh_admin());

create policy pesanan_insert on pesanan
  for insert with check (profil_id = auth.uid());

create policy pesanan_update on pesanan
  for update using (profil_id = auth.uid() or eh_admin());

-- Sekatan peringkat LAJUR — RLS baris sahaja tidak cukup untuk halang client
-- menukar `status`/`slug`/tarikh terbit terus (CLAUDE.md §3.5, AC-8). Nota:
-- REVOKE UPDATE(lajur) sahaja TIDAK cukup kerana grant table-wide (dibuat
-- semasa bootstrap projek Supabase) tetap membenarkan semua lajur — mesti
-- REVOKE table-wide dahulu, baru GRANT balik hanya lajur yang client boleh
-- edit sendiri. Lajur sensitif (status/slug/tarikh terbit/no_rujukan) hanya
-- boleh ditukar melalui `terbitkan_pesanan()` (SECURITY DEFINER, dipanggil
-- service_role dari callback bayaran sahaja).
revoke update on pesanan from authenticated, anon;
grant update (
  jenis_acara, jenis_tersuai, kicker, tajuk_a, tajuk_b, penyambung,
  tarikh_majlis, masa_majlis, masa_teks,
  venue_nama, venue_alamat, pautan_waze, pautan_maps, atur_cara,
  kata_teks, kata_oleh,
  rujukan_baca, tema, jana_semula_dipakai,
  bentuk_potong, tunjuk_gambar_utama,
  motion_kod, motion_status, taburan, muzik_kod, bahasa_lalai, dwibahasa
) on pesanan to authenticated;

-- media — ikut pemilik pesanan --------------------------------------------
alter table media enable row level security;

create policy media_select on media
  for select using (
    eh_admin() or exists (
      select 1 from pesanan pe where pe.id = media.pesanan_id and pe.profil_id = auth.uid()
    )
  );

create policy media_insert on media
  for insert with check (
    exists (
      select 1 from pesanan pe where pe.id = media.pesanan_id and pe.profil_id = auth.uid()
    )
  );

create policy media_delete on media
  for delete using (
    eh_admin() or exists (
      select 1 from pesanan pe where pe.id = media.pesanan_id and pe.profil_id = auth.uid()
    )
  );

-- bayaran — SELECT pemilik; INSERT/UPDATE service role sahaja -------------
alter table bayaran enable row level security;

create policy bayaran_select on bayaran
  for select using (
    eh_admin() or exists (
      select 1 from pesanan pe where pe.id = bayaran.pesanan_id and pe.profil_id = auth.uid()
    )
  );
-- Tiada polisi INSERT/UPDATE untuk anon/authenticated — hanya service_role
-- (memintas RLS) boleh tulis, dipanggil dari route handler server sahaja.

-- rsvp — INSERT hanya via RPC hantar_rsvp(); SELECT pemilik + admin -------
alter table rsvp enable row level security;

create policy rsvp_select on rsvp
  for select using (
    eh_admin() or exists (
      select 1 from pesanan pe where pe.id = rsvp.pesanan_id and pe.profil_id = auth.uid()
    )
  );
-- Tiada polisi INSERT langsung — hantar_rsvp() SECURITY DEFINER memintas RLS
-- selepas semak status terbit + kuota (BR-04).

-- permintaan_motion — SELECT/INSERT pemilik; UPDATE admin -----------------
alter table permintaan_motion enable row level security;

create policy permintaan_motion_select on permintaan_motion
  for select using (
    eh_admin() or exists (
      select 1 from pesanan pe where pe.id = permintaan_motion.pesanan_id and pe.profil_id = auth.uid()
    )
  );

create policy permintaan_motion_insert on permintaan_motion
  for insert with check (
    exists (
      select 1 from pesanan pe where pe.id = permintaan_motion.pesanan_id and pe.profil_id = auth.uid()
    )
  );

create policy permintaan_motion_update_admin on permintaan_motion
  for update using (eh_admin());

-- log_admin — admin sahaja ---------------------------------------------
alter table log_admin enable row level security;

create policy log_admin_select_admin on log_admin
  for select using (eh_admin());

create policy log_admin_insert_admin on log_admin
  for insert with check (eh_admin());
