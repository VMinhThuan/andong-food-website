import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
const LogoFooter = '/assets/brand-element/AD_LOGO%20N%E1%BB%80N%20M%C3%80U.svg';

export default function Footer() {
  const [showStickyMiniFooter, setShowStickyMiniFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Check if user is scrolled past 350px AND not yet at the absolute bottom (leaving 320px threshold for full footer)
      const isPastHeader = scrollY > 350;
      const isNearBottom = (scrollY + windowHeight) >= (documentHeight - 320);

      if (isPastHeader && !isNearBottom) {
        setShowStickyMiniFooter(true);
      } else {
        setShowStickyMiniFooter(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* 1. STICKY LUXURY MINI BOTTOM BAR (HIỂN THỊ KHI ĐANG CUỘN TRANG) */}
      <AnimatePresence>
        {showStickyMiniFooter && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 900,
              backgroundColor: 'var(--golden-pale)', // Luxury warm ivory cream
              borderTop: '1px solid var(--border-color)',
              boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.08)',
              color: 'var(--primary)',
              padding: '0 clamp(16px, 3.5vw, 48px)'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '52px',
              width: '100%',
              fontSize: '0.82rem',
              gap: '16px'
            }}>
              {/* Left: Copyright */}
              <div style={{
                color: 'var(--text-muted)',
                fontWeight: '500',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                © {new Date().getFullYear()} <strong>An Đông</strong>. Đã đăng ký bản quyền.
              </div>

              {/* Right: Hotline + Socials aligned to the far right */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                whiteSpace: 'nowrap'
              }}>
                <a
                  href="tel:0944852464"
                  style={{
                    color: 'var(--primary)',
                    textDecoration: 'none',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Phone size={13} color="var(--earth-brown)" />
                  <span>0944 852 464</span>
                </a>
                <span style={{ color: '#d4cebe' }}>•</span>
                <span style={{ color: 'var(--primary)', fontWeight: '600', cursor: 'pointer' }}>Facebook</span>
                <span style={{ color: '#d4cebe' }}>•</span>
                <span style={{ color: 'var(--primary)', fontWeight: '600', cursor: 'pointer' }}>Zalo</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. FULL FOOTER ĐẦY ĐỦ (HIỂN THỊ KHI CUỘN XUỐNG HẾT TRANG) */}
      <footer id="main-full-footer" style={{
        background: 'linear-gradient(160deg, #081c15 0%, #0d261a 55%, #102b1e 100%)',
        color: '#ffffff',
        position: 'relative',
        margin: 0,
        width: '100%',
        padding: '64px 0 28px',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        zIndex: 10
      }}>
        <div className="container">
          {/* 4-COLUMN PREMIUM FOOTER GRID */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '45px',
            paddingBottom: '50px'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '14px' }}>
                <img
                  src={LogoFooter}
                  alt="Logo An Đông"
                  style={{ height: '56px', width: 'auto', maxWidth: '160px', objectFit: 'contain' }}
                />
              </div>

              <div style={{
                color: '#FDB913',
                fontSize: '0.82rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1.2px',
                marginBottom: '10px'
              }}>
                Bình An ở Phía Đông
              </div>

              <p style={{
                fontSize: '0.88rem',
                lineHeight: '1.65',
                color: '#7aa08a',
                margin: 0
              }}>
                Gạo ngon chuẩn giống, gửi trọn an lòng.
              </p>
            </div>

            {/* CỘT 2: KHÁM PHÁ NAVIGATION */}
            <div>
              <h4 style={{
                color: '#ffffff',
                fontSize: '0.88rem',
                fontWeight: '800',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                marginBottom: '20px'
              }}>
                Khám Phá
              </h4>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                fontSize: '0.92rem'
              }}>
                <li>
                  <Link to="/" style={{ color: '#8fba9f', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#8fba9f'}>
                    Trang Chủ
                  </Link>
                </li>
                <li>
                  <Link to="/gioi-thieu" style={{ color: '#8fba9f', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#8fba9f'}>
                    Giới Thiệu
                  </Link>
                </li>
                <li>
                  <Link to="/san-pham" style={{ color: '#8fba9f', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#8fba9f'}>
                    Sản Phẩm
                  </Link>
                </li>
                <li>
                  <Link to="/lien-he" style={{ color: '#8fba9f', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#8fba9f'}>
                    Liên Hệ
                  </Link>
                </li>
              </ul>
            </div>

            {/* CỘT 3: SẢN PHẨM NỔI BẬT */}
            <div>
              <h4 style={{
                color: '#ffffff',
                fontSize: '0.88rem',
                fontWeight: '800',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                marginBottom: '20px'
              }}>
                Sản Phẩm
              </h4>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                fontSize: '0.92rem'
              }}>
                <li>
                  <Link to="/san-pham/gao-st25-an-dong-thuong-hang" style={{ color: '#8fba9f', textDecoration: 'none', fontSize: '0.9rem' }}>
                    Gạo ST25 An Đông
                  </Link>
                </li>
                <li>
                  <Link to="/san-pham/gao-vuong-tom-an-dong" style={{ color: '#8fba9f', textDecoration: 'none', fontSize: '0.9rem' }}>
                    Gạo Vuông Tôm An Đông
                  </Link>
                </li>
                <li>
                  <Link to="/san-pham" style={{ color: '#FDB913', textDecoration: 'none', fontWeight: '700', fontSize: '0.9rem' }}>
                    Xem tất cả →
                  </Link>
                </li>
              </ul>
            </div>

            {/* CỘT 4: THÔNG TIN LIÊN HỆ */}
            <div>
              <h4 style={{
                color: '#ffffff',
                fontSize: '0.88rem',
                fontWeight: '800',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                marginBottom: '20px'
              }}>
                Thông tin nhà sản xuất
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.88rem' }}>
                <div style={{ color: '#ffffff', fontWeight: '800', lineHeight: 1.4 }}>
                  CÔNG TY TNHH An Đông
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <MapPin size={15} color="#FDB913" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span style={{ color: '#8fba9f', lineHeight: 1.5 }}>
                    Ấp Long Thành, xã Phước Long, tỉnh Cà Mau.
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <Phone size={15} color="#FDB913" style={{ flexShrink: 0 }} />
                  <a href="tel:0944852464" style={{ color: '#ffffff', fontWeight: '700', textDecoration: 'none', fontSize: '1rem' }}>
                    0944 852 464
                  </a>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <Mail size={15} color="#FDB913" style={{ flexShrink: 0 }} />
                  <a href="mailto:andongfood@gmail.com" style={{ color: '#8fba9f', textDecoration: 'none' }}>
                    andongfood@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM COPYRIGHT BAR */}
          <div style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.07)',
            paddingTop: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '0.83rem',
            color: '#4d7a60'
          }}>
            <div>
              © {new Date().getFullYear()} <strong style={{ color: '#7aaa8a' }}>An Đông</strong>. Đã đăng ký bản quyền.
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <span style={{ color: '#8fba9f', cursor: 'pointer', transition: 'color 0.2s' }}>Facebook</span>
              <span style={{ color: '#2d5040' }}>•</span>
              <span style={{ color: '#8fba9f', cursor: 'pointer', transition: 'color 0.2s' }}>Zalo</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
