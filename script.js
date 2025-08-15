// ===== Dark mode handling =====
const modeToggle = document.getElementById("modeToggle");
const prefersDark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

function setTheme(dark) {
  document.body.classList.toggle("dark", dark);
  localStorage.setItem("dp_theme", dark ? "dark" : "light");
  modeToggle.textContent = dark ? "🌞" : "🌙";
}

// Initialize theme
const saved = localStorage.getItem("dp_theme");
if (saved) setTheme(saved === "dark");
else setTheme(prefersDark);

modeToggle.addEventListener("click", () => {
  setTheme(!document.body.classList.contains("dark"));
});

// ===== Calculator logic (no eval) =====
const display = document.getElementById("display");
const keys = document.querySelector(".keys");

let current = "0"; // current number being typed
let previous = null; // previous number
let op = null; // current operator

function updateDisplay(value = current) {
  display.value = value;
}

function appendNumber(n) {
  if (n === "." && current.includes(".")) return;
  if (current === "0" && n !== ".") current = n;
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

function equals() {
  if (op === null || previous === null) return;
  const result = compute(previous, parseFloat(current), op);
  current = String(result);
  previous = null;
  op = null;
  updateDisplay();
}

function clearAll() {
  current = "0";
  previous = null;
  op = null;
  updateDisplay();
}

function backspace() {
  if (current.length <= 1) current = "0";
  else current = current.slice(0, -1);
  updateDisplay();
}

// Button clicks (event delegation)
keys.addEventListener("click", (e) => {
  console.log('button clicked:', e.target);
  const tgt = e.target.closest("button");
  if (!tgt) return;
console.log( "appending number:", n, "current before:", current);

  if (tgt.dataset.num !== undefined) {
    appendNumber( tgt.dataset.num);
    return;
  }
  if (tgt.dataset.op !== undefined) {
    chooseOperation(tgt.dataset.op);
    return;
  }

  const action = tgt.dataset.action;
  if (action === "equals") equals();
  else if (action === "clear") clearAll();
  else if (action === "backspace") backspace();
});

// Keyboard support
window.addEventListener("keydown", (e) => {
  const k = e.key;

  if ((k >= "0" && k <= "9") || k === ".") appendNumber(k);
  else if (["+", "-", "*", "/", "%"].includes(k)) chooseOperation(k);
  else if (k === "Enter" || k === "=") equals();
  else if (k === "Backspace") backspace();
  else if (k.toLowerCase() === "c" || k === "Escape") clearAll();
});

// Start with 0 on screen
updateDisplay();
