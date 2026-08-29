import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import BrandPreloader from '../components/common/BrandPreloader';

export default function ProductsPage() {
  const [products, setProducts] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState('');
  useEffect(() => { api.getProducts().then(setProducts).catch(err => setError(err.message || 'Không thể tải sản phẩm.')).finally(() => setLoading(false)); }, []);
  if (loading) return <BrandPreloader persistent />;
  return <main style={{ background: '#faf8f2', minHeight: '70vh', padding: '64px 0 80px' }}><div className="container"><div style={{ maxWidth: 680, marginBottom: 40 }}><div className="badge badge-gold">AN ĐÔNG FOOD</div><h1 style={{ color: 'var(--primary)', fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3.2rem)', margin: '14px 0' }}>Sản Phẩm</h1><p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>Danh sách sản phẩm được tải trực tiếp từ cơ sở dữ liệu.</p></div>{error && <p style={{ color: '#b42318' }}>{error}</p>}{!error && products.length === 0 && <p>Chưa có sản phẩm trong cơ sở dữ liệu.</p>}<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: 24 }}>{products.map(product => <article key={product.id || product._id} style={{ background: '#fff', border: '1px solid #e7e0d2', borderRadius: 20, padding: 24, display: 'flex', flexDirection: 'column' }}><img src={product.images?.main} alt={product.name} style={{ height: 200, width: '100%', objectFit: 'contain', marginBottom: 20 }} /><div style={{ color: 'var(--earth-brown)', fontSize: '.85rem', fontWeight: 700 }}>{product.content?.number}</div><h2 style={{ color: 'var(--primary)', fontFamily: 'var(--font-serif)', margin: '8px 0' }}>{product.name}</h2><p style={{ color: 'var(--text-muted)', lineHeight: 1.6, flex: 1 }}>{product.summary}</p><Link className="btn btn-primary" to={`/san-pham/${product.slug}`} style={{ textAlign: 'center', textDecoration: 'none' }}>Xem chi tiết</Link></article>)}</div></div></main>;
}
