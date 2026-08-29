import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  QrCode,
  ArrowRight,
  ShieldCheck,
  Award,
  Sun,
  Wheat,
  Heart,
  CheckCircle2,
  PhoneCall,
  Compass,
  ScanLine,
  Smartphone,
  Sprout,
  Package,
  Layers,
  Sparkles
} from 'lucide-react';
import { api } from '../services/api';
import QRModal from '../components/common/QRModal';
import HeroBannerSlider from '../components/home/HeroBannerSlider';
import MatTruocBaoBi from '../assets/brand-element/MẶT TRƯỚC BAO BÌ.png';
import MatSauBaoBi from '../assets/brand-element/MẶT SAU BAO BÌ.png';
import BannerGao4 from '../assets/brand/banner-gao-4.png';

// Animation variants that trigger smoothly both when scrolling up and down
const fadeInUp = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] }
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
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

export function QualityProcessSection() {
  return (
    <section style={{ padding: '100px 0 110px', position: 'relative', color: '#ffffff', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img src="/assets/rice-sunrise.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(4,22,10,0.82) 0%, rgba(5,30,14,0.75) 50%, rgba(4,22,10,0.88) 100%)' }} />
      </div>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.25 }} variants={fadeInUp} style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 60px' }}>
          <div style={{ marginBottom: '12px', display: 'inline-block' }}>
            <span style={{ border: '1px solid rgba(253,185,19,0.6)', borderRadius: '9999px', padding: '4px 16px', fontSize: '0.72rem', fontWeight: '800', letterSpacing: '1.5px', color: '#FDB913', textTransform: 'uppercase' }}>QUY TRÌNH CHẤT LƯỢNG</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 3.6vw, 3rem)', color: '#ffffff', marginBottom: '14px', fontWeight: '800' }}>Từ Cánh Đồng <span style={{ color: '#FDB913' }}>Đến Bữa Cơm</span></h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.02rem', lineHeight: 1.7, margin: 0 }}>Hành trình của hạt gạo An Đông, từ nguồn nguyên liệu đến khi hiện diện trong mỗi bữa cơm gia đình.</p>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={staggerContainer} className="quality-timeline-container">
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
  );
}

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [selectedProductQR, setSelectedProductQR] = useState(null);

  useEffect(() => {
    api.getProducts().then(data => {
      setProducts(data);
    }).catch(err => console.error(err));
  }, []);

  // Chỉ 2 sản phẩm thực tế của An Đông
  const featuredProducts = [
    {
      id: 'st25',
      slug: products[0]?.slug || 'gao-st25-an-dong-thuong-hang',
      name: 'Gạo ST25 An Đông',
      desc: 'Hạt thon dài, thơm tự nhiên, cơm dẻo mềm và vị ngọt thanh — giống gạo Việt từng được vinh danh "Gạo ngon nhất thế giới" năm 2023 tại Cebu, Philippines.',
      spec: 'ST25 • 5 KG',
      tag: 'Gạo Đặc Sản',
      origin: 'Việt Nam',
      declaration: '01/ANDONG-ST25/2026',
      image: MatTruocBaoBi,
      imageBack: MatSauBaoBi
    },
    {
      id: 'vuong-tom',
      slug: products[1]?.slug || 'gao-vuong-tom-an-dong',
      name: 'Gạo Vuông Tôm An Đông',
      desc: 'Trồng theo mô hình luân canh lúa – tôm thuận tự nhiên miền Tây. Hạt gạo thơm dịu, cơm dẻo mềm và vị ngọt thanh đặc trưng từ sự hài hòa giữa đất, nước và mùa vụ.',
      spec: 'VUÔNG TÔM • 5 KG',
      tag: 'Gạo Đặc Sản',
      origin: 'Cà Mau, Việt Nam',
      declaration: '01/ANDONG-VT/2026',
      image: MatTruocBaoBi,
      imageBack: MatSauBaoBi
    }
  ];

  return (
    <div className="home-page" style={{ overflow: 'hidden' }}>
      {/* 1. HERO BANNER SLIDER */}
      <HeroBannerSlider />

      {/* 2. CÂU CHUYỆN THƯƠNG HIỆU AN ĐÔNG (BRAND STORY) */}
      <section style={{
        padding: '95px 0',
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-light)',
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
          opacity: 0.05,
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
          opacity: 0.05,
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '65px',
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
                      backgroundColor: '#ffffff',
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

      {/* 3. SẢN PHẨM AN ĐÔNG - 2-COLUMN PREMIUM LAYOUT */}
      <section style={{
        padding: '90px 0 100px',
        backgroundColor: '#FFFEF7',
        borderBottom: '1px solid var(--border-light)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '30% 1fr',
            gap: '40px',
            alignItems: 'stretch'
          }}>

            {/* ===== CỘT TRÁI: INTRO TEXT + ẢNH CỦA ĐỒNG SỐNG ĐỘNG ===== */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.25 }}
              variants={fadeInLeft}
              style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', minHeight: '520px', borderRadius: '20px', overflow: 'hidden', gridRow: '1 / -1' }}
            >
              {/* Ảnh banner-gao-4 chiếm toàn bộ */}
              <img
                src={BannerGao4}
                alt="Cánh đồng lúa An Đông"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center center',
                  zIndex: 0
                }}
              />
              {/* Gradient nhẹ phía dưới để chữ dễ đọc */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.0) 35%, rgba(0,40,15,0.55) 100%)',
                zIndex: 1
              }} />

              {/* Nội dung chữ nổi trên ảnh, nằm phía trên ảnh */}
              <div style={{ position: 'relative', zIndex: 2, padding: '36px 32px' }}>
                <div style={{
                  display: 'inline-block',
                  backgroundColor: 'rgba(255,255,255,0.88)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '9999px',
                  padding: '5px 14px',
                  marginBottom: '16px',
                  fontSize: '0.74rem',
                  fontWeight: '800',
                  letterSpacing: '1px',
                  color: 'var(--primary)',
                  textTransform: 'uppercase'
                }}>
                  SẢN PHẨM AN ĐÔNG
                </div>

                <h2 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.9rem, 3vw, 2.6rem)',
                  color: '#ffffff',
                  margin: '0 0 16px',
                  fontWeight: '800',
                  lineHeight: 1.2,
                  textShadow: '0 2px 12px rgba(0,0,0,0.3)'
                }}>
                  Gạo Ngon Cho Mỗi Bữa Cơm An Lành
                </h2>

                <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: '0.96rem', lineHeight: 1.7, marginBottom: '28px', textShadow: '0 1px 6px rgba(0,0,0,0.2)' }}>
                  Từ những hạt gạo được chọn lựa kỹ lưỡng, An Đông mang đến hương vị thơm ngon và sự an tâm trong mỗi bữa cơm gia đình.
                </p>

                <Link
                  to="/san-pham"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 24px',
                    border: '1.5px solid rgba(255,255,255,0.85)',
                    borderRadius: '9999px',
                    color: '#ffffff',
                    fontWeight: '700',
                    fontSize: '0.94rem',
                    textDecoration: 'none',
                    backgroundColor: 'rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(6px)',
                    transition: 'all 0.25s ease'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.25)'; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)'; }}
                >
                  <span>Xem Tất Cả Sản Phẩm</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>


            {/* ===== CỘT PHẢI: 2 PRODUCT CARDS ===== */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {/* 2 Product Cards side by side */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.15 }}
                variants={staggerContainer}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', flex: 1 }}
              >
                {featuredProducts.map((prod) => (
                  <motion.div
                    key={prod.id}
                    variants={fadeInUp}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      backgroundColor: '#ffffff',
                      borderRadius: '24px',
                      overflow: 'hidden',
                      border: '1px solid rgba(200, 223, 210, 0.7)',
                      boxShadow: '0 4px 18px rgba(17, 67, 40, 0.06)',
                      position: 'relative',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                    }}
                    whileHover={{ y: -6, boxShadow: '0 20px 44px rgba(17, 67, 40, 0.13)' }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Image area với hover flip sang mặt sau + icon xem */}
                    <div
                      className="product-image-wrapper"
                      style={{
                        position: 'relative',
                        height: '390px',
                        backgroundColor: '#F4F1E8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '18px 24px',
                        overflow: 'hidden'
                      }}
                    >
                      {/* Mặt trước */}
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="product-img-front"
                        style={{
                          maxHeight: '82%',
                          maxWidth: '78%',
                          objectFit: 'contain',
                          filter: 'drop-shadow(0 10px 22px rgba(0,0,0,0.13))',
                          transition: 'opacity 0.35s ease, transform 0.35s ease',
                          position: 'absolute'
                        }}
                        onError={(e) => { e.target.src = '/assets/product-gao.png'; }}
                      />
                      {/* Mặt sau - hiện khi hover */}
                      <img
                        src={prod.imageBack}
                        alt={`${prod.name} mặt sau`}
                        className="product-img-back"
                        style={{
                          maxHeight: '82%',
                          maxWidth: '78%',
                          objectFit: 'contain',
                          filter: 'drop-shadow(0 10px 22px rgba(0,0,0,0.13))',
                          transition: 'opacity 0.35s ease, transform 0.35s ease',
                          position: 'absolute',
                          opacity: 0
                        }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />

                      {/* Badge category - dịch xuống dưới, không che ảnh */}
                      <div style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '12px',
                        backgroundColor: '#FDB913',
                        color: '#ffffff',
                        fontSize: '0.6rem',
                        fontWeight: '900',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        letterSpacing: '0.8px',
                        textTransform: 'uppercase',
                        zIndex: 2
                      }}>
                        {prod.tag}
                      </div>

                      {/* Nút xem chi tiết - vòng tròn vàng ở giữa khi hover */}
                      <div
                        className="product-view-btn"
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%) scale(0.7)',
                          opacity: 0,
                          transition: 'opacity 0.3s ease, transform 0.3s ease',
                          display: 'flex',
                          alignItems: 'center',
                          zIndex: 3,
                          pointerEvents: 'none'
                        }}
                      >
                        <Link
                          to={`/san-pham/${prod.slug}`}
                          state={{
                            product: products.find((item) => item.slug === prod.slug) || {
                              ...prod,
                              summary: prod.desc,
                              origin: { location: prod.origin },
                              packSizes: ['5 kg']
                            }
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            textDecoration: 'none',
                            pointerEvents: 'auto'
                          }}
                        >
                          {/* Vòng tròn vàng + eye icon */}
                          <div style={{
                            width: '52px', height: '52px', borderRadius: '50%',
                            backgroundColor: '#FDB913',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 4px 20px rgba(253,185,19,0.5)',
                            flexShrink: 0
                          }}>
                            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Content */}
                    <div style={{ padding: '20px 22px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <h3 style={{
                          fontSize: '1.15rem',
                          fontFamily: 'var(--font-serif)',
                          color: 'var(--primary)',
                          marginBottom: '8px',
                          fontWeight: '700'
                        }}>
                          <Link to={`/san-pham/${prod.slug}`} style={{ color: 'var(--primary)', textDecoration: 'none' }}>
                            {prod.name}
                          </Link>
                        </h3>
                        <p style={{
                          color: '#526058',
                          fontSize: '0.88rem',
                          lineHeight: '1.65',
                          marginBottom: '14px'
                        }}>
                          {prod.desc}
                        </p>
                        <div style={{ fontSize: '0.78rem', color: '#8aad9c', marginBottom: '4px' }}>
                          <span style={{ fontWeight: '600' }}>Xuất xứ:</span> {prod.origin}
                        </div>
                      </div>

                      <div style={{
                        borderTop: '1px solid #eaf0ec',
                        paddingTop: '14px',
                        marginTop: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}>
                        <span style={{
                          fontSize: '0.72rem',
                          fontWeight: '800',
                          color: '#aac5b8',
                          letterSpacing: '1px',
                          textTransform: 'uppercase'
                        }}>
                          {prod.spec}
                        </span>
                        <Link
                          to={`/san-pham/${prod.slug}`}
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: '5px',
                            color: 'var(--primary)', fontWeight: '700',
                            fontSize: '0.84rem', textDecoration: 'none'
                          }}
                        >
                          <span>Khám Phá</span>
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HÀNH TRÌNH TỪ CÁNH ĐỒNG ĐẾN BỮA CƠM - DARK BACKGROUND */}
      <section style={{
        padding: '100px 0 110px',
        position: 'relative',
        color: '#ffffff',
        overflow: 'hidden'
      }}>
        {/* Background ảnh ruộng lúa tối */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0
        }}>
          <img
            src="/assets/rice-sunrise.jpg"
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(4,22,10,0.82) 0%, rgba(5,30,14,0.75) 50%, rgba(4,22,10,0.88) 100%)'
          }} />
        </div>


        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={fadeInUp}
            style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 60px' }}
          >
            <div style={{ marginBottom: '12px', display: 'inline-block' }}>
              <span style={{
                border: '1px solid rgba(253,185,19,0.6)',
                borderRadius: '9999px',
                padding: '4px 16px',
                fontSize: '0.72rem',
                fontWeight: '800',
                letterSpacing: '1.5px',
                color: '#FDB913',
                textTransform: 'uppercase'
              }}>QUY TRÌNH CHẤT LƯỢNG</span>
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
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.02rem', lineHeight: 1.7, margin: 0 }}>
              Hành trình của hạt gạo An Đông, từ nguồn nguyên liệu đến khi hiện diện trong mỗi bữa cơm gia đình.
            </p>
          </motion.div>

          {/* Quy trình 5 bước */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
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

      {/* 5. GIÁ TRỊ AN ĐÔNG (EDITORIAL 40/60) */}
      <section style={{ padding: '100px 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '65px',
            alignItems: 'center'
          }}>
            {/* CỘT TRÁI 40% */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.25 }}
              variants={fadeInLeft}
              style={{ position: 'relative' }}
            >
              <div style={{
                borderRadius: '28px',
                overflow: 'hidden',
                boxShadow: '0 20px 45px rgba(17, 156, 74, 0.12)',
                border: '4px solid var(--bg-main)'
              }}>
                <motion.img
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  src="/assets/rice-grains.jpg"
                  alt="Bông lúa vàng An Đông"
                  style={{ width: '100%', height: '520px', objectFit: 'cover', display: 'block' }}
                  onError={(e) => { e.target.src = '/assets/rice-sunrise.jpg'; }}
                />
              </div>

              <div style={{
                position: 'absolute',
                top: '24px',
                left: '24px',
                backgroundColor: 'rgba(8, 28, 21, 0.8)',
                backdropFilter: 'blur(10px)',
                padding: '8px 18px',
                borderRadius: '9999px',
                color: '#fefae0',
                fontSize: '0.8rem',
                fontWeight: '600',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                border: '1px solid rgba(233, 196, 106, 0.3)'
              }}>
                Tinh Hoa Đất Trời
              </div>
            </motion.div>

            {/* CỘT PHẢI 60%: 01 - 04 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.25 }}
              variants={fadeInRight}
            >
              <div className="badge badge-gold" style={{ marginBottom: '14px' }}>
                GIÁ TRỊ AN ĐÔNG
              </div>

              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.1rem, 3.4vw, 2.8rem)',
                color: 'var(--primary)',
                lineHeight: 1.22,
                marginBottom: '36px',
                fontWeight: '800'
              }}>
                Gìn Giữ Điều Tốt Lành <br />Trong Từng Hạt Gạo
              </h2>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2, }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.14, delayChildren: 0.08 }
                  }
                }}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                {[
                  { num: '01', title: 'CHÂN THẬT', desc: 'Từ hạt gạo thuần nông đến những điều chân thành chúng tôi gửi trao.' },
                  { num: '02', title: 'CHU ĐÁO', desc: 'Chăm chút cho từng bữa cơm ngọt lành của gia đình bạn.' },
                  { num: '03', title: 'TRÁCH NHIỆM', desc: 'Chất lượng đáng tin cậy trong từng mẻ gạo xuất xưởng mỗi ngày.' },
                  { num: '04', title: 'BỀN BỈ', desc: 'Đồng hành cùng bữa cơm ngon của người Việt qua nhiều thế hệ.' }
                ].map((val, idx) => (
                  <motion.div
                    key={val.num}
                    variants={{
                      hidden: { opacity: 0, x: 30, y: 10 },
                      visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                    }}
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      padding: '22px 0',
                      borderBottom: idx === 3 ? 'none' : '1px solid var(--border-color)',
                      cursor: 'default'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '22px' }}>
                      <span style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '1.4rem',
                        fontWeight: '800',
                        color: 'var(--earth-brown)',
                        letterSpacing: '0.5px',
                        lineHeight: 1,
                        minWidth: '38px',
                        opacity: 0.9
                      }}>
                        {val.num}
                      </span>
                      <div>
                        <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)', margin: '0 0 6px', fontWeight: '800', letterSpacing: '0.5px' }}>
                          {val.title}
                        </h3>
                        <p style={{ color: '#526058', fontSize: '0.96rem', margin: 0, lineHeight: 1.6 }}>
                          {val.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. QUÉT MÃ QR – MINH BẠCH THÔNG TIN (SMARTPHONE + BAO BÌ FLOW MOCKUP) */}
      <section style={{
        padding: '105px 0',
        backgroundColor: 'var(--bg-main)',
        borderTop: '1px solid var(--border-color)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '65px',
            alignItems: 'center'
          }}>
            {/* Trái: Thông điệp & 3 Lợi ích (01, 02, 03) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.25 }}
              variants={fadeInLeft}
            >
              <div className="badge badge-green" style={{ marginBottom: '14px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <ScanLine size={15} color="var(--primary)" />
                <span>MINH BẠCH TRONG TỪNG SẢN PHẨM</span>
              </div>

              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.2rem, 3.5vw, 2.9rem)',
                color: 'var(--primary)',
                lineHeight: 1.2,
                marginBottom: '18px',
                fontWeight: '800'
              }}>
                Quét QR – Hiểu Hơn Về Sản Phẩm
              </h2>

              <p style={{
                fontSize: '1.05rem',
                lineHeight: '1.75',
                color: '#526058',
                marginBottom: '32px'
              }}>
                Quét mã QR trên bao bì để truy cập nhanh thông tin sản phẩm An Đông ngay trên điện thoại.
              </p>

              {/* 3 Lợi ích rõ ràng */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '36px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: 'var(--font-sans)', fontWeight: '800', color: 'var(--earth-brown)', fontSize: '1.1rem', lineHeight: 1.4 }}>
                    01
                  </span>
                  <div>
                    <h4 style={{ margin: '0 0 3px', color: 'var(--primary)', fontSize: '1.05rem', fontWeight: '700' }}>
                      Thông Tin Sản Phẩm
                    </h4>
                    <p style={{ margin: 0, color: '#526058', fontSize: '0.92rem', lineHeight: 1.55 }}>
                      Tìm hiểu đặc điểm và thông tin chi tiết của từng dòng gạo.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: 'var(--font-sans)', fontWeight: '800', color: 'var(--earth-brown)', fontSize: '1.1rem', lineHeight: 1.4 }}>
                    02
                  </span>
                  <div>
                    <h4 style={{ margin: '0 0 3px', color: 'var(--primary)', fontSize: '1.05rem', fontWeight: '700' }}>
                      Hướng Dẫn Sử Dụng
                    </h4>
                    <p style={{ margin: 0, color: '#526058', fontSize: '0.92rem', lineHeight: 1.55 }}>
                      Xem hướng dẫn vo gạo và tỷ lệ nước chuẩn xác để cơm dẻo ngon.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: 'var(--font-sans)', fontWeight: '800', color: 'var(--earth-brown)', fontSize: '1.1rem', lineHeight: 1.4 }}>
                    03
                  </span>
                  <div>
                    <h4 style={{ margin: '0 0 3px', color: 'var(--primary)', fontSize: '1.05rem', fontWeight: '700' }}>
                      Nội Dung Chính Thức
                    </h4>
                    <p style={{ margin: 0, color: '#526058', fontSize: '0.92rem', lineHeight: 1.55 }}>
                      Thông tin được cung cấp và bảo chứng trực tiếp bởi An Đông.
                    </p>
                  </div>
                </div>
              </div>

              <Link
                to="/san-pham"
                className="btn btn-primary btn-lg"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}
              >
                <span>Trải Nghiệm Quét QR</span>
                <ArrowRight size={18} />
              </Link>
            </motion.div>

            {/* Phải: Visual Mockup Smartphone + Bao Gạo + QR Line Flow */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.25 }}
              variants={fadeInRight}
              style={{ position: 'relative' }}
            >
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '30px',
                padding: '36px 30px',
                boxShadow: '0 20px 45px rgba(17, 156, 74, 0.08)',
                border: '1px solid var(--border-color)',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '24px',
                alignItems: 'center'
              }}>
                {/* 1. Bao Gạo Thực Tế */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: 'var(--bg-main)',
                  padding: '20px 14px',
                  borderRadius: '20px',
                  border: '1px solid var(--border-color)',
                  textAlign: 'center'
                }}>
                  <img
                    src={MatTruocBaoBi}
                    alt="Bao bì Gạo An Đông"
                    style={{ height: '170px', objectFit: 'contain', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.12))' }}
                  />
                  <div style={{
                    marginTop: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: '#ffffff',
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    color: 'var(--primary)'
                  }}>
                    <QrCode size={13} color="var(--earth-brown)" />
                    <span>Mã QR Trên Bao Bì</span>
                  </div>
                </div>

                {/* 2. Mockup Màn Hình Điện Thoại Hiển Thị Trang Web Sản Phẩm */}
                <div style={{
                  backgroundColor: 'var(--bg-dark)',
                  borderRadius: '24px',
                  padding: '10px',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
                  border: '3px solid var(--border-color)',
                  position: 'relative'
                }}>
                  {/* Phone Screen */}
                  <div style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    padding: '14px 12px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--earth-brown)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '2px' }}>
                      An Đông
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '6px' }}>
                      Gạo ST25 An Đông
                    </div>
                    <img
                      src={MatTruocBaoBi}
                      alt="Product on phone"
                      style={{ height: '75px', objectFit: 'contain', marginBottom: '6px' }}
                    />
                    <div style={{ fontSize: '0.7rem', color: '#526058', lineHeight: 1.4, marginBottom: '6px' }}>
                      Đặc điểm: Cơm dẻo thơm, ngọt vị
                    </div>
                    <div style={{
                      backgroundColor: 'var(--primary)',
                      color: 'var(--golden-pale)',
                      fontSize: '0.68rem',
                      fontWeight: '700',
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      width: '100%'
                    }}>
                      Xem Chi Tiết & Hướng Dẫn
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. TẦM NHÌN & SỨ MỆNH (REFINED SPLIT EDITORIAL 46/54 LAYOUT) */}
      <section style={{
        padding: '80px 0 85px',
        background: 'linear-gradient(135deg, #081c15 0%, #0d281e 50%, #16382a 100%)',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle Ambient Glow */}
        <div style={{
          position: 'absolute',
          top: '15%',
          right: '5%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(233, 196, 106, 0.1) 0%, transparent 65%)',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '50px',
            alignItems: 'center'
          }}>
            {/* CỘT TRÁI 46%: ẢNH CÁNH ĐỒNG LÚA MEKONG CÂN XỨNG (CROP 4:5 VỪA VẶN) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.25 }}
              variants={fadeInLeft}
            >
              <div style={{
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                border: '3px solid rgba(255, 255, 255, 0.12)'
              }}>
                <motion.img
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  src="/assets/rice-mekong.jpg"
                  alt="Cánh đồng lúa và người nông dân An Đông"
                  style={{ width: '100%', height: '410px', objectFit: 'cover', display: 'block' }}
                  onError={(e) => { e.target.src = '/assets/rice-sunrise.jpg'; }}
                />
              </div>
            </motion.div>

            {/* CỘT PHẢI 54%: HEADING CÂN ĐỐI 3 DÒNG + 01 TẦM NHÌN / 02 SỨ MỆNH */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.25 }}
              variants={fadeInRight}
            >
              <div className="badge badge-gold" style={{ marginBottom: '14px' }}>
                TẦM NHÌN & SỨ MỆNH
              </div>

              {/* Heading cân đối đúng 3 dòng, giảm 25% font-size */}
              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)',
                color: '#fefae0',
                lineHeight: 1.25,
                marginBottom: '32px',
                fontWeight: '800'
              }}>
                Cho Những Bữa Cơm Ngon, <br />
                An Lành Và Gắn Kết <br />
                Qua Nhiều Thế Hệ
              </h2>

              {/* Editorial Value List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
                {/* 01 TẦM NHÌN */}
                <div style={{
                  paddingBottom: '24px',
                  borderBottom: '1px solid rgba(253, 185, 19, 0.2)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '8px' }}>
                    <span style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '1.3rem',
                      fontWeight: '800',
                      color: 'var(--golden-light)',
                      letterSpacing: '0.5px',
                      minWidth: '32px'
                    }}>
                      01
                    </span>
                    <h3 style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.3rem',
                      color: '#ffffff',
                      margin: 0,
                      fontWeight: '800',
                      letterSpacing: '1px'
                    }}>
                      TẦM NHÌN
                    </h3>
                  </div>
                  <p style={{
                    fontSize: '0.96rem',
                    lineHeight: '1.7',
                    color: '#d1e3d9',
                    margin: 0,
                    paddingLeft: '48px'
                  }}>
                    Trở thành thương hiệu gạo Việt được tin chọn trong mỗi gia đình, góp phần vun đắp những bữa cơm ngon, an lành và gắn kết qua nhiều thế hệ.
                  </p>
                </div>

                {/* 02 SỨ MỆNH */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '8px' }}>
                    <span style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '1.3rem',
                      fontWeight: '800',
                      color: 'var(--golden-light)',
                      letterSpacing: '0.5px',
                      minWidth: '32px'
                    }}>
                      02
                    </span>
                    <h3 style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.3rem',
                      color: '#ffffff',
                      margin: 0,
                      fontWeight: '800',
                      letterSpacing: '1px'
                    }}>
                      SỨ MỆNH
                    </h3>
                  </div>
                  <p style={{
                    fontSize: '0.96rem',
                    lineHeight: '1.7',
                    color: '#d1e3d9',
                    margin: 0,
                    paddingLeft: '48px'
                  }}>
                    Giúp mỗi người chăm lo cho người mình thương bằng những hạt gạo ngon, chất lượng đáng tin và những bữa cơm an lành mỗi ngày.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modal preview QR */}
      {selectedProductQR && (
        <QRModal
          product={selectedProductQR}
          onClose={() => setSelectedProductQR(null)}
        />
      )}
    </div>
  );
}
