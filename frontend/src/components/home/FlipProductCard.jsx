import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/**
 * Thẻ Sản Phẩm 3D Interactive Flip
 * - Mặc định hiển thị Mặt Trước bao bì và Card thông tin tên + giá bên dưới.
 * - Khi BẤM (Click/Tap) vào bao bì mới lật 180 độ xem Mặt Sau.
 * - Bấm lần nữa lật lại Mặt Trước.
 */
export default function FlipProductCard({ product }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const frontImg = product?.images?.front || product?.images?.chinhDien || product?.images?.main || product?.image || '/assets/brand-element/mat-truoc-bao-bi.webp';
  const backImg = product?.images?.back || product?.imageBack || '/assets/brand-element/mat-sau-bao-bi.webp';

  const isVuongTom = product?.slug === 'gao-vuong-tom' || product?.code === 'AD-VT-02';
  const baseScale = isVuongTom ? 1.03 : 1.0;

  const subtitle = isVuongTom ? 'Gạo sạch luân canh lúa - tôm' : 'Gạo đặc sản thuần chủng';
  const highlightTitle = isVuongTom ? 'Gạo Vuông Tôm • Ngọt lành' : 'Gạo ST25 • Thơm dẻo';

  const isHighlighted = isFlipped || isHovered;

  const handlePackagingClick = (e) => {
    e.stopPropagation();
    setIsFlipped((prev) => !prev);
  };

  return (
    <div
      className="flip-product-column"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative',
        userSelect: 'none',
        width: 'clamp(280px, 32vw, 360px)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. 3D Perspective Flip Container */}
      <div
        style={{
          width: '100%',
          height: 'clamp(370px, 42vw, 480px)',
          perspective: '1400px',
          position: 'relative',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center'
        }}
        onClick={handlePackagingClick}
        title="Bấm vào bao bì để lật xem mặt sau"
      >
        <m.div
          animate={{
            rotateY: (isFlipped || isHovered) ? 180 : 0,
            scale: (isHighlighted ? 1.03 : 1.0) * baseScale,
            y: isHighlighted ? -8 : 0
          }}
          transition={{
            duration: 0.65,
            ease: [0.34, 1.25, 0.64, 1]
          }}
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            transformStyle: 'preserve-3d',
            transformOrigin: 'center bottom'
          }}
        >
          {/* MẶT TRƯỚC BAO BÌ */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              filter: isHighlighted
                ? 'drop-shadow(0 24px 34px rgba(0,0,0,0.22))'
                : 'drop-shadow(0 14px 22px rgba(0,0,0,0.13))',
              transition: 'filter 0.35s ease'
            }}
          >
            <img
              src={frontImg}
              alt={product?.name || 'Gạo An Đông - Mặt trước'}
              loading="lazy"
              decoding="async"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'bottom center',
                pointerEvents: 'none'
              }}
              onError={(e) => {
                e.target.src = '/assets/brand-element/mat-truoc-bao-bi.webp';
              }}
            />
          </div>

          {/* MẶT SAU BAO BÌ (Hiện khi BẤM LẬT 180 độ) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              filter: 'drop-shadow(0 24px 34px rgba(0,0,0,0.22))'
            }}
          >
            <img
              src={backImg}
              alt={`${product?.name || 'Gạo An Đông'} - Mặt sau`}
              loading="lazy"
              decoding="async"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'bottom center',
                pointerEvents: 'none'
              }}
              onError={(e) => {
                e.target.src = '/assets/brand-element/mat-sau-bao-bi.webp';
              }}
            />
          </div>
        </m.div>
      </div>

      {/* 2. CARD THÔNG TIN NẰM TRỰC TIẾP DƯỚI TỪNG ẢNH - LUÔN HIỂN THỊ */}
      <div style={{ width: '100%', minHeight: '80px', marginTop: '22px' }}>
        <Link
          to={`/san-pham/${product?.slug || ''}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            backgroundColor: '#E7F8AB',
            padding: '16px 20px',
            borderRadius: '16px',
            textDecoration: 'none',
            boxShadow: isHighlighted ? '0 12px 28px rgba(180, 210, 100, 0.55)' : '0 8px 20px rgba(180, 210, 100, 0.35)',
            transition: 'all 0.25s ease',
            boxSizing: 'border-box',
            width: '100%'
          }}
        >
          {/* Thông tin dòng sản phẩm & tên */}
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{
              fontSize: '0.82rem',
              fontWeight: '600',
              color: '#07381A',
              marginBottom: '2px',
              letterSpacing: '0.2px',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden'
            }}>
              {subtitle}
            </div>
            <div style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.18rem',
              fontWeight: '800',
              color: '#07381A',
              lineHeight: '1.25',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden'
            }}>
              {highlightTitle}
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '6px',
              marginTop: '4px'
            }}>
              <span style={{
                fontSize: '0.78rem',
                color: '#557560',
                textDecoration: 'line-through'
              }}>
                {((product?.originalPrice || product?.listedPrice || (isVuongTom ? 249000 : 259000))).toLocaleString('vi-VN')} ₫
              </span>
              <span style={{
                fontSize: '1.02rem',
                fontWeight: 800,
                color: '#07381A'
              }}>
                {((product?.promotionalPrice || product?.price || (isVuongTom ? 195000 : 215000))).toLocaleString('vi-VN')} ₫
              </span>
            </div>
          </div>

          {/* Nút Next mũi tên bên phải */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <ArrowRight size={24} strokeWidth={2.4} color="#07381A" />
          </div>
        </Link>
      </div>
    </div>
  );
}
