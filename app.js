// Element selectors
const calculator = document.querySelector('.calculator');
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
    // Converting results to string so the regex replace will work and add comma separators
    if (symbol === modulo) total = String(Number(total) % Number(value));
    if (symbol === divide) total = String(Number(total) / Number(value));
    if (symbol === times) total = String(Number(total) * Number(value));
    if (symbol === minus) total = String(Number(total) - Number(value));
    if (symbol === plus) total = String(Number(total) + Number(value));
    display.textContent = total.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Event listeners
numbers.forEach(number => {
    number.addEventListener('click', (event) => {
        if (!symbol) { // Checks to see if it is true that the symbol variable is empty
            total += event.target.textContent; // The value variable is set to a string of numbers to build the first part of the equation.
            display.textContent = total.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // The display's text content is updated to reflect the numbers being selected.
            allClear.textContent = 'C'; // The all clear button's text is updated to reflect 'C' which will first clear the value and not the entire equation.   
        } 
        else {
            value += event.target.textContent; // The value variable is set to a string of numbers to build the first part of the equation.
            display.textContent = value.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // The display's text content is updated to reflect the numbers being selected.
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
    display.style.fontSize = '85px';
    display.textContent = 0;
});

plusMinus.addEventListener('click', (event) => {
    if (!total && !symbol && !value) { // Prevents the default actions if all variables are empty
        event.preventDefault();
    }
    if (!value) { // Updates the total variable if the value variable is empty
       total = String(Number(total) * -1);
       display.textContent = total.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    if (value && display.textContent === value) { // Updates the value variable if it has a value and it matches the display content
        value = String(Number(value) * -1);
        display.textContent = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
     }
     if (total && value && display.textContent === total) { // Updates the total variable if the total and value variable are populated and the total matches the display content
        total = String(Number(total) * -1);
       display.textContent = total.replace(/\B(?=(\d{3})+(?!\d))/g, ','); 
     }
});

calculator.addEventListener('click', (event) => { // I need to play around with the sizes to make them fit better  
    if (event.target.className === 'number') {
        const length = display.textContent.length;
        if (length > 6) display.style.fontSize = '70px';
        if (length > 7 && length < 10) display.style.fontSize = '55px';
        if (length >= 10) display.style.fontSize = '50px';
        if (length > 10) display.style.fontSize = '48px';
    }
});













