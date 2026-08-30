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
          <div className="footer-grid" style={{
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
                  <Link to="/san-pham/gao-st25" style={{ color: '#8fba9f', textDecoration: 'none', fontSize: '0.9rem' }}>
                    Gạo ST25 An Đông
                  </Link>
                </li>
                <li>
                  <Link to="/san-pham/gao-vuong-tom" style={{ color: '#8fba9f', textDecoration: 'none', fontSize: '0.9rem' }}>
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
                  <a href="mailto:andofoodvn@gmail.com" style={{ color: '#8fba9f', textDecoration: 'none' }}>
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
            color: '#4d7a60'
          }}>
            <div>
              © {new Date().getFullYear()} <strong style={{ color: '#7aaa8a' }}>An Đông</strong>. Đã đăng ký bản quyền.
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              {/* CẦN BỔ SUNG: chưa có link fanpage Facebook thật — để chữ
                  thường, không giả vờ là link, tới khi có URL thật. */}
              <span style={{ color: '#8fba9f' }}>Facebook</span>
              <span style={{ color: '#2d5040' }}>•</span>
              <a
                href="https://zalo.me/0944852464"
                target="_blank"
                rel="noreferrer"
                style={{ color: '#8fba9f', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#8fba9f'; }}
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
