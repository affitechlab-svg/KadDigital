"use client";

import { useParams, useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { BarAtas } from "@/komponen/ui/BarAtas";
import { Butang } from "@/komponen/ui/Butang";
import { Input } from "@/komponen/ui/Input";
import { TextArea } from "@/komponen/ui/TextArea";
import { fixtureSenaraiPesanan } from "@/lib/fixture/admin";

/** UI sahaja — simpan sebenar (+ revalidatePath) dibina Fasa 7. */
export default function EditPesanan() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const pesanan = fixtureSenaraiPesanan.find((p) => p.id === id);

  function simpan(e: FormEvent) {
    e.preventDefault();
    router.push(`/dashboard/${id}`);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <BarAtas tajuk="Edit Maklumat" onKembali={() => router.push(`/dashboard/${id}`)} />
      <form onSubmit={simpan} className="mx-auto flex w-full max-w-md flex-1 flex-col gap-4 px-4 py-6">
        <Input label="Tajuk A" defaultValue={pesanan?.namaClient} />
        <Input label="Tarikh majlis" type="date" defaultValue={pesanan?.tarikhMajlis} />
        <Input label="Nama venue" placeholder="Nama venue" />
        <TextArea label="Alamat venue" rows={2} />
        <Input label="Slug" defaultValue={pesanan?.slug ?? ""} disabled petunjuk="Slug tidak boleh diedit selepas terbit" />
        <Butang type="submit" className="mt-2 w-full">
          Simpan perubahan
        </Butang>
      </form>
    </div>
  );
}
