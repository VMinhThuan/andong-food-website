import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function PreFooterCTA() {
  return (
    <section className="pre-footer-cta" style={{
      position: 'relative',
      padding: '110px 0 115px',
      overflow: 'hidden',
      backgroundImage: 'url(/assets/rice-sunrise.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center 40%',
      backgroundColor: '#081c15',
      textAlign: 'center',
      color: '#ffffff'
    }}>
      {/* Cinematic Brand Green Gradient Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(8, 28, 21, 0.72) 0%, rgba(27, 67, 50, 0.65) 50%, rgba(8, 28, 21, 0.88) 100%)',
        zIndex: 1
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ maxWidth: '680px', margin: '0 auto' }}
        >
          <div className="badge badge-gold" style={{ marginBottom: '16px', backgroundColor: 'rgba(254, 250, 224, 0.92)' }}>
            GẮN KẾT YÊU THƯƠNG
          </div>

          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.2rem, 3.8vw, 3.1rem)',
            color: '#fefae0',
            lineHeight: 1.2,
            marginBottom: '16px',
            fontWeight: '800',
            letterSpacing: '1px',
            textShadow: '0 3px 18px rgba(0,0,0,0.6)'
          }}>
            Mang An Lành Đến Mỗi Bữa Cơm
          </h2>

          <p style={{
            color: '#e4efe9',
            fontSize: '1.1rem',
            lineHeight: 1.7,
            marginBottom: '32px',
            textShadow: '0 2px 8px rgba(0,0,0,0.5)'
          }}>
            Gạo ngon chuẩn giống, gửi trọn an lòng trong từng bữa cơm gia đình.
          </p>

          <Link
            to="/san-pham"
            className="btn btn-gold btn-lg"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '16px 36px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
            }}
          >
            <span>Khám Phá Sản Phẩm</span>
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
