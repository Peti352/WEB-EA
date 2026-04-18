// Vanilla JS CRUD - adatok tombben
(function () {
  const filmek = [...window.FILMEK_SEED];
  let nextId = Math.max(...filmek.map(f => f.id)) + 1;
  let editingId = null;

  const form = document.getElementById('film-form');
  const list = document.getElementById('film-list');
  const formTitle = document.getElementById('form-title');
  const saveBtn = document.getElementById('save-btn');
  const cancelBtn = document.getElementById('cancel-btn');

  function render() {
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
          <button type="button" data-edit="${f.id}">Módosít</button>
          <button type="button" class="danger" data-delete="${f.id}">Töröl</button>
        </td>
      `;
      list.appendChild(tr);
    });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
    );
  }

  function resetForm() {
    form.reset();
    editingId = null;
    document.getElementById('film-id').value = '';
    formTitle.textContent = 'Új film hozzáadása';
    saveBtn.textContent = 'Hozzáadás';
    cancelBtn.style.display = 'none';
  }

  function startEdit(id) {
    const f = filmek.find(x => x.id === id);
    if (!f) return;
    editingId = id;
    document.getElementById('film-id').value = f.id;
    document.getElementById('cim').value = f.cim;
    document.getElementById('rendezo').value = f.rendezo;
    document.getElementById('ev').value = f.ev;
    document.getElementById('mufaj').value = f.mufaj;
    document.getElementById('ertekeles').value = f.ertekeles;
    formTitle.textContent = 'Film módosítása (#' + id + ')';
    saveBtn.textContent = 'Mentés';
    cancelBtn.style.display = 'inline-block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const payload = {
      cim: document.getElementById('cim').value.trim(),
      rendezo: document.getElementById('rendezo').value.trim(),
      ev: parseInt(document.getElementById('ev').value, 10),
      mufaj: document.getElementById('mufaj').value.trim(),
      ertekeles: parseFloat(document.getElementById('ertekeles').value)
    };

    if (editingId) {
      const i = filmek.findIndex(f => f.id === editingId);
      filmek[i] = { id: editingId, ...payload };
    } else {
      filmek.push({ id: nextId++, ...payload });
    }
    resetForm();
    render();
  });

  cancelBtn.addEventListener('click', resetForm);

  list.addEventListener('click', (e) => {
    const editId = e.target.dataset.edit;
    const delId = e.target.dataset.delete;
    if (editId) startEdit(parseInt(editId, 10));
    if (delId && confirm('Biztosan törlöd?')) {
      const id = parseInt(delId, 10);
      const i = filmek.findIndex(f => f.id === id);
      if (i >= 0) filmek.splice(i, 1);
      render();
    }
  });

  render();
})();
