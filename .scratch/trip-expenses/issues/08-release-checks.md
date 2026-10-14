# Periksa kesiapan rilis

Status: needs-triage
Blocked by: 06, 07

## Acuan

[Spesifikasi fitur](../spec.md), [spesifikasi teknis](../technical-spec.md), [catatan desain](../design-notes.md), dan [DESIGN.md](../../../DESIGN.md).

## Lingkup

- Jalankan build, pemeriksaan tipe, dan tes yang ditetapkan pada tiket sebelumnya.
- Dengan izin pengguna, jalankan server dan periksa HP/desktop, modal panjang, login, perubahan data, serta penonton pada dua perangkat.
- Periksa koneksi Hermes, kegagalan penyimpanan/berbagi, dan bahwa produksi tidak berisi data contoh.
- Tetapkan akun, nama deployment, binding produksi, dan secret di luar repo saat diperlukan. Deploy hanya saat diminta.

## Kriteria selesai dan pemeriksaan

Catat hasil pemeriksaan dan batas yang belum diuji. Tidak ada klaim siap rilis jika build, akses, perhitungan uang, atau integrasi yang wajib masih gagal.
