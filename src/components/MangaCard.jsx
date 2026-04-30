import { Link } from "react-router-dom";
import Cover from "./Cover";
import { formatNumber } from "../data/manga";

export default function MangaCard({ manga, size = "md", showRank, rank }) {
  const sizes = {
    sm: "w-[140px] sm:w-[160px]",
    md: "w-full",
    lg: "w-full",
  };
  return (
    <Link
      to={`/manga/${manga.id}`}
      className={`group relative block ${sizes[size]} animate-fade-in`}
    >
      <div className="relative">
        <Cover manga={manga} showBadge={!showRank} showTitle={false} />

        {showRank && (
          <div
            className="absolute -left-2 -top-2 z-10 grid h-10 w-10 place-items-center rounded-lg font-display text-xl font-extrabold text-white shadow-card ring-2 ring-bg"
            style={{ background: manga.accent }}
          >
            {rank}
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 p-2">
          <div className="flex items-center gap-2 text-[11px] text-white/80">
            <span className="inline-flex items-center gap-1 rounded-full bg-black/55 backdrop-blur px-1.5 py-0.5">
              <svg
                viewBox="0 0 24 24"
                className="h-3 w-3 text-yellow-400"
                fill="currentColor"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
              </svg>
              {manga.rating.toFixed(1)}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-black/55 backdrop-blur px-1.5 py-0.5">
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor">
                <path d="M12 4.5C7 4.5 2.7 8 1 12c1.7 4 6 7.5 11 7.5s9.3-3.5 11-7.5c-1.7-4-6-7.5-11-7.5zm0 12a4.5 4.5 0 110-9 4.5 4.5 0 010 9z" />
              </svg>
              {formatNumber(manga.views)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-2.5">
        <h3 className="line-clamp-1 text-sm font-semibold group-hover:text-accent transition">
          {manga.title}
        </h3>
        <p className="mt-0.5 line-clamp-1 text-xs text-ink-mute">
          {manga.genres.slice(0, 2).join(" · ")} · Ch. {manga.chapters}
        </p>
      </div>
    </Link>
  );
}
