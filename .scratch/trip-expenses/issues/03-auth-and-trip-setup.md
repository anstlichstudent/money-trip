# Buat akses dan setup perjalanan

Status: needs-triage
Blocked by: 01

## Acuan

[Spesifikasi fitur](../spec.md), [spesifikasi teknis](../technical-spec.md), [catatan desain](../design-notes.md), dan [DESIGN.md](../../../DESIGN.md).

## Lingkup

- Buat satu akun pengelola dari konfigurasi awal, login, sesi tujuh hari sejak login, logout, dan pemeriksaan akses server.
- Buat setup atomik untuk nama perjalanan dan tepat enam peserta. Tolak transaksi sebelum setup selesai.
- Daftar dapat diedit sebelum transaksi pertama dengan jumlah akhir enam; setelahnya hanya koreksi nama. Nama tidak mengubah identitas.
- Buat akses penonton baca saja melalui token permanen. Pisahkan token penonton, sesi, dan token MCP.

## Kriteria selesai dan pemeriksaan

Tes akses penonton, sesi kedaluwarsa/logout, setup ganda, daftar tidak berjumlah enam, serta konflik antara perubahan daftar dan transaksi pertama. Pastikan token dan secret tidak bocor ke respons atau log.
