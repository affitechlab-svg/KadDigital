"use client";

import { MapPin, MessageCircle } from "lucide-react";
import { type FormEvent, useState } from "react";

export interface HalamanPetaProps {
  pautanWaze: string;
  pautanMaps: string;
  nomborWhatsapp: string;
  tajukA: string;
  mod: "pratonton" | "awam";
  kuotaRsvpBaki: number;
}

/**
 * Borang RSVP di sini UI sahaja setakat Fasa 2 — penghantaran sebenar ke
 * server dibina dalam Fasa 6 (POST /api/rsvp). Mod "pratonton" mematikan
 * penghantaran (AC-7).
 */
export function HalamanPeta({
  pautanWaze,
  pautanMaps,
  nomborWhatsapp,
  tajukA,
  mod,
  kuotaRsvpBaki,
}: HalamanPetaProps) {
  const [dihantar, setDihantar] = useState(false);
  const kuotaPenuh = kuotaRsvpBaki <= 0;

  function hantar(e: FormEvent) {
    e.preventDefault();
    if (mod === "pratonton" || kuotaPenuh) return;
    setDihantar(true);
  }

  const teksWhatsapp = encodeURIComponent(`Assalamualaikum, saya akan hadir ke majlis ${tajukA}.`);

  return (
    <div
      className="flex h-full flex-col items-center justify-center gap-5 overflow-y-auto px-6 py-10 text-center"
      style={{ color: "var(--kad-teks)" }}
    >
      <span
        className="text-xs uppercase tracking-[0.3em]"
        style={{ color: "var(--kad-aksen)", fontFamily: "var(--kad-huruf-badan)" }}
      >
        Lokasi & Kehadiran
      </span>

      <div
        className="flex h-24 w-full max-w-xs items-center justify-center rounded-[12px] border"
        style={{ borderColor: "var(--kad-aksen)", background: "var(--kad-latar-sekunder)" }}
      >
        <MapPin className="size-6 opacity-40" aria-hidden />
      </div>

      <div className="flex gap-3">
        <a
          href={pautanWaze}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border px-4 py-2 text-xs font-medium"
          style={{ borderColor: "var(--kad-aksen)", color: "var(--kad-teks)" }}
        >
          Waze
        </a>
        <a
          href={pautanMaps}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border px-4 py-2 text-xs font-medium"
          style={{ borderColor: "var(--kad-aksen)", color: "var(--kad-teks)" }}
        >
          Google Maps
        </a>
      </div>

      {dihantar ? (
        <p className="text-sm" style={{ fontFamily: "var(--kad-huruf-badan)" }}>
          Terima kasih! Kehadiran anda telah direkodkan.
        </p>
      ) : kuotaPenuh ? (
        <p className="text-sm opacity-80" style={{ fontFamily: "var(--kad-huruf-badan)" }}>
          Kehadiran sudah ditutup.
        </p>
      ) : (
        <form onSubmit={hantar} className="flex w-full max-w-xs flex-col gap-2 text-left">
          <input
            required
            placeholder="Nama penuh"
            className="rounded-[8px] border bg-transparent px-3 py-2 text-sm"
            style={{ borderColor: "var(--kad-aksen)", color: "var(--kad-teks)" }}
          />
          <input
            type="number"
            min={1}
            max={20}
            defaultValue={1}
            placeholder="Bilangan"
            className="rounded-[8px] border bg-transparent px-3 py-2 text-sm"
            style={{ borderColor: "var(--kad-aksen)", color: "var(--kad-teks)" }}
          />
          <button
            type="submit"
            disabled={mod === "pratonton"}
            className="mt-1 rounded-full px-4 py-2 text-xs font-semibold disabled:opacity-40"
            style={{ background: "var(--kad-aksen)", color: "var(--kad-latar)" }}
          >
            Hantar RSVP
          </button>
        </form>
      )}

      <a
        href={`https://wa.me/${nomborWhatsapp}?text=${teksWhatsapp}`}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium"
        style={{ background: "#25D366", color: "#0b1a12" }}
      >
        <MessageCircle className="size-4" />
        RSVP melalui WhatsApp
      </a>
    </div>
  );
}
