import type {
  AturCaraItem,
  BahasaKad,
  BentukPotong,
  JenisAcara,
  MotionKod,
  PesananFixture,
  Taburan,
} from "@/lib/fixture/jenis";
import { cariPakej } from "@/lib/fixture/pakej";
import type { Tema } from "@/lib/tema/jenis";
import { presetTemaKad } from "@/lib/fixture/tema-preset";

export interface DrafPesanan {
  pakejKod: "ringkas" | "standard" | "premium";
  jenisAcara: JenisAcara;
  jenisTersuai: string;
  kicker: string;
  tajukA: string;
  tajukB: string;
  penyambung: string;
  tarikhMajlis: string;
  masaTeks: string;
  venueNama: string;
  venueAlamat: string;
  pautanWaze: string;
  pautanMaps: string;
  aturCara: AturCaraItem[];
  kataTeks: string;
  kataOleh: string;
  tema: Tema;
  bentukPotong: BentukPotong;
  tunjukGambarUtama: boolean;
  gambarUtamaUrl: string;
  motionKod: MotionKod;
  taburan: Taburan;
  muzikKod: string;
  bahasaLalai: BahasaKad;
  dwibahasa: boolean;
}

export const drafPesananLalai: DrafPesanan = {
  pakejKod: "standard",
  jenisAcara: "kahwin",
  jenisTersuai: "",
  kicker: "WALIMATULURUS",
  tajukA: "",
  tajukB: "",
  penyambung: "&",
  tarikhMajlis: "2026-12-01",
  masaTeks: "11:00 PAGI",
  venueNama: "",
  venueAlamat: "",
  pautanWaze: "",
  pautanMaps: "",
  aturCara: [{ masa: "11:00", aktiviti: "Ketibaan tetamu" }],
  kataTeks: "",
  kataOleh: "",
  tema: presetTemaKad[0]!.tema,
  bentukPotong: "bulat",
  tunjukGambarUtama: true,
  gambarUtamaUrl: "",
  motionKod: "sampul",
  taburan: "tiada",
  muzikKod: "",
  bahasaLalai: "ms",
  dwibahasa: true,
};

/** Tukar draf wizard kepada bentuk `PesananFixture` supaya `<KadJemputan>` boleh pratonton. */
export function drafKePesananFixture(draf: DrafPesanan): PesananFixture {
  const pakej = cariPakej(draf.pakejKod);
  return {
    id: "draf-pratonton",
    slug: "pratonton",
    jenisAcara: draf.jenisAcara,
    jenisTersuai: draf.jenisTersuai || undefined,
    kicker: draf.kicker,
    tajukA: draf.tajukA || "Nama Anda",
    tajukB: draf.tajukB || undefined,
    penyambung: draf.penyambung,
    tarikhMajlis: draf.tarikhMajlis,
    masaTeks: draf.masaTeks,
    venueNama: draf.venueNama || "Nama Venue",
    venueAlamat: draf.venueAlamat,
    pautanWaze: draf.pautanWaze || "https://waze.com",
    pautanMaps: draf.pautanMaps || "https://maps.google.com",
    aturCara: draf.aturCara,
    kataTeks: draf.kataTeks || undefined,
    kataOleh: draf.kataOleh || undefined,
    tema: draf.tema,
    bentukPotong: draf.bentukPotong,
    tunjukGambarUtama: draf.tunjukGambarUtama,
    gambarUtamaUrl: draf.gambarUtamaUrl,
    motionKod: draf.motionKod,
    taburan: draf.taburan,
    bahasaLalai: draf.bahasaLalai,
    dwibahasa: draf.dwibahasa,
    bilHalaman: pakej.bilHalaman,
    kuotaRsvpBaki: pakej.kuotaRsvp,
    nomborWhatsapp: "60123456789",
  };
}
