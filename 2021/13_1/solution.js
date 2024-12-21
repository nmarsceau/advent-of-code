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

	// Execute the first fold.
	grid.fold(instructions[0])

	// Return the number of points that remain.
	return grid.grid.reduce((sum, row) => sum + row.filter(point => point === "#").length, 0)
}
