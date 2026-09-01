import React from 'react';
import { motion } from 'framer-motion';

import hoaLuaImg from '../../assets/brand/hoa-lua.png';
import TieuChuan1 from '../../assets/brand/tieuchuan-1.svg';
import TieuChuan2 from '../../assets/brand/tieuchuan-2.svg';
import TieuChuan3 from '../../assets/brand/tieuchuan-3.svg';

/**
 * Laurel Wreath Badge kết hợp:
 * - 2 Bông lúa hai bên (frontend/src/assets/brand/hoa-lua.png)
 * - Ảnh SVG tiêu chuẩn căn giữa hoàn hảo ở giữa (tieuchuan-1.svg, tieuchuan-2.svg, tieuchuan-3.svg)
 */
const LaurelBadge = ({ image, alt }) => (
  <div
    style={{
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 'clamp(230px, 28vw, 320px)',
      height: 'clamp(80px, 9.5vw, 102px)',
      userSelect: 'none'
    }}
  >
    {/* 1. Hai Bông Lúa Hai Bên (hoa-lua.png) */}
    <img
      src={hoaLuaImg}
      alt="Bông lúa An Đông"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        pointerEvents: 'none'
      }}
    />

    {/* 2. Ảnh SVG Tiêu Chuẩn Nằm Giữa Lòng Hai Bông Lúa */}
    <div
      style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '74%',
        height: '70%'
      }}
    >
      <img
        src={image}
        alt={alt}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          width: 'auto',
          height: 'auto',
          objectFit: 'contain',
          display: 'block'
        }}
      />
    </div>
  </div>
);

export default function BrandValueBar() {
  const values = [
    { id: 1, image: TieuChuan1, alt: '100% Gạo Chọn Lọc' },
    { id: 2, image: TieuChuan2, alt: 'An Toàn Vệ Sinh' },
    { id: 3, image: TieuChuan3, alt: 'Dẻo Thơm Tự Nhiên' }
  ];

  return (
    <section
      className="brand-value-bar"
      style={{
        backgroundColor: '#754C1F', // Màu nâu đất đặc trưng
        backgroundImage: 'linear-gradient(180deg, #754C1F 0%, #633E17 100%)',
        color: '#ffffff',
        padding: '24px 0',
        position: 'relative',
        zIndex: 3,
        boxShadow: '0 4px 18px rgba(74, 45, 15, 0.25)',
        borderTop: '1px solid rgba(255, 255, 255, 0.12)'
      }}
    >
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px 20px',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {values.map((val, idx) => (
            <motion.div
              key={val.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <LaurelBadge image={val.image} alt={val.alt} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
