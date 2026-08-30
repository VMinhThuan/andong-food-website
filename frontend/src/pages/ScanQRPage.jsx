import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, Search, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import CameraScanner from '../components/common/CameraScanner';
import { api } from '../services/api';

export default function ScanQRPage() {
  const [manualCode, setManualCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleManualSearch = async (e) => {
    e.preventDefault();
    if (!manualCode.trim()) return;

    setLoading(true);
    setError('');

    try {
      const product = await api.verifyQR(manualCode.trim());
      if (product && product.slug) {
        navigate(`/san-pham/${product.slug}`);
      } else {
        setError('Không tìm thấy sản phẩm có mã này. Vui lòng thử lại.');
      }
    } catch (err) {
      setError(err.message || 'Mã không tồn tại hoặc không chính xác.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="scan-qr-page" style={{ backgroundColor: 'var(--bg-main)', minHeight: '80vh' }}>
      {/* Header */}
      <section style={{
        background: 'linear-gradient(135deg, var(--bg-dark) 0%, var(--primary) 100%)',
        color: '#ffffff',
        padding: '50px 0 70px',
        textAlign: 'center'
      }}>
        <div className="container">
          <div className="badge badge-gold" style={{ marginBottom: '12px' }}>
            CÔNG CỤ TRUY XUẤT
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: 'var(--golden-pale)', marginBottom: '12px' }}>
            Quét Mã QR Trên Bao Bì Gạo An Đông
          </h1>
          <p style={{ fontSize: '1rem', color: '#d1e3d9', maxWidth: '600px', margin: '0 auto' }}>
            Sử dụng camera điện thoại hoặc tải ảnh chụp mã QR để truy xuất thông tin nguồn gốc, giống lúa và quy trình chế biến.
          </p>
        </div>
      </section>

      <section style={{ padding: '50px 0 80px' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          {/* Live Camera Scanner Box */}
          <CameraScanner />

          {/* Alternative: Enter Product Code Manually */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            padding: '28px',
            marginTop: '32px',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--primary)', marginBottom: '12px', textAlign: 'center' }}>
              Hoặc nhập mã sản phẩm / đường dẫn thủ công:
            </h3>

            <form onSubmit={handleManualSearch} style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                placeholder="Ví dụ: AD-ST25-01 hoặc gao-st25"
                value={manualCode}
                onChange={e => setManualCode(e.target.value)}
                style={{
                  flex: 1,
                  padding: '12px 18px',
                  borderRadius: '9999px',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ padding: '12px 24px' }}
              >
                {loading ? 'Đang tìm...' : <Search size={18} />}
              </button>
            </form>

            {error && (
              <div style={{
                marginTop: '14px',
                padding: '10px 14px',
                backgroundColor: '#ffebee',
                borderRadius: '10px',
                color: '#c62828',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            {/* Quick Demo links */}
            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-color)', fontSize: '0.85rem', color: '#526058' }}>
              <span>Thử tra cứu nhanh sản phẩm mẫu:</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => navigate('/san-pham/gao-st25')}
                  className="btn btn-outline btn-sm"
                >
                  🌾 Gạo ST25 (AD-ST25-01)
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/san-pham/gao-vuong-tom')}
                  className="btn btn-outline btn-sm"
                >
                  🌾 Gạo Vuông Tôm (AD-VT-02)
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
