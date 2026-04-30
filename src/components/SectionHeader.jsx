import { Link } from "react-router-dom";

export default function SectionHeader({ title, subtitle, viewAll, icon }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-5">
      <div>
        <h2 className="flex items-center gap-2 font-display text-xl font-bold tracking-tight md:text-2xl">
          {icon && <span aria-hidden>{icon}</span>}
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-sm text-ink-mute">{subtitle}</p>
        )}
      </div>
      {viewAll && (
        <Link
          to={viewAll}
          className="text-sm text-accent hover:text-accent-glow font-medium inline-flex items-center gap-1"
        >
          Lihat semua
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
            <path
              d="M9 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      )}
    </div>
  );
}
