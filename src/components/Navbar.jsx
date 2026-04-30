import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const LINKS = [
  { to: "/", label: "Beranda" },
  { to: "/katalog", label: "Katalog" },
  { to: "/katalog?day=daily", label: "Daily" },
  { to: "/katalog?type=manhwa", label: "Manhwa" },
  { to: "/katalog?type=manga", label: "Manga" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  const onSearchSubmit = (e) => {
    e.preventDefault();
    const q = search.trim();
    if (!q) return;
    setOpen(false);
    navigate(`/katalog?q=${encodeURIComponent(q)}`);
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled
          ? "bg-bg/85 backdrop-blur-md border-b border-bg-line"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-2 shrink-0">
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
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `px-3 py-2 text-sm font-medium rounded-md transition ${
                  isActive
                    ? "text-ink"
                    : "text-ink-mute hover:text-ink hover:bg-white/5"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <form
          onSubmit={onSearchSubmit}
          className="ml-auto flex items-center gap-2 flex-1 max-w-md"
          role="search"
        >
          <label className="relative w-full">
            <span className="sr-only">Cari manga atau manhwa</span>
            <input
              ref={inputRef}
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari judul, author, genre…"
              className="w-full rounded-full bg-bg-card/80 border border-bg-line px-4 py-2 pl-10 text-sm placeholder:text-ink-dim outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20"
            />
            <svg
              viewBox="0 0 24 24"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-dim"
              fill="none"
            >
              <circle
                cx="11"
                cy="11"
                r="7"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M20 20l-3-3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </label>
        </form>

        <button
          type="button"
          aria-label="Akun"
          className="hidden md:inline-flex h-9 w-9 items-center justify-center rounded-full bg-bg-card border border-bg-line text-ink-mute hover:text-ink hover:border-bg-line/80 transition"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
            <circle
              cx="12"
              cy="8"
              r="4"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md bg-bg-card border border-bg-line text-ink"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
            {open ? (
              <path
                d="M6 6l12 12M6 18L18 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-bg-line bg-bg/95 backdrop-blur">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm font-medium ${
                    isActive
                      ? "bg-white/5 text-ink"
                      : "text-ink-mute hover:text-ink"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
