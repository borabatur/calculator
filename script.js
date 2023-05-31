const buttons = document.querySelectorAll('button');
const output = document.getElementById('output');

let num1 = null;
let num2 = null;
let result = 0;
let holder = [];
let operator = null;
let pendingOperator = null; // New variable to store the most recently clicked operator

buttons.forEach((button) => {
	button.addEventListener('click', () => {
		if (
			button.classList.contains('number') ||
			button.classList.contains('decimal')
		) {
			if (holder.includes('.') && button.value === '.') {
				// do nothing
			} else {
				holder.push(button.value);
			}

			if (num2 === null && operator === null) {
				num1 = holder.join('');
				output.innerText = num1;
			} else if (num1 !== null && operator !== null) {
				num2 = holder.join('');
				output.innerText = num2;
			} else {
				output.innerText = result;
			}
		}

		if (button.classList.contains('operator')) {
			if (num1 === null) {
				// do nothing
			} else if (operator === null) {
				holder = [];
				operator = button.value;
			} else {
				pendingOperator = button.value; // Store the new operator instead of immediately evaluating
			}
		}

		if (button.classList.contains('sign')) {
			if (
				(num2 === null && operator === null) ||
				(num2 === null && operator !== null)
			) {
				num1 = -num1;
				output.innerText = num1;
			} else if (
				(num1 !== null && operator !== null) ||
				(num2 !== null && operator !== null)
			) {
				num2 = -num2;
				output.innerText = num2;
			}
		}

		if (button.classList.contains('equals')) {
			if (num2 === null) {
				// do nothing
			} else {
				if (pendingOperator !== null) {
					operator = pendingOperator; // Use the pending operator for evaluation
					pendingOperator = null; // Reset the pending operator
				}
				result = evaluate(num1, num2, operator);
				console.log(num1 + operator + num2 + '=' + result);
				output.innerText = result;
				num1 = result;
				holder = [];
				num2 = null;
				operator = null;
			}
		}

		if (button.classList.contains('clear')) {
			clear();
			output.innerText = 0;
		}

		if (button.classList.contains('delete')) {
			if (holder.length > 1) {
				holder.pop();
				output.innerText = holder.join('');
			} else {
				holder.pop();
				output.innerText = 0;
			}
		}
	});
});

function clear() {
	num1 = null;
	num2 = null;
	holder = [];
	operator = null;
	result = 0;
}

function add(x, y) {
	return x + y;
}

function subtract(x, y) {
	return x - y;
}

function multiply(x, y) {
	return x * y;
}

function divide(x, y) {
	if (y === 0) {
		throw new Error('Error! You cannot divide by zero');
	}
	return x / y;
}

function modulo(x, y) {
	return x % y;
}

function evaluate(num1, num2, operator) {
	num1 = Number(num1);
	num2 = Number(num2);

	switch (operator) {
		case '+':
			return add(num1, num2);
		case '-':
			return subtract(num1, num2);
		case '*':
			return multiply(num1, num2);
		case '÷':
			return divide(num1, num2);
		case '%':
			return modulo(num1, num2);
		default:
			throw new Error(`Unsupported operator: ${operator}`);
	}
}
