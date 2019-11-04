// step 1 make an object to encapsulate everything
class calculator {
  constructor() {
    this.calcResult = 0;
    this.screenNumberBuffer = '0';
    this.previousOperator = null;
    // this.intNumberBuffer;
    this.screen = document.querySelector('.screen');
  }
// -----------------------------------------------------

  // step 2:
  // function to initialize the program init() to tell which button has been clicked
  // and pass the value of that button to another function which deals with that button value
  init() {
    // we will use event bubbling so we will only use one event listener on .calc-butttons section
    // and the button will treger its callback  using event bubbling
    const buttonsContainer = document.querySelector('.calc-buttons');
    buttonsContainer.addEventListener('click', (event) => {
      // to triger the callback ONLY when button been clicked
      // and ignore any click action  anywhere else inside the calc-buttons section
      // we use need to use an if statement
      if (event.target.tagName === 'BUTTON') {
        this.buttonClicked(event.target.innerText);
      }
      // to stop buttons from bubbling farther than its parent .calc-buttons
      // we need to use StopProgration() function
      event.stopPropagation();
    });
  }
// -----------------------------------------------------

  // step 3:
  // function send the value of the clicked button to
  buttonClicked(value) {
    if (isNaN(value)) {
      // 1. handleSymbol function if it's a symbol
      this.handleSymbol(value);
      if (value !== '=' && value !== 'C' && value !== '←') {
        this.rerender(value);
      } else {
        this.rerender(this.screenNumberBuffer);
      }
    } else {
      // 2. handleNumber function if it's a number
      this.handleNumber(value);
      this.rerender(this.screenNumberBuffer);
    }
  }
// -----------------------------------------------------

  // step 4:
  // 1. function to handel the button value if it's a number
  handleNumber(stringNumber) {
    if (this.screenNumberBuffer === '0') {
      this.screenNumberBuffer = stringNumber;
    } else {
      this.screenNumberBuffer += stringNumber;
    }

  }
  // 2. function to handel the button value if it's a symbol
  handleSymbol(symbol) {
    switch (symbol) {
      case 'C':
        this.screenNumberBuffer = '0'
        break;
      case '←':
        if (this.screenNumberBuffer.length === 1) {
          this.screenNumberBuffer = '0'
        } else {
          this.screenNumberBuffer = this.screenNumberBuffer.slice(0, this.screenNumberBuffer.length - 1);
        }
        break;
      case '=':
        if(this.previousOperator === null) {
          // do nothing
          return;
        }
        this.flushOperationAndReset(parseInt(this.screenNumberBuffer));
        // the plus sign here is to convert calcResult into a string
        this.screenNumberBuffer = +this.calcResult;
        this.previousOperator = null;
        this.calcResult = 0;
        break;
      case '+':
      case '−':
      case '×':
      case '÷':
        this.doMath(symbol);
        break
    }
  }
  // -----------------------------------------------------

  // step 5:
  // function to display on screen rerender
  rerender(value) {
    this.screen.innerText = value;
  }
  // -----------------------------------------------------

  //step 6:
  // function to do math
  doMath(operator) {
    const intBuffer = parseInt(this.screenNumberBuffer);
    if (this.screenNumberBuffer === "0") {
      if(this.previousOperator === '-') {
      }
      // do nothing
      return;
    }
    if (this.calcResult === 0) {
      this.calcResult = intBuffer;
    } else {
      flushOperationAndReset(intBuffer);
    }
    this.previousOperator = operator;
    this.screenNumberBuffer = "0";
  }
// -----------------------------------------------------

// step 7:
// function to reset and clean
  flushOperationAndReset(intNumberBuffer) {
    if (this.previousOperator === '+') {
      this.calcResult += intNumberBuffer ;
    } else if (this.previousOperator === '−') {
      this.calcResult -= intNumberBuffer;
    } else if (this.previousOperator === '×') {
      this.calcResult *= intNumberBuffer;
    } else if (this.previousOperator === '÷') {
      this.calcResult /= intNumberBuffer;
    }
  }
}
const calc = new calculator();
calc.init();



