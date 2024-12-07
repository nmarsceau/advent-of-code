function loopThroughGrid(grid, callback) {
	for (const [y, row] of grid.entries()) {
		for (const [x, value] of row.entries()) {
			callback(value, y, x)
		}
	}
}

function getGridNeighbors(grid, y, x, defaultValue = undefined) {
	// Handles neighbors of edge cells outside the grid by coalescing to a default value specified by the consumer.
	return [
		grid[y - 1]?.[x] ?? defaultValue, // up
		grid[y + 1]?.[x] ?? defaultValue, // down
		grid[y][x - 1] ?? defaultValue, // left
		grid[y][x + 1] ?? defaultValue, // right
	]
}

export async function solution(input) {
	const heights = input.map(line => line.split("").map(point => Number(point)))
	let riskLevel = 0

	loopThroughGrid(heights, (point, y, x) => {
		const neighbors = getGridNeighbors(heights, y, x, Infinity)
		if (neighbors.every(n => n > point)) {
			riskLevel += point + 1
		}
	})

	return riskLevel
}
