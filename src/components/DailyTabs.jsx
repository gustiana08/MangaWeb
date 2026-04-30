import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Cover from "./Cover";
import { DAYS } from "../data/genres";
import { MANGA, formatNumber } from "../data/manga";

export default function DailyTabs() {
  const today = new Date().getDay(); // 0=Sun..6=Sat
  const dayMap = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const [day, setDay] = useState(dayMap[today]);

  const list = useMemo(() => {
    if (day === "all") return MANGA;
    return MANGA.filter((m) => m.day === day);
  }, [day]);

  return (
    <div>
      <div
        className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-2"
        role="tablist"
      >
        {DAYS.map((d) => (
          <button
            key={d.slug}
            role="tab"
            aria-selected={day === d.slug}
            onClick={() => setDay(d.slug)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
              day === d.slug
                ? "bg-accent text-bg-ink shadow-glow"
                : "bg-bg-card border border-bg-line text-ink-mute hover:text-ink"
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <div className="rounded-xl border border-dashed border-bg-line p-8 text-center text-ink-mute">
          Belum ada update hari ini. Coba hari lain ya!
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {list.map((manga) => (
            <Link
              key={manga.id}
              to={`/manga/${manga.id}`}
              className="group relative block animate-fade-in"
            >
              <Cover manga={manga} showBadge showTitle={false} />
              <span className="absolute right-2 top-2 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-bg-ink shadow-glow">
                Baru
              </span>
              <div className="mt-2.5">
                <h3 className="line-clamp-1 text-sm font-semibold group-hover:text-accent transition">
                  {manga.title}
                </h3>
                <p className="mt-0.5 line-clamp-1 text-xs text-ink-mute">
                  Ch. {manga.chapters} · {formatNumber(manga.views)} views
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
