import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Package,
  MessageSquare,
  Users,
  QrCode,
  Building,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  Clock,
  Download,
  Printer,
  ShieldCheck,
  UserCheck,
  LogOut,
  Save,
  X,
  ExternalLink,
  Eye
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import QRModal from '../components/common/QRModal';

export default function AdminDashboardPage() {
  const { user, logout, isAdmin, isStaff } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modals & Forms
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    code: '',
    name: '',
    slug: '',
    categoryName: 'Gạo Đặc Sản Thượng Hạng',
    tagline: '',
    summary: '',
    price: 35000,
    unit: 'kg',
    packSizes: '2kg, 5kg, 10kg',
    expiry: '12 tháng',
    packaging: 'Túi hút chân không cao cấp'
  });

  const [selectedQRProduct, setSelectedQRProduct] = useState(null);

  // User form
  const [newUserForm, setNewUserForm] = useState({
    username: '',
    password: '',
    fullName: '',
    email: '',
    role: 'staff'
  });

  useEffect(() => {
    if (!user) {
      navigate('/dang-nhap');
      return;
    }
    loadData();
  }, [user]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [prodRes, contactRes, compRes] = await Promise.all([
        api.getProducts(),
        api.getContacts(),
        api.getCompanyProfile()
      ]);
      setProducts(prodRes);
      setContacts(contactRes);
      setCompany(compRes);

      if (isAdmin) {
        const usersRes = await api.getUsers();
        setUsersList(usersRes);
      }
    } catch (err) {
      console.error('Error loading admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenProductModal = (prod = null) => {
    if (prod) {
      setEditingProduct(prod);
      setProductForm({
        code: prod.code || '',
        name: prod.name || '',
        slug: prod.slug || '',
        categoryName: prod.categoryName || 'Gạo Đặc Sản Thượng Hạng',
        tagline: prod.tagline || '',
        summary: prod.summary || '',
        price: prod.price || 35000,
        unit: prod.unit || 'kg',
        packSizes: Array.isArray(prod.packSizes) ? prod.packSizes.join(', ') : (prod.packSizes || '2kg, 5kg'),
        expiry: prod.expiry || '12 tháng',
        packaging: prod.packaging || 'Túi hút chân không'
      });
    } else {
      setEditingProduct(null);
      setProductForm({
        code: 'AD-RICE-' + Math.floor(100 + Math.random() * 900),
        name: '',
        slug: '',
        categoryName: 'Gạo Đặc Sản Thượng Hạng',
        tagline: '100% Chuẩn Giống Thuần Nông',
        summary: '',
        price: 30000,
        unit: 'kg',
        packSizes: '2kg, 5kg, 10kg',
        expiry: '12 tháng',
        packaging: 'Túi hút chân không cao cấp'
      });
    }
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...productForm,
        packSizes: productForm.packSizes.split(',').map(s => s.trim()).filter(Boolean)
      };

      if (editingProduct) {
        await api.updateProduct(editingProduct.id || editingProduct._id, payload);
      } else {
        await api.createProduct(payload);
      }
      setIsProductModalOpen(false);
      loadData();
    } catch (err) {
      alert(err.message || 'Lỗi khi lưu sản phẩm');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi hệ thống?')) return;
    try {
      await api.deleteProduct(id);
      loadData();
    } catch (err) {
      alert(err.message || 'Lỗi khi xóa sản phẩm');
    }
  };

  const handleUpdateContactStatus = async (id, status) => {
    try {
      await api.updateContactStatus(id, status);
      loadData();
    } catch (err) {
      alert('Lỗi cập nhật trạng thái');
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await api.createUser(newUserForm);
      setNewUserForm({ username: '', password: '', fullName: '', email: '', role: 'staff' });
      alert('Tạo tài khoản nhân viên thành công!');
      loadData();
    } catch (err) {
      alert(err.message || 'Lỗi tạo tài khoản');
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Xóa tài khoản này?')) return;
    try {
      await api.deleteUser(id);
      loadData();
    } catch (err) {
      alert(err.message || 'Lỗi xóa tài khoản');
    }
  };

  return (
    <div className="admin-dashboard-page" style={{ backgroundColor: 'var(--bg-main)', minHeight: '90vh', padding: '30px 0 80px' }}>
      <div className="container">
        {/* Top User Badge & Role Banner */}
        <div style={{
          backgroundColor: 'var(--primary)',
          borderRadius: '20px',
          padding: '24px 30px',
          color: '#ffffff',
          marginBottom: '30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              backgroundColor: 'var(--golden-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--bg-dark)',
              fontWeight: '800',
              fontSize: '1.4rem'
            }}>
              {isAdmin ? <ShieldCheck size={28} /> : <UserCheck size={28} />}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '1.4rem', color: 'var(--golden-pale)', margin: 0 }}>{user?.fullName}</h2>
                <span className={isAdmin ? 'badge badge-gold' : 'badge badge-green'}>
                  {isAdmin ? 'QUẢN TRỊ VIÊN (ADMIN)' : 'NHÂN VIÊN (STAFF)'}
                </span>
              </div>
              <div style={{ fontSize: '0.85rem', color: '#d1e3d9', marginTop: '4px' }}>
                Email: {user?.email} • Quyền hạn: {isAdmin ? 'Toàn quyền cấu hình & quản lý' : 'Xem sản phẩm & Xử lý CSKH'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to="/" className="btn btn-outline-white btn-sm">
              <Eye size={16} /> Xem Trang Web
            </Link>
            <button onClick={() => { logout(); navigate('/'); }} className="btn btn-gold btn-sm">
              <LogOut size={16} /> Đăng Xuất
            </button>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          marginBottom: '24px',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '12px'
        }}>
          <button
            onClick={() => setActiveTab('products')}
            style={{
              padding: '10px 20px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: activeTab === 'products' ? 'var(--primary)' : '#ffffff',
              color: activeTab === 'products' ? '#ffffff' : 'var(--text-muted)',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Package size={18} /> Quản Lý Sản Phẩm ({products.length})
          </button>

          <button
            onClick={() => setActiveTab('contacts')}
            style={{
              padding: '10px 20px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: activeTab === 'contacts' ? 'var(--primary)' : '#ffffff',
              color: activeTab === 'contacts' ? '#ffffff' : 'var(--text-muted)',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <MessageSquare size={18} /> CSKH & Yêu Cầu Liên Hệ ({contacts.length})
          </button>

          <button
            onClick={() => setActiveTab('qr')}
            style={{
              padding: '10px 20px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: activeTab === 'qr' ? 'var(--primary)' : '#ffffff',
              color: activeTab === 'qr' ? '#ffffff' : 'var(--text-muted)',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <QrCode size={18} /> Xuất QR In Bao Bì
          </button>

          {isAdmin && (
            <button
              onClick={() => setActiveTab('users')}
              style={{
                padding: '10px 20px',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: activeTab === 'users' ? 'var(--primary)' : '#ffffff',
                color: activeTab === 'users' ? '#ffffff' : 'var(--text-muted)',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Users size={18} /> Tài Khoản Nội Bộ ({usersList.length})
            </button>
          )}
        </div>

        {/* TAB 1: PRODUCT MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="card" style={{ padding: '28px', backgroundColor: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--primary)', margin: 0 }}>Danh Sách Sản Phẩm An Đông</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', margin: '4px 0 0' }}>Mỗi sản phẩm có 1 mã định danh QR phục vụ dán lên bao bì.</p>
              </div>

              {(isAdmin || isStaff) && (
                <button onClick={() => handleOpenProductModal()} className="btn btn-primary btn-sm">
                  <Plus size={16} /> Thêm Sản Phẩm Mới
                </button>
              )}
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--bg-main)', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                    <th style={{ padding: '12px 16px' }}>Mã SP</th>
                    <th style={{ padding: '12px 16px' }}>Tên Sản Phẩm</th>
                    <th style={{ padding: '12px 16px' }}>Danh Mục</th>
                    <th style={{ padding: '12px 16px' }}>Quy Cách</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center' }}>Mã QR</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right' }}>Thao Tác</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(prod => (
                    <tr key={prod.id || prod.slug} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '14px 16px', fontWeight: '700', color: 'var(--primary)' }}>{prod.code}</td>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ fontWeight: '600', color: 'var(--primary)' }}>{prod.name}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>slug: {prod.slug}</div>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span className="badge badge-green" style={{ fontSize: '0.75rem' }}>{prod.categoryName || 'Gạo An Đông'}</span>
                      </td>
                      <td style={{ padding: '14px 16px' }}>{prod.packSizes?.join(', ') || '2kg, 5kg'}</td>
                      <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                        <button
                          onClick={() => setSelectedQRProduct(prod)}
                          className="btn btn-outline btn-sm"
                          style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                        >
                          <QrCode size={14} /> Xem QR
                        </button>
                      </td>
                      <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                          <Link to={`/san-pham/${prod.slug}`} className="btn btn-outline btn-sm" style={{ padding: '6px 10px' }} title="Xem trực tiếp">
                            <ExternalLink size={14} />
                          </Link>
                          {(isAdmin || isStaff) && (
                            <button
                              onClick={() => handleOpenProductModal(prod)}
                              className="btn btn-outline btn-sm"
                              style={{ padding: '6px 10px' }}
                              title="Sửa thông tin"
                            >
                              <Edit2 size={14} />
                            </button>
                          )}
                          {isAdmin && (
                            <button
                              onClick={() => handleDeleteProduct(prod.id || prod._id)}
                              className="btn btn-outline btn-sm"
                              style={{ padding: '6px 10px', color: '#c62828', borderColor: '#ffcdd2' }}
                              title="Xóa sản phẩm"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: CONTACTS & CSKH */}
        {activeTab === 'contacts' && (
          <div className="card" style={{ padding: '28px', backgroundColor: '#ffffff' }}>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--primary)', margin: 0 }}>Yêu Cầu Liên Hệ & CSKH</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', margin: '4px 0 0' }}>
                Tiếp nhận yêu cầu mua sỉ, tư vấn mở đại lý và phản hồi chất lượng từ khách hàng.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {contacts.map(c => (
                <div key={c.id || c._id} style={{
                  backgroundColor: 'var(--bg-main)',
                  borderRadius: '16px',
                  padding: '20px',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '16px'
                }}>
                  <div style={{ flex: 1, minWidth: '280px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <strong style={{ fontSize: '1.05rem', color: 'var(--primary)' }}>{c.fullName}</strong>
                      <span style={{ fontSize: '0.85rem', color: 'var(--earth-brown)', fontWeight: '700' }}>📞 {c.phone}</span>
                      {c.company && <span style={{ fontSize: '0.8rem', background: '#e8f5e9', padding: '2px 8px', borderRadius: '4px' }}>🏢 {c.company}</span>}
                    </div>

                    <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--primary)', marginBottom: '6px' }}>
                      Chủ đề: {c.subject}
                    </div>

                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: '0 0 10px', lineHeight: 1.6 }}>
                      {c.message}
                    </p>

                    <div style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>
                      Ngày gửi: {new Date(c.createdAt).toLocaleString('vi-VN')} {c.email && `• Email: ${c.email}`}
                    </div>
                  </div>

                  {/* Status update controls */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        onClick={() => handleUpdateContactStatus(c.id || c._id, 'pending')}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '8px',
                          border: 'none',
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          backgroundColor: c.status === 'pending' ? '#ff9800' : '#eeeeee',
                          color: c.status === 'pending' ? '#ffffff' : '#526058',
                          cursor: 'pointer'
                        }}
                      >
                        Chờ Xử Lý
                      </button>
                      <button
                        onClick={() => handleUpdateContactStatus(c.id || c._id, 'processing')}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '8px',
                          border: 'none',
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          backgroundColor: c.status === 'processing' ? '#2196f3' : '#eeeeee',
                          color: c.status === 'processing' ? '#ffffff' : '#526058',
                          cursor: 'pointer'
                        }}
                      >
                        Đang Tư Vấn
                      </button>
                      <button
                        onClick={() => handleUpdateContactStatus(c.id || c._id, 'completed')}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '8px',
                          border: 'none',
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          backgroundColor: c.status === 'completed' ? '#4caf50' : '#eeeeee',
                          color: c.status === 'completed' ? '#ffffff' : '#526058',
                          cursor: 'pointer'
                        }}
                      >
                        Hoàn Thành
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: BATCH QR EXPORTER */}
        {activeTab === 'qr' && (
          <div className="card" style={{ padding: '28px', backgroundColor: '#ffffff' }}>
            <div style={{ marginBottom: '24px' }}>
              <div className="badge badge-gold" style={{ marginBottom: '6px' }}>BỘ TẠO & XUẤT QR IN ẤN BAO BÌ</div>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--primary)', margin: 0 }}>Xuất Mã QR Cho Đơn Vị In Bao Bì</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>
                Tải ảnh mã QR độ phân giải cao (1200px / Vector SVG) gửi cho nhà in bao bì để in trực tiếp lên các loại bao gạo An Đông.
              </p>
            </div>

            <div className="grid-3">
              {products.map(prod => (
                <div key={prod.id || prod.slug} className="card" style={{ padding: '20px', textAlign: 'center', background: 'var(--bg-main)' }}>
                  <div style={{ fontWeight: '700', color: 'var(--primary)', fontSize: '1.05rem', marginBottom: '4px' }}>
                    {prod.name}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginBottom: '14px' }}>
                    Mã: {prod.code}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button
                      onClick={() => setSelectedQRProduct(prod)}
                      className="btn btn-outline btn-sm"
                    >
                      <QrCode size={16} /> Xem & Kiểm Tra
                    </button>
                    <a
                      href={api.getDownloadQRPNGUrl(prod.slug)}
                      className="btn btn-primary btn-sm"
                      download
                    >
                      <Download size={16} /> Tải PNG (1200px)
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: USER MANAGEMENT (ADMIN ONLY) */}
        {isAdmin && activeTab === 'users' && (
          <div className="card" style={{ padding: '28px', backgroundColor: '#ffffff' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
              {/* List of accounts */}
              <div>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '16px' }}>Danh Sách Tài Khoản Hệ Thống</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {usersList.map(u => (
                    <div key={u.id || u._id} style={{
                      padding: '14px 18px',
                      borderRadius: '12px',
                      backgroundColor: 'var(--bg-main)',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div>
                        <div style={{ fontWeight: '700', color: 'var(--primary)' }}>{u.fullName}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>
                          @{u.username} • {u.email}
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className={u.role === 'admin' ? 'badge badge-gold' : 'badge badge-green'} style={{ fontSize: '0.75rem' }}>
                          {u.role}
                        </span>
                        {u.id !== user.id && (
                          <button
                            onClick={() => handleDeleteUser(u.id || u._id)}
                            style={{ background: 'none', border: 'none', color: '#c62828', cursor: 'pointer' }}
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Create staff user form */}
              <div style={{ backgroundColor: 'var(--bg-main)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--primary)', marginBottom: '16px' }}>Thêm Tài Khoản Nhân Viên</h3>
                <form onSubmit={handleCreateUser}>
                  <div className="form-group">
                    <label className="form-label">Tên Đăng Nhập</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      placeholder="nv_cskh_02"
                      value={newUserForm.username}
                      onChange={e => setNewUserForm({ ...newUserForm, username: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Họ và Tên</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      placeholder="Trần Thị Lan"
                      value={newUserForm.fullName}
                      onChange={e => setNewUserForm({ ...newUserForm, fullName: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      required
                      className="form-control"
                      placeholder="lan.tran@andongfood.vn"
                      value={newUserForm.email}
                      onChange={e => setNewUserForm({ ...newUserForm, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Mật Khẩu</label>
                    <input
                      type="password"
                      required
                      className="form-control"
                      placeholder="••••••••"
                      value={newUserForm.password}
                      onChange={e => setNewUserForm({ ...newUserForm, password: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Vai Trò (Role)</label>
                    <select
                      className="form-control"
                      value={newUserForm.role}
                      onChange={e => setNewUserForm({ ...newUserForm, role: e.target.value })}
                    >
                      <option value="staff">Nhân Viên (Staff - Xem SP & CSKH)</option>
                      <option value="admin">Quản Trị Viên (Admin - Full quyền)</option>
                    </select>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    Tạo Tài Khoản Mới
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Product Add/Edit Modal */}
      {isProductModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(10, 51, 26, 0.7)',
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
            maxWidth: '620px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '32px',
            position: 'relative'
          }}>
            <button
              onClick={() => setIsProductModalOpen(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'var(--bg-main)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>

            <h3 style={{ fontSize: '1.3rem', color: 'var(--primary)', marginBottom: '20px' }}>
              {editingProduct ? 'Chỉnh Sửa Thông Tin Sản Phẩm' : 'Thêm Sản Phẩm Mới Vào Hệ Thống'}
            </h3>

            <form onSubmit={handleSaveProduct}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Mã SP *</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    value={productForm.code}
                    onChange={e => setProductForm({ ...productForm, code: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Tên Sản Phẩm *</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="Gạo ST25 An Đông Thượng Hạng"
                    value={productForm.name}
                    onChange={e => setProductForm({ ...productForm, name: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Danh Mục</label>
                <input
                  type="text"
                  className="form-control"
                  value={productForm.categoryName}
                  onChange={e => setProductForm({ ...productForm, categoryName: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Thông Điệp Ngắn (Tagline)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Gạo Ngon Chuẩn Giống – Gửi Trọn An Lòng"
                  value={productForm.tagline}
                  onChange={e => setProductForm({ ...productForm, tagline: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Mô Tả Sản Phẩm</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={productForm.summary}
                  onChange={e => setProductForm({ ...productForm, summary: e.target.value })}
                ></textarea>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Quy Cách Đóng Gói</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="2kg, 5kg, 10kg"
                    value={productForm.packSizes}
                    onChange={e => setProductForm({ ...productForm, packSizes: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Hạn Sử Dụng</label>
                  <input
                    type="text"
                    className="form-control"
                    value={productForm.expiry}
                    onChange={e => setProductForm({ ...productForm, expiry: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" onClick={() => setIsProductModalOpen(false)} className="btn btn-outline">
                  Hủy Bỏ
                </button>
                <button type="submit" className="btn btn-primary">
                  <Save size={16} /> Lưu Sản Phẩm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QR Modal */}
      <QRModal
        product={selectedQRProduct}
        isOpen={Boolean(selectedQRProduct)}
        onClose={() => setSelectedQRProduct(null)}
      />
    </div>
  );
}
