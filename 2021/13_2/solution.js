import { FoldingGrid } from "./foldingGrid.js"

function splitLinesOnEmptyString(input) {
	return input
		.reduce((prev, cur) => {
			if (cur === "") {
				prev.push([])
			} else {
				prev[prev.length - 1].push(cur)
			}
			return prev
		}, [[]])
		.filter(item => item.length > 0)
}

export async function solution(input) {
	// Get the 2 chunks of inputs.
	const [ rawPoints, rawInstructions ] = splitLinesOnEmptyString(input)

	// Parse the points into a grid.
	const grid = new FoldingGrid(
		rawPoints.map(point => {
			const [ x, y ] = point.split(",").map(number => Number(number))
			return { x, y }
		})
	)

	// Parse the folding instructions.
	const instructions = rawInstructions.map(ri => {
		const match = ri.match(/fold along (?<axis>x|y)=(?<line>\d+)/)
		return { axis: match.groups.axis, line: Number(match.groups.line) }
	})

	// Fold the grid according to the instructions.
	for (const instruction of instructions) {
		grid.fold(instruction)
	}

	// Return a string representation of the grid.
	return grid.toString()
}
