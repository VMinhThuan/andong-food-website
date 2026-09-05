import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
import { api } from '../services/api';
import BrandPreloader from '../components/common/BrandPreloader';
import EcomSt25 from '../assets/optimized/ecom-st25.webp';
import EcomVuongTom from '../assets/optimized/ecom-vuongtom.webp';
import SEO from '../components/common/SEO';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getProducts()
      .then(setProducts)
      .catch((err) => setError(err.message || 'Không thể tải sản phẩm.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <BrandPreloader persistent />;

  const sortedProducts = [...products].sort((a, b) => {
    const aIsSt25 = a.slug?.includes('st25') || a.code?.includes('ST25');
    const bIsSt25 = b.slug?.includes('st25') || b.code?.includes('ST25');
    if (aIsSt25 && !bIsSt25) return -1;
    if (!aIsSt25 && bIsSt25) return 1;
    return 0;
  });

  return (
    <main style={{ background: '#FFFDF9', minHeight: '80vh', padding: '60px 0 100px' }}>
      <SEO
        title="Sản Phẩm Gạo An Đông – Gạo ST25 & Gạo Vuông Tôm"
        description="Khám phá các sản phẩm gạo sạch An Đông: Gạo ST25 chuẩn ngon nhất thế giới và Gạo sinh thái Vuông Tôm trọn vị an lành. Đóng túi tiện lợi, chuẩn chất lượng."
        keywords="Gạo An Đông, Gạo ST25, Gạo Vuông Tôm, Mua gạo sạch, Gạo đặc sản đóng gói"
      />
      <div className="container" style={{ maxWidth: '1280px' }}>
        {/* Header danh mục */}
        <div style={{ maxWidth: 860, marginBottom: 50, textAlign: 'left' }}>
          <div className="badge badge-gold" style={{ marginBottom: 12 }}>
            DANH MỤC SẢN PHẨM
          </div>
          <h1 style={{
            color: 'var(--brand-brown)',
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
            margin: '10px 0 16px',
            fontWeight: 800
          }}>
            Sản Phẩm An Đông
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, margin: 0 }}>
            Nguồn gạo sạch chuẩn giống, thơm dẻo đậm vị cho từng bữa cơm an lành của gia đình Việt.
          </p>
        </div>

        {error && <p style={{ color: '#b42318' }}>{error}</p>}
        {!error && products.length === 0 && <p>Chưa có sản phẩm trong cơ sở dữ liệu.</p>}

        {/* Grid danh sách sản phẩm (ST25 đứng trước, căn đều chiều ngang) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '40px',
          alignItems: 'stretch'
        }}>
          {sortedProducts.map((product) => {
            const isSt25 = product.slug?.includes('st25') || product.code?.includes('ST25');
            const defaultEcom = isSt25 ? EcomSt25 : EcomVuongTom;
            const imgSrc = product.images?.ecom || defaultEcom || product.images?.front || product.images?.main;
            const productNumber = product.content?.number || (isSt25 ? 'SẢN PHẨM 01 / PRODUCT 01' : 'SẢN PHẨM 02 / PRODUCT 02');

            return (
              <m.article
                key={product.id || product._id}
                whileHover={{ y: -6, boxShadow: '0 20px 38px rgba(0,0,0,0.08)' }}
                transition={{ duration: 0.3 }}
                style={{
                  background: '#FFFBEA',
                  border: '1px solid rgba(197, 160, 89, 0.3)',
                  borderRadius: 24,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                {/* Ảnh Ecom Full Size sắc nét trọn vẹn, không bị che đầu ảnh */}
                <div style={{
                  width: '100%',
                  aspectRatio: '1 / 1',
                  backgroundColor: '#FFFEF2',
                  borderBottom: '1px solid rgba(197, 160, 89, 0.2)',
                  overflow: 'hidden',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <img
                    src={imgSrc}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'block',
                      objectFit: 'contain',
                      objectPosition: 'center center'
                    }}
                    onError={(e) => {
                      e.target.src = defaultEcom;
                    }}
                  />
                </div>

                {/* Khối thông tin chi tiết bên dưới */}
                <div style={{
                  padding: '28px 28px 32px',
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1
                }}>
                  <h2 style={{
                    color: '#11994A',
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.45rem',
                    fontWeight: 800,
                    margin: '0 0 12px'
                  }}>
                    {product.name}
                  </h2>

                  <p style={{
                    color: '#555555',
                    fontSize: '0.96rem',
                    lineHeight: 1.7,
                    flexGrow: 1,
                    margin: '0 0 16px'
                  }}>
                    {product.summary || product.description}
                  </p>

                  {/* Giá Niêm Yết Gạch Ngang & Giá Khuyến Mãi */}
                  <div style={{
                    backgroundColor: '#FFFDF2',
                    border: '1.5px solid #F0DFB6',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    marginBottom: '18px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '0.82rem', color: '#7E6852' }}>Giá niêm yết:</span>
                      <span style={{
                        fontSize: '0.94rem',
                        color: '#94A3B8',
                        textDecoration: 'line-through',
                        fontWeight: '600'
                      }}>
                        {((product.originalPrice || product.listedPrice || (product.slug === 'gao-st25' ? 259000 : 249000))).toLocaleString('vi-VN')} ₫
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                      <span style={{
                        fontSize: '1.45rem',
                        fontWeight: '800',
                        color: '#11994A',
                        lineHeight: 1.1
                      }}>
                        {((product.promotionalPrice || product.price || (product.slug === 'gao-st25' ? 215000 : 195000))).toLocaleString('vi-VN')} ₫
                      </span>
                      <span style={{ fontSize: '0.84rem', color: '#55655D', fontWeight: '500' }}>
                        / {product.unit || 'túi 5kg'}
                      </span>
                    </div>
                  </div>

                  <Link
                    className="btn"
                    to={`/san-pham/${product.slug}`}
                    style={{
                      textAlign: 'center',
                      textDecoration: 'none',
                      border: '1.5px solid #11994A',
                      color: '#11994A',
                      backgroundColor: 'transparent',
                      borderRadius: '999px',
                      padding: '12px 24px',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      transition: 'all 0.25s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#11994A';
                      e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#11994A';
                    }}
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </m.article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
