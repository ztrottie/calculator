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

function operate(operator, nb1, nb2) {
	let result;
	if (operator === "/") {
		result = divide(nb1, nb2);
	} else if (operator === "*") {
		result = multiply(nb1, nb2);
	} else if (operator === "+") {
		result = add(nb1, nb2)
	} else if (operator === "-") {
		result = subtract(nb1, nb2);
	}
}

let nb1;
let nb2;
let operator;
const keypad = document.querySelector(".keypad");
const input = document.querySelector("#input");

keypad.addEventListener('click', function(event) {
	let target = event.target;
	if (target.tagName === "BUTTON") {
		if (target.innerText === ".") {
			if (input.value.lastIndexOf(".") !== -1)
				return;
		}
		input.value += event.target.innerText;
	}
});
