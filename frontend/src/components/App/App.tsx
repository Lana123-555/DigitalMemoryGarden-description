import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Loader from "../Loader/Loader";
import Layout from "../Layout/Layout";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const GardenPage = lazy(() => import("../../pages/GardenPage/GardenPage"));
const CandlesPage = lazy(() => import("../../pages/CandlesPage/CandlesPage"));
const ArchivesPage = lazy(
  () => import("../../pages/ArchivesPage/ArchivesPage")
);
const GalleryPage = lazy(() => import("../../pages/GalleryPage/GalleryPage"));
const DonatePage = lazy(() => import("../../pages/DonatePage/DonatePage"));
const AboutPage = lazy(() => import("../../pages/AboutPage/AboutPage"));

const AdminLoginPage = lazy(() => import("../../pages/admin/AdminLoginPage"));
const AdminHomePage = lazy(() => import("../../pages/admin/AdminHomePage"));
const AdminCategoryPage = lazy(
  () => import("../../pages/admin/AdminCategoryPage")
);
const AdminMapEventPage = lazy(
  () => import("../../pages/admin/AdminMapEventPage")
);
const AdminCandleTypePage = lazy(
  () => import("../../pages/admin/AdminCandleTypePage")
);

export default function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/garden" element={<GardenPage />} />
            <Route path="/candles" element={<CandlesPage />} />
            <Route path="/archives" element={<ArchivesPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/about" element={<AboutPage />} />
          </Route>

          {/* Admin panel */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminHomePage />}>
            <Route path="categories" element={<AdminCategoryPage />} />
            <Route path="events" element={<AdminMapEventPage />} />
            <Route path="candle-types" element={<AdminCandleTypePage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
