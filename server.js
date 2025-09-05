const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tacosz123',
    database: 'tugas13pws',
    dbport: 3305
});

db.connect((err) => {
    if (err) {
        console.error('Gagal koneksi ke database:', err);
        console.error(err.stack);
        return;
    }
    console.log('Alhamdulillah, Berhasil terhubung ke database');
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'img-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage : storage });

app.get('/api/records', (req, res) => {
    const sql = 'SELECT * FROM records order by id desc';
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Gagal mengambil data:", err);
            return res.status(500).json({ error: 'Gagal mengambil data' });
        }
        res.status(200).json(results);
    });
});

app.post('/api/records', upload.single('gambar'), (req, res) => {
    const { nama, tinggi_badan, tanggal } = req.body;

    if (!nama || !tinggi_badan || !tanggal || !req.file) {
        return res.status(400).json({ error: 'Semua field harus diisi' });
    }

    const newRecord = {
        nama,
        tinggi_badan,
        tanggal,
        gambar: req.file.filename
    };

    const sql = 'INSERT INTO records SET ?';
    db.query(sql, newRecord, (err, result) => {
        if (err) {
            console.error("Gagal menambahkan data:", err);
            return res.status(500).json({ error: 'Gagal menambahkan data' });
        }
        res.status(201).json({ message: 'Data berhasil ditambahkan', id: result.insertId });
    });
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});