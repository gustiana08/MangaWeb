import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-12 text-center">
      <div className="text-7xl">😵</div>
      <h1 className="mt-4 font-display text-3xl font-extrabold">
        Halaman tidak ditemukan
      </h1>
      <p className="mt-2 text-sm text-ink-mute">
        Sepertinya kamu tersesat di dimensi lain. Tenang, ada banyak cerita
        seru yang bisa kamu mulai dari sini.
      </p>
      <div className="mt-6 flex gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-semibold text-bg-ink shadow-glow hover:bg-accent-glow"
        >
          Kembali ke Beranda
        </Link>
        <Link
          to="/katalog"
          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 font-semibold ring-1 ring-white/20 hover:bg-white/15"
        >
          Buka Katalog
        </Link>
      </div>
    </div>
  );
}
