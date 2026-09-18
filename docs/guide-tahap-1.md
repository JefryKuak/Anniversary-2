# Panduan tahap 1: landing page hadiah

## Alur yang dibuat

```
Landing page → hadiah diklik → animasi buka → modal ucapan → /gallery
```

Landing page adalah pintu masuk yang sengaja dibuat sederhana: hanya ada satu fokus utama, yaitu hadiah. Ini membuat pengunjung langsung mengerti apa yang perlu dilakukan dan memberi rasa penasaran sebelum melihat kenangan kalian.

## Bagian React

`client/src/main.jsx` adalah titik awal aplikasi. File ini memasang komponen `App` ke elemen `#root` pada `index.html`.

`client/src/App.jsx` menyimpan tiga keadaan penting:

- `phase`: kondisi hadiah (`idle`, `opening`, atau `opened`). Kondisi ini menentukan teks petunjuk, apakah hadiah bisa diklik, dan kelas animasi CSS yang digunakan.
- `showModal`: menentukan kapan kartu ucapan ditampilkan.
- `currentPath`: menyimpan halaman saat ini. Untuk saat ini `/` adalah landing page dan `/gallery` merupakan jembatan ke bagian galeri yang akan dibuat berikutnya.

Saat hadiah diklik, `phase` berubah menjadi `opening`. React lalu menjalankan timer satu detik—sama dengan durasi animasi tutup hadiah—sebelum menampilkan modal. Menggunakan state seperti ini lebih aman daripada mengubah elemen HTML secara langsung, karena tampilan selalu mengikuti satu sumber kebenaran: data state React.

Komponen `GiftBox` dibuat dari elemen HTML dan CSS, bukan gambar. Keuntungannya: tajam pada layar apa pun, ringan, dan warna maupun bentuk pita dapat diubah dengan mudah. `CelebrationModal` sengaja dipisahkan agar isi ucapan nantinya mudah diganti tanpa menyentuh logika hadiah.

## Bagian desain

Warna utama berada di `client/src/styles.css`:

- biru langit dan cyan sebagai nuansa utama;
- putih kebiruan untuk rasa lembut dan bersih;
- biru tua untuk teks, agar tetap mudah dibaca.

Elemen awan, kilau, gradasi, dan bayangan dibuat dengan CSS. Animasi hadiah menggerakkan tutupnya, menambahkan cahaya, lalu memunculkan modal. Pengaturan `prefers-reduced-motion` juga tersedia; pengguna yang memilih mengurangi animasi di perangkatnya tetap dapat menggunakan situs dengan nyaman.

## Bagian Express

Pada tahap ini Express baru menyediakan `GET /api/health`. Ini adalah tes paling sederhana bahwa backend aktif. Pada bagian galeri, endpoint baru akan ditambahkan, misalnya `GET /api/memories`, agar daftar bulan, foto, dan caption tidak ditulis langsung di komponen React.

Pemisahan ini berguna karena:

1. React fokus pada cara cerita ditampilkan dan diinteraksikan.
2. Express fokus pada data cerita.
3. Foto atau caption dapat diganti dari data API tanpa membongkar desain halaman.

## Persiapan untuk tahap galeri

Sebelum mulai tahap berikutnya, siapkan bila sudah ada:

- satu foto pilihan untuk setiap bulan dari September 2024 hingga September 2026 (25 foto);
- caption pendek untuk tiap foto—satu atau dua kalimat terasa paling enak untuk slideshow;
- satu lagu backsound dalam format MP3 yang memang boleh digunakan di situs;
- teks surat untuk bagian penutup.

Kamu tidak harus menyiapkan semuanya sekaligus. Galeri dapat lebih dulu dibuat dengan beberapa foto contoh, lalu kita masukkan foto dan ceritanya sedikit demi sedikit.
