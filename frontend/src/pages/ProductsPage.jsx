import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QrCode, ArrowRight } from 'lucide-react';
import { api } from '../services/api';
import QRModal from '../components/common/QRModal';

const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.08 } }
};

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [selectedQRProduct, setSelectedQRProduct] = useState(null);

  useEffect(() => {
    api.getProducts()
      .then(data => setProducts(Array.isArray(data) ? data : []))
      .catch(err => console.warn(err));
  }, []);

  return (
    <div className="products-page" style={{ backgroundColor: '#faf8f2', color: '#1b4332' }}>

      {/* 1. HERO */}
      <section style={{
        padding: '70px 0 60px',
        background: 'linear-gradient(135deg, #081c15 0%, #1b4332 100%)',
        color: '#ffffff'
      }}>
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            style={{ maxWidth: '640px' }}
          >
            <h1 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.2rem, 4vw, 3rem)',
              color: '#fefae0',
              margin: '0 0 16px',
              fontWeight: '800',
              lineHeight: 1.2
            }}>
              Sản Phẩm An Đông
            </h1>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.75, color: '#d1e3d9', margin: 0 }}>
              Mỗi sản phẩm có một trang thông tin riêng, cũng chính là trang bạn đến khi
              quét mã QR in trên bao bì.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. DANH SÁCH SẢN PHẨM */}
      <section style={{ padding: '70px 0 90px' }}>
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            variants={staggerContainer}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '32px'
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
                <Link
                  to={`/san-pham/${prod.slug}`}
                  style={{
                    height: '320px',
                    backgroundColor: '#f6f3ea',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '30px',
                    borderBottom: '1px solid #eeeae0'
                  }}
                >
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    src={prod.images?.main || '/assets/product-gao.png'}
                    alt={prod.name}
                    style={{ maxHeight: '100%', maxWidth: '85%', objectFit: 'contain' }}
                    onError={(e) => { e.target.src = '/assets/product-gao.png'; }}
                  />
                </Link>

                <div style={{ padding: '30px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h2 style={{
                    fontSize: '1.45rem',
                    fontFamily: 'var(--font-serif)',
                    margin: '0 0 4px',
                    fontWeight: '800'
                  }}>
                    <Link to={`/san-pham/${prod.slug}`} style={{ color: '#1b4332', textDecoration: 'none' }}>
                      {prod.name}
                    </Link>
                  </h2>

                  {prod.nameEn && (
                    <div style={{ color: '#859b8f', fontSize: '0.85rem', marginBottom: '14px' }}>
                      {prod.nameEn}
                    </div>
                  )}

                  <p style={{ color: '#526058', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '24px', flex: 1 }}>
                    {prod.summary}
                  </p>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    borderTop: '1px solid #f0ede4',
                    paddingTop: '18px'
                  }}>
                    <Link
                      to={`/san-pham/${prod.slug}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: '#1b4332',
                        fontWeight: '700',
                        fontSize: '0.94rem',
                        textDecoration: 'none'
                      }}
                    >
                      <span>Xem Chi Tiết</span>
                      <ArrowRight size={16} color="#b07d35" />
                    </Link>

                    <button
                      onClick={() => setSelectedQRProduct(prod)}
                      className="btn btn-outline btn-sm"
                      aria-label={`Xem mã QR của ${prod.name}`}
                    >
                      <QrCode size={15} /> Mã QR
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <QRModal
        product={selectedQRProduct}
        isOpen={Boolean(selectedQRProduct)}
        onClose={() => setSelectedQRProduct(null)}
      />
    </div>
  );
}
