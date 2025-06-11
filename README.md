# 🎮 Game Scene: `sceneMenu` (Phaser 3)

Scene ini merupakan **halaman menu utama** dari game Phaser 3, berfungsi sebagai antarmuka awal sebelum pemain memulai permainan. `sceneMenu` menampilkan elemen visual seperti background, judul game, tombol play, panel skor tertinggi, animasi karakter mummy, serta memainkan musik dan efek suara.

---

## ✨ Fitur Utama

- 🎵 **Musik Latar Ambience**: Diputar sekali dan diloop saat menu tampil.
- 🎚️ **Efek Suara**: Termasuk suara sentuhan (`touch`) dan transisi menu.
- 🖼️ **Animasi Judul Game**: Muncul dengan efek `Bounce.easeOut`.
- ▶️ **Tombol Play**: Muncul dengan efek `Back.easeOut` dan bisa diklik untuk memulai game.
- 🏆 **Panel High Score**: Menampilkan skor tertinggi dari `localStorage`.
- 🧟 **Animasi Mummy**: Sprite mummy yang bergerak bolak-balik dan dianimasikan.
  
---

## 🧩 Asset yang Digunakan

| Tipe     | Key               | File Path                          |
|----------|------------------|------------------------------------|
| Gambar   | `bg_start`        | `![bg_start](https://github.com/user-attachments/assets/7d0f213b-10aa-47ba-9d10-29a776ae6a40)
`       |
| Gambar   | `btn_play`        | `![btn_play](https://github.com/user-attachments/assets/e7385a5a-590d-4fcb-89cd-5c92ab98180a)
`       |
| Gambar   | `title_game`      | `![title_game](https://github.com/user-attachments/assets/21bbb090-9414-4b2e-9035-45dc6e78a6ba)
`     |
| Gambar   | `panel_skor`      | `![panel_skor](https://github.com/user-attachments/assets/b584956e-2cd0-47ba-ba64-8b3a4973155d)
`     |
| SpriteSheet | `sps_mummy`    | `![mummy37x45](https://github.com/user-attachments/assets/51ab6c82-965d-4fd7-bc69-bd126bd2c488)
`     |
| Audio    | `snd_ambience`    | `assets/audio/ambience.mp3`        |
| Audio    | `snd_touch`       | `assets/audio/touch.mp3`           |
| Audio    | `snd_transisi_menu` | `assets/audio/transisi_menu.mp3` |

---

## 📦 Struktur File
OCONG/
├── assets/
│ ├── audio/
│ │ ├── ambience.mp3
│ │ ├── touch.mp3
│ │ └── transisi_menu.mp3
│ ├── images/
│ │ ├── bg_start.png
│ │ ├── btn_play.png
│ │ ├── title_game.png
│ │ └── panel_skor.png
│ └── sprite/
│ └── mummy37x45.png
├── js/
│ └── sceneMenu.js
└── index.html




---

## 🔄 Alur Interaksi

1. **Load Assets** pada `preload()`.
2. **Create Scene**:
   - Tampilkan background dan title.
   - Tambahkan tombol play yang muncul dengan animasi.
   - Tambahkan panel skor dan ambil data `localStorage["highscore"]`.
   - Tambahkan sprite animasi `mummy` yang bergerak bolak-balik.
3. **Input Event**:
   - Ketika tombol play diklik:
     - Mainkan `snd_touch`.
     - Transisi ke scene `scenePlay`.

---

## 🧠 Tips Pengembangan

- Pastikan hanya **satu instance** dari `snd_ambience` diputar dengan memeriksa variabel global.
- Gunakan `localStorage` untuk menyimpan dan mengambil skor.
- Anda dapat menambahkan tombol pengaturan atau efek visual tambahan dengan konsep serupa.

---

## 📍 Dependencies

- **Phaser 3**
- **Assets lokal** (gambar, sprite, audio)

---

## 👤 Author

- Nama: [Nama Anda]
- Proyek: Game HTML5 - Phaser 3


