import { z } from "zod";

export const skemaDaftar = z.object({
  nama: z.string().trim().min(1, "Nama diperlukan"),
  emel: z.string().trim().email("E-mel tidak sah"),
  kataLaluan: z.string().min(8, "Kata laluan sekurang-kurangnya 8 aksara"),
});

export const skemaMasuk = z.object({
  emel: z.string().trim().email("E-mel tidak sah"),
  kataLaluan: z.string().min(1, "Sila masukkan kata laluan"),
});

export const skemaLupaKataLaluan = z.object({
  emel: z.string().trim().email("E-mel tidak sah"),
});

export const skemaTetapkanKataLaluan = z
  .object({
    kataLaluan: z.string().min(8, "Kata laluan sekurang-kurangnya 8 aksara"),
    sahkanKataLaluan: z.string(),
  })
  .refine((data) => data.kataLaluan === data.sahkanKataLaluan, {
    message: "Kata laluan tidak sepadan",
    path: ["sahkanKataLaluan"],
  });
