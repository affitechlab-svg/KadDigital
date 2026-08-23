"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { BarAtas } from "@/komponen/ui/BarAtas";
import { Amaran } from "@/komponen/ui/Amaran";
import { Butang } from "@/komponen/ui/Butang";
import { Modal } from "@/komponen/ui/Modal";
import { fixtureSenaraiPesanan } from "@/lib/fixture/admin";

export default function ButiranPesananAdmin() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const pesanan = fixtureSenaraiPesanan.find((p) => p.id === id);
  const [modalTerbuka, setModalTerbuka] = useState(false);
  const [ditarik, setDitarik] = useState(false);

  if (!pesanan) {
    return (
      <div className="flex min-h-screen flex-col">
        <BarAtas tajuk="Pesanan" onKembali={() => router.push("/admin/pesanan")} />
        <p className="p-6 text-[var(--color-text)]/60">Pesanan tidak dijumpai.</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <BarAtas tajuk={pesanan.noRujukan} onKembali={() => router.push("/admin/pesanan")} />
      <main className="flex flex-1 flex-col gap-4 px-6 py-6">
        {ditarik && (
          <Amaran jenis="amaran">Pesanan ini telah di-un-publish. Pautan awam kini &ldquo;tidak tersedia&rdquo;.</Amaran>
        )}
        <div className="max-w-md rounded-[var(--radius)] border border-[var(--color-section-ghost)] bg-[var(--color-surface)] p-4">
          <p className="text-lg font-semibold text-[var(--color-text)]">{pesanan.namaClient}</p>
          <p className="text-sm text-[var(--color-text)]/60">{pesanan.emelClient}</p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-[var(--color-text)]">
            <span className="text-[var(--color-text)]/50">Pakej</span>
            <span>{pesanan.pakejNama}</span>
            <span className="text-[var(--color-text)]/50">Tarikh majlis</span>
            <span>{pesanan.tarikhMajlis}</span>
            <span className="text-[var(--color-text)]/50">Status</span>
            <span>{ditarik ? "ditarik" : pesanan.status}</span>
            <span className="text-[var(--color-text)]/50">Slug</span>
            <span>{pesanan.slug ?? "—"}</span>
          </div>
        </div>

        {pesanan.status === "terbit" && !ditarik && (
          <Butang varian="bahaya" className="w-fit" onClick={() => setModalTerbuka(true)}>
            Un-publish pesanan
          </Butang>
        )}

        <Modal terbuka={modalTerbuka} onTutup={() => setModalTerbuka(false)} tajuk="Sahkan un-publish">
          <p className="text-sm text-[var(--color-text)]/80">
            Pautan awam akan bertukar kepada halaman &ldquo;tidak lagi tersedia&rdquo;. Tindakan ini{" "}
            <strong>tidak</strong> memulangkan wang. Teruskan?
          </p>
          <div className="mt-4 flex justify-end gap-2">
            <Butang varian="hantu" onClick={() => setModalTerbuka(false)}>
              Batal
            </Butang>
            <Butang
              varian="bahaya"
              onClick={() => {
                setDitarik(true);
                setModalTerbuka(false);
              }}
            >
              Un-publish
            </Butang>
          </div>
        </Modal>
      </main>
    </div>
  );
}
