/* ══════════════════════════════════════
   ANNEXURE II — MINING LEASES
   ══════════════════════════════════════ */
function addAnx2Row() {
  const tbody=document.querySelector('#anx2-leases tbody');
  const n=tbody.rows.length+1;
  tbody.insertAdjacentHTML('beforeend',`<tr>
    <td contenteditable>${n}</td><td contenteditable>Sutlej</td><td contenteditable>JL-ST-0${n}</td>
    <td contenteditable>New Lease ${n}</td><td contenteditable>5.0</td>
    <td contenteditable class="coord-input">31°00'00"N</td><td contenteditable class="coord-input">75°00'00"E</td>
    <td contenteditable>1.5</td><td><select><option>Yes</option><option>No</option></select></td>
    <td contenteditable>1.52</td><td contenteditable>3</td><td contenteditable>114000</td><td contenteditable>68400</td>
    <td contenteditable>Sand</td><td><select><option>Existing</option><option>Proposed</option></select></td>
    <td contenteditable>—</td><td><button class="btn btn-xs btn-danger" onclick="delRow(this)">✕</button></td>
  </tr>`);
}
