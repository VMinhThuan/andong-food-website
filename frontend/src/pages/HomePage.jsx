import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
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
import { triggerHotlineModal } from '../components/common/HotlineModal';
import SEO from '../components/common/SEO';
import HeroBannerSlider from '../components/home/HeroBannerSlider';
import BrandValueBar from '../components/home/BrandValueBar';
import FlipProductCard from '../components/home/FlipProductCard';
const MatTruocBaoBi = '/assets/brand-element/mat-truoc-bao-bi.webp';
const MatSauBaoBi = '/assets/brand-element/mat-sau-bao-bi.webp';
import GuiGam1 from '../assets/optimized/guigam-1.webp';
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
        <img src="/assets/rice-sunrise.webp" alt="" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }} />
        {/* Lớp phủ trước đây tối đều (82-88%) khiến toàn bộ section gần như đen
            tuyền, trùng màu với Footer ngay bên dưới — không phân biệt được ranh
            giới 2 khối. Giữ tối ở phần trên (nơi có chữ, cần tương phản) nhưng
            nhạt + ấm dần về phía đáy, để lộ tông vàng ruộng lúa thật — tạo khác
            biệt rõ với màu xanh-đen lạnh của Footer ngay chỗ tiếp giáp. */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(4,22,10,0.82) 0%, rgba(5,30,14,0.75) 40%, rgba(20,14,4,0.4) 100%)' }} />
      </div>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <m.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.25 }} variants={fadeInUp} style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 60px' }}>
          <div style={{ marginBottom: '12px', display: 'inline-block' }}>
            <span style={{ border: '1px solid rgba(253,185,19,0.6)', borderRadius: '9999px', padding: '4px 16px', fontSize: '0.72rem', fontWeight: '800', letterSpacing: '1.5px', color: '#FDB913', textTransform: 'uppercase' }}>QUY TRÌNH CHẤT LƯỢNG</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 3.6vw, 3rem)', color: '#ffffff', marginBottom: '14px', fontWeight: '800' }}>Từ Cánh Đồng <span style={{ color: '#FDB913' }}>Đến Bữa Cơm</span></h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.02rem', lineHeight: 1.7, margin: 0 }}>Hành trình của hạt gạo An Đông, từ nguồn nguyên liệu đến khi hiện diện trong mỗi bữa cơm gia đình.</p>
        </m.div>
        <m.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={staggerContainer} className="quality-timeline-container">
          {[
            { step: '01', title: 'Chọn Giống', desc: 'Lựa chọn nguồn giống thuần chủng, chất lượng tốt nhất.', icon: StepSeedIcon },
            { step: '02', title: 'Canh Tác', desc: 'Chăm sóc theo quy trình tự nhiên, an toàn sinh thái.', icon: StepCultivateIcon },
            { step: '03', title: 'Thu Hoạch', desc: 'Thu hoạch đúng độ chín vàng óng của hạt lúa.', icon: StepHarvestIcon },
            { step: '04', title: 'Sản Xuất', desc: 'Xay xát và làm sạch với quy trình khép kín.', icon: StepProduceIcon },
            { step: '05', title: 'Đóng Gói', desc: 'Bảo quản cẩn thận và dán mã QR minh bạch thông tin.', icon: StepPackageIcon }
          ].map((item) => (
            <m.div key={item.step} variants={fadeInUp} className="quality-step-card">
              <span className="quality-step-number">{item.step}</span>
              <div className="quality-step-icon"><item.icon /></div>
              <h3 className="quality-step-title">{item.title}</h3>
              <p className="quality-step-description">{item.desc}</p>
            </m.div>
          ))}
        </m.div>
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

    // Tạo mã QR thật cho sản phẩm ST25 — nạp thư viện qrcode động để không
    // kéo ~16KB gzip vào bundle chính (chỉ cần khi trang chủ đã render xong).
    const qrTargetUrl = `${window.location.origin}/san-pham/gao-st25`;
    import('qrcode').then(({ default: QRCode }) =>
      QRCode.toDataURL(qrTargetUrl, {
        width: 320,
        margin: 1,
        color: {
          dark: '#0A3B1F',
          light: '#ffffff'
        }
      }).then(setSt25QRDataUrl)
    ).catch(console.error);
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
    image: product.images?.front || product.images?.main || MatTruocBaoBi,
    imageBack: product.images?.back || MatSauBaoBi
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
          <m.div
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
          </m.div>

          {/* 1 Ảnh Toàn Cảnh Gửi Gắm Bình An (guigam-1.svg) Full Width Chiều Dài */}
          <m.div
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
              width={1920}
              height={793}
              loading="lazy"
              decoding="async"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'cover'
              }}
            />
          </m.div>

          {/* Nút Tìm Hiểu Thêm Màu Xanh Lá Căn Giữa (Chuẩn Ảnh 1) */}
          <m.div
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
          </m.div>
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
          <m.div
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
          </m.div>

          {/* 2 Sản Phẩm Đứng Cạnh Nhau + Card Thông Tin Nằm Trực Tiếp Dưới Từng ẢNH (Ảnh 2 & 3) */}
          <m.div
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
              <m.div key={prod.id} variants={fadeInUp}>
                <FlipProductCard
                  product={prod}
                  isSelected={selectedProductId === prod.id}
                  onSelect={(p) => setSelectedProductId(selectedProductId === p.id ? null : p.id)}
                />
              </m.div>
            ))}
          </m.div>

          {/* Nút Tìm Hiểu Thêm Màu Xanh Lá Căn Giữa (Chuẩn Ảnh Yêu Cầu) */}
          <m.div
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
          </m.div>

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
            src="/assets/rice-sunrise.webp"
            alt=""
            loading="lazy"
            decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(4,22,10,0.82) 0%, rgba(5,30,14,0.75) 50%, rgba(4,22,10,0.88) 100%)'
          }} />
        </div>


        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <m.div
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
          </m.div>

          {/* Quy trình 5 bước */}
          <m.div
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
              <m.div key={item.step} variants={fadeInUp} className="quality-step-card">
                <span className="quality-step-number">{item.step}</span>
                <div className="quality-step-icon"><item.icon /></div>
                <h3 className="quality-step-title">{item.title}</h3>
                <p className="quality-step-description">{item.desc}</p>
              </m.div>
            ))}
          </m.div>
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
            <m.div
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
            </m.div>

            {/* Phải: Visual Mockup Smartphone + Bao Gạo + QR Line Flow */}
            <m.div
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
                        loading="lazy"
                        decoding="async"
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
            </m.div>
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
              margin: '12px auto 26px',
              userSelect: 'none',
              maxWidth: 'clamp(320px, 48vw, 560px)',
              width: '100%'
            }}
          >
            <img
              src={AnDongAnLongSvg}
              alt="An Đông gửi trọn An Lòng"
              loading="lazy"
              decoding="async"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.35))'
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
              lineHeight: 1.7,
              color: 'rgba(255, 255, 255, 0.92)',
              maxWidth: '720px',
              margin: '0 auto 38px',
              fontWeight: '500'
            }}
          >
            "An Đông bền bỉ mang đến những hạt gạo thơm ngon, chất lượng đáng tin, để người ăn ngon miệng và người chọn an lòng."
          </m.p>

          {/* 2 Nút Hành Động Màu Xanh Lá Cạnh Nhau (Chuẩn Ảnh 1 & 2) */}
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
          </m.div>
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
