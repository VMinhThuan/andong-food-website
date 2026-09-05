import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { m, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import Carousel1 from '../../assets/optimized/carousel-1.webp';
import Carousel2 from '../../assets/optimized/carousel-2.webp';

const slides = [
  {
    id: 1,
    desktopImage: '/assets/brand-element/Desktop/desktop-1.webp',
    mobileImage: '/assets/brand-element/Mobile/mobile-1.webp',
    alt: 'An Đông Food Banner 1 - Chọn An Đông, Trao An Lòng',
    link: '/san-pham'
  },
  {
    id: 2,
    desktopImage: '/assets/brand-element/Desktop/desktop-2.webp',
    mobileImage: '/assets/brand-element/Mobile/mobile-2.webp',
    alt: 'An Đông Food Banner 2 - Gạo Ngon Chuẩn Giống',
    link: '/gioi-thieu'
  }
];

export default function HeroBannerSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef(null);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5500);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [current]);

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    resetTimer();
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
    resetTimer();
  };

  const slide = slides[current];

  return (
    <section
      className="home-hero"
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '2880 / 1320',
        overflow: 'hidden',
        backgroundColor: '#FFFDF9',
        userSelect: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* 2 Banner Slides dạng Responsive Picture (Tự động đổi ảnh cho Desktop & Mobile) */}
      <AnimatePresence initial={false} custom={direction}>
        <m.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 1
          }}
        >
          <Link
            to={slide.link}
            style={{ display: 'block', width: '100%', height: '100%', cursor: 'pointer' }}
          >
            <picture style={{ display: 'block', width: '100%', height: '100%' }}>
              <source media="(max-width: 768px)" srcSet={slide.mobileImage} />
              <img
                src={slide.desktopImage}
                alt={slide.alt}
                width={2880}
                height={1320}
                fetchPriority={current === 0 ? 'high' : 'auto'}
                decoding="async"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block'
                }}
              />
            </picture>
          </Link>
        </m.div>
      </AnimatePresence>

      {/* Nút Chuyển Banner Sang Trái (Back Button) */}
      <button
        onClick={handlePrev}
        aria-label="Slide trước"
        style={{
          position: 'absolute',
          left: 'clamp(12px, 2.5vw, 36px)',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 15,
          width: 'clamp(38px, 4vw, 48px)',
          height: 'clamp(38px, 4vw, 48px)',
          borderRadius: '10px',
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          color: '#1e293b',
          border: 'none',
          boxShadow: '0 4px 18px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
          e.currentTarget.style.backgroundColor = '#ffffff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.92)';
        }}
      >
        <ChevronLeft size={24} strokeWidth={2.4} color="#0f172a" />
      </button>

      {/* Nút Chuyển Banner Sang Phải (Next Button) */}
      <button
        onClick={handleNext}
        aria-label="Slide tiếp theo"
        style={{
          position: 'absolute',
          right: 'clamp(12px, 2.5vw, 36px)',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 15,
          width: 'clamp(38px, 4vw, 48px)',
          height: 'clamp(38px, 4vw, 48px)',
          borderRadius: '10px',
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          color: '#1e293b',
          border: 'none',
          boxShadow: '0 4px 18px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
          e.currentTarget.style.backgroundColor = '#ffffff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.92)';
        }}
      >
        <ChevronRight size={24} strokeWidth={2.4} color="#0f172a" />
      </button>

      {/* Nút Chuyển Slide Dạng Gạch Ngang (2 Gạch tương ứng 2 Slides) */}
      <div
        className="home-hero__dashes"
        style={{
          position: 'absolute',
          bottom: 'clamp(14px, 3vw, 28px)',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 15,
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        {slides.map((s, index) => (
          <button
            key={s.id}
            onClick={(e) => {
              e.stopPropagation();
              setDirection(index > current ? 1 : -1);
              setCurrent(index);
              resetTimer();
            }}
            aria-label={`Chuyển đến slide ${index + 1}`}
            style={{
              width: current === index ? '48px' : '24px',
              height: '4px',
              borderRadius: '2px',
              backgroundColor: current === index ? '#ffffff' : 'rgba(255, 255, 255, 0.45)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: current === index ? '0 0 10px rgba(255, 255, 255, 0.9), 0 2px 4px rgba(0,0,0,0.5)' : 'none'
            }}
            onMouseEnter={(e) => {
              if (current !== index) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
            }}
            onMouseLeave={(e) => {
              if (current !== index) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.45)';
            }}
          />
        ))}
      </div>
    </section>
  );
}
