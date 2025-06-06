class Calculator {
  constructor() {
    // Store DOM elements as properties
    this.displayElement = document.querySelector(".display");
    this.allClearButton = document.querySelector(".ac");
    this.plusMinusButton = document.querySelector(".plus-minus");
    this.numberButtons = document.querySelectorAll(".number");
    this.operatorButtons = document.querySelectorAll(".operator");

    // State variables
    this.operand = 0; // Current operand/output after computation
    this.operator = null; // Initial operator
    this.nextOperand = null; // Operand being entered after operator
    this.output = null; // Initial output

    this.renderDisplayElement(this.operand);
    this.bindEvents();
  }

  bindEvents() {
    this.allClearButton.addEventListener("click", (event) => {
      this.handleAllClear(event);
    });

    this.plusMinusButton.addEventListener("click", () => {
      this.handlePlusMinus();
    });

    this.numberButtons.forEach((button) => {
      button.addEventListener("click", (event) =>
        this.handleNumber(event)
      );
    });

    this.operatorButtons.forEach((button) => {
      button.addEventListener("click", (event) =>
        this.handleOperator(event)
      );
    });
  }

  renderDisplayElement(value) {
    value = Intl.NumberFormat().format(value);
    this.adjustFontSize(String(value));
    this.displayElement.textContent = value;
  }

  // Updated the fontSize to be a multiplier
  adjustFontSize(str) {
    let fontSize = 85;
    if (str.length > 6) fontSize -= 8;
    if (str.length > 7) fontSize -= 8;
    if (str.length > 8) fontSize -= 6;
    if (str.length > 9) fontSize -= 6;
    if (str.length > 10) fontSize -= 5;
    if (str.length > 11) fontSize -= 5;
    if (str.length > 12) fontSize -= 4;
    if (str.length > 13) fontSize -= 4;
    if (str.length > 14) fontSize -= 2;
    console.log("Font size: ", fontSize);
    this.displayElement.style.fontSize = `${fontSize}px`;
  }

  handleAllClear(event) {
    this.operand = 0;
    this.nextOperand = null;
    this.operator = null;
    this.output = null;
    this.renderDisplayElement(this.operand);
  }

  handlePlusMinus() {
    if (this.operator && this.nextOperand !== null) {
      this.nextOperand = String(Number(this.nextOperand) * -1);
      this.renderDisplayElement(this.nextOperand);
    } else {
      this.operand = String(Number(this.operand) * -1);
      this.renderDisplayElement(this.operand);
    }
  }

  handleNumber(event) {
    const number = event.target.dataset.value;

    if (this.operator === null) {
      if (this.operand === 0 && number !== "0") {
        this.operand = number;
      } else if (this.operand !== 0) {
        this.operand += number;
      }
      this.renderDisplayElement(this.operand);
    }

    if (this.operator) {
      if (this.nextOperand === null && number !== "0") {
        this.nextOperand = number;
      } else if (this.nextOperand !== null) {
        this.nextOperand += number;
      }
      this.renderDisplayElement(
        !this.nextOperand ? this.operand : this.nextOperand
      );
    }
  }

  handleOperator(event) {
    const operator = event.target.dataset.value;
    // Sets initial operator
    if (this.operator === null && operator !== "=") {
      this.operator = operator;
    }
    // Checks if operator is "=" and there isn't an operand and calculates
    if (operator === "=" && this.output === null) {
      this.handleCalculation(
        this.operand,
        this.operator,
        this.nextOperand
      );
      return;
    }
    // Checks if operator is "=" and operand is avaiable and continues to compute
    if (operator === "=" && this.output !== null) {
      this.handleCalculation(
        this.output,
        this.operator,
        this.nextOperand
      );
    }
    // Checks if operator isn't blank and operator isn't "=", sets next value to null and the operator to the new symbol
    if (this.operator !== null && operator !== "=") {
      this.nextOperand = null;
      this.operator = operator;
    }
  }

  handleCalculation(n1, operator, n2) {
    const num1 = Number(n1);
    const num2 = Number(n2);
    let result;

    switch (operator) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "*":
        result = num1 * num2;
        break;
      case "/":
        result = num2 !== 0 ? num1 / num2 : "Error";
        break;
      case "%":
        result = num1 % num2;
        break;
      default:
        result = this.operand;
    }
    this.output = result;
    this.renderDisplayElement(this.output);
  }
}

// Usage
const calc = new Calculator();
