import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatNumber } from "../data/manga";

export default function HeroCarousel({ items }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setIdx((i) => (i + 1) % items.length),
      5500
    );
    return () => clearInterval(t);
  }, [items.length]);

  if (!items.length) return null;
  const cur = items[idx];
  const [c1, c2, c3] = cur.palette;

  return (
    <section
      className="relative overflow-hidden rounded-2xl border border-bg-line"
      aria-label="Highlight manga & manhwa terbaru"
    >
      <div
        className="absolute inset-0 transition-[background] duration-700"
        style={{
          background: `linear-gradient(135deg, ${c1} 0%, ${c2} 60%, #0b0d12 100%)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 80% at 80% 0%, ${c3}55, transparent 60%)`,
        }}
      />

      <div className="relative grid items-center gap-8 px-6 py-10 md:grid-cols-[1.3fr_1fr] md:px-10 md:py-14">
        <div className="space-y-5 animate-slide-up" key={cur.id}>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span
              className="rounded-full px-2.5 py-1 font-bold uppercase tracking-wider text-white"
              style={{ background: cur.accent }}
            >
              {cur.type === "manhwa" ? "Manhwa" : "Manga"}
            </span>
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-white/80 ring-1 ring-white/15">
              ★ {cur.rating.toFixed(1)} / 10
            </span>
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-white/80 ring-1 ring-white/15">
              {formatNumber(cur.views)} views
            </span>
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-white/80 ring-1 ring-white/15">
              Update {dayLabel(cur.day)}
            </span>
          </div>

          <h1 className="font-display text-3xl font-extrabold leading-tight md:text-5xl">
            {cur.title}
          </h1>
          <p className="max-w-xl text-sm text-white/75 md:text-base">
            {cur.synopsis}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to={`/manga/${cur.id}`}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-semibold text-bg-ink shadow-glow transition hover:bg-accent-glow"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M5 4l14 8-14 8V4z" />
              </svg>
              Baca Sekarang
            </Link>
            <Link
              to={`/manga/${cur.id}`}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 font-semibold text-white ring-1 ring-white/20 hover:bg-white/15"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                <path
                  d="M5 7h14M5 12h14M5 17h10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              Lihat Detail
            </Link>
          </div>
        </div>

        <div className="relative hidden md:block">
          <div
            className="aspect-[3/4] w-full max-w-xs justify-self-end rotate-3 rounded-xl shadow-2xl"
            style={{
              background: `linear-gradient(160deg, ${c1}, ${c2})`,
              border: `1px solid ${c3}55`,
            }}
          >
            <div className="flex h-full flex-col justify-end p-5">
              <p className="text-xs uppercase tracking-widest text-white/60">
                Featured Series
              </p>
              <p className="mt-1 font-display text-xl font-extrabold text-white">
                {cur.title}
              </p>
              <p className="text-xs text-white/70">{cur.author}</p>
              <p className="mt-3 text-xs italic text-white/80">
                "{cur.tagline}"
              </p>
            </div>
          </div>
          <div
            className="absolute -bottom-6 -right-6 aspect-[3/4] w-40 -rotate-6 rounded-xl"
            style={{
              background: `linear-gradient(160deg, ${c2}, ${c3})`,
              opacity: 0.6,
            }}
          />
        </div>
      </div>

      <div className="relative flex items-center justify-between gap-4 border-t border-white/10 bg-black/25 px-6 py-3 md:px-10">
        <div className="flex items-center gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIdx(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === idx
                  ? "w-8 bg-accent"
                  : "w-3 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() =>
              setIdx((i) => (i - 1 + items.length) % items.length)
            }
            className="grid h-8 w-8 place-items-center rounded-full bg-white/10 ring-1 ring-white/15 hover:bg-white/20"
            aria-label="Sebelumnya"
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
          </button>
          <button
            onClick={() => setIdx((i) => (i + 1) % items.length)}
            className="grid h-8 w-8 place-items-center rounded-full bg-white/10 ring-1 ring-white/15 hover:bg-white/20"
            aria-label="Berikutnya"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
              <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
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
