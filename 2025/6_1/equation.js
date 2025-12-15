export class Equation {
	#operands = []
	#operator = ""

	addOperand(operand) {
		this.#operands.push(operand)
	}

	set operator(operator) {
		this.#operator = operator
	}

	solve() {
		switch (this.#operator) {
			case "+":
				return this.#operands.reduce((p, c) => p + c, 0)
			case "*":
				return this.#operands.reduce((p, c) => p * c, 1)
			default:
				throw new Error("Invalid operator!")
		}
	}
}
