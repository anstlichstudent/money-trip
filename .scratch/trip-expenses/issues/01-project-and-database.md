# Siapkan proyek dan database

Status: needs-triage

## Acuan

[Spesifikasi fitur](../spec.md), [spesifikasi teknis](../technical-spec.md), [catatan desain](../design-notes.md), dan [DESIGN.md](../../../DESIGN.md).

## Lingkup

- Buat proyek TanStack Start untuk Cloudflare Workers, TypeScript, konfigurasi D1, dan lockfile. Pilih versi paket yang kompatibel.
- Gunakan docs/database/schema.sql sebagai draf; periksa kembali sebelum membuat migrasi. Produksi tidak berisi data contoh.
- Sediakan perintah build, pemeriksaan tipe, dan tes. Jangan menjalankan server, browser, atau deploy tanpa izin.

## Kriteria selesai dan pemeriksaan

Build dan pemeriksaan tipe lulus; migrasi dapat diterapkan pada database uji. Periksa foreign key, batas nominal, dan penolakan peserta lintas perjalanan.
