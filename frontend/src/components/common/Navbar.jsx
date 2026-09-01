import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneCall, Menu, X } from 'lucide-react';
import { triggerHotlineModal } from './HotlineModal';
const LogoNgang = '/assets/brand-element/AD_LOGO%20NGANG.svg';

// Dấu ngoặc vẽ tay dùng chung một bộ path (qua <use>) cho cả hai bên của nav-link
// đang active — bên phải chỉ là ảnh gương (scaleX(-1)) của bên trái, không vẽ lại path.
// Định nghĩa 1 lần duy nhất, ẩn khỏi layout; currentColor lấy màu từ chính SVG ẩn này
// nên style="color" của nó là nguồn màu cho cả hai gradient.
function BracketDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute', color: 'var(--brand-brown)' }} aria-hidden="true">
      <defs>
        <g id="brk-paths">
          <path d="M 47.6,12.7 C 41.5,18.7 36.2,24.6 35.8,26.0 C 35.4,27.4 34.0,29.8 32.7,31.3 C 31.4,32.9 30.3,35.0 30.3,36.1 C 30.3,37.1 29.9,38.0 29.5,38.0 C 28.6,38.0 23.3,45.7 23.3,46.9 C 23.3,47.3 21.7,49.4 19.7,51.6 C 15.9,55.7 14.3,58.8 14.3,62.2 C 14.3,63.3 13.4,65.3 12.3,66.7 C 11.2,68.1 10.3,70.1 10.3,71.1 C 10.3,72.1 9.6,73.3 8.7,73.8 C 7.6,74.4 6.7,76.9 6.1,81.0 C 5.7,84.5 4.8,88.0 4.1,88.7 C 3.4,89.5 2.8,94.2 2.6,99.3 C 2.4,104.4 2.2,110.1 2.1,112.0 C 1.7,119.5 3.0,136.6 4.1,138.7 C 4.8,139.9 5.3,142.6 5.3,144.8 C 5.3,147.0 6.0,150.7 6.9,153.1 C 7.8,155.8 8.2,159.0 7.8,161.3 C 7.3,164.9 7.4,165.2 10.9,166.6 C 14.8,168.3 15.0,170.6 11.1,170.2 C 7.2,169.8 5.4,172.6 8.6,174.1 C 10.0,174.7 11.6,176.3 12.2,177.6 C 13.1,179.6 14.0,180.0 17.5,180.0 C 20.9,180.1 21.4,180.3 20.1,181.1 C 17.9,182.3 17.8,185.9 19.8,186.7 C 22.2,187.6 24.4,192.6 23.7,195.5 C 23.0,198.3 24.7,198.9 26.1,196.3 C 27.9,193.2 30.3,195.5 30.3,200.3 C 30.3,205.1 31.4,206.6 35.3,207.2 C 37.4,207.4 37.8,208.0 37.8,211.0 C 37.8,214.2 38.1,214.6 41.6,215.4 C 46.4,216.6 50.8,215.2 50.8,212.5 C 50.8,211.0 50.0,210.4 47.3,210.0 C 44.2,209.6 43.8,209.1 43.5,206.2 C 43.2,203.7 42.5,202.7 40.6,201.9 C 38.6,201.2 38.2,200.4 38.5,198.5 C 38.9,196.6 38.2,195.4 35.2,193.0 C 31.6,190.2 31.3,189.5 31.3,185.0 C 31.3,180.6 30.9,179.8 27.4,176.8 C 24.7,174.5 23.4,172.4 22.9,169.7 C 22.2,166.0 19.1,159.7 16.6,157.2 C 15.7,156.3 15.3,152.3 15.3,144.2 C 15.3,134.2 15.0,132.1 13.3,129.5 C 10.6,125.4 10.5,115.1 13.1,112.7 C 14.6,111.3 15.0,109.4 15.0,101.4 C 15.1,94.6 15.5,91.4 16.6,90.2 C 17.4,89.3 18.3,86.6 18.6,84.3 C 18.9,82.0 20.0,78.9 21.2,77.4 C 23.7,74.3 23.9,71.7 21.8,70.0 C 20.6,69.0 20.9,68.3 23.8,65.5 C 25.7,63.7 27.3,61.5 27.3,60.6 C 27.3,59.7 27.8,59.0 28.3,59.0 C 28.9,59.0 29.8,57.8 30.4,56.2 C 35.0,44.9 37.9,40.2 46.7,30.5 C 48.7,28.3 50.3,26.1 50.3,25.6 C 50.3,24.3 64.4,11.0 65.8,11.0 C 66.5,11.0 67.4,10.3 67.7,9.3 C 68.4,7.5 62.9,2.1 60.3,2.0 C 59.4,2.0 53.7,6.8 47.6,12.7" />
          <path d="M 90.8,3.9 C 90.5,4.9 89.3,6.0 88.2,6.3 C 86.9,6.7 86.3,7.5 86.5,8.7 C 86.9,11.1 90.1,11.6 91.0,9.3 C 91.4,8.3 92.6,6.8 93.7,5.9 C 94.7,5.0 95.3,3.8 94.9,3.2 C 93.8,1.4 91.5,1.8 90.8,3.9" />
          <path d="M 74.7,27.4 C 73.9,29.5 75.0,31.0 77.4,31.0 C 78.9,31.0 79.4,30.4 79.1,28.8 C 78.7,26.1 75.6,25.1 74.7,27.4" />
          <path d="M 50.6,222.7 C 48.6,223.5 49.1,225.8 51.4,226.5 C 53.9,227.3 55.8,225.8 55.0,223.6 C 54.4,222.0 52.9,221.7 50.6,222.7" />
        </g>
        <linearGradient id="brkL" x1="0" y1="0" x2="0" y2="228.7" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="currentColor" stopOpacity="1" />
          <stop offset="0.58" stopColor="currentColor" stopOpacity="0.5" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="brkR" x1="0" y1="0" x2="0" y2="228.7" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.1" />
          <stop offset="0.42" stopColor="currentColor" stopOpacity="0.5" />
          <stop offset="1" stopColor="currentColor" stopOpacity="1" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Trang Chủ', path: '/' },
    { name: 'Giới Thiệu', path: '/gioi-thieu' },
    { name: 'Sản Phẩm', path: '/san-pham' },
    { name: 'Liên Hệ', path: '/lien-he' }
  ];

  return (
    <header
      className="site-navbar"
      style={{
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 1000,
        backgroundColor: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-light)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)'
      }}
    >
      <BracketDefs />

      {/* Full-width container stretched edge-to-edge */}
      <div className="site-navbar__inner" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '84px',
        width: '100%',
        padding: '0 clamp(20px, 3.5vw, 50px)'
      }}>
        {/* BRAND LOGO (ALIGNED SÁT MÉP TRÁI) */}
        <Link
          className="site-navbar__brand"
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none'
          }}
        >
          <img
            className="site-navbar__logo"
            src={LogoNgang}
            alt="An Đông"
            style={{
              height: '52px',
              objectFit: 'contain'
            }}
          />
        </Link>

        {/* CENTER NAVIGATION - Clean Flat Style (Bỏ card tròn) */}
        <nav
          className="desktop-nav site-navbar__nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            position: 'relative'
          }}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end
              style={{
                textDecoration: 'none',
                outline: 'none',
                position: 'relative'
              }}
            >
              {({ isActive }) => (
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                  color: 'var(--brand-brown)',
                  backgroundColor: 'transparent',
                  fontSize: '0.92rem', fontWeight: isActive ? '800' : '700',
                  padding: '8px 18px', borderRadius: '9999px', whiteSpace: 'nowrap'
                }}>
                  {isActive && (
                    <svg className="brk" viewBox="0 0 97.0 228.7" aria-hidden="true">
                      <use href="#brk-paths" fill="url(#brkL)" />
                    </svg>
                  )}
                  {link.name}
                  {isActive && (
                    <svg className="brk flip" viewBox="0 0 97.0 228.7" aria-hidden="true">
                      <use href="#brk-paths" fill="url(#brkR)" />
                    </svg>
                  )}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* RIGHT ACTION: hotline and mobile navigation only. Admin is not exposed on the public site. */}
        <div className="site-navbar__actions" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Hotline button */}
          <a
            href="tel:0944852464"
            onClick={triggerHotlineModal}
            className="hotline-btn-nav"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 18px',
              borderRadius: '9999px',
              backgroundColor: '#FAF5ED',
              border: '1.5px solid #F0D9B5',
              color: '#3B593F',
              fontWeight: '700',
              fontSize: '0.88rem',
              textDecoration: 'none',
              transition: 'all 0.25s ease',
              boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
              cursor: 'pointer'
            }}
          >
            <PhoneCall size={15} color="var(--earth-brown)" />
            <span>0944 852 464</span>
          </a>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'none',
              padding: '6px'
            }}
            className="mobile-hamburger-btn"
          >
            {mobileMenuOpen ? <X size={26} color="var(--primary)" /> : <Menu size={26} color="var(--primary)" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="site-navbar__drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              backgroundColor: '#ffffff',
              borderTop: '1px solid var(--border-color)',
              padding: '18px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                style={({ isActive }) => ({
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: isActive ? '700' : '500',
                  color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                  padding: '8px 0'
                })}
              >
                {link.name}
              </NavLink>
            ))}

            <a
              href="tel:0944852464"
              onClick={(e) => {
                setIsOpen(false);
                triggerHotlineModal(e);
              }}
              className="btn btn-outline btn-sm"
              style={{ width: '100%', marginTop: '6px', cursor: 'pointer' }}
            >
              <PhoneCall size={16} /> Điện thoại: 0944 852 464
            </a>

          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .brk { height: 1.9em; width: auto; flex: none; overflow: visible; display: block; }
        .brk.flip { transform: scaleX(-1); }
        @media (max-width: 900px) {
          .hotline-btn-nav { display: none !important; }
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-hamburger-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}
