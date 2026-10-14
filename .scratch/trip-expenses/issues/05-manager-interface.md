# Buat tampilan pengelola

Status: needs-triage
Blocked by: 04

## Acuan

[Spesifikasi fitur](../spec.md), [spesifikasi teknis](../technical-spec.md), [catatan desain](../design-notes.md), dan [DESIGN.md](../../../DESIGN.md).

## Lingkup

- Ikuti DESIGN.md dan catatan desain. Gunakan font lokal di public/fonts/fonts.css dan susunan satu kolom HP/desktop.
- Buat login, setup, overview, formulir pengeluaran, review, record payment, konfirmasi, koreksi/hapus, serta logout.
- Lengkapi loading, input salah, kegagalan koneksi, konflik versi, dan konfirmasi perubahan belum tersimpan. Pertahankan input saat gagal; jangan menimpa versi terbaru otomatis.
- Jika hasil simpan belum diketahui, pertahankan request_id/input untuk percobaan ulang manual setelah internet kembali. Tidak ada pencatatan offline atau antrean otomatis.

## Kriteria selesai dan pemeriksaan

Build dan tipe lulus; uji alur penyimpanan serta kegagalan yang penting. Terapkan label, fokus modal, dan kontrol yang dapat dipakai dengan keyboard. Server dan pemeriksaan browser dilakukan hanya setelah izin pengguna.
