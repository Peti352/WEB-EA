import { useState } from 'react';
import Calculator from './Calculator.jsx';
import TicTacToe from './TicTacToe.jsx';

export default function App() {
  const [page, setPage] = useState('calc');

  return (
    <div className="spa">
      <h1>Single Page Application</h1>
      <p>Két React mini-alkalmazás egy oldalon. Menüváltáskor nincs oldalújratöltés.</p>

      <nav className="spa-nav">
        <button
          className={page === 'calc' ? 'active' : ''}
          onClick={() => setPage('calc')}
        >
          Kalkulátor
        </button>
        <button
          className={page === 'ttt' ? 'active' : ''}
          onClick={() => setPage('ttt')}
        >
          Amőba (Tic-Tac-Toe)
        </button>
      </nav>

      {page === 'calc' && <Calculator />}
      {page === 'ttt' && <TicTacToe />}
    </div>
  );
}
