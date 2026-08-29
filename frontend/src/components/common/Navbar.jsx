import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ShieldCheck,
  User,
  LogOut,
  PhoneCall,
  LayoutDashboard
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
const LogoNgang = '/assets/brand-element/AD_LOGO%20NGANG.svg';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Trang Chủ', path: '/' },
    { name: 'Giới Thiệu', path: '/gioi-thieu' },
    { name: 'Sản Phẩm', path: '/san-pham' },
    { name: 'Liên Hệ', path: '/lien-he' }
  ];

  return (
    <header
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
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '84px',
        width: '100%',
        padding: '0 clamp(20px, 3.5vw, 50px)'
      }}>
        {/* BRAND LOGO (ALIGNED SÁT MÉP TRÁI) */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none'
          }}
        >
          <img
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

        {/* RIGHT ACTION: HOTLINE + USER ICON (ALIGNED SÁT MÉP PHẢI) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
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

          {/* USER ACCOUNT / PORTAL ICON (MODERN LUXURY CIRCLE) */}
          <div style={{ position: 'relative' }} ref={dropdownRef}>
            <button
              onClick={() => {
                if (user) {
                  setUserDropdownOpen(!userDropdownOpen);
                } else {
                  navigate('/dang-nhap');
                }
              }}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: user ? 'var(--primary)' : '#ffffff',
                color: user ? 'var(--golden-light)' : 'var(--primary)',
                border: user ? '2px solid var(--golden-light)' : '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: user
                  ? '0 4px 14px rgba(17, 156, 74, 0.25)'
                  : '0 2px 8px rgba(0, 0, 0, 0.06)',
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
              title={user ? `${user.fullName} (${user.role})` : 'Đăng nhập nội bộ'}
            >
              {user ? (
                <ShieldCheck size={20} />
              ) : (
                <User size={19} />
              )}

              {/* Online status indicator dot */}
              {user && (
                <span style={{
                  position: 'absolute',
                  bottom: '0px',
                  right: '0px',
                  width: '11px',
                  height: '11px',
                  borderRadius: '50%',
                  backgroundColor: '#4caf50',
                  border: '2px solid #ffffff'
                }} />
              )}
            </button>

            {/* Dropdown Menu when user is logged in */}
            <AnimatePresence>
              {user && userDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: 'absolute',
                    top: '52px',
                    right: 0,
                    width: '240px',
                    backgroundColor: '#ffffff',
                    borderRadius: '18px',
                    padding: '16px',
                    boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
                    border: '1px solid var(--border-color)',
                    zIndex: 1001
                  }}
                >
                  <div style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '10px', marginBottom: '10px' }}>
                    <div style={{ fontWeight: '700', color: 'var(--primary)', fontSize: '0.92rem' }}>
                      {user.fullName}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>
                      Role: <strong>{isAdmin ? 'Quản Trị Viên (Admin)' : 'Nhân Viên CSKH'}</strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <Link
                      to="/quan-tri"
                      onClick={() => setUserDropdownOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 12px',
                        borderRadius: '10px',
                        color: 'var(--primary)',
                        textDecoration: 'none',
                        fontSize: '0.88rem',
                        fontWeight: '600',
                        backgroundColor: 'var(--bg-main)'
                      }}
                    >
                      <LayoutDashboard size={16} color="var(--earth-brown)" />
                      <span>Trang Quản Trị</span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 12px',
                        borderRadius: '10px',
                        color: '#c62828',
                        background: 'none',
                        border: 'none',
                        fontSize: '0.88rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        textAlign: 'left',
                        width: '100%'
                      }}
                    >
                      <LogOut size={16} />
                      <span>Đăng Xuất</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

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

            <Link
              to={user ? '/quan-tri' : '/dang-nhap'}
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-primary btn-sm"
              style={{ width: '100%' }}
            >
              <User size={16} /> {user ? 'Trang Quản Trị' : 'Đăng Nhập'}
            </Link>
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
