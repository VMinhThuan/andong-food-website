import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import RiceHorizonDivider from '../components/common/RiceHorizonDivider';
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
    <div className="login-page" style={{ backgroundColor: 'var(--bg-main)', minHeight: '85vh' }}>
      <section style={{
        background: 'linear-gradient(135deg, var(--bg-dark) 0%, var(--primary) 100%)',
        color: '#ffffff',
        padding: '50px 0 70px',
        textAlign: 'center'
      }}>
        <div className="container">
          <div className="badge badge-gold" style={{ marginBottom: '10px' }}>
            CỔNG QUẢN TRỊ
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: 'var(--golden-pale)' }}>
            Đăng Nhập Quản Trị
          </h1>
          <p style={{ color: '#d1e3d9', fontSize: '0.95rem' }}>
            Cổng quản lý danh mục sản phẩm dành cho Quản trị viên An Đông
          </p>
        </div>
      </section>

      <RiceHorizonDivider />

      <section style={{ padding: '40px 20px 80px' }}>
        <div style={{ maxWidth: '440px', margin: '0 auto' }}>
          <div className="card" style={{ padding: '36px', backgroundColor: '#ffffff' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <img
                src={LogoDoc}
                alt="Logo An Đông"
                style={{ height: '90px', objectFit: 'contain', marginBottom: '12px' }}
              />
              <h2 style={{ fontSize: '1.2rem', color: 'var(--primary)', fontWeight: '700', marginTop: '6px' }}>HỆ THỐNG PORTAL</h2>
            </div>

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
                    placeholder="Tên đăng nhập quản trị"
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
      </section>
    </div>
  );
}
