import { DSP } from "./dsp.js"

function expandGrid(grid, distance) {
	// Increment the value of each point in the grid by the specified amount, rolling back around to 1 if it exceeds 9.
	const modifyPointValue = (n, i) => (n + i - 1) % 9 + 1

	// Expand the grid horizontally.
	const newChunkHorizontal = structuredClone(grid)
	for (let i = 1; i < distance; i++) {
		for (const [y, row] of newChunkHorizontal.entries()) {
			grid[y].push(...row.map(n => modifyPointValue(n, i)))
		}
	}

	// Expand the grid vertically.
	const newChunkVertical = structuredClone(grid)
	for (let i = 1; i < distance; i++) {
		for (const row of newChunkVertical) {
			grid.push(row.map(n => modifyPointValue(n, i)))
		}
	}

	return grid
}

export async function solution(input) {
	const weights = expandGrid(input.map(row => row.split("").map(Number)), 5)
	const dsp = new DSP(weights)
	return dsp.shortestPath(0, 0, -1, -1)
}
