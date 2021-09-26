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

// Variables
let total = ''; // Initial variable to track value as well as total
let symbol = ''; // Symbol variable to denote which math operation to perform
let value = ''; // Secondary value for equation 

// Functions
function math() {
    if (symbol === modulo) total = Number(total) % Number(value);
    if (symbol === divide) total = Number(total) / Number(value);
    if (symbol === times) total = Number(total) * Number(value);
    if (symbol === minus) total = Number(total) - Number(value);
    if (symbol === plus) total = Number(total) + Number(value);
    display.textContent = total;
}

// Event listeners
numbers.forEach(number => {
    number.addEventListener('click', (event) => {
        if (!symbol) { // Checks to see if it is true that the symbol variable is empty
            total += event.target.textContent; // The value variable is set to a string of numbers to build the first part of the equation.
            display.textContent = total; // The display's text content is updated to reflect the numbers being selected.
            allClear.textContent = 'C'; // The all clear button's text is updated to reflect 'C' which will first clear the value and not the entire equation.   
        } 
        else {
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
        else {
            math();
        }
    });
});

allClear.addEventListener('click', (event) => {
    total = '';
    symbol = '';
    value = '';
    allClear.textContent = 'AC';
    display.textContent = 0;
});

plusMinus.addEventListener('click', (event) => {
    if (!value) {
        total > 0 ? total = `-${total}`: total = total.replace('-', '');
    } 
    else {
        value > 0 ? value = `-${value}` : value = value.replace('-', '');
    }
    display.textContent = !value ? total : value;
});





