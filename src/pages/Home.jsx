import { Link } from "react-router-dom";
import HeroCarousel from "../components/HeroCarousel";
import SectionHeader from "../components/SectionHeader";
import MangaCard from "../components/MangaCard";
import DailyTabs from "../components/DailyTabs";
import GenreGrid from "../components/GenreGrid";
import { MANGA, formatNumber } from "../data/manga";
import Cover from "../components/Cover";

export default function Home() {
  const featured = [...MANGA].sort((a, b) => b.rating - a.rating).slice(0, 4);
  const trending = [...MANGA].sort((a, b) => b.views - a.views).slice(0, 10);
  const newest = [...MANGA]
    .sort((a, b) => b.year - a.year || b.likes - a.likes)
    .slice(0, 12);
  const top10 = [...MANGA]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 10);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-10 space-y-12">
      <HeroCarousel items={featured} />

      {/* Trending row */}
      <section>
        <SectionHeader
          title="Trending Sekarang"
          subtitle="Lagi dibaca ramai-ramai minggu ini"
          icon="🔥"
          viewAll="/katalog?sort=trending"
        />
        <div className="no-scrollbar -mx-4 flex gap-4 overflow-x-auto px-4 md:mx-0 md:px-0">
          {trending.map((m) => (
            <div key={m.id} className="w-[160px] shrink-0 sm:w-[180px]">
              <MangaCard manga={m} />
            </div>
          ))}
        </div>
      </section>

      {/* Daily updates */}
      <section>
        <SectionHeader
          title="Update Harian"
          subtitle="Episode baru sesuai jadwal rilis"
          icon="📅"
          viewAll="/katalog"
        />
        <DailyTabs />
      </section>

      {/* Top 10 */}
      <section>
        <SectionHeader
          title="Top 10 Minggu Ini"
          subtitle="Berdasarkan jumlah likes pembaca"
          icon="🏆"
        />
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5">
          {top10.map((m, i) => (
            <MangaCard key={m.id} manga={m} showRank rank={i + 1} />
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative overflow-hidden rounded-2xl border border-bg-line bg-grad-hero p-8 md:p-12">
        <div className="grid items-center gap-6 md:grid-cols-2">
          <div>
            <h3 className="font-display text-2xl font-extrabold md:text-3xl">
              Baca tanpa batas, kapan saja.
            </h3>
            <p className="mt-3 max-w-md text-sm text-ink-mute md:text-base">
              Reader vertikal mode terang & gelap, sinkron progres baca,
              bookmark otomatis, dan zero-ads di reader. Demo project showcase.
            </p>
            <div className="mt-5 flex gap-3">
              <Link
                to="/katalog"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-semibold text-bg-ink shadow-glow hover:bg-accent-glow"
              >
                Mulai Membaca
              </Link>
              <Link
                to="/manga/shadow-monarch/chapter/142"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 font-semibold ring-1 ring-white/20 hover:bg-white/15"
              >
                Coba Reader
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {MANGA.slice(0, 3).map((m, i) => (
              <Cover
                key={m.id}
                manga={m}
                className={`shadow-card ${
                  i === 1 ? "translate-y-4" : ""
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Genre */}
      <section>
        <SectionHeader
          title="Telusuri Genre"
          subtitle="Pilih genre favoritmu"
          icon="🎨"
        />
        <GenreGrid />
      </section>

      {/* Newest */}
      <section>
        <SectionHeader
          title="Series Terbaru"
          subtitle="Judul paling fresh tahun ini"
          icon="✨"
          viewAll="/katalog?sort=newest"
        />
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {newest.map((m) => (
            <MangaCard key={m.id} manga={m} />
          ))}
        </div>
      </section>

      {/* Stats strip */}
      <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          {
            n: `${MANGA.length}+`,
            l: "Judul Tersedia",
            i: "📚",
          },
          {
            n: `${formatNumber(
              MANGA.reduce((s, m) => s + m.chapters, 0)
            )}+`,
            l: "Chapter",
            i: "📖",
          },
          {
            n: `${formatNumber(
              MANGA.reduce((s, m) => s + m.views, 0)
            )}`,
            l: "Total Views",
            i: "👁️",
          },
          { n: "100%", l: "Reader Ringan", i: "⚡" },
        ].map((s) => (
          <div
            key={s.l}
            className="glass rounded-xl p-5 text-center"
          >
            <div className="text-3xl">{s.i}</div>
            <div className="mt-2 font-display text-2xl font-extrabold text-gradient">
              {s.n}
            </div>
            <div className="text-xs text-ink-mute">{s.l}</div>
          </div>
        ))}
      </section>
    </div>
  );
}
