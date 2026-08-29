import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';

export default function QRModal({ product, isOpen, onClose }) {
  const [qrDataUrl, setQrDataUrl] = useState('');

  useEffect(() => {
    if (product?.qrCodeDataUrl) {
      setQrDataUrl(product.qrCodeDataUrl);
    } else if (product) {
      const url = `${window.location.origin}/san-pham/${product.slug}`;
      QRCode.toDataURL(url, {
        width: 600,
        margin: 2,
        color: {
          dark: '#171717',
          light: '#ffffff'
        }
      }).then(dataUrl => setQrDataUrl(dataUrl));
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleDownloadPNG = () => {
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `QR-Bao-Bi-AnDong-${product.slug}.png`;
    link.click();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.66)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        maxWidth: '440px',
        width: '100%',
        padding: '28px',
        boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
        position: 'relative',
        animation: 'fadeIn 0.3s ease'
      }}>
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'transparent',
            border: 'none',
            borderRadius: '50%',
            padding: '4px 8px', cursor: 'pointer',
            color: '#171717', fontSize: '1.7rem', lineHeight: 1
          }}
          aria-label="Đóng"
        >
          ×
        </button>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.4rem', color: '#171717', marginBottom: '6px' }}>
            {product.name}
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Mã sản phẩm: <strong>{product.code}</strong>
          </p>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid var(--border-color)',
          borderRadius: '14px',
          padding: '18px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt={`QR Code ${product.name}`}
              style={{ width: '220px', height: '220px', display: 'block' }}
            />
          ) : (
            <div style={{ height: '220px', display: 'flex', alignItems: 'center' }}>Đang tạo mã QR...</div>
          )}

          <div style={{ marginTop: '12px', fontSize: '0.82rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            Quét mã để xem thông tin sản phẩm.
          </div>
        </div>

        <button
          onClick={handleDownloadPNG}
          style={{
            width: '100%', marginTop: '18px', fontSize: '0.9rem', border: 'none',
            borderRadius: '9999px', padding: '13px 18px', backgroundColor: '#171717', color: '#ffffff',
            fontWeight: '700', cursor: 'pointer'
          }}
        >
          Tải mã QR
        </button>
      </div>
    </div>
  );
}
