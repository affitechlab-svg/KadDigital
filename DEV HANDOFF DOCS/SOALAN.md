# SOALAN.md — Isu Terbuka KadDigital

### S-002 — Kata laluan akaun demo dalam `seed.sql`
- **Konteks:** `04-DATA-MODEL.md §6.5` kata "Kata laluan hanya dalam `.env.local`
  pembangunan — jangan commit". Tapi `seed.sql` ialah fail SQL tulen (dijalankan oleh
  `supabase db reset`), ia tidak boleh baca `.env.local` semasa seeding.
- **Pilihan A:** Hardcode kata laluan dev tetap terus dalam `seed.sql` (mudah, akaun demo
  terus boleh log masuk lepas `supabase db reset`, git-track).
- **Pilihan B:** `seed.sql` cipta akaun tanpa kata laluan; skrip Node berasingan (baca
  `.env.local`) set kata laluan lepas seed jalan.
- **Pilihan C:** Jangan seed akaun demo langsung — developer daftar manual setiap kali.
- **Cadangan saya:** Pilihan A. Supabase tempatan (`supabase start`) hanya jalan dalam
  Docker di mesin developer sendiri — bukan pangkalan data dikongsi atau boleh dicapai
  dari luar. Kata laluan dev yang di-commit dalam `seed.sql` tidak membocorkan apa-apa
  sebab ia cuma sah untuk instance Docker tempatan itu sahaja, dan git-track memudahkan
  onboarding (`supabase db reset` terus boleh log masuk tanpa langkah tambahan). Amaran
  asal dalam dokumen lebih sesuai untuk kata laluan **production** — bukan seed tempatan.
- **Andaian sementara yang saya guna:** `seed.sql` cipta `admin@kaddigital.my` dan
  `demo@kaddigital.my`, kedua-dua dengan kata laluan `kaddigital123`, jelas dilabel
  "LOCAL SAHAJA — jangan jalankan pada production" dalam komen fail. Sahkan dengan
  Fakhri sebelum Fasa 9 (bila `db push` ke Supabase cloud staging) — pastikan seed akaun
  demo **tidak** dijalankan ke staging/production tanpa kata laluan berbeza.
