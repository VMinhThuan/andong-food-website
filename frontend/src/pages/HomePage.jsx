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

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [selectedProductQR, setSelectedProductQR] = useState(null);

  useEffect(() => {
    api.getProducts().then(data => {
      setProducts(data);
    }).catch(err => console.error(err));
  }, []);

  // Standardized premium product highlights for An Đông Food
  const featuredProducts = [
    {
      id: 'st25',
      slug: products[0]?.slug || 'gao-st25-thuong-hang',
      name: 'Gạo ST25 An Đông',
      desc: 'Hạt gạo thon dài, mềm dẻo tự nhiên, mang đến hương vị ngọt lành và trọn vẹn cho bữa cơm gia đình.',
      spec: 'ST25 • 5 KG',
      tag: 'Gạo Đặc Sản',
      image: '/assets/product-gao.png'
    },
    {
      id: 'nang-thom',
      slug: products[1]?.slug || 'gao-nang-thom-cho-dao',
      name: 'Gạo Nàng Thơm Chợ Đào',
      desc: 'Hương thơm lài đặc trưng, cơm mềm dẻo và đậm đà, giữ trọn dư vị thơm ngon ngay cả khi để nguội.',
      spec: 'Nàng Thơm • 5 KG',
      tag: 'Gạo Truyền Thống',
      image: '/assets/product-gao.png'
    },
    {
      id: 'huyet-rong',
      slug: products[2]?.slug || 'gao-lut-huyet-rong',
      name: 'Gạo Lứt Huyết Rồng',
      desc: 'Giữ trọn vẹn lớp cám dinh dưỡng tự nhiên, phù hợp cho những bữa ăn thanh lành, dồi dào khoáng chất.',
      spec: 'Huyết Rồng • 5 KG',
      tag: 'Gạo Dinh Dưỡng',
      image: '/assets/product-gao.png'
    }
  ];

  return (
    <div className="home-page" style={{ overflow: 'hidden' }}>
      {/* 1. HERO BANNER SLIDER */}
      <HeroBannerSlider />

      {/* 2. CÂU CHUYỆN THƯƠNG HIỆU AN ĐÔNG (BRAND STORY) */}
      <section style={{ padding: '95px 0', backgroundColor: '#faf9f5' }}>
        <div className="container">
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
              <div className="badge badge-green" style={{ marginBottom: '16px' }}>
                VỀ THƯƠNG HIỆU
              </div>

              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.2rem, 3.6vw, 3rem)',
                color: '#1b4332',
                lineHeight: 1.2,
                marginBottom: '20px',
                fontWeight: '800'
              }}>
                Ý Nghĩa Tên Gọi An Đông
              </h2>

              <p style={{
                fontSize: '1.05rem',
                lineHeight: '1.8',
                color: '#526058',
                marginBottom: '24px'
              }}>
                Tên gọi <strong>An Đông</strong> bắt nguồn từ tâm nguyện gửi trao sự chăm sóc trọn vẹn đến cha mẹ và người mình thương. Chúng tôi bền bỉ chắt chiu từng hạt giống thuần khiết qua những mùa vụ nhọc nhằn, để mang lại sự an lành trong từng bữa cơm gia đình.
              </p>

              {/* 1 Quote duy nhất */}
              <div style={{
                borderLeft: '3px solid #b07d35',
                paddingLeft: '18px',
                marginBottom: '34px'
              }}>
                <div style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.18rem',
                  fontStyle: 'italic',
                  color: '#1b4332',
                  fontWeight: '600',
                  lineHeight: 1.5
                }}>
                  “‘Đông’ là sự bền bỉ – ‘An’ là lời chúc bình an.”
                </div>
              </div>

              <div>
                <Link to="/gioi-thieu" className="btn btn-primary btn-lg">
                  <span>Tìm Hiểu Thêm Về An Đông</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>

            {/* CỘT PHẢI: ẢNH RUỘNG LỚN */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.25 }}
              variants={fadeInRight}
              style={{ position: 'relative' }}
            >
              <div style={{
                borderRadius: '28px',
                overflow: 'hidden',
                boxShadow: '0 20px 45px rgba(27, 67, 50, 0.12)',
                border: '4px solid #ffffff'
              }}>
                <motion.img
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  src="/assets/rice-mekong.jpg"
                  alt="Cánh đồng lúa An Đông Food"
                  style={{ width: '100%', height: '440px', objectFit: 'cover', display: 'block' }}
                  onError={(e) => { e.target.src = '/assets/rice-sunrise.jpg'; }}
                />
              </div>

              {/* 1 Badge duy nhất */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.2, duration: 0.5 }}
                style={{
                  position: 'absolute',
                  bottom: '-16px',
                  left: '24px',
                  backgroundColor: '#ffffff',
                  padding: '14px 24px',
                  borderRadius: '9999px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  border: '1px solid #e4e0d4'
                }}
              >
                <div style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#2d6a4f'
                }} />
                <span style={{ fontWeight: '700', color: '#1b4332', fontSize: '0.94rem', letterSpacing: '0.3px' }}>
                  Gạo ngon chuẩn giống – Gửi trọn an lòng
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. SẢN PHẨM AN ĐÔNG (LUXURY WARM CREAM BACKGROUND WITH WATERMARK & SUNLIGHT GLOW) */}
      <section style={{
        padding: '105px 0 115px',
        background: 'linear-gradient(180deg, #faf8f2 0%, #f4f0e6 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Glow Vàng Ánh Nắng từ góc trên phải */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '550px',
          height: '550px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(233, 196, 106, 0.22) 0%, rgba(244, 240, 230, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        {/* Chữ Outline Typography Cực Lớn Chìm Phía Sau (AN ĐÔNG FOOD) */}
        <div style={{
          position: 'absolute',
          top: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 'clamp(5rem, 13vw, 11rem)',
          fontFamily: 'var(--font-serif)',
          fontWeight: '900',
          color: '#1b4332',
          opacity: 0.035,
          letterSpacing: '10px',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 1
        }}>
          AN ĐÔNG FOOD
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={fadeInUp}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '24px',
              marginBottom: '52px'
            }}
          >
            <div>
              <div className="badge badge-green" style={{ marginBottom: '10px' }}>
                SẢN PHẨM AN ĐÔNG
              </div>
              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.2rem, 3.5vw, 2.9rem)',
                color: '#1b4332',
                margin: '0 0 10px',
                fontWeight: '800'
              }}>
                Gạo Ngon Cho Mỗi Bữa Cơm An Lành
              </h2>
              <p style={{ color: '#526058', fontSize: '1.02rem', maxWidth: '650px', margin: 0, lineHeight: 1.6 }}>
                Từ những hạt gạo được chọn lựa kỹ lưỡng, An Đông mang đến hương vị thơm ngon và sự an tâm trong mỗi bữa cơm gia đình.
              </p>
            </div>

            <Link
              to="/san-pham"
              className="btn btn-outline"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(8px)',
                borderColor: '#d4cebe'
              }}
            >
              <span>Xem Tất Cả Sản Phẩm</span>
              <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            variants={staggerContainer}
            className="grid-3"
          >
            {featuredProducts.map((prod) => (
              <motion.div
                key={prod.id}
                variants={fadeInUp}
                whileHover={{ y: -9, boxShadow: '0 20px 40px rgba(27, 67, 50, 0.1)' }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#ffffff',
                  borderRadius: '26px',
                  overflow: 'hidden',
                  border: '1px solid rgba(228, 224, 212, 0.8)',
                  boxShadow: '0 10px 30px rgba(27, 67, 50, 0.05)',
                  position: 'relative'
                }}
              >
                {/* Visual Packaging Container */}
                <div style={{
                  position: 'relative',
                  height: '275px',
                  backgroundColor: '#f6f3ea',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '26px',
                  borderBottom: '1px solid rgba(228, 224, 212, 0.6)'
                }}>
                  <motion.img
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.4 }}
                    src={prod.image}
                    alt={prod.name}
                    style={{
                      maxHeight: '100%',
                      maxWidth: '85%',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.12))'
                    }}
                    onError={(e) => { e.target.src = '/assets/product-gao.png'; }}
                  />
                  <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
                    <span className="badge badge-gold" style={{ fontSize: '0.74rem', padding: '5px 12px', backgroundColor: '#ffffff', border: '1px solid #e8e3d5' }}>
                      {prod.tag}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div style={{
                  padding: '28px 26px',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  backgroundColor: '#ffffff'
                }}>
                  <div>
                    <h3 style={{
                      fontSize: '1.35rem',
                      fontFamily: 'var(--font-serif)',
                      color: '#1b4332',
                      marginBottom: '10px',
                      fontWeight: '800'
                    }}>
                      <Link to={`/san-pham/${prod.slug}`} style={{ color: '#1b4332', textDecoration: 'none' }}>
                        {prod.name}
                      </Link>
                    </h3>

                    <p style={{
                      color: '#526058',
                      fontSize: '0.94rem',
                      lineHeight: '1.65',
                      marginBottom: '22px'
                    }}>
                      {prod.desc}
                    </p>
                  </div>

                  <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderTop: '1px solid #f0ede4',
                      paddingTop: '16px',
                      marginTop: '4px'
                    }}>
                      <span style={{
                        fontSize: '0.82rem',
                        fontWeight: '700',
                        color: '#859b8f',
                        letterSpacing: '1px',
                        textTransform: 'uppercase'
                      }}>
                        {prod.spec}
                      </span>

                      <Link
                        to={`/san-pham/${prod.slug}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: '#1b4332',
                          fontWeight: '700',
                          fontSize: '0.92rem',
                          textDecoration: 'none',
                          transition: 'gap 0.2s'
                        }}
                      >
                        <span>Khám Phá Sản Phẩm</span>
                        <ArrowRight size={16} color="#b07d35" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. HÀNH TRÌNH TỪ CÁNH ĐỒNG ĐẾN BỮA CƠM (DARK GREEN LUXURY TIMELINE) */}
      <section style={{
        padding: '105px 0 115px',
        background: 'linear-gradient(135deg, #081c15 0%, #102a20 50%, #1b4332 100%)',
        position: 'relative',
        color: '#ffffff',
        overflow: 'hidden'
      }}>
        {/* Subtle Background Rice Field Watermark */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/assets/rice-sunrise.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.12,
          filter: 'grayscale(30%)',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={fadeInUp}
            style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 60px' }}
          >
            <div className="badge badge-gold" style={{ marginBottom: '12px' }}>
              QUY TRÌNH CHẤT LƯỢNG
            </div>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.2rem, 3.6vw, 3rem)',
              color: '#fefae0',
              marginBottom: '14px',
              fontWeight: '800'
            }}>
              Từ Cánh Đồng Đến Bữa Cơm
            </h2>
            <p style={{ color: '#d1e3d9', fontSize: '1.05rem', lineHeight: 1.7, margin: 0 }}>
              Hành trình của hạt gạo An Đông, từ nguồn nguyên liệu đến khi hiện diện trong mỗi bữa cơm gia đình.
            </p>
          </motion.div>

          {/* Horizontal Interactive Timeline */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={staggerContainer}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px',
              position: 'relative'
            }}
          >
            {[
              { step: '01', title: 'Chọn Giống', desc: 'Lựa chọn nguồn giống thuần chủng, chất lượng tốt.' },
              { step: '02', title: 'Canh Tác', desc: 'Chăm sóc theo quy trình tự nhiên, an toàn sinh thái.' },
              { step: '03', title: 'Thu Hoạch', desc: 'Thu hoạch đúng độ chín vàng óng của hạt lúa.' },
              { step: '04', title: 'Sản Xuất', desc: 'Xay xát và làm sạch với quy trình khép kín.' },
              { step: '05', title: 'Đóng Gói', desc: 'Bảo quản cẩn thận và dán mã QR minh bạch thông tin.' }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(233, 196, 106, 0.25)',
                  borderRadius: '22px',
                  padding: '30px 22px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  transition: 'all 0.3s ease'
                }}
              >
                <div>
                  {/* Step Number + Glowing Dot */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <span style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '1.4rem',
                      fontWeight: '800',
                      color: '#e9c46a',
                      letterSpacing: '0.5px'
                    }}>
                      {item.step}
                    </span>
                    <div style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: '#e9c46a',
                      boxShadow: '0 0 10px rgba(233,196,106,0.8)'
                    }} />
                  </div>

                  <h3 style={{
                    fontSize: '1.25rem',
                    color: '#ffffff',
                    marginBottom: '10px',
                    fontWeight: '800',
                    fontFamily: 'var(--font-serif)'
                  }}>
                    {item.title}
                  </h3>

                  <p style={{
                    color: '#cbdcd2',
                    fontSize: '0.9rem',
                    lineHeight: 1.65,
                    margin: 0
                  }}>
                    {item.desc}
                  </p>
                </div>

                <div style={{
                  height: '3px',
                  width: '36px',
                  backgroundColor: '#e9c46a',
                  borderRadius: '9999px',
                  marginTop: '20px',
                  opacity: 0.6
                }} />
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
                boxShadow: '0 20px 45px rgba(27, 67, 50, 0.12)',
                border: '4px solid #faf9f5'
              }}>
                <motion.img
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  src="/assets/rice-grains.jpg"
                  alt="Bông lúa vàng An Đông Food"
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
                color: '#1b4332',
                lineHeight: 1.22,
                marginBottom: '36px',
                fontWeight: '800'
              }}>
                Gìn Giữ Điều Tốt Lành <br />Trong Từng Hạt Gạo
              </h2>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
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
                      borderBottom: idx === 3 ? 'none' : '1px solid #e8e3d5',
                      cursor: 'default'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '22px' }}>
                      <span style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '1.4rem',
                        fontWeight: '800',
                        color: '#b07d35',
                        letterSpacing: '0.5px',
                        lineHeight: 1,
                        minWidth: '38px',
                        opacity: 0.9
                      }}>
                        {val.num}
                      </span>
                      <div>
                        <h3 style={{ fontSize: '1.25rem', color: '#1b4332', margin: '0 0 6px', fontWeight: '800', letterSpacing: '0.5px' }}>
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
        backgroundColor: '#faf8f2',
        borderTop: '1px solid #e8e3d5',
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
                <ScanLine size={15} color="#1b4332" />
                <span>MINH BẠCH TRONG TỪNG SẢN PHẨM</span>
              </div>

              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.2rem, 3.5vw, 2.9rem)',
                color: '#1b4332',
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
                  <span style={{ fontFamily: 'var(--font-sans)', fontWeight: '800', color: '#b07d35', fontSize: '1.1rem', lineHeight: 1.4 }}>
                    01
                  </span>
                  <div>
                    <h4 style={{ margin: '0 0 3px', color: '#1b4332', fontSize: '1.05rem', fontWeight: '700' }}>
                      Thông Tin Sản Phẩm
                    </h4>
                    <p style={{ margin: 0, color: '#526058', fontSize: '0.92rem', lineHeight: 1.55 }}>
                      Tìm hiểu đặc điểm và thông tin chi tiết của từng dòng gạo.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: 'var(--font-sans)', fontWeight: '800', color: '#b07d35', fontSize: '1.1rem', lineHeight: 1.4 }}>
                    02
                  </span>
                  <div>
                    <h4 style={{ margin: '0 0 3px', color: '#1b4332', fontSize: '1.05rem', fontWeight: '700' }}>
                      Hướng Dẫn Sử Dụng
                    </h4>
                    <p style={{ margin: 0, color: '#526058', fontSize: '0.92rem', lineHeight: 1.55 }}>
                      Xem hướng dẫn vo gạo và tỷ lệ nước chuẩn xác để cơm dẻo ngon.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: 'var(--font-sans)', fontWeight: '800', color: '#b07d35', fontSize: '1.1rem', lineHeight: 1.4 }}>
                    03
                  </span>
                  <div>
                    <h4 style={{ margin: '0 0 3px', color: '#1b4332', fontSize: '1.05rem', fontWeight: '700' }}>
                      Nội Dung Chính Thức
                    </h4>
                    <p style={{ margin: 0, color: '#526058', fontSize: '0.92rem', lineHeight: 1.55 }}>
                      Thông tin được cung cấp và bảo chứng trực tiếp bởi An Đông Food.
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
                boxShadow: '0 20px 45px rgba(27, 67, 50, 0.08)',
                border: '1px solid #e8e3d5',
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
                  backgroundColor: '#fbfaf7',
                  padding: '20px 14px',
                  borderRadius: '20px',
                  border: '1px solid #f0ede4',
                  textAlign: 'center'
                }}>
                  <img
                    src="/assets/product-gao.png"
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
                    border: '1px solid #e8e3d5',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    color: '#1b4332'
                  }}>
                    <QrCode size={13} color="#b07d35" />
                    <span>Mã QR Trên Bao Bì</span>
                  </div>
                </div>

                {/* 2. Mockup Màn Hình Điện Thoại Hiển Thị Trang Web Sản Phẩm */}
                <div style={{
                  backgroundColor: '#081c15',
                  borderRadius: '24px',
                  padding: '10px',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
                  border: '3px solid #d4cebe',
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
                    <div style={{ fontSize: '0.65rem', fontWeight: '800', color: '#b07d35', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '2px' }}>
                      AN ĐÔNG FOOD
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#1b4332', marginBottom: '6px' }}>
                      Gạo ST25 An Đông
                    </div>
                    <img
                      src="/assets/product-gao.png"
                      alt="Product on phone"
                      style={{ height: '75px', objectFit: 'contain', marginBottom: '6px' }}
                    />
                    <div style={{ fontSize: '0.7rem', color: '#526058', lineHeight: 1.4, marginBottom: '6px' }}>
                      Đặc điểm: Cơm dẻo thơm, ngọt vị
                    </div>
                    <div style={{
                      backgroundColor: '#1b4332',
                      color: '#fefae0',
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
                  alt="Cánh đồng lúa và người nông dân An Đông Food"
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
                  borderBottom: '1px solid rgba(233, 196, 106, 0.2)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '8px' }}>
                    <span style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '1.3rem',
                      fontWeight: '800',
                      color: '#e9c46a',
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
                    Trở thành thương hiệu gạo Việt được tin chọn trong mỗi gia đình, góp phần vun đắp những bữa cơm an lành qua nhiều thế hệ.
                  </p>
                </div>

                {/* 02 SỨ MỆNH */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '8px' }}>
                    <span style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '1.3rem',
                      fontWeight: '800',
                      color: '#e9c46a',
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
                    Giúp mỗi người chăm lo cho người mình thương bằng những hạt gạo ngon và chất lượng đáng tin.
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
