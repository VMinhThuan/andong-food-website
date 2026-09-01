import React, { useState, useEffect } from 'react';
import { Phone, Copy, Check, MessageSquare, ExternalLink, X, Clock, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export function triggerHotlineModal(e) {
  if (e && typeof e.preventDefault === 'function') {
    e.preventDefault();
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-hotline-modal'));
  }
}

/**
 * Hotline & Order Consultation Popup Modal
 * Thay thế hoàn toàn thông báo localhost / hộp thoại Open Phone của trình duyệt
 */
export default function HotlineModal({ isOpen: controlledIsOpen, onClose: controlledOnClose }) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const phoneNumber = '0944 852 464';
  const rawPhone = '0944852464';

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const onClose = controlledOnClose || (() => setInternalIsOpen(false));

  useEffect(() => {
    const handleGlobalOpen = () => setInternalIsOpen(true);
    window.addEventListener('open-hotline-modal', handleGlobalOpen);
    return () => window.removeEventListener('open-hotline-modal', handleGlobalOpen);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(rawPhone).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 25, 15, 0.72)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        padding: '20px'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          backgroundColor: '#FFFDF9',
          borderRadius: '28px',
          maxWidth: '460px',
          width: '100%',
          padding: '32px 28px',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(200, 223, 210, 0.4)',
          position: 'relative',
          animation: 'modalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          border: '2px solid #EFE6D5'
        }}
      >
        {/* Nút Đóng */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: 'none',
            border: 'none',
            color: '#666666',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#F5EFE6',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#EAE0D0'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#F5EFE6'; }}
          aria-label="Đóng"
        >
          <X size={18} />
        </button>

        {/* Icon & Tiêu đề */}
        <div style={{ textAlign: 'center', marginBottom: '22px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#119C4A',
              backgroundImage: 'linear-gradient(135deg, #13A850 0%, #0D833D 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 14px',
              boxShadow: '0 8px 24px rgba(17, 156, 74, 0.32)'
            }}
          >
            <Phone size={28} />
          </div>

          <div style={{ fontSize: '0.8rem', fontWeight: '800', color: '#9E5A00', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>
            AN ĐÔNG FOOD
          </div>
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.45rem',
              fontWeight: '800',
              color: 'var(--brand-brown, #4A2E14)',
              margin: 0,
              lineHeight: 1.3
            }}
          >
            Liên Hệ Đặt Hàng & Tư Vấn
          </h3>
        </div>

        {/* Khung Số Điện Thoại Nổi Bật */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            padding: '18px 20px',
            border: '1.5px solid #EAE0D0',
            boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
            marginBottom: '20px',
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: '0.82rem', color: '#6A726D', marginBottom: '6px', fontWeight: '500' }}>
            Hotline Đặt Hàng & Đại Lý (24/7)
          </div>
          <div
            style={{
              fontSize: '1.75rem',
              fontWeight: '900',
              color: '#0D833D',
              letterSpacing: '1px',
              fontFamily: 'var(--font-sans)',
              marginBottom: '12px'
            }}
          >
            {phoneNumber}
          </div>

          <button
            onClick={handleCopy}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: copied ? '#E7F8AB' : '#F4F7F4',
              color: copied ? '#095C2C' : '#2A4A38',
              border: '1px solid ' + (copied ? '#A8DB6F' : '#D0DFD5'),
              padding: '8px 18px',
              borderRadius: '9999px',
              fontSize: '0.86rem',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {copied ? <Check size={16} color="#095C2C" /> : <Copy size={16} />}
            <span>{copied ? 'Đã sao chép số!' : 'Sao chép số điện thoại'}</span>
          </button>
        </div>

        {/* Các Lựa Chọn Hành Động */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
          {/* Nút Gọi Ngay */}
          <a
            href={`tel:${rawPhone}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              backgroundColor: '#119C4A',
              backgroundImage: 'linear-gradient(135deg, #13A850 0%, #0D833D 100%)',
              color: '#ffffff',
              padding: '13px 20px',
              borderRadius: '14px',
              fontWeight: '700',
              fontSize: '0.96rem',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(17, 156, 74, 0.28)',
              transition: 'transform 0.2s ease'
            }}
          >
            <Phone size={18} />
            <span>Gọi ngay tới Hotline</span>
          </a>

          {/* Nút Chat Zalo */}
          <a
            href={`https://zalo.me/${rawPhone}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              backgroundColor: '#0068FF',
              color: '#ffffff',
              padding: '13px 20px',
              borderRadius: '14px',
              fontWeight: '700',
              fontSize: '0.96rem',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(0, 104, 255, 0.24)',
              transition: 'transform 0.2s ease'
            }}
          >
            <MessageSquare size={18} />
            <span>Nhắn tin qua Zalo</span>
            <ExternalLink size={15} style={{ opacity: 0.8 }} />
          </a>

          {/* Nút Gửi Yêu Cầu */}
          <Link
            to="/lien-he"
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              backgroundColor: '#F7F4EC',
              color: '#5C3A1E',
              border: '1px solid #E2D9C8',
              padding: '12px 20px',
              borderRadius: '14px',
              fontWeight: '700',
              fontSize: '0.94rem',
              textDecoration: 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <span>Để lại thông tin tư vấn báo giá</span>
          </Link>
        </div>

        {/* Footer ghi chú nhỏ */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.78rem', color: '#77847C' }}>
          <Clock size={14} />
          <span>Hỗ trợ tư vấn 8:00 – 20:00 (Tất cả các ngày trong tuần)</span>
        </div>
      </div>
    </div>
  );
}
