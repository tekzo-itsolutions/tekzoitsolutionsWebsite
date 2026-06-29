/**
 * Tekzo Agency Admin Controller
 */

const DEFAULT_ADMIN = {
  username: 'admin',
  password: 'tekzo@2026'
};

const DEFAULT_SETTINGS = {
  phone: '+91 99132 90604',
  email: 'tektoitsolutions@gmail.com',
  address: 'Vapi, Gujarat, India',
  hoursWeek: 'Mon - Fri: 9:00 AM - 6:00 PM',
  hoursSat: 'Saturday: 10:00 AM - 2:00 PM',
  heroTitle: 'Innovate. Transform. Accelerate.'
};

document.addEventListener('DOMContentLoaded', () => {
  const isLoginPage = document.body.classList.contains('admin-login-body');
  const isLoggedIn = sessionStorage.getItem('tekzo_admin_logged') === 'true';

  if (isLoginPage) {
    if (isLoggedIn) {
      window.location.href = 'admin.html';
      return;
    }
    initLoginHandler();
  } else {
    if (!isLoggedIn && window.location.protocol !== 'file:') {
      // Session guard
      window.location.href = 'admin-login.html';
      return;
    }
    initDashboard();
  }
});

/* --- Login Page Logic --- */
function togglePassword() {
  const passInp = document.getElementById('password');
  const btn = document.querySelector('.btn-toggle-pass i');
  if (passInp.type === 'password') {
    passInp.type = 'text';
    btn.className = 'fas fa-eye-slash';
  } else {
    passInp.type = 'password';
    btn.className = 'fas fa-eye';
  }
}

function initLoginHandler() {
  const form = document.getElementById('adminLoginForm');
  const alertBox = document.getElementById('loginAlert');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const u = document.getElementById('username').value.trim();
    const p = document.getElementById('password').value;

    if (u === DEFAULT_ADMIN.username && p === DEFAULT_ADMIN.password) {
      sessionStorage.setItem('tekzo_admin_logged', 'true');
      window.location.href = 'admin.html';
    } else {
      alertBox.textContent = 'Invalid Username or Password. Hint: admin / tekzo@2026';
      alertBox.style.display = 'block';
    }
  });
}

function logoutAdmin() {
  sessionStorage.removeItem('tekzo_admin_logged');
  window.location.href = 'admin-login.html';
}

/* --- Dashboard Controller --- */
function switchTab(tabId) {
  document.querySelectorAll('.sidebar-menu .menu-item').forEach((btn) => {
    btn.classList.remove('active');
  });
  document.querySelectorAll('.tab-pane').forEach((pane) => {
    pane.classList.remove('active');
  });

  const targetBtn = document.querySelector(`.sidebar-menu button[onclick="switchTab('${tabId}')"]`);
  const targetPane = document.getElementById(`tab-${tabId}`);

  targetBtn?.classList.add('active');
  targetPane?.classList.add('active');

  const titles = {
    overview: 'Control Dashboard Overview',
    inquiries: 'Client Inquiries Management',
    settings: 'Dynamic Website Settings Editor',
    subscribers: 'Newsletter Leads Database'
  };
  const titleEl = document.getElementById('pageTitle');
  if (titleEl) titleEl.textContent = titles[tabId] || 'Dashboard';
}

function getStoredInquiries() {
  const raw = localStorage.getItem('tekzo_inquiries');
  if (!raw) {
    // Put mock demo data if empty so dashboard looks alive
    const demo = [
      { id: Date.now()-100000, name: 'Rahul Sharma', phone: '+91 98765 43210', email: 'rahul@sharma.com', service: 'Web Development & Custom Website', message: 'Need a custom e-commerce portal with payment gateway.', date: new Date().toLocaleDateString() },
      { id: Date.now()-200000, name: 'Priya Patel', phone: '+91 91234 56789', email: 'priya@patels.com', service: 'Logo & UI/UX Design', message: 'Looking for complete brand identity redesign.', date: new Date().toLocaleDateString() }
    ];
    localStorage.setItem('tekzo_inquiries', JSON.stringify(demo));
    return demo;
  }
  try { return JSON.parse(raw); } catch { return []; }
}

function getStoredSubscribers() {
  const raw = localStorage.getItem('tekzo_subscribers');
  if (!raw) {
    const demo = [
      { email: 'client1@agency.com', date: new Date().toLocaleDateString() },
      { email: 'lead_magnet@gmail.com', date: new Date().toLocaleDateString() }
    ];
    localStorage.setItem('tekzo_subscribers', JSON.stringify(demo));
    return demo;
  }
  try { return JSON.parse(raw); } catch { return []; }
}

function initDashboard() {
  renderInquiries();
  renderSubscribers();
  populateSettingsForm();
}

function renderInquiries() {
  const list = getStoredInquiries();
  const statInq = document.getElementById('statInquiries');
  if (statInq) statInq.textContent = list.length;

  const tbodyOverview = document.getElementById('overviewTableBody');
  const tbodyFull = document.getElementById('inquiriesTableBody');

  if (tbodyOverview) {
    tbodyOverview.innerHTML = list.slice(0, 5).map((item) => `
      <tr>
        <td style="font-weight: 700; color: #fff;">${item.name}</td>
        <td>${item.email}</td>
        <td><span class="badge-tag tag-service">${item.service}</span></td>
        <td style="color: var(--admin-muted);">${item.date}</td>
        <td><button class="btn-icon btn-view" onclick="viewInquiryModal(${item.id})"><i class="fas fa-eye"></i></button></td>
      </tr>
    `).join('') || `<tr><td colspan="5" class="empty-state">No recent inquiries</td></tr>`;
  }

  if (tbodyFull) {
    tbodyFull.innerHTML = list.map((item, idx) => `
      <tr>
        <td style="color: var(--admin-muted);">${idx + 1}</td>
        <td style="font-weight: 700; color: #fff;">${item.name}</td>
        <td>${item.phone}</td>
        <td><a href="mailto:${item.email}" style="color: var(--admin-accent);">${item.email}</a></td>
        <td><span class="badge-tag tag-service">${item.service}</span></td>
        <td style="color: var(--admin-muted);">${item.date}</td>
        <td>
          <div class="action-btns">
            <button class="btn-icon btn-view" onclick="viewInquiryModal(${item.id})" title="View Details"><i class="fas fa-eye"></i></button>
            <button class="btn-icon btn-del" onclick="deleteInquiry(${item.id})" title="Delete"><i class="fas fa-trash"></i></button>
          </div>
        </td>
      </tr>
    `).join('') || `<tr><td colspan="7" class="empty-state">No inquiries received yet</td></tr>`;
  }
}

function renderSubscribers() {
  const list = getStoredSubscribers();
  const statSub = document.getElementById('statSubscribers');
  if (statSub) statSub.textContent = list.length;

  const tbody = document.getElementById('subscribersTableBody');
  if (tbody) {
    tbody.innerHTML = list.map((item, idx) => `
      <tr>
        <td style="color: var(--admin-muted);">${idx + 1}</td>
        <td style="font-weight: 700; color: var(--admin-accent);">${item.email}</td>
        <td style="color: var(--admin-muted);">${item.date}</td>
      </tr>
    `).join('') || `<tr><td colspan="3" class="empty-state">No newsletter leads yet</td></tr>`;
  }
}

function filterInquiries() {
  const q = document.getElementById('searchInquiries')?.value.toLowerCase() || '';
  const list = getStoredInquiries().filter(item => 
    item.name.toLowerCase().includes(q) || item.email.toLowerCase().includes(q) || item.service.toLowerCase().includes(q)
  );

  const tbodyFull = document.getElementById('inquiriesTableBody');
  if (tbodyFull) {
    tbodyFull.innerHTML = list.map((item, idx) => `
      <tr>
        <td style="color: var(--admin-muted);">${idx + 1}</td>
        <td style="font-weight: 700; color: #fff;">${item.name}</td>
        <td>${item.phone}</td>
        <td><a href="mailto:${item.email}" style="color: var(--admin-accent);">${item.email}</a></td>
        <td><span class="badge-tag tag-service">${item.service}</span></td>
        <td style="color: var(--admin-muted);">${item.date}</td>
        <td>
          <div class="action-btns">
            <button class="btn-icon btn-view" onclick="viewInquiryModal(${item.id})"><i class="fas fa-eye"></i></button>
            <button class="btn-icon btn-del" onclick="deleteInquiry(${item.id})"><i class="fas fa-trash"></i></button>
          </div>
        </td>
      </tr>
    `).join('') || `<tr><td colspan="7" class="empty-state">No matching inquiries found</td></tr>`;
  }
}

function deleteInquiry(id) {
  if (!confirm('Are you sure you want to delete this submission?')) return;
  const list = getStoredInquiries().filter(i => i.id !== id);
  localStorage.setItem('tekzo_inquiries', JSON.stringify(list));
  renderInquiries();
}

function clearAllInquiries() {
  if (!confirm('Delete all client inquiry records permanently?')) return;
  localStorage.setItem('tekzo_inquiries', '[]');
  renderInquiries();
}

function clearSubscribers() {
  if (!confirm('Clear all newsletter subscriber emails?')) return;
  localStorage.setItem('tekzo_subscribers', '[]');
  renderSubscribers();
}

/* --- Modal Popup --- */
function viewInquiryModal(id) {
  const item = getStoredInquiries().find(i => i.id === id);
  if (!item) return;

  document.getElementById('modalClientName').textContent = `Inquiry from ${item.name}`;
  document.getElementById('modalBodyContent').innerHTML = `
    <div class="form-grid-2">
      <div class="detail-row">
        <label>Full Name</label>
        <p>${item.name}</p>
      </div>
      <div class="detail-row">
        <label>Phone Number</label>
        <p><a href="tel:${item.phone}">${item.phone}</a></p>
      </div>
    </div>
    <div class="form-grid-2">
      <div class="detail-row">
        <label>Email Address</label>
        <p><a href="mailto:${item.email}">${item.email}</a></p>
      </div>
      <div class="detail-row">
        <label>Service Interested</label>
        <p style="color: var(--admin-primary); font-weight: 700;">${item.service}</p>
      </div>
    </div>
    <div class="detail-row">
      <label>Submitted Date</label>
      <p>${item.date}</p>
    </div>
    <div class="detail-row">
      <label>Project Details / Message</label>
      <p>${item.message}</p>
    </div>
    <div style="margin-top: 20px; display: flex; justify-content: flex-end;">
      <a href="mailto:${item.email}?subject=Re: Inquiry for ${encodeURIComponent(item.service)}" class="btn-sm btn-export" style="background: var(--admin-primary);">Reply via Mail</a>
    </div>
  `;

  document.getElementById('inquiryModal')?.classList.add('show');
}

function closeModal() {
  document.getElementById('inquiryModal')?.classList.remove('show');
}

/* --- Dynamic Site Settings Controller --- */
function getSiteSettings() {
  const raw = localStorage.getItem('tekzo_settings');
  if (!raw) return DEFAULT_SETTINGS;
  try { return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) }; } catch { return DEFAULT_SETTINGS; }
}

function populateSettingsForm() {
  const s = getSiteSettings();
  if (document.getElementById('setPhone')) document.getElementById('setPhone').value = s.phone;
  if (document.getElementById('setEmail')) document.getElementById('setEmail').value = s.email;
  if (document.getElementById('setAddress')) document.getElementById('setAddress').value = s.address;
  if (document.getElementById('setHoursWeek')) document.getElementById('setHoursWeek').value = s.hoursWeek;
  if (document.getElementById('setHoursSat')) document.getElementById('setHoursSat').value = s.hoursSat;
  if (document.getElementById('setHeroTitle')) document.getElementById('setHeroTitle').value = s.heroTitle || '';
}

function saveSiteSettings(e) {
  e.preventDefault();
  const next = {
    phone: document.getElementById('setPhone').value.trim(),
    email: document.getElementById('setEmail').value.trim(),
    address: document.getElementById('setAddress').value.trim(),
    hoursWeek: document.getElementById('setHoursWeek').value.trim(),
    hoursSat: document.getElementById('setHoursSat').value.trim(),
    heroTitle: document.getElementById('setHeroTitle').value.trim()
  };
  localStorage.setItem('tekzo_settings', JSON.stringify(next));
  alert('🎉 Dynamic Settings Saved!\n\nYour public website (index.html, contact.html) will now reflect these updated details automatically.');
}

function resetDefaultSettings() {
  if (!confirm('Reset all site contact details back to default values?')) return;
  localStorage.setItem('tekzo_settings', JSON.stringify(DEFAULT_SETTINGS));
  populateSettingsForm();
  alert('Reset complete.');
}

/* --- CSV Export --- */
function exportToCSV() {
  const list = getStoredInquiries();
  if (!list.length) return alert('No data to export');

  const headers = ['ID', 'Name', 'Phone', 'Email', 'Service', 'Date', 'Message'];
  const rows = list.map(i => [
    i.id,
    `"${i.name.replace(/"/g, '""')}"`,
    `"${i.phone}"`,
    `"${i.email}"`,
    `"${i.service.replace(/"/g, '""')}"`,
    `"${i.date}"`,
    `"${i.message.replace(/"/g, '""')}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `tekzo_inquiries_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
}
