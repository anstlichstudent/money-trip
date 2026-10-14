# Keuangan Perjalanan

Pencatatan biaya perjalanan dan utang antar peserta.

## Language

**Utang per pasangan**:
Kewajiban pembayaran antara dua peserta yang berasal dari bagian biaya perjalanan. Piutang adalah kewajiban yang sama dari sudut pandang penerima.
_Avoid_: saran transfer saldo global

**Pemotongan utang per pasangan**:
Pengurangan utang yang berlawanan antara dua peserta yang sama sehingga hanya selisihnya yang tersisa. Utang atau piutang terhadap peserta lain tetap terpisah.
_Avoid_: penggabungan saldo perjalanan

**Still owes**:
Jumlah sisa utang seorang peserta kepada semua pihak setelah pemotongan per pasangan dan pelunasan.

**Still to receive**:
Jumlah sisa piutang seorang peserta dari semua pihak setelah pemotongan per pasangan dan pelunasan. Nilainya dapat positif bersamaan dengan Still owes.

**Still to settle**:
Jumlah seluruh sisa utang antar pasangan dalam perjalanan, dengan setiap kewajiban dihitung sekali.

**Pelunasan**:
Catatan transfer uang yang sudah dilakukan dari satu peserta ke peserta lain dalam perjalanan, termasuk saat tidak ada utang atau arah transfer berlawanan dengan utang. Catatan ini hanya mengubah utang pasangan pengirim dan penerima.
_Avoid_: transfer otomatis

**Pembayaran berlebih**:
Pelunasan yang melebihi sisa utang pengirim kepada penerima. Kelebihannya menjadi utang penerima kepada pengirim.

**Peserta**:
Satu dari enam orang dalam perjalanan yang dapat membayar atau menanggung biaya. Koreksi nama tidak mengubah identitas atau riwayat peserta.

**Setup perjalanan**:
Penetapan nama perjalanan dan enam peserta oleh pengelola sebelum transaksi pertama.
