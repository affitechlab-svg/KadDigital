"use client";

import { useEffect, useRef, useState } from "react";
import { ButangMuzik } from "@/komponen/kad/ButangMuzik";
import { HalamanKataKata } from "@/komponen/kad/HalamanKataKata";
import { HalamanPeta } from "@/komponen/kad/HalamanPeta";
import { HalamanTempat } from "@/komponen/kad/HalamanTempat";
import { HalamanUtama } from "@/komponen/kad/HalamanUtama";
import { Pembukaan } from "@/komponen/kad/Pembukaan";
import { Taburan } from "@/komponen/kad/Taburan";
import { TitikPenunjuk } from "@/komponen/kad/TitikPenunjuk";
import type { PesananFixture } from "@/lib/fixture/jenis";
import { kelasFontKad } from "@/lib/tema/fonts";
import type { Tema } from "@/lib/tema/jenis";
import { gayaTemaKad } from "@/lib/tema/suntik";

export interface KadJemputanProps {
  pesanan: PesananFixture;
  tema: Tema;
  /** "pratonton" = alat client (RSVP dimatikan). "awam" = halaman tetamu sebenar. */
  mod: "pratonton" | "awam";
}

/**
 * SATU SUMBER RENDER untuk kad jemputan (CLAUDE.md §3.2). Dipakai oleh
 * skrin pratonton client (`/buat/[id]/pratonton`) dan halaman awam tetamu
 * (`/i/[slug]`) — berbeza hanya melalui prop `mod`. Jangan salin JSX ini.
 */
export function KadJemputan({ pesanan, tema, mod }: KadJemputanProps) {
  const rujukanBekas = useRef<HTMLDivElement>(null);
  const [indeksAktif, setIndeksAktif] = useState(0);
  const idRaf = useRef<number | null>(null);

  const adaKataKata = pesanan.bilHalaman === 4 && !!pesanan.kataTeks;
  const jumlahHalaman = 2 + (adaKataKata ? 1 : 0) + 1;

  function tanganiScroll() {
    if (idRaf.current !== null) return;
    idRaf.current = requestAnimationFrame(() => {
      idRaf.current = null;
      const bekas = rujukanBekas.current;
      if (!bekas || bekas.clientHeight === 0) return;
      setIndeksAktif(Math.round(bekas.scrollTop / bekas.clientHeight));
    });
  }

  function keHalaman(indeks: number) {
    const bekas = rujukanBekas.current;
    const anak = bekas?.children.item(indeks);
    if (bekas && anak instanceof HTMLElement) {
      bekas.scrollTo({ top: anak.offsetTop, behavior: "smooth" });
    }
  }

  useEffect(
    () => () => {
      if (idRaf.current !== null) cancelAnimationFrame(idRaf.current);
    },
    [],
  );

  return (
    <div
      className={`kad relative h-full w-full overflow-hidden ${kelasFontKad}`}
      style={gayaTemaKad(tema)}
    >
      <div
        ref={rujukanBekas}
        onScroll={tanganiScroll}
        className="h-full w-full overflow-y-auto scroll-smooth"
        style={{ scrollSnapType: "y mandatory" }}
      >
        <section className="h-full" style={{ scrollSnapAlign: "start" }}>
          <HalamanUtama
            kicker={pesanan.kicker}
            tajukA={pesanan.tajukA}
            tajukB={pesanan.tajukB}
            penyambung={pesanan.penyambung}
            tarikhMajlis={pesanan.tarikhMajlis}
            masaTeks={pesanan.masaTeks}
            bentukPotong={pesanan.bentukPotong}
            tunjukGambarUtama={pesanan.tunjukGambarUtama}
            gambarUtamaUrl={pesanan.gambarUtamaUrl}
          />
        </section>
        <section className="h-full" style={{ scrollSnapAlign: "start" }}>
          <HalamanTempat
            venueNama={pesanan.venueNama}
            venueAlamat={pesanan.venueAlamat}
            aturCara={pesanan.aturCara}
          />
        </section>
        {adaKataKata && pesanan.kataTeks && (
          <section className="h-full" style={{ scrollSnapAlign: "start" }}>
            <HalamanKataKata kataTeks={pesanan.kataTeks} kataOleh={pesanan.kataOleh} />
          </section>
        )}
        <section className="h-full" style={{ scrollSnapAlign: "start" }}>
          <HalamanPeta
            pautanWaze={pesanan.pautanWaze}
            pautanMaps={pesanan.pautanMaps}
            nomborWhatsapp={pesanan.nomborWhatsapp}
            tajukA={pesanan.tajukA}
            mod={mod}
            kuotaRsvpBaki={pesanan.kuotaRsvpBaki}
          />
        </section>
      </div>

      <Taburan jenis={pesanan.taburan} />
      <TitikPenunjuk jumlah={jumlahHalaman} aktif={indeksAktif} onKlik={keHalaman} />
      <ButangMuzik />

      <Pembukaan
        motion={pesanan.motionKod}
        kicker={pesanan.kicker}
        tajukA={pesanan.tajukA}
        tajukB={pesanan.tajukB}
        penyambung={pesanan.penyambung}
      />
    </div>
  );
}
