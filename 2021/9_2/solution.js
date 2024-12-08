import { Grid } from "./grid.js"
import { Queue } from "./queue.js"

export async function solution(input) {
	// Parse the input into a grid.
	const heights = new Grid(input.map(line => line.split("").map(point => Number(point))))

	// Loop through each point in the grid.
	return heights.iterate()
		// Determine the low points.
		.reduce((lowPoints, point) => {
			const neighbors = heights.neighbors(point)
			if (neighbors.every(n => n.value > point.value)) {
				lowPoints.push(point)
			}
			return lowPoints
		}, [])
		// Determine the size of the basin surrounding each low point.
		.map(lp => {
			const surroundingPoints = new Queue(lp)
			return surroundingPoints
				.items()
				.filter(point => heights.grid[point.y][point.x] < 9) // Always refer back to the value of this point in the grid so we know to skip it if we process the same point more than once. (And we will.)
				.reduce((basinSize, point) => {
					heights.grid[point.y][point.x] = 9 // Mark this spot as visited by changing it to a 9 in the grid.
					surroundingPoints.push(...heights.neighbors(point)) // Add all neighboring points to the queue for consideration.
					return basinSize + 1
				}, 0)
		})
		// Sort descending.
		.sort((a, b) => b - a)
		// Take the largest 3.
		.slice(0, 3)
		// Multiply them.
		.reduce((sum, size) => sum * size, 1)
}
