import { useState } from 'react';

const SEED = [
  { id: 1, cim: 'Valami Amerika',     rendezo: 'Herendi Gábor',       ev: 2002, mufaj: 'vígjáték', ertekeles: 8.2 },
  { id: 2, cim: 'Kontroll',           rendezo: 'Antal Nimród',        ev: 2003, mufaj: 'dráma',    ertekeles: 7.9 },
  { id: 3, cim: 'Liza, a rókatündér', rendezo: 'Ujj-Mészáros Károly', ev: 2015, mufaj: 'fantasy',  ertekeles: 7.5 },
  { id: 4, cim: 'Sose halunk meg',    rendezo: 'Koltai Róbert',       ev: 1993, mufaj: 'vígjáték', ertekeles: 8.0 },
  { id: 5, cim: 'Inception',          rendezo: 'Christopher Nolan',   ev: 2010, mufaj: 'sci-fi',   ertekeles: 8.8 }
];

const EMPTY = { cim: '', rendezo: '', ev: '', mufaj: '', ertekeles: '' };

export default function App() {
  const [filmek, setFilmek] = useState(SEED);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      cim: form.cim.trim(),
      rendezo: form.rendezo.trim(),
      ev: parseInt(form.ev, 10),
      mufaj: form.mufaj.trim(),
      ertekeles: parseFloat(form.ertekeles)
    };

    if (editingId) {
      setFilmek(filmek.map(f => f.id === editingId ? { id: editingId, ...payload } : f));
    } else {
      const nextId = Math.max(0, ...filmek.map(f => f.id)) + 1;
      setFilmek([...filmek, { id: nextId, ...payload }]);
    }
    setForm(EMPTY);
    setEditingId(null);
  };

  const handleEdit = (f) => {
    setEditingId(f.id);
    setForm({ cim: f.cim, rendezo: f.rendezo, ev: f.ev, mufaj: f.mufaj, ertekeles: f.ertekeles });
  };

  const handleDelete = (id) => {
    if (confirm('Biztosan törlöd?')) {
      setFilmek(filmek.filter(f => f.id !== id));
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm(EMPTY);
  };

  return (
    <div className="app">
      <h1>React CRUD – Filmek</h1>
      <p>React komponensek + <code>useState</code> hook. Az adatok a kliens oldali állapotban élnek.</p>

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
            <button type="submit">{editingId ? 'Mentés' : 'Hozzáadás'}</button>
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
                  <button className="small" onClick={() => handleEdit(f)}>Módosít</button>
                  <button className="small danger" onClick={() => handleDelete(f.id)}>Töröl</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
