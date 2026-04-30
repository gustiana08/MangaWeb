import { Link, useParams, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { getMangaById, getChaptersFor } from "../data/manga";
import { ChapterPage } from "../components/Cover";

export default function Reader() {
  const { id, num } = useParams();
  const navigate = useNavigate();
  const manga = getMangaById(id);
  const chapterNumber = Number(num);

  const [headerVisible, setHeaderVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const lastY = useRef(0);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [id, num]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const h =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(100, (y / h) * 100) : 0);
      // hide header on scroll down, show on scroll up
      if (y > lastY.current + 6 && y > 80) setHeaderVisible(false);
      else if (y < lastY.current - 4) setHeaderVisible(true);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const chapter = useMemo(() => {
    if (!manga) return null;
    return getChaptersFor(manga.id).find((c) => c.number === chapterNumber);
  }, [manga, chapterNumber]);

  // Mark read whenever a valid chapter is being viewed.
  useEffect(() => {
    if (!manga || !chapter) return;
    try {
      const key = "mv_progress";
      const data = JSON.parse(localStorage.getItem(key) || "{}");
      data[manga.id] = chapter.number;
      localStorage.setItem(key, JSON.stringify(data));
    } catch {
      /* noop */
    }
  }, [manga, chapter]);

  if (!manga) return <Navigate to="/katalog" replace />;
  if (!chapter)
    return <Navigate to={`/manga/${manga.id}`} replace />;

  const allChapters = getChaptersFor(manga.id).map((c) => c.number).sort((a, b) => a - b);
  const idxInOrder = allChapters.indexOf(chapter.number);
  const prevNum = idxInOrder > 0 ? allChapters[idxInOrder - 1] : null;
  const nextNum =
    idxInOrder < allChapters.length - 1 ? allChapters[idxInOrder + 1] : null;

  const onChapterChange = (e) => {
    navigate(`/manga/${manga.id}/chapter/${e.target.value}`);
  };

  return (
    <div className="bg-bg min-h-screen">
      {/* Top reader bar */}
      <div
        className={`sticky top-0 z-30 transition-transform ${
          headerVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="border-b border-bg-line bg-bg/85 backdrop-blur-md">
          <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
            <Link
              to={`/manga/${manga.id}`}
              className="grid h-9 w-9 place-items-center rounded-full bg-bg-card border border-bg-line text-ink-mute hover:text-ink"
              aria-label="Kembali"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                <path
                  d="M15 6l-6 6 6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs text-ink-mute">{manga.title}</p>
              <p className="truncate text-sm font-semibold">
                Chapter {chapter.number}
                <span className="ml-2 text-xs font-normal text-ink-mute">
                  · {chapter.pages} halaman
                </span>
              </p>
            </div>
            <select
              value={chapter.number}
              onChange={onChapterChange}
              className="rounded-full bg-bg-card border border-bg-line px-3 py-1.5 text-sm outline-none focus:border-accent/60"
              aria-label="Pilih chapter"
            >
              {allChapters
                .slice()
                .reverse()
                .map((n) => (
                  <option key={n} value={n}>
                    Chapter {n}
                  </option>
                ))}
            </select>
          </div>
          <div className="h-0.5 w-full bg-bg-line">
            <div
              className="h-full bg-accent transition-[width]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Pages */}
      <main className="mx-auto max-w-3xl px-2 py-6">
        <div className="space-y-2">
          {Array.from({ length: chapter.pages }).map((_, i) => (
            <ChapterPage
              key={i}
              manga={manga}
              chapterNumber={chapter.number}
              pageIndex={i}
            />
          ))}
        </div>

        <div className="my-8 rounded-xl border border-bg-line bg-bg-card/60 p-6 text-center">
          <p className="text-sm text-ink-mute">
            Selesai membaca Chapter {chapter.number}
          </p>
          <p className="mt-1 font-display text-lg font-bold">
            Bagaimana menurutmu?
          </p>
          <div className="mt-3 flex items-center justify-center gap-2">
            {["😍", "🔥", "😮", "🤯", "😢"].map((e) => (
              <button
                key={e}
                className="grid h-10 w-10 place-items-center rounded-full bg-bg-card border border-bg-line text-lg transition hover:scale-110 hover:border-accent/40"
                aria-label={`Reaksi ${e}`}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        <ChapterNav
          mangaId={manga.id}
          prevNum={prevNum}
          nextNum={nextNum}
        />
      </main>
    </div>
  );
}

function ChapterNav({ mangaId, prevNum, nextNum }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {prevNum ? (
        <Link
          to={`/manga/${mangaId}/chapter/${prevNum}`}
          className="flex items-center justify-center gap-2 rounded-xl bg-bg-card border border-bg-line py-3 text-sm font-semibold hover:border-accent/40"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Chapter {prevNum}
        </Link>
      ) : (
        <span className="flex items-center justify-center gap-2 rounded-xl bg-bg-card/30 border border-bg-line py-3 text-sm text-ink-dim">
          Sudah di awal
        </span>
      )}
      {nextNum ? (
        <Link
          to={`/manga/${mangaId}/chapter/${nextNum}`}
          className="flex items-center justify-center gap-2 rounded-xl bg-accent text-bg-ink py-3 text-sm font-bold shadow-glow hover:bg-accent-glow"
        >
          Chapter {nextNum}
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      ) : (
        <span className="flex items-center justify-center gap-2 rounded-xl bg-bg-card/30 border border-bg-line py-3 text-sm text-ink-dim">
          Chapter terbaru
        </span>
      )}
    </div>
  );
}
