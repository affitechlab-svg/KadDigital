import { createServerClient, type CookieOptionsWithName } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

interface KukiTulis {
  name: string;
  value: string;
  options?: CookieOptionsWithName;
}

/**
 * Middleware sesi — 03-SITEMAP-ROUTING.md §5:
 * /buat/*      -> perlu sesi; jika tiada -> /masuk?seterusnya=<laluan>
 * /dashboard/* -> perlu sesi
 * /admin/*     -> perlu sesi + profil.peranan = 'admin'; jika tidak -> 404
 * /i/*         -> tiada semakan sesi (awam)
 *
 * Kebenaran PEMILIK pesanan (cth: /buat/[id]/*) disemak dalam page/route,
 * bukan di sini — supaya RLS jadi lapisan kedua (CLAUDE.md §3.5).
 */
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(kukiSenarai: KukiTulis[]) {
          for (const { name, value } of kukiSenarai) {
            request.cookies.set(name, value);
          }
          response = NextResponse.next({ request });
          for (const { name, value, options } of kukiSenarai) {
            response.cookies.set(name, value, options);
          }
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const perluSesi = pathname.startsWith("/buat") || pathname.startsWith("/dashboard");
  const perluAdmin = pathname.startsWith("/admin");

  if ((perluSesi || perluAdmin) && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/masuk";
    url.searchParams.set("seterusnya", pathname);
    return NextResponse.redirect(url);
  }

  if (perluAdmin && user) {
    const { data: profil } = await supabase
      .from("profil")
      .select("peranan")
      .eq("id", user.id)
      .single();

    if (profil?.peranan !== "admin") {
      // 404 mesra — bukan 403 yang membocorkan kewujudan laluan (AC-1).
      return NextResponse.rewrite(new URL("/laluan-tidak-wujud", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/buat/:path*", "/dashboard/:path*", "/admin/:path*"],
};
