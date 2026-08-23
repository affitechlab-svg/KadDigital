-- Jadual sokongan — 04-DATA-MODEL.md §3.5-3.9

-- 3.5 media -------------------------------------------------------------
create table media (
  id uuid primary key default gen_random_uuid(),
  pesanan_id uuid not null references pesanan(id) on delete cascade,
  jenis jenis_media_t not null,
  laluan text not null,
  nama_asal text,
  saiz_bait int,
  mime text,
  susunan int not null default 0,
  dicipta_pada timestamptz not null default now()
);

create index media_pesanan_id_idx on media(pesanan_id);

-- 3.6 bayaran -------------------------------------------------------------
create table bayaran (
  id uuid primary key default gen_random_uuid(),
  pesanan_id uuid not null references pesanan(id) on delete cascade,
  gateway text not null default 'toyyibpay',
  rujukan_gateway text unique,
  jumlah_sen int not null,
  kaedah text,
  status status_bayaran_t not null default 'menunggu',
  mesej text,
  payload jsonb,
  dicipta_pada timestamptz not null default now(),
  disahkan_pada timestamptz
);

create index bayaran_pesanan_id_idx on bayaran(pesanan_id);

-- 3.7 rsvp -------------------------------------------------------------
create table rsvp (
  id uuid primary key default gen_random_uuid(),
  pesanan_id uuid not null references pesanan(id) on delete cascade,
  nama text not null,
  bilangan int not null default 1 check (bilangan between 1 and 20),
  hadir boolean not null,
  catatan text,
  ip_hash text,
  dicipta_pada timestamptz not null default now()
);

create index rsvp_pesanan_id_dicipta_idx on rsvp(pesanan_id, dicipta_pada desc);

-- 3.8 permintaan_motion ---------------------------------------------------
create table permintaan_motion (
  id uuid primary key default gen_random_uuid(),
  pesanan_id uuid not null references pesanan(id) on delete cascade,
  huraian text not null,
  status text not null default 'baru' check (status in ('baru','sedang_dibuat','siap','ditolak')),
  nota_admin text,
  motion_kod_hasil text references motion(kod),
  dicipta_pada timestamptz not null default now(),
  siap_pada timestamptz
);

create index permintaan_motion_pesanan_id_idx on permintaan_motion(pesanan_id);

-- 3.9 log_admin -------------------------------------------------------------
create table log_admin (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid not null references profil(id),
  tindakan text not null,
  sasaran_jenis text,
  sasaran_id text,
  nota text,
  dicipta_pada timestamptz not null default now()
);
