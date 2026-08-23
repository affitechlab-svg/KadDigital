const NAMA_HARI = [
  "Ahad",
  "Isnin",
  "Selasa",
  "Rabu",
  "Khamis",
  "Jumaat",
  "Sabtu",
];

const NAMA_BULAN = [
  "Januari",
  "Februari",
  "Mac",
  "April",
  "Mei",
  "Jun",
  "Julai",
  "Ogos",
  "September",
  "Oktober",
  "November",
  "Disember",
];

export interface TarikhTerpecah {
  hari: string;
  bulan: string;
  tarikh: number;
  tahun: number;
}

/** Pecahkan tarikh ISO (YYYY-MM-DD) kepada hari/bulan/tarikh/tahun dalam Bahasa Melayu. */
export function pecahkanTarikh(tarikhIso: string): TarikhTerpecah {
  const d = new Date(`${tarikhIso}T00:00:00`);
  return {
    hari: NAMA_HARI[d.getDay()] ?? "",
    bulan: NAMA_BULAN[d.getMonth()] ?? "",
    tarikh: d.getDate(),
    tahun: d.getFullYear(),
  };
}
