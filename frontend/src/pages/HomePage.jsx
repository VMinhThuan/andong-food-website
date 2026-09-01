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
import QRCode from 'qrcode';
import QRModal from '../components/common/QRModal';
import { triggerHotlineModal } from '../components/common/HotlineModal';
import SEO from '../components/common/SEO';
import HeroBannerSlider from '../components/home/HeroBannerSlider';
import BrandValueBar from '../components/home/BrandValueBar';
import FlipProductCard from '../components/home/FlipProductCard';
import RiceHorizonDivider from '../components/common/RiceHorizonDivider';
const MatTruocBaoBi = '/assets/brand-element/M%E1%BA%B6T%20TR%C6%AF%E1%BB%9AC%20BAO%20B%C3%8C.png';
const MatSauBaoBi = '/assets/brand-element/M%E1%BA%B6T%20SAU%20BAO%20B%C3%8C.png';
import BannerGao4 from '../assets/brand/banner-gao-4.png';
import GuiGam1 from '../assets/brand/guigam-1.svg';
import AnDongAnLongSvg from '../assets/brand/andong-anlong.svg';

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
        {/* Lớp phủ trước đây tối đều (82-88%) khiến toàn bộ section gần như đen
            tuyền, trùng màu với Footer ngay bên dưới — không phân biệt được ranh
            giới 2 khối. Giữ tối ở phần trên (nơi có chữ, cần tương phản) nhưng
            nhạt + ấm dần về phía đáy, để lộ tông vàng ruộng lúa thật — tạo khác
            biệt rõ với màu xanh-đen lạnh của Footer ngay chỗ tiếp giáp. */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(4,22,10,0.82) 0%, rgba(5,30,14,0.75) 40%, rgba(20,14,4,0.4) 100%)' }} />
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
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [st25QRDataUrl, setSt25QRDataUrl] = useState('');

  useEffect(() => {
    api.getProducts().then(data => {
      setProducts(data);
    }).catch(err => console.error(err));

    // Tạo mã QR thật cho sản phẩm ST25
    const qrTargetUrl = `${window.location.origin}/san-pham/gao-st25`;
    QRCode.toDataURL(qrTargetUrl, {
      width: 320,
      margin: 1,
      color: {
        dark: '#0A3B1F',
        light: '#ffffff'
      }
    }).then(setSt25QRDataUrl).catch(console.error);
  }, []);

  // Sắp xếp đảm bảo Gạo ST25 luôn đứng trước (bên trái), Gạo Vuông Tôm đứng sau (bên phải)
  const sortedRaw = [...products].sort((a, b) => {
    const isASt25 = a.slug?.includes('st25') || a.code?.includes('ST25') || a.name?.includes('ST25');
    const isBSt25 = b.slug?.includes('st25') || b.code?.includes('ST25') || b.name?.includes('ST25');
    if (isASt25 && !isBSt25) return -1;
    if (!isASt25 && isBSt25) return 1;
    return 0;
  });

  // Cards are derived solely from the product documents returned by the API.
  const featuredProducts = sortedRaw.slice(0, 2).map((product) => ({
    ...product,
    desc: product.summary,
    spec: product.code,
    tag: product.content?.number,
    subtitle: product.slug?.includes('st25') ? 'Gạo đặc sản thuần chủng' : 'Gạo sạch luân canh lúa - tôm',
    highlightTitle: product.slug?.includes('st25') ? 'Gạo ST25 • Thơm dẻo đậm vị' : 'Gạo Vuông Tôm • Ngọt lành tự nhiên',
    origin: product.content?.information?.find(([label]) => label === 'XUẤT XỨ / ORIGIN')?.[1],
    image: product.images?.front || product.images?.main || '/assets/brand-element/MẶT TRƯỚC BAO BÌ.png',
    imageBack: product.images?.back || '/assets/brand-element/MẶT SAU BAO BÌ.png'
  }));

  return (
    <div className="home-page" style={{ overflow: 'hidden' }}>
      <SEO
        title="Trang Chủ – Gạo Ngon Chuẩn Giống, Gửi Trọn An Lòng"
        description="An Đông Food – Thương hiệu gạo sạch chuẩn giống Việt Nam. Cung cấp Gạo ST25 chuẩn thế giới và Gạo sinh thái Vuông Tôm thơm dẻo đậm vị, minh bạch nguồn gốc."
      />
      {/* 1. HERO BANNER SLIDER (Banner SVG thuần 100% không bị che) */}
      <HeroBannerSlider />

      {/* 2. THANH 3 GIÁ TRỊ AN ĐÔNG */}
      <BrandValueBar />

      {/* 2. CÂU CHUYỆN THƯƠNG HIỆU AN ĐÔNG (BRAND STORY - Bố cục chuẩn Ảnh 1) */}
      <section style={{
        padding: '65px 0 50px',
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-light)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '1300px', margin: '0 auto', padding: '0 20px' }}>
          
          {/* Header Căn Giữa: Tiêu Đề & Lời Gửi Gắm (Chuẩn Ảnh 1) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={fadeInUp}
            style={{ textAlign: 'center', marginBottom: '36px' }}
          >
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.1rem, 4vw, 2.9rem)',
              fontWeight: '800',
              color: 'var(--brand-brown)',
              textTransform: 'uppercase',
              letterSpacing: '0.6px',
              lineHeight: 1.28,
              margin: '0 0 16px'
            }}>
              GỬI GẮM BÌNH AN<br />
              TRONG TỪNG BỮA CƠM VIỆT
            </h2>

            <p style={{
              margin: '0 auto',
              fontSize: 'clamp(1rem, 1.5vw, 1.16rem)',
              lineHeight: 1.65,
              color: 'var(--brand-brown)',
              maxWidth: '820px',
              fontWeight: '500'
            }}>
              Bình an không chỉ là lời chúc dành cho người mình thương — mà còn hiện diện trong từng bữa cơm được chăm chút mỗi ngày
            </p>
          </motion.div>

          {/* 1 Ảnh Toàn Cảnh Gửi Gắm Bình An (guigam-1.svg) Full Width Chiều Dài */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeInUp}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            style={{
              width: '100%',
              marginBottom: '38px',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
              border: '1.5px solid rgba(200, 223, 210, 0.7)',
              backgroundColor: '#ffffff'
            }}
          >
            <img
              src={GuiGam1}
              alt="Gửi gắm bình an trong từng bữa cơm Việt - An Đông Food"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'cover'
              }}
            />
          </motion.div>

          {/* Nút Tìm Hiểu Thêm Màu Xanh Lá Căn Giữa (Chuẩn Ảnh 1) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={fadeInUp}
            style={{ textAlign: 'center' }}
          >
            <Link
              to="/gioi-thieu"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: '#119C4A',
                backgroundImage: 'linear-gradient(135deg, #119C4A 0%, #0A5C2C 100%)',
                color: '#ffffff',
                fontSize: '1.05rem',
                fontWeight: '700',
                padding: '14px 38px',
                borderRadius: '9999px',
                textDecoration: 'none',
                boxShadow: '0 6px 20px rgba(17, 156, 74, 0.32)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 10px 28px rgba(17, 156, 74, 0.42)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(17, 156, 74, 0.32)';
              }}
            >
              <span>Tìm hiểu thêm</span>
              <ArrowRight size={18} />
            </Link>
          </motion.div>

          {/* Dải card ngang gồm 4 giá trị thương hiệu ở chân section - Cùng 1 hàng */}
          <div style={{
            marginTop: '36px',
            backgroundColor: '#FFFBEA',
            borderRadius: '24px',
            border: '1px solid var(--border-light)',
            padding: '24px 28px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div className="brand-features-grid">
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
                <div
                  key={idx}
                  className="brand-features-card"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    paddingRight: idx < 3 ? '14px' : '0',
                    borderRight: idx < 3 ? '1px solid var(--border-medium)' : 'none'
                  }}
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--bg-card)',
                    border: `2px solid ${item.borderColor}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 0 0 3px #ffffff, 0 4px 10px rgba(0,0,0,0.04)'
                  }}>
                    <item.icon />
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <h4 style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.84rem',
                      fontWeight: '800',
                      color: 'var(--brand-brown)',
                      marginBottom: '3px',
                      letterSpacing: '0.2px',
                      whiteSpace: 'nowrap'
                    }}>
                      {item.title}
                    </h4>
                    <p style={{
                      margin: 0,
                      fontSize: '0.78rem',
                      lineHeight: '1.4',
                      color: 'var(--text-secondary)'
                    }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. SẢN PHẨM AN ĐÔNG - GẠO NGON CHUẨN GIÁ (Phong cách Vinamilk 3D Flip - Ảnh 2 & 3) */}
      <section style={{
        padding: '40px 0 60px',
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-light)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
          
          {/* Heading lớn ở giữa: GẠO NGON - CHUẨN GIÁ (Có khoảng cách đẹp mắt với sản phẩm) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={fadeInUp}
            style={{ textAlign: 'center', marginBottom: '40px' }}
          >
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.9rem, 3.5vw, 2.55rem)',
              color: 'var(--brand-brown)',
              margin: 0,
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '0.8px'
            }}>
              GẠO NGON - CHUẨN GIÁ
            </h2>
          </motion.div>

          {/* 2 Sản Phẩm Đứng Cạnh Nhau + Card Thông Tin Nằm Trực Tiếp Dưới Từng ẢNH (Ảnh 2 & 3) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={staggerContainer}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              gap: 'clamp(30px, 6vw, 80px)',
              flexWrap: 'wrap'
            }}
          >
            {featuredProducts.map((prod) => (
              <motion.div key={prod.id} variants={fadeInUp}>
                <FlipProductCard
                  product={prod}
                  isSelected={selectedProductId === prod.id}
                  onSelect={(p) => setSelectedProductId(selectedProductId === p.id ? null : p.id)}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Nút Tìm Hiểu Thêm Màu Xanh Lá Căn Giữa (Chuẩn Ảnh Yêu Cầu) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={fadeInUp}
            style={{ textAlign: 'center', marginTop: '35px' }}
          >
            <Link
              to="/san-pham"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: '#119C4A',
                backgroundImage: 'linear-gradient(135deg, #119C4A 0%, #0A5C2C 100%)',
                color: '#ffffff',
                fontSize: '1.05rem',
                fontWeight: '700',
                padding: '14px 38px',
                borderRadius: '9999px',
                textDecoration: 'none',
                boxShadow: '0 6px 20px rgba(17, 156, 74, 0.32)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 10px 28px rgba(17, 156, 74, 0.42)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(17, 156, 74, 0.32)';
              }}
            >
              <span>Tìm hiểu thêm</span>
              <ArrowRight size={18} />
            </Link>
          </motion.div>

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
      <section style={{ padding: '100px 0', backgroundColor: 'var(--bg-secondary)' }}>
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
                to="/quet-ma-qr"
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
                backgroundColor: 'var(--bg-card)',
                borderRadius: '30px',
                padding: '36px 30px',
                boxShadow: '0 20px 45px rgba(17, 156, 74, 0.08)',
                border: '1px solid var(--border-color)',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '24px',
                alignItems: 'center'
              }}>
                {/* 1. Mã QR Thật Trên Bao Bì (Bên Trái) */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: 'var(--bg-main)',
                  padding: '24px 16px',
                  borderRadius: '20px',
                  border: '1px solid var(--border-color)',
                  textAlign: 'center',
                  minHeight: '280px',
                  justifyContent: 'center'
                }}>
                  {/* Khung chứa mã QR Thật ST25 */}
                  <div style={{
                    padding: '12px',
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                    border: '1.5px solid #e8f0ec',
                    marginBottom: '14px'
                  }}>
                    {st25QRDataUrl ? (
                      <img
                        src={st25QRDataUrl}
                        alt="Mã QR Gạo ST25"
                        style={{ width: '135px', height: '135px', display: 'block' }}
                      />
                    ) : (
                      <div style={{ width: '135px', height: '135px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <QrCode size={54} color="var(--primary)" />
                      </div>
                    )}
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: 'var(--bg-card)',
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.82rem',
                    fontWeight: '700',
                    color: 'var(--primary)'
                  }}>
                    <QrCode size={15} color="var(--earth-brown)" />
                    <span>Mã QR Trên Bao Bì</span>
                  </div>
                </div>

                {/* 2. Mockup Smartphone Hiển Thị Chi Tiết Sản Phẩm ST25 Sau Khi Quét (Bên Phải) */}
                <div style={{
                  backgroundColor: 'var(--bg-dark)',
                  borderRadius: '24px',
                  padding: '10px',
                  boxShadow: '0 16px 36px rgba(0,0,0,0.18)',
                  border: '3px solid var(--border-color)',
                  position: 'relative'
                }}>
                  <div style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    padding: '16px 14px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '0.68rem', fontWeight: '800', color: 'var(--earth-brown)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '2px' }}>
                      AN ĐÔNG
                    </div>
                    <div style={{ fontSize: '0.92rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '8px' }}>
                      Gạo ST25 An Đông
                    </div>

                    {/* HÌNH ẢNH BAO GẠO ST25 HIỂN THỊ TRÊN MÀN HÌNH ĐIỆN THOẠI */}
                    <div style={{
                      height: '135px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '8px'
                    }}>
                      <img
                        src={MatTruocBaoBi}
                        alt="Bao bì Gạo ST25 An Đông"
                        style={{ height: '100%', maxWidth: '110px', objectFit: 'contain', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.15))' }}
                      />
                    </div>

                    <div style={{ fontSize: '0.72rem', color: '#526058', lineHeight: 1.4, marginBottom: '10px', fontWeight: '500' }}>
                      Đặc điểm: Cơm dẻo thơm, ngọt vị
                    </div>

                    <Link
                      to="/san-pham/gao-st25"
                      style={{
                        backgroundColor: 'var(--primary)',
                        backgroundImage: 'linear-gradient(135deg, #119C4A 0%, #0A5C2C 100%)',
                        color: '#ffffff',
                        fontSize: '0.74rem',
                        fontWeight: '700',
                        padding: '7px 14px',
                        borderRadius: '9999px',
                        width: '100%',
                        textAlign: 'center',
                        textDecoration: 'none',
                        boxShadow: '0 4px 12px rgba(17, 156, 74, 0.25)',
                        display: 'block',
                        boxSizing: 'border-box'
                      }}
                    >
                      Xem Chi Tiết & Hướng Dẫn
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. LỜI CAM KẾT CỦA CHÚNG TÔI - AN ĐÔNG GỬI TRỌN AN LÒNG (Chuẩn Ảnh 1 & 2) */}
      <section style={{
        padding: '95px 20px 105px',
        backgroundColor: '#0A4D27',
        backgroundImage: 'radial-gradient(circle at 50% 35%, #0E5C30 0%, #07381B 100%)',
        color: '#ffffff',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle Ambient Light Glow */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '380px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 174, 25, 0.09) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '880px', margin: '0 auto' }}>


          {/* Logo / Typography Slogan Nghệ Thuật: AN ĐÔNG gửi trọn AN LÒNG (andong-anlong.svg) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={fadeInUp}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '12px auto 26px',
              userSelect: 'none',
              maxWidth: 'clamp(320px, 48vw, 560px)',
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
                filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.35))'
              }}
            />
          </motion.div>

          {/* Lời cam kết chân thành */}
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={fadeInUp}
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.18rem)',
              lineHeight: 1.7,
              color: 'rgba(255, 255, 255, 0.92)',
              maxWidth: '720px',
              margin: '0 auto 38px',
              fontWeight: '500'
            }}
          >
            "An Đông bền bỉ mang đến những hạt gạo thơm ngon, chất lượng đáng tin, để người ăn ngon miệng và người chọn an lòng."
          </motion.p>

          {/* 2 Nút Hành Động Màu Xanh Lá Cạnh Nhau (Chuẩn Ảnh 1 & 2) */}
          <motion.div
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
            {/* Nút 1: Gọi đặt hàng - Điều hướng trực tiếp sang trang Liên hệ */}
            <Link
              to="/lien-he"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#119C4A',
                backgroundImage: 'linear-gradient(135deg, #13A850 0%, #0D833D 100%)',
                color: '#ffffff',
                fontSize: '1.02rem',
                fontWeight: '700',
                padding: '13px 32px',
                borderRadius: '9999px',
                textDecoration: 'none',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 10px 28px rgba(17, 156, 74, 0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.25)';
              }}
            >
              <span>Gọi đặt hàng</span>
              <ArrowRight size={18} />
            </Link>

            {/* Nút 2: Khám phá sản phẩm */}
            <Link
              to="/san-pham"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#119C4A',
                backgroundImage: 'linear-gradient(135deg, #13A850 0%, #0D833D 100%)',
                color: '#ffffff',
                fontSize: '1.02rem',
                fontWeight: '700',
                padding: '13px 32px',
                borderRadius: '9999px',
                textDecoration: 'none',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 10px 28px rgba(17, 156, 74, 0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.25)';
              }}
            >
              <span>Khám phá sản phẩm</span>
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Chuyển từ nội dung nền sáng sang khối tối cuối trang */}
      <RiceHorizonDivider idSuffix="-home-2" seed={47} variant="toEarth" />

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
