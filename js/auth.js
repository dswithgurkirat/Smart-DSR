/* ══════════════════════════════════════
   AUTH
══════════════════════════════════════ */
function switchAuthTab(t) {
  document.querySelectorAll('.auth-tab').forEach((el,i) => el.classList.toggle('active', i===0?t==='login':t==='signup'));
  document.getElementById('auth-form-login').classList.toggle('active', t==='login');
  document.getElementById('auth-form-signup').classList.toggle('active', t==='signup');
}

function doLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pass = document.getElementById('login-pass').value;
  const role = document.getElementById('login-role').value;
  const err = document.getElementById('login-error');
  if (!email || !pass) { err.style.display='block'; err.textContent='Please fill all fields.'; return; }
  err.style.display='none';
  S.user = { name: email.split('@')[0].replace(/\./g,' ').replace(/\b\w/g,c=>c.toUpperCase()), email, role };
  S.role = role;
  if (role==='authority') showAuthorityScreen();
  else showAppScreen();
}

function doAuthorityQuickLogin() {
  S.user = { name:'Dr. Suresh Verma', email:'dmo@punjab.gov.in', role:'authority' };
  S.role = 'authority';
  showAuthorityScreen();
}

function doSignup() {
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const pass = document.getElementById('signup-pass').value;
  const err = document.getElementById('signup-error');
  const ok = document.getElementById('signup-success');
  if (!name||!email||!pass) { err.style.display='block'; err.textContent='Please fill all required fields.'; return; }
  if (pass.length<6) { err.style.display='block'; err.textContent='Password must be at least 6 characters.'; return; }
  err.style.display='none'; ok.style.display='block'; ok.textContent='✅ Account created! You can now log in.';
  setTimeout(()=>switchAuthTab('login'),1500);
}

function doLogout() {
  S.user=null; S.role='user';
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('screen-auth').classList.add('active');
}

function showAppScreen() {
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('screen-app').classList.add('active');
  const init = S.user.name.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase();
  document.getElementById('sb-avatar').textContent = init;
  document.getElementById('sb-uname').textContent = S.user.name;
  document.getElementById('sb-urole').textContent = S.role==='admin'?'System Admin':S.role==='reviewer'?'Section Reviewer':'Report Coordinator';
  initApp();
}

function showAuthorityScreen() {
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('screen-authority').classList.add('active');
  document.getElementById('auth-user-label').textContent = S.user.name + ' · Authority';
  renderAuthorityReports();
}
