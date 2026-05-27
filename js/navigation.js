/* ══════════════════════════════════════
   NAVIGATION & UTILS
══════════════════════════════════════ */
function initApp() {
  renderDashboard(); renderProjects(); renderChapters(); renderPlates();
  initDemandTable(); initSummaryTable(); initAuctionTable();
  renderSignatures(); renderFinalChecklist();
  renderGraphs(); // Ensure graphs exist so plates can link to them
  document.getElementById('badge-projs').textContent = S.projects.length;
  document.getElementById('sb-pending-sigs').textContent = S.signatures.filter(s=>!s.signed).length;
}

function showView(id, btn) {
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.querySelectorAll('.sb-item').forEach(b=>b.classList.remove('active'));
  const el = document.getElementById('view-'+id);
  if (el) el.classList.add('active');
  if (btn) btn.classList.add('active');
  const titles = {
    'dashboard':'Dashboard','projects':'My DSR Projects','workflow':'Report Workflow',
    'front-matter':'Front Matter','chapters':'Chapters (10)','plates':'Plate Section',
    'graphs':'Cross Section Graph Generator','anx1':'Annexure I — Sand Sources',
    'anx2':'Annexure II — Mining Leases','anx3':'Annexure III — Cluster Details',
    'anx4':'Annexure IV — Transportation Routes','anx5':'Annexure V — Bench Mark & CORS',
    'anx6':'Annexure VI — Final Cluster Details','anx7':'Annexure VII — Final Patta Lands',
    'annexures-extra':'Additional Annexures','demand-table':'Projected Demand Table',
    'auction-table':'Auctioned Sites','summary-table':'Source Summary Table','benchmark-table':'Bench Mark & CORS',
    'esign':'E-Signature Panel','generate':'Generate Final PDF','history':'Report History','users':'User Management'
  };
  document.getElementById('topbar-title').textContent = titles[id]||id;
  if (id==='esign') renderSignatures();
  if (id==='generate') renderFinalChecklist();
  if (id==='plates') renderPlates(); // Re-render in case new graphs were added
}

let confirmCallback = null;

function customConfirm(msg, cb) {
  document.getElementById('confirm-msg').textContent = msg;
  confirmCallback = cb;
  document.getElementById('modal-confirm').classList.add('open');
}

function doConfirm() {
  closeModal('modal-confirm');
  if (confirmCallback) confirmCallback();
}

function closeModal(id) { document.getElementById(id).classList.remove('open'); }

// Bind close modal on clicking overlay background
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.modal-overlay').forEach(m => {
    m.addEventListener('click', e => { if(e.target===m) m.classList.remove('open'); });
  });
});

let toastTimer;
function toast(msg, type='info') {
  const el=document.getElementById('toast');
  if (!el) return;
  el.textContent=msg; el.className=`toast toast-${type} show`;
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>el.classList.remove('show'),4200);
}

function fmtN(n,d=0) {
  return Number.isFinite(n)?Number(n).toLocaleString('en-IN',{minimumFractionDigits:d,maximumFractionDigits:d}):'—';
}
