let DEBUG = true;

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
	if (DEBUG)
		console.log("clearing calculator");
	input.value = "";
	storedNumber = undefined;
	selectedOperator = undefined;
}

const input = document.querySelector("#input");

function operate(operator, nb1, nb2) {
	let result;
	if (!operator && !nb2 && nb1)
		return undefined;
	if (operator === "÷") {
		if (nb2 == 0)
			return "Error";
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
let selectedOperator;
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
		if (DEBUG) { 
			console.log(
			`
				selected operator = '${selectedOperator}'
				stored number = '${storedNumber}'
				input value = '${input.value}'
			`
			)
		}
		let operator = event.target.innerText;
		if (operator === "clear") {
			clear();
			return;
		} else if (((selectedOperator && storedNumber) || operator === '=') && resetKeypad === false) {
			if (DEBUG)
				console.log("lets operate")
			let result = operate(selectedOperator, storedNumber, input.value);
			if (DEBUG)
				console.log(`result: '${result}'`);
			if (!result)
				return;
			if (result === 'Error')
				resetKeypad = true;
			input.value = result;
			storedNumber = undefined;
			selectedOperator = undefined
		}
		if (operator !== '=' && operator !== 'clear' && input.value !== 'Error') {
			selectedOperator = operator;
			resetKeypad = true;
			storedNumber = input.value;
		}
	}
})
