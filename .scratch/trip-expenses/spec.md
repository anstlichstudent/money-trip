# Spesifikasi Keuangan Perjalanan

## Tujuan

Aplikasi web untuk mencatat biaya perjalanan enam orang. Satu pengelola mencatat pengeluaran dan pelunasan. Semua peserta bisa melihat hasil melalui tautan tanpa akun.

## Koneksi

Aplikasi memerlukan koneksi internet. Jika koneksi putus setelah permintaan simpan dikirim, jangan menyatakan gagal atau berhasil sebelum hasil diketahui. Setelah terhubung kembali, periksa atau ulangi permintaan yang sama dengan kunci yang sama agar tidak membuat catatan ganda. Versi awal tidak menyediakan pencatatan offline atau antrean penyimpanan otomatis ketika koneksi kembali.

## Akses

- Satu akun pengelola dapat menambah, mengubah, dan menghapus catatan.
- Tidak ada pendaftaran akun peserta atau fitur pemulihan kata sandi.
- Sesi login pengelola berlaku tujuh hari sejak login. Logout langsung mengakhiri sesi tersebut.
- Siapa pun yang memiliki tautan penonton dapat melihat rincian perjalanan. Tautan ini tidak memberi hak mengubah data. Tautan penonton bersifat permanen: tidak kedaluwarsa, tidak diganti, dan tidak memiliki fitur pembatalan akses.
- Halaman penonton mengambil data saat dibuka atau kembali aktif. Tombol Perbarui mengambil perubahan tanpa memuat ulang halaman. Tidak ada pengambilan data berkala untuk menghemat permintaan.

## Perjalanan dan Peserta

- Versi awal menyediakan satu perjalanan dengan enam peserta bernama.
- Pengeluaran, peserta, dan pelunasan terhubung ke perjalanan. Penambahan perjalanan lain merupakan pekerjaan berikutnya.
- Perjalanan produksi dimulai tanpa peserta atau transaksi contoh. Nama dan transaksi pada desain hanya untuk contoh dan pengujian.
- Saat pertama masuk, pengelola mengisi nama perjalanan dan tepat enam peserta melalui halaman setup. Pencatatan pengeluaran dan pelunasan hanya tersedia setelah setup selesai.
- Setelah transaksi pertama, daftar enam peserta tetap. Nama peserta boleh dikoreksi tanpa mengubah identitas atau riwayatnya; penambahan dan penghapusan peserta belum tersedia pada versi awal.
- Sebelum transaksi pertama, peserta dapat diganti, ditambah, atau dihapus selama hasil akhirnya tetap tepat enam peserta. Setelah transaksi pertama, hanya koreksi nama yang tersedia.
- Nama perjalanan dapat diubah setelah setup.

## Pengeluaran

Setiap pengeluaran memiliki nama, pembayar, nominal, dan pembagian biaya.

- Biaya bersama dibagi rata kepada peserta yang dipilih.
- Makanan atau barang dicatat per baris: nama menu, harga satuan, jumlah pesanan, dan peserta yang menanggung.
- Jumlah pesanan bisa diubah, misalnya menjadi dua atau tiga untuk menu yang sama.
- Satu baris yang ditanggung beberapa peserta dibagi rata kepada peserta tersebut. Jika jumlah pesanan mereka berbeda, gunakan baris terpisah.
- Diskon opsional berlaku untuk menu tertentu atau seluruh tagihan, dalam persen atau nominal rupiah.
- Pajak dan service charge atau biaya tambahan bersifat opsional, dalam persen atau nominal rupiah.

## Aturan Hitung

1. Kalikan harga satuan dengan jumlah pesanan untuk setiap baris.
2. Kurangi diskon menu sebelum membagi biaya baris kepada peserta.
3. Bagikan diskon seluruh tagihan sesuai nilai belanja setiap peserta setelah diskon menu.
4. Hitung pajak dan service charge dari subtotal setelah semua diskon. Keduanya memakai dasar yang sama.
5. Bagikan pajak dan service charge sesuai nilai belanja setiap peserta setelah diskon. Nominal dari struk dapat dimasukkan langsung jika dasar hitung struk berbeda.
6. Tampilkan total akhir dan bagian setiap peserta sebelum menyimpan.

Total bagian peserta harus sama dengan total tagihan. Harga dan nominal input harus berupa rupiah bulat. Persentase menerima maksimal dua angka desimal. Simpan nominal rupiah sebagai bilangan bulat. Bagikan sisa pembulatan secara tetap agar hasil hitung tidak berubah tanpa perubahan data.

Tolak jumlah pesanan yang bukan bilangan bulat positif, nominal negatif, diskon yang melebihi biaya terkait, dan pembagian tanpa peserta. Jika subtotal setelah diskon nol, pajak dan biaya tambahan juga harus nol karena tidak ada dasar pembagian proporsional.

## Saldo dan Pelunasan

- Bagian biaya peserta selain pembayar menjadi utang peserta tersebut kepada pembayar. Bagian pembayar sendiri tidak membuat utang.
- Gabungkan utang dari seluruh pengeluaran untuk setiap pasangan peserta. Potong utang yang berlawanan hanya antara dua peserta yang sama; tampilkan sisanya.
- Jangan menggunakan piutang dari peserta lain untuk mengurangi utang atau mengalihkan tujuan pembayaran. Jangan menghapus siklus utang antara tiga peserta atau lebih.
- `Still owes` adalah jumlah sisa utang peserta kepada semua pihak; `Still to receive` adalah jumlah sisa piutang dari semua pihak. Keduanya dapat bernilai lebih dari nol secara bersamaan. Peserta yang lunas menampilkan Rp0 pada keduanya.
- `Still to settle` adalah jumlah seluruh sisa utang setelah pemotongan per pasangan; nilainya sama dengan jumlah seluruh sisa piutang.
- `Who does … owe?` dan `Who owes …?` menampilkan pihak serta sisa utang per pasangan. Rincian pengeluaran menjelaskan asal utang; pemotongan utang berlawanan dan pelunasan menjelaskan perubahan menuju nilai tersisa.
- Contoh: Ina berutang kepada Udi Rp100.000 dan Udi berutang kepada Ina Rp40.000. Ina masih perlu membayar Udi Rp60.000. Jika Andi juga berutang kepada Ina Rp30.000, profil Ina menampilkan `Still owes` Rp60.000 dan `Still to receive` Rp30.000.
- Pengelola mencatat pengirim, penerima, dan nominal pelunasan. Pengirim dan penerima harus berbeda; nominal harus positif.
- Pengelola dapat mengubah atau menghapus catatan pelunasan melalui web untuk memperbaiki kesalahan. Tampilkan preview dampak dan konfirmasi sebelum menyimpan perubahan atau menghapus.
- Pengelola dapat mengubah seluruh isi pengeluaran tersimpan, termasuk pembayar dan peserta yang menanggung biaya. Tampilkan preview dampak pada utang per pasangan sebelum simpan; pelunasan tetap tercatat.
- Pelunasan terpisah dari pengeluaran. Perubahan atau penghapusan pengeluaran menghitung ulang saldo tanpa menghapus pelunasan.

Pelunasan hanya mengubah total utang antara pengirim dan penerima, tanpa memilih atau mengalokasikan pembayaran ke pengeluaran tertentu. Contoh: utang Ina kepada Udi Rp60.000, lalu Ina membayar Rp20.000, menyisakan utang Rp40.000. Utang kepada pihak lain tetap.

Pembayaran berlebih tetap dicatat sesuai transfer yang sudah terjadi. Jika Ina membayar Udi Rp80.000 untuk utang Rp60.000, Udi menjadi berutang kepada Ina Rp20.000. Tampilkan peringatan dan hasil perubahan sebelum simpan; jangan memotong nominal pembayaran menjadi batas utang. Web dan MCP memakai aturan yang sama.

Transfer yang sudah terjadi tetap dapat dicatat saat tidak ada utang atau arahnya berlawanan dengan utang. Tampilkan peringatan dan preview sebelum simpan. Jika Ina tidak berutang kepada Udi lalu mentransfer Rp20.000, Udi menjadi berutang kepada Ina Rp20.000. Jika Udi sebelumnya berutang Rp30.000 kepada Ina, transfer tersebut membuat utangnya menjadi Rp50.000.

Perubahan atau penghapusan pengeluaran tidak menghapus pelunasan. Hitung ulang utang per pasangan dari catatan yang tersisa dan tampilkan dampaknya sebelum simpan atau hapus. Jika Ina sudah membayar Udi Rp60.000 lalu utang awal dikoreksi menjadi Rp40.000, Udi menjadi berutang kepada Ina Rp20.000.

## Tampilan dan Alur

Utamakan penggunaan dari HP. Desktop memakai tampilan satu kolom dengan lebar konten dibatasi; tidak memerlukan desain desktop terpisah. Semua teks antarmuka memakai bahasa Inggris. Rincian tampilan dan keputusan desain ada di [catatan desain](design-notes.md).

1. Pengelola masuk dan mengisi nama perjalanan serta enam peserta.
2. Pengelola membagikan tautan penonton.
3. Header halaman utama menampilkan nama perjalanan, total pengeluaran, jumlah peserta, jumlah pengeluaran, dan jumlah yang masih perlu dilunasi. Tidak ada kartu Trip summary terpisah.
4. Isi halaman utama menampilkan enam kartu peserta, Trip expenses, dan Payment history. Tombol Refresh ada di bawah. Tidak ada daftar saran transfer tersendiri pada overview publik.
5. Kartu peserta membuka profil dengan lima kartu tetap: Who does … owe?, Who owes …?, How this adds up, … expense share, dan Payment history. Kartu tetap muncul saat kosong. Refresh ada di bawahnya.
6. Trip expenses dan expense share menampilkan maksimal tiga pengeluaran. View all membuka modal tabel riwayat. Memilih pengeluaran pada Trip expenses, termasuk tabel riwayatnya, membuka modal struk lengkap.
7. Pengelola menambah pengeluaran, memeriksa struk dan pembagian, lalu menyimpan. Tujuan pembayaran untuk pengeluaran tersebut dan bagian setiap peserta terlihat jelas pada struk.
8. Setelah penyimpanan berhasil, modal menampilkan struk lengkap yang sama dengan status Saved. Dua tombol berbagi adalah WhatsApp dan Save image. Tidak ada tombol berbagi sebelum simpan.
9. Pengelola memilih pengirim, penerima, dan nominal pelunasan setelah transfer dilakukan. Halaman Record payment menampilkan perubahan saldo sebelum dicatat. Setelah berhasil, halaman konfirmasi menampilkan nominal, arah pembayaran, dan saldo terbaru; overview dan Payment history diperbarui.

Riwayat pengeluaran menampilkan catatan terbaru berdasarkan waktu pencatatan. Koreksi tidak mengubah urutannya. Versi awal tidak menyediakan input tanggal pengeluaran terpisah.

Jika catatan telah diubah dari tab lain, tolak penyimpanan atau penghapusan dari versi lama dan minta pengelola mengambil versi terbaru. Pertahankan isian yang belum tersimpan agar dapat diperiksa; jangan menerapkannya otomatis ke versi terbaru.

Jika formulir memiliki perubahan yang belum tersimpan, minta konfirmasi sebelum menutup atau berpindah halaman.

## Struk dan Berbagi

- Struk memakai data pengeluaran tersimpan: nama, pembayar, item atau biaya, diskon, pajak, biaya tambahan, total, dan bagian peserta sesuai jenis pengeluaran.
- Pembagian ditampilkan di bagian atas dengan penekanan visual. Bagian pembayar sendiri ditandai Own share; tidak dibuat sebagai pembayaran kepada dirinya sendiri.
- Tujuan pembayaran pada struk berlaku untuk pengeluaran itu saja. Daftar pembayaran pada profil memakai sisa utang per pasangan untuk seluruh perjalanan. Keduanya tidak boleh dianggap sebagai dua kewajiban yang harus dibayar sekaligus.
- WhatsApp membagikan teks dan tautan struk, bukan mengirim gambar secara otomatis. Save image menyimpan gambar struk.
- Tautan struk selalu menampilkan versi terbaru pengeluaran tersimpan. Gambar yang sudah dibagikan tetap berisi versi saat dibuat. Jika pengeluaran dihapus, tautan menampilkan bahwa catatan tidak tersedia.
- Tautan struk hanya memberi akses baca dan tunduk pada akses penonton perjalanan. Pengiriman WhatsApp tetap dipilih oleh pengguna.
- Jika WhatsApp atau Save image gagal setelah penyimpanan berhasil, pengeluaran tetap tersimpan. Struk dapat dibuka kembali untuk mencoba berbagi tanpa menyimpan ulang atau membuat pengeluaran baru.
- Berbagi dan menyimpan gambar tidak membuat pelunasan. Hanya pencatatan pelunasan oleh pengelola yang mengubah saldo.

## Contoh Pemeriksaan

- Dua kopi dengan harga satuan Rp15.000 menghasilkan biaya Rp30.000.
- Menu bersama Rp20.000 untuk dua peserta menghasilkan bagian Rp10.000 per peserta.
- Belanja Andi Rp60.000 dan Budi Rp40.000, dengan diskon tagihan Rp10.000, menghasilkan bagian Rp54.000 dan Rp36.000 sebelum pajak.
- Pajak 10% dan service charge 5% atas Rp90.000 menghasilkan total Rp103.500. Bagian Andi Rp62.100 dan Budi Rp41.400.
- Biaya Rp10.000 untuk tiga peserta harus tetap menghasilkan total bagian Rp10.000 setelah pembulatan.
- Jika Andi membayar Rp100.000 dan bagiannya Rp40.000, ia perlu menerima Rp60.000. Pelunasan masuk Rp35.000 mengurangi sisa penerimaannya menjadi Rp25.000.
- Akses penonton harus menolak setiap permintaan untuk mengubah data, termasuk permintaan langsung di luar tampilan aplikasi.

## Batas Versi Awal

Belum mencakup kas bersama, pinjaman terpisah, pembayaran otomatis, akun peserta, pemulihan kata sandi, atau pengelolaan beberapa perjalanan. Teknologi dan hosting dijelaskan dalam [spesifikasi teknis](technical-spec.md). Desain awal sudah dibuat di Pencil; status dan batasnya dijelaskan dalam [catatan desain](design-notes.md).

## Input melalui Hermes

MCP menyediakan tools bagi Hermes untuk membaca data serta menambah pengeluaran dan pelunasan. Aplikasi memvalidasi dan menghitung data yang disimpan. Cara Hermes berpikir dan menjalankan percakapan berada di luar lingkup spesifikasi ini.
