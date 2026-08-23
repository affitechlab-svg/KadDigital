import { createServerClient, type CookieOptionsWithName } from "@supabase/ssr";
import { cookies } from "next/headers";

interface KukiTulis {
  name: string;
  value: string;
  options?: CookieOptionsWithName;
}

/**
 * Pelanggan Supabase untuk Server Component / route handler. Guna kunci
 * anon sahaja — RLS kekal berkuat kuasa (bukan service role).
 */
export async function ciptaKlienPelayan() {
  const kukiStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return kukiStore.getAll();
        },
        setAll(kukiSenarai: KukiTulis[]) {
          try {
            for (const { name, value, options } of kukiSenarai) {
              kukiStore.set(name, value, options);
            }
          } catch {
            // Dipanggil dari Server Component — sesi disegar semula oleh
            // middleware, jadi ralat set-cookie di sini boleh diabaikan.
          }
        },
      },
    },
  );
}
