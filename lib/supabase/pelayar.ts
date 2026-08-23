import { createBrowserClient } from "@supabase/ssr";

/** Pelanggan Supabase untuk komponen client ("use client"). */
export function ciptaKlienPelayar() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
