let runningTotal = 0;
let buffer = '0';
let previousOperator = null;

const screen = document.querySelector('.screen');

//handel button clicked
function buttonClicked(value) {
  if(isNaN(value)) {
    // call handleSymbole
    handleSymbol(value);
  } else {
    // call handleNumber
    handleNumber(value);
  }
  // rerender the screen everytime we click any button if it's number or symbol
  rerender();
}
// handle Numbers
function handleNumber(numberString) {
  if(buffer === '0') {
    buffer = numberString;
  } else {
    buffer += numberString;
  }
}

// handle symbols
function handleSymbol(symbol) {
  switch (symbol) {
    case 'C':
      buffer = '0';
      runningTotal = 0;
      break;
    case '←':
      if(buffer.length === 1) {
        buffer = '0'
      } else {
       buffer = buffer.slice(0, buffer.length - 1)
      }
      break;
    case '=':
      if(previousOperator === null) {
        return;
      }
      doMath(parseInt(buffer));
      console.log(runningTotal);
      buffer = runningTotal;
      break;
    case '+':
    case '−':
    case '×':
    case '÷':
      handelOperation(symbol);
      break;
    //   if(previousOperator === null) {
    //     console.log('null');
    //     runningTotal = buffer;
    //     screen.innerText = runningTotal;
    //   } else {
    //     answer = Number(runningTotal + previousOperator + buffer);
    //     screen.innerText = runningTotal;
    //   }
    //   screen.innerText = answer;
    //   break;
    // default:
    //   previousOperator = operator;
    //   break;
  }
}
function handelOperation(operator) {
  let intBuffer = parseInt(buffer);
  // if (runningTotal === 0) {
  //   runningTotal = intBuffer;
  // } else {
    doMath(intBuffer);
  // }
  // buffer = '0';
  previousOperator = operator;
}
function doMath(value) {
  if(previousOperator === '+') {
    runningTotal += value;
  } else if (previousOperator === '-') {
    runningTotal -= value;
  } else if (previousOperator === '×') {
    runningTotal *= value;
  } else if (previousOperator === '÷') {
    runningTotal /= value;
  }
}
function rerender(symbol) {
  // screen.innerText = `${runningTotal} ${symbol} ${buffer}`;
  screen.innerText = buffer;
}
// setup everything first
function init() {
 document.querySelector('.calc-buttons')
  .addEventListener('click', function (event) {
    if(event.target.tagName === 'BUTTON') {
      buttonClicked(event.target.innerText);
    }
    // stop bubbling the click event outside this button object
    event.stopPropagation();
  });
}
// call the init() to run the calculator
init();
