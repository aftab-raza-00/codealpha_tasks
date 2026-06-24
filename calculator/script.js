// ── State variables ──
let current  = '0';   // abhi jo number screen pe hai
let prev     = '';    // pehla number (operator se pehle)
let op       = '';    // selected operator: +, −, ×, ÷
let justCalc = false; // = dabane ke baad flag

// ── DOM references ──
const display = document.getElementById('result');
const expr    = document.getElementById('expr');
const opIds   = ['op-div', 'op-mul', 'op-sub', 'op-add'];

// ── Helper: screen update ──
function updateDisplay(val) {
  let s = val.toString();
  // agar number bahut lamba ho toh precision limit karo
  if (s.length > 9 && val !== 'Error') {
    s = parseFloat(parseFloat(val).toPrecision(6)).toString();
  }
  display.textContent = s;
}

// ── Helper: operator buttons ka active highlight hata do ──
function clearActiveOps() {
  opIds.forEach(id => document.getElementById(id).classList.remove('active'));
}

// ────────────────────────────────────────────
// Number button click
// ────────────────────────────────────────────
function calcNum(n) {
  if (justCalc) {
    // naya number start
    current  = n;
    justCalc = false;
  } else if (current === '0') {
    current = n;          // leading zero replace karo
  } else {
    current += n;         // digit append karo
  }
  clearActiveOps();
  updateDisplay(current);
}

// ────────────────────────────────────────────
// Operator button click  (+, −, ×, ÷)
// ────────────────────────────────────────────
function calcOp(o) {
  // agar pehle se operator tha aur user ne naya number diya — pehle calculate karo
  if (op && !justCalc) calcEquals(true);

  prev     = current;
  op       = o;
  justCalc = true;

  expr.textContent = prev + ' ' + op;

  // highlight karo selected operator
  clearActiveOps();
  const map = { '÷': 'op-div', '×': 'op-mul', '−': 'op-sub', '+': 'op-add' };
  if (map[o]) document.getElementById(map[o]).classList.add('active');
}

// ────────────────────────────────────────────
// Equals  (= button)
// fromOp = true matlab chain calculation hai
// ────────────────────────────────────────────
function calcEquals(fromOp = false) {
  if (!op || prev === '') return;

  let a   = parseFloat(prev);
  let b   = parseFloat(current);
  let res;

  if      (op === '+') res = a + b;
  else if (op === '−') res = a - b;
  else if (op === '×') res = a * b;
  else if (op === '÷') res = b !== 0 ? a / b : 'Error';

  if (!fromOp) {
    expr.textContent = prev + ' ' + op + ' ' + current + ' =';
    op   = '';
    prev = '';
  }

  let resStr = res === 'Error'
    ? 'Error'
    : parseFloat(res.toPrecision(10)).toString();

  current  = resStr;
  justCalc = !fromOp;

  clearActiveOps();
  updateDisplay(current);
}

// ────────────────────────────────────────────
// AC — All Clear
// ────────────────────────────────────────────
function calcAC() {
  current  = '0';
  prev     = '';
  op       = '';
  justCalc = false;
  expr.textContent = '';
  clearActiveOps();
  updateDisplay('0');
}

// ────────────────────────────────────────────
// ⌫ — Backspace (last digit hatao)
// ────────────────────────────────────────────
function calcDel() {
  if (justCalc || current.length <= 1) {
    current = '0';
  } else {
    current = current.slice(0, -1);
  }
  updateDisplay(current);
}

// ────────────────────────────────────────────
// % — Percentage
// ────────────────────────────────────────────
function calcPercent() {
  let n = parseFloat(current);

  // agar operator selected hai toh relative percentage
  if (op && prev) {
    n = parseFloat(prev) * n / 100;
  } else {
    n = n / 100;
  }

  current = parseFloat(n.toPrecision(10)).toString();
  updateDisplay(current);
}

// ────────────────────────────────────────────
// +/− — Sign toggle
// ────────────────────────────────────────────
function calcPlusMinus() {
  let n = parseFloat(current) * -1;
  current = parseFloat(n.toPrecision(10)).toString();
  updateDisplay(current);
}

// ────────────────────────────────────────────
// . — Decimal point
// ────────────────────────────────────────────
function calcDot() {
  if (justCalc) {
    current  = '0.';
    justCalc = false;
  } else if (!current.includes('.')) {
    current += '.';
  }
  updateDisplay(current);
}