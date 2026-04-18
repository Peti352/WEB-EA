import { useState } from 'react';

// Egyszeru kalkulator komponens - useState allapotkezelessel.
// Forras alapja: klasszikus React tutorial-kalkulator minta (React hivatalos docs + tutorialspoint).
export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [expr, setExpr] = useState('');
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (d) => {
    if (waitingForOperand) {
      setDisplay(String(d));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(d) : display + d);
    }
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setExpr('');
    setWaitingForOperand(false);
  };

  const performOp = (op) => {
    setExpr(display + ' ' + op);
    setWaitingForOperand(true);
  };

  const calculate = () => {
    if (!expr) return;
    try {
      const full = expr + ' ' + display;
      const safe = full.replace(/[^0-9+\-*/.\s]/g, '');
      // eslint-disable-next-line no-new-func
      const result = Function('return ' + safe)();
      setDisplay(String(Number(result.toFixed(10))));
      setExpr('');
      setWaitingForOperand(true);
    } catch {
      setDisplay('Hiba');
      setExpr('');
    }
  };

  return (
    <div className="calc">
      <div className="calc-display">
        <div className="expr">{expr || '\u00A0'}</div>
        <div>{display}</div>
      </div>
      <div className="calc-grid">
        <button className="clear" onClick={clear}>AC</button>
        <button className="op" onClick={() => performOp('/')}>÷</button>
        <button className="op" onClick={() => performOp('*')}>×</button>
        <button className="op" onClick={() => performOp('-')}>−</button>

        <button onClick={() => inputDigit(7)}>7</button>
        <button onClick={() => inputDigit(8)}>8</button>
        <button onClick={() => inputDigit(9)}>9</button>
        <button className="op" onClick={() => performOp('+')}>+</button>

        <button onClick={() => inputDigit(4)}>4</button>
        <button onClick={() => inputDigit(5)}>5</button>
        <button onClick={() => inputDigit(6)}>6</button>
        <button onClick={inputDot}>.</button>

        <button onClick={() => inputDigit(1)}>1</button>
        <button onClick={() => inputDigit(2)}>2</button>
        <button onClick={() => inputDigit(3)}>3</button>
        <button onClick={() => inputDigit(0)}>0</button>

        <button className="eq" onClick={calculate}>=</button>
      </div>
    </div>
  );
}
