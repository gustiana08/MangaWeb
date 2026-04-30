import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import MangaCard from "../components/MangaCard";
import { DAYS, GENRES } from "../data/genres";
import { MANGA } from "../data/manga";

const SORTS = [
  { value: "popular", label: "Populer" },
  { value: "rating", label: "Rating Tertinggi" },
  { value: "newest", label: "Terbaru" },
  { value: "az", label: "A-Z" },
  { value: "trending", label: "Trending" },
];

const TYPES = [
  { value: "all", label: "Semua" },
  { value: "manhwa", label: "Manhwa" },
  { value: "manga", label: "Manga" },
];

const STATUSES = [
  { value: "all", label: "Semua status" },
  { value: "ongoing", label: "Ongoing" },
  { value: "completed", label: "Tamat" },
];

const DAY_MAP = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

const FILTER_DEFAULTS = {
  q: "",
  genre: "all",
  type: "all",
  status: "all",
  sort: "popular",
  day: "all",
};

function resolveDay(raw) {
  if (!raw) return "all";
  if (raw === "daily" || raw === "today") return DAY_MAP[new Date().getDay()];
  return raw;
}

export default function Catalog() {
  const [params, setParams] = useSearchParams();

  const q = params.get("q") || FILTER_DEFAULTS.q;
  const genre = params.get("genre") || FILTER_DEFAULTS.genre;
  const type = params.get("type") || FILTER_DEFAULTS.type;
  const status = params.get("status") || FILTER_DEFAULTS.status;
  const sort = params.get("sort") || FILTER_DEFAULTS.sort;
  const day = resolveDay(params.get("day"));

  const setParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (!value || value === FILTER_DEFAULTS[key]) {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setParams(next, { replace: true });
  };

  const setQ = (v) => setParam("q", v);
  const setGenre = (v) => setParam("genre", v);
  const setType = (v) => setParam("type", v);
  const setStatus = (v) => setParam("status", v);
  const setSort = (v) => setParam("sort", v);
  const setDay = (v) => setParam("day", v);

  const filtered = useMemo(() => {
    let list = [...MANGA];
    const ql = q.trim().toLowerCase();
    if (ql) {
      list = list.filter(
        (m) =>
          m.title.toLowerCase().includes(ql) ||
          m.altTitle.toLowerCase().includes(ql) ||
          m.author.toLowerCase().includes(ql) ||
          m.synopsis.toLowerCase().includes(ql)
      );
    }
    if (genre !== "all") list = list.filter((m) => m.genres.includes(genre));
    if (type !== "all") list = list.filter((m) => m.type === type);
    if (status !== "all") list = list.filter((m) => m.status === status);
    if (day !== "all") list = list.filter((m) => m.day === day);

    switch (sort) {
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        list.sort((a, b) => b.year - a.year);
        break;
      case "az":
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "trending":
        list.sort((a, b) => b.views - a.views);
        break;
      case "popular":
      default:
        list.sort((a, b) => b.likes - a.likes);
        break;
    }
    return list;
  }, [q, genre, type, status, sort, day]);

  const reset = () => setParams(new URLSearchParams(), { replace: true });

  const hasActiveFilter =
    q ||
    genre !== "all" ||
    type !== "all" ||
    status !== "all" ||
    sort !== "popular" ||
    day !== "all";

  const dayLabel =
    day === "all" ? null : DAYS.find((d) => d.slug === day)?.label;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-10">
      <header className="mb-6">
        <h1 className="font-display text-2xl font-extrabold md:text-3xl">
          Katalog
        </h1>
        <p className="mt-1 text-sm text-ink-mute">
          {filtered.length} judul ditemukan dari total {MANGA.length} series
          {dayLabel && (
            <span>
              {" · "}update <span className="text-accent">{dayLabel}</span>
            </span>
          )}
        </p>
      </header>

      {/* Filter bar */}
      <div className="space-y-4 rounded-xl border border-bg-line bg-bg-card/60 p-4 md:p-5">
        <div className="grid gap-3 md:grid-cols-[1fr_auto_auto_auto_auto]">
          <label className="relative">
            <span className="sr-only">Cari</span>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari judul, author, atau kata kunci…"
              className="w-full rounded-full bg-bg border border-bg-line px-4 py-2.5 pl-10 text-sm placeholder:text-ink-dim outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20"
            />
            <svg
              viewBox="0 0 24 24"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-dim"
              fill="none"
            >
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </label>
          <Select value={type} onChange={setType} options={TYPES} />
          <Select value={status} onChange={setStatus} options={STATUSES} />
          <Select
            value={day}
            onChange={setDay}
            options={DAYS.map((d) => ({
              value: d.slug,
              label: d.slug === "all" ? "Semua hari" : d.label,
            }))}
          />
          <Select value={sort} onChange={setSort} options={SORTS} />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setGenre("all")}
            className={pill(genre === "all")}
          >
            Semua genre
          </button>
          {GENRES.map((g) => (
            <button
              key={g.slug}
              onClick={() => setGenre(g.slug)}
              className={pill(genre === g.slug)}
              style={
                genre === g.slug
                  ? { background: g.color, color: "#0b0d12" }
                  : undefined
              }
            >
              <span className="mr-1">{g.icon}</span>
              {g.name}
            </button>
          ))}
        </div>

        {hasActiveFilter && (
          <div className="flex items-center justify-between border-t border-bg-line pt-3 text-xs text-ink-mute">
            <span>
              Filter aktif. Tekan Reset untuk mengembalikan ke default.
            </span>
            <button
              onClick={reset}
              className="rounded-full bg-bg px-3 py-1 ring-1 ring-bg-line hover:text-ink"
            >
              Reset filter
            </button>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="mt-8">
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-bg-line p-12 text-center">
            <div className="text-5xl">😔</div>
            <h3 className="mt-3 text-lg font-semibold">
              Tidak ada hasil yang cocok
            </h3>
            <p className="mt-1 text-sm text-ink-mute">
              Coba ubah kata kunci atau hapus beberapa filter.
            </p>
            <button
              onClick={reset}
              className="mt-4 inline-flex rounded-full bg-accent px-4 py-2 text-sm font-semibold text-bg-ink hover:bg-accent-glow"
            >
              Reset filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filtered.map((m) => (
              <MangaCard key={m.id} manga={m} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function pill(active) {
  return `inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium ring-1 transition ${
    active
      ? "bg-accent text-bg-ink ring-accent shadow-glow"
      : "bg-bg text-ink-mute ring-bg-line hover:text-ink"
  }`;
}

function Select({ value, onChange, options }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-full bg-bg border border-bg-line px-4 py-2.5 pr-9 text-sm outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <svg
        viewBox="0 0 24 24"
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-dim"
        fill="none"
      >
        <path
          d="M6 9l6 6 6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
