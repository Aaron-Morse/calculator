// Element selectors
const display = document.querySelector('.display');
const allClear = document.querySelector('.ac');
const plusMinus = document.querySelector('.plus-minus');
const operators = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.number');
const modulo = document.querySelector('.modulo');
const divide = document.querySelector('.divide');
const times = document.querySelector('.times');
const minus = document.querySelector('.minus');
const plus = document.querySelector('.plus');
const equals = document.querySelector('.equals');

let total = '';
let symbol = '';
let value = '';

// Functions
function math() {
    if (symbol === modulo) total = Number(total) % Number(value);
    if (symbol === divide) total = Number(total) / Number(value);
    if (symbol === times) total = Number(total) * Number(value);
    if (symbol === minus) total = Number(total) - Number(value);
    if (symbol === plus) total = Number(total) + Number(value);
    // value = '';
    // symbol = '';
    display.textContent = total;
}

// Event listeners
numbers.forEach(number => {
    number.addEventListener('click', (event) => {
        if (!symbol) { // Checks to see if it is true that the symbol variable is empty
            total += event.target.textContent; // The value variable is set to a string of numbers to build the first part of the equation.
            display.textContent = total; // The display's text content is updated to reflect the numbers being selected.
            allClear.textContent = 'C'; // The all clear button's text is updated to reflect 'C' which will first clear the value and not the entire equation.   
        } else {
            value += event.target.textContent; // The value variable is set to a string of numbers to build the first part of the equation.
            display.textContent = value; // The display's text content is updated to reflect the numbers being selected.
        }
    });
});

operators.forEach(operator => {
    operator.addEventListener('click', (event) => {
        if (event.target !== equals) {
            symbol = event.target;
            value = ''; // Clears value variable to allow for the equals operator to contiunually run the previous problem.
        }
        if (event.target === equals) {
            math();
        }
    });
});

allClear.addEventListener('click', (event) => {
    if (!value) { // Checks to see if it's true that the value variable is empty and then proceeds to clear out total and symbol variable and reset button text.
        total = '';
        symbol = '';
        allClear.textContent = 'AC';
    } else {
        value = '';
    }
    display.textContent = 0;
});

plusMinus.addEventListener('click', (event) => {

});





