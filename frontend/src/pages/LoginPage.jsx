import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, UserCheck, Lock, User, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import RiceHorizonDivider from '../components/common/RiceHorizonDivider';

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

  const handleQuickFill = (u, p) => {
    setUsername(u);
    setPassword(p);
  };

  return (
    <div className="login-page" style={{ backgroundColor: '#faf9f5', minHeight: '85vh' }}>
      <section style={{
        background: 'linear-gradient(135deg, #081c15 0%, #1b4332 100%)',
        color: '#ffffff',
        padding: '50px 0 70px',
        textAlign: 'center'
      }}>
        <div className="container">
          <div className="badge badge-gold" style={{ marginBottom: '10px' }}>
            HỆ THỐNG NỘI BỘ
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#fefae0' }}>
            Đăng Nhập Quản Trị & Nhân Viên
          </h1>
          <p style={{ color: '#d1e3d9', fontSize: '0.95rem' }}>
            Cổng làm việc dành cho Quản trị viên (Admin) và Nhân viên CSKH An Đông Food
          </p>
        </div>
      </section>

      <RiceHorizonDivider />

      <section style={{ padding: '40px 20px 80px' }}>
        <div style={{ maxWidth: '440px', margin: '0 auto' }}>
          <div className="card" style={{ padding: '36px', backgroundColor: '#ffffff' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <img
                src="/assets/logo-gao.png"
                alt="Logo An Đông"
                style={{ height: '56px', objectFit: 'contain', marginBottom: '12px' }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <h2 style={{ fontSize: '1.35rem', color: '#1b4332' }}>An Đông Food Portal</h2>
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
                <label className="form-label">Tên Đăng Nhập / Email</label>
                <div style={{ position: 'relative' }}>
                  <User size={18} color="#859b8f" style={{ position: 'absolute', top: '13px', left: '14px' }} />
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="admin hoặc nhanvien"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    style={{ paddingLeft: '40px' }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Mật Khẩu</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} color="#859b8f" style={{ position: 'absolute', top: '13px', left: '14px' }} />
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

            {/* Quick Demo Accounts Helper */}
            <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid #e4e0d4' }}>
              <div style={{ fontSize: '0.8rem', color: '#859b8f', fontWeight: '700', marginBottom: '10px', textTransform: 'uppercase' }}>
                Tài Khoản Mẫu Thử Nghiệm (2 Roles):
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => handleQuickFill('admin', 'admin123')}
                  className="btn btn-outline-white btn-sm"
                  style={{
                    backgroundColor: '#faf9f5',
                    color: '#1b4332',
                    border: '1px solid #e4e0d4',
                    justifyContent: 'space-between',
                    textAlign: 'left'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShieldCheck size={16} color="#1b4332" /> <strong>Role Admin:</strong> admin / admin123
                  </span>
                  <ArrowRight size={14} />
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickFill('nhanvien', 'staff123')}
                  className="btn btn-outline-white btn-sm"
                  style={{
                    backgroundColor: '#faf9f5',
                    color: '#1b4332',
                    border: '1px solid #e4e0d4',
                    justifyContent: 'space-between',
                    textAlign: 'left'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <UserCheck size={16} color="#40916c" /> <strong>Role Nhân Viên:</strong> nhanvien / staff123
                  </span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
