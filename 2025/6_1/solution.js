import { Equation } from "./equation.js"

function findSpaceIndices(str) {
	const spaceIndices = []
	let spaceIndex = -1
	while ((spaceIndex = str.indexOf(" ", spaceIndex + 1)) !== -1) {
		spaceIndices.push(spaceIndex)
	}
	return spaceIndices
}

function splitOnIndices(str, indices) {
	const segments = []
	let start = 0
	for (const end of [...indices, str.length]) {
		segments.push(str.substring(start, end))
		start = end + 1
	}
	return segments
}

export async function solution(input) {
	// Determine which columns divide the input
	const spaceIndices = input.slice(1).reduce((prev, cur) => {
		const spaces = findSpaceIndices(cur)
		return prev.filter(el => spaces.includes(el))
	}, findSpaceIndices(input[0]))

	// Read the operators and initialize an equation for each
	const operators = splitOnIndices(input.at(-1), spaceIndices)
	const equations = []
	for (const operator of operators) {
		const equation = new Equation()
		equation.operator = operator.trim()
		equations.push(equation)
	}

	// Read each line of operands and add them to the corresponding equation
	for (const line of input.slice(0, -1)) {
		const operands = splitOnIndices(line, spaceIndices)
		for (const [i, operand] of operands.entries()) {
			equations[i].addOperand(parseInt(operand.trim()))
		}
	}

	// Solve each equation and return the sum
	return equations.reduce((p, c) => p + c.solve(), 0)
}
