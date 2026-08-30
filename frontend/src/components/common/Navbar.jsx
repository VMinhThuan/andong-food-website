import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  PhoneCall
} from 'lucide-react';
const LogoNgang = '/assets/brand-element/AD_LOGO%20NGANG.svg';

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

        {/* CENTER: CREATIVE PILL NAVIGATION */}
        <nav
          className="desktop-nav site-navbar__nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'var(--bg-secondary)',
            padding: '6px 8px',
            borderRadius: '9999px',
            border: '1px solid var(--border-light)',
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
                  display: 'block',
                  color: isActive ? '#ffffff' : 'var(--brand-brown)',
                  backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                  boxShadow: isActive ? '0 3px 10px rgba(17, 156, 74, 0.18)' : 'none',
                  fontSize: '0.92rem', fontWeight: isActive ? '800' : '700',
                  padding: '8px 22px', borderRadius: '9999px', whiteSpace: 'nowrap'
                }}>
                  {link.name}
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
            className="hotline-btn-nav"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 18px',
              borderRadius: '9999px',
              backgroundColor: 'var(--bg-main)',
              border: '1px solid var(--border-color)',
              color: 'var(--primary)',
              textDecoration: 'none',
              fontSize: '0.88rem',
              fontWeight: '700',
              transition: 'all 0.2s',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)'
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
              className="btn btn-outline btn-sm"
              style={{ width: '100%', marginTop: '6px' }}
            >
              <PhoneCall size={16} /> Điện thoại: 0944 852 464
            </a>

          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
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
