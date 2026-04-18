import { useEffect, useState } from 'react';
import axios from 'axios';

// A PHP backend a domain gyökerében van (/api/).
// Fejlesztéshez (vite dev) allithato a VITE_API_BASE env-ben.
const API = import.meta.env.VITE_API_BASE || '/api/';

const EMPTY = { cim: '', rendezo: '', ev: '', mufaj: '', ertekeles: '' };

export default function App() {
  const [filmek, setFilmek] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const flash = (text, type = 'success') => {
    setMsg({ text, type });
    setTimeout(() => setMsg(null), 3000);
  };

  const loadList = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API + 'list.php');
      if (!res.data.success) throw new Error(res.data.error || 'Hiba');
      setFilmek(res.data.data);
    } catch (e) {
      flash('Betöltési hiba: ' + e.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadList(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      cim: form.cim.trim(),
      rendezo: form.rendezo.trim(),
      ev: parseInt(form.ev, 10),
      mufaj: form.mufaj.trim(),
      ertekeles: parseFloat(form.ertekeles)
    };
    try {
      const res = editingId
        ? await axios.post(API + 'update.php', { id: editingId, ...payload })
        : await axios.post(API + 'create.php', payload);
      if (!res.data.success) throw new Error(res.data.error || 'Hiba');
      flash(editingId ? 'Sikeres módosítás' : 'Sikeres hozzáadás');
      setForm(EMPTY);
      setEditingId(null);
      await loadList();
    } catch (err) {
      flash('Hiba: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (f) => {
    setEditingId(f.id);
    setForm({ cim: f.cim, rendezo: f.rendezo, ev: f.ev, mufaj: f.mufaj, ertekeles: f.ertekeles });
  };

  const handleDelete = async (id) => {
    if (!confirm('Biztosan törlöd?')) return;
    setLoading(true);
    try {
      const res = await axios.post(API + 'delete.php', { id });
      if (!res.data.success) throw new Error(res.data.error || 'Hiba');
      flash('Sikeres törlés');
      await loadList();
    } catch (err) {
      flash('Hiba: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm(EMPTY);
  };

  return (
    <div className="app">
      <h1>Axios + PHP CRUD – Filmek</h1>
      <p>React + Axios HTTP kliens. A szerveroldali CRUD-ot ugyanaz a PHP API végzi, mint amit a Fetch API oldal is használ.</p>

      {msg && <div className={`msg ${msg.type}`}>{msg.text}</div>}
      {loading && <div className="msg info">Betöltés…</div>}

      <section className="card">
        <h2>{editingId ? `Film módosítása (#${editingId})` : 'Új film hozzáadása'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <input name="cim" value={form.cim} onChange={handleChange} placeholder="Cím" required />
            <input name="rendezo" value={form.rendezo} onChange={handleChange} placeholder="Rendező" required />
            <input name="ev" type="number" value={form.ev} onChange={handleChange} placeholder="Év" required />
            <input name="mufaj" value={form.mufaj} onChange={handleChange} placeholder="Műfaj" required />
            <input name="ertekeles" type="number" step="0.1" min="0" max="10" value={form.ertekeles} onChange={handleChange} placeholder="Értékelés" required />
          </div>
          <div className="button-row">
            <button type="submit" disabled={loading}>{editingId ? 'Mentés' : 'Hozzáadás'}</button>
            {editingId && <button type="button" className="secondary" onClick={handleCancel}>Mégse</button>}
          </div>
        </form>
      </section>

      <section className="card">
        <h2>Filmek listája ({filmek.length})</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Cím</th><th>Rendező</th><th>Év</th><th>Műfaj</th><th>Értékelés</th><th>Műveletek</th>
            </tr>
          </thead>
          <tbody>
            {filmek.map(f => (
              <tr key={f.id}>
                <td>{f.id}</td>
                <td>{f.cim}</td>
                <td>{f.rendezo}</td>
                <td>{f.ev}</td>
                <td>{f.mufaj}</td>
                <td>{f.ertekeles}</td>
                <td className="actions">
                  <button className="small" onClick={() => handleEdit(f)} disabled={loading}>Módosít</button>
                  <button className="small danger" onClick={() => handleDelete(f.id)} disabled={loading}>Töröl</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
