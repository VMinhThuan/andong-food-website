import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, ArrowRight, Check, Eye, X, Sparkles, Scale } from 'lucide-react';
import { api } from '../services/api';
import QRModal from '../components/common/QRModal';

const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
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

export default function ProductsPage() {
  const [products, setProducts] = useState([
    {
      id: 'prod-st25',
      name: 'Gạo ST25 An Đông Thượng Hạng',
      slug: 'gao-st25-an-dong-thuong-hang',
      code: 'AD-ST25-01',
      category: 'thom-deo',
      categoryName: 'Gạo Thơm Thượng Hạng',
      flavor: 'Thơm lá dứa • Dẻo mềm • Hậu vị ngọt',
      aroma: 5,
      stickiness: 5,
      softness: 4,
      suitable: 'Bữa cơm gia đình hàng ngày, dịp lễ tiệc',
      packSizes: ['2kg', '5kg', '10kg'],
      image: '/assets/product-gao.png'
    },
    {
      id: 'prod-nang-thom',
      name: 'Gạo Nàng Thơm Chợ Đào An Đông',
      slug: 'gao-nang-thom-cho-dao',
      code: 'AD-NTCD-02',
      category: 'dac-san',
      categoryName: 'Gạo Đặc Sản Vùng Miền',
      flavor: 'Thơm lài tự nhiên • Xốp mềm • Đậm đà',
      aroma: 5,
      stickiness: 4,
      softness: 4,
      suitable: 'Bữa cơm gia đình truyền thống, cơm niêu',
      packSizes: ['5kg', '10kg'],
      image: '/assets/product-gao.png'
    },
    {
      id: 'prod-huyet-rong',
      name: 'Gạo Lứt Huyết Rồng Dinh Dưỡng',
      slug: 'gao-lut-huyet-rong',
      code: 'AD-LHR-03',
      category: 'dinh-duong',
      categoryName: 'Gạo Dinh Dưỡng & Thực Dưỡng',
      flavor: 'Vị bùi béo tự nhiên • Giàu chất xơ & khoáng',
      aroma: 3,
      stickiness: 2,
      softness: 3,
      suitable: 'Chế độ ăn eat-clean, thực dưỡng, người tiểu đường',
      packSizes: ['1kg', '2kg', '5kg'],
      image: '/assets/product-gao.png'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [selectedQRProduct, setSelectedQRProduct] = useState(null);

  useEffect(() => {
    api.getProducts().then(prodData => {
      if (Array.isArray(prodData) && prodData.length > 0) {
        // Merge with rich sensory attributes if backend has fewer fields
        const merged = prodData.map((p, idx) => ({
          ...p,
          category: p.category || (idx === 0 ? 'thom-deo' : idx === 1 ? 'dac-san' : 'dinh-duong'),
          flavor: p.flavor || (idx === 0 ? 'Thơm lá dứa • Dẻo mềm • Hậu vị ngọt' : idx === 1 ? 'Thơm lài tự nhiên • Xốp mềm • Đậm đà' : 'Vị bùi béo tự nhiên • Giàu chất xơ & khoáng'),
          aroma: p.aroma || (idx === 0 ? 5 : idx === 1 ? 5 : 3),
          stickiness: p.stickiness || (idx === 0 ? 5 : idx === 1 ? 4 : 2),
          softness: p.softness || (idx === 0 ? 4 : idx === 1 ? 4 : 3),
          suitable: p.suitable || (idx === 0 ? 'Bữa cơm gia đình hàng ngày' : idx === 1 ? 'Bữa cơm truyền thống đặc sản' : 'Ăn thực dưỡng, giàu khoáng chất'),
          image: p.images?.main || '/assets/product-gao.png'
        }));
        setProducts(merged);
      }
    }).catch(err => console.warn(err));
  }, []);

  const categories = [
    { id: 'all', name: 'Tất Cả Sản Phẩm' },
    { id: 'thom-deo', name: 'Gạo Thơm Dẻo' },
    { id: 'dac-san', name: 'Gạo Đặc Sản' },
    { id: 'dinh-duong', name: 'Gạo Dinh Dưỡng' }
  ];

  const filteredProducts = products.filter(p => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory || p.categoryId === selectedCategory;
  });

  const renderRatingStars = (count) => {
    return (
      <div style={{ display: 'flex', gap: '4px' }}>
        {[1, 2, 3, 4, 5].map(star => (
          <div
            key={star}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: star <= count ? '#b07d35' : '#dcd8ce'
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="products-page" style={{ backgroundColor: '#faf8f2', color: '#1b4332' }}>
      
      {/* 1. PRODUCT DISCOVERY HERO (SPLIT LAYOUT) */}
      <section style={{
        background: 'linear-gradient(135deg, #081c15 0%, #0d281e 50%, #16382a 100%)',
        color: '#ffffff',
        padding: '75px 0 85px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Glow */}
        <div style={{
          position: 'absolute',
          top: '15%',
          right: '8%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(233, 196, 106, 0.14) 0%, transparent 65%)',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '50px',
            alignItems: 'center'
          }}>
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="badge badge-gold" style={{ marginBottom: '14px' }}>
                SẢN PHẨM AN ĐÔNG
              </div>
              <h1 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.1rem, 3.5vw, 2.9rem)',
                color: '#fefae0',
                lineHeight: 1.22,
                marginBottom: '18px',
                fontWeight: '800',
                letterSpacing: '0.5px'
              }}>
                Chọn Hạt Gạo Phù Hợp <br />
                Với Từng Bữa Cơm
              </h1>
              <p style={{
                fontSize: '1.05rem',
                lineHeight: '1.75',
                color: '#d1e3d9',
                maxWidth: '500px',
                margin: 0
              }}>
                Từ gạo thơm dẻo dùng hằng ngày đến những dòng gạo đặc sản và dinh dưỡng tuyển chọn kỹ lưỡng từ nguồn giống thuần khiết.
              </p>
            </motion.div>

            {/* Right Visual Layer */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '420px',
                height: '320px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  position: 'absolute',
                  width: '260px',
                  height: '260px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(233, 196, 106, 0.08)',
                  filter: 'blur(20px)'
                }} />
                <motion.img
                  whileHover={{ y: -8, scale: 1.04 }}
                  transition={{ duration: 0.4 }}
                  src="/assets/product-gao.png"
                  alt="Bộ sưu tập gạo An Đông"
                  style={{
                    maxHeight: '290px',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.4))'
                  }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. SẢN PHẨM NỔI BẬT: GẠO ST25 AN ĐÔNG THƯỢNG HẠNG */}
      <section style={{
        padding: '75px 0 65px',
        backgroundColor: '#faf8f2',
        borderBottom: '1px solid #eae5d8'
      }}>
        <div className="container">
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '26px',
            padding: '45px clamp(24px, 4vw, 55px)',
            border: '1px solid #e7e0d2',
            boxShadow: '0 10px 35px rgba(27, 67, 50, 0.06)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '45px',
            alignItems: 'center'
          }}>
            {/* Left: Product Image */}
            <div style={{
              backgroundColor: '#f6f4ee',
              borderRadius: '20px',
              padding: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '300px'
            }}>
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
                src="/assets/product-gao.png"
                alt="Gạo ST25 An Đông Thượng Hạng"
                style={{
                  maxHeight: '260px',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.12))'
                }}
              />
            </div>

            {/* Right: Detailed Showcase Info */}
            <div>
              <div className="badge badge-gold" style={{ marginBottom: '12px' }}>
                DÒNG GẠO TIÊU BIỂU
              </div>
              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.8rem, 2.6vw, 2.3rem)',
                color: '#1b4332',
                marginBottom: '12px',
                fontWeight: '800'
              }}>
                Gạo ST25 An Đông Thượng Hạng
              </h2>
              <p style={{
                fontSize: '1rem',
                lineHeight: 1.7,
                color: '#526058',
                marginBottom: '20px'
              }}>
                100% giống lúa thuần ST25 đạt giải nhất thế giới. Hạt gạo thon dài trong trẻo, khi nấu chín tỏa hương thơm lá dứa dịu nhẹ, cơm mềm dẻo đậm vị ngay cả khi để nguội.
              </p>

              {/* Sensory Highlights */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px',
                marginBottom: '28px'
              }}>
                <div style={{ backgroundColor: '#faf8f2', padding: '12px 14px', borderRadius: '12px', border: '1px solid #eae5d8' }}>
                  <div style={{ fontSize: '0.78rem', color: '#859b8f', fontWeight: '600' }}>HƯƠNG THƠM</div>
                  <div style={{ fontSize: '0.92rem', fontWeight: '800', color: '#1b4332', marginTop: '2px' }}>Lá Dứa</div>
                </div>
                <div style={{ backgroundColor: '#faf8f2', padding: '12px 14px', borderRadius: '12px', border: '1px solid #eae5d8' }}>
                  <div style={{ fontSize: '0.78rem', color: '#859b8f', fontWeight: '600' }}>ĐỘ DẺO</div>
                  <div style={{ fontSize: '0.92rem', fontWeight: '800', color: '#1b4332', marginTop: '2px' }}>Dẻo Mềm</div>
                </div>
                <div style={{ backgroundColor: '#faf8f2', padding: '12px 14px', borderRadius: '12px', border: '1px solid #eae5d8' }}>
                  <div style={{ fontSize: '0.78rem', color: '#859b8f', fontWeight: '600' }}>QUY CÁCH</div>
                  <div style={{ fontSize: '0.92rem', fontWeight: '800', color: '#1b4332', marginTop: '2px' }}>2kg, 5kg</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
                <Link
                  to="/san-pham/gao-st25-an-dong-thuong-hang"
                  className="btn btn-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <span>Khám Phá ST25</span>
                  <ArrowRight size={17} />
                </Link>
                <button
                  onClick={() => setSelectedQRProduct(products[0])}
                  className="btn btn-outline"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <QrCode size={16} />
                  <span>Quét QR Tra Cứu</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. KHÁM PHÁ CÁC DÒNG GẠO (MINIMAL FILTER + EDITORIAL PRODUCT CARDS) */}
      <section style={{ padding: '75px 0 85px' }}>
        <div className="container">
          {/* Header & Filter Chips */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            marginBottom: '40px'
          }}>
            <div>
              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.8rem, 2.5vw, 2.2rem)',
                color: '#1b4332',
                fontWeight: '800',
                margin: 0
              }}>
                Danh Mục Các Dòng Gạo
              </h2>
              <div style={{ fontSize: '0.9rem', color: '#859b8f', marginTop: '4px' }}>
                Hiển thị {filteredProducts.length} dòng gạo chất lượng
              </div>
            </div>

            {/* Filter Chips Minimal (Không dùng ô toolbar to tướng) */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '9999px',
                    border: selectedCategory === cat.id ? '1px solid #1b4332' : '1px solid #ded9cc',
                    backgroundColor: selectedCategory === cat.id ? '#1b4332' : '#ffffff',
                    color: selectedCategory === cat.id ? '#ffffff' : '#526058',
                    fontWeight: selectedCategory === cat.id ? '700' : '600',
                    fontSize: '0.86rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            variants={staggerContainer}
            className="grid-3"
          >
            {filteredProducts.map(product => (
              <motion.div
                key={product.id || product.slug}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '24px',
                  border: '1px solid #e7e0d2',
                  overflow: 'hidden',
                  boxShadow: '0 8px 25px rgba(27, 67, 50, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease'
                }}
              >
                {/* Header Card: Category Badge & QR Icon */}
                <div style={{
                  padding: '20px 24px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px'
                }}>
                  <span className="badge badge-gold" style={{ fontSize: '0.72rem' }}>
                    {product.categoryName || 'Gạo An Đông'}
                  </span>

                  <button
                    onClick={() => setSelectedQRProduct(product)}
                    style={{
                      background: 'rgba(27, 67, 50, 0.05)',
                      border: '1px solid rgba(27, 67, 50, 0.12)',
                      borderRadius: '9999px',
                      padding: '5px 10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      color: '#1b4332',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    title="Quét mã QR tra cứu nguồn gốc"
                  >
                    <QrCode size={13} color="#b07d35" />
                    <span>Mã QR</span>
                  </button>
                </div>

                {/* Visual Image Container */}
                <div style={{
                  padding: '0 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    width: '100%',
                    height: '210px',
                    backgroundColor: '#f6f4ee',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #eae5d8'
                  }}>
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.35 }}
                      src={product.image || '/assets/product-gao.png'}
                      alt={product.name}
                      style={{
                        maxHeight: '180px',
                        maxWidth: '100%',
                        objectFit: 'contain',
                        display: 'block'
                      }}
                      onError={(e) => { e.target.src = '/assets/product-gao.png'; }}
                    />
                  </div>
                </div>

                {/* Card Content */}
                <div style={{ padding: '20px 24px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  {/* Title with min-height for uniform alignment */}
                  <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.25rem',
                    color: '#1b4332',
                    fontWeight: '800',
                    lineHeight: 1.35,
                    marginBottom: '8px',
                    minHeight: '52px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {product.name}
                  </h3>

                  {/* Flavor Summary */}
                  <div style={{
                    fontSize: '0.88rem',
                    color: '#6c7c74',
                    lineHeight: 1.5,
                    marginBottom: '16px',
                    minHeight: '40px'
                  }}>
                    {product.flavor || product.summary}
                  </div>

                  {/* Sensory Ratings */}
                  <div style={{
                    backgroundColor: '#faf8f2',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    marginBottom: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    border: '1px solid #ede8dc'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#526058' }}>
                      <span style={{ fontWeight: '500' }}>Độ thơm</span>
                      {renderRatingStars(product.aroma || 5)}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#526058' }}>
                      <span style={{ fontWeight: '500' }}>Độ dẻo mềm</span>
                      {renderRatingStars(product.stickiness || 5)}
                    </div>
                  </div>

                  {/* Bottom Row Actions */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    borderTop: '1px solid #eae5d8',
                    paddingTop: '16px',
                    marginTop: 'auto'
                  }}>
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      style={{
                        backgroundColor: 'transparent',
                        border: '1px solid #d8d3c5',
                        borderRadius: '9999px',
                        padding: '8px 16px',
                        color: '#627c70',
                        fontWeight: '700',
                        fontSize: '0.84rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <Eye size={14} color="#b07d35" />
                      <span>Xem Nhanh</span>
                    </button>

                    <Link
                      to={`/san-pham/${product.slug}`}
                      style={{
                        backgroundColor: '#1b4332',
                        color: '#ffffff',
                        borderRadius: '9999px',
                        padding: '8px 18px',
                        fontWeight: '700',
                        fontSize: '0.84rem',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span>Chi Tiết</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. BẢNG SO SÁNH CÁC DÒNG GẠO (RICE COMPARISON MATRIX) */}
      <section style={{
        padding: '80px 0 90px',
        backgroundColor: '#f5f1e8',
        borderTop: '1px solid #e7e0d2'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 45px' }}>
            <div className="badge badge-gold" style={{ marginBottom: '12px' }}>
              HƯỚNG DẪN LỰA CHỌN
            </div>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.8rem, 2.6vw, 2.3rem)',
              color: '#1b4332',
              fontWeight: '800',
              marginBottom: '10px'
            }}>
              So Sánh Đặc Tính Các Dòng Gạo
            </h2>
            <p style={{ color: '#68776f', fontSize: '0.98rem', margin: 0 }}>
              Bảng so sánh chi tiết giúp gia đình bạn dễ dàng chọn đúng loại gạo theo khẩu vị và nhu cầu dinh dưỡng.
            </p>
          </div>

          <div style={{
            overflowX: 'auto',
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            border: '1px solid #e2ded2',
            boxShadow: '0 8px 30px rgba(27, 67, 50, 0.05)'
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              textAlign: 'left',
              fontSize: '0.94rem'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#1b4332', color: '#fefae0' }}>
                  <th style={{ padding: '18px 24px', fontWeight: '700' }}>Đặc Tính</th>
                  <th style={{ padding: '18px 24px', fontWeight: '700' }}>ST25 An Đông</th>
                  <th style={{ padding: '18px 24px', fontWeight: '700' }}>Nàng Thơm Chợ Đào</th>
                  <th style={{ padding: '18px 24px', fontWeight: '700' }}>Lứt Huyết Rồng</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #eae5d8' }}>
                  <td style={{ padding: '16px 24px', fontWeight: '700', color: '#1b4332' }}>Độ thơm</td>
                  <td style={{ padding: '16px 24px' }}>{renderRatingStars(5)}</td>
                  <td style={{ padding: '16px 24px' }}>{renderRatingStars(5)}</td>
                  <td style={{ padding: '16px 24px' }}>{renderRatingStars(3)}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eae5d8', backgroundColor: '#faf8f2' }}>
                  <td style={{ padding: '16px 24px', fontWeight: '700', color: '#1b4332' }}>Độ dẻo mềm</td>
                  <td style={{ padding: '16px 24px' }}>{renderRatingStars(5)}</td>
                  <td style={{ padding: '16px 24px' }}>{renderRatingStars(4)}</td>
                  <td style={{ padding: '16px 24px' }}>{renderRatingStars(2)}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eae5d8' }}>
                  <td style={{ padding: '16px 24px', fontWeight: '700', color: '#1b4332' }}>Hương vị đặc trưng</td>
                  <td style={{ padding: '16px 24px', color: '#526058' }}>Thơm lá dứa, ngọt hậu tự nhiên</td>
                  <td style={{ padding: '16px 24px', color: '#526058' }}>Thơm lài, đậm đà, nở xốp dẻo</td>
                  <td style={{ padding: '16px 24px', color: '#526058' }}>Vị bùi ngọt thanh, vỏ cám giòn</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eae5d8', backgroundColor: '#faf8f2' }}>
                  <td style={{ padding: '16px 24px', fontWeight: '700', color: '#1b4332' }}>Phù hợp với</td>
                  <td style={{ padding: '16px 24px', color: '#526058' }}>Cơm gia đình, người thích cơm dẻo</td>
                  <td style={{ padding: '16px 24px', color: '#526058' }}>Bữa cơm truyền thống, cơm niêu</td>
                  <td style={{ padding: '16px 24px', color: '#526058' }}>Ăn kiêng, tiểu đường, thực dưỡng</td>
                </tr>
                <tr>
                  <td style={{ padding: '16px 24px', fontWeight: '700', color: '#1b4332' }}>Quy cách đóng gói</td>
                  <td style={{ padding: '16px 24px', color: '#526058' }}>Túi 2kg, 5kg, 10kg</td>
                  <td style={{ padding: '16px 24px', color: '#526058' }}>Túi 5kg, 10kg</td>
                  <td style={{ padding: '16px 24px', color: '#526058' }}>Túi hút chân không 1kg, 2kg, 5kg</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* QUICK VIEW MODAL */}
      <AnimatePresence>
        {quickViewProduct && (
          <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(8, 28, 21, 0.75)',
            backdropFilter: 'blur(8px)',
            zIndex: 1100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                maxWidth: '620px',
                width: '100%',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
                position: 'relative'
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setQuickViewProduct(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  backgroundColor: '#f0ede6',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10
                }}
              >
                <X size={18} color="#1b4332" />
              </button>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', padding: '35px' }}>
                <div style={{
                  backgroundColor: '#f6f4ee',
                  borderRadius: '16px',
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <img
                    src={quickViewProduct.image || '/assets/product-gao.png'}
                    alt={quickViewProduct.name}
                    style={{ maxHeight: '200px', objectFit: 'contain' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span className="badge badge-gold" style={{ alignSelf: 'flex-start', marginBottom: '8px', fontSize: '0.75rem' }}>
                    {quickViewProduct.categoryName}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#1b4332', margin: '0 0 10px' }}>
                    {quickViewProduct.name}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#526058', lineHeight: 1.6, marginBottom: '16px' }}>
                    {quickViewProduct.flavor}
                  </p>

                  <div style={{ backgroundColor: '#faf8f2', padding: '12px', borderRadius: '12px', marginBottom: '16px', fontSize: '0.85rem', color: '#526058' }}>
                    <div>🍚 <strong>Phù hợp:</strong> {quickViewProduct.suitable}</div>
                    <div style={{ marginTop: '4px' }}>📦 <strong>Quy cách:</strong> {quickViewProduct.packSizes?.join(', ')}</div>
                  </div>

                  <Link
                    to={`/san-pham/${quickViewProduct.slug}`}
                    className="btn btn-primary"
                    style={{ marginTop: 'auto', textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '8px' }}
                    onClick={() => setQuickViewProduct(null)}
                  >
                    <span>Xem Toàn Bộ Chi Tiết</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* QR Code Modal */}
      {selectedQRProduct && (
        <QRModal
          product={selectedQRProduct}
          onClose={() => setSelectedQRProduct(null)}
        />
      )}
    </div>
  );
}
