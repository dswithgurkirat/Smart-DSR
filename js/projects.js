/* ══════════════════════════════════════
   PROJECTS & DASHBOARD
══════════════════════════════════════ */
function renderDashboard() {
  const done = S.projects.filter(p=>p.progress===100).length;
  const pend = S.signatures.filter(s=>!s.signed).length;
  
  const totalEl = document.getElementById('d-total');
  const doneEl = document.getElementById('d-done');
  const sigsEl = document.getElementById('d-sigs');
  const pdfsEl = document.getElementById('d-pdfs');
  
  if (totalEl) totalEl.textContent = S.projects.length;
  if (doneEl) doneEl.textContent = done;
  if (sigsEl) sigsEl.textContent = pend;
  if (pdfsEl) pdfsEl.textContent = done+1;
  
  const el = document.getElementById('dash-recent');
  if (el) el.innerHTML = S.projects.slice(0,3).map(p=>`
    <div class="file-item" style="margin-bottom:8px;cursor:pointer" onclick="openProject(${p.id})">
      <div class="file-icon" style="background:${p.progress===100?'#d1fae5':p.progress>50?'#dbeafe':'#fef3c7'}">${p.progress===100?'✅':'📋'}</div>
      <div class="file-info"><div class="file-name">${p.title}</div><div class="file-meta">${p.district} · ${p.year}</div></div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
        <span class="badge ${p.status==='Completed'?'badge-green':p.status==='In Progress'?'badge-teal':'badge-amber'}">${p.status}</span>
        <span style="font-size:10px;color:var(--text-faint)">${p.progress}%</span>
      </div>
    </div>`).join('');
}

function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  grid.innerHTML = S.projects.map(p=>`
    <div class="proj-card" onclick="openProject(${p.id})">
      <div class="proj-card-top"><h3>${p.title}</h3><p>${p.district} District · ${p.year}</p></div>
      <div class="proj-card-bd">
        <div class="proj-meta">
          <span class="badge badge-navy">⛏ ${p.mineral}</span>
          <span class="badge badge-teal">🌊 ${p.rivers}</span>
          <span class="badge ${p.status==='Completed'?'badge-green':p.status==='In Progress'?'badge-teal':'badge-amber'}">${p.status}</span>
        </div>
        <div style="font-size:10.5px;color:var(--text-faint);margin-bottom:10px">Created: ${p.createdAt} · Sigs: ${p.signatures}/5</div>
        <div style="display:flex;align-items:center;gap:8px">
          <div class="progress-bar" style="flex:1"><div class="progress-fill" style="width:${p.progress}%;background:${p.progress===100?'var(--green)':'linear-gradient(90deg,var(--teal),var(--teal-2))'}"></div></div>
          <span style="font-size:11px;font-weight:700;color:var(--navy)">${p.progress}%</span>
        </div>
      </div>
    </div>`).join('');
}

function openProject(id) {
  S.activeProject = S.projects.find(p=>p.id===id);
  ['report-nav','annexure-nav','tables-nav','finalize-nav'].forEach(n=>{
    const el=document.getElementById(n); if(el) el.style.display='block';
  });
  const dist = S.activeProject.district;
  const badgeEl = document.getElementById('tb-district-badge');
  if (badgeEl) badgeEl.textContent = dist;
  
  const fmDistEl = document.getElementById('fm-district');
  if (fmDistEl) fmDistEl.value=dist;
  
  showView('front-matter',null);
  toast('📁 Opened: '+dist+' DSR Project','info');
}

function newProjectModal() { 
  const el = document.getElementById('modal-project');
  if (el) el.classList.add('open'); 
}

function createProject() {
  const title = document.getElementById('proj-title').value || `District Survey Report — ${document.getElementById('proj-district').value}`;
  const proj = {
    id: Date.now(), title,
    district: document.getElementById('proj-district').value,
    year: document.getElementById('proj-year').value,
    mineral: document.getElementById('proj-mineral').value,
    rivers: document.getElementById('proj-rivers').value||'Not specified',
    progress:0, status:'Draft', createdAt: new Date().toLocaleString('en-US', {month: 'short', day: 'numeric', year: 'numeric'}), signatures:0
  };
  S.projects.unshift(proj);
  closeModal('modal-project');
  renderProjects(); renderDashboard();
  const badgeEl = document.getElementById('badge-projs');
  if (badgeEl) badgeEl.textContent = S.projects.length;
  openProject(proj.id);
  toast('✅ DSR Project created successfully!','success');
}
