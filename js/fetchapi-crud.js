// Fetch API + PHP CRUD
(function () {
  const API = 'api/';
  const form = document.getElementById('film-form');
  const list = document.getElementById('film-list');
  const formTitle = document.getElementById('form-title');
  const saveBtn = document.getElementById('save-btn');
  const cancelBtn = document.getElementById('cancel-btn');
  const msg = document.getElementById('msg');
  let editingId = null;

  function showMsg(text, type = 'success') {
    msg.innerHTML = `<div class="msg ${type}">${text}</div>`;
    setTimeout(() => { msg.innerHTML = ''; }, 3000);
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
    );
  }

  async function apiGet(endpoint) {
    const r = await fetch(API + endpoint);
    return r.json();
  }

  async function apiPost(endpoint, payload) {
    const r = await fetch(API + endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return r.json();
  }

  async function loadList() {
    try {
      const res = await apiGet('list.php');
      if (!res.success) throw new Error(res.error || 'Ismeretlen hiba');
      renderRows(res.data);
    } catch (e) {
      showMsg('Hiba a lista betoltesekor: ' + e.message, 'error');
    }
  }

  function renderRows(filmek) {
    list.innerHTML = '';
    filmek.forEach(f => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${f.id}</td>
        <td>${escapeHtml(f.cim)}</td>
        <td>${escapeHtml(f.rendezo)}</td>
        <td>${f.ev}</td>
        <td>${escapeHtml(f.mufaj)}</td>
        <td>${f.ertekeles}</td>
        <td class="actions">
          <button type="button" data-edit='${JSON.stringify(f)}'>Módosít</button>
          <button type="button" class="danger" data-delete="${f.id}">Töröl</button>
        </td>
      `;
      list.appendChild(tr);
    });
  }

  function resetForm() {
    form.reset();
    editingId = null;
    document.getElementById('film-id').value = '';
    formTitle.textContent = 'Új film hozzáadása';
    saveBtn.textContent = 'Hozzáadás';
    cancelBtn.style.display = 'none';
  }

  function startEdit(f) {
    editingId = f.id;
    document.getElementById('film-id').value = f.id;
    document.getElementById('cim').value = f.cim;
    document.getElementById('rendezo').value = f.rendezo;
    document.getElementById('ev').value = f.ev;
    document.getElementById('mufaj').value = f.mufaj;
    document.getElementById('ertekeles').value = f.ertekeles;
    formTitle.textContent = 'Film módosítása (#' + f.id + ')';
    saveBtn.textContent = 'Mentés';
    cancelBtn.style.display = 'inline-block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
      cim: document.getElementById('cim').value.trim(),
      rendezo: document.getElementById('rendezo').value.trim(),
      ev: parseInt(document.getElementById('ev').value, 10),
      mufaj: document.getElementById('mufaj').value.trim(),
      ertekeles: parseFloat(document.getElementById('ertekeles').value)
    };

    try {
      let res;
      if (editingId) {
        res = await apiPost('update.php', { id: editingId, ...payload });
      } else {
        res = await apiPost('create.php', payload);
      }
      if (!res.success) throw new Error(res.error || 'Ismeretlen hiba');
      showMsg(editingId ? 'Sikeres módosítás' : 'Sikeres hozzáadás');
      resetForm();
      await loadList();
    } catch (err) {
      showMsg('Hiba: ' + err.message, 'error');
    }
  });

  cancelBtn.addEventListener('click', resetForm);

  list.addEventListener('click', async (e) => {
    if (e.target.dataset.edit) {
      startEdit(JSON.parse(e.target.dataset.edit));
    }
    if (e.target.dataset.delete && confirm('Biztosan törlöd?')) {
      try {
        const res = await apiPost('delete.php', { id: parseInt(e.target.dataset.delete, 10) });
        if (!res.success) throw new Error(res.error || 'Ismeretlen hiba');
        showMsg('Sikeres törlés');
        await loadList();
      } catch (err) {
        showMsg('Hiba: ' + err.message, 'error');
      }
    }
  });

  loadList();
})();
