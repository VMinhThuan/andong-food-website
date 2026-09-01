import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LazyMotion, domAnimation } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ScrollProgress from './components/common/ScrollProgress';
import BrandPreloader from './components/common/BrandPreloader';
import PreFooterCTA from './components/common/PreFooterCTA';
import ScrollToTop from './components/common/ScrollToTop';
import HotlineModal from './components/common/HotlineModal';
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ScanQRPage = lazy(() => import('./pages/ScanQRPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'));

function isAdminHostname() {
  if (typeof window === 'undefined') return false;
  const hostname = window.location.hostname;
  return hostname === 'admin.andofood.vn' || hostname.startsWith('admin.');
}

export default function App() {
  return (
    <LazyMotion features={domAnimation}>
      <AuthProvider><Router>{isAdminHostname() ? <AdminAppContent /> : <PublicAppContent />}</Router></AuthProvider>
    </LazyMotion>
  );
}

function PublicAppContent() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
        {/* Tự động cuộn trang lên đầu mỗi khi chuyển tab / route */}
        <ScrollToTop />

        {/* Luxury Brand Preloader on initial load */}
        {isLoading && <BrandPreloader onFinish={() => setIsLoading(false)} />}

        <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          {/* Global Scroll Reading Progress Bar & Back to top button */}
          <ScrollProgress />
          
          <Navbar />
          <main style={{ flex: 1 }}>
            <Suspense fallback={<PageLoading />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/gioi-thieu" element={<AboutPage />} />
              <Route path="/san-pham" element={<ProductsPage />} />
              <Route path="/san-pham/:slug" element={<ProductDetailPage />} />
              <Route path="/lien-he" element={<ContactPage />} />
              <Route path="/quet-ma-qr" element={<ScanQRPage />} />
              <Route path="/dang-nhap" element={<Navigate to="/" replace />} />
              <Route path="/quan-tri" element={<Navigate to="/" replace />} />
            </Routes>
            </Suspense>
          </main>
          <PreFooterCTA />
          <Footer />
        </div>

        {/* Global Hotline & Đặt hàng Popup Modal */}
        <HotlineModal />
    </>
  );
}

function AdminAppContent() {
  return <div className="admin-app-layout"><Suspense fallback={<PageLoading />}>
    <Routes>
      <Route path="/dang-nhap" element={<LoginPage />} />
      <Route path="/quan-tri" element={<AdminDashboardPage />} />
      <Route path="/" element={<Navigate to="/quan-tri" replace />} />
      <Route path="*" element={<Navigate to="/quan-tri" replace />} />
    </Routes>
  </Suspense></div>;
}

function PageLoading() {
  return <div style={{ minHeight: '45vh', display: 'grid', placeItems: 'center', color: 'var(--primary)' }} aria-live="polite">
    Đang mở trang…
  </div>;
}
