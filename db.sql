CREATE DATABASE tugas13pws;

create table 'records' (
    'id' INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    'nama' VARCHAR(255) NOT NULL,
    'tinggi_badan' INT NOT NULL,
    'tanggal' DATE NOT NULL,
    'gambar' VARCHAR(255) NOT NULL
);