import { useState } from 'react';

function Square({ value, onClick }) {
  const cls = 'ttt-cell' + (value === 'X' ? ' x' : value === 'O' ? ' o' : '');
  return (
    <button className={cls} onClick={onClick} disabled={!!value}>
      {value}
    </button>
  );
}

function calcWinner(cells) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (const [a, b, c] of lines) {
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) return cells[a];
  }
  return null;
}

export default function TicTacToe() {
  const [cells, setCells] = useState(Array(9).fill(null));
  const [xNext, setXNext] = useState(true);

  const winner = calcWinner(cells);
  const isDraw = !winner && cells.every(Boolean);

  const click = (i) => {
    if (cells[i] || winner) return;
    const next = [...cells];
    next[i] = xNext ? 'X' : 'O';
    setCells(next);
    setXNext(!xNext);
  };

  const reset = () => {
    setCells(Array(9).fill(null));
    setXNext(true);
  };

  const status = winner
    ? `Nyertes: ${winner}`
    : isDraw
      ? 'Döntetlen'
      : `Következik: ${xNext ? 'X' : 'O'}`;

  return (
    <div className="ttt">
      <div className="ttt-status">{status}</div>
      <div className="ttt-board">
        {cells.map((v, i) => <Square key={i} value={v} onClick={() => click(i)} />)}
      </div>
      <button className="reset" onClick={reset}>Új játék</button>
    </div>
  );
}
