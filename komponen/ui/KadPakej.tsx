import { Check } from "lucide-react";
import { cn } from "@/lib/util/cn";
import { Butang } from "@/komponen/ui/Butang";

export interface KadPakejProps {
  nama: string;
  hargaSen: number;
  ciri: string[];
  popular?: boolean;
  dipilih?: boolean;
  onPilih?: () => void;
}

function formatHarga(sen: number): string {
  return `RM${(sen / 100).toFixed(0)}`;
}

export function KadPakej({
  nama,
  hargaSen,
  ciri,
  popular = false,
  dipilih = false,
  onPilih,
}: KadPakejProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-4 rounded-[var(--radius)] border p-6",
        dipilih
          ? "border-[var(--color-accent)] bg-[var(--color-section)]"
          : "border-[var(--color-section-ghost)] bg-[var(--color-surface)]",
      )}
    >
      {popular && (
        <span className="absolute -top-3 left-6 rounded-full bg-[var(--color-accent)] px-3 py-1 text-xs font-semibold text-[#161826]">
          POPULAR
        </span>
      )}
      <div>
        <h3 className="text-lg font-semibold text-[var(--color-text)]">{nama}</h3>
        <p className="mt-1 text-3xl font-bold text-[var(--color-text)]">
          {formatHarga(hargaSen)}
        </p>
      </div>
      <ul className="flex flex-1 flex-col gap-2">
        {ciri.map((c) => (
          <li key={c} className="flex items-start gap-2 text-sm text-[var(--color-text)]/80">
            <Check className="mt-0.5 size-4 shrink-0 text-[var(--color-accent)]" />
            <span>{c}</span>
          </li>
        ))}
      </ul>
      <Butang varian={dipilih ? "utama" : "sekunder"} onClick={onPilih}>
        {dipilih ? "Dipilih" : "Pilih pakej"}
      </Butang>
    </div>
  );
}
