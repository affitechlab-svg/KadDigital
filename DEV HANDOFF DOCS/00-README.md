# DEV HANDOFF DOCS — KadDigital

Pakej dokumentasi untuk diserah kepada Claude Code. **Belum ada kod.**

| Fail | Isi |
|---|---|
| `CLAUDE.md` | **Baca dahulu.** Peraturan build wajib, hierarki kebenaran, percanggahan yang sudah diselesaikan, rule auto-log |
| `01-PRD.md` | Skop, pengguna, senarai ciri MVP, katalog pakej, business rules, spesifikasi bacaan tema, senarai tangguh |
| `02-TECH-STACK.md` | Next.js 15 + Tailwind v4 + Supabase + Vercel, struktur folder, env, adapter bayaran |
| `03-SITEMAP-ROUTING.md` | Peta laman, jadual laluan, API, middleware, pemetaan skrin design → laluan |
| `04-DATA-MODEL.md` | Enum, jadual, hubungan, RLS, trigger, seed data |
| `05-USER-FLOWS.md` | Aliran A–E (client, tetamu, dashboard, admin, motion tersuai) |
| `06-ACCEPTANCE-CRITERIA.md` | Checklist QA AC-0 hingga AC-13 |
| `09-BUILD-PHASES.md` | ⏳ Belum ada — akan diberi kemudian |
| `CHANGELOG-AUTO.md` | Dijana oleh Claude Code selepas setiap tugas (lihat `CLAUDE.md §5`) |
| `SOALAN.md` | Dijana bila Claude Code terperangkap |

## Sumber asal
- `PELAN_KadDigital.md` — pelan v1 (sebahagian sudah diganti)
- `KadDigital_Hanover_.zip` — design v2: `KadDigital_HANDOVER.md`, `1-KadDigital-Kad-Scroll.html`, `2-KadDigital-Bacaan-Rujukan.html`, `3-KadDigital-UI-Skrin.html`

## Keputusan besar yang perlu disahkan Fakhri
1. **Katalog pakej** dalam `01-PRD §5` ialah cadangan (paksi: halaman scroll, akses motion, motion tersuai, kuota RSVP, tempoh pautan). Harga RM30/40/55 dikekalkan.
2. **Harga motion tersuai** ditetapkan RM60, pusing 2 hari bekerja.
3. **RSVP disimpan dalam sistem** (design v2 menang atas pelan v1). Butang WhatsApp kekal sebagai saluran kedua.
4. **Gateway bayaran** dicadang ToyyibPay melalui adapter — boleh tukar ke Billplz/CHIP tanpa ubah kod aplikasi.
