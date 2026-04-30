import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Detail from "./pages/Detail";
import Reader from "./pages/Reader";
import NotFound from "./pages/NotFound";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();
  const isReader = /^\/manga\/[^/]+\/chapter\/\d+/.test(pathname);

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      {!isReader && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/katalog" element={<Catalog />} />
          <Route path="/manga/:id" element={<Detail />} />
          <Route path="/manga/:id/chapter/:num" element={<Reader />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isReader && <Footer />}
    </div>
  );
}
