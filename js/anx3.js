/* ══════════════════════════════════════
   ANNEXURE III — CLUSTERS
   ══════════════════════════════════════ */
function addAnx3Row(tblId='anx3-clusters') {
  const tbody=document.querySelector('#'+tblId+' tbody');
  tbody.insertAdjacentHTML('beforeend',`<tr>
    <td contenteditable>Sutlej</td><td contenteditable>${tbody.rows.length+1}</td>
    <td contenteditable>NPRO_JL_PL_ST_XX</td>
    <td><select><option>Riverbed</option><option>Patta Land</option></select></td>
    <td contenteditable>Village Name</td>
    <td contenteditable oninput="calcClusterRow(this)">0</td>
    <td contenteditable oninput="calcClusterRow(this)">0</td>
    <td class="anx3-mineral">0</td>
    <td><button class="btn btn-xs btn-danger" onclick="delRow(this)">✕</button></td>
  </tr>`);
}

function addAnx3ContRow() {
  const tbody=document.querySelector('#anx3-contiguous tbody');
  tbody.insertAdjacentHTML('beforeend',`<tr>
    <td contenteditable>Sutlej</td><td contenteditable>CC-${tbody.rows.length+1}</td>
    <td contenteditable>1,2,3</td><td contenteditable>9</td>
    <td><select><option>Riverbed</option><option>Patta Land</option></select></td>
    <td contenteditable>0.55km</td><td contenteditable>Village Name</td>
    <td contenteditable>0</td><td contenteditable>0</td>
    <td><button class="btn btn-xs btn-danger" onclick="delRow(this)">✕</button></td>
  </tr>`);
}

function calcClusterRow(el) {
  const row=el.closest('tr');
  const cells=row.querySelectorAll('td[contenteditable]');
  // area is 5th, excav is 6th contenteditable
  const excav=parseFloat(cells[5]?.textContent)||0;
  const mineralCell=row.querySelector('.anx3-mineral');
  if (mineralCell) mineralCell.textContent=fmtN(excav*0.6,2);
}
