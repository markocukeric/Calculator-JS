const grid = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};


function updateDisplay() {
  const display = document.querySelector('.display');
  display.value = grid.displayValue;
}

updateDisplay();


const keys = document.querySelector('.buttons');
keys.addEventListener('click', (event) => {
  const { target } = event;

  if (!target.matches('button')) {
    return;
  }

  if (target.classList.contains('operator')) {
    handleOperator(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains('decimal')) {
    inputDecimal(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains('clear')) {
    resetCalculator();
    updateDisplay();
    return;
  }

  if (target.classList.contains('equals')) {
    console.log('equals', target.value);
    return;
  }

  inputDigit(target.value);
  updateDisplay();
});


function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = grid;
  if (waitingForSecondOperand === true) {
    grid.displayValue = digit;
    grid.waitingForSecondOperand = false;
  } else {
    grid.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }

  console.log(grid);
}

function inputDecimal(dot) {
  if (grid.waitingForSecondOperand === true) {
  	grid.displayValue = '0.'
    grid.waitingForSecondOperand = false;
    return
  }

  if (!grid.displayValue.includes(dot)) {
    grid.displayValue += dot;
  }
}

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = grid
  const inputValue = parseFloat(displayValue);

  if (operator && grid.waitingForSecondOperand)  {
    grid.operator = nextOperator;
    console.log(grid);
    return;
  }

  if (firstOperand === null && !isNaN(inputValue)) {
    grid.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);

    grid.displayValue = String(result);
    grid.firstOperand = result;
  }

  grid.waitingForSecondOperand = true;
  grid.operator = nextOperator;
  console.log(grid);
}

function calculate(firstOperand, secondOperand, operator) {
  if (operator === '+') {
    return firstOperand + secondOperand;
  } else if (operator === '-') {
    return firstOperand - secondOperand;
  } else if (operator === 'x') {
    return firstOperand * secondOperand;
  } else if (operator === '/') {
    return firstOperand / secondOperand;
  }

  return secondOperand;
}

function resetCalculator() {
  grid.displayValue = '0';
  grid.firstOperand = null;
  grid.waitingForSecondOperand = false;
  grid.operator = null;
  console.log(grid);
}



