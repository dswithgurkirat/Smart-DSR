/* ══════════════════════════════════════
   ANNEXURE IV — TRANSPORTATION ROUTES
   ══════════════════════════════════════ */
function addAnx4Row() {
  const tbody=document.querySelector('#anx4-routes tbody');
  const n=tbody.rows.length+1;
  tbody.insertAdjacentHTML('beforeend',`<tr>
    <td contenteditable>${n}</td><td contenteditable>Lease ${n}</td><td contenteditable>A-A'</td>
    <td contenteditable>0</td><td contenteditable>0</td><td contenteditable>1.0</td>
    <td><select><option>Black Topped</option><option>Unpaved</option></select></td>
    <td><select><option>Black Topped</option><option>Unpaved</option></select></td>
    <td><select><option>Govt</option><option>Lease Owner</option></select></td>
    <td contenteditable>Route Map attached</td>
    <td><button class="btn btn-xs btn-danger" onclick="delRow(this)">✕</button></td>
  </tr>`);
}

function addAnx4ClusterRow() {
  const tbody=document.querySelector('#anx4-cluster-routes tbody');
  tbody.insertAdjacentHTML('beforeend',`<tr>
    <td contenteditable>Cluster ${tbody.rows.length+1}</td><td contenteditable>A-A'</td>
    <td contenteditable>0</td><td contenteditable>0</td><td contenteditable>1.0</td>
    <td><select><option>Black Topped</option><option>Unpaved</option></select></td>
    <td><select><option>Black Topped</option><option>Unpaved</option></select></td>
    <td><select><option>Govt</option><option>Lease Owner</option></select></td>
    <td contenteditable>Route Map attached</td>
    <td><button class="btn btn-xs btn-danger" onclick="delRow(this)">✕</button></td>
  </tr>`);
}
