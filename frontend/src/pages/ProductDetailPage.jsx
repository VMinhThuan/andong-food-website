import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
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
import MatTruocBaoBi from '../assets/brand-element/MẶT TRƯỚC BAO BÌ.png';
import MatSauBaoBi from '../assets/brand-element/MẶT SAU BAO BÌ.png';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const location = useLocation();
  const productPreview = location.state?.product || null;
  const [product, setProduct] = useState(() => productPreview);
  const [loading, setLoading] = useState(() => !productPreview);
  const [error, setError] = useState('');
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [viewBack, setViewBack] = useState(false);
  const [isPackagingLoading, setIsPackagingLoading] = useState(false);
  const packagingRequestRef = useRef(0);

  const changePackagingFace = (nextViewBack) => {
    if (nextViewBack === viewBack || isPackagingLoading) return;

    const imageSrc = nextViewBack ? MatSauBaoBi : MatTruocBaoBi;
    const requestId = ++packagingRequestRef.current;
    setIsPackagingLoading(true);

    const image = new Image();
    const finish = () => {
      if (requestId !== packagingRequestRef.current) return;
      setViewBack(nextViewBack);
      window.setTimeout(() => {
        if (requestId === packagingRequestRef.current) setIsPackagingLoading(false);
      }, 180);
    };

    image.onload = finish;
    image.onerror = finish;
    image.src = imageSrc;
  };

  useEffect(() => {
    // Sản phẩm đã được truyền từ card ở trang chủ: hiển thị ngay để không có
    // khoảng loading làm màn hình nháy khi đổi route. Dữ liệu đầy đủ vẫn được
    // tải nền và cập nhật ngay sau đó.
    if (productPreview) {
      setProduct(productPreview);
      setError('');
      setLoading(false);
      return;
    }

    setProduct(null);
    setError('');
    setLoading(true);
    api.getProductBySlug(slug)
      .then(data => {
        setProduct(data);
      })
      .catch(err => {
        if (!productPreview) setError(err.message || 'Không tìm thấy sản phẩm.');
      })
      .finally(() => setLoading(false));
  }, [slug, productPreview]);

  if (loading) {
    return (
      <div style={{
        minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: '16px', textAlign: 'center', backgroundColor: 'var(--bg-main)'
      }}>
        <span className="packaging-image-loader" aria-label="Đang tải thông tin sản phẩm" role="status" />
        <h3 style={{ color: 'var(--primary)', margin: 0 }}>Đang tải thông tin sản phẩm An Đông...</h3>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ padding: '100px 20px', textAlign: 'center', backgroundColor: 'var(--bg-main)' }}>
        <h2 style={{ color: 'var(--primary)', marginBottom: '16px' }}>Không tìm thấy sản phẩm</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>{error}</p>
        <Link to="/san-pham" className="btn btn-primary">
          Xem Danh Sách Gạo An Đông
        </Link>
      </div>
    );
  }

  // Chỉ hiển thị hạng mục có dữ liệu thật. Trước đây trường rỗng được lấp bằng
  // vùng trồng, thổ nhưỡng, hợp tác xã và độ thuần giống tưởng tượng, hiển thị
  // cho người mua như thông tin đã được xác nhận.
  const originRows = [
    ['Xuất xứ', product.originCountry],
    ['Vùng canh tác', product.origin?.location],
    ['Thổ nhưỡng', product.origin?.soil],
    ['Hợp tác xã', product.origin?.farmerCoop],
    ['Vụ mùa', product.origin?.harvestSeason]
  ].filter(([, value]) => value);

  const tasteRows = [
    ['Mùi thơm', product.tasteProfile?.aroma],
    ['Độ dẻo', product.tasteProfile?.texture],
    ['Vị giác', product.tasteProfile?.taste],
    ['Độ thuần giống', product.specs?.purity]
  ].filter(([, value]) => value);

  return (
    <div className="product-detail-page" style={{ backgroundColor: 'var(--bg-main)' }}>
      {/* Breadcrumb */}
      <div style={{ backgroundColor: 'var(--primary)', color: 'var(--golden-pale)', padding: '12px 0', fontSize: '0.85rem' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link to="/" style={{ color: '#d1e3d9', textDecoration: 'none' }}>Trang Chủ</Link>
            <ChevronRight size={14} />
            <Link to="/san-pham" style={{ color: '#d1e3d9', textDecoration: 'none' }}>Sản Phẩm</Link>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--golden-light)', fontWeight: '600' }}>{product.name}</span>
          </div>

          <div style={{ fontSize: '0.78rem', color: 'var(--golden-light)', letterSpacing: '0.04em' }}>
            SẢN PHẨM CHÍNH HÃNG An Đông
          </div>
        </div>
      </div>

      {/* PRODUCT HERO & OVERVIEW */}
      <section style={{ padding: '32px 0 64px' }}>
        <div className="container">
          <div className="qr-landing-card" style={{ padding: '28px', marginBottom: '36px', boxShadow: '0 14px 38px rgba(17, 67, 40, 0.07)' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '52px',
              alignItems: 'center'
            }}>
              {/* Product Image on Packaging Frame */}
              <div style={{ textAlign: 'center', position: 'relative' }}>
                <div style={{
                  backgroundColor: 'var(--bg-main)',
                  borderRadius: '20px',
                  padding: '24px',
                  position: 'relative',
                  border: '1px solid var(--border-color)'
                }}>
                  <div style={{
                    position: 'relative',
                    height: '430px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '10px',
                    overflow: 'hidden'
                  }}>
                    <img
                      src={viewBack ? MatSauBaoBi : MatTruocBaoBi}
                      alt={product.name}
                      style={{
                        maxHeight: '400px',
                        maxWidth: '82%',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 12px 20px rgba(0,0,0,0.12))',
                        transition: 'opacity 0.22s ease, transform 0.22s ease',
                        opacity: isPackagingLoading ? 0.35 : 1,
                        transform: isPackagingLoading ? 'scale(0.98)' : 'scale(1)'
                      }}
                    />
                    {isPackagingLoading && (
                      <div
                        aria-label="Đang tải ảnh bao bì"
                        role="status"
                        style={{
                          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                          backgroundColor: 'rgba(255, 254, 242, 0.42)', backdropFilter: 'blur(2px)'
                        }}
                      >
                        <span className="packaging-image-loader" />
                      </div>
                    )}
                  </div>

                  {/* Face Toggle Tabs */}
                  <div style={{
                    display: 'inline-flex', alignSelf: 'center', justifyContent: 'center', gap: '4px',
                    margin: '16px auto', padding: '4px', borderRadius: '9999px',
                    backgroundColor: '#eef5f0', border: '1px solid #d8e8dd'
                  }}>
                    <button
                      onClick={() => changePackagingFace(false)}
                      disabled={isPackagingLoading}
                      style={{
                        padding: '8px 18px',
                        borderRadius: '9999px',
                        border: '1px solid transparent',
                        backgroundColor: !viewBack ? 'var(--primary)' : '#ffffff',
                        color: !viewBack ? '#ffffff' : 'var(--text-main)',
                        fontWeight: '700',
                        fontSize: '0.8rem',
                        cursor: isPackagingLoading ? 'wait' : 'pointer',
                        transition: 'all 0.2s', outline: 'none',
                        opacity: isPackagingLoading ? 0.7 : 1
                      }}
                    >
                      Mặt Trước
                    </button>
                    <button
                      onClick={() => changePackagingFace(true)}
                      disabled={isPackagingLoading}
                      style={{
                        padding: '8px 18px',
                        borderRadius: '9999px',
                        border: '1px solid transparent',
                        backgroundColor: viewBack ? 'var(--primary)' : '#ffffff',
                        color: viewBack ? '#ffffff' : 'var(--text-main)',
                        fontWeight: '700',
                        fontSize: '0.8rem',
                        cursor: isPackagingLoading ? 'wait' : 'pointer',
                        transition: 'all 0.2s', outline: 'none',
                        opacity: isPackagingLoading ? 0.7 : 1
                      }}
                    >
                      Mặt Sau
                    </button>
                  </div>

                  <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', gap: '8px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                    <button
                      onClick={() => setIsQRModalOpen(true)}
                      className="btn btn-gold btn-sm"
                    >
                      Xem mã QR bao bì
                    </button>
                    <a
                      href={api.getDownloadQRPNGUrl(product.slug)}
                      className="btn btn-outline btn-sm"
                      download
                    >
                      Tải mã QR
                    </a>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span className="badge badge-green">{product.categoryName || 'Gạo Đặc Sản'}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: '600' }}>
                    MÃ SẢN PHẨM: <strong>{product.code}</strong>
                  </span>
                </div>

                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: 'var(--primary)', marginBottom: '12px' }}>
                  {product.name}
                </h1>

                {product.tagline && (
                  <div style={{ color: 'var(--earth-brown)', fontWeight: '700', fontSize: '1rem', marginBottom: '14px' }}>
                    {product.tagline}
                  </div>
                )}

                <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '24px' }}>
                  {product.summary}
                </p>

                {/* Key specs highlight */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  backgroundColor: 'var(--bg-main)',
                  padding: '16px',
                  borderRadius: '16px',
                  border: '1px solid var(--border-color)',
                  marginBottom: '24px',
                  fontSize: '0.88rem'
                }}>
                  <div>
                    <span style={{ color: 'var(--text-light)' }}>Quy cách:</span>
                    <div style={{ fontWeight: '700', color: 'var(--primary)' }}>{product.packSizes?.length ? product.packSizes.join(', ') : (product.netWeight || 'Đang cập nhật')}</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-light)' }}>Hạn sử dụng:</span>
                    <div style={{ fontWeight: '700', color: 'var(--primary)' }}>{product.expiry || 'Đang cập nhật'}</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-light)' }}>Bao bì:</span>
                    <div style={{ fontWeight: '700', color: 'var(--primary)' }}>{product.packaging || 'Đang cập nhật'}</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-light)' }}>Xuất xứ:</span>
                    <div style={{ fontWeight: '700', color: 'var(--primary)' }}>{product.originCountry || product.origin?.location || 'Đang cập nhật'}</div>
                  </div>
                </div>

                {/* Hotline & Order consultation */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  <a href="tel:0944852464" className="btn btn-primary btn-lg" style={{ flex: 1 }}>
                    Điện thoại đặt hàng: 0944 852 464
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
            {originRows.length > 0 && (
              <div className="card" style={{ padding: '28px' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)', margin: '0 0 16px' }}>Nguồn Gốc & Vùng Trồng</h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                  {originRows.map(([label, value]) => (
                    <li key={label}><strong>{label}:</strong> {value}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* 2. ĐẶC TÍNH & HƯƠNG VỊ */}
            {tasteRows.length > 0 && (
              <div className="card" style={{ padding: '28px' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)', margin: '0 0 16px' }}>Đặc Tính & Hương Vị</h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                  {tasteRows.map(([label, value]) => (
                    <li key={label}><strong>{label}:</strong> {value}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* 3. HƯỚNG DẪN NẤU CƠM & BẢO QUẢN */}
          <div className="card" style={{ padding: '32px', marginBottom: '40px', background: '#ffffff' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--primary)', marginBottom: '20px' }}>
              Hướng Dẫn Nấu Cơm & Bảo Quản
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              <div style={{ background: 'var(--bg-main)', padding: '20px', borderRadius: '16px', borderLeft: '4px solid var(--primary)' }}>
                <h4 style={{ color: 'var(--primary)', fontSize: '1.05rem', marginBottom: '8px' }}>1. Tỉ Lệ Nước & Vo Gạo</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>
                  <strong>Tỉ lệ:</strong> {product.cookingGuide?.waterRatio || '1 bát gạo : 1 đến 1.1 bát nước'}. <br />
                  <strong>Vo gạo:</strong> {product.cookingGuide?.washingTips || 'Vo nhẹ 1 - 2 lần để giữ lớp cám dưỡng chất.'}
                </p>
              </div>

              <div style={{ background: 'var(--bg-main)', padding: '20px', borderRadius: '16px', borderLeft: '4px solid var(--golden-light)' }}>
                <h4 style={{ color: 'var(--primary)', fontSize: '1.05rem', marginBottom: '8px' }}>2. Chế Độ Nấu</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>
                  {product.cookingGuide?.cookingTips || 'Nấu bằng nồi cơm điện bình thường. Khi cơm chín, để ủ thêm 10 phút rồi xới đều.'}
                </p>
              </div>

              <div style={{ background: 'var(--bg-main)', padding: '20px', borderRadius: '16px', borderLeft: '4px solid var(--golden)' }}>
                <h4 style={{ color: 'var(--primary)', fontSize: '1.05rem', marginBottom: '8px' }}>3. Bảo Quản Đúng Cách</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>
                  {product.storageGuide || 'Bảo quản nơi khô ráo, thoáng mát. Sau khi mở túi đậy kín trong thùng gạo chuyên dụng.'}
                </p>
              </div>
            </div>
          </div>

          {/* 4. QUY TRÌNH SẢN XUẤT 5 BƯỚC KHÉP KÍN */}
          <div className="card" style={{ padding: '32px', marginBottom: '40px', background: '#ffffff' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--primary)', marginBottom: '20px' }}>
              Quy Trình Sản Xuất Khép Kín An Đông
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              {(product.processSteps || []).map((step, idx) => (
                <div key={idx} style={{
                  background: 'var(--bg-main)',
                  padding: '18px',
                  borderRadius: '14px',
                  border: '1px solid var(--border-color)',
                  position: 'relative'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'var(--primary)',
                    color: 'var(--golden-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '800',
                    fontSize: '0.85rem',
                    marginBottom: '10px'
                  }}>
                    {step.step || idx + 1}
                  </div>
                  <h4 style={{ fontSize: '0.98rem', color: 'var(--primary)', marginBottom: '6px' }}>{step.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 5. CHỨNG NHẬN CHẤT LƯỢNG & DOANH NGHIỆP */}
          <div style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--bg-dark) 100%)',
            borderRadius: '24px',
            padding: '36px',
            color: '#ffffff'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', alignItems: 'center' }}>
              <div>
                <div className="badge badge-gold" style={{ marginBottom: '10px' }}>
                  CHỨNG NHẬN & TIÊU CHUẨN
                </div>
                <h3 style={{ color: 'var(--golden-pale)', fontSize: '1.4rem', marginBottom: '12px' }}>
                  Hồ Sơ An Toàn Thực Phẩm
                </h3>
                <p style={{ color: '#d1e3d9', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '16px' }}>
                  Mọi sản phẩm của An Đông đều được kiểm định nghiêm ngặt theo các tiêu chuẩn quốc tế và quốc gia:
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {(product.certifications || []).map((cert, idx) => (
                    <div key={idx} style={{ background: 'rgba(255,255,255,0.1)', padding: '8px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)' }}>
                      <div style={{ color: 'var(--golden-light)', fontWeight: '700', fontSize: '0.9rem' }}>{cert.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#d1e3d9' }}>Mã: {cert.code}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Company Quick Contact */}
              <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--golden-light)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>
                  ĐƠN VỊ SẢN XUẤT & PHÂN PHỐI
                </div>
                <h4 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '10px' }}>
                  CÔNG TY TNHH An Đông
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#b7c4bd', margin: '0 0 6px' }}>
                  Ấp Long Thành, xã Phước Long, tỉnh Cà Mau.
                </p>
                <p style={{ fontSize: '0.85rem', color: '#b7c4bd', margin: '0 0 12px' }}>
                  Điện thoại: <strong style={{ color: 'var(--golden-light)' }}>0944 852 464</strong>
                </p>
                <p style={{ fontSize: '0.85rem', color: '#b7c4bd', margin: '0 0 12px' }}>
                  Email: andongfood@gmail.com
                </p>
                <div style={{ fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--golden-light)' }}>
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
