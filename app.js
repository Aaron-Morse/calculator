class Calculator {
  constructor() {
    // Store DOM elements as properties
    this.displayElement = document.querySelector(".display");
    this.allClearButton = document.querySelector(".ac");
    this.plusMinusButton = document.querySelector(".plus-minus");
    this.numberButtons = document.querySelectorAll(".number");
    this.operatorButtons = document.querySelectorAll(".operator");

    // State variables
    this.value = 0; // Current value/result
    this.nextValue = null; // Value being entered after operator
    this.operator = null; // initial operator
    this.operand = null; // Current operand

    this.renderDisplayElement(this.value);
    this.bindEvents();
  }

  bindEvents() {
    this.allClearButton.addEventListener("click", (e) => {
      this.handleAllClear(e);
    });

    this.plusMinusButton.addEventListener("click", () => {
      this.handlePlusMinus();
    });

    this.numberButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => this.handleNumber(e));
    });

    this.operatorButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => this.handleOperator(e));
    });
  }

  renderDisplayElement(value) {
    value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.adjustFontSize(String(value));
    this.displayElement.textContent = value;
  }

  adjustFontSize(str) {
    let fontSize = 85;
    if (str.length > 7) fontSize -= 8;
    if (str.length > 8) fontSize -= 8;
    if (str.length > 9) fontSize -= 8;
    if (str.length > 10) fontSize -= 8;
    if (str.length > 11) fontSize -= 8;
    this.displayElement.style.fontSize = `${fontSize}px`;
  }

  handleAllClear(event) {
    this.value = 0;
    this.nextValue = null;
    this.operator = null;
    this.operand = null;
    this.renderDisplayElement(this.value);
  }

  handlePlusMinus() {
    if (this.operator && this.nextValue !== null) {
      this.nextValue = String(Number(this.nextValue) * -1);
      this.renderDisplayElement(this.nextValue);
    } else {
      this.value = String(Number(this.value) * -1);
      this.renderDisplayElement(this.value);
    }
  }

  handleNumber(event) {
    const number = event.target.dataset.value;

    if (this.operator === null) {
      if (this.value === 0 && number !== "0") {
        this.value = number;
      } else if (this.value !== 0) {
        this.value += number;
      }
      this.renderDisplayElement(this.value);
    }

    if (this.operator) {
      if (this.nextValue === null && number !== "0") {
        this.nextValue = number;
      } else if (this.nextValue !== null) {
        this.nextValue += number;
      }
      this.renderDisplayElement(
        !this.nextValue ? this.value : this.nextValue
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
    if (operator === "=" && this.operand === null) {
      this.handleCalculation(
        this.value,
        this.operator,
        this.nextValue
      );
      return;
    }
    // Checks if operator is "=" and operand is avaiable and continues to compute
    if (operator === "=" && this.operand !== null) {
      this.handleCalculation(
        this.operand,
        this.operator,
        this.nextValue
      );
    }
    // Checks if operator isn't blank and operator isn't "=", sets next value to null and the operator to the new symbol
    if (this.operator !== null && operator !== "=") {
      this.nextValue = null;
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
        result = this.value;
    }
    this.operand = result;
    this.renderDisplayElement(this.operand);
  }
}

// Usage
const calc = new Calculator();
