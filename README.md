# MangaVerse

Web baca **manga & manhwa** modern dengan referensi tampilan dari Webtoon — dibuat dengan **React + Vite + Tailwind CSS**. Project ini sepenuhnya statis (tanpa backend) dan menggunakan data dummy + cover SVG yang digenerate secara otomatis, jadi tidak ada dependency gambar eksternal.

## ✨ Fitur

- 🏠 **Landing page** dengan hero carousel, trending row, daily updates, top 10, genre grid, dan CTA banner.
- 📚 **Katalog lengkap** dengan pencarian, filter genre/tipe/status, dan sort populer/rating/terbaru/A-Z.
- 📖 **Halaman detail manga** lengkap dengan sinopsis, statistik, daftar chapter, related series, dan bookmark (disimpan di `localStorage`).
- 📜 **Reader vertikal** mirip Webtoon — auto-hide header, progress bar, chapter selector, navigasi prev/next, panel reaksi.
- 🌑 **Dark mode modern** dengan glass card, gradient accent hijau neon, dan animasi micro.
- 📱 **Responsive** dari mobile sampai desktop dengan navigasi mobile-friendly.
- ⚡ **No external image deps** — semua cover & halaman chapter dibuat secara dinamis sebagai SVG.

## 🛠️ Tech Stack

- **React 19** + **Vite 8**
- **Tailwind CSS 3** (dengan custom design tokens)
- **React Router 7** untuk routing client-side
- **ESLint** untuk linting

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Jalankan dev server (default: http://localhost:5173)
npm run dev

# Build production
npm run build

# Preview build production
npm run preview

# Lint
npm run lint
```

## 📁 Struktur Project

```
src/
├── components/        # Komponen reusable
│   ├── Cover.jsx      # SVG cover & chapter page generator
│   ├── DailyTabs.jsx  # Tabs untuk update harian (Senin–Minggu)
│   ├── Footer.jsx
│   ├── GenreGrid.jsx
│   ├── HeroCarousel.jsx
│   ├── MangaCard.jsx
│   ├── Navbar.jsx
│   └── SectionHeader.jsx
├── data/              # Data dummy
│   ├── genres.js      # Daftar genre & hari rilis
│   └── manga.js       # Katalog 12 series + helpers
├── pages/             # Halaman (route)
│   ├── Catalog.jsx    # /katalog
│   ├── Detail.jsx     # /manga/:id
│   ├── Home.jsx       # /
│   ├── NotFound.jsx   # 404
│   └── Reader.jsx     # /manga/:id/chapter/:num
├── App.jsx            # Routing utama
├── index.css          # Tailwind base + custom CSS
└── main.jsx           # Entry point
```

## 🎨 Design Tokens

Palette dan tokens didefinisikan di `tailwind.config.js`:

| Token            | Hex       | Penggunaan                        |
| ---------------- | --------- | --------------------------------- |
| `bg.DEFAULT`     | `#0b0d12` | Background utama (paling gelap)   |
| `bg.soft`        | `#11141b` | Section pembanding (footer dll)   |
| `bg.card`        | `#161a23` | Card / surface                    |
| `bg.line`        | `#222633` | Border halus                      |
| `accent.DEFAULT` | `#00d564` | Primary CTA (hijau neon)          |
| `accent.glow`    | `#00ff7f` | Hover/glow                        |
| `ink.DEFAULT`    | `#e7eaf0` | Teks utama                        |
| `ink.mute`       | `#9aa3b2` | Teks sekunder                     |
| `ink.dim`        | `#6b7280` | Teks tersier (caption)            |

## 📝 Catatan

- Semua judul, author, sinopsis, dan tagline di project ini adalah **fiktif** dan dibuat khusus untuk demo. Tidak ada konten manga/manhwa yang benar-benar diambil.
- Karena ini project statis tanpa backend, fitur seperti login, komentar, dan rating real-time tidak ada — namun struktur datanya sudah siap untuk diintegrasikan dengan API kalau diperlukan.
- Cover dan halaman chapter digenerate sebagai SVG secara dinamis di komponen `Cover` dan `ChapterPage` untuk menjaga ukuran bundle kecil dan tidak bergantung pada layanan gambar eksternal.

## 📜 License

MIT — bebas digunakan sebagai starter atau referensi belajar.
