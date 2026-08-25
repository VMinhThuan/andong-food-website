import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('andong_token');
    if (token) {
      api.getMe()
        .then(userData => setUser(userData))
        .catch(() => {
          localStorage.removeItem('andong_token');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    const res = await api.login(username, password);
    if (res.success && res.data.token) {
      localStorage.setItem('andong_token', res.data.token);
      setUser(res.data.user);
      return res.data.user;
    }
    throw new Error(res.message || 'Đăng nhập không thành công');
  };

  const logout = () => {
    localStorage.removeItem('andong_token');
    setUser(null);
  };

  const isAdmin = user?.role === 'admin';
  const isStaff = user?.role === 'staff';
  const isAuthenticated = Boolean(user);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAdmin, isStaff, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
