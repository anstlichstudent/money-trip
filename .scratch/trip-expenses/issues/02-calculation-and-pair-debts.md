# Buat perhitungan biaya dan utang per pasangan

Status: needs-triage
Blocked by: 01

## Acuan

[Spesifikasi fitur](../spec.md), [spesifikasi teknis](../technical-spec.md), [catatan desain](../design-notes.md), dan [DESIGN.md](../../../DESIGN.md).

## Lingkup

- Buat fungsi murni untuk biaya bersama, item, diskon, pajak, biaya tambahan, dan pembulatan sesuai spec.md.
- Hitung utang hanya per pasangan. Pelunasan hanya mengubah pasangan pengirim dan penerima; jangan mengalihkan utang kepada pihak ketiga.
- Terima pembayaran berlebih, tanpa utang, dan berlawanan arah. Koreksi pengeluaran mempertahankan pelunasan. Pelunasan tidak dialokasikan ke pengeluaran tertentu.

## Kriteria selesai dan pemeriksaan

Tes seluruh contoh spesifikasi, subtotal nol, pembulatan, integer aman, siklus tiga peserta, utang/piutang bersamaan, pembayaran berlebih, serta koreksi setelah pelunasan. Total bagian sama dengan tagihan; total utang sama dengan piutang.
