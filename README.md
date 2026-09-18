# Anniversary Fyoo — 2 Years

Situs interaktif untuk merayakan dua tahun bersama Fyoo. Proyek ini dibagi menjadi dua aplikasi kecil:

- `client/`: React + Vite untuk tampilan, animasi, serta interaksi pengunjung.
- `server/`: Express untuk API. Nantinya API ini dapat menyimpan daftar foto, caption, dan isi surat tanpa menyimpannya langsung di kode tampilan.

## Tahap pengembangan

1. **Landing page hadiah** — selesai pada tahap awal ini. Pengunjung membuka hadiah, melihat ucapan, lalu bisa melanjutkan ke galeri.
2. **Galeri kenangan** — slideshow September 2024 sampai September 2026, dengan foto, caption, tombol mundur/maju, dan backsound.
3. **Surat penutup** — amplop interaktif yang membuka surat personal.

## Menjalankan proyek

Pastikan Node.js versi 20 atau lebih baru telah terpasang, lalu jalankan ini dari folder proyek:

```bash
npm install --prefix client
npm install --prefix server
npm run dev:server
```

Di terminal lain:

```bash
npm run dev:client
```

Buka alamat yang diberikan Vite (biasanya `http://localhost:5173`). API Express berjalan di `http://localhost:4000`.

## Kenapa dipisah?

React bertugas membuat halaman terasa hidup di browser—misalnya animasi hadiah dan modal. Express akan menjadi sumber data yang aman dan mudah dikembangkan: foto serta tulisan dapat diubah dari satu tempat tanpa mengacak-acak komponen tampilan. Untuk landing page pertama ini data masih statis karena belum membutuhkan API, tetapi server sudah disiapkan agar bagian galeri bisa langsung menggunakannya.
