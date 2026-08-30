import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
const LogoDoc = '/assets/brand-element/AD_LOGO%20D%E1%BB%8CC.svg';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(username, password);
      navigate('/quan-tri');
    } catch (err) {
      setError(err.message || 'Tài khoản hoặc mật khẩu không chính xác.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // Trang tiện ích nội bộ, không phải trang marketing: bỏ hero gradient tối +
    // pill nhãn (công thức đang lặp lại ở mọi trang khác) và bỏ luôn dải sóng
    // trang trí RiceHorizonDivider. Một khối duy nhất, căn giữa màn hình, chỉ
    // có một điểm nhấn là viền vàng mỏng phía trên thẻ đăng nhập.
    <div className="login-page" style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '48px 20px' }}>
      <div style={{ maxWidth: '400px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <img
            src={LogoDoc}
            alt="Logo An Đông"
            style={{ height: '64px', objectFit: 'contain', marginBottom: '18px' }}
          />
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--primary)', margin: '0 0 6px' }}>
            Cổng Làm Việc Nội Bộ
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-light)', margin: 0 }}>
            Dành cho Quản trị viên và Nhân viên CSKH An Đông
          </p>
        </div>

        {/* backgroundColor bỏ khỏi style inline vì đè lên background: var(--bg-card)
            của class .card (inline có độ ưu tiên cao hơn) — vô hiệu hoá fix chói thẻ trắng */}
        <div className="card" style={{ padding: '32px', borderTop: '3px solid var(--golden-light)' }}>

            {error && (
              <div style={{
                padding: '12px 14px',
                backgroundColor: '#ffebee',
                border: '1px solid #ffcdd2',
                borderRadius: '10px',
                color: '#c62828',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '18px'
              }}>
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label className="form-label">Tên đăng nhập hoặc email</label>
                <div style={{ position: 'relative' }}>
                  <User size={18} color="var(--text-light)" style={{ position: 'absolute', top: '13px', left: '14px' }} />
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="Nhập tài khoản được cấp"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    style={{ paddingLeft: '40px' }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Mật Khẩu</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} color="var(--text-light)" style={{ position: 'absolute', top: '13px', left: '14px' }} />
                  <input
                    type="password"
                    required
                    className="form-control"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{ paddingLeft: '40px' }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ width: '100%', padding: '14px', marginTop: '10px' }}
              >
                {loading ? 'Đang xác thực...' : 'Đăng Nhập Hệ Thống'}
              </button>
            </form>

          </div>
        </div>
      </div>
  );
}
