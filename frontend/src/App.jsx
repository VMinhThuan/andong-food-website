import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ScrollProgress from './components/common/ScrollProgress';
import BrandPreloader from './components/common/BrandPreloader';
import PreFooterCTA from './components/common/PreFooterCTA';
import ScrollToTop from './components/common/ScrollToTop';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ContactPage from './pages/ContactPage';
import ScanQRPage from './pages/ScanQRPage';
import LoginPage from './pages/LoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

function isAdminHostname() {
  if (typeof window === 'undefined') return false;
  const hostname = window.location.hostname;
  return hostname === 'admin.andofood.vn' || hostname.startsWith('admin.');
}

export default function App() {
  return <AuthProvider><Router>{isAdminHostname() ? <AdminAppContent /> : <PublicAppContent />}</Router></AuthProvider>;
}

function PublicAppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Use the same brand loading screen for every page navigation.
  useEffect(() => {
    setIsLoading(true);
  }, [location.pathname]);

  return (
    <>
        {/* Tự động cuộn trang lên đầu mỗi khi chuyển tab / route */}
        <ScrollToTop />

        {/* Luxury Brand Preloader on initial load */}
        {isLoading && <BrandPreloader key={location.pathname} onFinish={() => setIsLoading(false)} />}

        <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          {/* Global Scroll Reading Progress Bar & Back to top button */}
          <ScrollProgress />
          
          <Navbar />
          <main style={{ flex: 1 }}>
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
          </main>
          <PreFooterCTA />
          <Footer />
        </div>
    </>
  );
}

function AdminAppContent() {
  return <div className="admin-app-layout">
    <Routes>
      <Route path="/dang-nhap" element={<LoginPage />} />
      <Route path="/quan-tri" element={<AdminDashboardPage />} />
      <Route path="/" element={<Navigate to="/quan-tri" replace />} />
      <Route path="*" element={<Navigate to="/quan-tri" replace />} />
    </Routes>
  </div>;
}
