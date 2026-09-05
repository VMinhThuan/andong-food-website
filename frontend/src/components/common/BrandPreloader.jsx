import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
const LogoDoc = '/assets/brand-element/AD_LOGO%20D%E1%BB%8CC.svg';

export default function BrandPreloader({ onFinish, persistent = false }) {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Màn chào thương hiệu: giữ ngắn (~700ms) để không trì hoãn nội dung thật.
    if (persistent) return undefined;
    const timer = setTimeout(() => {
      setIsDone(true);
      if (onFinish) onFinish();
    }, 700);

    return () => clearTimeout(timer);
  }, [onFinish, persistent]);

  return (
    <AnimatePresence>
      {!isDone && (
        <m.div
          className="brand-preloader"
          key="brand-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.02,
            transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: 'var(--bg-main)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            pointerEvents: 'none'
          }}
        >
          <div className="brand-preloader__content" style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            maxWidth: '380px',
            padding: '0 20px'
          }}>
            {/* BƯỚC 1: LOGO DỌC THƯƠNG HIỆU FADE IN */}
            <m.div
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ marginBottom: '4px' }}
            >
              <img
                src={LogoDoc}
                alt="An Đông"
                style={{
                  height: '110px',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 6px 18px rgba(176, 125, 53, 0.15))'
                }}
              />
            </m.div>

            {/* BƯỚC 3: ĐƯỜNG CHÂN TRỜI CÁNH ĐỒNG LÚA CHẠY NGANG MẢNH MAI (SVG HORIZON LINE) */}
            <div style={{ width: '180px', height: '14px', margin: '4px 0 2px' }}>
              <svg width="180" height="14" viewBox="0 0 180 14" fill="none">
                {/* Lớp đường cong cánh đồng xanh */}
                <m.path
                  d="M0 10 Q 45 4, 90 8 T 180 6"
                  stroke="var(--primary-light)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.85 }}
                  transition={{ duration: 0.75, delay: 0.35, ease: 'easeInOut' }}
                />
                {/* Lớp đường cong phù sa / vàng lúa */}
                <m.path
                  d="M10 12 Q 55 7, 100 11 T 170 9"
                  stroke="var(--golden)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.65 }}
                  transition={{ duration: 0.75, delay: 0.45, ease: 'easeInOut' }}
                />
              </svg>
            </div>

            {/* BƯỚC 4: SLOGAN "GỬI TRỌN AN LÒNG" FADE IN THANH THOÁT */}
            <m.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.28, ease: 'easeOut' }}
              style={{
                fontSize: '0.86rem',
                color: '#526058',
                fontWeight: '600',
                letterSpacing: '2.5px',
                textTransform: 'uppercase'
              }}
            >
              Gửi Trọn An Lòng
            </m.div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
