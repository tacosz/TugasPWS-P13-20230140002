## 1: Membuat Database

1. Buka MySQL Command Line atau phpMyAdmin
2. Jalankan perintah SQL berikut:

```sql
CREATE DATABASE tugas13pws;
USE tugas13pws;

CREATE TABLE records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    tinggi_badan INT NOT NULL,
    tanggal DATE NOT NULL,
    gambar VARCHAR(255) NOT NULL
);
```

## 2: Menjalankan Server

1. Pastikan MySQL server sudah berjalan
2. Buka terminal di folder project
3. Jalankan server dengan perintah:
```bash
node server.js
```
4. Jika berhasil, akan muncul pesan:
   ```
   Server berjalan di http://localhost:3000
   Alhamdulillah, Berhasil terhubung ke database
   ```

## Langkah 4: Mengakses Aplikasi

1. Buka web browser
2. Akses halaman utama di:
   ```
   http://localhost:3000
   ```
3. Untuk melihat daftar data:
   ```
   http://localhost:3000/daftar.html
   ```