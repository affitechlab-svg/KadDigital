import type { ReactNode } from "react";

export interface LajurJadual<T> {
  kunci: string;
  label: string;
  papar: (baris: T) => ReactNode;
}

export interface JadualProps<T> {
  lajur: LajurJadual<T>[];
  data: T[];
  idBaris: (baris: T) => string;
}

export function Jadual<T>({ lajur, data, idBaris }: JadualProps<T>) {
  return (
    <div className="overflow-x-auto rounded-[var(--radius)] border border-[var(--color-section-ghost)]">
      <table className="w-full min-w-max text-left text-sm">
        <thead>
          <tr className="border-b border-[var(--color-section-ghost)] bg-[var(--color-surface)]">
            {lajur.map((l) => (
              <th
                key={l.kunci}
                className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--color-text)]/60"
              >
                {l.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((baris) => (
            <tr
              key={idBaris(baris)}
              className="border-b border-[var(--color-section-ghost)] last:border-0 hover:bg-[var(--color-surface)]"
            >
              {lajur.map((l) => (
                <td key={l.kunci} className="px-4 py-3 text-[var(--color-text)]">
                  {l.papar(baris)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
