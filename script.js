const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");
const themeToggle = document.getElementById("themeToggle");
const soundToggle = document.getElementById("soundToggle");
const backspaceBtn = document.getElementById("backspace");
const clearBtn = document.getElementById("clear");

let currentInput = "";
let soundEnabled = true;
const clickSound = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_8dcd687017.mp3?filename=click-124467.mp3");

function updateDisplay() {
  display.value = currentInput || "0";
}

function canAddDecimal() {
  const parts = currentInput.split(/[\+\-\*\/]/);
  const lastNumber = parts[parts.length - 1];
  return !lastNumber.includes(".");
}

function isOperator(char) {
  return ["+", "-", "*", "/"].includes(char);
}

function calculate() {
  try {
    if (currentInput.trim() === "") return;
    const result = eval(currentInput);
    currentInput = result.toString();
    updateDisplay();
  } catch {
    display.value = "Error";
    currentInput = "";
  }
}

function handleInput(value) {
  const lastChar = currentInput.slice(-1);

  if (soundEnabled) clickSound.play();

  if (value === "C") {
    currentInput = "";
  } else if (value === "=") {
    calculate();
    return;
  } else if (value === ".") {
    if (canAddDecimal()) currentInput += value;
  } else if (isOperator(value)) {
    if (currentInput === "") return;
    if (isOperator(lastChar)) {
      currentInput = currentInput.slice(0, -1) + value;
    } else {
      currentInput += value;
    }
  } else {
    currentInput += value;
  }

  updateDisplay();
}

buttons.forEach((button) => {
  button.addEventListener("click", () => handleInput(button.textContent));
});

backspaceBtn.addEventListener("click", () => {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
  if (soundEnabled) clickSound.play();
});

clearBtn.addEventListener("click", () => {
  currentInput = "";
  updateDisplay();
  if (soundEnabled) clickSound.play();
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeToggle.textContent =
    document.body.classList.contains("light") ? "🌞" : "🌗";
  if (soundEnabled) clickSound.play();
});

soundToggle.addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  soundToggle.textContent = soundEnabled ? "🔊" : "🔈";
});

document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (!isNaN(key) || key === ".") {
    handleInput(key);
  } else if (isOperator(key)) {
    handleInput(key);
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
