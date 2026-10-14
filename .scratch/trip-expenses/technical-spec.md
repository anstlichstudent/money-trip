# Spesifikasi Teknis Keuangan Perjalanan

Status: Pilihan teknologi dan aturan utama disepakati; versi paket dan detail integrasi diperiksa saat implementasi.

Dokumen ini melengkapi [spesifikasi fitur](spec.md). Semua aturan biaya, akses, dan pelunasan dalam spesifikasi fitur tetap berlaku.

Keputusan tampilan terbaru ada di [catatan desain](design-notes.md). Desain Pencil belum menjadi aplikasi yang berfungsi.

## Keputusan Teknologi

| Bagian | Pilihan | Tujuan |
| --- | --- | --- |
| Aplikasi | TanStack Start, React, TypeScript | Tampilan dan fungsi server dalam satu proyek |
| Hosting | Cloudflare Workers | Menjalankan aplikasi dan endpoint MCP |
| Database | Cloudflare D1 | Menyimpan data dengan SQL melalui binding Worker |
| Validasi | Zod | Memakai skema input yang sama untuk web dan MCP |
| MCP | SDK TypeScript resmi MCP | Memberi akses tools kepada Hermes |
| Build dan deploy | Vite, plugin Cloudflare, Wrangler | Membangun dan menerapkan aplikasi ke Workers |
| Tampilan | CSS biasa | Membuat tampilan HP tanpa pustaka komponen tambahan |

D1 ditetapkan sebagai penyimpanan untuk Workers. Gunakan prepared statements dan migrasi SQL. Versi awal tidak memerlukan ORM, backend terpisah, atau server Node.js saat produksi. Pilih versi paket yang kompatibel saat implementasi dan simpan lockfile.

## Kebutuhan Koneksi

Aplikasi memerlukan internet untuk membaca data terbaru dan mencatat perubahan. Tidak ada pencatatan offline, antrean sinkronisasi, atau penyimpanan otomatis saat koneksi kembali. Data terakhir yang sudah tampil dapat dipertahankan dengan status gagal diperbarui. Koneksi yang putus saat penyimpanan tetap memerlukan pemeriksaan hasil agar catatan tidak ganda.

## Susunan Aplikasi

Satu Worker melayani halaman web, fungsi server TanStack Start, dan `/mcp`. Aset statis memakai fasilitas Workers. Database diakses melalui binding `DB`.

Alur web: halaman → fungsi server → pemeriksaan akses dan input → operasi perjalanan → D1.

Alur agent: Hermes → HTTPS `/mcp` → pemeriksaan token dan input → operasi perjalanan yang sama → D1.

Pisahkan fungsi hitung murni dari operasi database. Web dan MCP memakai fungsi hitung serta operasi penyimpanan yang sama. Jangan membuat rumus kedua khusus untuk agent. Kode database, hash kata sandi, dan token hanya boleh berjalan di server.

Struktur awal:

```text
src/routes/                 halaman dan endpoint
src/server/auth.ts          akses pengelola dan penonton
src/server/trip.ts          baca dan ubah data perjalanan
src/server/db.ts            query D1
src/server/mcp.ts           tools dan transport MCP
src/domain/expense.ts       validasi dan hitung pembagian
migrations/                migrasi SQL
```

Gunakan server entry Worker untuk meneruskan `/mcp` ke handler MCP dan permintaan lain ke TanStack Start. Gunakan transport berbasis Web Request/Response yang kompatibel dengan Workers. Jangan memakai transport `node:http` atau stdio untuk layanan online ini.

## Penyimpanan

| Tabel | Data utama |
| --- | --- |
| `trips` | ID, nama, hash token penonton |
| `participants` | ID, trip ID, nama, urutan pembagian |
| `expenses` | ID, trip ID, pembayar, nama, jenis, input JSON, total rupiah, versi |
| `expense_shares` | Expense ID, participant ID, bagian rupiah |
| `settlements` | ID, trip ID, pengirim, penerima, nominal rupiah, versi |
| `sessions` | Hash token sesi pengelola, batas berlaku |
| `write_requests` | Kunci permintaan unik, hash input, hasil penyimpanan |

Input JSON menyimpan baris menu, peserta setiap baris, diskon, pajak, dan biaya tambahan. Validasi sebelum menyimpan. Bagian peserta disimpan terpisah agar rincian dan saldo mudah dibaca. Simpan pengeluaran dan seluruh bagiannya dalam satu batch D1 yang atomik. Simpan kunci permintaan dan hasil dalam batch yang sama.

Gunakan foreign key, batas nilai, dan batas unik sebagai pemeriksaan tambahan. Semua peserta, pembayar, dan pelunasan harus berasal dari perjalanan yang sama. Batasi jumlah baris, panjang teks, ukuran permintaan, dan nilai nominal. Nilai dan hasil perkalian harus berada dalam rentang integer aman.

Utang dihitung dari catatan pengeluaran, bagian biaya, dan pelunasan; jangan simpan saldo sebagai sumber data kedua. Bagian biaya peserta selain pembayar membentuk utang kepada pembayar. Gabungkan seluruh catatan untuk pasangan yang sama, lalu potong utang yang berlawanan pada pasangan tersebut.

Jangan memasangkan peserta berdasarkan saldo total perjalanan. Piutang dari pihak ketiga tidak mengurangi utang kepada pihak lain. Siklus utang antara tiga peserta atau lebih tetap ditampilkan.

`Still owes` adalah jumlah sisa utang keluar per peserta; `Still to receive` adalah jumlah sisa utang masuk. Keduanya dapat positif sekaligus. `Still to settle` menjumlahkan semua sisa utang pasangan sekali saja dan sama dengan jumlah seluruh piutang tersisa.

Daftar pihak pada kedua kartu Who owes memakai sisa utang per pasangan yang sama. How this adds up harus menjelaskan asal utang, pemotongan dengan pihak yang sama, dan pelunasan; satu saldo global tidak cukup untuk menjelaskan kedua indikator. Expense share tetap menampilkan bagian biaya peserta.

Untuk pasangan A dan B, gunakan nilai bertanda: positif berarti A berutang kepada B. Jumlahkan bagian biaya A yang dibayar B, kurangi bagian biaya B yang dibayar A, kurangi pelunasan A ke B, lalu tambahkan pelunasan B ke A. Nilai negatif berarti B berutang kepada A. Setiap pasangan dihitung sekali.

Pelunasan sebagian hanya mengurangi utang pasangan tersebut. Pembayaran berlebih diterima dan membalik arah utang sebesar kelebihannya. Web menampilkan peringatan dan preview sebelum simpan. MCP memakai perhitungan dan validasi yang sama; tidak ada alur persetujuan tambahan.

Terima catatan transfer yang sudah terjadi saat tidak ada utang atau arahnya berlawanan dengan utang. Rumus pasangan tetap berlaku. Web menampilkan peringatan serta preview sebelum simpan; aturan penyimpanan MCP sama tanpa persetujuan tambahan.

Perubahan atau penghapusan pengeluaran mempertahankan pelunasan dan dapat membalik arah utang pasangan. Web menampilkan preview dampak sebelum simpan atau hapus. Pelunasan mengurangi total utang pasangan tanpa alokasi ke pengeluaran tertentu. Rincian pengeluaran menjelaskan asal utang, bukan status lunas setiap pengeluaran.

## Setup Perjalanan dan Peserta

Jangan memasukkan peserta atau transaksi contoh ke database produksi. Sesi pengelola yang sah diperlukan untuk setup pertama: nama perjalanan dan tepat enam peserta. Simpan setup secara atomik dan cegah setup ganda. Tolak pencatatan transaksi sebelum setup selesai, termasuk melalui MCP.

Setelah transaksi pertama, identitas dan daftar peserta tetap. Koreksi nama peserta dan nama perjalanan diperbolehkan; koreksi nama tidak mengubah ID atau riwayat. Versi awal tidak menyediakan penambahan dan penghapusan peserta setelah setup. Sebelum transaksi pertama, daftar dapat diedit, tetapi setiap penyimpanan harus menghasilkan tepat enam peserta. Pengeditan daftar dan pencatatan transaksi pertama harus mencegah konflik agar peserta yang sudah memiliki transaksi tidak terhapus.

## Hitung dan Pembulatan

Gunakan aturan dalam spesifikasi fitur. Harga dan nominal input harus berupa rupiah bulat; tolak pecahan rupiah. Semua nominal tersimpan dalam rupiah bulat. Persentase mendukung hingga dua angka desimal dan direpresentasikan sebagai integer basis point: 10% = 1000 dan 2,75% = 275, dengan penyebut 10000.

Bulatkan nilai diskon persen, pajak persen, dan biaya tambahan persen ke rupiah terdekat dengan aturan setengah dibulatkan ke atas. Pajak dan biaya tambahan memakai subtotal yang sama setelah diskon.

Untuk pembagian rata atau proporsional, ambil bagian rupiah bulat ke bawah, lalu bagikan sisa rupiah menurut pecahan terbesar. Jika pecahan sama, pakai urutan peserta. Terapkan cara ini pada setiap tahap pembagian. Total bagian harus sama dengan total tagihan. Tolak input yang membuat hasil negatif atau melampaui rentang integer aman.

## Akses Web

- Satu akun pengelola dibuat melalui konfigurasi awal. Simpan hash kata sandi sebagai secret Worker, bukan kata sandi asli. Pilih algoritma hash yang didukung runtime saat implementasi.
- Desain login memiliki username, password, kontrol tampilkan password, dan pesan kesalahan umum. Identitas username pengelola ditetapkan saat konfigurasi awal; tidak ada pendaftaran atau pemulihan kata sandi.
- Setelah login, gunakan token sesi acak. Simpan hash token di D1. Cookie memakai `HttpOnly`, `Secure`, dan `SameSite=Strict`, dengan batas berlaku tujuh hari sejak login. Logout membatalkan sesi tersebut di server dan menghapus cookie.
- Periksa sesi pada setiap operasi pengelola. Periksa origin permintaan yang mengubah data dan batasi percobaan login.
- Tautan penonton memakai token acak dengan entropi tinggi. Token hanya memberi akses baca untuk perjalanan tersebut. Gunakan `Referrer-Policy: no-referrer` dan jangan mencatat token dalam log aplikasi.
- Jangan mengirim secret, sesi, atau token MCP ke halaman penonton. Respons data perjalanan tidak boleh masuk cache publik bersama.
- Token penonton dibuat sekali untuk perjalanan dan bersifat permanen: tidak kedaluwarsa, tidak dirotasi, dan tidak memiliki operasi pembatalan akses. Login pengelola tetap memiliki batas sesi tujuh hari.

Halaman penonton mengambil data saat dibuka. Ambil ulang saat tab atau aplikasi kembali aktif setelah berada di latar belakang. Sediakan tombol Perbarui untuk mengambil data tanpa memuat ulang halaman. Jangan mengambil data secara berkala. Gabungkan pemicu yang bersamaan agar hanya satu permintaan berjalan. Setelah pengelola menyimpan, perbarui tampilan pengelola segera. Penonton yang terus membuka halaman perlu menekan Perbarui untuk melihat perubahan baru. Tampilkan kegagalan koneksi dan pertahankan data terakhir.

## MCP untuk Hermes

MCP menyediakan tools untuk membaca dan mengisi data agar pengelola tidak perlu mengetik di formulir. Spesifikasi ini mengatur kontrak tools, akses, dan validasi data. Cara Hermes berpikir atau menjalankan percakapan berada di luar lingkup aplikasi. Aplikasi memakai aturan hitung yang sama untuk semua catatan agar saldo konsisten.

Gunakan endpoint HTTPS `/mcp` dengan Streamable HTTP tanpa sesi transport yang tersimpan dalam memori Worker. Data tetap berada di D1. Konfigurasi Hermes memakai URL endpoint dan header `Authorization: Bearer <token>` sesuai dukungan HTTP Hermes.

Untuk integrasi Hermes awal, pakai token acak khusus pengelola yang disimpan sebagai secret Worker. Token dibatasi pada satu perjalanan, dapat diganti, dan diperiksa pada setiap permintaan MCP. Jangan gunakan token penonton atau cookie login sebagai token MCP. Jangan menyimpan token asli di repository atau log.

Token khusus ini merupakan integrasi privat dengan Hermes. Klien lain dapat memerlukan OAuth dan discovery MCP; kompatibilitas tersebut harus diperiksa sebelum menambah klien lain.

| Tool | Input utama | Hasil |
| --- | --- | --- |
| `get_trip` | Tidak ada | Peserta, pengeluaran, saldo, pelunasan, sisa utang per pasangan |
| `preview_expense` | Input pengeluaran | Total, bagian setiap peserta, input tervalidasi |
| `create_expense` | Input pengeluaran, `request_id` | ID pengeluaran dan pembagian tersimpan |
| `record_settlement` | Pengirim, penerima, nominal, `request_id` | ID pelunasan dan saldo terbaru |

Trip ditentukan server dari hak akses token. Agent tidak dapat memilih perjalanan lain. Tandai dua tool pertama sebagai baca saja. Versi awal hanya memberi agent akses baca dan tambah; ubah dan hapus tetap tersedia bagi pengelola di web.

Tools penyimpanan menerima input lengkap, memvalidasi data, lalu mengembalikan hasil tersimpan. Tidak ada alur persetujuan tambahan di web atau urutan pemanggilan tools yang wajib. `preview_expense` tersedia sebagai tool opsional. `record_settlement` hanya mencatat pelunasan dan tidak melakukan transfer uang.

Setiap penambahan memakai `request_id`. Pengulangan ID dengan input yang sama mengembalikan hasil sebelumnya. ID yang sama dengan input berbeda ditolak. Ini mencegah catatan ganda saat koneksi terputus atau agent mengulang permintaan. Web juga mempertahankan `request_id` dan input untuk permintaan yang hasilnya belum diketahui. Tampilkan status belum dapat dipastikan dan ulangi permintaan yang sama setelah koneksi kembali atas tindakan pengguna; jangan membuat ID baru atau mengirim input yang berubah dengan ID lama. Jangan tampilkan struk Saved atau tombol berbagi sebelum hasil berhasil diketahui.

## Perubahan dan Kegagalan

### Modal, struk, dan berbagi

- Trip expenses dan expense share memakai preview maksimal tiga baris serta modal tabel untuk View all. Preview dan tabel mengambil catatan yang sama; nominal Trip expenses adalah total pengeluaran, nominal expense share adalah bagian peserta.
- Struk berdasarkan ID pengeluaran selalu mengambil versi terbaru. Gambar ekspor tidak berubah setelah koreksi. Untuk pengeluaran yang sudah dihapus, tampilkan catatan tidak tersedia tanpa menghidupkan kembali catatan lama.
- Pilihan pengeluaran pada Trip expenses membuka struk berdasarkan ID pengeluaran. Tautan struk yang dibagikan membuka pengeluaran tersimpan yang sama melalui akses penonton perjalanan.
- Jangan tampilkan modal Expense saved sebelum penyimpanan berhasil. Setelah berhasil, gunakan hasil tersimpan untuk struk lengkap, tombol WhatsApp, dan Save image. Hapus status Draft pada struk tersimpan.
- WhatsApp membawa teks dan tautan struk. Save image menghasilkan gambar struk di perangkat. Tambahan ini tidak membutuhkan penyimpanan gambar di server; pilihan teknik ekspor dan pembukaan WhatsApp belum ditentukan.
- Terapkan pemeriksaan token penonton pada tautan struk. Jangan menambahkan sesi pengelola atau token MCP ke URL berbagi. Tautan struk memakai akses penonton permanen yang sama. Penghapusan pengeluaran tetap membuat struk pengeluaran tersebut tidak tersedia.
- Modal struk dapat digulir pada HP. Implementasi perlu fokus keyboard yang benar, cara menutup modal, dan kembali ke riwayat setelah modal struk ditutup. Canvas tidak membuktikan perilaku ini sudah berfungsi.
- Bedakan kegagalan penyimpanan dan berbagi. Jika penyimpanan berhasil tetapi WhatsApp atau Save image gagal, pertahankan pengeluaran tersimpan dan sediakan percobaan berbagi ulang dari struk yang sama; jangan menjalankan penyimpanan kembali atau membuat catatan kedua. Berbagi tidak menjalankan record_settlement.

### Ubah dan hapus

Web menyediakan perubahan dan penghapusan pengeluaran serta pelunasan. Koreksi pengeluaran dapat mengubah seluruh input termasuk pembayar dan peserta yang menanggung; validasi kembali input dan hitung ulang seluruh bagian biaya secara atomik. Tampilkan preview dampak dan konfirmasi; gunakan nomor versi untuk perubahan dan penghapusan agar data lama tidak menimpa perubahan baru. Perubahan dan penghapusan pelunasan menghitung ulang utang pasangan terkait; jangan mengubah pengeluaran. Pengeluaran, bagiannya, dan hasil permintaan harus berubah secara atomik. Jika batch gagal, jangan menyatakan penyimpanan berhasil.

Penghapusan pengeluaran hanya menghapus bagiannya. Pelunasan tetap tersimpan. Tolak perubahan dan penghapusan berbasis versi lama. Tampilkan konflik versi kepada pengelola agar ia dapat mengambil data terbaru. Pertahankan isian lokal yang belum tersimpan untuk diperiksa; jangan menimpakan isian tersebut otomatis pada versi terbaru. Kesalahan MCP harus menjelaskan input yang salah tanpa membocorkan secret atau query internal.

## Perubahan Formulir yang Belum Tersimpan

Minta konfirmasi saat pengguna menutup formulir atau berpindah halaman setelah mengubah isinya. Kegagalan penyimpanan mempertahankan input agar dapat diperbaiki atau dicoba kembali.

## Urutan Riwayat

Riwayat pengeluaran diurutkan berdasarkan waktu pencatatan terbaru terlebih dahulu, dengan ID sebagai penentu urutan tetap jika waktu sama. Koreksi tidak mengubah waktu pencatatan. Tidak ada input tanggal pengeluaran terpisah pada versi awal.

## Tampilan Desktop

Gunakan susunan satu kolom yang sama dengan HP dan batasi lebar konten pada desktop. Formulir, tabel, dan modal tetap dapat digunakan; versi awal tidak memerlukan desain desktop terpisah.

## Pemeriksaan Implementasi

- Semua contoh hitung dalam spesifikasi fitur harus lulus tes fungsi hitung.
- Periksa diskon penuh, subtotal nol, sisa pembulatan, jumlah pesanan tidak valid, dan batas integer aman.
- Periksa bahwa input web dan MCP menghasilkan total serta bagian yang sama.
- Periksa bahwa penonton, sesi kedaluwarsa, dan token MCP salah tidak dapat mengubah data.
- Periksa ID peserta dari perjalanan lain dan pelunasan kepada diri sendiri. Periksa pelunasan sebagian dan pembayaran berlebih yang membalik arah utang tanpa mengubah pasangan lain.
- Periksa pengulangan `request_id`, konflik versi, dan rollback batch yang gagal. Periksa transfer tanpa utang, transfer berlawanan arah, serta perubahan dan penghapusan pengeluaran setelah pelunasan; pelunasan tetap tersimpan.
- Periksa bahwa kedua indikator saldo, daftar pihak pada profil, dan jumlah Still to settle memakai sisa utang per pasangan yang sama, termasuk utang dan piutang bersamaan, saldo nol, serta pelunasan sebagian. Periksa pemotongan dua arah dan siklus tiga peserta yang tidak dipotong.
- Periksa koreksi dan penghapusan pelunasan, preview dampak, serta konflik versi. Periksa kegagalan berbagi setelah simpan dan percobaan ulang tanpa catatan ganda.
- Periksa preview maksimal tiga baris, total serta bagian peserta pada modal, struk dari catatan tersimpan, dan akses baca tautan struk.
- Periksa bahwa modal berbagi hanya terbuka setelah simpan berhasil, WhatsApp berisi teks dan tautan, gambar memuat struk lengkap, dan berbagi tidak mengubah saldo.
- Sebelum rilis, periksa koneksi Hermes ke endpoint Workers dan pembaruan penonton pada dua perangkat. Pengujian browser dan menjalankan server memerlukan izin pengguna sesuai AGENTS.md.

## Urutan Pekerjaan

1. Buat proyek TanStack Start untuk Workers, konfigurasi D1, dan migrasi dari draf SQL yang sudah ada. Pilih versi paket yang kompatibel dan simpan lockfile. Jangan isi produksi dengan data contoh.
2. Buat fungsi hitung biaya, pembulatan, dan utang per pasangan beserta tes contoh yang disepakati. Periksa utang dan piutang bersamaan, pelunasan sebagian, pembayaran berlebih, transfer tanpa utang, serta koreksi setelah pelunasan.
3. Buat login, sesi tujuh hari, logout, setup perjalanan dan enam peserta, serta tautan penonton permanen. Periksa batas akses dan perubahan peserta setelah transaksi pertama.
4. Buat operasi pengeluaran dan pelunasan untuk web: preview, tambah, koreksi, hapus, penyimpanan atomik, konflik versi, dan percobaan ulang dengan request_id yang sama.
5. Buat tampilan menurut `DESIGN.md`, memakai Geist dan Geist Mono lokal. Lengkapi setup, koreksi/hapus, loading, kegagalan, dan konfirmasi perubahan belum tersimpan saat implementasi. Gunakan susunan satu kolom untuk HP dan desktop.
6. Buat akses penonton, riwayat, profil, struk versi terbaru, WhatsApp, dan Save image. Periksa bahwa berbagi ulang tidak menyimpan catatan kedua.
7. Tambahkan MCP untuk Hermes dengan operasi dan aturan yang sama. Periksa akses baca/tambah, request_id, dan penolakan token salah.
8. Jalankan pemeriksaan build, tipe, dan tes. Pengujian browser serta menjalankan server memerlukan izin pengguna. Periksa integrasi Hermes dan dua perangkat sebelum rilis; deploy hanya saat diminta.

## Hasil Pemeriksaan Dokumentasi

Context7 menunjukkan dukungan hosting TanStack Start pada Workers melalui plugin Cloudflare dan server entry yang dapat diperluas. SDK MCP resmi menyediakan transport Streamable HTTP berbasis Request/Response dengan mode tanpa sesi transport tersimpan. Ini adalah dasar pemilihan teknologi, bukan hasil pengujian integrasi aplikasi.

Rujukan:

- [TanStack Start: hosting Cloudflare Workers](https://tanstack.com/start/latest/docs/framework/react/guide/hosting)
- [TanStack Start: server entry](https://tanstack.com/start/latest/docs/framework/react/guide/server-entry-point)
- [MCP: Web Standard Streamable HTTP transport](https://github.com/modelcontextprotocol/typescript-sdk/blob/main/packages/server/src/server/streamableHttp.ts)

Versi SDK dan jalur impor harus diperiksa sesuai versi yang dipasang. Jangan mencampur contoh dari versi paket berbeda. Build, binding D1, handler MCP, dan koneksi Hermes belum diuji.

## Batas dan Keputusan Terbuka

Belum mencakup OCR struk, model AI di dalam aplikasi, percakapan bawaan, WebSocket, Durable Objects, penyimpanan gambar di server, atau OAuth untuk banyak klien. Save image hanya mengekspor gambar struk ke perangkat pengguna. Hermes menyediakan percakapan dan model AI.

Nama domain, akun Cloudflare, nama binding produksi, batas input, algoritma hash kata sandi, serta versi paket ditetapkan saat implementasi.

## Rujukan Dokumentasi

- [TanStack Start: server functions](https://tanstack.com/start/latest/docs/framework/react/guide/server-functions)
- [TanStack Start: authentication](https://tanstack.com/start/latest/docs/framework/react/guide/authentication)
- [Cloudflare: TanStack Start pada Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/)
- [D1: Worker Binding API](https://developers.cloudflare.com/d1/worker-api/)
- [D1: database methods dan batch](https://developers.cloudflare.com/d1/worker-api/d1-database/)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Hermes: konfigurasi MCP HTTP](https://github.com/nousresearch/hermes-agent/blob/main/skills/autonomous-ai-agents/hermes-agent/references/native-mcp.md)
