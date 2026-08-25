import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BrandPreloader({ onFinish }) {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Total loading sequence takes ~1.35 seconds, then smoothly fades out
    const timer = setTimeout(() => {
      setIsDone(true);
      if (onFinish) onFinish();
    }, 1350);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
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
            backgroundColor: '#faf9f5',
            backgroundImage: 'radial-gradient(circle at center 40%, rgba(254, 250, 224, 0.7) 0%, #faf9f5 85%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            pointerEvents: 'none'
          }}
        >
          {/* Subtle Ambient Sunlight Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.6, scale: 1.2 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              width: '320px',
              height: '320px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(233, 196, 106, 0.35) 0%, rgba(250, 249, 245, 0) 70%)',
              pointerEvents: 'none'
            }}
          />

          <div style={{
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
            {/* BƯỚC 1: ICON MẶT TRỜI / BÔNG LÚA TRONG LOGO VẼ DẦN XUẤT HIỆN */}
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ marginBottom: '14px' }}
            >
              <img
                src="/assets/logo-gao.png"
                alt="An Đông Food"
                style={{
                  height: '75px',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 6px 18px rgba(176, 125, 53, 0.2))'
                }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </motion.div>

            {/* BƯỚC 2: TÊN THƯƠNG HIỆU "AN ĐÔNG FOOD" FADE IN */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
            >
              <div style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.75rem',
                fontWeight: '800',
                letterSpacing: '2.5px',
                color: '#1b4332',
                lineHeight: 1
              }}>
                AN ĐÔNG
              </div>
              <div style={{
                fontSize: '0.78rem',
                fontWeight: '800',
                color: '#b07d35',
                letterSpacing: '5px',
                textTransform: 'uppercase',
                marginTop: '4px'
              }}>
                FOOD
              </div>
            </motion.div>

            {/* BƯỚC 3: ĐƯỜNG CHÂN TRỜI CÁNH ĐỒNG LÚA CHẠY NGANG MẢNH MAI (SVG HORIZON LINE) */}
            <div style={{ width: '180px', height: '14px', margin: '14px 0 10px' }}>
              <svg width="180" height="14" viewBox="0 0 180 14" fill="none">
                {/* Lớp đường cong cánh đồng xanh */}
                <motion.path
                  d="M0 10 Q 45 4, 90 8 T 180 6"
                  stroke="#2d6a4f"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.85 }}
                  transition={{ duration: 0.75, delay: 0.35, ease: 'easeInOut' }}
                />
                {/* Lớp đường cong phù sa / vàng lúa */}
                <motion.path
                  d="M10 12 Q 55 7, 100 11 T 170 9"
                  stroke="#d4a373"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.65 }}
                  transition={{ duration: 0.75, delay: 0.45, ease: 'easeInOut' }}
                />
              </svg>
            </div>

            {/* BƯỚC 4: SLOGAN "GỬI TRỌN AN LÒNG" FADE IN THANH THOÁT */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
              style={{
                fontSize: '0.86rem',
                color: '#526058',
                fontWeight: '600',
                letterSpacing: '2.5px',
                textTransform: 'uppercase'
              }}
            >
              Gửi Trọn An Lòng
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
