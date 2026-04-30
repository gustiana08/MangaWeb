import { Link, useParams, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getMangaById,
  getChaptersFor,
  getRelatedManga,
  formatNumber,
} from "../data/manga";
import { GENRES } from "../data/genres";
import Cover from "../components/Cover";
import MangaCard from "../components/MangaCard";
import SectionHeader from "../components/SectionHeader";

export default function Detail() {
  const { id } = useParams();
  const manga = getMangaById(id);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [id]);

  if (!manga) return <Navigate to="/katalog" replace />;

  const chapters = getChaptersFor(manga.id);
  const related = getRelatedManga(manga, 6);
  const lastChapter = chapters[0];
  const firstChapter = chapters[chapters.length - 1];

  return (
    <div>
      {/* Hero banner */}
      <section className="relative">
        <div
          className="absolute inset-0 -z-10 h-[420px]"
          style={{
            background: `linear-gradient(180deg, ${manga.palette[1]}, transparent), linear-gradient(135deg, ${manga.palette[0]}, ${manga.palette[1]})`,
          }}
        />
        <div
          className="absolute inset-0 -z-10 h-[420px]"
          style={{
            background: `radial-gradient(120% 80% at 80% 0%, ${manga.palette[2]}55, transparent 60%)`,
          }}
        />
        <div className="absolute inset-x-0 top-[380px] -z-10 h-32 bg-gradient-to-b from-transparent to-bg" />

        <div className="mx-auto max-w-7xl px-4 pb-8 pt-10 md:px-8 md:pt-14">
          <div className="grid gap-6 md:grid-cols-[220px_1fr]">
            <div className="mx-auto w-[180px] sm:w-[220px]">
              <Cover manga={manga} className="shadow-2xl" rounded="rounded-2xl" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span
                  className="rounded-full px-2.5 py-1 font-bold uppercase tracking-wider text-white"
                  style={{ background: manga.accent }}
                >
                  {manga.type === "manhwa" ? "Manhwa" : "Manga"}
                </span>
                <span className="rounded-full bg-white/10 px-2.5 py-1 ring-1 ring-white/15">
                  {manga.status === "ongoing" ? "Ongoing" : "Tamat"}
                </span>
                <span className="rounded-full bg-white/10 px-2.5 py-1 ring-1 ring-white/15">
                  {manga.year}
                </span>
              </div>

              <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight md:text-5xl">
                {manga.title}
              </h1>
              <p className="text-sm italic text-white/60">{manga.altTitle}</p>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/85">
                <span className="inline-flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-yellow-400" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
                  </svg>
                  <strong>{manga.rating.toFixed(1)}</strong> /10
                </span>
                <span>👁️ {formatNumber(manga.views)}</span>
                <span>❤️ {formatNumber(manga.likes)}</span>
                <span>🔖 {formatNumber(manga.bookmarks)}</span>
                <span>📖 {manga.chapters} chapter</span>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {manga.genres.map((g) => {
                  const meta = GENRES.find((x) => x.slug === g);
                  return (
                    <Link
                      key={g}
                      to={`/katalog?genre=${g}`}
                      className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium ring-1 ring-white/15 hover:bg-white/15"
                    >
                      {meta?.icon} {meta?.name || g}
                    </Link>
                  );
                })}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-white/70 md:max-w-md">
                <span className="text-white/50">Author</span>
                <span className="text-white">{manga.author}</span>
                <span className="text-white/50">Artist</span>
                <span className="text-white">{manga.artist}</span>
                <span className="text-white/50">Update</span>
                <span className="text-white">Setiap {dayLabel(manga.day)}</span>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {firstChapter && (
                  <Link
                    to={`/manga/${manga.id}/chapter/${firstChapter.number}`}
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-semibold text-bg-ink shadow-glow hover:bg-accent-glow"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                      <path d="M5 4l14 8-14 8V4z" />
                    </svg>
                    Mulai Baca · Ch. {firstChapter.number}
                  </Link>
                )}
                {lastChapter && (
                  <Link
                    to={`/manga/${manga.id}/chapter/${lastChapter.number}`}
                    className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 font-semibold ring-1 ring-white/20 hover:bg-white/15"
                  >
                    Chapter Terbaru · Ch. {lastChapter.number}
                  </Link>
                )}
                <BookmarkButton key={manga.id} mangaId={manga.id} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Synopsis */}
      <section className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-[1fr_320px]">
          <div>
            <div className="rounded-xl border border-bg-line bg-bg-card/40 p-5 md:p-6">
              <h2 className="font-display text-lg font-bold">Sinopsis</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-mute md:text-base">
                {manga.synopsis}
              </p>
              <p className="mt-3 text-sm italic text-ink-dim">
                "{manga.tagline}"
              </p>
            </div>

            {/* Chapter list */}
            <div className="mt-6 rounded-xl border border-bg-line bg-bg-card/40">
              <div className="flex items-center justify-between border-b border-bg-line px-5 py-4">
                <h2 className="font-display text-lg font-bold">
                  Daftar Chapter
                </h2>
                <span className="text-xs text-ink-mute">
                  {chapters.length} chapter terbaru
                </span>
              </div>
              <ul className="divide-y divide-bg-line">
                {chapters.map((c) => (
                  <li key={c.number}>
                    <Link
                      to={`/manga/${manga.id}/chapter/${c.number}`}
                      className="flex items-center justify-between gap-4 px-5 py-3 hover:bg-white/5"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">
                            Chapter {c.number}
                          </span>
                          {c.isNew && (
                            <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent">
                              New
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-xs text-ink-mute">
                          {c.title} · {c.pages} halaman
                        </p>
                      </div>
                      <span className="hidden text-xs text-ink-dim sm:inline">
                        {c.date}
                      </span>
                      <svg viewBox="0 0 24 24" className="h-4 w-4 text-ink-dim" fill="none">
                        <path
                          d="M9 6l6 6-6 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar info */}
          <aside className="space-y-4">
            <div className="rounded-xl border border-bg-line bg-bg-card/40 p-5">
              <h3 className="font-display text-base font-bold">Statistik</h3>
              <dl className="mt-3 space-y-2 text-sm">
                <Row label="Total Views" value={formatNumber(manga.views)} />
                <Row label="Likes" value={formatNumber(manga.likes)} />
                <Row label="Bookmark" value={formatNumber(manga.bookmarks)} />
                <Row label="Chapter" value={manga.chapters} />
                <Row label="Rating" value={`${manga.rating.toFixed(1)} / 10`} />
                <Row label="Status" value={manga.status === "ongoing" ? "Ongoing" : "Tamat"} />
              </dl>
            </div>
            <div className="rounded-xl border border-bg-line bg-bg-card/40 p-5">
              <h3 className="font-display text-base font-bold">Info Series</h3>
              <dl className="mt-3 space-y-2 text-sm">
                <Row label="Tipe" value={manga.type === "manhwa" ? "Manhwa" : "Manga"} />
                <Row label="Tahun rilis" value={manga.year} />
                <Row label="Author" value={manga.author} />
                <Row label="Artist" value={manga.artist} />
                <Row label="Update" value={dayLabel(manga.day)} />
              </dl>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-12">
            <SectionHeader title="Mungkin Kamu Suka" subtitle="Series dengan genre yang mirip" icon="✨" />
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {related.map((m) => (
                <MangaCard key={m.id} manga={m} />
              ))}
            </div>
          </section>
        )}
      </section>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-ink-mute">{label}</dt>
      <dd className="font-semibold">{value}</dd>
    </div>
  );
}

function dayLabel(d) {
  const map = {
    mon: "Senin",
    tue: "Selasa",
    wed: "Rabu",
    thu: "Kamis",
    fri: "Jumat",
    sat: "Sabtu",
    sun: "Minggu",
  };
  return map[d] || d;
}

function readBookmarks() {
  try {
    return JSON.parse(localStorage.getItem("mv_bookmarks") || "[]");
  } catch {
    return [];
  }
}

function BookmarkButton({ mangaId }) {
  const [marked, setMarked] = useState(() => readBookmarks().includes(mangaId));

  const toggle = () => {
    const stored = readBookmarks();
    const next = marked
      ? stored.filter((x) => x !== mangaId)
      : [...stored, mangaId];
    localStorage.setItem("mv_bookmarks", JSON.stringify(next));
    setMarked(!marked);
  };

  return (
    <button
      onClick={toggle}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-3 font-semibold ring-1 transition ${
        marked
          ? "bg-accent/15 text-accent ring-accent/40"
          : "bg-white/10 text-white ring-white/20 hover:bg-white/15"
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill={marked ? "currentColor" : "none"}>
        <path
          d="M6 4h12v16l-6-4-6 4V4z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {marked ? "Tersimpan" : "Bookmark"}
    </button>
  );
}
