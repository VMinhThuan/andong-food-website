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
        backgroundColor: '#ffffff',
        borderBottom: '1px solid rgba(27, 67, 50, 0.08)',
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
            gap: '12px',
            textDecoration: 'none'
          }}
        >
          <img
            src="/assets/logo-gao.png"
            alt="An Đông Food"
            style={{
              height: '52px',
              objectFit: 'contain'
            }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div>
            <div style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.45rem',
              fontWeight: '800',
              color: '#1b4332',
              letterSpacing: '1px',
              lineHeight: 1
            }}>
              AN ĐÔNG
            </div>
            <div style={{
              fontSize: '0.72rem',
              fontWeight: '800',
              color: '#d4a373',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              marginTop: '3px'
            }}>
              FOOD
            </div>
          </div>
        </Link>

        {/* CENTER: CREATIVE PILL NAVIGATION */}
        <nav
          className="desktop-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#f6f5f0',
            padding: '5px 8px',
            borderRadius: '9999px',
            border: '1px solid rgba(27, 67, 50, 0.06)'
          }}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              style={({ isActive }) => ({
                textDecoration: 'none',
                outline: 'none',
                fontSize: '0.92rem',
                fontWeight: isActive ? '700' : '600',
                color: isActive ? '#ffffff' : '#526058',
                backgroundColor: isActive ? '#1b4332' : 'transparent',
                padding: '8px 22px',
                borderRadius: '9999px',
                transition: 'all 0.2s ease',
                boxShadow: isActive ? '0 4px 12px rgba(27, 67, 50, 0.2)' : 'none'
              })}
            >
              {link.name}
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
              backgroundColor: '#faf9f5',
              border: '1px solid #e4e0d4',
              color: '#1b4332',
              textDecoration: 'none',
              fontSize: '0.88rem',
              fontWeight: '700',
              transition: 'all 0.2s',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)'
            }}
          >
            <PhoneCall size={15} color="#b07d35" />
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
                backgroundColor: user ? '#1b4332' : '#ffffff',
                color: user ? '#e9c46a' : '#1b4332',
                border: user ? '2px solid #e9c46a' : '1px solid #e4e0d4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: user
                  ? '0 4px 14px rgba(27, 67, 50, 0.25)'
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
                    border: '1px solid #e4e0d4',
                    zIndex: 1001
                  }}
                >
                  <div style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '10px', marginBottom: '10px' }}>
                    <div style={{ fontWeight: '700', color: '#1b4332', fontSize: '0.92rem' }}>
                      {user.fullName}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#859b8f' }}>
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
                        color: '#1b4332',
                        textDecoration: 'none',
                        fontSize: '0.88rem',
                        fontWeight: '600',
                        backgroundColor: '#faf9f5'
                      }}
                    >
                      <LayoutDashboard size={16} color="#b07d35" />
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
            {mobileMenuOpen ? <X size={26} color="#1b4332" /> : <Menu size={26} color="#1b4332" />}
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
              borderTop: '1px solid #e4e0d4',
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
                  color: isActive ? '#1b4332' : '#526058',
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
              <PhoneCall size={16} /> Hotline: 0944 852 464
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
