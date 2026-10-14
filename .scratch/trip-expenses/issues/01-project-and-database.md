# Siapkan proyek dan database

Status: resolved

## Acuan

[Spesifikasi fitur](../spec.md), [spesifikasi teknis](../technical-spec.md), [catatan desain](../design-notes.md), dan [DESIGN.md](../../../DESIGN.md).

## Lingkup

- Buat proyek TanStack Start untuk Cloudflare Workers, TypeScript, konfigurasi D1, dan lockfile. Pilih versi paket yang kompatibel.
- Gunakan docs/database/schema.sql sebagai draf; periksa kembali sebelum membuat migrasi. Produksi tidak berisi data contoh.
- Sediakan perintah build, pemeriksaan tipe, dan tes. Jangan menjalankan server, browser, atau deploy tanpa izin.

## Kriteria selesai dan pemeriksaan

Build dan pemeriksaan tipe lulus; migrasi dapat diterapkan pada database uji. Periksa foreign key, batas nominal, dan penolakan peserta lintas perjalanan.

## Answer

Tiket 1 selesai. Proyek TanStack Start memakai React, TypeScript, Vite, plugin
Cloudflare, dan binding D1 `DB`. Versi paket dikunci dalam `package-lock.json`.
Migrasi `migrations/0001_initial.sql` berasal dari draf yang telah diperiksa;
semua tabel kosong tanpa data contoh. ID database produksi belum diatur.
Petunjuk perintah dan penggantian ID lokal ada di `README.md`.

Pemeriksaan lulus:

- `npm run build`
- `npm run typecheck`
- `npm test`: 4 tes D1 lokal, masing-masing memakai database terpisah.
- `npm run db:migrate:local`: migrasi diterapkan; pengulangan tidak memiliki
  migrasi tertunda.
- `npm ls --depth=0`: paket terpasang tanpa konflik dependensi.
- `git diff --check`

Tes memeriksa tabel kosong, nominal rupiah bulat dan batas integer aman,
foreign key, peserta lintas perjalanan pada insert dan update, pelunasan
kepada diri sendiri, serta penghapusan bagian biaya tanpa menghapus pelunasan.
Tes migrasi pertama gagal karena migrasi belum ada, lalu lulus setelah migrasi
dibuat. Constraint dalam draf yang sudah ada diperiksa melalui tes SQL.

Tidak menjalankan server aplikasi, browser, migrasi jarak jauh, atau deploy.
Tiket 2–8 tetap di luar lingkup pekerjaan ini.
