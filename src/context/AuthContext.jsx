import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Axios instance with auth interceptor
const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verify token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get('/auth/me')
        .then(res => setUser(res.data.user))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const register = async (name, email, photoURL, password) => {
    const res = await api.post('/auth/register', { name, email, photoURL, password });
    return res.data;
  };

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  const googleLogin = async () => {
    // Opens popup for Google OAuth
    window.location.href = `${API_URL}/auth/google`;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateProfile = async (name, photoURL) => {
    const res = await api.patch('/auth/update-profile', { name, photoURL });
    setUser(res.data.user);
    return res.data;
  };

  // Handle OAuth redirect token
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('token', token);
      // Remove token from URL
      window.history.replaceState({}, '', window.location.pathname);
      api.get('/auth/me')
        .then(res => setUser(res.data.user))
        .finally(() => setLoading(false));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, register, login, googleLogin, logout, updateProfile, api }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export { api };
