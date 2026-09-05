import React, { lazy, Suspense, useState, useEffect, useRef } from 'react';
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
import RiceHorizonDivider from '../components/common/RiceHorizonDivider';
import { triggerHotlineModal } from '../components/common/HotlineModal';
import SEO from '../components/common/SEO';

import VoGaoStep1 from '../assets/brand/vogao-step1.png';
import ThemNuocStep2 from '../assets/brand/themnuoc-step2.png';
import NauComStep3 from '../assets/brand/naucom-step3.png';
import ThuongThucStep4 from '../assets/brand/thuongthuc-step4.png';

import STChinhDien from '../assets/optimized/st-chinhdien.webp';
import VTChinhDien from '../assets/optimized/vt-chinhdien.webp';

const COOKING_STEP_ICONS = {
  1: VoGaoStep1,
  2: ThemNuocStep2,
  3: NauComStep3,
  4: ThuongThucStep4,
  '01': VoGaoStep1,
  '02': ThemNuocStep2,
  '03': NauComStep3,
  '04': ThuongThucStep4
};

const QRModal = lazy(() => import('../components/common/QRModal'));

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [selectedFace, setSelectedFace] = useState('front'); // 'front' | 'chinhDien' | 'back'
  const [isPackagingLoading, setIsPackagingLoading] = useState(false);
  const packagingRequestRef = useRef(0);

  const isSt25 = product?.slug?.includes('st25') || product?.code?.includes('ST25');
  const defaultChinhDien = isSt25 ? STChinhDien : VTChinhDien;

  const getPackagingImage = (face) => {
    const images = product?.images || {};
    if (face === 'chinhDien') {
      return images.chinhDien || defaultChinhDien || images.front || images.main || '';
    }
    if (face === 'back') {
      return images.back || images.main || '';
    }
    return images.front || images.main || '';
  };

  const changePackagingFace = (nextFace) => {
    if (nextFace === selectedFace || isPackagingLoading) return;

    const imageSrc = getPackagingImage(nextFace);
    const requestId = ++packagingRequestRef.current;
    setIsPackagingLoading(true);

    const image = new Image();
    const finish = () => {
      if (requestId !== packagingRequestRef.current) return;
      setSelectedFace(nextFace);
      window.setTimeout(() => {
        if (requestId === packagingRequestRef.current) setIsPackagingLoading(false);
      }, 180);
    };

    image.onload = finish;
    image.onerror = finish;
    image.src = imageSrc;
  };

  useEffect(() => {
    setProduct(null);
    setError('');
    setSelectedFace('front');
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

  const packagingImage = getPackagingImage(selectedFace);
  const seoImage = product.images?.ecom || product.images?.chinhDien || product.images?.front || product.images?.main;

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: seoImage,
    description: product.summary,
    sku: product.code,
    brand: {
      '@type': 'Brand',
      name: 'An Đông Food'
    },
    offers: {
      '@type': 'Offer',
      url: `https://www.andofood.vn/san-pham/${product.slug}`,
      priceCurrency: 'VND',
      availability: product.inStock !== false ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'An Đông Food'
      }
    }
  };

  return (
    <div className="product-detail-page" style={{ backgroundColor: 'var(--bg-main)' }}>
      <SEO
        title={`${product.name} – Gạo Sạch Chuẩn Giống`}
        description={product.summary || 'Gạo ngon chuẩn giống An Đông, gửi trọn an lòng trong từng bữa cơm gia đình.'}
        keywords={`${product.name}, Gạo ${product.name}, Gạo An Đông, Mua gạo sạch, Gạo đặc sản`}
        image={seoImage}
        type="product"
        schema={productSchema}
      />
      {/* Breadcrumb */}
      <div className="product-breadcrumb" style={{ backgroundColor: 'var(--primary)', color: 'var(--golden-pale)', padding: '12px 0', fontSize: '0.85rem' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link to="/" style={{ color: '#d1e3d9', textDecoration: 'none' }}>Trang Chủ</Link>
            <ChevronRight size={14} />
            <Link to="/san-pham" style={{ color: '#d1e3d9', textDecoration: 'none' }}>Sản Phẩm</Link>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--golden-light)', fontWeight: '600' }}>{product.name}</span>
          </div>
        </div>
      </div>

      {/* PRODUCT HERO & OVERVIEW */}
      <section className="product-detail-section" style={{ padding: '32px 0 64px' }}>
        <div className="container">
          <div className="qr-landing-card product-hero-card" style={{ padding: '28px', marginBottom: '36px', boxShadow: '0 14px 38px rgba(17, 67, 40, 0.07)' }}>
            <div className="product-hero-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '52px',
              alignItems: 'center'
            }}>
              {/* Product Image on Packaging Frame */}
              <div className="product-packaging-column" style={{ textAlign: 'center', position: 'relative' }}>
                <div className="product-packaging-frame" style={{
                  backgroundColor: 'var(--bg-main)',
                  borderRadius: '20px',
                  padding: '24px',
                  position: 'relative',
                  border: '1px solid var(--border-color)'
                }}>
                  <div className="product-packaging-image" style={{
                    position: 'relative',
                    height: '430px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '10px',
                    overflow: 'hidden'
                  }}>
                    <img
                      src={packagingImage}
                      alt={product.name}
                      fetchPriority="high"
                      decoding="async"
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

                  {/* Thanh chuyển đổi các góc nhìn bao bì: Mặt Trước - Chính Diện - Mặt Sau */}
                  <div style={{
                    display: 'inline-flex', alignSelf: 'center', justifyContent: 'center', gap: '4px',
                    margin: '16px auto', padding: '4px', borderRadius: '9999px',
                    backgroundColor: '#eef5f0', border: '1px solid #d8e8dd'
                  }}>
                    <button
                      type="button"
                      onClick={() => changePackagingFace('front')}
                      disabled={isPackagingLoading}
                      style={{
                        padding: '8px 18px',
                        borderRadius: '9999px',
                        border: 'none',
                        backgroundColor: selectedFace === 'front' ? '#11994A' : '#ffffff',
                        color: selectedFace === 'front' ? '#ffffff' : '#2D3748',
                        fontWeight: '700',
                        fontSize: '0.82rem',
                        cursor: isPackagingLoading ? 'wait' : 'pointer',
                        transition: 'all 0.2s', outline: 'none',
                        boxShadow: selectedFace === 'front' ? '0 2px 6px rgba(17,153,74,0.25)' : 'none',
                        opacity: isPackagingLoading ? 0.7 : 1
                      }}
                    >
                      Mặt Trước
                    </button>
                    <button
                      type="button"
                      onClick={() => changePackagingFace('chinhDien')}
                      disabled={isPackagingLoading}
                      style={{
                        padding: '8px 18px',
                        borderRadius: '9999px',
                        border: 'none',
                        backgroundColor: selectedFace === 'chinhDien' ? '#11994A' : '#ffffff',
                        color: selectedFace === 'chinhDien' ? '#ffffff' : '#2D3748',
                        fontWeight: '700',
                        fontSize: '0.82rem',
                        cursor: isPackagingLoading ? 'wait' : 'pointer',
                        transition: 'all 0.2s', outline: 'none',
                        boxShadow: selectedFace === 'chinhDien' ? '0 2px 6px rgba(17,153,74,0.25)' : 'none',
                        opacity: isPackagingLoading ? 0.7 : 1
                      }}
                    >
                      Chính Diện
                    </button>
                    <button
                      type="button"
                      onClick={() => changePackagingFace('back')}
                      disabled={isPackagingLoading}
                      style={{
                        padding: '8px 18px',
                        borderRadius: '9999px',
                        border: 'none',
                        backgroundColor: selectedFace === 'back' ? '#11994A' : '#ffffff',
                        color: selectedFace === 'back' ? '#ffffff' : '#2D3748',
                        fontWeight: '700',
                        fontSize: '0.82rem',
                        cursor: isPackagingLoading ? 'wait' : 'pointer',
                        transition: 'all 0.2s', outline: 'none',
                        boxShadow: selectedFace === 'back' ? '0 2px 6px rgba(17,153,74,0.25)' : 'none',
                        opacity: isPackagingLoading ? 0.7 : 1
                      }}
                    >
                      Mặt Sau
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="product-overview">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  {product.categoryName && <span className="badge badge-green">{product.categoryName}</span>}
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

                {/* Only fields provided by the product record are shown. */}
                <div className="product-key-specs" style={{
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
                  {product.expiry && <div>
                    <span style={{ color: 'var(--text-light)' }}>Hạn sử dụng:</span>
                    <div style={{ fontWeight: '700', color: 'var(--primary)' }}>{product.expiry}</div>
                  </div>}
                  {product.originCountry && <div>
                    <span style={{ color: 'var(--text-light)' }}>Xuất xứ:</span>
                    <div style={{ fontWeight: '700', color: 'var(--primary)' }}>{product.originCountry} / {product.originCountryEn}</div>
                  </div>}
                </div>

                {/* Giá Niêm Yết & Giá Khuyến Mãi */}
                <div style={{
                  backgroundColor: '#FFFDF2',
                  border: '1.5px solid #F0DFB6',
                  borderRadius: '16px',
                  padding: '16px 20px',
                  marginBottom: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '0.88rem', color: '#7E6852', fontWeight: '600' }}>Giá niêm yết:</span>
                    <span style={{
                      fontSize: '1.05rem',
                      color: '#94A3B8',
                      textDecoration: 'line-through',
                      fontWeight: '600'
                    }}>
                      {((product.originalPrice || product.listedPrice || (product.slug === 'gao-st25' ? 259000 : 249000))).toLocaleString('vi-VN')} ₫
                    </span>
                    <span style={{
                      backgroundColor: '#FEE2E2',
                      color: '#DC2626',
                      fontSize: '0.72rem',
                      fontWeight: '800',
                      padding: '2px 8px',
                      borderRadius: '999px',
                      letterSpacing: '0.5px'
                    }}>
                      TIẾT KIỆM {Math.round((1 - ((product.promotionalPrice || (product.slug === 'gao-st25' ? 215000 : 195000)) / (product.originalPrice || (product.slug === 'gao-st25' ? 259000 : 249000)))) * 100)}%
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{
                      fontSize: 'clamp(1.75rem, 2.5vw, 2.1rem)',
                      fontWeight: '800',
                      color: '#11994A',
                      fontFamily: 'var(--font-sans)',
                      lineHeight: 1
                    }}>
                      {((product.promotionalPrice || product.price || (product.slug === 'gao-st25' ? 215000 : 195000))).toLocaleString('vi-VN')} ₫
                    </span>
                    <span style={{ fontSize: '0.92rem', color: '#55655D', fontWeight: '600' }}>
                      / {product.unit || 'túi 5kg'}
                    </span>
                  </div>
                </div>

                {/* Hotline & Order consultation */}
                <div className="product-order-actions" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  <a href="tel:0944852464" onClick={triggerHotlineModal} className="btn btn-primary btn-lg" style={{ flex: 1, cursor: 'pointer' }}>
                    Điện thoại đặt hàng: 0944 852 464
                  </a>
                  <Link to="/lien-he" className="btn btn-outline btn-lg">
                    Tư Vấn Đại Lý
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <ProductFacts product={product} />

        </div>
      </section>

      {/* QR Modal */}
      {isQRModalOpen && <Suspense fallback={null}><QRModal
        product={product}
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
      /></Suspense>}
    </div>
  );
}

function ProductFacts({ product }) {
  const section = { padding: 'clamp(22px, 4vw, 36px)', marginBottom: '32px', background: '#fff', borderRadius: '24px', border: '1px solid #e7e0d2', boxShadow: '0 10px 30px rgba(27,67,50,.055)' };
  const heading = { fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.35rem, 2.5vw, 1.75rem)', color: 'var(--primary)', margin: '0 0 8px' };
  const subtitle = { fontSize: '.82rem', color: '#aa7a2d', fontWeight: 800, letterSpacing: '.08em', marginBottom: '10px' };
  const row = { padding: '15px 18px', borderBottom: '1px solid #eee8dc', verticalAlign: 'top', lineHeight: 1.65 };
  const infoRows = [
    ['THÀNH PHẦN / INGREDIENTS', [product.ingredients, product.ingredientsEn].filter(Boolean).join('\n')],
    ['HẠN SỬ DỤNG / EXPIRY DATE', [product.expiry, product.expiryEn].filter(Boolean).join('\n')],
    ['BẢO QUẢN / STORAGE', [product.storageGuide, product.storageGuideEn].filter(Boolean).join('\n')],
    ['CẢNH BÁO / NOTICE', [product.notice, product.noticeEn].filter(Boolean).join('\n')],
    ['XUẤT XỨ / ORIGIN', [product.originCountry, product.originCountryEn].filter(Boolean).join(' / ')],
    ['MÃ VẠCH / BARCODE', product.barcode]
  ].filter(([, value]) => value);
  // Section "THÀNH PHẦN DINH DƯỠNG / NUTRITION INFORMATION" tạm đóng theo yêu cầu (2026-09).
  // Bỏ comment dòng dưới + block <section> tương ứng bên dưới để bật lại.
  // const nutritionRows = [['Năng lượng / Calories', product.nutrition?.energy], ['Đạm / Total Protein', product.nutrition?.protein], ['Chất béo / Total Fat', product.nutrition?.fat], ['Carbohydrate', product.nutrition?.carbohydrate]].filter(([, value]) => value);
  return <>
    <section className="product-facts-section" style={section}>
      <h3 style={heading}>HƯỚNG DẪN NẤU / COOKING INSTRUCTIONS</h3>

      {/* Khung hướng dẫn nấu dạng bảng ngang liền mạch chuẩn Ảnh 2 */}
      <div
        style={{
          marginTop: '28px',
          padding: 'clamp(28px, 4vw, 44px) clamp(20px, 3vw, 36px)',
          background: '#FFFDF0',
          border: '3.5px solid #EAA838',
          borderRadius: '32px',
          boxShadow: '0 10px 35px rgba(234, 168, 56, 0.1)'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'clamp(24px, 3vw, 38px)',
            alignItems: 'start'
          }}
        >
          {(product.cookingSteps || []).map((step, idx) => {
            const stepNum = Number(step.step) || (idx + 1);
            const iconSrc = COOKING_STEP_ICONS[stepNum] || COOKING_STEP_ICONS[step.step];
            return (
              <div
                key={step.step}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center'
                }}
              >
                {/* 1. Header: Số thứ tự vàng + Tiêu đề Việt & Anh (Căn sát trái) */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', gap: '10px', minHeight: '56px', width: '100%', textAlign: 'left' }}>
                  <span
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: '50%',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#EAA838',
                      color: '#ffffff',
                      fontWeight: 800,
                      fontSize: '1.05rem',
                      flexShrink: 0,
                      marginTop: '1px'
                    }}
                  >
                    {step.step}
                  </span>
                  <div>
                    <div style={{ color: '#4A2E14', fontWeight: 800, fontSize: '1.22rem', lineHeight: 1.15, letterSpacing: '0.2px' }}>
                      {step.viTitle || step.titleVi}
                    </div>
                    <div style={{ color: '#8C7355', fontSize: '0.86rem', fontWeight: 600, marginTop: '3px' }}>
                      {step.enTitle || step.titleEn}
                    </div>
                  </div>
                </div>

                {/* 2. Icon Minh Họa Cực Kỳ To Rõ Ở Giữa (Căn đều hàng) */}
                {iconSrc && (
                  <div
                    style={{
                      margin: '12px 0 16px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '180px',
                      width: '100%',
                      overflow: 'hidden'
                    }}
                  >
                    <img
                      src={iconSrc}
                      alt={step.viTitle || `Bước ${step.step}`}
                      style={{
                        height: '160px',
                        maxWidth: '220px',
                        width: 'auto',
                        objectFit: 'contain',
                        mixBlendMode: 'multiply',
                        transform: 'scale(3.6)',
                        transformOrigin: 'center center',
                        display: 'block'
                      }}
                    />
                  </div>
                )}

                {/* 3. Nội dung Tiếng Việt (Cố định chiều cao minHeight để thẳng hàng tăm tắp) */}
                <div style={{ minHeight: '75px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', width: '100%', marginBottom: '8px' }}>
                  <p style={{ margin: 0, color: '#4A2E14', fontWeight: 700, lineHeight: 1.5, fontSize: 'clamp(0.96rem, 1.1vw, 1.05rem)' }}>
                    {step.vi || step.descVi}
                  </p>
                </div>

                {/* 4. Nội dung Tiếng Anh (Cố định chiều cao minHeight) */}
                <div style={{ minHeight: '60px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', width: '100%' }}>
                  <p style={{ margin: 0, color: '#8A7563', fontSize: 'clamp(0.84rem, 0.95vw, 0.9rem)', lineHeight: 1.45, fontWeight: 500 }}>
                    {step.en || step.descEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
    {/* Section "THÀNH PHẦN DINH DƯỠNG / NUTRITION INFORMATION" tạm đóng theo yêu cầu (2026-09) — bỏ comment để bật lại:
    <section className="product-facts-section" style={section}><div style={subtitle}>GIÁ TRỊ THAM KHẢO TRÊN 100 G</div><h3 style={heading}>THÀNH PHẦN DINH DƯỠNG / NUTRITION INFORMATION</h3><div className="product-nutrition-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginTop: '24px' }}>{nutritionRows.map(([label, value], index) => <div key={label} style={{ padding: '20px', background: index % 2 ? '#fffaf0' : '#f0f7f2', borderRadius: '16px', border: '1px solid #e5e2d5' }}><div style={{ color: '#68776f', fontSize: '.82rem', lineHeight: 1.4, minHeight: 36 }}>{label}</div><div style={{ color: 'var(--primary)', fontSize: '1.35rem', fontWeight: 800, marginTop: 8 }}>{value}</div></div>)}</div></section>
    */}
    <section className="product-facts-section" style={section}><h3 style={heading}>{product.name} / THÔNG TIN SẢN PHẨM</h3><div className="product-info-table" style={{ overflowX: 'auto', marginTop: '24px', border: '1px solid #e9e2d4', borderRadius: '16px' }}><table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 650 }}><thead><tr style={{ background: '#f5f0e4' }}><th style={{ ...row, color: 'var(--primary)', fontSize: '.8rem', letterSpacing: '.05em' }}>HẠNG MỤC</th><th style={{ ...row, color: 'var(--primary)', fontSize: '.8rem', letterSpacing: '.05em' }}>NỘI DUNG</th></tr></thead><tbody>{infoRows.map(([label, value], index) => <tr key={label} style={{ background: index % 2 ? '#fffdf9' : '#fff' }}><td style={{ ...row, color: '#765a2e', fontWeight: 800, fontSize: '.84rem', width: '34%' }}>{label}</td><td style={{ ...row, whiteSpace: 'pre-line', color: 'var(--text-muted)' }}>{value}</td></tr>)}</tbody></table></div></section>
  </>;
}
