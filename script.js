const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
let currentInput = "";

// ✅ Check if we can add decimal
function canAddDecimal() {
const parts = currentInput.split(/[\+\-\*\/]/);
const lastNumber = parts[parts.length - 1];
return !lastNumber.includes(".");
}

// ✅ Function to update display
function updateDisplay() {
display.value = currentInput;
}

// ✅ Function to calculate safely
function calculate() {
try {
  currentInput = eval(currentInput).toString();
  updateDisplay();
} catch {
  display.value = "Error";
  currentInput = "";
}
}

// ✅ Handle button clicks
buttons.forEach((button) => {
button.addEventListener("click", () => {
  const value = button.textContent;

  if (value === "C") {
    currentInput = "";
    updateDisplay();
  } else if (value === "=") {
    calculate();
  } else if (value === ".") {
    if (canAddDecimal()) {
      currentInput += value;
      updateDisplay();
    }
  } else {
    // prevent starting with invalid operators
    if (["+", "*", "/"].includes(value) && currentInput === "") return;

    currentInput += value;
    updateDisplay();
  }
});
});

// ✅ Handle keyboard input
document.addEventListener("keydown", (event) => {
const key = event.key;

if (!isNaN(key) || ["+", "-", "*", "/"].includes(key)) {
  // prevent starting with invalid operators
  if (["+", "*", "/"].includes(key) && currentInput === "") return;

  currentInput += key;
  updateDisplay();
} else if (key === ".") {
  if (canAddDecimal()) {
    currentInput += key;
    updateDisplay();
  }
} else if (key === "Enter") {
  calculate();
} else if (key === "Backspace") {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
} else if (key.toLowerCase() === "c") {
  currentInput = "";
  updateDisplay();
}
});
