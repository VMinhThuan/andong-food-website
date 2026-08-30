import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Edit3, ExternalLink, ImagePlus, LoaderCircle, LogOut, Plus, Save, ShieldAlert, Trash2, X } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

const emptyProduct = {
  code: '', name: '', nameEn: '', slug: '', categoryName: '', summary: '', summaryEn: '',
  ingredients: '', ingredientsEn: '', expiry: '', expiryEn: '', declarationNo: '', barcode: '',
  originCountry: '', originCountryEn: '', images: { main: '', front: '', back: '' }
};

const imageSlots = [['main', 'Ảnh đại diện *'], ['front', 'Ảnh mặt trước bao bì'], ['back', 'Ảnh mặt sau bao bì']];

function toDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Không thể đọc tệp ảnh.'));
    reader.readAsDataURL(file);
  });
}

export default function AdminDashboardPage() {
  const { user, logout, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState(emptyProduct);
  const [newImages, setNewImages] = useState({});
  const [saving, setSaving] = useState(false);

  const isOpen = editingProduct !== null;
  const sortedProducts = useMemo(() => [...products].sort((a, b) => a.name.localeCompare(b.name, 'vi')), [products]);
  const loadProducts = async () => {
    setLoading(true);
    try { setProducts(await api.getProducts()); }
    catch (err) { setError(err.message || 'Không thể tải danh sách sản phẩm.'); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    if (!authLoading && !user) navigate('/dang-nhap', { replace: true });
    if (user && isAdmin) loadProducts();
  }, [authLoading, user, isAdmin]);

  const openCreate = () => { setEditingProduct({}); setForm(emptyProduct); setNewImages({}); setError(''); };
  const openEdit = (product) => {
    setEditingProduct(product);
    setForm({ ...emptyProduct, ...product, images: { ...emptyProduct.images, ...(product.images || {}) } });
    setNewImages({}); setError('');
  };
  const closeModal = () => { if (!saving) setEditingProduct(null); };

  const chooseImage = async (slot, file) => {
    if (!file) return;
    if (!file.type.match(/^image\/(jpeg|png|webp|svg\+xml)$/)) return setError('Chỉ hỗ trợ ảnh JPG, PNG, WebP hoặc SVG.');
    if (file.size > 6 * 1024 * 1024) return setError('Ảnh tối đa 6 MB.');
    try {
      const dataUrl = await toDataUrl(file);
      setNewImages((current) => ({ ...current, [slot]: { dataUrl } }));
      setError('');
    } catch (err) { setError(err.message); }
  };

  const saveProduct = async (event) => {
    event.preventDefault(); setSaving(true); setError(''); setNotice('');
    try {
      const images = { ...form.images };
      for (const [slot, value] of Object.entries(newImages)) {
        const uploaded = await api.uploadProductImage(value.dataUrl, `${form.slug || form.name || 'san-pham'}-${slot}`);
        images[slot] = uploaded.url;
      }
      const payload = { ...form, images };
      if (editingProduct?.id || editingProduct?._id) {
        await api.updateProduct(editingProduct.id || editingProduct._id, payload);
        setNotice('Đã cập nhật sản phẩm và ảnh Cloudinary.');
      } else {
        await api.createProduct(payload);
        setNotice('Đã thêm sản phẩm và lưu ảnh trên Cloudinary.');
      }
      setEditingProduct(null); await loadProducts();
    } catch (err) { setError(err.message || 'Không thể lưu sản phẩm.'); }
    finally { setSaving(false); }
  };

  const deleteProduct = async (product) => {
    if (!window.confirm(`Xóa “${product.name}”? Thao tác này không thể hoàn tác.`)) return;
    try { await api.deleteProduct(product.id || product._id); setNotice('Đã xóa sản phẩm.'); await loadProducts(); }
    catch (err) { setError(err.message || 'Không thể xóa sản phẩm.'); }
  };

  if (authLoading || (user && isAdmin && loading)) return <div className="admin-loading"><LoaderCircle size={28} /> Đang tải quản trị…</div>;
  if (!user || !isAdmin) return <main className="admin-denied"><ShieldAlert size={36} /><h1>Không có quyền truy cập</h1><p>Trang quản trị sản phẩm chỉ dành cho tài khoản Admin.</p><button className="btn btn-primary" onClick={() => { logout(); navigate('/dang-nhap'); }}>Đăng nhập tài khoản Admin</button></main>;

  return <main className="admin-portal">
    <header className="admin-portal__header"><div><span className="admin-portal__eyebrow">AN ĐÔNG FOOD · ADMIN</span><h1>Quản lý sản phẩm</h1><p>Thêm, chỉnh sửa, xóa sản phẩm và ảnh được lưu trên Cloudinary.</p></div><div className="admin-portal__header-actions"><a className="btn btn-outline" href="https://www.andofood.vn" target="_blank" rel="noreferrer"><ExternalLink size={16} /> Xem website</a><button className="btn btn-gold" onClick={() => { logout(); navigate('/dang-nhap'); }}><LogOut size={16} /> Đăng xuất</button></div></header>
    <section className="admin-portal__toolbar"><div><strong>{products.length}</strong> sản phẩm trong danh mục</div><button className="btn btn-primary" onClick={openCreate}><Plus size={18} /> Thêm sản phẩm</button></section>
    {notice && <p className="admin-alert admin-alert--success">{notice}</p>}{error && !isOpen && <p className="admin-alert admin-alert--error">{error}</p>}
    <section className="admin-product-list">{sortedProducts.map((product) => <article className="admin-product-card" key={product.id || product._id}><img src={product.images?.main} alt="" /><div className="admin-product-card__content"><span>{product.code}</span><h2>{product.name}</h2><p>{product.slug}</p></div><div className="admin-product-card__actions"><Link className="btn btn-outline btn-sm" to={`/san-pham/${product.slug}`} target="_blank"><ExternalLink size={15} /></Link><button className="btn btn-outline btn-sm" onClick={() => openEdit(product)}><Edit3 size={15} /> Sửa</button><button className="admin-delete" onClick={() => deleteProduct(product)} aria-label={`Xóa ${product.name}`}><Trash2 size={17} /></button></div></article>)}{!products.length && <p className="admin-empty">Chưa có sản phẩm nào.</p>}</section>
    {isOpen && <div className="admin-modal-backdrop" role="presentation"><section className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="product-form-title"><button className="admin-modal__close" onClick={closeModal} disabled={saving}><X size={19} /></button><h2 id="product-form-title">{editingProduct?.id || editingProduct?._id ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</h2><p>Chỉ điền thông tin đã được xác thực. Ảnh mới sẽ tải lên Cloudinary khi lưu.</p>{error && <p className="admin-alert admin-alert--error">{error}</p>}
      <form onSubmit={saveProduct} className="admin-product-form"><div className="admin-form-grid"><Field label="Mã sản phẩm *" value={form.code} required onChange={(code) => setForm({ ...form, code })} /><Field label="Tên sản phẩm *" value={form.name} required onChange={(name) => setForm({ ...form, name })} /></div><div className="admin-form-grid"><Field label="Slug" hint="Nếu để trống, hệ thống tạo từ tên sản phẩm." value={form.slug} onChange={(slug) => setForm({ ...form, slug })} /><Field label="Tên tiếng Anh" value={form.nameEn} onChange={(nameEn) => setForm({ ...form, nameEn })} /></div><Field label="Mô tả tiếng Việt" multiline value={form.summary} onChange={(summary) => setForm({ ...form, summary })} /><Field label="Mô tả tiếng Anh" multiline value={form.summaryEn} onChange={(summaryEn) => setForm({ ...form, summaryEn })} /><div className="admin-form-grid"><Field label="Thành phần" value={form.ingredients} onChange={(ingredients) => setForm({ ...form, ingredients })} /><Field label="Hạn sử dụng" value={form.expiry} onChange={(expiry) => setForm({ ...form, expiry })} /></div><div className="admin-form-grid"><Field label="Xuất xứ" value={form.originCountry} onChange={(originCountry) => setForm({ ...form, originCountry })} /><Field label="Số công bố" value={form.declarationNo} onChange={(declarationNo) => setForm({ ...form, declarationNo })} /></div><div className="admin-image-grid">{imageSlots.map(([slot, label]) => <label className="admin-image-field" key={slot}><span>{label}</span><input type="file" accept="image/jpeg,image/png,image/webp,image/svg+xml,.svg" onChange={(event) => chooseImage(slot, event.target.files?.[0])} /><div className="admin-image-preview">{(newImages[slot]?.dataUrl || form.images?.[slot]) ? <img src={newImages[slot]?.dataUrl || form.images?.[slot]} alt="Xem trước" /> : <><ImagePlus size={24} /><small>Chọn ảnh</small></>}</div></label>)}</div><div className="admin-modal__actions"><button type="button" className="btn btn-outline" onClick={closeModal} disabled={saving}>Hủy</button><button type="submit" className="btn btn-primary" disabled={saving}>{saving ? <><LoaderCircle className="spin" size={17} /> Đang lưu…</> : <><Save size={17} /> Lưu sản phẩm</>}</button></div></form>
    </section></div>}
  </main>;
}

function Field({ label, value, onChange, multiline = false, hint, required = false }) {
  const props = { value: value || '', required, onChange: (event) => onChange(event.target.value), className: 'form-control' };
  return <label className="admin-field"><span>{label}</span>{hint && <small>{hint}</small>}{multiline ? <textarea rows="3" {...props} /> : <input type="text" {...props} />}</label>;
}
