import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QrCode, ArrowRight } from 'lucide-react';
import { api } from '../services/api';
import HeroBannerSlider from '../components/home/HeroBannerSlider';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -35 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 35 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.08 } }
};

export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.getProducts()
      .then(data => setProducts(Array.isArray(data) ? data : []))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="home-page" style={{ overflow: 'hidden' }}>
      {/* 1. HERO */}
      <HeroBannerSlider />

      {/* 2. SẢN PHẨM AN ĐÔNG */}
      <section style={{ padding: '95px 0 105px', backgroundColor: '#faf8f2' }}>
        <div className="container">
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
              marginBottom: '48px'
            }}
          >
            <div>
              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.1rem, 3.4vw, 2.8rem)',
                color: '#1b4332',
                margin: '0 0 12px',
                fontWeight: '800'
              }}>
                Sản Phẩm An Đông
              </h2>
              <p style={{ color: '#526058', fontSize: '1.02rem', maxWidth: '540px', margin: 0, lineHeight: 1.65 }}>
                Những hạt gạo được chọn kỹ từ vùng đất Cà Mau, cho bữa cơm thơm ngon mỗi ngày.
              </p>
            </div>

            <Link to="/san-pham" className="btn btn-outline">
              <span>Xem Tất Cả Sản Phẩm</span>
              <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            variants={staggerContainer}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px'
            }}
          >
            {products.map((prod) => (
              <motion.div
                key={prod.id}
                variants={fadeInUp}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(27, 67, 50, 0.1)' }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#ffffff',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  border: '1px solid #e8e3d5',
                  boxShadow: '0 10px 30px rgba(27, 67, 50, 0.05)'
                }}
              >
                <div style={{
                  height: '280px',
                  backgroundColor: '#f6f3ea',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '26px',
                  borderBottom: '1px solid #eeeae0'
                }}>
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    src={prod.images?.main || '/assets/product-gao.png'}
                    alt={prod.name}
                    style={{ maxHeight: '100%', maxWidth: '85%', objectFit: 'contain' }}
                    onError={(e) => { e.target.src = '/assets/product-gao.png'; }}
                  />
                </div>

                <div style={{ padding: '28px 26px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{
                    fontSize: '1.35rem',
                    fontFamily: 'var(--font-serif)',
                    marginBottom: '10px',
                    fontWeight: '800'
                  }}>
                    <Link to={`/san-pham/${prod.slug}`} style={{ color: '#1b4332', textDecoration: 'none' }}>
                      {prod.name}
                    </Link>
                  </h3>

                  <p style={{ color: '#526058', fontSize: '0.94rem', lineHeight: 1.65, marginBottom: '22px', flex: 1 }}>
                    {prod.shortDesc || prod.summary}
                  </p>

                  <Link
                    to={`/san-pham/${prod.slug}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: '#1b4332',
                      fontWeight: '700',
                      fontSize: '0.92rem',
                      textDecoration: 'none'
                    }}
                  >
                    <span>Xem Chi Tiết</span>
                    <ArrowRight size={16} color="#b07d35" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. QUÉT MÃ QR */}
      <section style={{ padding: '95px 0', backgroundColor: '#ffffff', borderTop: '1px solid #e8e3d5' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '60px',
            alignItems: 'center'
          }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.25 }}
              variants={fadeInLeft}
            >
              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.1rem, 3.4vw, 2.8rem)',
                color: '#1b4332',
                lineHeight: 1.22,
                marginBottom: '18px',
                fontWeight: '800'
              }}>
                Quét QR Trên Bao Bì
              </h2>

              <p style={{ fontSize: '1.05rem', lineHeight: 1.75, color: '#526058', marginBottom: '32px' }}>
                Mỗi sản phẩm An Đông có một mã QR riêng in trên bao bì. Quét bằng camera điện thoại
                để xem ngay thông tin sản phẩm, hướng dẫn nấu và thành phần dinh dưỡng.
              </p>

              <Link to="/san-pham" className="btn btn-primary btn-lg">
                <span>Xem Sản Phẩm</span>
                <ArrowRight size={18} />
              </Link>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.25 }}
              variants={fadeInRight}
            >
              <div style={{
                backgroundColor: '#faf8f2',
                borderRadius: '28px',
                padding: '36px 30px',
                border: '1px solid #e8e3d5',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '24px',
                alignItems: 'center'
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: '#ffffff',
                  padding: '20px 14px',
                  borderRadius: '20px',
                  border: '1px solid #eeeae0',
                  textAlign: 'center'
                }}>
                  <img
                    src="/assets/product-gao.png"
                    alt="Bao bì gạo An Đông"
                    style={{ height: '170px', objectFit: 'contain' }}
                  />
                  <div style={{
                    marginTop: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    color: '#1b4332'
                  }}>
                    <QrCode size={13} color="#b07d35" />
                    <span>Mã QR trên bao bì</span>
                  </div>
                </div>

                <div style={{
                  backgroundColor: '#081c15',
                  borderRadius: '24px',
                  padding: '10px',
                  border: '3px solid #d4cebe'
                }}>
                  <div style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    padding: '14px 12px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#1b4332', marginBottom: '8px' }}>
                      Gạo ST25
                    </div>
                    <img
                      src="/assets/product-gao.png"
                      alt="Trang sản phẩm trên điện thoại"
                      style={{ height: '75px', objectFit: 'contain', marginBottom: '8px' }}
                    />
                    <div style={{
                      backgroundColor: '#1b4332',
                      color: '#fefae0',
                      fontSize: '0.68rem',
                      fontWeight: '700',
                      padding: '5px 10px',
                      borderRadius: '9999px',
                      width: '100%'
                    }}>
                      Thông tin sản phẩm
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. CÂU CHUYỆN AN ĐÔNG */}
      <section style={{ padding: '95px 0', backgroundColor: '#faf9f5' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '60px',
            alignItems: 'center'
          }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.25 }}
              variants={fadeInLeft}
            >
              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.1rem, 3.4vw, 2.8rem)',
                color: '#1b4332',
                lineHeight: 1.22,
                marginBottom: '20px',
                fontWeight: '800'
              }}>
                An Đông, Gửi Trọn An Lòng
              </h2>

              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#526058', marginBottom: '24px' }}>
                <strong>An</strong> là mong muốn trao gửi an lành đến mọi người.
                <strong> Đông</strong> là tinh thần bền bỉ trước thử thách, luôn hướng về những điều tươi sáng.
                An Đông giúp mỗi người gửi gắm sự quan tâm đến gia đình qua từng bữa cơm —
                để dù gần hay xa, người ăn ngon miệng, người chọn cũng an lòng.
              </p>

              <Link to="/gioi-thieu" className="btn btn-primary btn-lg">
                <span>Tìm Hiểu Về An Đông</span>
                <ArrowRight size={18} />
              </Link>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.25 }}
              variants={fadeInRight}
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
                  alt="Cánh đồng lúa"
                  style={{ width: '100%', height: '440px', objectFit: 'cover', display: 'block' }}
                  onError={(e) => { e.target.src = '/assets/rice-sunrise.jpg'; }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
