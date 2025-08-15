// calculator.js

document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const buttons = document.querySelectorAll(".btn");

  let currentInput = "";
  let operator = "";
  let firstValue = "";
  let shouldResetDisplay = false;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.dataset.value;

      if (!isNaN(value) || value === ".") {
        appendNumber(value);
      } else if (["+", "-", "*", "/"].includes(value)) {
        chooseOperator(value);
      } else if (value === "=") {
        calculate();
      } else if (value === "C") {
        clear();
      } else if (value === "DEL") {
        deleteLast();
      }
    });
  });

  function appendNumber(number) {
    if (shouldResetDisplay) {
      currentInput = "";
      shouldResetDisplay = false;
    }
    if (number === "." && currentInput.includes(".")) return;
    currentInput += number;
    updateDisplay();
  }

  function chooseOperator(op) {
    if (currentInput === "") return;
    if (firstValue !== "") {
      calculate();
    }
    operator = op;
    firstValue = currentInput;
    shouldResetDisplay = true;
  }

  function calculate() {
    if (firstValue === "" || currentInput === "") return;
    let result;
    const prev = parseFloat(firstValue);
    const curr = parseFloat(currentInput);

    switch (operator) {
      case "+":
        result = prev + curr;
        break;
      case "-":
        result = prev - curr;
        break;
      case "*":
        result = prev * curr;
        break;
      case "/":
        result = curr !== 0 ? prev / curr : "Error";
        break;
      default:
        return;
    }
    currentInput = result.toString();
    operator = "";
    firstValue = "";
    updateDisplay();
  }

  function clear() {
    currentInput = "";
    operator = "";
    firstValue = "";
    updateDisplay();
  }

  function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
  }

  function updateDisplay() {
    display.textContent = currentInput || "0";
  }
});
