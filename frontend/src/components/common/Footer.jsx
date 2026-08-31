import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
const LogoFooter = '/assets/brand-element/AD_LOGO%20N%E1%BB%80N%20M%C3%80U.svg';

export default function Footer() {
  return (
    <>
      {/* Đã bỏ thanh mini sticky nổi ở đáy màn hình khi cuộn (redesignspec.md
          mục 7: "gộp thanh nổi" — nav trên + thanh này + nút lên đầu cùng lúc
          nổi, ăn diện tích mobile). Nội dung của nó (bản quyền, hotline,
          Facebook, Zalo) đã có sẵn y hệt trong footer đầy đủ ngay bên dưới,
          nên bỏ hẳn thay vì giữ một bản trùng lặp luôn nổi trên màn hình. */}
      <footer id="main-full-footer" className="main-full-footer" style={{
        background: 'var(--brand-brown)',
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
          <div className="footer-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '45px',
            paddingBottom: '50px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={LogoFooter}
                alt="Logo An Đông"
                style={{ height: '92px', width: 'auto', maxWidth: '260px', objectFit: 'contain' }}
              />
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
                  <Link to="/" style={{ color: '#d9c2a0', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#d9c2a0'}>
                    Trang Chủ
                  </Link>
                </li>
                <li>
                  <Link to="/gioi-thieu" style={{ color: '#d9c2a0', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#d9c2a0'}>
                    Giới Thiệu
                  </Link>
                </li>
                <li>
                  <Link to="/san-pham" style={{ color: '#d9c2a0', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#d9c2a0'}>
                    Sản Phẩm
                  </Link>
                </li>
                <li>
                  <Link to="/lien-he" style={{ color: '#d9c2a0', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#d9c2a0'}>
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
                  <Link to="/san-pham/gao-st25" style={{ color: '#d9c2a0', textDecoration: 'none', fontSize: '0.9rem' }}>
                    Gạo ST25 An Đông
                  </Link>
                </li>
                <li>
                  <Link to="/san-pham/gao-vuong-tom" style={{ color: '#d9c2a0', textDecoration: 'none', fontSize: '0.9rem' }}>
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
                  <span style={{ color: '#d9c2a0', lineHeight: 1.5 }}>
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
                  <a href="mailto:andofoodvn@gmail.com" style={{ color: '#d9c2a0', textDecoration: 'none' }}>
                    andofoodvn@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM COPYRIGHT BAR */}
          <div className="footer-bottom" style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.07)',
            paddingTop: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '0.83rem',
            color: '#a9855f'
          }}>
            <div>
              © {new Date().getFullYear()} <strong style={{ color: '#FDB913' }}>An Đông</strong>. Đã đăng ký bản quyền.
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              {/* CẦN BỔ SUNG: chưa có link fanpage Facebook thật — để chữ
                  thường, không giả vờ là link, tới khi có URL thật. */}
              <span style={{ color: '#d9c2a0' }}>Facebook</span>
              <span style={{ color: '#8a5f3a' }}>•</span>
              <a
                href="https://zalo.me/0944852464"
                target="_blank"
                rel="noreferrer"
                style={{ color: '#d9c2a0', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#d9c2a0'; }}
              >
                Zalo
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
