import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';

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
              backgroundColor: '#f7f5ed', // Luxury warm ivory cream
              borderTop: '1px solid #e2ded2',
              boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.08)',
              color: '#1b4332',
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
                color: '#526058',
                fontWeight: '500',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                © {new Date().getFullYear()} <strong>An Đông Food</strong>. All rights reserved.
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
                    color: '#1b4332',
                    textDecoration: 'none',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Phone size={13} color="#b07d35" />
                  <span>0944 852 464</span>
                </a>
                <span style={{ color: '#d4cebe' }}>•</span>
                <span style={{ color: '#1b4332', fontWeight: '600', cursor: 'pointer' }}>Facebook</span>
                <span style={{ color: '#d4cebe' }}>•</span>
                <span style={{ color: '#1b4332', fontWeight: '600', cursor: 'pointer' }}>Zalo</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. FULL FOOTER ĐẦY ĐỦ (HIỂN THỊ KHI CUỘN XUỐNG HẾT TRANG) */}
      <footer id="main-full-footer" style={{
        backgroundColor: '#081c15', // Solid midnight forest green
        color: '#e4e0d4',
        position: 'relative',
        margin: 0,
        width: '100%',
        padding: '75px 0 32px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
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
            {/* CỘT 1: BRAND IDENTITY */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <img
                  src="/assets/logo-gao.png"
                  alt="Logo An Đông Food"
                  style={{ height: '64px', objectFit: 'contain' }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div>
                  <h3 style={{
                    color: '#fefae0',
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.5rem',
                    fontWeight: '800',
                    margin: 0,
                    letterSpacing: '1px'
                  }}>
                    AN ĐÔNG
                  </h3>
                  <div style={{
                    color: '#e9c46a',
                    fontSize: '0.8rem',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    fontWeight: '800',
                    marginTop: '2px'
                  }}>
                    FOOD
                  </div>
                </div>
              </div>

              <div style={{
                color: '#d4a373',
                fontSize: '0.88rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '8px'
              }}>
                Bình An Ở Phía Đông
              </div>

              <p style={{
                fontSize: '0.92rem',
                lineHeight: '1.65',
                color: '#95aca0',
                margin: 0
              }}>
                Gạo ngon chuẩn giống, gửi trọn an lòng.
              </p>
            </div>

            {/* CỘT 2: KHÁM PHÁ NAVIGATION */}
            <div>
              <h4 style={{
                color: '#fefae0',
                fontSize: '0.96rem',
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
                  <Link to="/" style={{ color: '#cbdcd2', textDecoration: 'none', transition: 'color 0.2s' }}>
                    Trang Chủ
                  </Link>
                </li>
                <li>
                  <Link to="/gioi-thieu" style={{ color: '#cbdcd2', textDecoration: 'none', transition: 'color 0.2s' }}>
                    Giới Thiệu
                  </Link>
                </li>
                <li>
                  <Link to="/san-pham" style={{ color: '#cbdcd2', textDecoration: 'none', transition: 'color 0.2s' }}>
                    Sản Phẩm
                  </Link>
                </li>
                <li>
                  <Link to="/lien-he" style={{ color: '#cbdcd2', textDecoration: 'none', transition: 'color 0.2s' }}>
                    Liên Hệ
                  </Link>
                </li>
              </ul>
            </div>

            {/* CỘT 3: SẢN PHẨM NỔI BẬT */}
            <div>
              <h4 style={{
                color: '#fefae0',
                fontSize: '0.96rem',
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
                  <Link to="/san-pham/gao-st25" style={{ color: '#cbdcd2', textDecoration: 'none' }}>
                    Gạo ST25
                  </Link>
                </li>
                <li>
                  <Link to="/san-pham/gao-vuong-tom" style={{ color: '#cbdcd2', textDecoration: 'none' }}>
                    Gạo Vuông Tôm
                  </Link>
                </li>
              </ul>
            </div>

            {/* CỘT 4: THÔNG TIN LIÊN HỆ */}
            <div>
              <h4 style={{
                color: '#fefae0',
                fontSize: '0.96rem',
                fontWeight: '800',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                marginBottom: '20px'
              }}>
                Liên Hệ
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <MapPin size={16} color="#e9c46a" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span style={{ color: '#cbdcd2', lineHeight: 1.5 }}>
                    Ấp Long Thành, xã Phước Long, tỉnh Cà Mau
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <Phone size={16} color="#e9c46a" style={{ flexShrink: 0 }} />
                  <a href="tel:0944852464" style={{ color: '#fefae0', fontWeight: '700', textDecoration: 'none' }}>
                    0944 852 464
                  </a>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <Mail size={16} color="#e9c46a" style={{ flexShrink: 0 }} />
                  <a href="mailto:andongfood@gmail.com" style={{ color: '#cbdcd2', textDecoration: 'none' }}>
                    andongfood@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM COPYRIGHT BAR */}
          <div style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '0.85rem',
            color: '#7b9588'
          }}>
            <div>
              © {new Date().getFullYear()} <strong>An Đông Food</strong>. All rights reserved.
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <span style={{ color: '#cbdcd2', cursor: 'pointer' }}>Facebook</span>
              <span style={{ color: '#3b5548' }}>•</span>
              <span style={{ color: '#cbdcd2', cursor: 'pointer' }}>Zalo</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
