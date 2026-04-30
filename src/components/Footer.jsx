import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-bg-line bg-bg-soft">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent/15 ring-1 ring-accent/40">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-accent" fill="none">
                <path
                  d="M5 18V6l5 7 5-7v12"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="18.5" cy="16" r="2" fill="currentColor" />
              </svg>
            </span>
            <span className="text-lg font-extrabold tracking-tight">
              Manga<span className="text-gradient">Verse</span>
            </span>
          </div>
          <p className="mt-4 max-w-md text-sm text-ink-mute">
            Platform baca manga & manhwa modern dengan pengalaman reader yang
            halus mirip Webtoon. Semua judul di sini adalah konten demo
            (placeholder) untuk keperluan portofolio.
          </p>
          <div className="mt-5 flex gap-3">
            {["twitter", "instagram", "discord", "github"].map((s) => (
              <a
                key={s}
                href="#"
                aria-label={s}
                className="grid h-9 w-9 place-items-center rounded-full bg-bg-card border border-bg-line text-ink-mute hover:text-accent hover:border-accent/40 transition"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink">Jelajah</h4>
          <ul className="mt-4 space-y-2 text-sm text-ink-mute">
            <li>
              <Link to="/" className="hover:text-ink">
                Beranda
              </Link>
            </li>
            <li>
              <Link to="/katalog" className="hover:text-ink">
                Katalog
              </Link>
            </li>
            <li>
              <Link to="/katalog?type=manhwa" className="hover:text-ink">
                Manhwa
              </Link>
            </li>
            <li>
              <Link to="/katalog?type=manga" className="hover:text-ink">
                Manga
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink">Bantuan</h4>
          <ul className="mt-4 space-y-2 text-sm text-ink-mute">
            <li>
              <a href="#" className="hover:text-ink">
                Tentang
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-ink">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-ink">
                DMCA
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-ink">
                Hubungi Kami
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-bg-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 md:flex-row md:items-center md:justify-between md:px-8">
          <p className="text-xs text-ink-dim">
            © {new Date().getFullYear()} MangaVerse. Demo project, semua nama &
            karya fiktif.
          </p>
          <p className="text-xs text-ink-dim">
            Built with React + Vite + Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
