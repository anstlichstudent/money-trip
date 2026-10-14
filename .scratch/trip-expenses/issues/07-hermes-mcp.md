# Hubungkan Hermes melalui MCP

Status: needs-triage
Blocked by: 04

## Acuan

[Spesifikasi fitur](../spec.md), [spesifikasi teknis](../technical-spec.md), [catatan desain](../design-notes.md), dan [DESIGN.md](../../../DESIGN.md).

## Lingkup

- Buat endpoint /mcp dengan SDK resmi dan transport Web Request/Response Streamable HTTP tanpa sesi transport di memori Worker. Periksa API sesuai versi terpasang.
- Sediakan get_trip, preview_expense, create_expense, dan record_settlement. Gunakan operasi/perhitungan yang sama dengan web.
- Token pengelola khusus dibatasi satu perjalanan. MCP hanya membaca dan menambah; koreksi/hapus melalui web.
- Gunakan request_id pada operasi tambah. Tidak ada alur persetujuan tambahan; record_settlement tidak melakukan transfer uang.

## Kriteria selesai dan pemeriksaan

Tes token salah, batas perjalanan, kesamaan hasil web/MCP, validasi, dan pengulangan permintaan. Periksa koneksi Hermes nyata sebelum rilis; jangan mengklaim kompatibilitas hanya dari dokumentasi.
