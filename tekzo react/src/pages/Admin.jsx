import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import { useAuth } from '../hooks/useAuth';

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const DEFAULT_SETTINGS = {
  phone: '+91 99132 90604',
  email: 'tektoitsolutions@gmail.com',
  address: 'Vapi, Gujarat, India',
  hoursWeek: 'Mon - Fri: 9:00 AM - 6:00 PM',
  hoursSat: 'Saturday: 10:00 AM - 2:00 PM',
  heroTitle: 'Innovate. Transform. Accelerate.'
};

const Admin = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [inquiries, setInquiries] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const savedToken = localStorage.getItem('tekzo_admin_session_token');
        if (!savedToken) return;

        const { data, error } = await supabase.rpc('get_client_inquiries', {
          p_token: savedToken
        });
        if (error) throw error;
        setInquiries(data || []);
      } catch (err) {
        console.warn('Error fetching inquiries from Supabase', err);
      }
    };

    fetchInquiries();

    // Load data from LocalStorage
    try {
      const subs = JSON.parse(localStorage.getItem('tekzo_subscribers') || '[]');
      setSubscribers(subs);

      const sets = JSON.parse(localStorage.getItem('tekzo_settings') || 'null');
      if (sets) setSettings(sets);
    } catch (err) {
      console.warn('Error loading admin data', err);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Logout error', err);
    }
    navigate('/login');
  };

  const clearAllInquiries = async () => {
    if (window.confirm('Are you sure you want to delete all client inquiries?')) {
      try {
        const savedToken = localStorage.getItem('tekzo_admin_session_token');
        const { data, error } = await supabase.rpc('clear_all_client_inquiries', {
          p_token: savedToken
        });
        if (error) throw error;
        
        if (data?.success) {
          setInquiries([]);
        } else {
          alert(data?.message || 'Failed to clear inquiries');
        }
      } catch (err) {
        console.error('Failed to clear inquiries:', err);
        alert('Failed to clear inquiries from database');
      }
    }
  };

  const deleteInquiry = async (id) => {
    if (window.confirm('Delete this inquiry record?')) {
      try {
        const savedToken = localStorage.getItem('tekzo_admin_session_token');
        const { data, error } = await supabase.rpc('delete_client_inquiry', {
          p_token: savedToken,
          p_id: id
        });
        if (error) throw error;
        
        if (data?.success) {
          setInquiries(inquiries.filter((item) => item.id !== id));
        } else {
          alert(data?.message || 'Failed to delete inquiry');
        }
      } catch (err) {
        console.error('Failed to delete inquiry:', err);
        alert('Failed to delete inquiry from database');
      }
    }
  };

  const clearSubscribers = () => {
    if (window.confirm('Clear all newsletter subscribers?')) {
      localStorage.setItem('tekzo_subscribers', '[]');
      setSubscribers([]);
    }
  };

  const saveSettings = (e) => {
    e.preventDefault();
    localStorage.setItem('tekzo_settings', JSON.stringify(settings));
    alert('✅ Dynamic website settings saved live to public site!');
  };

  const resetSettings = () => {
    if (window.confirm('Reset settings to default agency values?')) {
      setSettings(DEFAULT_SETTINGS);
      localStorage.removeItem('tekzo_settings');
    }
  };

  const exportCSV = () => {
    if (!inquiries.length) {
      alert('No inquiry records to export.');
      return;
    }
    const headers = ['ID', 'Name', 'Phone', 'Email', 'Service', 'Date', 'Message'];
    const rows = inquiries.map((item) => [
      item.id,
      `"${(item.name || '').replace(/"/g, '""')}"`,
      `"${item.phone || ''}"`,
      `"${item.email || ''}"`,
      `"${item.service || ''}"`,
      `"${formatDate(item.created_at || item.date)}"`,
      `"${(item.message || '').replace(/"/g, '""')}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Tekzo_Inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredInquiries = inquiries.filter(
    (item) =>
      (item.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.service || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const titles = {
    overview: 'Control Dashboard Overview',
    inquiries: 'Client Inquiries Management',
    settings: 'Dynamic Website Settings Editor',
    subscribers: 'Newsletter Leads Database'
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar" id="adminSidebar">
        <div className="sidebar-header">
          <div className="login-logo" style={{ marginBottom: 0 }}>
            <img src="/logo/tekzo logo img.png" alt="Tekzo IT Solutions Logo" />
            <span className="badge">PANEL</span>
          </div>
        </div>

        <nav className="sidebar-menu">
          <button
            className={`menu-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <i className="fas fa-chart-pie icon"></i>
            <span>Overview</span>
          </button>
          <button
            className={`menu-item ${activeTab === 'inquiries' ? 'active' : ''}`}
            onClick={() => setActiveTab('inquiries')}
          >
            <i className="fas fa-inbox icon"></i>
            <span>Client Inquiries</span>
          </button>
          <button
            className={`menu-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <i className="fas fa-sliders-h icon"></i>
            <span>Dynamic Site Editor</span>
          </button>
          <button
            className={`menu-item ${activeTab === 'subscribers' ? 'active' : ''}`}
            onClick={() => setActiveTab('subscribers')}
          >
            <i className="fas fa-envelope-open-text icon"></i>
            <span>Newsletter Leads</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="btn-logout" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        <header className="admin-topbar">
          <div className="topbar-left">
            <h1>{titles[activeTab] || 'Dashboard'}</h1>
          </div>

          <div className="topbar-right">
            <Link to="/" target="_blank" className="btn-view-site">
              <i className="fas fa-external-link-alt"></i>
              <span>Preview Live Site</span>
            </Link>

            <div className="admin-profile">
              <div className="avatar">{user?.full_name ? user.full_name[0].toUpperCase() : 'A'}</div>
              <div>
                <p style={{ fontSize: '0.9rem', fontWeight: 700 }}>{user?.full_name || 'Administrator'}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--admin-success)' }}>● Online Session</p>
              </div>
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          {/* TAB 1: Overview */}
          {activeTab === 'overview' && (
            <div id="tab-overview" className="tab-pane active">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-info">
                    <h3>Total Client Inquiries</h3>
                    <div className="stat-val">{inquiries.length}</div>
                  </div>
                  <div className="stat-icon icon-purple">
                    <i className="fas fa-paper-plane"></i>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-info">
                    <h3>Newsletter Subscribers</h3>
                    <div className="stat-val">{subscribers.length}</div>
                  </div>
                  <div className="stat-icon icon-cyan">
                    <i className="fas fa-users"></i>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-info">
                    <h3>Active Agency Services</h3>
                    <div className="stat-val">5</div>
                  </div>
                  <div className="stat-icon icon-green">
                    <i className="fas fa-briefcase"></i>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-info">
                    <h3>Server Status</h3>
                    <div className="stat-val" style={{ fontSize: '1.4rem', color: 'var(--admin-success)' }}>
                      Active
                    </div>
                  </div>
                  <div className="stat-icon icon-amber">
                    <i className="fas fa-server"></i>
                  </div>
                </div>
              </div>

              {/* Quick Preview of Recent Inquiries */}
              <div className="card-box">
                <div className="card-box-header">
                  <h2>Recent Submissions</h2>
                  <button className="btn-sm btn-export" onClick={() => setActiveTab('inquiries')}>
                    View All Submissions <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
                <div className="table-responsive">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Client Name</th>
                        <th>Email Address</th>
                        <th>Service</th>
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inquiries.slice(0, 5).map((item) => (
                        <tr key={item.id}>
                          <td style={{ fontWeight: 700 }}>{item.name}</td>
                          <td>{item.email}</td>
                          <td>
                            <span className="badge-service">{item.service}</span>
                          </td>
                          <td style={{ color: 'var(--admin-muted)' }}>{formatDate(item.created_at || item.date)}</td>
                          <td>
                            <button className="btn-sm btn-view-sm" onClick={() => setSelectedInquiry(item)}>
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                      {!inquiries.length && (
                        <tr>
                          <td colSpan="5" style={{ textAlign: 'center', color: 'var(--admin-muted)' }}>
                            No inquiries recorded yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Inquiries */}
          {activeTab === 'inquiries' && (
            <div id="tab-inquiries" className="tab-pane active">
              <div className="card-box">
                <div className="card-box-header">
                  <h2>All Contact Us Submissions</h2>
                  <div className="table-actions">
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Search name or email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="btn-sm btn-export" onClick={exportCSV}>
                      <i className="fas fa-download"></i> Export CSV
                    </button>
                    <button className="btn-sm btn-danger-sm" onClick={clearAllInquiries}>
                      <i className="fas fa-trash"></i> Clear All
                    </button>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Service</th>
                        <th>Submitted Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredInquiries.map((item, idx) => (
                        <tr key={item.id}>
                          <td>{idx + 1}</td>
                          <td style={{ fontWeight: 700 }}>{item.name}</td>
                          <td>{item.phone}</td>
                          <td>{item.email}</td>
                          <td>
                            <span className="badge-service">{item.service}</span>
                          </td>
                          <td style={{ color: 'var(--admin-muted)' }}>{formatDate(item.created_at || item.date)}</td>
                          <td>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button className="btn-sm btn-view-sm" onClick={() => setSelectedInquiry(item)}>
                                View
                              </button>
                              <button className="btn-sm btn-danger-sm" onClick={() => deleteInquiry(item.id)}>
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {!filteredInquiries.length && (
                        <tr>
                          <td colSpan="7" style={{ textAlign: 'center', color: 'var(--admin-muted)' }}>
                            No inquiry submissions found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Dynamic Settings Editor */}
          {activeTab === 'settings' && (
            <div id="tab-settings" className="tab-pane active">
              <div className="card-box">
                <div className="card-box-header">
                  <h2>Dynamic Website Settings Manager</h2>
                </div>
                <p style={{ color: 'var(--admin-muted)', marginBottom: '25px' }}>
                  Changes saved here will reflect live on the public website immediately.
                </p>

                <form id="dynamicSettingsForm" onSubmit={saveSettings}>
                  <div className="settings-grid">
                    <div>
                      <h3 style={{ marginBottom: '15px', color: 'var(--admin-accent)' }}>📞 Contact Details</h3>
                      <div className="form-group">
                        <label>Company Phone Number</label>
                        <input
                          type="text"
                          className="form-control"
                          required
                          value={settings.phone}
                          onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Company Email Address</label>
                        <input
                          type="email"
                          className="form-control"
                          required
                          value={settings.email}
                          onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Office Location Address</label>
                        <input
                          type="text"
                          className="form-control"
                          required
                          value={settings.address}
                          onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <h3 style={{ marginBottom: '15px', color: 'var(--admin-accent)' }}>🕒 Working Hours</h3>
                      <div className="form-group">
                        <label>Weekdays (Mon - Fri)</label>
                        <input
                          type="text"
                          className="form-control"
                          required
                          value={settings.hoursWeek}
                          onChange={(e) => setSettings({ ...settings, hoursWeek: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Saturday</label>
                        <input
                          type="text"
                          className="form-control"
                          required
                          value={settings.hoursSat}
                          onChange={(e) => setSettings({ ...settings, hoursSat: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Hero Title Tag</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g. Innovate. Transform. Accelerate."
                          value={settings.heroTitle}
                          onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: '25px',
                      borderTop: '1px solid var(--admin-border)',
                      paddingTop: '20px',
                      display: 'flex',
                      gap: '15px'
                    }}
                  >
                    <button
                      type="submit"
                      className="btn-sm btn-export"
                      style={{ background: 'var(--admin-primary)', padding: '12px 24px', fontSize: '1rem' }}
                    >
                      Save Changes to Live Website
                    </button>
                    <button type="button" className="btn-sm btn-danger-sm" onClick={resetSettings}>
                      Reset Defaults
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* TAB 4: Newsletter Subscribers */}
          {activeTab === 'subscribers' && (
            <div id="tab-subscribers" className="tab-pane active">
              <div className="card-box">
                <div className="card-box-header">
                  <h2>Footer Newsletter Subscribers</h2>
                  <button className="btn-sm btn-danger-sm" onClick={clearSubscribers}>
                    <i className="fas fa-trash"></i> Clear List
                  </button>
                </div>

                <div className="table-responsive">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Subscriber Email</th>
                        <th>Subscribed Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscribers.map((item, idx) => (
                        <tr key={idx}>
                          <td>{idx + 1}</td>
                          <td style={{ fontWeight: 700 }}>{item.email}</td>
                          <td style={{ color: 'var(--admin-muted)' }}>{item.date}</td>
                        </tr>
                      ))}
                      {!subscribers.length && (
                        <tr>
                          <td colSpan="3" style={{ textAlign: 'center', color: 'var(--admin-muted)' }}>
                            No newsletter subscribers recorded yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Inquiry View Modal */}
      {selectedInquiry && (
        <div className="modal-backdrop active" onClick={(e) => e.target.classList.contains('modal-backdrop') && setSelectedInquiry(null)}>
          <div className="modal-box">
            <div className="modal-header">
              <h3>Client Inquiry: {selectedInquiry.name}</h3>
              <button className="btn-close" onClick={() => setSelectedInquiry(null)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <p><strong>Name:</strong> {selectedInquiry.name}</p>
              <p><strong>Phone:</strong> {selectedInquiry.phone}</p>
              <p><strong>Email:</strong> {selectedInquiry.email}</p>
              <p><strong>Service:</strong> {selectedInquiry.service}</p>
              <p><strong>Date:</strong> {formatDate(selectedInquiry.created_at || selectedInquiry.date)}</p>
              <hr style={{ borderColor: 'var(--admin-border)', margin: '15px 0' }} />
              <p><strong>Message:</strong></p>
              <p style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '6px', whiteSpace: 'pre-wrap' }}>
                {selectedInquiry.message || 'No message content provided.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;

