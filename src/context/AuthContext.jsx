import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initSession = async () => {
      try {
        const savedToken = localStorage.getItem('tekzo_admin_session_token');
        if (savedToken) {
          const res = await authService.verifySession(savedToken);
          if (res?.success) {
            setUser(res.user);
            setToken(savedToken);
          } else {
            localStorage.removeItem('tekzo_admin_session_token');
          }
        }
      } catch (err) {
        console.error('Session initialization error:', err);
      } finally {
        setLoading(false);
      }
    };
    initSession();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await authService.login(email, password);
      if (res?.success) {
        setUser(res.user);
        setToken(res.session.token);
        localStorage.setItem('tekzo_admin_session_token', res.session.token);
        return { success: true };
      } else {
        setUser(null);
        setToken(null);
        localStorage.removeItem('tekzo_admin_session_token');
        return { success: false, message: res?.message || 'Login failed' };
      }
    } catch (err) {
      console.error('Login action error:', err);
      return { success: false, message: 'An unexpected connection error occurred.' };
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await authService.logout(token);
      }
    } catch (err) {
      console.error('Logout action error:', err);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('tekzo_admin_session_token');
    }
  };

  const changePassword = async (oldPassword, newPassword) => {
    if (!token) return { success: false, message: 'Not authenticated' };
    return await authService.changePassword(token, oldPassword, newPassword);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
