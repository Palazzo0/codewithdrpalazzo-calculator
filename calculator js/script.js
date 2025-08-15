// DARK MODE HANDLING
const modeToggle = document.getElementById('modeToggle');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

function setTheme(dark) {
    document.body.classList.toggle('dark', dark);
    localStorage.setItem('dp_theme', dark ? 'dark' : 'light');
    modeToggle.textContent = dark ? '☀' : '🌙';
}

// INITIALIZE THEME
const saved = localStorage.getItem('dp_theme');
if (saved) setTheme(saved === 'dark');
else setTheme(prefersDark);


modeToggle.addEventListener('click', () => {
    setTheme(!document.body.classList.contains('dark'));
})

// CALCULATOT LOGIC

const display = document.getElementById('display');
const keys = document.querySelector('.keys');


let current = '0';
let previous = null;
let op = null

function updateDisplay(value = current) {
    display.value = value;
}

function appendNumber(n) {
    if (n === '.' && current.includes('.')) return;
    if (current === '0' && n !== '.')
        current = n;
    else current += n;
    updateDisplay();

}

function chooseOperation(nextOp) {
  // If changing operator before entering new number
  if (op && (current === "" || current === "0") && previous !== null) {
    op = nextOp;
    return;
  }
  if (previous === null) {
    previous = parseFloat(current);
  } else if (op) {
    previous = compute(previous, parseFloat(current), op);
    updateDisplay(String(previous));
  }
  current = "0";
  op = nextOp;
}

function compute(a, b, operator) {
  if (operator === "+") return a + b;
  if (operator === "-") return a - b;
  if (operator === "*") return a * b;
  if (operator === "/") {
    if (b === 0) return "Err÷0";
    return a / b;
  }
  if (operator === "%") return a % b;
  return b;
}

function chooseOperation(nextOp) {
  // If changing operator before entering new number
  if (op && (current === "" || current === "0") && previous !== null) {
    op = nextOp;
    return;
  }
  if (previous === null) {
    previous = parseFloat(current);
  } else if (op) {
    previous = compute(previous, parseFloat(current), op);
    updateDisplay(String(previous));
  }
  current = "0";
  op = nextOp;
}

function compute(a, b, operator) {
  if (operator === "+") return a + b;
  if (operator === "-") return a - b;
  if (operator === "*") return a * b;
  if (operator === "/") {
    if (b === 0) return "Err÷0";
    return a / b;
  }
  if (operator === "%") return a % b;
  return b;
}

// Keyboard support
window.addEventListener('keydown', (e) => {
  const k = e.key;

  if ((k >= '0' && k <= '9') || k === '.') appendNumber(k);
  else if (['+', '-', '*', '/','%'].includes(k)) chooseOperation(k);
  else if (k === 'Enter' || k === '=') equals();
  else if (k === 'Backspace') backspace();
  else if (k.toLowerCase() === 'c' || k === 'Escape') clearAll();
});

// Start with 0 on screen
updateDisplay();