let result = document.getElementById("result");
let resultScreen = document.getElementById("result-screen");

let bracketCount = 0;

function addToResult(value) {

  if (value === "=") {
    let expression = result.innerText
      .replace(/x/g, '*')
      .replace(/÷/g, '/')
      .replace(/%/g, '/100');

    try {
      let finalResult = eval(expression);
      result.innerText = finalResult;
      resultScreen.innerText = "";
    } catch {
      resultScreen.innerText = "";
    }
    return;
  }

  result.innerText += value;
  calculateLive();
}

function calculateLive() {
  let expression = result.innerText
    .replace(/x/g, '*')
    .replace(/÷/g, '/')
    .replace(/%/g, '/100');

  if (expression === "") {
    resultScreen.innerText = "Result";
    return;
  }

  try {
    resultScreen.innerText = eval(expression);
  } catch {
    resultScreen.innerText = "";
  }
}

function clearscr() {
  result.innerText = "";
  resultScreen.innerText = "Result";
  bracketCount = 0;
}

function backspace() {
  result.innerText = result.innerText.slice(0, -1);
  calculateLive();
}

function addBracket() {
  if (bracketCount % 2 === 0) {
    result.innerText += "(";
  } else {
    result.innerText += ")";
  }
  bracketCount++;
  calculateLive();
}

document.addEventListener("keydown", function (e) {
  let key = e.key;

  if (key >= "0" && key <= "9") {
    addToResult(key);
  }

  if (key === "+" || key === "-" || key === "*" || key === "/") {
    addToResult(key);
  }

  if (key === ".") {
    addToResult(".");
  }

  if (key === "(" || key === ")") {
    addToResult(key);
  }

  if (key === "Enter") {
    e.preventDefault();
    addToResult("=");
  }

  if (key === "Backspace") {
    backspace();
  }

  if (key === "Escape") {
    clearscr();
  }
});
