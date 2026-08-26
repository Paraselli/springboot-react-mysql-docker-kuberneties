import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/auth';

function App() {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [backendStatus, setBackendStatus] = useState({ online: false, checking: true, info: null });
  
  // Form states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  
  // Auth state
  const [authToken, setAuthToken] = useState(localStorage.getItem('jwt_token') || '');
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  
  // MySQL users list
  const [userList, setUserList] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [copied, setCopied] = useState(false);

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  // Check Backend Health
  const checkHealth = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/health`, { timeout: 3000 });
      setBackendStatus({ online: true, checking: false, info: res.data });
    } catch (err) {
      setBackendStatus({ online: false, checking: false, info: null });
    }
  }, []);

  // Fetch Users from Database
  const fetchUsers = useCallback(async () => {
    setLoadingUsers(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/users`, { timeout: 3000 });
      setUserList(res.data || []);
    } catch (err) {
      console.error('Failed to fetch user list:', err);
    } finally {
      setLoadingUsers(false);
    }
  }, []);

  // Fetch Current Authenticated User
  const fetchCurrentUser = useCallback(async (token) => {
    if (!token) return;
    try {
      const res = await axios.get(`${API_BASE_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCurrentUser(res.data);
    } catch (err) {
      console.error('Failed to fetch profile:', err);
      // Token might be expired or invalid
      setAuthToken('');
      localStorage.removeItem('jwt_token');
      setCurrentUser(null);
    }
  }, []);

  useEffect(() => {
    checkHealth();
    fetchUsers();
    const interval = setInterval(checkHealth, 10000);
    return () => clearInterval(interval);
  }, [checkHealth, fetchUsers]);

  useEffect(() => {
    if (authToken) {
      fetchCurrentUser(authToken);
    }
  }, [authToken, fetchCurrentUser]);

  // Handle Login
  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setNotification(null);

    try {
      const res = await axios.post(`${API_BASE_URL}/login`, {
        username: username.trim(),
        password: password
      });

      const data = res.data;
      setAuthToken(data.token);
      localStorage.setItem('jwt_token', data.token);
      setCurrentUser({
        id: data.id,
        username: data.username,
        email: data.email,
        role: data.role
      });
      showNotification('success', `Welcome back, ${data.username}! JWT token generated successfully.`);
      fetchUsers();
    } catch (err) {
      const errMsg = err.response?.data?.error || 'Login failed. Please check your credentials.';
      showNotification('error', errMsg);
    } finally {
      setLoading(false);
    }
  };

  // Handle Registration
  const handleRegister = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setNotification(null);

    try {
      const res = await axios.post(`${API_BASE_URL}/register`, {
        username: username.trim(),
        password: password,
        email: email.trim()
      });

      const data = res.data;
      setAuthToken(data.token);
      localStorage.setItem('jwt_token', data.token);
      setCurrentUser({
        id: data.id,
        username: data.username,
        email: data.email,
        role: data.role
      });
      showNotification('success', `Account created successfully! Welcome, ${data.username}!`);
      fetchUsers();
    } catch (err) {
      const errMsg = err.response?.data?.error || 'Registration failed. Please try again.';
      showNotification('error', errMsg);
    } finally {
      setLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setAuthToken('');
    setCurrentUser(null);
    localStorage.removeItem('jwt_token');
    showNotification('success', 'Logged out successfully.');
  };

  // Quick autofill demo accounts
  const autofillDemo = (user, pass, mail) => {
    setUsername(user);
    setPassword(pass);
    if (mail) setEmail(mail);
  };

  const copyToken = () => {
    navigator.clipboard.writeText(authToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div>
          <div className="brand-badge">⚡ Full-Stack Cloud Architecture</div>
          <h1 className="brand-title">Spring Boot + React + MySQL</h1>
          <p className="brand-subtitle">
            Containerized Microservices with JWT Authentication & Docker Orchestration
          </p>
        </div>

        <div className="tech-pill-group">
          <span className="tech-pill spring">🌿 Spring Boot 3.3</span>
          <span className="tech-pill react">⚛️ React 18</span>
          <span className="tech-pill mysql">🐬 MySQL 8</span>
          <span className="tech-pill docker">🐳 Docker</span>
        </div>
      </header>

      {/* Backend Status Bar */}
      <div className="status-bar">
        <div className="status-indicator">
          <div className={`status-dot ${backendStatus.online ? 'online' : 'offline'}`} />
          <span>
            <strong>Backend API:</strong> {backendStatus.online ? 'Online (http://localhost:8080)' : 'Connecting / Offline'}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {backendStatus.online && (
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Database: <strong style={{ color: 'var(--accent-emerald)' }}>Connected (MySQL)</strong>
            </span>
          )}
          <button className="btn-secondary" onClick={() => { checkHealth(); fetchUsers(); }}>
            🔄 Refresh Status
          </button>
        </div>
      </div>

      {/* Notifications */}
      {notification && (
        <div className={`alert ${notification.type === 'success' ? 'alert-success' : 'alert-error'}`}>
          <span>{notification.type === 'success' ? '✅' : '⚠️'}</span>
          <span>{notification.message}</span>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="main-grid">
        {/* Left Column: Authentication */}
        <div className="glass-card">
          {!currentUser ? (
            <>
              {/* Tab Selector */}
              <div className="tab-header">
                <button
                  className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
                  onClick={() => setActiveTab('login')}
                >
                  🔐 Login
                </button>
                <button
                  className={`tab-btn ${activeTab === 'register' ? 'active' : ''}`}
                  onClick={() => setActiveTab('register')}
                >
                  ✨ Register
                </button>
              </div>

              {activeTab === 'login' ? (
                /* Login Form */
                <form onSubmit={handleLogin}>
                  <div className="form-group">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. admin or ram"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-input"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? 'Authenticating...' : 'Sign In with JWT'}
                  </button>

                  <div className="quick-fill">
                    <span>Quick fill test credentials:</span>
                    <button
                      type="button"
                      className="quick-link"
                      onClick={() => autofillDemo('admin', 'password123')}
                    >
                      admin / password123
                    </button>
                  </div>
                </form>
              ) : (
                /* Register Form */
                <form onSubmit={handleRegister}>
                  <div className="form-group">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Enter new username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="user@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-input"
                      placeholder="At least 4 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? 'Creating Account...' : 'Register & Generate JWT'}
                  </button>

                  <div className="quick-fill">
                    <span>Quick fill sample:</span>
                    <button
                      type="button"
                      className="quick-link"
                      onClick={() => autofillDemo('john_dev', 'secret123', 'john@example.com')}
                    >
                      john_dev sample
                    </button>
                  </div>
                </form>
              )}
            </>
          ) : (
            /* Active User Session */
            <div>
              <div className="user-profile-header">
                <div className="avatar">
                  {currentUser.username ? currentUser.username[0].toUpperCase() : 'U'}
                </div>
                <div className="profile-meta">
                  <h4>{currentUser.username}</h4>
                  <span>{currentUser.email || 'Authenticated User'}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <span className="badge badge-role">{currentUser.role || 'ROLE_USER'}</span>
                <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399' }}>
                  ID: #{currentUser.id}
                </span>
              </div>

              <label className="form-label" style={{ display: 'block', marginTop: '16px' }}>
                Active JWT Token (Bearer Header):
              </label>
              <div className="token-box">
                {authToken}
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="btn-secondary" onClick={copyToken}>
                  {copied ? '✅ Copied!' : '📋 Copy Token'}
                </button>
                <button
                  className="btn-secondary"
                  style={{ borderColor: 'rgba(244, 63, 94, 0.4)', color: '#fb7185' }}
                  onClick={handleLogout}
                >
                  🚪 Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Database Explorer */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 className="card-title" style={{ margin: 0 }}>
              <span>🐬</span> MySQL Users Table
            </h3>
            <button className="btn-secondary" onClick={fetchUsers} disabled={loadingUsers}>
              {loadingUsers ? 'Loading...' : '🔄 Refresh'}
            </button>
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '8px' }}>
            Live records persisted in MySQL database (<code style={{ color: 'var(--accent-cyan)' }}>testdb.users</code>).
          </p>

          <div className="user-table-container">
            {userList.length > 0 ? (
              <table className="user-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {userList.map((u) => (
                    <tr key={u.id}>
                      <td>#{u.id}</td>
                      <td style={{ fontWeight: '600', color: '#ffffff' }}>{u.username}</td>
                      <td>{u.email}</td>
                      <td>
                        <span className="badge badge-role">{u.role}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{ padding: '30px 10px', textAlign: 'center', color: 'var(--text-dim)' }}>
                {backendStatus.online
                  ? 'No users registered yet. Create one on the left to see it in MySQL!'
                  : 'Start backend service to view MySQL database records.'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="app-footer">
        Spring Boot 3 + React 18 + MySQL 8 Cloud Native Architecture Demo
      </footer>
    </div>
  );
}

export default App;
