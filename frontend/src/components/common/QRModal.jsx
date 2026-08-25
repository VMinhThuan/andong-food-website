import React, { useState, useEffect } from 'react';
import { X, Download, QrCode, CheckCircle, ExternalLink, Printer } from 'lucide-react';
import QRCode from 'qrcode';

export default function QRModal({ product, isOpen, onClose }) {
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (product) {
      const url = `${window.location.origin}/san-pham/${product.slug}`;
      QRCode.toDataURL(url, {
        width: 600,
        margin: 2,
        color: {
          dark: '#1b4332',
          light: '#ffffff'
        }
      }).then(dataUrl => setQrDataUrl(dataUrl));
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const productUrl = `${window.location.origin}/san-pham/${product.slug}`;

  const handleDownloadPNG = () => {
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `QR-Bao-Bi-AnDong-${product.slug}.png`;
    link.click();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(productUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(8, 28, 21, 0.75)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        maxWidth: '520px',
        width: '100%',
        padding: '32px',
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
            background: '#f0f4f1',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={20} color="#1b4332" />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div className="badge badge-gold" style={{ marginBottom: '8px' }}>
            MÃ QR TRUY XUẤT BAO BÌ
          </div>
          <h3 style={{ fontSize: '1.4rem', color: '#1b4332', marginBottom: '6px' }}>
            {product.name}
          </h3>
          <p style={{ fontSize: '0.88rem', color: '#526058' }}>
            Mã sản phẩm: <strong>{product.code}</strong>
          </p>
        </div>

        {/* QR Code Canvas Frame */}
        <div style={{
          backgroundColor: '#faf9f5',
          border: '2px dashed #d4a373',
          borderRadius: '16px',
          padding: '20px',
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
              style={{ width: '220px', height: '220px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
            />
          ) : (
            <div style={{ height: '220px', display: 'flex', alignItems: 'center' }}>Đang tạo mã QR...</div>
          )}

          <div style={{ marginTop: '12px', fontSize: '0.8rem', color: '#2d6a4f', fontWeight: '600', textAlign: 'center' }}>
            🌾 Khách hàng quét mã trên bao bì sẽ vào thẳng trang chi tiết này
          </div>
        </div>

        {/* URL Box */}
        <div style={{
          backgroundColor: '#f4f6f4',
          borderRadius: '10px',
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px',
          fontSize: '0.85rem'
        }}>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '320px', color: '#1b4332' }}>
            {productUrl}
          </span>
          <button
            onClick={handleCopyLink}
            style={{
              background: 'none',
              border: 'none',
              color: '#2d6a4f',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            {copied ? <CheckCircle size={15} color="#2d6a4f" /> : <ExternalLink size={15} />}
            {copied ? 'Đã chép' : 'Sao chép'}
          </button>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <button
            onClick={handleDownloadPNG}
            className="btn btn-primary"
            style={{ width: '100%', fontSize: '0.9rem' }}
          >
            <Download size={16} /> Tải Ảnh In Bao Bì
          </button>
          <button
            onClick={() => window.print()}
            className="btn btn-outline"
            style={{ width: '100%', fontSize: '0.9rem' }}
          >
            <Printer size={16} /> In Trực Tiếp
          </button>
        </div>
      </div>
    </div>
  );
}
