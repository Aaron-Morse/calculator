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
    this.operator = ""; // Current operator
    this.lastOperator = null; // Last operator used (for repeated '=')
    this.lastOperand = null; // Last operand used (for repeated '=')
    this.isResult = false; // Flag to know if last action was '='

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
    this.displayElement.textContent = value;
  }

  handleAllClear(event) {
    this.value = 0;
    this.nextValue = null;
    this.operator = "";
    this.lastOperator = null;
    this.lastOperand = null;
    this.isResult = false;
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

    // If last action was '=', start new calculation
    if (this.isResult && !this.operator) {
      this.value = number;
      this.nextValue = null;
      this.isResult = false;
      this.renderDisplayElement(this.value);
      return;
    }

    if (!this.operator) {
      // No operator selected yet, update this.value
      if (this.value === 0 || this.value === "0" || this.isResult) {
        this.value = number;
        this.isResult = false;
      } else {
        this.value += number;
      }
      this.renderDisplayElement(this.value);
    } else {
      // Operator selected, update this.nextValue
      if (
        this.nextValue === null ||
        this.nextValue === 0 ||
        this.nextValue === "0"
      ) {
        this.nextValue = number;
      } else {
        this.nextValue += number;
      }
      this.renderDisplayElement(this.nextValue);
    }
  }

  handleOperator(event) {
    const operator = event.target.dataset.value;

    if (operator !== "=") {
      // If operator is pressed after result, allow chaining
      if (this.isResult) {
        this.isResult = false;
        this.nextValue = null;
      }
      // If operator is pressed after entering nextValue, calculate first
      if (this.operator && this.nextValue !== null) {
        this.handleCalculation(
          this.value,
          this.operator,
          this.nextValue
        );
        this.value = this.displayElement.textContent;
        this.nextValue = null;
      }
      this.operator = operator;
    } else {
      // '=' pressed
      if (this.operator && this.nextValue !== null) {
        // Normal calculation
        this.handleCalculation(
          this.value,
          this.operator,
          this.nextValue
        );
        this.lastOperator = this.operator;
        this.lastOperand = this.nextValue;
        this.value = this.displayElement.textContent;
        this.operator = "";
        this.nextValue = null;
        this.isResult = true;
      } else if (
        this.isResult &&
        this.lastOperator &&
        this.lastOperand !== null
      ) {
        // Repeat last calculation
        this.handleCalculation(
          this.value,
          this.lastOperator,
          this.lastOperand
        );
        this.value = this.displayElement.textContent;
        this.operator = "";
        this.nextValue = null;
        this.isResult = true;
      }
      // If '=' is pressed without enough info, do nothing
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

    this.value = result;
    this.renderDisplayElement(result);
  }
}

// Usage
const calc = new Calculator();
