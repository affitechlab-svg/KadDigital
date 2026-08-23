-- Fungsi & trigger — 04-DATA-MODEL.md §5

-- set_dikemas_pada() ---------------------------------------------------
create function set_dikemas_pada() returns trigger as $$
begin
  new.dikemas_pada = now();
  return new;
end;
$$ language plpgsql;

create trigger pesanan_set_dikemas_pada
  before update on pesanan
  for each row execute function set_dikemas_pada();

-- jana_no_rujukan() -----------------------------------------------------
create function jana_no_rujukan() returns trigger as $$
begin
  if new.no_rujukan is null then
    new.no_rujukan := 'KD-' || lpad(nextval('no_rujukan_seq')::text, 4, '0');
  end if;
  return new;
end;
$$ language plpgsql;

create trigger pesanan_jana_no_rujukan
  before insert on pesanan
  for each row execute function jana_no_rujukan();

-- semak_had_atur_cara() — sokongan BR (jsonb_array_length <= pakej.had_atur_cara)
create function semak_had_atur_cara() returns trigger as $$
declare
  v_had int;
begin
  select had_atur_cara into v_had from pakej where kod = new.pakej_kod;
  if v_had is not null and jsonb_array_length(new.atur_cara) > v_had then
    raise exception 'Atur cara melebihi had pakej (maksimum %)', v_had;
  end if;
  return new;
end;
$$ language plpgsql;

create trigger pesanan_semak_had_atur_cara
  before insert or update on pesanan
  for each row execute function semak_had_atur_cara();

-- jana_slug(tajuk_a, tajuk_b) --------------------------------------------
-- Slugify + semak unik + tambah -2, -3 (BR-01).
create function jana_slug(p_tajuk_a text, p_tajuk_b text) returns text as $$
declare
  v_dasar text;
  v_calon text;
  v_kaunter int := 1;
begin
  v_dasar := lower(coalesce(p_tajuk_a, '') || case when p_tajuk_b is not null then '-' || p_tajuk_b else '' end);
  v_dasar := regexp_replace(v_dasar, '[^a-z0-9]+', '-', 'g');
  v_dasar := trim(both '-' from v_dasar);
  if v_dasar = '' then
    v_dasar := 'kad';
  end if;

  v_calon := v_dasar;
  while exists (select 1 from pesanan where slug = v_calon) loop
    v_kaunter := v_kaunter + 1;
    v_calon := v_dasar || '-' || v_kaunter;
  end loop;

  return v_calon;
end;
$$ language plpgsql;

-- terbitkan_pesanan(pesanan_id) -------------------------------------------
-- Dipanggil HANYA oleh callback bayaran server (service role) — CLAUDE.md §3.5:
-- "Status bayaran hanya boleh ditukar oleh callback server gateway yang disahkan
-- signature. Tiada endpoint client boleh set status='dibayar'."
create function terbitkan_pesanan(p_pesanan_id uuid) returns void as $$
declare
  v_bulan_aktif int;
  v_tajuk_a text;
  v_tajuk_b text;
  v_slug text;
begin
  select pk.bulan_aktif, pe.tajuk_a, pe.tajuk_b
    into v_bulan_aktif, v_tajuk_a, v_tajuk_b
  from pesanan pe
  join pakej pk on pk.kod = pe.pakej_kod
  where pe.id = p_pesanan_id;

  if v_bulan_aktif is null then
    raise exception 'Pesanan tidak wujud';
  end if;

  v_slug := jana_slug(v_tajuk_a, v_tajuk_b);

  update pesanan
  set status = 'terbit',
      slug = v_slug,
      terbit_pada = now(),
      tarikh_tamat = now() + (v_bulan_aktif || ' months')::interval
  where id = p_pesanan_id;
end;
$$ language plpgsql security definer set search_path = public;

revoke execute on function terbitkan_pesanan(uuid) from public, anon, authenticated;
grant execute on function terbitkan_pesanan(uuid) to service_role;

-- dapatkan_kad(slug) — SECURITY DEFINER, data kad untuk tetamu awam --------
create function dapatkan_kad(p_slug text)
returns table (
  id uuid,
  no_rujukan text,
  jenis_acara jenis_acara_t,
  jenis_tersuai text,
  kicker text,
  tajuk_a text,
  tajuk_b text,
  penyambung text,
  tarikh_majlis date,
  masa_teks text,
  venue_nama text,
  venue_alamat text,
  pautan_waze text,
  pautan_maps text,
  atur_cara jsonb,
  kata_teks text,
  kata_oleh text,
  tema jsonb,
  bentuk_potong bentuk_potong_t,
  tunjuk_gambar_utama boolean,
  motion_kod text,
  motion_status motion_status_t,
  taburan taburan_t,
  muzik_kod text,
  bahasa_lalai text,
  dwibahasa boolean,
  bil_halaman int,
  kuota_rsvp int
) as $$
  select pe.id, pe.no_rujukan, pe.jenis_acara, pe.jenis_tersuai, pe.kicker,
    pe.tajuk_a, pe.tajuk_b, pe.penyambung, pe.tarikh_majlis, pe.masa_teks,
    pe.venue_nama, pe.venue_alamat, pe.pautan_waze, pe.pautan_maps, pe.atur_cara,
    pe.kata_teks, pe.kata_oleh, pe.tema, pe.bentuk_potong,
    pe.tunjuk_gambar_utama, pe.motion_kod, pe.motion_status,
    pe.taburan, pe.muzik_kod, pe.bahasa_lalai, pe.dwibahasa,
    pk.bil_halaman, pk.kuota_rsvp
  from pesanan pe
  join pakej pk on pk.kod = pe.pakej_kod
  where pe.slug = p_slug
    and pe.status = 'terbit'
    and (pe.tarikh_tamat is null or pe.tarikh_tamat > now());
$$ language sql security definer stable set search_path = public;

grant execute on function dapatkan_kad(text) to anon, authenticated;

-- hantar_rsvp(...) — SECURITY DEFINER, semak terbit + kuota, insert -------
create function hantar_rsvp(
  p_slug text,
  p_nama text,
  p_bilangan int,
  p_hadir boolean,
  p_catatan text,
  p_ip_hash text
) returns void as $$
declare
  v_pesanan_id uuid;
  v_kuota int;
  v_jumlah int;
begin
  select pe.id, pk.kuota_rsvp into v_pesanan_id, v_kuota
  from pesanan pe
  join pakej pk on pk.kod = pe.pakej_kod
  where pe.slug = p_slug
    and pe.status = 'terbit'
    and (pe.tarikh_tamat is null or pe.tarikh_tamat > now());

  if v_pesanan_id is null then
    raise exception 'Jemputan tidak ditemui atau belum diterbitkan';
  end if;

  select coalesce(sum(bilangan), 0) into v_jumlah from rsvp where pesanan_id = v_pesanan_id;
  if v_jumlah + p_bilangan > v_kuota then
    raise exception 'Kuota RSVP penuh';
  end if;

  insert into rsvp (pesanan_id, nama, bilangan, hadir, catatan, ip_hash)
  values (v_pesanan_id, p_nama, p_bilangan, p_hadir, p_catatan, p_ip_hash);
end;
$$ language plpgsql security definer set search_path = public;

grant execute on function hantar_rsvp(text, text, int, boolean, text, text) to anon, authenticated;

-- tangani_pengguna_baharu() — auth.users -> profil (F-01 daftar) ----------
create function tangani_pengguna_baharu() returns trigger as $$
begin
  insert into profil (id, nama, emel)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'nama', split_part(new.email, '@', 1)),
    new.email
  );
  return new;
end;
$$ language plpgsql security definer set search_path = public;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function tangani_pengguna_baharu();
