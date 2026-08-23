export type StatusPesanan = "draf" | "dibayar" | "terbit" | "ditarik" | "lapuk";

export interface PesananSenarai {
  id: string;
  noRujukan: string;
  namaClient: string;
  emelClient: string;
  slug: string | null;
  pakejKod: "ringkas" | "standard" | "premium";
  pakejNama: string;
  tarikhMajlis: string;
  status: StatusPesanan;
  dicipta: string;
}

export const fixtureSenaraiPesanan: PesananSenarai[] = [
  {
    id: "p1",
    noRujukan: "KD-0001",
    namaClient: "Nurul Aina",
    emelClient: "nurul@contoh.com",
    slug: "contoh-kahwin",
    pakejKod: "standard",
    pakejNama: "Signature",
    tarikhMajlis: "2026-11-15",
    status: "terbit",
    dicipta: "2026-08-01",
  },
  {
    id: "p2",
    noRujukan: "KD-0002",
    namaClient: "Sinar Teknologi",
    emelClient: "admin@sinar.com",
    slug: "contoh-korporat",
    pakejKod: "premium",
    pakejNama: "Luxury",
    tarikhMajlis: "2026-10-08",
    status: "terbit",
    dicipta: "2026-08-03",
  },
  {
    id: "p3",
    noRujukan: "KD-0003",
    namaClient: "Farah Diyana",
    emelClient: "farah@contoh.com",
    slug: null,
    pakejKod: "ringkas",
    pakejNama: "Simple",
    tarikhMajlis: "2026-12-20",
    status: "draf",
    dicipta: "2026-08-10",
  },
  {
    id: "p4",
    noRujukan: "KD-0004",
    namaClient: "Zulkifli Hassan",
    emelClient: "zul@contoh.com",
    slug: "zul-hana",
    pakejKod: "standard",
    pakejNama: "Signature",
    tarikhMajlis: "2026-09-05",
    status: "dibayar",
    dicipta: "2026-08-12",
  },
  {
    id: "p5",
    noRujukan: "KD-0005",
    namaClient: "Aiman Rasyid",
    emelClient: "aiman@contoh.com",
    slug: "aiman-najwa",
    pakejKod: "premium",
    pakejNama: "Luxury",
    tarikhMajlis: "2026-07-01",
    status: "ditarik",
    dicipta: "2026-06-01",
  },
];

export interface ClientFixture {
  id: string;
  nama: string;
  emel: string;
  telefon: string;
  jumlahPesanan: number;
  dicipta: string;
}

export const fixtureClient: ClientFixture[] = [
  { id: "c1", nama: "Nurul Aina", emel: "nurul@contoh.com", telefon: "+60123456781", jumlahPesanan: 1, dicipta: "2026-08-01" },
  { id: "c2", nama: "Sinar Teknologi", emel: "admin@sinar.com", telefon: "+60123456782", jumlahPesanan: 1, dicipta: "2026-08-03" },
  { id: "c3", nama: "Farah Diyana", emel: "farah@contoh.com", telefon: "+60123456783", jumlahPesanan: 1, dicipta: "2026-08-10" },
];

export interface BayaranFixture {
  id: string;
  noRujukan: string;
  namaClient: string;
  jumlahSen: number;
  kaedah: "duitnow" | "fpx" | "kad";
  status: "menunggu" | "berjaya" | "gagal" | "dibatalkan";
  dicipta: string;
}

export const fixtureBayaran: BayaranFixture[] = [
  { id: "b1", noRujukan: "KD-0001", namaClient: "Nurul Aina", jumlahSen: 4000, kaedah: "duitnow", status: "berjaya", dicipta: "2026-08-01" },
  { id: "b2", noRujukan: "KD-0002", namaClient: "Sinar Teknologi", jumlahSen: 5500, kaedah: "fpx", status: "berjaya", dicipta: "2026-08-03" },
  { id: "b3", noRujukan: "KD-0004", namaClient: "Zulkifli Hassan", jumlahSen: 4000, kaedah: "kad", status: "berjaya", dicipta: "2026-08-12" },
  { id: "b4", noRujukan: "KD-0003", namaClient: "Farah Diyana", jumlahSen: 3000, kaedah: "duitnow", status: "menunggu", dicipta: "2026-08-10" },
];

export interface PermintaanMotionFixture {
  id: string;
  noRujukan: string;
  namaClient: string;
  huraian: string;
  status: "baru" | "sedang_dibuat" | "siap" | "ditolak";
  dicipta: string;
}

export const fixturePermintaanMotion: PermintaanMotionFixture[] = [
  {
    id: "m1",
    noRujukan: "KD-0002",
    namaClient: "Sinar Teknologi",
    huraian: "Logo syarikat berputar perlahan sebelum kad terbuka dengan kesan cahaya emas.",
    status: "sedang_dibuat",
    dicipta: "2026-08-04",
  },
];

export interface RsvpFixture {
  id: string;
  nama: string;
  bilangan: number;
  hadir: boolean;
  catatan?: string;
  dicipta: string;
}

export const fixtureRsvp: RsvpFixture[] = [
  { id: "r1", nama: "Siti Khadijah", bilangan: 2, hadir: true, dicipta: "2026-08-05" },
  { id: "r2", nama: "Mohd Faiz", bilangan: 1, hadir: true, catatan: "Datang lewat sikit", dicipta: "2026-08-06" },
  { id: "r3", nama: "Wan Ismail", bilangan: 4, hadir: false, dicipta: "2026-08-07" },
];
