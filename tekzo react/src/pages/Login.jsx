import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login, user, loading } = useAuth();

  useEffect(() => {
    document.body.classList.add('admin-login-body');
    return () => {
      document.body.classList.remove('admin-login-body');
    };
  }, []);

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);
    
    const email = username.includes('@') ? username.trim() : `${username.trim()}@tekzo.com`;

    try {
      const res = await login(email, password);

      if (!res.success) {
        setErrorMsg(res.message);
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setErrorMsg('An unexpected error occurred during login.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <div className="admin-login-body">
      <div className="login-bg-glow glow-1"></div>
      <div className="login-bg-glow glow-2"></div>

      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">
              <img src="/logo/tekzo logo img.png" alt="Tekzo IT Solutions Logo" />
              <span className="badge">ADMIN</span>
            </div>
            <h2>Welcome Back</h2>
            <p>Enter your agency credentials to access the control dashboard</p>
          </div>

          {errorMsg && (
            <div id="loginAlert" className="alert alert-danger" style={{ display: 'block' }}>
              {errorMsg}
            </div>
          )}

          <form id="adminLoginForm" onSubmit={handleSubmit}>
            <div className="form-group-admin">
              <label htmlFor="username">Username / Email</label>
              <div className="input-icon-wrapper">
                <i className="fas fa-user icon"></i>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="e.g. admin"
                  required
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group-admin">
              <label htmlFor="password">Password</label>
              <div className="input-icon-wrapper">
                <i className="fas fa-lock icon"></i>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="••••••••••••"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="btn-toggle-pass"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                </button>
              </div>
            </div>

            <div className="form-actions">
              <label className="checkbox-label">
                <input type="checkbox" id="rememberMe" defaultChecked />
                <span>Remember session</span>
              </label>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Demo Admin Credentials:\nUsername: admin\nPassword: tekzo@2026');
                }}
                className="forgot-link"
              >
                Forgot password?
              </a>
            </div>

            <button type="submit" className="btn-admin-primary" disabled={submitting}>
              <span>{submitting ? 'Signing In...' : 'Sign In to Dashboard'}</span>
              <i className={submitting ? 'fas fa-spinner fa-spin' : 'fas fa-arrow-right'}></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
