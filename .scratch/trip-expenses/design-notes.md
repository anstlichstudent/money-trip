# Keputusan Desain Keuangan Perjalanan

Status: desain awal di Pencil. Belum diimplementasikan sebagai aplikasi.

Dokumen ini mencatat hasil sesi desain, perubahan terhadap [spesifikasi fitur](spec.md), dan pekerjaan yang belum selesai. [Spesifikasi teknis](technical-spec.md) tetap mengatur akses, penyimpanan, dan perhitungan.

## Sumber Desain

- Dokumen Pencil aktif: `/home/anstlich/Projects/rpl/brida-ojs-09/untitled.pen`.
- Foundation: `t7f4ha`, Terms / 01 Foundations.
- Komponen: `x4RNl3`, Terms / 02 Components.
- Akses file `.pen` melalui Pencil MCP. Node ID di bawah adalah referensi canvas, bukan route aplikasi.
- Node dan posisi dapat berubah saat canvas diedit. Baca ulang sebelum mengubah desain.

## Bahasa dan Gaya

- Semua teks antarmuka memakai bahasa Inggris. Nominal tetap dalam rupiah bulat.
- Utamakan HP. Layar awal memakai lebar 390 px.
- Gunakan warna canvas `#FEFCFB`, surface `#FFFFFF`, ink `#161512`, body `#555555`, wine `#3A0303`, dan peach `#F7C4B2` dari foundation.
- Font implementasi: Geist untuk antarmuka dan Geist Mono untuk label kecil, tabel tertentu, dan struk. File Google Fonts serta lisensinya tersedia di `public/fonts/`. Pencil tetap menjadi acuan visual dengan font Diatype aslinya.
- Kartu utama: radius 24 px, padding 24 px, border ringan. Kartu kecil di dalam daftar utang: radius 16 px dan latar control.
- Header overview dan profil: wine, selebar layar, sudut siku. Isi halaman memakai kartu putih dan jarak 16 px.
- Kartu peserta dibuat besar, satu kolom. Nama, Still owes, dan Still to receive terlihat jelas.
- Kartu peserta penerima uang memakai wine; kartu peserta yang perlu membayar memakai putih. Warna bukan satu-satunya penanda; label dan nominal tetap tampil.
- Struk: kertas putih, sudut hampir siku, font mono, nominal rata kanan, dan garis pemisah sederhana. Pembagian memakai latar peach; tujuan pembayaran memakai wine.
- Tombol utama memakai wine. Tombol sekunder memakai control atau outline. Gunakan nama aksi, bukan ikon saja.

## Overview Publik dan Admin

Header menampilkan nama app, nama perjalanan, total pengeluaran, jumlah peserta, jumlah pengeluaran, dan Still to settle. Trip summary tidak menjadi kartu tersendiri.

Ringkasan keuangan dibuat sebagai satu kelompok: satu divider, total rata kiri, jumlah peserta dan pengeluaran dalam satu baris, serta Still to settle di bawah. Desain terakhir memperbesar total menjadi 46 px dan nominal Still to settle menjadi 28 px. Jarak antarbaris dipadatkan.

Urutan isi halaman:

1. Enam kartu peserta. Memilih kartu membuka profil peserta.
2. Trip expenses: preview riwayat pengeluaran, maksimal tiga baris, lalu View all.
3. Payment history: riwayat pelunasan, dengan pesan kosong jika belum ada.
4. Refresh di bawah kartu-kartu tersebut.

Overview publik hanya memberi akses baca. Daftar “Siapa bayar siapa?” / Suggested transfers (`Jp9Bl`) telah dihapus dari overview publik. Rincian pihak yang perlu dibayar atau diterima berada pada profil.

Overview admin memakai tampilan yang sama, dengan tambahan:

- Label Manager di bawah nama app.
- Share link berupa tombol outline di kanan atas header.
- Add expense dan Record payment pada area aksi header.
- Record payment juga tersedia dari Payment history.

Warna Share link belum dipilih ulang setelah pengguna memberi masukan tentang warnanya. Canvas terakhir memakai outline peach dan teks terang; jangan menganggap pilihan warna baru sudah disetujui.

## Profil Peserta

Setiap profil harus menampilkan lima kartu dengan urutan yang sama, baik berisi data maupun kosong:

1. Who does [name] owe?
2. Who owes [name]?
3. How this adds up
4. [name]’s expense share
5. Payment history

Refresh berada di bawah lima kartu. Header menampilkan nama peserta, perjalanan, Still owes, dan Still to receive.

Kedua kartu Who owes memakai gaya yang sama: judul, kartu pihak, status pembayaran, nominal, rincian biaya kecil, dan total. Rincian biaya menampilkan nama pengeluaran, bagian biaya peserta, dan pembayar awal. Kartu kosong menyatakan tidak ada pihak serta Rp0.

How this adds up menjelaskan asal utang per pasangan, pemotongan utang berlawanan, dan pelunasan; bagian biaya serta biaya yang dibayar tetap dapat diperiksa. Expense share memakai gaya preview yang sama dengan Trip expenses: maksimal tiga baris dan View all. Payment history selalu ada.

Tidak ada kartu tambahan “After combining balances”. Node `EoSFG` sudah dihapus atas permintaan pengguna.

### Keputusan Saldo Setelah Klarifikasi

Pengguna memilih pemotongan utang per pasangan. Utang berlawanan hanya dipotong antara dua peserta yang sama. Piutang dari peserta lain tidak mengurangi utang atau mengubah tujuan pembayaran.

- Still owes menjumlahkan sisa utang kepada semua pihak; Still to receive menjumlahkan sisa piutang dari semua pihak. Keduanya dapat positif bersamaan.
- Daftar pihak mengikuti sisa utang per pasangan, bukan pemasangan berdasarkan saldo total perjalanan.
- Contoh: Ina perlu membayar Udi Rp60.000 setelah pemotongan, sementara Andi perlu membayar Ina Rp30.000. Ina menampilkan kedua nominal tersebut sekaligus.
- Rincian pengeluaran menjelaskan asal biaya. UI perlu menjelaskan pemotongan dan pelunasan agar sisa utang dapat diperiksa.
- Contoh Rina dengan utang Rp250.000 dan piutang Rp150.000 hanya sah jika pihaknya berbeda. Jika keduanya terhadap pihak yang sama, tampilkan sisa Rp100.000. Pihak dalam contoh canvas perlu diperiksa sebelum dipakai sebagai data uji.
- Nama Rina adalah contoh terpisah, bukan peserta ketujuh dalam perjalanan utama.

## Riwayat dan Modal Struk

- Trip expenses adalah riwayat pengeluaran. Payment history adalah riwayat pelunasan; keduanya tetap terpisah.
- Trip expenses dan expense share memakai kartu preview yang sama: nama pengeluaran, Paid by, nominal rata kanan, divider, dan View all.
- View all membuka modal tabel dengan kolom Expense, Paid by, dan Amount untuk perjalanan; kolom terakhir menjadi Share untuk profil peserta.
- Modal menampilkan jumlah catatan, total, serta kontrol penutup. Semua catatan tersedia, meskipun preview hanya tiga baris.
- Memilih baris pada Trip expenses, termasuk tabel View all, membuka modal struk lengkap. Baris preview memiliki chevron; nama pengeluaran pada tabel menjadi penanda aksi.
- Struk menampilkan pembayar awal, tujuan pembayaran untuk pengeluaran itu, pembagian peserta, item atau biaya, diskon/pajak/biaya tambahan yang berlaku, dan total.
- Struk riwayat memiliki status Saved, kontrol kembali ke riwayat, serta WhatsApp dan Save image.
- Modal perlu bisa digulir pada HP. Desain canvas menampilkan konten lengkap, bukan batas viewport saat modal dijalankan.

Tujuan pembayaran pada struk menjelaskan pengeluaran tersebut saja. Profil menjelaskan sisa utang per pasangan dari seluruh perjalanan. Jangan menampilkan keduanya sebagai pembayaran tambahan yang terpisah.

## Input, Review, Simpan, dan Berbagi Pengeluaran

1. Pilih Items atau Shared cost; isi nama pengeluaran dan pembayar.
2. Tambahkan item, harga, jumlah, peserta yang menanggung, diskon, pajak, dan service charge sesuai kebutuhan.
3. Review receipt menampilkan struk lengkap sebelum simpan.
4. Tujuan pembayaran ada di atas dengan highlight wine. Pembagian berada dekat bagian atas dengan highlight peach dan nominal besar. Bagian pembayar sendiri berlabel Own share.
5. Struk sebelum simpan berstatus Draft / Not saved. Tidak ada tombol berbagi pada tahap ini.
6. Save expense menyimpan catatan. Setelah berhasil, buka modal Expense saved.
7. Modal memakai struk lengkap yang sama. Hanya status Draft berubah menjadi Saved; item, biaya, pembagian, dan tujuan pembayaran tetap ada.
8. Dua tombol aksi di modal setelah simpan: WhatsApp dan Save image.

Keputusan berbagi yang sudah dikonfirmasi:

- WhatsApp membagikan **teks dan tautan struk**.
- Save image menyimpan **gambar struk lengkap**.
- Berbagi tidak mengirim uang dan tidak membuat pelunasan.
- Share link pada overview membagikan akses penonton perjalanan; ini berbeda dari berbagi satu struk. Tautan penonton permanen tanpa kedaluwarsa, penggantian, atau pembatalan akses. Tidak ada tombol untuk mengganti tautan.
- Tautan struk tetap tunduk pada akses baca perjalanan. Teknik ekspor gambar dan perilaku WhatsApp belum diimplementasikan.

Desain awal Share receipt / WhatsApp sebelum simpan sudah diganti oleh alur setelah simpan. Preview struk pendek pada modal juga sudah diganti oleh struk lengkap.

## Pencatatan Pelunasan

Record payment memiliki pengirim, penerima, nominal rupiah, dan preview saldo setelah pencatatan. Hanya transfer yang sudah dilakukan yang dicatat. Pengirim dan penerima berbeda; nominal positif. Pelunasan sebagian mengurangi utang pasangan pengirim dan penerima saja. Pembayaran berlebih tetap dicatat dan membalik arah utang sebesar kelebihannya; tampilkan peringatan serta preview kedua indikator sebelum simpan.

Setelah simpan berhasil:

- Tampilkan Payment recorded dengan tanda berhasil beraksen peach, nominal besar di tengah, dan arah pengirim → penerima.
- Tampilkan saldo terbaru dalam dua kolom.
- Back to overview menjadi tombol utama; Record another payment menjadi aksi sekunder.
- Perbarui kartu peserta, Still to settle, dan Payment history.
- Tidak ada transfer uang otomatis.

Contoh desain: Citra membayar Andi Rp200.000. Citra menjadi Rp0, Andi masih perlu menerima Rp100.000, dan Still to settle turun dari Rp450.000 menjadi Rp250.000. Contoh overview setelah pembayaran dibuat sebagai layar terpisah.

### Koreksi Catatan dan Transfer Tidak Biasa

Transfer yang sudah terjadi dapat dicatat meskipun tidak ada utang atau arahnya berlawanan dengan utang. Tampilkan peringatan dan preview sisa utang sebelum simpan. Perubahan atau penghapusan pengeluaran mempertahankan pelunasan; tampilkan dampaknya, termasuk pembalikan arah utang, sebelum konfirmasi.

## Setup Pertama

Setelah login pertama, pengelola mengisi nama perjalanan dan tepat enam peserta. Transaksi baru tersedia setelah setup berhasil. Nama perjalanan dan peserta dapat dikoreksi tanpa mengubah identitas atau riwayat peserta. Sebelum transaksi pertama, daftar dapat diedit dengan jumlah akhir tetap enam peserta. Setelah transaksi pertama, daftar peserta tetap.

Pelunasan tidak memilih pengeluaran tertentu. Rincian pengeluaran tetap menunjukkan asal utang; status pembayaran dan sisa utang berlaku untuk total pasangan, bukan setiap baris pengeluaran.

### Koreksi Pelunasan

Pengelola dapat mengubah pengirim, penerima, dan nominal atau menghapus catatan pelunasan melalui web. Tampilkan preview dampak dan konfirmasi sebelum perubahan disimpan atau catatan dihapus. MCP tetap hanya membaca dan menambah catatan. Desain alur koreksi ini perlu dilengkapi.

### Kegagalan Berbagi

Jika pengeluaran berhasil disimpan tetapi WhatsApp atau Save image gagal, struk tetap berstatus Saved. Pengguna dapat mencoba berbagi kembali dari struk tersebut tanpa menyimpan pengeluaran ulang.

## Login

- Satu akun pengelola, dengan Username, Password, Show password, dan Sign in.
- Pesan salah kredensial bersifat umum: “The username or password is incorrect. Try again.”
- Pengelola tetap dibuat melalui konfigurasi awal. Username produksi belum dipilih.
- Tidak ada sign up, pemulihan kata sandi, atau akun peserta.
- Sesi login berlaku tujuh hari sejak login; logout langsung mengakhiri sesi.
- Penonton membuka tautan perjalanan tanpa login.

## Referensi Node

### Komponen Reusable

Library komponen berada pada node `ApV8W` (Money / Component library). Layar utama tetap frame biasa. Bagian yang berulang memakai instance dari 24 komponen utama dengan nama `Component / …`.

Library mencakup kartu peserta, baris tujuan pembayaran, input teks/password, tombol teks/ikon, ringkasan perjalanan, preview pengeluaran dua/tiga baris, Refresh, struk, Payment history kosong, ringkasan saldo profil, kartu utang kosong/berisi, perhitungan saldo, tabel riwayat, tombol berbagi struk, dan dialog riwayat. Varian mempertahankan struktur dan isi desain yang ada.

Sebanyak 125 bagian pada canvas diganti menjadi instance yang terhubung. ID layar utama tetap, tetapi ID bagian di dalam layar berubah. Referensi node bagian pada tabel di bawah adalah referensi sebelum perubahan komponen; cari berdasarkan nama atau baca struktur layar terbaru melalui Pencil MCP. Edit komponen utama dalam library untuk memperbarui instance. Data atau gaya yang berbeda pada instance memakai override.

### Layar Utama

| Layar | Node |
| --- | --- |
| Overview admin | `mj2vF` |
| Overview publik | `UFokJ` |
| Input pengeluaran | `wvBjV` |
| Review receipt | `OdTLj` |
| Modal struk setelah simpan | `C43wn3` |
| Record payment | `WeBbx` |
| Payment recorded | `gBbjK` |
| Overview setelah pelunasan contoh | `lnB0i` |
| Sign in | `XZXLK` |
| Sign in error | `u01AN2` |

### Profil dan Riwayat Peserta

| Peserta | Profil | Modal expense share |
| --- | --- | --- |
| Andi | `y5lZ3D` | `u6WY0` |
| Budi | `zTHS9` | `z9wJ8r` |
| Citra | `jtltb` | `iJia0` |
| Dini | `mVS7q` | `a3DZvl` |
| Eka | `QsQDQ` | `R55kDa` |
| Fajar | `Q19s7y` | `mQ7KN` |
| Rina, contoh terpisah | `rFupd` | `IlWVY` |

### Riwayat dan Struk

| Desain | Node |
| --- | --- |
| Modal tabel Trip expenses | `QM1ky` |
| Modal struk Lunch | `z0xa7` |
| Modal struk Car rental | `S7tAs` |
| Modal struk Entry tickets | `f8Hk0` |
| Ringkasan keuangan publik | `cu66C`, dengan `b3LrP` di dalamnya |
| Kartu peserta publik | `rWTnE` |
| Who does Citra owe? | `edX03` |
| Who owes Andi? | `xnnvy` |

## Batas dan Pekerjaan Berikutnya

- Semua layar merupakan desain. Navigasi, modal, login, penyimpanan, refresh, WhatsApp, dan ekspor gambar belum berfungsi.
- Screenshot dan bounds diperiksa melalui Pencil. Ini bukan pengujian browser atau aksesibilitas lengkap. Server dan browser tidak dijalankan.
- Angka pada canvas adalah contoh visual, bukan fixture uji. Contoh Car rental Rp600.000 dibagi Rp500.000/Rp100.000 tidak sesuai aturan Shared cost yang dibagi rata; ubah contoh menjadi Rp300.000/Rp300.000 sebelum menjadikannya fixture. Pembagian rata tetap berlaku.
- Periksa pihak pada contoh Rina: potong menjadi Rp100.000 hanya jika utang dan piutang terhadap pihak yang sama. Jika pihak berbeda, tampilkan keduanya.
- Overview contoh setelah pelunasan adalah salinan keadaan setelah simpan; perubahan gaya berikutnya perlu diterapkan juga pada salinan ini.
- Belum ada desain lengkap untuk setup nama perjalanan/peserta, ubah/hapus catatan, konflik versi, loading, kegagalan koneksi, logout, atau kegagalan berbagi. Hak ubah/hapus dari spesifikasi awal tetap berlaku.
- Desktop memakai susunan satu kolom yang sama, dengan lebar konten dibatasi. Desain desktop terpisah tidak diperlukan. Tabel dan modal panjang tetap perlu diperiksa saat implementasi.
- Teknik dan keamanan tautan struk mengikuti spesifikasi teknis. Pemilihan paket atau API belum dilakukan dalam sesi desain.

## Perubahan terhadap Spesifikasi Awal

| Bagian | Hasil sesi desain |
| --- | --- |
| Bahasa UI | Semua layar memakai Inggris |
| Overview | Summary di header; kartu peserta besar; tidak ada daftar transfer terpisah pada publik |
| Profil | Lima kartu tetap, termasuk keadaan kosong, lalu Refresh |
| Saldo | Pemotongan utang per pasangan; utang dan piutang terhadap pihak berbeda tetap tampil bersamaan |
| Riwayat | Preview maksimal tiga pengeluaran; View all membuka tabel modal |
| Detail pengeluaran | Trip expenses membuka struk lengkap |
| Review | Gaya struk; pembagian dan penerima pembayaran ditonjolkan |
| Berbagi | Fitur baru: WhatsApp berisi teks/tautan; Save image berisi gambar; tersedia setelah simpan |
| Pelunasan | Form, konfirmasi, dan contoh overview sesudah pembayaran ditambahkan |
| Login | Form serta contoh kesalahan kredensial dibuat |

Teknologi, aturan pembulatan, validasi nominal, akses penonton, dan pemisahan pengeluaran/pelunasan tidak diganti oleh perubahan desain ini.

## Persiapan Implementasi yang Disepakati

- Desain yang belum lengkap untuk setup, koreksi/hapus, logout, loading, dan kegagalan dibuat saat implementasi; tidak memerlukan sesi desain Pencil terpisah terlebih dahulu.
- Gunakan `DESIGN.md` di root sebagai acuan sistem visual. Spesifikasi fitur mengatur perilaku dan perhitungan; contoh Pencil dan prototipe tidak menggantikan aturan tersebut.
- Formulir yang berubah dan belum tersimpan meminta konfirmasi sebelum ditutup atau ditinggalkan.
- Nama dan transaksi contoh hanya untuk desain dan pengujian. Produksi dimulai tanpa data contoh; pengelola mengisi perjalanan dan enam peserta melalui setup.

## Koreksi Pengeluaran dan Versi Struk

- Pengelola dapat mengubah seluruh input pengeluaran, termasuk pembayar dan peserta yang menanggung. Preview menunjukkan dampak pada utang per pasangan; pelunasan tetap tercatat.
- Harga dan nominal memakai rupiah bulat. Persentase menerima maksimal dua angka desimal.
- Tautan struk menunjukkan versi terbaru. Gambar yang sudah dibagikan tidak berubah. Jika catatan dihapus, tautan menunjukkan bahwa catatan tidak tersedia.

## Koneksi, Riwayat, dan Konflik

- Aplikasi memerlukan internet; tidak ada pencatatan offline atau antrean penyimpanan otomatis.
- Pengeluaran terbaru berdasarkan waktu pencatatan tampil paling atas. Koreksi tidak mengubah urutan. Tidak ada input tanggal pengeluaran terpisah pada versi awal.
- Konflik versi menolak penyimpanan atau penghapusan dari data lama. Minta pengelola mengambil versi terbaru dan pertahankan isian yang belum tersimpan untuk diperiksa tanpa menimpakannya otomatis.

## Penyimpanan Tanpa Respons

Jika internet terputus setelah permintaan dikirim, tampilkan bahwa hasil belum dapat dipastikan. Pertahankan input dan identitas permintaan untuk percobaan ulang setelah terhubung kembali, tanpa membuat catatan ganda. Jangan menampilkan Saved atau tombol berbagi sebelum hasil berhasil diketahui.
