-- Jadual teras `pesanan` — 04-DATA-MODEL.md §3.4

create sequence no_rujukan_seq;

create table pesanan (
  id uuid primary key default gen_random_uuid(),
  no_rujukan text unique,
  profil_id uuid not null references profil(id) on delete cascade,
  pakej_kod text not null references pakej(kod),

  -- Acara
  jenis_acara jenis_acara_t not null default 'kahwin',
  jenis_tersuai text,
  kicker text,
  tajuk_a text not null,
  tajuk_b text,
  penyambung text not null default '&',

  -- Tarikh
  tarikh_majlis date not null,
  masa_majlis time,
  masa_teks text,

  -- Tempat
  venue_nama text,
  venue_alamat text,
  pautan_waze text,
  pautan_maps text,
  atur_cara jsonb not null default '[]',

  -- Kata-kata
  kata_teks text,
  kata_oleh text,

  -- Tema
  rujukan_baca text[] not null default '{warna,hiasan,huruf}',
  tema jsonb,
  jana_semula_dipakai int not null default 0,

  -- Gambar
  bentuk_potong bentuk_potong_t not null default 'gerbang',
  tunjuk_gambar_utama boolean not null default true,

  -- Motion & sentuhan
  motion_kod text not null default 'larut' references motion(kod),
  motion_status motion_status_t not null default 'siap',
  taburan taburan_t not null default 'tiada',
  muzik_kod text,
  bahasa_lalai text not null default 'ms',
  dwibahasa boolean not null default false,

  -- Status & pautan
  status status_pesanan_t not null default 'draf',
  slug text unique,
  terbit_pada timestamptz,
  tarikh_tamat timestamptz,
  dicipta_pada timestamptz not null default now(),
  dikemas_pada timestamptz not null default now(),

  constraint pesanan_jenis_tersuai_wajib
    check (jenis_acara <> 'tersuai' or jenis_tersuai is not null),
  constraint pesanan_terbit_wajib_slug
    check (status <> 'terbit' or slug is not null)
  -- had `atur_cara` ikut pakej disemak oleh trigger `semak_had_atur_cara`
  -- (20260823113336_fungsi_trigger.sql) — had berbeza ikut pakej, tidak
  -- boleh jadi CHECK constraint statik (subquery tidak dibenarkan dalam CHECK).
);

create index pesanan_profil_id_idx on pesanan(profil_id);
create index pesanan_status_idx on pesanan(status);
create index pesanan_tarikh_majlis_idx on pesanan(tarikh_majlis);
create index pesanan_dicipta_pada_idx on pesanan(dicipta_pada desc);
