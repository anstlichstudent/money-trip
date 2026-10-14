# Buat penonton, profil, struk, dan berbagi

Status: needs-triage
Blocked by: 05

## Acuan

[Spesifikasi fitur](../spec.md), [spesifikasi teknis](../technical-spec.md), [catatan desain](../design-notes.md), dan [DESIGN.md](../../../DESIGN.md).

## Lingkup

- Buat overview dan lima kartu profil tetap, termasuk keadaan kosong. Still owes dan Still to receive dapat positif bersamaan; Still to settle memakai utang per pasangan.
- Buat preview maksimal tiga pengeluaran, tabel View all, dan struk lengkap. Ambil data saat dibuka/kembali aktif atau Refresh, tanpa polling.
- Tautan struk memakai akses penonton permanen dan versi terbaru; pengeluaran yang dihapus menampilkan catatan tidak tersedia.
- WhatsApp membagikan teks/tautan dan Save image mengekspor struk lengkap, hanya setelah berhasil simpan. Pilih teknik ekspor terkecil yang memenuhi hasil tersebut.
- Berbagi gagal dapat dicoba ulang tanpa menyimpan pengeluaran atau mencatat pelunasan lagi. Gambar yang sudah dibagikan tidak berubah setelah koreksi.

## Kriteria selesai dan pemeriksaan

Tes saldo per pasangan, akses baca, tiga preview, struk versi terbaru/dihapus, dan berbagi ulang tanpa catatan ganda. Periksa struk panjang, nama panjang, fokus modal, dan ekspor gambar melalui browser setelah izin.
