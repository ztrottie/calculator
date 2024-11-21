function add(nb1, nb2) {
	return nb1 + nb2;
}

function subtract(nb1, nb2) {
	return nb1 - nb2;
}

function multiply(nb1, nb2) {
	return nb1 * nb2;
}

function divide(nb1, nb2) {
	return nb1 / nb2;
}

function clear() {
	input.value = "";
	storedNumber = undefined;
	operator = undefined;
}

const input = document.querySelector("#input");

function operate(operator, nb1, nb2) {
	let result;
	if (operator === "÷") {
		result = divide(Number(nb1), Number(nb2));
	} else if (operator === "*") {
		result = multiply(Number(nb1), Number(nb2));
	} else if (operator === "+") {
		result = add(Number(nb1), Number(nb2))
	} else if (operator === "-") {
		result = subtract(Number(nb1), Number(nb2));
	}
	return result;
}

const keypad = document.querySelector(".keypad");
let operator;
let storedNumber;
let resetKeypad = false

keypad.addEventListener('click', function(event) {
	if (event.target !== event.currentTarget) {
		if (resetKeypad) {
			resetKeypad = false;
			input.value = '';
		}
		if (event.target.innerText === ".") {
			if (input.value.lastIndexOf(".") !== -1)
				return;
		}
		input.value += event.target.innerText;
	}
});

const operators = document.querySelector(".operator");

operators.addEventListener('click', function(event) {
	if (event.target !== event.currentTarget) {
		if (event.target.innerText === "clear") {
			clear();
			return;
		}
		if (!operator && input.value !== '') {
			storedNumber = input.value;
			operator = event.target.innerText;
			console.log(`operator just pressed ${operator} stored number ${storedNumber}`);
			resetKeypad = true;
		} else if (operator && storedNumber && !resetKeypad) {
			console.log(`preparing to do operation ${storedNumber} ${operator} ${input.value}`)
			let result = operate(operator, storedNumber, input.value);
			console.log(`operation done result is ${result}`);
			input.value = result;
			operator = undefined;
			storedNumber = undefined;
			resetKeypad = true;
		}
	}
})
