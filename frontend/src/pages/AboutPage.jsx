import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ShieldCheck, Compass, Wheat, Heart } from 'lucide-react';
import { QualityProcessSection } from './HomePage';
import RiceHorizonDivider from '../components/common/RiceHorizonDivider';

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
    <div className="about-page" style={{ backgroundColor: 'var(--bg-main)', color: 'var(--primary)' }}>

      {/* 1. ABOUT HERO (SPLIT CINEMATIC 43/57 LAYOUT) */}
      <section style={{
        background: 'linear-gradient(135deg, var(--bg-dark) 0%, rgba(10, 51, 26, 0.9) 50%, var(--primary-dark) 100%)',
        color: '#ffffff',
        padding: '75px 0 80px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Ambient Glow behind image */}
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '8%',
          width: '550px',
          height: '550px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(253, 185, 19, 0.14) 0%, transparent 65%)',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '55px',
            alignItems: 'center'
          }}>
            {/* Left Content (43%) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={fadeInLeft}
            >
              <div className="badge badge-gold" style={{ marginBottom: '14px' }}>
                VỀ An Đông
              </div>

              {/* Heading cân đối đúng 2 dòng, sang trọng */}
              <h1 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.1rem, 3.4vw, 2.9rem)',
                color: 'var(--golden-pale)',
                lineHeight: 1.22,
                marginBottom: '18px',
                fontWeight: '800',
                letterSpacing: '0.5px'
              }}>
                Gìn Giữ Tinh Hoa <br />
                Trong Từng Hạt Gạo Việt
              </h1>

              {/* Copywriting đắt giá, kết nối trực tiếp thương hiệu */}
              <p style={{
                fontSize: '1.05rem',
                lineHeight: '1.8',
                color: '#d1e3d9',
                marginBottom: '28px',
                maxWidth: '490px'
              }}>
                Từ sự trân trọng hạt gạo Việt, An Đông gìn giữ những giá trị nguyên bản để gửi trao vị ngon và sự an lành trong mỗi bữa cơm gia đình.
              </p>

              {/* 1 CTA chính duy nhất */}
              <div>
                <Link
                  to="/san-pham"
                  className="btn btn-gold btn-lg"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '15px 34px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <span>Khám Phá Sản Phẩm</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>

            {/* Right Visual Image (57% - Lớn & Sắc nét hơn) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={fadeInRight}
            >
              <div style={{
                borderRadius: '26px',
                overflow: 'hidden',
                boxShadow: '0 24px 50px rgba(0, 0, 0, 0.38)',
                border: '3px solid rgba(255, 255, 255, 0.15)'
              }}>
                <motion.img
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  src="/assets/rice-grains.jpg"
                  alt="Bông lúa vàng tinh hoa An Đông"
                  style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }}
                  onError={(e) => { e.target.src = '/assets/rice-sunrise.jpg'; }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Chuyển từ hero tối sang nội dung nền sáng */}
      <RiceHorizonDivider idSuffix="-about-1" seed={23} variant="toGreen" />

      {/* 2. CÂU CHUYỆN TÊN GỌI (EDITORIAL 50/50 - REFINED PROPORTIONS) */}
      <section style={{
        padding: '95px 0',
        backgroundColor: 'var(--bg-main)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Elegant background rice stalk SVGs */}
        <div style={{
          position: 'absolute',
          top: '5%',
          left: '1%',
          width: '180px',
          height: '320px',
          opacity: 0.12,
          pointerEvents: 'none',
          color: 'var(--brand-green-dark)',
          transform: 'rotate(-10deg)'
        }}>
          <svg viewBox="0 0 100 200" width="100%" height="100%" fill="currentColor">
            <path d="M 10,200 C 30,120 40,60 70,10" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M 70,10 C 65,15 62,25 65,30 C 68,25 72,15 70,10 Z" />
            <path d="M 62,35 C 57,40 54,50 57,55 C 60,50 64,40 62,35 Z" />
            <path d="M 54,60 C 49,65 46,75 49,80 C 52,75 56,65 54,60 Z" />
            <path d="M 46,85 C 41,90 38,100 41,105 C 44,100 48,90 46,85 Z" />
            <path d="M 70,10 C 75,15 78,25 75,30 C 72,25 68,15 70,10 Z" />
            <path d="M 66,28 C 72,33 75,43 72,48 C 69,43 65,33 66,28 Z" />
            <path d="M 58,53 C 64,58 67,68 64,73 C 61,68 57,58 58,53 Z" />
            <path d="M 50,78 C 56,83 59,93 56,98 C 53,93 49,83 50,78 Z" />
            <path d="M 20,160 C 50,150 80,110 90,80 C 75,100 45,130 20,160 Z" />
          </svg>
        </div>

        <div style={{
          position: 'absolute',
          bottom: '5%',
          right: '1%',
          width: '180px',
          height: '320px',
          opacity: 0.12,
          pointerEvents: 'none',
          color: 'var(--brand-green-dark)',
          transform: 'scaleX(-1) rotate(-15deg)'
        }}>
          <svg viewBox="0 0 100 200" width="100%" height="100%" fill="currentColor">
            <path d="M 10,200 C 30,120 40,60 70,10" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M 70,10 C 65,15 62,25 65,30 C 68,25 72,15 70,10 Z" />
            <path d="M 62,35 C 57,40 54,50 57,55 C 60,50 64,40 62,35 Z" />
            <path d="M 54,60 C 49,65 46,75 49,80 C 52,75 56,65 54,60 Z" />
            <path d="M 46,85 C 41,90 38,100 41,105 C 44,100 48,90 46,85 Z" />
            <path d="M 70,10 C 75,15 78,25 75,30 C 72,25 68,15 70,10 Z" />
            <path d="M 66,28 C 72,33 75,43 72,48 C 69,43 65,33 66,28 Z" />
            <path d="M 58,53 C 64,58 67,68 64,73 C 61,68 57,58 58,53 Z" />
            <path d="M 50,78 C 56,83 59,93 56,98 C 53,93 49,83 50,78 Z" />
            <path d="M 20,160 C 50,150 80,110 90,80 C 75,100 45,130 20,160 Z" />
          </svg>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '60px',
            alignItems: 'center'
          }}>
            {/* CỘT TRÁI */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.25 }}
              variants={fadeInLeft}
            >
              <div className="badge badge-gold" style={{ marginBottom: '16px', border: '1px solid var(--accent)' }}>
                CÂU CHUYỆN THƯƠNG HIỆU
              </div>

              {/* Heading kết hợp nâu + xanh tạo hierarchy chuẩn mockup 1 */}
              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.6rem, 2.8vw, 2.25rem)',
                lineHeight: 1.35,
                marginBottom: '28px',
                fontWeight: '800',
                color: 'var(--brand-brown)'
              }}>
                An Đông – <span style={{ color: 'var(--brand-green-dark)' }}>gửi gắm bình an trong từng bữa cơm Việt.</span>
              </h2>

              {/* Cấu trúc dòng giải nghĩa An-Đông hàng ngang có gạch dưới - Đã loại bỏ icon và tăng nổi bật chữ */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                {/* Dòng An */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  paddingBottom: '16px',
                  borderBottom: '1px solid var(--border-light)'
                }}>
                  <div style={{ minWidth: '80px' }}>
                    <span style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '2.5rem',
                      fontWeight: '900',
                      color: 'var(--brand-green-dark)',
                      lineHeight: 1
                    }}>
                      An
                    </span>
                  </div>
                  <div style={{ width: '1px', height: '28px', backgroundColor: 'var(--border-medium)', flexShrink: 0 }} />
                  <div style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: '600', paddingLeft: '4px' }}>
                    Mong muốn trao gửi <strong>an lành</strong> đến mọi người.
                  </div>
                </div>

                {/* Dòng Đông */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  paddingBottom: '16px',
                  borderBottom: '1px solid var(--border-light)'
                }}>
                  <div style={{ minWidth: '80px' }}>
                    <span style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '2.5rem',
                      fontWeight: '900',
                      color: 'var(--brand-green-dark)',
                      lineHeight: 1
                    }}>
                      Đông
                    </span>
                  </div>
                  <div style={{ width: '1px', height: '28px', backgroundColor: 'var(--border-medium)', flexShrink: 0 }} />
                  <div style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: '600', paddingLeft: '4px' }}>
                    Tinh thần <strong>bền bỉ</strong> trước thử thách, luôn hướng về những điều tươi sáng.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '34px', fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                <p style={{ margin: 0 }}>
                  Trong cuộc sống, sự quan tâm dành cho gia đình không phải lúc nào cũng được thể hiện bằng những điều lớn lao. Đôi khi, đó chỉ là việc lựa chọn nguồn thực phẩm chất lượng, thơm ngon.
                </p>
                <p style={{ margin: 0 }}>
                  An Đông mong muốn giúp mỗi người gửi gắm sự quan tâm đến người thân và gia đình qua từng bữa cơm — để dù gần hay xa, người ăn ngon miệng, người chọn cũng an lòng.
                </p>
              </div>

              <div>
                <Link to="/gioi-thieu" className="btn btn-primary btn-lg">
                  <span>Tìm hiểu thêm về An Đông</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>

            {/* CỘT PHẢI: ẢNH LÚA HOÀNG HÔN + OVERLAPPING QUOTE CARD */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.25 }}
              variants={fadeInRight}
              style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{
                borderRadius: '28px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
                border: '4px solid #ffffff'
              }}>
                <motion.img
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  src="/assets/rice-sunrise.jpg"
                  alt="Cánh đồng lúa An Đông hoàng hôn"
                  style={{ width: '100%', height: '360px', objectFit: 'cover', display: 'block' }}
                />
              </div>

              {/* Quote card xanh đậm đè nhẹ lên ảnh tạo chiều sâu */}
              <div style={{
                marginTop: '-45px',
                marginLeft: '20px',
                marginRight: '20px',
                backgroundColor: 'var(--brand-green-dark)',
                borderRadius: '24px',
                padding: '24px 28px',
                color: '#ffffff',
                boxShadow: '0 12px 28px rgba(17, 156, 74, 0.16)',
                position: 'relative',
                overflow: 'hidden',
                zIndex: 3
              }}>
                {/* Gold double quote icon */}
                <div style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '3rem',
                  color: 'var(--brand-yellow)',
                  lineHeight: 1,
                  position: 'absolute',
                  top: '18px',
                  left: '24px',
                  opacity: 0.85
                }}>
                  “
                </div>
                <div style={{ paddingLeft: '32px', paddingTop: '10px' }}>
                  <div className="font-accent" style={{ fontSize: '1.45rem', color: 'var(--accent)', marginBottom: '6px' }}>
                    Bởi với An Đông,
                  </div>
                  <p style={{ margin: 0, fontSize: '0.94rem', lineHeight: '1.6', fontWeight: '500' }}>
                    “Bình an không chỉ là lời chúc dành cho người mình thương — mà còn hiện diện trong từng bữa cơm được chăm chút mỗi ngày.”
                  </p>
                </div>

                {/* Họa tiết bông lúa mờ ở góc phải */}
                <div style={{
                  position: 'absolute',
                  right: '10px',
                  bottom: '-15px',
                  width: '75px',
                  height: '110px',
                  opacity: 0.15,
                  color: '#ffffff',
                  pointerEvents: 'none'
                }}>
                  <svg viewBox="0 0 100 200" width="100%" height="100%" fill="currentColor">
                    <path d="M 10,200 C 30,120 40,60 70,10" fill="none" stroke="currentColor" strokeWidth="2" />
                    <path d="M 70,10 C 65,15 62,25 65,30 C 68,25 72,15 70,10 Z" />
                    <path d="M 62,35 C 57,40 54,50 57,55 C 60,50 64,40 62,35 Z" />
                    <path d="M 54,60 C 49,65 46,75 49,80 C 52,75 56,65 54,60 Z" />
                    <path d="M 46,85 C 41,90 38,100 41,105 C 44,100 48,90 46,85 Z" />
                    <path d="M 70,10 C 75,15 78,25 75,30 C 72,25 68,15 70,10 Z" />
                    <path d="M 66,28 C 72,33 75,43 72,48 C 69,43 65,33 66,28 Z" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Dải card ngang gồm 4 giá trị thương hiệu ở chân section */}
          <div style={{
            marginTop: '70px',
            backgroundColor: '#FFFBEA',
            borderRadius: '24px',
            border: '1px solid var(--border-light)',
            padding: '30px 40px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div className="brand-features-container">
              {[
                {
                  title: 'GẠO SẠCH - AN TOÀN',
                  desc: 'Quy trình sản xuất khép kín, đảm bảo chất lượng.',
                  icon: LeafStalkIcon,
                  borderColor: '#F0E2C8'
                },
                {
                  title: 'NGUỒN GỐC RÕ RÀNG',
                  desc: 'Vùng nguyên liệu chọn lọc, minh bạch từng hạt gạo.',
                  icon: CurvedStalkIcon,
                  borderColor: '#F0E2C8'
                },
                {
                  title: 'THƠM NGON TỰ NHIÊN',
                  desc: 'Hạt gạo dẻo thơm, ngon trọn vị trong từng bữa cơm.',
                  icon: SteamRiceBowlIcon,
                  borderColor: '#F0E2C8'
                },
                {
                  title: 'VÌ SỨC KHỎE GIA ĐÌNH',
                  desc: 'Không chất bảo quản, an tâm sử dụng mỗi ngày.',
                  icon: ShieldCheckCustomIcon,
                  borderColor: '#F0E2C8'
                }
              ].map((item, idx) => (
                <React.Fragment key={idx}>
                  <div className="brand-features-item">
                    <div style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--bg-card)',
                      border: `2px solid ${item.borderColor}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: '0 0 0 4px #ffffff, 0 4px 12px rgba(0,0,0,0.04)'
                    }}>
                      <item.icon />
                    </div>
                    <div>
                      <h4 style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.88rem',
                        fontWeight: '800',
                        color: 'var(--brand-brown)',
                        marginBottom: '6px',
                        letterSpacing: '0.5px'
                      }}>
                        {item.title}
                      </h4>
                      <p style={{
                        margin: 0,
                        fontSize: '0.82rem',
                        lineHeight: '1.5',
                        color: 'var(--text-secondary)'
                      }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  {idx < 3 && <div className="brand-features-divider" />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. TẦM NHÌN & SỨ MỆNH (EDITORIAL TYPOGRAPHY - NỀN GIẤY #F5F1E8 - BỎ CARD) */}
      <section style={{
        padding: '95px 0',
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={fadeInUp}
            style={{ marginBottom: '50px' }}
          >
            <div className="badge badge-gold" style={{ marginBottom: '12px' }}>
              TẦM NHÌN & SỨ MỆNH
            </div>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 3.2vw, 2.6rem)',
              color: 'var(--primary)',
              fontWeight: '800',
              margin: 0
            }}>
              Định Hướng & Trách Nhiệm Của An Đông
            </h2>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '50px'
          }}>
            {/* 01 TẦM NHÌN */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.25 }}
              variants={fadeInLeft}
              style={{
                paddingBottom: '20px',
                borderBottom: '1px solid rgba(117, 76, 31, 0.3)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '12px' }}>
                <span style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.4rem',
                  fontWeight: '800',
                  color: 'var(--earth-brown)',
                  letterSpacing: '0.5px'
                }}>
                  01
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.4rem',
                  color: 'var(--primary)',
                  margin: 0,
                  fontWeight: '800',
                  letterSpacing: '1px'
                }}>
                  TẦM NHÌN
                </h3>
              </div>
              <p style={{
                fontSize: '1.04rem',
                lineHeight: '1.8',
                color: '#526058',
                margin: 0,
                paddingLeft: '44px'
              }}>
                Trở thành thương hiệu gạo Việt được tin chọn trong mỗi gia đình, góp phần vun đắp những bữa cơm ngon, an lành và gắn kết qua nhiều thế hệ.
              </p>
            </motion.div>

            {/* 02 SỨ MỆNH */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.25 }}
              variants={fadeInRight}
              style={{
                paddingBottom: '20px',
                borderBottom: '1px solid rgba(117, 76, 31, 0.3)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '12px' }}>
                <span style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.4rem',
                  fontWeight: '800',
                  color: 'var(--earth-brown)',
                  letterSpacing: '0.5px'
                }}>
                  02
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.4rem',
                  color: 'var(--primary)',
                  margin: 0,
                  fontWeight: '800',
                  letterSpacing: '1px'
                }}>
                  SỨ MỆNH
                </h3>
              </div>
              <p style={{
                fontSize: '1.04rem',
                lineHeight: '1.8',
                color: '#526058',
                margin: 0,
                paddingLeft: '44px'
              }}>
                Giúp mỗi người chăm lo cho người mình thương bằng những hạt gạo ngon, chất lượng đáng tin và những bữa cơm an lành mỗi ngày.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. TÍNH CÁCH THƯƠNG HIỆU (BRAND MANIFESTO - BỎ EMOJI & BỎ CARD HỘP) */}
      <section style={{
        padding: '95px 0',
        backgroundColor: 'var(--bg-main)'
      }}>
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={fadeInUp}
            style={{ maxWidth: '720px', marginBottom: '55px' }}
          >
            <div className="badge badge-gold" style={{ marginBottom: '12px' }}>
              GIÁ TRỊ CỐT LÕI
            </div>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 3.2vw, 2.6rem)',
              color: 'var(--brand-brown)',
              lineHeight: 1.25,
              fontWeight: '800',
              marginBottom: '12px'
            }}>
              Triết Lý & Giá Trị An Đông
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.04rem', margin: 0 }}>
              Những giá trị nền tảng định hình chất lượng từng hạt gạo và cách An Đông chăm sóc từng bữa cơm.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={staggerContainer}
            className="grid-3"
          >
            {/* 01 CHÂN THÀNH */}
            <motion.div
              variants={fadeInUp}
              style={{
                paddingBottom: '24px',
                borderBottom: '2px solid rgba(117, 76, 31, 0.3)'
              }}
            >
              <div style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.8rem',
                fontWeight: '800',
                color: 'var(--earth-brown)',
                marginBottom: '10px'
              }}>
                01
              </div>
              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.35rem',
                color: 'var(--primary)',
                fontWeight: '800',
                marginBottom: '10px',
                letterSpacing: '1px'
              }}>
                CHÂN THÀNH
              </h3>
              <p style={{ color: '#526058', fontSize: '0.96rem', lineHeight: 1.75, margin: 0 }}>
                Trung thực tuyệt đối trong nguồn nguyên liệu và thông tin sản phẩm gửi đến người tiêu dùng.
              </p>
            </motion.div>

            {/* 02 TINH TẾ */}
            <motion.div
              variants={fadeInUp}
              style={{
                paddingBottom: '24px',
                borderBottom: '2px solid rgba(117, 76, 31, 0.3)'
              }}
            >
              <div style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.8rem',
                fontWeight: '800',
                color: 'var(--earth-brown)',
                marginBottom: '10px'
              }}>
                02
              </div>
              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.35rem',
                color: 'var(--primary)',
                fontWeight: '800',
                marginBottom: '10px',
                letterSpacing: '1px'
              }}>
                TINH TẾ
              </h3>
              <p style={{ color: '#526058', fontSize: '0.96rem', lineHeight: 1.75, margin: 0 }}>
                Chăm chút tỉ mỉ từ quy trình đóng gói, hướng dẫn sử dụng đến hương vị trọn vẹn trong bữa cơm.
              </p>
            </motion.div>

            {/* 03 BỀN BỈ */}
            <motion.div
              variants={fadeInUp}
              style={{
                paddingBottom: '24px',
                borderBottom: '2px solid rgba(117, 76, 31, 0.3)'
              }}
            >
              <div style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.8rem',
                fontWeight: '800',
                color: 'var(--earth-brown)',
                marginBottom: '10px'
              }}>
                03
              </div>
              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.35rem',
                color: 'var(--primary)',
                fontWeight: '800',
                marginBottom: '10px',
                letterSpacing: '1px'
              }}>
                BỀN BỈ
              </h3>
              <p style={{ color: '#526058', fontSize: '0.96rem', lineHeight: 1.75, margin: 0 }}>
                Kiên định với chuẩn mực chất lượng và giá trị bền vững dài lâu cùng khách hàng và đối tác.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4.5. CỐT LÕI THƯƠNG HIỆU & LỜI HỨA (SLIDE 1.2 & 1.4) */}
      <section style={{
        padding: '95px 0',
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-light)',
        borderBottom: '1px solid var(--border-light)'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '60px',
            alignItems: 'center'
          }}>
            {/* Cột trái: Định vị thương hiệu */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.25 }}
              variants={fadeInLeft}
            >
              <div className="badge badge-gold" style={{ marginBottom: '14px' }}>
                CAM KẾT CHẤT LƯỢNG
              </div>
              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 3vw, 2.5rem)',
                color: 'var(--brand-brown)',
                fontWeight: '800',
                marginBottom: '30px'
              }}>
                Cam Kết & Lời Hứa <br />
                Từ An Đông
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '24px'
              }}>
                {[
                  { name: 'CHÂN THẬT', desc: 'Độ tin cậy trong nguồn gốc.' },
                  { name: 'TRÁCH NHIỆM', desc: 'Cam kết chất lượng hạt gạo.' },
                  { name: 'CHU ĐÁO', desc: 'Chăm sóc chu toàn bữa cơm.' },
                  { name: 'BỀN BỈ', desc: 'Đồng hành qua nhiều thế hệ.' }
                ].map((item) => (
                  <div key={item.name} style={{
                    padding: '16px',
                    backgroundColor: 'var(--bg-card)',
                    borderRadius: '16px',
                    border: '1px solid var(--border-light)',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    <div style={{
                      fontWeight: '800',
                      color: 'var(--brand-green-dark)',
                      fontSize: '0.94rem',
                      marginBottom: '4px'
                    }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Cột phải: Lời hứa thương hiệu & Thông điệp Slide 1.4 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.25 }}
              variants={fadeInRight}
              style={{
                backgroundColor: 'var(--bg-card)',
                padding: '40px 32px',
                borderRadius: '24px',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                flexDirection: 'column',
                gap: '30px'
              }}
            >
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  color: 'var(--brand-brown)',
                  marginBottom: '12px'
                }}>
                  LỜI CAM KẾT TỪ AN ĐÔNG
                </h3>
                <p style={{
                  margin: 0,
                  fontSize: '1.02rem',
                  lineHeight: '1.75',
                  color: 'var(--text-primary)',
                  fontWeight: '600',
                  fontStyle: 'italic'
                }}>
                  "An Đông bền bỉ mang đến những hạt gạo thơm ngon, chất lượng đáng tin, để người ăn ngon miệng và người chọn an lòng."
                </p>
              </div>

              <div style={{
                borderTop: '1px solid var(--border-light)',
                paddingTop: '24px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  color: 'var(--text-secondary)',
                  letterSpacing: '2px',
                  marginBottom: '6px'
                }}>
                  THÔNG ĐIỆP GỬI GẮM
                </div>
                <div className="font-accent" style={{
                  fontSize: '2.8rem',
                  color: 'var(--brand-green-dark)',
                  lineHeight: 1.1
                }}>
                  An Đông, gửi trọn an lòng
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. QUY TRÌNH: TỪ CÁNH ĐỒNG ĐẾN BỮA CƠM (DARK GREEN TIMELINE CHUẨN MỰC) */}
      <section style={{
        display: 'none',
        padding: '105px 0 115px',
        backgroundColor: 'var(--bg-dark)',
        position: 'relative',
        color: '#ffffff',
        overflow: 'hidden',
        borderTop: '1px solid var(--border-light)',
        borderBottom: '1px solid var(--border-light)'
      }}>
        {/* Left background outline sketch of terraced fields */}
        <div style={{
          position: 'absolute',
          top: '15%',
          left: '-40px',
          width: '280px',
          height: '380px',
          opacity: 0.08,
          pointerEvents: 'none',
          color: 'var(--brand-green-dark)'
        }}>
          <svg viewBox="0 0 100 200" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M 0,50 C 30,55 70,45 100,60" />
            <path d="M 0,80 C 40,85 80,70 100,95" />
            <path d="M 0,110 C 25,120 75,100 100,125" />
            <path d="M 0,140 C 35,155 60,135 100,160" />
            <path d="M 0,170 C 40,180 80,165 100,195" />
          </svg>
        </div>

        {/* Right background large gold rice stalk hanging (Detailed & Premium) */}
        <div style={{
          position: 'absolute',
          top: '5%',
          right: '-20px',
          width: '280px',
          height: '380px',
          opacity: 0.9,
          pointerEvents: 'none'
        }}>
          <svg viewBox="0 0 120 180" width="100%" height="100%">
            {/* Curved Stem in green/gold */}
            <path d="M 120,20 Q 90,40 70,80 T 30,160" fill="none" stroke="#119C4A" strokeWidth="3" strokeLinecap="round" />
            <path d="M 90,40 Q 60,70 45,120" fill="none" stroke="#39B54A" strokeWidth="2" strokeLinecap="round" />

            {/* Green leaves sweeping up */}
            <path d="M 120,40 Q 80,90 20,130 C 50,110 90,80 120,40 Z" fill="#119C4A" />
            <path d="M 110,65 Q 70,115 10,165 C 40,140 80,110 110,65 Z" fill="#39B54A" />

            {/* Realistic gold grains cascading down */}
            <path d="M 120,20 C 112,18 108,10 114,6 Z" fill="#FDB913" />
            <path d="M 110,32 C 102,34 98,26 104,22 Z" fill="#FDB913" />
            <path d="M 100,44 C 92,46 88,38 94,34 Z" fill="#FDB913" />
            <path d="M 90,56 C 82,58 78,50 84,46 Z" fill="#FDB913" />
            <path d="M 80,68 C 72,70 68,62 74,58 Z" fill="#FDB913" />

            <path d="M 116,14 C 122,19 125,29 122,33 Z" fill="#F99D1B" />
            <path d="M 106,26 C 112,31 115,41 112,45 Z" fill="#F99D1B" />
            <path d="M 96,38 C 102,43 105,53 102,57 Z" fill="#F99D1B" />
            <path d="M 86,50 C 92,55 95,65 92,69 Z" fill="#FDB913" />
            <path d="M 76,62 C 82,67 85,77 82,81 Z" fill="#FDB913" />
          </svg>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={fadeInUp}
            style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 60px' }}
          >
            <div className="badge badge-gold" style={{ marginBottom: '12px', border: '1px solid var(--accent)' }}>
              QUY TRÌNH CHẤT LƯỢNG
            </div>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.2rem, 3.6vw, 3rem)',
              color: '#ffffff',
              marginBottom: '14px',
              fontWeight: '800'
            }}>
              Từ Cánh Đồng <span style={{ color: '#FDB913' }}>Đến Bữa Cơm</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.68)', fontSize: '1.05rem', lineHeight: 1.7, margin: 0 }}>
              Hành trình của hạt gạo An Đông, từ nguồn nguyên liệu đến khi hiện diện trong mỗi bữa cơm gia đình.
            </p>
          </motion.div>

          {/* 5-Step Horizontal Linked Timeline */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={staggerContainer}
            className="quality-timeline-container"
          >
            {[
              { step: '01', title: 'Chọn Giống', desc: 'Lựa chọn nguồn giống thuần chủng, chất lượng tốt nhất.', icon: StepSeedIcon },
              { step: '02', title: 'Canh Tác', desc: 'Chăm sóc theo quy trình tự nhiên, an toàn sinh thái.', icon: StepCultivateIcon },
              { step: '03', title: 'Thu Hoạch', desc: 'Thu hoạch đúng độ chín vàng óng của hạt lúa.', icon: StepHarvestIcon },
              { step: '04', title: 'Sản Xuất', desc: 'Xay xát và làm sạch với quy trình khép kín.', icon: StepProduceIcon },
              { step: '05', title: 'Đóng Gói', desc: 'Bảo quản cẩn thận và dán mã QR minh bạch thông tin.', icon: StepPackageIcon }
            ].map((item) => (
              <motion.div key={item.step} variants={fadeInUp} className="quality-step-card">
                <span className="quality-step-number">{item.step}</span>
                <div className="quality-step-icon"><item.icon /></div>
                <h3 className="quality-step-title">{item.title}</h3>
                <p className="quality-step-description">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Chuyển từ nội dung nền sáng sang khối tối cuối trang */}
      <RiceHorizonDivider idSuffix="-about-2" seed={59} variant="toEarth" />

      <QualityProcessSection />

    </div>
  );
}
