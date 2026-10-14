# Buat operasi pengeluaran dan pelunasan

Status: needs-triage
Blocked by: 02, 03

## Acuan

[Spesifikasi fitur](../spec.md), [spesifikasi teknis](../technical-spec.md), [catatan desain](../design-notes.md), dan [DESIGN.md](../../../DESIGN.md).

## Lingkup

- Gunakan validasi dan perhitungan bersama untuk preview, tambah, koreksi, dan hapus. Seluruh input pengeluaran dapat dikoreksi; pelunasan dapat dikoreksi atau dihapus melalui web.
- Gunakan penyimpanan atomik, request_id, dan pemeriksaan versi. Pengulangan request_id/input yang sama mengembalikan hasil sebelumnya; input berbeda ditolak.
- Tampilkan preview dampak dan peringatan transfer tidak biasa. Jangan menyatakan sukses sebelum penyimpanan diketahui berhasil.
- Riwayat pengeluaran memakai waktu pencatatan terbaru; koreksi tidak mengubah urutan. Tidak ada input tanggal terpisah.

## Kriteria selesai dan pemeriksaan

Tes rollback, catatan ganda, konflik versi, input lintas perjalanan, koreksi/hapus setelah pelunasan, dan percobaan ulang setelah respons hilang. Catatan lama tidak menimpa versi baru.
