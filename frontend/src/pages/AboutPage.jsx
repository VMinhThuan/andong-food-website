import React from 'react';
import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
import { ArrowRight, CheckCircle2, ShieldCheck, Compass, Wheat, Heart } from 'lucide-react';
import { QualityProcessSection } from './HomePage';
import RiceHorizonDivider from '../components/common/RiceHorizonDivider';

import BannerSvg from '../assets/optimized/banner.webp';
import FooterBannerSvg from '../assets/brand/footer-banner.svg';
import AnDongAnLongSvg from '../assets/brand/andong-anlong.svg';
import { triggerHotlineModal } from '../components/common/HotlineModal';
import SEO from '../components/common/SEO';

const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -35 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 35 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08
    }
  }
};

const RiceStalkIcon = () => (
  <svg viewBox="0 0 100 100" width="22" height="22" style={{ color: 'var(--brand-yellow)', flexShrink: 0, marginTop: '2px' }}>
    <path d="M 20,90 C 35,65 50,40 50,15" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
    <path d="M 50,15 C 40,15 35,28 42,32 C 48,32 50,22 50,15 Z" fill="currentColor" />
    <path d="M 45,35 C 33,35 28,45 35,50 C 42,50 45,42 45,35 Z" fill="currentColor" />
    <path d="M 38,55 C 26,55 22,65 28,70 C 34,70 38,62 38,55 Z" fill="currentColor" />
    <path d="M 50,15 C 60,15 65,28 58,32 C 52,32 50,22 50,15 Z" fill="currentColor" />
    <path d="M 53,30 C 65,30 70,40 63,45 C 56,45 53,37 53,30 Z" fill="currentColor" />
    <path d="M 55,48 C 67,48 72,58 65,63 C 58,63 55,55 55,48 Z" fill="currentColor" />
  </svg>
);

const LeafStalkIcon = () => (
  <svg viewBox="0 0 100 100" width="28" height="28" style={{ color: 'var(--brand-green-dark)', flexShrink: 0 }} fill="currentColor">
    <path d="M 50,85 L 50,20" stroke="#119C4A" strokeWidth="6" strokeLinecap="round" />
    <path d="M 50,20 C 45,28 45,38 50,42 C 55,38 55,28 50,20 Z" fill="#FDB913" />
    <path d="M 50,45 C 32,45 28,55 35,62 C 42,62 48,55 50,45 Z" fill="#119C4A" />
    <path d="M 50,45 C 68,45 72,55 65,62 C 58,62 52,55 50,45 Z" fill="#119C4A" />
    <path d="M 50,60 C 35,60 30,70 38,77 C 46,77 48,70 50,60 Z" fill="#119C4A" />
    <path d="M 50,60 C 65,60 70,70 62,77 C 54,77 52,70 50,60 Z" fill="#119C4A" />
  </svg>
);

const CurvedStalkIcon = () => (
  <svg viewBox="0 0 100 100" width="28" height="28" style={{ color: 'var(--brand-yellow)', flexShrink: 0 }} fill="currentColor">
    <path d="M 30,85 C 40,65 60,45 80,30" fill="none" stroke="#119C4A" strokeWidth="5" strokeLinecap="round" />
    <path d="M 80,30 C 72,30 68,22 75,18 Z" fill="#FDB913" />
    <path d="M 70,40 C 62,40 58,32 65,28 Z" fill="#FDB913" />
    <path d="M 60,50 C 52,50 48,42 55,38 Z" fill="#FDB913" />
    <path d="M 45,65 C 32,60 25,48 30,42 Z" fill="#119C4A" />
    <path d="M 55,55 C 42,50 35,38 40,32 Z" fill="#119C4A" />
  </svg>
);

const SteamRiceBowlIcon = () => (
  <svg viewBox="0 0 100 100" width="28" height="28" style={{ flexShrink: 0 }}>
    <path d="M 35,30 C 35,20 40,20 40,10" fill="none" stroke="#119C4A" strokeWidth="4" strokeLinecap="round" />
    <path d="M 50,30 C 50,18 55,18 55,8" fill="none" stroke="#119C4A" strokeWidth="4" strokeLinecap="round" />
    <path d="M 65,30 C 65,22 70,22 70,12" fill="none" stroke="#119C4A" strokeWidth="4" strokeLinecap="round" />
    <path d="M 24,55 C 24,40 76,40 76,55 Z" fill="#FDB913" />
    <path d="M 20,55 C 20,80 80,80 80,55 Z" fill="#0A5C2C" />
    <path d="M 35,80 L 65,80 L 60,86 L 40,86 Z" fill="#0A5C2C" />
  </svg>
);

const ShieldCheckCustomIcon = () => (
  <svg viewBox="0 0 100 100" width="28" height="28" style={{ flexShrink: 0 }}>
    <path d="M 50,15 C 65,15 78,20 80,38 C 82,62 65,80 50,85 C 35,80 18,62 20,38 C 22,20 35,15 50,15 Z" fill="none" stroke="#119C4A" strokeWidth="6" strokeLinejoin="round" />
    <path d="M 50,20 C 62,20 73,24 75,39 C 77,58 62,74 50,79 C 38,74 23,58 25,39 C 27,24 38,20 50,20 Z" fill="#FFFBEA" />
    <path d="M 38,50 L 46,58 L 64,38" fill="none" stroke="#FDB913" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const StepSeedIcon = () => (
  <svg viewBox="0 0 100 100" width="52" height="52">
    <circle cx="50" cy="50" r="40" fill="#FFF8DD" />
    <path d="M 45,45 Q 55,25 70,12 C 60,25 55,38 52,50" fill="none" stroke="#FDB913" strokeWidth="5" strokeLinecap="round" />
    <path d="M 68,10 C 62,12 58,5 64,2 Z" fill="#FDB913" />
    <path d="M 60,20 C 54,22 50,15 56,12 Z" fill="#FDB913" />
    <path d="M 52,30 C 46,32 42,25 48,22 Z" fill="#F99D1B" />
    <path d="M 46,42 C 40,44 36,37 42,34 Z" fill="#F99D1B" />
    <path d="M 72,18 C 78,22 80,15 76,10 Z" fill="#FDB913" />
    <path d="M 66,28 C 72,32 74,25 70,20 Z" fill="#FDB913" />
    <path d="M 60,38 C 66,42 68,35 64,30 Z" fill="#FDB913" />
    <path d="M 28,66 C 36,60 45,60 52,66 L 75,58 C 72,50 62,48 55,53 L 46,46 C 40,52 30,55 24,66 Z" fill="#119C4A" />
    <path d="M 24,66 C 22,69 22,74 26,76 L 52,76 C 58,76 65,70 70,64" fill="none" stroke="#0A5C2C" strokeWidth="4.5" strokeLinecap="round" />
  </svg>
);

const StepCultivateIcon = () => (
  <svg viewBox="0 0 100 100" width="52" height="52">
    <circle cx="50" cy="50" r="40" fill="#FFF8DD" />
    <path d="M 25,72 C 35,60 65,60 75,72 Z" fill="#754C1F" />
    <path d="M 30,72 C 40,65 60,65 70,72 Z" fill="#E8D4B0" opacity="0.3" />
    <path d="M 50,68 Q 48,42 56,26" fill="none" stroke="#119C4A" strokeWidth="6" strokeLinecap="round" />
    <path d="M 56,26 C 45,28 35,20 32,12 C 42,10 50,15 56,26 Z" fill="#39B54A" />
    <path d="M 52,42 C 65,42 74,34 78,25 C 70,22 60,28 52,42 Z" fill="#119C4A" />
  </svg>
);

const StepHarvestIcon = () => (
  <svg viewBox="0 0 100 100" width="52" height="52">
    <circle cx="50" cy="50" r="40" fill="#FFF8DD" />
    <path d="M 35,75 Q 42,45 68,22" fill="none" stroke="#119C4A" strokeWidth="4.5" strokeLinecap="round" />
    <path d="M 45,75 Q 50,50 78,32" fill="none" stroke="#39B54A" strokeWidth="4" strokeLinecap="round" />
    <path d="M 55,75 Q 56,55 82,45" fill="none" stroke="#119C4A" strokeWidth="3" strokeLinecap="round" />
    <circle cx="68" cy="22" r="6" fill="#FDB913" />
    <circle cx="60" cy="28" r="6" fill="#FDB913" />
    <circle cx="52" cy="34" r="6" fill="#FDB913" />
    <circle cx="44" cy="40" r="6" fill="#F99D1B" />
    <circle cx="78" cy="32" r="6" fill="#FDB913" />
    <circle cx="70" cy="40" r="6" fill="#FDB913" />
    <circle cx="62" cy="46" r="6" fill="#FDB913" />
    <circle cx="54" cy="52" r="6" fill="#F99D1B" />
    <circle cx="82" cy="45" r="5.5" fill="#FDB913" />
    <circle cx="74" cy="51" r="5.5" fill="#F99D1B" />
  </svg>
);

const StepProduceIcon = () => (
  <svg viewBox="0 0 100 100" width="52" height="52">
    <circle cx="50" cy="50" r="40" fill="#FFF8DD" />
    <path d="M 62,65 Q 68,42 60,25" fill="none" stroke="#39B54A" strokeWidth="4" strokeLinecap="round" />
    <path d="M 60,25 Q 50,28 46,20 C 52,17 58,20 60,25 Z" fill="#39B54A" />
    <path d="M 22,68 L 22,46 L 36,54 L 36,46 L 50,54 L 50,68 Z" fill="#119C4A" />
    <path d="M 52,68 L 52,40 C 52,36 66,36 66,40 L 66,68 Z" fill="#0A5C2C" />
    <path d="M 52,40 C 52,32 66,32 66,40 Z" fill="#FDB913" />
    <rect x="28" y="56" width="5" height="8" fill="#FFFBEA" />
    <rect x="42" y="56" width="5" height="8" fill="#FFFBEA" />
    <rect x="57" y="48" width="5" height="12" fill="#FFFBEA" />
  </svg>
);

const StepPackageIcon = () => (
  <svg viewBox="0 0 100 100" width="52" height="52">
    <circle cx="50" cy="50" r="40" fill="#FFF8DD" />
    <path d="M 28,42 L 50,28 L 72,42 L 72,72 L 50,85 L 28,72 Z" fill="#119C4A" />
    <path d="M 28,42 L 50,55 L 72,42" fill="none" stroke="#0A5C2C" strokeWidth="3" />
    <path d="M 50,55 L 50,85" fill="none" stroke="#0A5C2C" strokeWidth="3" />
    <path d="M 28,42 L 50,30 L 72,42" fill="none" stroke="#FFFBEA" strokeWidth="2" opacity="0.3" />
    <circle cx="68" cy="68" r="15" fill="#ffffff" stroke="#FDB913" strokeWidth="3" />
    <path d="M 61,68 L 66,73 L 75,62" fill="none" stroke="#119C4A" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function AboutPage() {
  const steps = [
    {
      step: '01',
      title: 'CHỌN GIỐNG',
      desc: 'Tuyển chọn nguồn giống thuần chủng, chất lượng tốt.'
    },
    {
      step: '02',
      title: 'CANH TÁC',
      desc: 'Chăm sóc theo quy trình tự nhiên, an toàn sinh thái.'
    },
    {
      step: '03',
      title: 'THU HOẠCH',
      desc: 'Thu hoạch đúng độ chín vàng óng của hạt lúa.'
    },
    {
      step: '04',
      title: 'SẢN XUẤT',
      desc: 'Xay xát và làm sạch với quy trình khép kín.'
    },
    {
      step: '05',
      title: 'ĐÓNG GÓI',
      desc: 'Bảo quản cẩn thận và dán mã QR minh bạch thông tin.'
    }
  ];

  return (
    <div className="about-page" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <SEO
        title="Về Chúng Tôi – Câu Chuyện Hạt Gạo An Đông"
        description="Khám phá câu chuyện thương hiệu An Đông Food, tầm nhìn, sứ mệnh vì bữa cơm an lành và 3 giá trị cốt lõi Chân Thành - Tinh Tế - Bền Bỉ."
        keywords="Về An Đông, Giới thiệu An Đông Food, Câu chuyện thương hiệu, Gạo sạch An Đông, Tầm nhìn sứ mệnh"
      />

      {/* 1. HERO BANNER AN ĐÔNG - STICKY SCROLL REVEAL (MÔ PHỎNG CHUẨN ẢNH 1, 2, 3) */}
      <section className="about-hero-reveal-section">
        {/* Sticky Hero Background Story Image (Desktop & Mobile) */}
        <div className="about-hero-sticky-wrap">
          <picture>
            <source media="(max-width: 768px)" srcSet="/assets/brand-element/MOBILE_story.webp" />
            <img
              src="/assets/brand-element/DESKTOP_story.webp"
              alt="An Đông - Gạo Ngon Chuẩn Giống, Gửi Trọn An Lòng"
              className="about-hero-story-img"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
        </div>

        {/* Khối nền xanh gập ghềnh (footer-banner.svg) trượt đè lên trên khi scroll */}
        <div className="about-green-scroll-overlay">
          {/* Dải sóng xanh gập ghềnh footer-banner.svg */}
          <div className="about-green-wave-head">
            <img
              src={FooterBannerSvg}
              alt="Dải sóng xanh An Đông"
              loading="lazy"
              decoding="async"
              className="about-green-wave-img"
            />

            {/* Khối nội dung chữ nằm lồng sát bên dưới đường sóng xanh */}
            <div className="about-green-text-overlay">
              <div className="container" style={{ maxWidth: '880px', margin: '0 auto' }}>
                <m.p
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.55 }}
                  className="about-green-paragraph"
                >
                  Trong cuộc sống, sự quan tâm dành cho gia đình không phải lúc nào cũng được thể hiện bằng những điều lớn lao. Đôi khi, đó chỉ là việc lựa chọn nguồn thực phẩm chất lượng, thơm ngon.
                </m.p>

                <m.p
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.55, delay: 0.12 }}
                  className="about-green-paragraph"
                >
                  An Đông mong muốn giúp mỗi người gửi gắm sự quan tâm đến người thân và gia đình qua từng bữa cơm — để dù gần hay xa, người ăn ngon miệng, người chọn cũng an lòng
                </m.p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. KHÔNG NGỪNG CẦU TIẾN (TẦM NHÌN & SỨ MỆNH - CHUẨN UI ẢNH 5) */}
      <section style={{
        padding: '75px 0 65px',
        backgroundColor: '#FFFDF9',
        position: 'relative'
      }}>
        <div className="container" style={{ maxWidth: '1360px', padding: '0 28px', margin: '0 auto' }}>
          {/* Tiêu đề mục */}
          <m.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.55 }}
            style={{ textAlign: 'center', marginBottom: '55px' }}
          >
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.1rem, 3.6vw, 3rem)',
              color: '#754C1F',
              fontWeight: '800',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              margin: 0
            }}>
              KHÔNG NGỪNG CẦU TIẾN
            </h2>
          </m.div>

          {/* 2 Cột: 01 TẦM NHÌN & 02 SỨ MỆNH */}
          <div className="about-editorial-grid-2">
            {/* 01 TẦM NHÌN */}
            <m.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.55 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%'
              }}
            >
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.35rem',
                  fontWeight: '800',
                  color: '#11994A',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  letterSpacing: '0.5px'
                }}>
                  <span style={{ fontSize: '1.35rem' }}>01</span>
                  <span>TẦM NHÌN</span>
                </h3>
                <p style={{
                  margin: 0,
                  fontSize: '1.05rem',
                  lineHeight: '1.8',
                  color: '#444444',
                  fontWeight: '400',
                  minHeight: '75px'
                }}>
                  Trở thành thương hiệu gạo Việt được tin chọn trong mỗi gia đình, góp phần vun đắp những bữa cơm ngon, an lành và gắn kết qua nhiều thế hệ.
                </p>
              </div>
              <div style={{ width: '100%', height: '1.5px', backgroundColor: '#E6DAC8', marginTop: '24px' }} />
            </m.div>

            {/* 02 SỨ MỆNH */}
            <m.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%'
              }}
            >
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.35rem',
                  fontWeight: '800',
                  color: '#11994A',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  letterSpacing: '0.5px'
                }}>
                  <span style={{ fontSize: '1.35rem' }}>02</span>
                  <span>SỨ MỆNH</span>
                </h3>
                <p style={{
                  margin: 0,
                  fontSize: '1.05rem',
                  lineHeight: '1.8',
                  color: '#444444',
                  fontWeight: '400',
                  minHeight: '75px'
                }}>
                  Giúp mỗi người chăm lo cho người mình thương bằng những hạt gạo ngon, chất lượng đáng tin và những bữa cơm an lành mỗi ngày.
                </p>
              </div>
              <div style={{ width: '100%', height: '1.5px', backgroundColor: '#E6DAC8', marginTop: '24px' }} />
            </m.div>
          </div>
        </div>
      </section>

      {/* 3. THƯƠNG HIỆU VIỆT (GIÁ TRỊ CỐT LÕI - CHUẨN UI ẢNH 5) */}
      <section style={{
        padding: '45px 0 95px',
        backgroundColor: '#FFFDF9',
        position: 'relative'
      }}>
        <div className="container" style={{ maxWidth: '1360px', padding: '0 28px', margin: '0 auto' }}>
          {/* Tiêu đề mục */}
          <m.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.55 }}
            style={{ textAlign: 'center', marginBottom: '55px' }}
          >
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.1rem, 3.6vw, 3rem)',
              color: '#754C1F',
              fontWeight: '800',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              margin: 0
            }}>
              THƯƠNG HIỆU VIỆT
            </h2>
          </m.div>

          {/* 3 Cột: CHÂN THÀNH - TINH TẾ - BỀN BỈ */}
          <div className="about-editorial-grid-3">
            {/* CHÂN THÀNH */}
            <m.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.55 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%'
              }}
            >
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.3rem',
                  fontWeight: '800',
                  color: '#11994A',
                  marginBottom: '16px',
                  letterSpacing: '0.5px'
                }}>
                  CHÂN THÀNH
                </h3>
                <p style={{
                  margin: 0,
                  fontSize: '1.02rem',
                  lineHeight: '1.8',
                  color: '#444444',
                  fontWeight: '400',
                  minHeight: '85px'
                }}>
                  Trung thực tuyệt đối trong nguồn nguyên liệu và thông tin sản phẩm gửi đến người tiêu dùng.
                </p>
              </div>
              <div style={{ width: '100%', height: '1.5px', backgroundColor: '#E6DAC8', marginTop: '24px' }} />
            </m.div>

            {/* TINH TẾ */}
            <m.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%'
              }}
            >
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.3rem',
                  fontWeight: '800',
                  color: '#11994A',
                  marginBottom: '16px',
                  letterSpacing: '0.5px'
                }}>
                  TINH TẾ
                </h3>
                <p style={{
                  margin: 0,
                  fontSize: '1.02rem',
                  lineHeight: '1.8',
                  color: '#444444',
                  fontWeight: '400',
                  minHeight: '85px'
                }}>
                  Chăm chút tỉ mỉ từ quy trình đóng gói, hướng dẫn sử dụng đến hương vị trọn vẹn trong bữa cơm.
                </p>
              </div>
              <div style={{ width: '100%', height: '1.5px', backgroundColor: '#E6DAC8', marginTop: '24px' }} />
            </m.div>

            {/* BỀN BỈ */}
            <m.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%'
              }}
            >
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.3rem',
                  fontWeight: '800',
                  color: '#11994A',
                  marginBottom: '16px',
                  letterSpacing: '0.5px'
                }}>
                  BỀN BỈ
                </h3>
                <p style={{
                  margin: 0,
                  fontSize: '1.02rem',
                  lineHeight: '1.8',
                  color: '#444444',
                  fontWeight: '400',
                  minHeight: '85px'
                }}>
                  Kiên định với chuẩn mực chất lượng và giá trị bền vững dài lâu cùng khách hàng và đối tác.
                </p>
              </div>
              <div style={{ width: '100%', height: '1.5px', backgroundColor: '#E6DAC8', marginTop: '24px' }} />
            </m.div>
          </div>
        </div>
      </section>

      {/* 4. CAM KẾT: AN ĐÔNG GỬI TRỌN AN LÒNG (Nền Cánh Đồng rice-mekong.webp) */}
      <section style={{
        position: 'relative',
        padding: '115px 20px 125px',
        backgroundImage: 'url(/assets/rice-mekong.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 45%',
        backgroundColor: '#081c15',
        color: '#ffffff',
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        {/* Dark Emerald & Warm Gradient Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(8, 28, 21, 0.76) 0%, rgba(14, 60, 35, 0.70) 50%, rgba(20, 14, 4, 0.55) 100%)',
          zIndex: 1
        }} />

        {/* Subtle Ambient Light Glow */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '380px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 174, 25, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '880px', margin: '0 auto' }}>
          {/* Logo / Typography Slogan: AN ĐÔNG gửi trọn AN LÒNG */}
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={fadeInUp}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 26px',
              userSelect: 'none',
              maxWidth: 'clamp(320px, 48vw, 540px)',
              width: '100%'
            }}
          >
            <img
              src={AnDongAnLongSvg}
              alt="An Đông gửi trọn An Lòng"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                filter: 'drop-shadow(0 6px 20px rgba(0,0,0,0.6))'
              }}
            />
          </m.div>

          {/* Lời cam kết chân thành */}
          <m.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={fadeInUp}
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.18rem)',
              lineHeight: 1.75,
              color: 'rgba(255, 255, 255, 0.95)',
              maxWidth: '720px',
              margin: '0 auto 38px',
              fontWeight: '500',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)'
            }}
          >
            "An Đông cam kết mang đến những hạt gạo thơm ngon, chất lượng đáng tin, để người ăn ngon miệng và người chọn an lòng."
          </m.p>

          {/* 2 Nút Hành Động */}
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={fadeInUp}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '18px',
              flexWrap: 'wrap'
            }}
          >
            {/* Nút 1: Gọi đặt hàng - Phong cách Vàng Gold Amber nổi bật */}
            <button
              type="button"
              onClick={triggerHotlineModal}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: 'linear-gradient(135deg, #F5A623 0%, #D98207 100%)',
                color: '#1a1003',
                border: 'none',
                borderRadius: '999px',
                padding: '15px 32px',
                fontSize: '1rem',
                fontWeight: 800,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: '0 10px 28px rgba(217, 130, 7, 0.4)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 14px 34px rgba(217, 130, 7, 0.55)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 28px rgba(217, 130, 7, 0.4)';
              }}
            >
              <span>Gọi đặt hàng</span>
              <ArrowRight size={18} />
            </button>

            {/* Nút 2: Khám phá sản phẩm - Nền xanh chữ trắng */}
            <Link
              to="/san-pham"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: '#1E824C',
                backgroundImage: 'linear-gradient(135deg, #27AE60 0%, #1E824C 100%)',
                color: '#ffffff',
                border: 'none',
                textDecoration: 'none',
                borderRadius: '999px',
                padding: '15px 32px',
                fontSize: '1rem',
                fontWeight: 700,
                transition: 'all 0.25s ease',
                boxShadow: '0 8px 24px rgba(30, 130, 76, 0.4)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(39, 174, 96, 0.55)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(30, 130, 76, 0.4)';
              }}
            >
              <span>Khám phá sản phẩm</span>
              <ArrowRight size={18} />
            </Link>
          </m.div>
        </div>
      </section>

    </div>
  );
}
