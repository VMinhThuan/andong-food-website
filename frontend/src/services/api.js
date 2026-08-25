const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

function getAuthHeaders() {
  const token = localStorage.getItem('andong_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

export const api = {
  // Auth
  async login(username, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Đăng nhập thất bại');
    return data;
  },

  async getMe() {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Không thể lấy thông tin');
    return data.data;
  },

  async getUsers() {
    const res = await fetch(`${API_BASE}/auth/users`, {
      headers: getAuthHeaders()
    });
    const data = await res.json();
    return data.data || [];
  },

  async createUser(userData) {
    const res = await fetch(`${API_BASE}/auth/users`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Không thể tạo tài khoản');
    return data;
  },

  async deleteUser(id) {
    const res = await fetch(`${API_BASE}/auth/users/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Không thể xóa tài khoản');
    return data;
  },

  // Products
  async getProducts(params = {}) {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE}/products?${query}`);
      if (!res.ok) return [];
      const data = await res.json();
      return Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : []);
    } catch {
      return [];
    }
  },

  async getProductBySlug(slug) {
    try {
      const res = await fetch(`${API_BASE}/products/slug/${slug}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Không tìm thấy sản phẩm');
      return data.data;
    } catch (err) {
      throw err;
    }
  },

  async createProduct(productData) {
    const res = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(productData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Không thể thêm sản phẩm');
    return data;
  },

  async updateProduct(id, productData) {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(productData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Không thể cập nhật sản phẩm');
    return data;
  },

  async deleteProduct(id) {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Không thể xóa sản phẩm');
    return data;
  },

  // Categories
  async getCategories() {
    try {
      const res = await fetch(`${API_BASE}/categories`);
      if (!res.ok) return [];
      const data = await res.json();
      return Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : []);
    } catch {
      return [];
    }
  },

  // Contacts
  async sendContact(formData) {
    const res = await fetch(`${API_BASE}/contacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Không thể gửi liên hệ');
    return data;
  },

  async getContacts(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/contacts?${query}`, {
      headers: getAuthHeaders()
    });
    const data = await res.json();
    return data.data || [];
  },

  async updateContactStatus(id, status) {
    const res = await fetch(`${API_BASE}/contacts/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Không thể cập nhật');
    return data;
  },

  async deleteContact(id) {
    const res = await fetch(`${API_BASE}/contacts/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    const data = await res.json();
    return data;
  },

  // Company Profile
  async getCompanyProfile() {
    const res = await fetch(`${API_BASE}/company`);
    const data = await res.json();
    return data.data;
  },

  async updateCompanyProfile(profileData) {
    const res = await fetch(`${API_BASE}/company`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(profileData)
    });
    const data = await res.json();
    return data;
  },

  // QR Code
  async verifyQR(code) {
    const res = await fetch(`${API_BASE}/qr/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Mã QR không hợp lệ');
    return data.data;
  },

  getDownloadQRPNGUrl(slug) {
    return `${API_BASE}/qr/download/png/${slug}`;
  },

  getDownloadQRSVGUrl(slug) {
    return `${API_BASE}/qr/download/svg/${slug}`;
  }
};
