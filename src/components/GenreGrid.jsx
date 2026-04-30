import { Link } from "react-router-dom";
import { GENRES } from "../data/genres";
import { MANGA } from "../data/manga";

export default function GenreGrid() {
  const counts = GENRES.map((g) => ({
    ...g,
    count: MANGA.filter((m) => m.genres.includes(g.slug)).length,
  }));
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {counts.map((g) => (
        <Link
          key={g.slug}
          to={`/katalog?genre=${g.slug}`}
          className="group relative overflow-hidden rounded-xl border border-bg-line bg-bg-card p-4 transition hover:border-bg-line/40"
        >
          <div
            className="absolute inset-0 opacity-0 transition group-hover:opacity-15"
            style={{
              background: `radial-gradient(120% 80% at 80% 0%, ${g.color}, transparent 60%)`,
            }}
          />
          <div className="relative flex items-center gap-3">
            <span
              className="grid h-10 w-10 place-items-center rounded-lg text-lg"
              style={{
                background: `${g.color}20`,
                color: g.color,
              }}
            >
              {g.icon}
            </span>
            <div className="min-w-0">
              <p className="truncate font-semibold text-ink group-hover:text-accent">
                {g.name}
              </p>
              <p className="text-xs text-ink-mute">{g.count} judul</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
