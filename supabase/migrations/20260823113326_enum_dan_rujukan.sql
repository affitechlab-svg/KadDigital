-- Enum + jadual rujukan (profil, pakej, motion) — 04-DATA-MODEL.md §2, §3.1-3.3

create type peranan_t        as enum ('client','admin');
create type status_pesanan_t as enum ('draf','dibayar','terbit','ditarik','lapuk');
create type jenis_acara_t    as enum ('kahwin','korporat','pasukan','latihan','tersuai');
create type motion_status_t  as enum ('siap','semakan');
create type status_bayaran_t as enum ('menunggu','berjaya','gagal','dibatalkan');
create type jenis_media_t    as enum ('rujukan','gambar_utama','gambar_sampingan','logo','muzik');
create type bentuk_potong_t  as enum ('gerbang','bulat','segi');
create type taburan_t        as enum ('tiada','kelopak','hati');

-- 3.1 profil ---------------------------------------------------------------
create table profil (
  id uuid primary key references auth.users(id) on delete cascade,
  nama text not null,
  emel text not null unique,
  telefon text,
  peranan peranan_t not null default 'client',
  dicipta_pada timestamptz not null default now()
);

-- 3.2 pakej -----------------------------------------------------------------
create table pakej (
  kod text primary key,
  nama_papar text not null,
  harga_sen int not null,
  susunan int not null default 0,
  popular boolean not null default false,
  bil_halaman int not null,
  motion_dibenar text[] not null default '{}',
  motion_tersuai boolean not null default false,
  had_rujukan int not null,
  had_jana_semula int not null,
  laras_manual boolean not null default false,
  gambar_subjek text[] not null default '{}',
  bentuk_dibenar bentuk_potong_t[] not null default '{}',
  had_atur_cara int not null,
  muzik text not null,
  taburan boolean not null default false,
  dwibahasa boolean not null default false,
  kuota_rsvp int not null,
  bulan_aktif int not null,
  aktif boolean not null default true
);

-- 3.3 motion (pustaka) -------------------------------------------------------
create table motion (
  kod text primary key,
  nama text not null,
  huraian text,
  pakej_minimum text references pakej(kod),
  aktif boolean not null default true,
  susunan int not null default 0
);
