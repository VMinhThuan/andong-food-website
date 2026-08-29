import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Wheat, Sun, Heart } from 'lucide-react';

const slides = [
  {
    id: 1,
    badge: 'CÂU CHUYỆN AN ĐÔNG',
    badgeIcon: Sun,
    title: 'Gạo Ngon Chuẩn Giống',
    highlight: 'Gửi Trọn An Lòng',
    desc: 'Những hạt gạo thơm ngon và chất lượng đáng tin, cho người ăn ngon miệng, người chọn an lòng.',
    primaryBtn: { text: 'Khám Phá An Đông', link: '/gioi-thieu' },
    secondaryBtn: { text: 'Khám Phá Sản Phẩm', link: '/san-pham' },
    bgImage: '/assets/rice-sunrise.jpg',
  },
  {
    id: 2,
    badge: 'BÌNH AN Ở PHÍA ĐÔNG',
    badgeIcon: Wheat,
    title: 'Bình An Ở Phía Đông',
    highlight: 'Gửi Trao Yêu Thương',
    desc: 'Từ những hạt gạo chuẩn ST25 được chọn lựa khắt khe, vun đắp những bữa cơm an lành trong mỗi gia đình.',
    primaryBtn: { text: 'Khám Phá An Đông', link: '/gioi-thieu' },
    secondaryBtn: { text: 'Khám Phá Sản Phẩm', link: '/san-pham' },
    bgImage: '/assets/rice-mekong.jpg',
  },
  {
    id: 3,
    badge: 'TÂM TÌNH NGƯỜI CHỌN GẠO',
    badgeIcon: Heart,
    title: 'Người Ăn Ngon Miệng',
    highlight: 'Người Chọn An Lòng',
    desc: '“Đông” là sự bền bỉ qua năm tháng – “An” là sự bình an gửi trao trọn vẹn đến người mình thương.',
    primaryBtn: { text: 'Khám Phá An Đông', link: '/gioi-thieu' },
    secondaryBtn: { text: 'Khám Phá Sản Phẩm', link: '/san-pham' },
    bgImage: '/assets/rice-grains.jpg',
  }
];

export default function HeroBannerSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  // Tự động chuyển slide mỗi 5 giây (5s)
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [current]);

  const slide = slides[current];
  const BadgeIcon = slide.badgeIcon;

  return (
    <section style={{
      position: 'relative',
      height: '680px',
      maxHeight: '680px',
      overflow: 'hidden',
      backgroundColor: 'var(--bg-dark)',
      userSelect: 'none',
      display: 'flex',
      alignItems: 'center'
    }}>
      {/* Full-width Vietnam Rice Field Background Banner */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${slide.bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 45%',
            zIndex: 1
          }}
        >
          {/* Natural Dark/Muted Left-side Gradient Overlay for readability of white text */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, rgba(10,51,26,0.72) 0%, rgba(10,51,26,0.42) 40%, rgba(10,51,26,0) 80%)'
          }} />
        </motion.div>
      </AnimatePresence>

      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        padding: '0 clamp(20px, 4vw, 60px)'
      }}>
        <div style={{ maxWidth: '780px' }}>
          {/* Badge nhỏ */}
          <motion.div
            key={`badge-${slide.id}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            style={{ height: '36px' }}
          >
            <span className="badge badge-gold" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              fontSize: '0.82rem',
              backgroundColor: 'var(--golden-pale)',
              boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
            }}>
              <BadgeIcon size={15} color="var(--earth-brown)" />
              <span>{slide.badge}</span>
            </span>
          </motion.div>

          {/* Heading lớn: GẠO NGON CHUẨN GIỐNG / GỬI TRỌN AN LÒNG */}
          <div style={{ minHeight: '125px', display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '14px 0 10px' }}>
            <motion.h1
              key={`title-${slide.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.3rem, 4.2vw, 3.4rem)',
                lineHeight: 1.16,
                color: '#ffffff',
                margin: 0,
                fontWeight: '800',
                textShadow: '0 3px 16px rgba(0,0,0,0.65)'
              }}
            >
              {slide.title} <br />
              <span style={{
                color: 'var(--golden-light)',
                textShadow: '0 4px 25px rgba(253,185,19,0.5)',
                display: 'inline-block'
              }}>
                {slide.highlight}
              </span>
            </motion.h1>
          </div>

          {/* Description ngắn gọn cảm xúc (2-3 dòng) */}
          <div style={{ minHeight: '56px', marginBottom: '28px' }}>
            <motion.p
              key={`desc-${slide.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16 }}
              style={{
                fontSize: '1.1rem',
                color: '#f0f7f3',
                lineHeight: 1.7,
                margin: 0,
                maxWidth: '620px',
                textShadow: '0 2px 10px rgba(0,0,0,0.6)'
              }}
            >
              {slide.desc}
            </motion.p>
          </div>

          {/* CTA Buttons: [ KHÁM PHÁ AN ĐÔNG → ]  Khám phá sản phẩm */}
          <motion.div
            key={`btn-${slide.id}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}
          >
            <Link to={slide.primaryBtn.link} className="btn btn-gold btn-lg">
              <span>{slide.primaryBtn.text}</span>
              <ArrowRight size={18} />
            </Link>

            <Link
              to={slide.secondaryBtn.link}
              className="btn btn-outline-white btn-lg"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(8px)'
              }}
            >
              <span>{slide.secondaryBtn.text}</span>
            </Link>
          </motion.div>

          {/* 4 Giá Trị Định Vị Chuẩn Brand Profile */}
          <div style={{
            marginTop: '36px',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            paddingTop: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            flexWrap: 'wrap',
            fontSize: '0.86rem',
            color: 'var(--golden-pale)',
            fontWeight: '600',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            textShadow: '0 1px 4px rgba(0,0,0,0.5)'
          }}>
            <span>Chân Thật</span>
            <span style={{ color: 'var(--golden-light)' }}>•</span>
            <span>Chu Đáo</span>
            <span style={{ color: 'var(--golden-light)' }}>•</span>
            <span>Trách Nhiệm</span>
            <span style={{ color: 'var(--golden-light)' }}>•</span>
            <span>Bền Bỉ</span>
          </div>
        </div>
      </div>

      {/* Tinh tế Bottom Indicator (Không dùng mũi tên to thô, chuẩn Luxury Brand) */}
      <div style={{
        position: 'absolute',
        bottom: '22px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: 'rgba(10, 51, 26, 0.6)',
        backdropFilter: 'blur(10px)',
        padding: '6px 14px',
        borderRadius: '9999px',
        border: '1px solid rgba(255, 255, 255, 0.12)'
      }}>
        {slides.map((s, index) => (
          <button
            key={s.id}
            onClick={() => {
              setDirection(index > current ? 1 : -1);
              setCurrent(index);
            }}
            aria-label={`Chuyển đến slide ${index + 1}`}
            style={{
              width: current === index ? '24px' : '7px',
              height: '7px',
              borderRadius: '9999px',
              backgroundColor: current === index ? 'var(--golden-light)' : 'rgba(255, 255, 255, 0.35)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: current === index ? '0 0 10px rgba(253,185,19,0.7)' : 'none'
            }}
          />
        ))}
      </div>
    </section>
  );
}
