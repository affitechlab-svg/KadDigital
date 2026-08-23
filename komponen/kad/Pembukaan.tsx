"use client";

import { RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import type { MotionKod } from "@/lib/fixture/jenis";

export interface PembukaanProps {
  motion: MotionKod;
  kicker: string;
  tajukA: string;
  tajukB?: string;
  penyambung: string;
}

const TEMPOH_SAAT: Record<MotionKod, number> = {
  sampul: 1.1,
  tirai: 0.7,
  bidai: 0.6,
  larut: 0.7,
};

/**
 * Overlay pembukaan kad — "halaman 0". Sentuh untuk buka; overlay hilang
 * selepas animasi tamat, mendedahkan kandungan kad di bawahnya. Butang
 * "Ulang pembukaan" membolehkan animasi dimainkan semula.
 */
export function Pembukaan({
  motion: jenisMotion,
  kicker,
  tajukA,
  tajukB,
  penyambung,
}: PembukaanProps) {
  const [terbuka, setTerbuka] = useState(false);
  const [overlayHilang, setOverlayHilang] = useState(false);

  function buka() {
    setTerbuka(true);
    window.setTimeout(() => setOverlayHilang(true), TEMPOH_SAAT[jenisMotion] * 1000);
  }

  function ulang() {
    setOverlayHilang(false);
    setTerbuka(false);
  }

  return (
    <>
      {!overlayHilang && (
        <div className="absolute inset-0 z-20 overflow-hidden">
          <button
            type="button"
            onClick={buka}
            disabled={terbuka}
            aria-label="Sentuh untuk buka jemputan"
            className="absolute inset-0 z-10 flex flex-col items-center justify-center"
            style={{ background: "var(--kad-latar)" }}
          >
            <KandunganTertutup
              kicker={kicker}
              tajukA={tajukA}
              tajukB={tajukB}
              penyambung={penyambung}
            />
            {!terbuka && (
              <motion.p
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 text-xs uppercase tracking-widest"
                style={{ color: "var(--kad-teks)", fontFamily: "var(--kad-huruf-badan)" }}
              >
                Sentuh untuk buka
              </motion.p>
            )}
          </button>
          {terbuka && <PanelMotion jenis={jenisMotion} tempoh={TEMPOH_SAAT[jenisMotion]} />}
        </div>
      )}
      {overlayHilang && (
        <button
          type="button"
          onClick={ulang}
          className="absolute right-3 top-3 z-30 flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1.5 text-xs backdrop-blur-sm"
          style={{ color: "var(--kad-teks)" }}
        >
          <RotateCcw className="size-3.5" />
          Ulang pembukaan
        </button>
      )}
    </>
  );
}

function KandunganTertutup({
  kicker,
  tajukA,
  tajukB,
  penyambung,
}: {
  kicker: string;
  tajukA: string;
  tajukB?: string;
  penyambung: string;
}) {
  return (
    <div className="relative z-10 flex flex-col items-center gap-3 px-6 text-center">
      <span
        className="text-xs uppercase tracking-[0.3em]"
        style={{ color: "var(--kad-aksen)", fontFamily: "var(--kad-huruf-badan)" }}
      >
        {kicker}
      </span>
      <h2 className="text-3xl" style={{ color: "var(--kad-teks)", fontFamily: "var(--kad-huruf-tajuk)" }}>
        {tajukA}
        {tajukB && (
          <>
            <span className="mx-2" style={{ color: "var(--kad-aksen)" }}>
              {penyambung}
            </span>
            {tajukB}
          </>
        )}
      </h2>
    </div>
  );
}

/** Panel yang bergerak keluar mendedahkan kandungan kad di bawah — ikut jenis motion. */
function PanelMotion({ jenis, tempoh }: { jenis: MotionKod; tempoh: number }) {
  if (jenis === "sampul") {
    return (
      <>
        <motion.div
          initial={{ rotateX: 0 }}
          animate={{ rotateX: -180 }}
          transition={{ duration: tempoh * 0.55, ease: "easeInOut" }}
          className="absolute inset-x-0 top-0 z-20 h-1/2 origin-top"
          style={{ background: "var(--kad-latar-sekunder)" }}
        />
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: "-100%" }}
          transition={{ duration: tempoh * 0.5, delay: tempoh * 0.5, ease: "easeInOut" }}
          className="absolute inset-0 z-30"
          style={{ background: "var(--kad-latar)" }}
        />
      </>
    );
  }
  if (jenis === "tirai") {
    return (
      <>
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: tempoh, ease: "easeInOut" }}
          className="absolute inset-y-0 left-0 z-20 w-1/2"
          style={{ background: "var(--kad-latar-sekunder)" }}
        />
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "100%" }}
          transition={{ duration: tempoh, ease: "easeInOut" }}
          className="absolute inset-y-0 right-0 z-20 w-1/2"
          style={{ background: "var(--kad-latar-sekunder)" }}
        />
      </>
    );
  }
  if (jenis === "bidai") {
    return (
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ duration: tempoh, ease: "easeInOut" }}
        className="absolute inset-0 z-20"
        style={{ background: "var(--kad-latar-sekunder)" }}
      />
    );
  }
  // larut — pudar & zum
  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 0, scale: 1.4 }}
      transition={{ duration: tempoh, ease: "easeInOut" }}
      className="absolute inset-0 z-20"
      style={{ background: "var(--kad-latar)" }}
    />
  );
}
