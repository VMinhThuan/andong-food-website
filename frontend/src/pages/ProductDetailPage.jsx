import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { QrCode, Download, ChevronRight, PhoneCall, Mail, MapPin } from 'lucide-react';
import { api } from '../services/api';
import QRModal from '../components/common/QRModal';

const COMPANY = {
  name: 'CÔNG TY TNHH AN ĐÔNG FOOD',
  address: 'Ấp Long Thành, xã Phước Long, tỉnh Cà Mau',
  email: 'andongfood@gmail.com',
  phone: '0944 852 464'
};

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.getProductBySlug(slug)
      .then(setProduct)
      .catch(err => setError(err.message || 'Không tìm thấy sản phẩm.'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div style={{ padding: '100px 20px', textAlign: 'center', backgroundColor: '#faf9f5' }}>
        <h3 style={{ color: '#1b4332' }}>Đang tải thông tin sản phẩm...</h3>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ padding: '100px 20px', textAlign: 'center', backgroundColor: '#faf9f5' }}>
        <h2 style={{ color: '#1b4332', marginBottom: '16px' }}>Không tìm thấy sản phẩm</h2>
        <p style={{ color: '#526058', marginBottom: '24px' }}>{error}</p>
        <Link to="/san-pham" className="btn btn-primary">Xem Sản Phẩm An Đông</Link>
      </div>
    );
  }

  const info = product.info || {};

  const infoRows = [
    ['Thành phần', info.ingredients],
    ['Hạn sử dụng', info.expiry],
    ['Số công bố', info.declarationNo],
    ['Bảo quản', info.storage],
    ['Cảnh báo', info.notice],
    ['Xuất xứ', info.origin],
    ['Mã vạch', info.barcode]
  ].filter(([, value]) => Boolean(value));

  return (
    <div className="product-detail-page" style={{ backgroundColor: '#faf9f5' }}>
      {/* Breadcrumb */}
      <div style={{ backgroundColor: '#1b4332', color: '#fefae0', padding: '12px 0', fontSize: '0.85rem' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <Link to="/" style={{ color: '#d1e3d9', textDecoration: 'none' }}>Trang Chủ</Link>
          <ChevronRight size={14} />
          <Link to="/san-pham" style={{ color: '#d1e3d9', textDecoration: 'none' }}>Sản Phẩm</Link>
          <ChevronRight size={14} />
          <span style={{ color: '#e9c46a', fontWeight: '600' }}>{product.name}</span>
        </div>
      </div>

      <section style={{ padding: '40px 0 70px' }}>
        <div className="container">

          {/* 1. TỔNG QUAN SẢN PHẨM */}
          <div className="card" style={{ padding: '32px', marginBottom: '32px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '40px',
              alignItems: 'center'
            }}>
              <div style={{
                backgroundColor: '#f4f6f4',
                borderRadius: '24px',
                padding: '30px',
                textAlign: 'center',
                border: '1px solid #e4e0d4'
              }}>
                <img
                  src={product.images?.main || '/assets/product-gao.png'}
                  alt={product.name}
                  style={{ maxHeight: '340px', maxWidth: '100%', objectFit: 'contain' }}
                  onError={(e) => { e.target.src = '/assets/product-gao.png'; }}
                />
                <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <button onClick={() => setIsQRModalOpen(true)} className="btn btn-gold btn-sm">
                    <QrCode size={16} /> Mã QR Sản Phẩm
                  </button>
                  <a href={api.getDownloadQRPNGUrl(product.slug)} className="btn btn-outline btn-sm" download>
                    <Download size={16} /> Tải Mã QR
                  </a>
                </div>
              </div>

              <div>
                <h1 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.9rem, 3vw, 2.5rem)',
                  color: '#1b4332',
                  margin: '0 0 6px'
                }}>
                  {product.name}
                </h1>

                {product.nameEn && (
                  <div style={{ color: '#859b8f', fontSize: '0.95rem', marginBottom: '18px', letterSpacing: '0.5px' }}>
                    {product.nameEn}
                  </div>
                )}

                <p style={{ fontSize: '1rem', color: '#526058', lineHeight: 1.75, marginBottom: '24px' }}>
                  {product.summary}
                </p>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '14px',
                  backgroundColor: '#faf9f5',
                  padding: '18px',
                  borderRadius: '16px',
                  border: '1px solid #e4e0d4',
                  fontSize: '0.9rem'
                }}>
                  <div>
                    <div style={{ color: '#859b8f', marginBottom: '2px' }}>Thành phần</div>
                    <div style={{ fontWeight: '700', color: '#1b4332' }}>{info.ingredients}</div>
                  </div>
                  <div>
                    <div style={{ color: '#859b8f', marginBottom: '2px' }}>Hạn sử dụng</div>
                    <div style={{ fontWeight: '700', color: '#1b4332' }}>{info.expiry}</div>
                  </div>
                  <div>
                    <div style={{ color: '#859b8f', marginBottom: '2px' }}>Xuất xứ</div>
                    <div style={{ fontWeight: '700', color: '#1b4332' }}>{info.origin}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. HƯỚNG DẪN NẤU */}
          {product.cookingSteps?.length > 0 && (
            <div className="card" style={{ padding: '32px', marginBottom: '32px', background: '#ffffff' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#1b4332', margin: '0 0 22px' }}>
                Hướng Dẫn Nấu
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '18px' }}>
                {product.cookingSteps.map((item) => (
                  <div key={item.step} style={{
                    background: '#faf9f5',
                    padding: '22px 20px',
                    borderRadius: '16px',
                    border: '1px solid #e4e0d4'
                  }}>
                    <div style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      background: '#1b4332',
                      color: '#e9c46a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '800',
                      fontSize: '0.85rem',
                      marginBottom: '12px'
                    }}>
                      {item.step}
                    </div>
                    <h3 style={{ fontSize: '1rem', color: '#1b4332', margin: '0 0 6px', fontWeight: '700' }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: '#526058', margin: 0, lineHeight: 1.6 }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. DINH DƯỠNG & THÔNG TIN SẢN PHẨM */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            {product.nutrition?.length > 0 && (
              <div className="card" style={{ padding: '32px', background: '#ffffff' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: '#1b4332', margin: '0 0 4px' }}>
                  Thành Phần Dinh Dưỡng
                </h2>
                <div style={{ color: '#859b8f', fontSize: '0.85rem', marginBottom: '18px' }}>Trên 100 g</div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.92rem' }}>
                  <tbody>
                    {product.nutrition.map((row) => (
                      <tr key={row.label} style={{ borderBottom: '1px solid #eeeae0' }}>
                        <td style={{ padding: '12px 0', color: '#526058' }}>{row.label}</td>
                        <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: '700', color: '#1b4332' }}>
                          {row.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="card" style={{ padding: '32px', background: '#ffffff' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: '#1b4332', margin: '0 0 22px' }}>
                Thông Tin Sản Phẩm
              </h2>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.92rem' }}>
                <tbody>
                  {infoRows.map(([label, value]) => (
                    <tr key={label} style={{ borderBottom: '1px solid #eeeae0' }}>
                      <td style={{ padding: '12px 14px 12px 0', color: '#859b8f', whiteSpace: 'nowrap', verticalAlign: 'top' }}>
                        {label}
                      </td>
                      <td style={{ padding: '12px 0', color: '#1b4332', lineHeight: 1.6 }}>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 4. NHÀ SẢN XUẤT */}
          <div style={{
            marginTop: '32px',
            background: '#1b4332',
            borderRadius: '24px',
            padding: '34px',
            color: '#ffffff'
          }}>
            <div style={{ fontSize: '0.78rem', color: '#e9c46a', fontWeight: '700', letterSpacing: '1px', marginBottom: '8px' }}>
              THÔNG TIN NHÀ SẢN XUẤT
            </div>
            <h3 style={{ color: '#fefae0', fontSize: '1.2rem', margin: '0 0 18px' }}>{COMPANY.name}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', fontSize: '0.92rem' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', color: '#d1e3d9' }}>
                <MapPin size={17} color="#e9c46a" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{COMPANY.address}</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', color: '#d1e3d9' }}>
                <PhoneCall size={17} color="#e9c46a" style={{ flexShrink: 0 }} />
                <a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} style={{ color: '#d1e3d9', textDecoration: 'none' }}>
                  {COMPANY.phone}
                </a>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', color: '#d1e3d9' }}>
                <Mail size={17} color="#e9c46a" style={{ flexShrink: 0 }} />
                <a href={`mailto:${COMPANY.email}`} style={{ color: '#d1e3d9', textDecoration: 'none' }}>
                  {COMPANY.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <QRModal
        product={product}
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
      />
    </div>
  );
}
