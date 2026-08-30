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
const MatTruocBaoBi = '/assets/brand-element/M%E1%BA%B6T%20TR%C6%AF%E1%BB%9AC%20BAO%20B%C3%8C.png';
const MatSauBaoBi = '/assets/brand-element/M%E1%BA%B6T%20SAU%20BAO%20B%C3%8C.png';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
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
    setProduct(null);
    setError('');
    setLoading(true);
    api.getProductBySlug(slug)
      .then(data => {
        setProduct(data);
      })
      .catch(err => {
        setError(err.message || 'Không tìm thấy sản phẩm.');
      })
      .finally(() => setLoading(false));
  }, [slug, location.key]);

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

  return (
    <div className="product-detail-page" style={{ backgroundColor: 'var(--bg-main)' }}>
      {/* Breadcrumb */}
      <div className="product-breadcrumb" style={{ backgroundColor: 'var(--primary)', color: 'var(--golden-pale)', padding: '12px 0', fontSize: '0.85rem' }}>
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
              <div className="product-overview">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  {product.categoryName && <span className="badge badge-green">{product.categoryName}</span>}
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

                {/* Hotline & Order consultation */}
                <div className="product-order-actions" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
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

          <ProductFacts product={product} />

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

function ProductFacts({ product }) {
  const section = { padding: 'clamp(22px, 4vw, 36px)', marginBottom: '32px', background: 'var(--bg-card)', borderRadius: '24px', border: '1px solid var(--border-color)', boxShadow: '0 10px 30px rgba(27,67,50,.055)' };
  const heading = { fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.35rem, 2.5vw, 1.75rem)', color: 'var(--primary)', margin: '0 0 8px' };
  const subtitle = { fontSize: '.82rem', color: '#aa7a2d', fontWeight: 800, letterSpacing: '.08em', marginBottom: '10px' };
  const row = { padding: '15px 18px', borderBottom: '1px solid #eee8dc', verticalAlign: 'top', lineHeight: 1.65 };
  const infoRows = [
    ['THÀNH PHẦN / INGREDIENTS', [product.ingredients, product.ingredientsEn].filter(Boolean).join('\n')],
    ['HẠN SỬ DỤNG / EXPIRY DATE', [product.expiry, product.expiryEn].filter(Boolean).join('\n')],
    ['SỐ CB / DECLARATION NO.', product.declarationNo],
    ['BẢO QUẢN / STORAGE', [product.storageGuide, product.storageGuideEn].filter(Boolean).join('\n')],
    ['CẢNH BÁO / NOTICE', [product.notice, product.noticeEn].filter(Boolean).join('\n')],
    ['NSX / PRODUCTION DATE', '________________________________'],
    ['XUẤT XỨ / ORIGIN', [product.originCountry, product.originCountryEn].filter(Boolean).join(' / ')],
    ['MÃ VẠCH / BARCODE', product.barcode]
  ].filter(([, value]) => value);
  const nutritionRows = [['Năng lượng / Calories', product.nutrition?.energy], ['Đạm / Total Protein', product.nutrition?.protein], ['Chất béo / Total Fat', product.nutrition?.fat], ['Carbohydrate', product.nutrition?.carbohydrate]].filter(([, value]) => value);
  return <>
    <section className="product-facts-section" style={section}><div style={subtitle}>CÁCH NẤU GẠO ĐÚNG VỊ</div><h3 style={heading}>HƯỚNG DẪN NẤU / COOKING INSTRUCTIONS</h3><div className="product-facts-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(245px, 1fr))', gap: '14px', marginTop: '24px' }}>{(product.cookingSteps || []).map(step => <article key={step.step} style={{ padding: '20px', borderRadius: '18px', background: 'linear-gradient(145deg,#fffdf6,#f7f2e5)', border: '1px solid #e8ddc5' }}><div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}><span style={{ width: 34, height: 34, borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'var(--primary)', color: '#fff', fontWeight: 800 }}>{step.step}</span><div style={{ color: 'var(--primary)', fontWeight: 800 }}>{step.viTitle || step.titleVi}</div></div><p style={{ margin: '0 0 14px', color: 'var(--text-muted)', lineHeight: 1.65 }}>{step.vi || step.descVi}</p><div style={{ borderTop: '1px dashed #d8cba9', paddingTop: 12, color: '#8a6a37', fontWeight: 800, fontSize: '.78rem', letterSpacing: '.04em' }}>{step.enTitle || step.titleEn}</div><p style={{ margin: '6px 0 0', color: '#6d746f', fontSize: '.9rem', lineHeight: 1.55 }}>{step.en || step.descEn}</p></article>)}</div></section>
    <section className="product-facts-section" style={section}><div style={subtitle}>GIÁ TRỊ THAM KHẢO TRÊN 100 G</div><h3 style={heading}>THÀNH PHẦN DINH DƯỠNG / NUTRITION INFORMATION</h3><div className="product-nutrition-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginTop: '24px' }}>{nutritionRows.map(([label, value], index) => <div key={label} style={{ padding: '20px', background: index % 2 ? '#fffaf0' : '#f0f7f2', borderRadius: '16px', border: '1px solid #e5e2d5' }}><div style={{ color: '#68776f', fontSize: '.82rem', lineHeight: 1.4, minHeight: 36 }}>{label}</div><div style={{ color: 'var(--primary)', fontSize: '1.35rem', fontWeight: 800, marginTop: 8 }}>{value}</div></div>)}</div></section>
    <section className="product-facts-section" style={section}><div style={subtitle}>MINH BẠCH THÔNG TIN</div><h3 style={heading}>{product.name} / THÔNG TIN SẢN PHẨM</h3><div className="product-info-table" style={{ overflowX: 'auto', marginTop: '24px', border: '1px solid #e9e2d4', borderRadius: '16px' }}><table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 650 }}><thead><tr style={{ background: '#f5f0e4' }}><th style={{ ...row, color: 'var(--primary)', fontSize: '.8rem', letterSpacing: '.05em' }}>HẠNG MỤC</th><th style={{ ...row, color: 'var(--primary)', fontSize: '.8rem', letterSpacing: '.05em' }}>NỘI DUNG</th></tr></thead><tbody>{infoRows.map(([label, value], index) => <tr key={label} style={{ background: index % 2 ? '#fffdf9' : '#fff' }}><td style={{ ...row, color: '#765a2e', fontWeight: 800, fontSize: '.84rem', width: '34%' }}>{label}</td><td style={{ ...row, whiteSpace: 'pre-line', color: 'var(--text-muted)' }}>{value}</td></tr>)}</tbody></table></div></section>
    <section className="product-facts-section product-manufacturer-section" style={{ ...section, background: 'linear-gradient(135deg,#148d48,#064523)', border: 0, color: '#fff' }}><div style={{ ...subtitle, color: '#f7bb27' }}>AN ĐÔNG FOOD</div><h3 style={{ ...heading, color: '#fff' }}>THÔNG TIN NHÀ SẢN XUẤT / MANUFACTURER</h3><div className="product-manufacturer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px', marginTop: 24 }}><div style={{ padding: '20px', border: '1px solid rgba(255,255,255,.18)', borderRadius: 16, background: 'rgba(255,255,255,.08)' }}><b style={{ fontSize: '1.1rem' }}>{product.manufacturer?.name}</b><p style={{ margin: '14px 0 5px', color: '#d6eadc' }}>{product.manufacturer?.address}</p><p style={{ margin: 0, color: '#d6eadc' }}>{product.manufacturer?.addressEn}</p></div><div style={{ padding: '20px', border: '1px solid rgba(255,255,255,.18)', borderRadius: 16, background: 'rgba(255,255,255,.08)' }}><div style={{ color: '#d6eadc', marginBottom: 10 }}>Email: <b style={{ color: '#fff' }}>{product.manufacturer?.email}</b></div><div style={{ color: '#d6eadc' }}>Điện thoại / Phone: <b style={{ color: '#f7bb27' }}>{product.manufacturer?.phone}</b></div></div></div></section>
  </>;
}
