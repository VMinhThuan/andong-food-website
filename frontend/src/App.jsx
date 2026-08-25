import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <AuthProvider>
      <Router>
        {/* Tự động cuộn trang lên đầu mỗi khi chuyển tab / route */}
        <ScrollToTop />

        {/* Luxury Brand Preloader on initial load */}
        {isLoading && <BrandPreloader onFinish={() => setIsLoading(false)} />}

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
              <Route path="/dang-nhap" element={<LoginPage />} />
              <Route path="/quan-tri" element={<AdminDashboardPage />} />
            </Routes>
          </main>
          <PreFooterCTA />
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
