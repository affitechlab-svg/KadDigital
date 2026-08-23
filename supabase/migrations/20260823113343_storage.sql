-- Storage buckets + polisi — 04-DATA-MODEL.md §4 (nota Storage)
-- Konvensyen laluan: `{pesanan_id}/{nama_fail}` untuk bucket peribadi supaya
-- pemilikan boleh disemak terus dari path tanpa jadual tambahan.

insert into storage.buckets (id, name, public, file_size_limit)
values
  ('rujukan', 'rujukan', false, 5242880),        -- 5MB/fail (CLAUDE.md §3.4)
  ('subjek', 'subjek', false, 8388608),           -- 8MB/fail
  ('muzik-pustaka', 'muzik-pustaka', true, 5242880), -- 5MB, awam (pustaka siap)
  ('awam', 'awam', true, 8388608);                -- aset kad dioptimum, awam

-- Helper: pesanan_id ialah segmen pertama laluan objek.
create function id_pesanan_dari_laluan(p_nama text) returns uuid as $$
  select (split_part(p_nama, '/', 1))::uuid;
$$ language sql immutable;

-- rujukan (peribadi) — pemilik pesanan sahaja ------------------------------
create policy rujukan_select_pemilik on storage.objects
  for select using (
    bucket_id = 'rujukan' and (
      eh_admin() or exists (
        select 1 from pesanan pe
        where pe.id = id_pesanan_dari_laluan(name) and pe.profil_id = auth.uid()
      )
    )
  );

create policy rujukan_insert_pemilik on storage.objects
  for insert with check (
    bucket_id = 'rujukan' and exists (
      select 1 from pesanan pe
      where pe.id = id_pesanan_dari_laluan(name) and pe.profil_id = auth.uid()
    )
  );

create policy rujukan_delete_pemilik on storage.objects
  for delete using (
    bucket_id = 'rujukan' and (
      eh_admin() or exists (
        select 1 from pesanan pe
        where pe.id = id_pesanan_dari_laluan(name) and pe.profil_id = auth.uid()
      )
    )
  );

-- subjek (peribadi) — pemilik pesanan sahaja -------------------------------
create policy subjek_select_pemilik on storage.objects
  for select using (
    bucket_id = 'subjek' and (
      eh_admin() or exists (
        select 1 from pesanan pe
        where pe.id = id_pesanan_dari_laluan(name) and pe.profil_id = auth.uid()
      )
    )
  );

create policy subjek_insert_pemilik on storage.objects
  for insert with check (
    bucket_id = 'subjek' and exists (
      select 1 from pesanan pe
      where pe.id = id_pesanan_dari_laluan(name) and pe.profil_id = auth.uid()
    )
  );

create policy subjek_delete_pemilik on storage.objects
  for delete using (
    bucket_id = 'subjek' and (
      eh_admin() or exists (
        select 1 from pesanan pe
        where pe.id = id_pesanan_dari_laluan(name) and pe.profil_id = auth.uid()
      )
    )
  );

-- muzik-pustaka (awam) — baca sesiapa, tulis admin sahaja ------------------
create policy muzik_pustaka_select_awam on storage.objects
  for select using (bucket_id = 'muzik-pustaka');

create policy muzik_pustaka_insert_admin on storage.objects
  for insert with check (bucket_id = 'muzik-pustaka' and eh_admin());

-- awam (aset kad dioptimum) — baca sesiapa, tulis oleh server sahaja -------
create policy awam_select_semua on storage.objects
  for select using (bucket_id = 'awam');
-- Tulis ke bucket `awam` dilakukan oleh route handler server (service role,
-- memintas RLS) semasa penerbitan kad — tiada polisi INSERT client.
