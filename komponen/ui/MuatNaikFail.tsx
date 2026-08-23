"use client";

import { UploadCloud, X } from "lucide-react";
import { type ChangeEvent, type DragEvent, useId, useRef, useState } from "react";
import { cn } from "@/lib/util/cn";

export interface MuatNaikFailProps {
  label?: string;
  hadSaizMb: number;
  terima?: string;
  onFail: (fail: File) => void;
  ralat?: string;
}

export function MuatNaikFail({
  label = "Muat naik fail",
  hadSaizMb,
  terima = "image/*",
  onFail,
  ralat,
}: MuatNaikFailProps) {
  const idInput = useId();
  const rujukanInput = useRef<HTMLInputElement>(null);
  const [pratontonUrl, setPratontonUrl] = useState<string | null>(null);
  const [namaFail, setNamaFail] = useState<string | null>(null);
  const [mesejRalat, setMesejRalat] = useState<string | null>(null);
  const [seretMasuk, setSeretMasuk] = useState(false);

  function prosesFail(fail: File | undefined) {
    if (!fail) return;
    if (fail.size > hadSaizMb * 1024 * 1024) {
      setMesejRalat(`Fail melebihi had ${hadSaizMb}MB`);
      return;
    }
    setMesejRalat(null);
    setNamaFail(fail.name);
    if (fail.type.startsWith("image/")) {
      setPratontonUrl(URL.createObjectURL(fail));
    }
    onFail(fail);
  }

  function tanganiPilih(e: ChangeEvent<HTMLInputElement>) {
    prosesFail(e.target.files?.[0]);
  }

  function tanganiJatuh(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setSeretMasuk(false);
    prosesFail(e.dataTransfer.files?.[0]);
  }

  function bersihkan() {
    setPratontonUrl(null);
    setNamaFail(null);
    setMesejRalat(null);
    if (rujukanInput.current) rujukanInput.current.value = "";
  }

  const ralatDipapar = ralat ?? mesejRalat;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={idInput} className="text-sm font-medium text-[var(--color-text)]">
        {label}
      </label>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setSeretMasuk(true);
        }}
        onDragLeave={() => setSeretMasuk(false)}
        onDrop={tanganiJatuh}
        onClick={() => rujukanInput.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") rujukanInput.current?.click();
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[var(--radius)] border border-dashed p-6 text-center transition-colors",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]",
          seretMasuk
            ? "border-[var(--color-accent)] bg-[var(--color-section)]"
            : "border-[var(--color-section-ghost)] bg-[var(--color-surface)] hover:bg-[var(--color-section)]",
        )}
      >
        {pratontonUrl ? (
          <div className="flex flex-col items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element -- pratonton data URL sementara */}
            <img
              src={pratontonUrl}
              alt="Pratonton fail dimuat naik"
              className="h-20 w-20 rounded-[var(--radius)] object-cover"
            />
            <span className="text-xs text-[var(--color-text)]/70">{namaFail}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                bersihkan();
              }}
              className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300"
            >
              <X className="size-3" /> Buang
            </button>
          </div>
        ) : (
          <>
            <UploadCloud className="size-6 text-[var(--color-text)]/50" aria-hidden />
            <p className="text-xs text-[var(--color-text)]/60">
              Seret fail ke sini, atau tekan untuk pilih (had {hadSaizMb}MB)
            </p>
          </>
        )}
        <input
          ref={rujukanInput}
          id={idInput}
          type="file"
          accept={terima}
          onChange={tanganiPilih}
          className="sr-only"
        />
      </div>
      {ralatDipapar && <p className="text-xs text-red-400">{ralatDipapar}</p>}
    </div>
  );
}
