"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { BarAtas } from "@/komponen/ui/BarAtas";
import { Butang } from "@/komponen/ui/Butang";
import { PenunjukLangkah } from "@/komponen/ui/PenunjukLangkah";

export interface BingkaiLangkahProps {
  tajuk: string;
  semasa: number;
  jumlah: number;
  laluanKembali: string;
  laluanTeruskan?: string;
  labelTeruskan?: string;
  bolehTeruskan?: boolean;
  children: ReactNode;
}

/** Bekas sepunya setiap skrin /buat/* — BarAtas (Kembali) + LANGKAH n/jumlah (AC-3 §Fasa3). */
export function BingkaiLangkah({
  tajuk,
  semasa,
  jumlah,
  laluanKembali,
  laluanTeruskan,
  labelTeruskan = "Teruskan",
  bolehTeruskan = true,
  children,
}: BingkaiLangkahProps) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col">
      <BarAtas tajuk={tajuk} onKembali={() => router.push(laluanKembali)} />
      <div className="mx-auto w-full max-w-md px-4 pt-4">
        <PenunjukLangkah semasa={semasa} jumlah={jumlah} />
      </div>
      <main className="mx-auto w-full max-w-md flex-1 px-4 py-6">{children}</main>
      {laluanTeruskan && (
        <div className="sticky bottom-0 border-t border-[var(--color-section-ghost)] bg-[var(--color-bg)] p-4">
          <div className="mx-auto max-w-md">
            <Butang
              className="w-full"
              disabled={!bolehTeruskan}
              onClick={() => router.push(laluanTeruskan)}
            >
              {labelTeruskan}
            </Butang>
          </div>
        </div>
      )}
    </div>
  );
}
