import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner, Html5Qrcode } from 'html5-qrcode';
import { Camera, Image as ImageIcon, CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CameraScanner({ onScanSuccess }) {
  const [scanResult, setScanResult] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isScanning, setIsScanning] = useState(true);
  const fileInputRef = useRef(null);
  const scannerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const scannerId = "qr-reader-container";
    
    // Only init if element exists
    const element = document.getElementById(scannerId);
    if (!element) return;

    try {
      const html5QrcodeScanner = new Html5QrcodeScanner(
        scannerId,
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          rememberLastUsedCamera: true,
          aspectRatio: 1.0
        },
        false
      );

      html5QrcodeScanner.render(
        (decodedText) => {
          handleSuccess(decodedText);
          html5QrcodeScanner.clear();
        },
        (error) => {
          // Continuous scan error, ignore
        }
      );

      scannerRef.current = html5QrcodeScanner;
    } catch (err) {
      console.warn("Scanner init warning:", err);
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(err => console.error("Scanner clear error", err));
      }
    };
  }, []);

  const handleSuccess = (text) => {
    setScanResult(text);
    setIsScanning(false);
    
    if (onScanSuccess) {
      onScanSuccess(text);
      return;
    }

    // Auto navigate if it's product link
    if (text.includes('/san-pham/')) {
      const parts = text.split('/san-pham/');
      const slug = parts[1].split(/[?#]/)[0];
      setTimeout(() => {
        navigate(`/san-pham/${slug}`);
      }, 800);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const html5QrCode = new Html5Qrcode("qr-file-processor");
    html5QrCode.scanFile(file, true)
      .then(decodedText => {
        handleSuccess(decodedText);
      })
      .catch(err => {
        setErrorMsg('Không tìm thấy mã QR hợp lệ trong ảnh này. Vui lòng chụp rõ mã hơn.');
        setTimeout(() => setErrorMsg(''), 4000);
      });
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        padding: '24px',
        boxShadow: 'var(--shadow-md)',
        border: '1px solid var(--border-color)',
        textAlign: 'center'
      }}>
        <div style={{ marginBottom: '16px' }}>
          <div className="badge badge-green" style={{ marginBottom: '8px' }}>
            <Camera size={14} /> MÁY QUÉT TRỰC TIẾP
          </div>
          <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)' }}>
            Hướng Camera vào mã QR trên bao bì
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#526058' }}>
            Hệ thống sẽ tự động nhận diện và chuyển hướng đến trang thông tin xuất xứ sản phẩm.
          </p>
        </div>

        {/* Live scanner box */}
        <div id="qr-reader-container" style={{ width: '100%', borderRadius: '16px', overflow: 'hidden' }}></div>
        <div id="qr-file-processor" style={{ display: 'none' }}></div>

        {/* Success message */}
        {scanResult && (
          <div style={{
            marginTop: '16px',
            padding: '14px',
            backgroundColor: '#e8f5e9',
            border: '1px solid #c8e6c9',
            borderRadius: '12px',
            color: 'var(--primary)',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            justifyContent: 'center'
          }}>
            <CheckCircle size={18} color="#2d6a4f" />
            <span>Đã quét thành công! Đang chuyển hướng...</span>
          </div>
        )}

        {/* Error message */}
        {errorMsg && (
          <div style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#ffebee',
            border: '1px solid #ffcdd2',
            borderRadius: '12px',
            color: '#c62828',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            justifyContent: 'center'
          }}>
            <AlertTriangle size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Alternative: Upload photo from device */}
        <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
          <p style={{ fontSize: '0.85rem', color: '#526058', marginBottom: '10px' }}>
            Hoặc tải ảnh chụp bao bì từ thư viện:
          </p>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="btn btn-outline btn-sm"
            style={{ width: '100%' }}
          >
            <ImageIcon size={16} /> Chọn ảnh có chứa mã QR
          </button>
        </div>
      </div>
    </div>
  );
}
