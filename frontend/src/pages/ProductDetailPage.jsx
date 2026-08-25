import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  QrCode,
  ShieldCheck,
  Award,
  CheckCircle2,
  PhoneCall,
  Download,
  Share2,
  Printer,
  ChevronRight,
  Flame,
  Droplets,
  Package,
  MapPin,
  Sparkles,
  Info
} from 'lucide-react';
import { api } from '../services/api';
import QRModal from '../components/common/QRModal';
import RiceHorizonDivider from '../components/common/RiceHorizonDivider';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.getProductBySlug(slug)
      .then(data => {
        setProduct(data);
      })
      .catch(err => {
        setError(err.message || 'Không tìm thấy sản phẩm.');
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div style={{ padding: '100px 20px', textAlign: 'center', backgroundColor: '#faf9f5' }}>
        <div style={{ fontSize: '2rem', marginBottom: '16px' }}>🌾</div>
        <h3 style={{ color: '#1b4332' }}>Đang tải thông tin sản phẩm An Đông...</h3>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ padding: '100px 20px', textAlign: 'center', backgroundColor: '#faf9f5' }}>
        <h2 style={{ color: '#1b4332', marginBottom: '16px' }}>Không tìm thấy sản phẩm</h2>
        <p style={{ color: '#526058', marginBottom: '24px' }}>{error}</p>
        <Link to="/san-pham" className="btn btn-primary">
          Xem Danh Sách Gạo An Đông
        </Link>
      </div>
    );
  }

  return (
    <div className="product-detail-page" style={{ backgroundColor: '#faf9f5' }}>
      {/* Top Breadcrumb & Mobile QR Landing Header */}
      <div style={{ backgroundColor: '#1b4332', color: '#fefae0', padding: '12px 0', fontSize: '0.85rem' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link to="/" style={{ color: '#d1e3d9', textDecoration: 'none' }}>Trang Chủ</Link>
            <ChevronRight size={14} />
            <Link to="/san-pham" style={{ color: '#d1e3d9', textDecoration: 'none' }}>Sản Phẩm</Link>
            <ChevronRight size={14} />
            <span style={{ color: '#e9c46a', fontWeight: '600' }}>{product.name}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#e9c46a' }}>
            <ShieldCheck size={15} /> SẢN PHẨM CHÍNH HÃNG AN ĐÔNG FOOD
          </div>
        </div>
      </div>

      {/* PRODUCT HERO & OVERVIEW */}
      <section style={{ padding: '40px 0 60px' }}>
        <div className="container">
          <div className="qr-landing-card" style={{ padding: '32px', marginBottom: '40px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '40px',
              alignItems: 'center'
            }}>
              {/* Product Image on Packaging Frame */}
              <div style={{ textAlign: 'center', position: 'relative' }}>
                <div style={{
                  backgroundColor: '#f4f6f4',
                  borderRadius: '24px',
                  padding: '30px',
                  position: 'relative',
                  border: '1px solid #e4e0d4'
                }}>
                  <div className="badge badge-gold" style={{ position: 'absolute', top: '16px', left: '16px' }}>
                    100% GẠO CHUẨN GIỐNG
                  </div>

                  <img
                    src={product.images?.main || '/assets/product-gao.png'}
                    alt={product.name}
                    style={{
                      maxHeight: '340px',
                      maxWidth: '100%',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 12px 20px rgba(0,0,0,0.15))'
                    }}
                    onError={(e) => { e.target.src = '/assets/product-gao.png'; }}
                  />

                  <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                    <button
                      onClick={() => setIsQRModalOpen(true)}
                      className="btn btn-gold btn-sm"
                    >
                      <QrCode size={16} /> Mã QR In Bao Bì
                    </button>
                    <a
                      href={api.getDownloadQRPNGUrl(product.slug)}
                      className="btn btn-outline btn-sm"
                      download
                    >
                      <Download size={16} /> Tải QR Độ Nét Cao
                    </a>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span className="badge badge-green">{product.categoryName || 'Gạo Đặc Sản'}</span>
                  <span style={{ fontSize: '0.85rem', color: '#859b8f', fontWeight: '600' }}>
                    MÃ SẢN PHẨM: <strong>{product.code}</strong>
                  </span>
                </div>

                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: '#1b4332', marginBottom: '12px' }}>
                  {product.name}
                </h1>

                {product.tagline && (
                  <div style={{ color: '#b07d35', fontWeight: '700', fontSize: '1rem', marginBottom: '14px' }}>
                    ✨ {product.tagline}
                  </div>
                )}

                <p style={{ fontSize: '1rem', color: '#526058', lineHeight: 1.7, marginBottom: '24px' }}>
                  {product.summary}
                </p>

                {/* Key specs highlight */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  backgroundColor: '#faf9f5',
                  padding: '16px',
                  borderRadius: '16px',
                  border: '1px solid #e4e0d4',
                  marginBottom: '24px',
                  fontSize: '0.88rem'
                }}>
                  <div>
                    <span style={{ color: '#859b8f' }}>Quy cách:</span>
                    <div style={{ fontWeight: '700', color: '#1b4332' }}>{product.packSizes?.join(', ') || '2kg, 5kg, 10kg'}</div>
                  </div>
                  <div>
                    <span style={{ color: '#859b8f' }}>Hạn sử dụng:</span>
                    <div style={{ fontWeight: '700', color: '#1b4332' }}>{product.expiry || '12 tháng'}</div>
                  </div>
                  <div>
                    <span style={{ color: '#859b8f' }}>Bao bì:</span>
                    <div style={{ fontWeight: '700', color: '#1b4332' }}>{product.packaging || 'Túi hút chân không cao cấp'}</div>
                  </div>
                  <div>
                    <span style={{ color: '#859b8f' }}>Xuất xứ:</span>
                    <div style={{ fontWeight: '700', color: '#1b4332' }}>{product.origin?.location || 'ĐBSCL Việt Nam'}</div>
                  </div>
                </div>

                {/* Hotline & Order consultation */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  <a href="tel:1900886688" className="btn btn-primary btn-lg" style={{ flex: 1 }}>
                    <PhoneCall size={18} /> Hotline Đặt Hàng: 1900 886 688
                  </a>
                  <Link to="/lien-he" className="btn btn-outline btn-lg">
                    Tư Vấn Đại Lý
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* 4 DETAIL TABS / SECTIONS (From Proposal & Brand Specs) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginBottom: '40px' }}>
            {/* 1. NGUỒN GỐC & VÙNG NGUYÊN LIỆU */}
            <div className="card" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <MapPin size={22} color="#1b4332" />
                <h3 style={{ fontSize: '1.25rem', color: '#1b4332', margin: 0 }}>Nguồn Gốc & Vùng Trồng</h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.92rem', color: '#526058' }}>
                <li><strong>📍 Vùng canh tác:</strong> {product.origin?.location || 'Đồng bằng Sông Cửu Long'}</li>
                <li><strong>🌾 Thổ nhưỡng:</strong> {product.origin?.soil || 'Đất phù sa bồi đắp màu mỡ'}</li>
                <li><strong>👨‍🌾 Hợp tác xã:</strong> {product.origin?.farmerCoop || 'HTX Nông nghiệp An Đông Mekong'}</li>
                <li><strong>☀️ Vụ mùa:</strong> {product.origin?.harvestSeason || 'Vụ Đông Xuân trĩu hạt'}</li>
              </ul>
            </div>

            {/* 2. ĐẶC TÍNH & HƯƠNG VỊ */}
            <div className="card" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <Sparkles size={22} color="#b07d35" />
                <h3 style={{ fontSize: '1.25rem', color: '#1b4332', margin: 0 }}>Đặc Tính & Hương Vị</h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.92rem', color: '#526058' }}>
                <li><strong>🌸 Mùi thơm:</strong> {product.tasteProfile?.aroma || 'Thơm ngát tự nhiên'}</li>
                <li><strong>🍚 Độ dẻo:</strong> {product.tasteProfile?.texture || 'Dẻo mềm, kết dính vừa vặn'}</li>
                <li><strong>✨ Vị giác:</strong> {product.tasteProfile?.taste || 'Ngọt hậu sâu, để nguội vẫn mềm'}</li>
                <li><strong>🌿 Độ thuần giống:</strong> {product.specs?.purity || '99.5% chuẩn giống'}</li>
              </ul>
            </div>
          </div>

          {/* 3. HƯỚNG DẪN NẤU CƠM & BẢO QUẢN */}
          <div className="card" style={{ padding: '32px', marginBottom: '40px', background: '#ffffff' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#1b4332', marginBottom: '20px' }}>
              🍚 Hướng Dẫn Nấu Cơm Ngon Chuẩn Vị & Bảo Quản
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              <div style={{ background: '#faf9f5', padding: '20px', borderRadius: '16px', borderLeft: '4px solid #1b4332' }}>
                <h4 style={{ color: '#1b4332', fontSize: '1.05rem', marginBottom: '8px' }}>1. Tỉ Lệ Nước & Vo Gạo</h4>
                <p style={{ fontSize: '0.9rem', color: '#526058', margin: 0, lineHeight: 1.6 }}>
                  <strong>Tỉ lệ:</strong> {product.cookingGuide?.waterRatio || '1 bát gạo : 1 đến 1.1 bát nước'}. <br />
                  <strong>Vo gạo:</strong> {product.cookingGuide?.washingTips || 'Vo nhẹ 1 - 2 lần để giữ lớp cám dưỡng chất.'}
                </p>
              </div>

              <div style={{ background: '#faf9f5', padding: '20px', borderRadius: '16px', borderLeft: '4px solid #e9c46a' }}>
                <h4 style={{ color: '#1b4332', fontSize: '1.05rem', marginBottom: '8px' }}>2. Chế Độ Nấu</h4>
                <p style={{ fontSize: '0.9rem', color: '#526058', margin: 0, lineHeight: 1.6 }}>
                  {product.cookingGuide?.cookingTips || 'Nấu bằng nồi cơm điện bình thường. Khi cơm chín, để ủ thêm 10 phút rồi xới đều.'}
                </p>
              </div>

              <div style={{ background: '#faf9f5', padding: '20px', borderRadius: '16px', borderLeft: '4px solid #d4a373' }}>
                <h4 style={{ color: '#1b4332', fontSize: '1.05rem', marginBottom: '8px' }}>3. Bảo Quản Đúng Cách</h4>
                <p style={{ fontSize: '0.9rem', color: '#526058', margin: 0, lineHeight: 1.6 }}>
                  {product.storageGuide || 'Bảo quản nơi khô ráo, thoáng mát. Sau khi mở túi đậy kín trong thùng gạo chuyên dụng.'}
                </p>
              </div>
            </div>
          </div>

          {/* 4. QUY TRÌNH SẢN XUẤT 5 BƯỚC KHÉP KÍN */}
          <div className="card" style={{ padding: '32px', marginBottom: '40px', background: '#ffffff' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#1b4332', marginBottom: '20px' }}>
              🌾 Quy Trình Sản Xuất Khép Kín An Đông Food
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              {(product.processSteps || []).map((step, idx) => (
                <div key={idx} style={{
                  background: '#faf9f5',
                  padding: '18px',
                  borderRadius: '14px',
                  border: '1px solid #e4e0d4',
                  position: 'relative'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: '#1b4332',
                    color: '#e9c46a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '800',
                    fontSize: '0.85rem',
                    marginBottom: '10px'
                  }}>
                    {step.step || idx + 1}
                  </div>
                  <h4 style={{ fontSize: '0.98rem', color: '#1b4332', marginBottom: '6px' }}>{step.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: '#526058', margin: 0, lineHeight: 1.5 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 5. CHỨNG NHẬN CHẤT LƯỢNG & DOANH NGHIỆP */}
          <div style={{
            background: 'linear-gradient(135deg, #1b4332 0%, #122820 100%)',
            borderRadius: '24px',
            padding: '36px',
            color: '#ffffff'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', alignItems: 'center' }}>
              <div>
                <div className="badge badge-gold" style={{ marginBottom: '10px' }}>
                  CHỨNG NHẬN & TIÊU CHUẨN
                </div>
                <h3 style={{ color: '#fefae0', fontSize: '1.4rem', marginBottom: '12px' }}>
                  Hồ Sơ An Toàn Thực Phẩm
                </h3>
                <p style={{ color: '#d1e3d9', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '16px' }}>
                  Mọi sản phẩm của An Đông Food đều được kiểm định nghiêm ngặt theo các tiêu chuẩn quốc tế và quốc gia:
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {(product.certifications || []).map((cert, idx) => (
                    <div key={idx} style={{ background: 'rgba(255,255,255,0.1)', padding: '8px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)' }}>
                      <div style={{ color: '#e9c46a', fontWeight: '700', fontSize: '0.9rem' }}>{cert.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#d1e3d9' }}>Mã: {cert.code}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Company Quick Contact */}
              <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: '0.8rem', color: '#e9c46a', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>
                  ĐƠN VỊ SẢN XUẤT & PHÂN PHỐI
                </div>
                <h4 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '10px' }}>
                  CÔNG TY TNHH THỰC PHẨM AN ĐÔNG
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#b7c4bd', margin: '0 0 6px' }}>
                  📍 Trụ sở: Số 88 Đường Phù Sa, Phường An Đông, TP.HCM
                </p>
                <p style={{ fontSize: '0.85rem', color: '#b7c4bd', margin: '0 0 12px' }}>
                  📞 Hotline: <strong style={{ color: '#e9c46a' }}>1900 886 688</strong> – 0988 123 456
                </p>
                <div style={{ fontStyle: 'italic', fontSize: '0.85rem', color: '#e9c46a' }}>
                  “Bình An Ở Phía Đông – Gạo Ngon Chuẩn Giống, Gửi Trọn An Lòng”
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QR Modal */}
      <QRModal
        product={product}
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
      />
    </div>
  );
}
