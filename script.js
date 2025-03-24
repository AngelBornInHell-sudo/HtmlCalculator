let runningTotal = 0;
let buffer = '0'; // Current input
let previousOperator = null;

const screen = document.querySelector('.screen');

// Main function to handle button clicks
function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value); // Handle non-numeric input
    } else {
        handleNumber(value); // Handle numeric input
    }
    screen.innerText = buffer;
}

// Handle special symbols and operators
function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            previousOperator = null;
            break;

        case '=':
            if (previousOperator === null) {
                return; // No operation to perform
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = `${runningTotal}`; // Update buffer to show result
            runningTotal = 0; // Reset runningTotal for next calculation
            break;

        case '←': // Backspace functionality
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.slice(0, -1); // Remove last character
            }
            break;

        case '+':
        case '−': // Use correct minus symbol
        case '×': // Use multiplication symbol
        case '÷': // Use division symbol
            handleMath(symbol);
        
        case '±': // Toggle positive/negative
            buffer = (parseInt(buffer) * -1).toString(); // Negate the current number
            break;
    }
}

// Handle mathematical operations
function handleMath(symbol) {
    if (buffer === '0') {
        return; // Do nothing if no input
    }

    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer; // Initialize running total
    } else if (previousOperator) {
        flushOperation(intBuffer); // Perform operation with previousOperator
    }

    previousOperator = symbol; // Save current operator
    buffer = '0'; // Reset buffer for new input
}

// Perform the pending operation
function flushOperation(intBuffer) {
    switch (previousOperator) {
        case '+':
            runningTotal += intBuffer;
            break;

        case '−':
            runningTotal -= intBuffer;
            break;

        case '×':
            runningTotal *= intBuffer;
            break;

        case '÷':
            if (intBuffer === 0) {
                alert("Error: Division by zero is not allowed!");
                return;
            }
            runningTotal /= intBuffer;
            break;
    }
}

// Handle numerical inputs
function handleNumber(numberString) {
    buffer = buffer === "0" ? numberString : buffer + numberString;
}

// Initialize calculator
function init() {
    document.querySelector('.calc-buttons').addEventListener('click', function (event) {
        if (!event.target.classList.contains('calc-button')) {
            return; // Ignore clicks outside buttons
        }
        buttonClick(event.target.innerText);
    });
}

init();