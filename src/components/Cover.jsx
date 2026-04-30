// Generates a stylized SVG poster for a manga based on its title + palette.
// No external image assets needed — looks consistent and themed.

const STYLE_VARIANTS = ["aurora", "rays", "stripes", "circuit", "rings", "halftone"];

function pickVariant(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++)
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return STYLE_VARIANTS[hash % STYLE_VARIANTS.length];
}

function abbreviate(title) {
  const words = title.split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 3).toUpperCase();
  return words
    .slice(0, 3)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function Cover({
  manga,
  ratio = "3/4",
  className = "",
  showTitle = true,
  showBadge = false,
  rounded = "rounded-xl",
}) {
  const [c1, c2, c3] = manga.palette;
  const variant = pickVariant(manga.id);
  const initials = abbreviate(manga.title);

  return (
    <div
      className={`relative overflow-hidden ${rounded} ${className}`}
      style={{ aspectRatio: ratio }}
      aria-label={`Cover for ${manga.title}`}
    >
      <svg
        viewBox="0 0 300 400"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        role="img"
      >
        <defs>
          <linearGradient id={`bg-${manga.id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={c1} />
            <stop offset="100%" stopColor={c2} />
          </linearGradient>
          <radialGradient id={`spot-${manga.id}`} cx="0.7" cy="0.2" r="0.9">
            <stop offset="0%" stopColor={c3} stopOpacity="0.55" />
            <stop offset="100%" stopColor={c3} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`shade-${manga.id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="55%" stopColor="#000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.85" />
          </linearGradient>
        </defs>

        <rect width="300" height="400" fill={`url(#bg-${manga.id})`} />
        <rect width="300" height="400" fill={`url(#spot-${manga.id})`} />

        {variant === "aurora" && (
          <g opacity="0.9">
            <path
              d="M0 220 C 80 160, 160 280, 300 200 L300 400 L0 400 Z"
              fill={c3}
              opacity="0.25"
            />
            <path
              d="M0 280 C 100 220, 200 340, 300 260 L300 400 L0 400 Z"
              fill={c3}
              opacity="0.18"
            />
          </g>
        )}

        {variant === "rays" && (
          <g
            transform="translate(150 80)"
            stroke={c3}
            strokeWidth="2"
            opacity="0.35"
          >
            {Array.from({ length: 14 }).map((_, i) => (
              <line
                key={i}
                x1="0"
                y1="0"
                x2={Math.cos((i * Math.PI) / 7) * 360}
                y2={Math.sin((i * Math.PI) / 7) * 360}
              />
            ))}
          </g>
        )}

        {variant === "stripes" && (
          <g opacity="0.18">
            {Array.from({ length: 12 }).map((_, i) => (
              <rect
                key={i}
                x={-100 + i * 40}
                y="-50"
                width="14"
                height="500"
                fill={c3}
                transform="rotate(20 150 200)"
              />
            ))}
          </g>
        )}

        {variant === "circuit" && (
          <g
            stroke={c3}
            strokeWidth="1.5"
            fill="none"
            opacity="0.45"
          >
            <path d="M20 60 H100 V120 H180 V60 H260 V200 H140 V300 H40 V200 H20 Z" />
            <circle cx="100" cy="120" r="3" fill={c3} />
            <circle cx="180" cy="60" r="3" fill={c3} />
            <circle cx="260" cy="200" r="3" fill={c3} />
            <circle cx="140" cy="300" r="3" fill={c3} />
          </g>
        )}

        {variant === "rings" && (
          <g
            stroke={c3}
            fill="none"
            strokeWidth="1.5"
            opacity="0.5"
            transform="translate(220 90)"
          >
            <circle r="40" />
            <circle r="60" opacity="0.7" />
            <circle r="80" opacity="0.5" />
            <circle r="100" opacity="0.3" />
          </g>
        )}

        {variant === "halftone" && (
          <g fill={c3} opacity="0.35">
            {Array.from({ length: 9 }).map((_, row) =>
              Array.from({ length: 7 }).map((_, col) => (
                <circle
                  key={`${row}-${col}`}
                  cx={20 + col * 45}
                  cy={20 + row * 45}
                  r={1.5 + ((row + col) % 4) * 0.8}
                />
              ))
            )}
          </g>
        )}

        {/* Big initials */}
        <text
          x="50%"
          y="48%"
          textAnchor="middle"
          fontFamily="Poppins, Inter, sans-serif"
          fontWeight="900"
          fontSize="120"
          fill="#ffffff"
          opacity="0.13"
          letterSpacing="-4"
        >
          {initials}
        </text>

        {/* Bottom shade */}
        <rect width="300" height="400" fill={`url(#shade-${manga.id})`} />

        {showTitle && (
          <g>
            <text
              x="20"
              y="350"
              fontFamily="Poppins, Inter, sans-serif"
              fontWeight="700"
              fontSize="20"
              fill="#fff"
            >
              {manga.title.length > 22
                ? manga.title.slice(0, 22) + "…"
                : manga.title}
            </text>
            <text
              x="20"
              y="375"
              fontFamily="Inter, sans-serif"
              fontWeight="500"
              fontSize="11"
              fill="#fff"
              opacity="0.7"
              style={{ textTransform: "uppercase", letterSpacing: 1.5 }}
            >
              {manga.type === "manhwa" ? "Manhwa" : "Manga"} · {manga.genres[0]}
            </text>
          </g>
        )}
      </svg>

      {showBadge && (
        <div className="absolute left-2 top-2 z-10">
          <span
            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white"
            style={{ background: manga.accent }}
          >
            {manga.type === "manhwa" ? "Manhwa" : "Manga"}
          </span>
        </div>
      )}
    </div>
  );
}

// Generate a chapter "page" image (used by the Reader). Each page is an SVG
// styled like a scrolling Webtoon panel.
export function ChapterPage({ manga, chapterNumber, pageIndex }) {
  const [c1, c2, c3] = manga.palette;
  const id = `${manga.id}-${chapterNumber}-${pageIndex}`;
  const variant = pageIndex % 4;
  return (
    <div className="reader-page">
      <svg
        viewBox="0 0 720 1000"
        preserveAspectRatio="xMidYMid slice"
        className="block w-full"
        role="img"
        aria-label={`Page ${pageIndex + 1} of chapter ${chapterNumber}`}
      >
        <defs>
          <linearGradient id={`p-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={c1} />
            <stop offset="100%" stopColor={c2} />
          </linearGradient>
          <radialGradient id={`pg-${id}`} cx="0.5" cy="0.3" r="0.9">
            <stop offset="0%" stopColor={c3} stopOpacity="0.5" />
            <stop offset="100%" stopColor={c3} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="720" height="1000" fill={`url(#p-${id})`} />
        <rect width="720" height="1000" fill={`url(#pg-${id})`} />

        {variant === 0 && (
          <g>
            <rect
              x="40"
              y="60"
              width="640"
              height="380"
              rx="12"
              fill="rgba(0,0,0,0.35)"
              stroke={c3}
              strokeOpacity="0.3"
            />
            <text
              x="360"
              y="260"
              textAnchor="middle"
              fontFamily="Poppins, Inter, sans-serif"
              fontWeight="800"
              fontSize="56"
              fill="#fff"
              opacity="0.9"
            >
              Chapter {chapterNumber}
            </text>
            <text
              x="360"
              y="310"
              textAnchor="middle"
              fontFamily="Inter, sans-serif"
              fontWeight="500"
              fontSize="22"
              fill="#fff"
              opacity="0.7"
            >
              {manga.tagline}
            </text>
            <rect
              x="60"
              y="500"
              width="600"
              height="3"
              fill={c3}
              opacity="0.6"
            />
            <text
              x="60"
              y="570"
              fontFamily="Inter, sans-serif"
              fontSize="20"
              fill="#fff"
              opacity="0.85"
            >
              [Halaman {pageIndex + 1}]
            </text>
            <text
              x="60"
              y="610"
              fontFamily="Inter, sans-serif"
              fontSize="16"
              fill="#fff"
              opacity="0.7"
            >
              {manga.title} — {manga.type.toUpperCase()}
            </text>
          </g>
        )}

        {variant === 1 && (
          <g opacity="0.85">
            {Array.from({ length: 6 }).map((_, i) => (
              <rect
                key={i}
                x={60 + (i % 2) * 320}
                y={80 + Math.floor(i / 2) * 290}
                width="280"
                height="260"
                rx="10"
                fill="rgba(0,0,0,0.3)"
                stroke={c3}
                strokeOpacity="0.35"
              />
            ))}
            <text
              x="360"
              y="970"
              textAnchor="middle"
              fontFamily="Poppins, Inter, sans-serif"
              fontWeight="700"
              fontSize="22"
              fill="#fff"
              opacity="0.85"
            >
              · halaman {pageIndex + 1} ·
            </text>
          </g>
        )}

        {variant === 2 && (
          <g>
            <circle
              cx="360"
              cy="500"
              r="240"
              fill="none"
              stroke={c3}
              strokeWidth="2"
              opacity="0.5"
            />
            <circle
              cx="360"
              cy="500"
              r="180"
              fill="none"
              stroke={c3}
              strokeWidth="1"
              opacity="0.35"
            />
            <text
              x="360"
              y="510"
              textAnchor="middle"
              fontFamily="Poppins, Inter, sans-serif"
              fontWeight="900"
              fontSize="160"
              fill="#fff"
              opacity="0.18"
            >
              {chapterNumber}
            </text>
            <text
              x="360"
              y="780"
              textAnchor="middle"
              fontFamily="Inter, sans-serif"
              fontSize="20"
              fill="#fff"
              opacity="0.75"
            >
              halaman {pageIndex + 1}
            </text>
          </g>
        )}

        {variant === 3 && (
          <g>
            {Array.from({ length: 24 }).map((_, i) => (
              <line
                key={i}
                x1="0"
                x2="720"
                y1={60 + i * 40}
                y2={60 + i * 40}
                stroke={c3}
                strokeOpacity={0.05 + (i % 3) * 0.06}
                strokeWidth="1"
              />
            ))}
            <rect
              x="120"
              y="380"
              width="480"
              height="240"
              rx="14"
              fill="rgba(0,0,0,0.45)"
              stroke={c3}
              strokeOpacity="0.4"
            />
            <text
              x="360"
              y="500"
              textAnchor="middle"
              fontFamily="Poppins, Inter, sans-serif"
              fontWeight="800"
              fontSize="42"
              fill="#fff"
            >
              "{manga.tagline}"
            </text>
            <text
              x="360"
              y="560"
              textAnchor="middle"
              fontFamily="Inter, sans-serif"
              fontSize="18"
              fill="#fff"
              opacity="0.6"
            >
              — {manga.title}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
