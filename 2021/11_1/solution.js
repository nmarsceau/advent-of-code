import { Grid } from "./grid.js"
import { Queue } from "./queue.js"

function incrementAndMaybeFlash(point, queue) {
	point.value++
	if (point.value > 9) {
		queue.push(point)
	}
}

const pointIsNotZero = point => point.value !== 0

export async function solution(input) {
	// Parse the input into a grid.
	const grid = new Grid(input.map(line => line.split("").map(Number)))

	// Here's a variable where we'll track how many points in the grid flashed.
	let totalFlashed = 0

	// Do 100 steps.
	for (let step = 0; step < 100; step++) {
		// Initialize flash queue.
		const flashQueue = new Queue()
		grid.iterate().forEach(point => incrementAndMaybeFlash(point, flashQueue))

		// Process the queue.
		flashQueue.items()
			.filter(pointIsNotZero)
			.forEach(point => {
				// Flash the current point.
				point.value = 0
				totalFlashed++

				// Increment neighbors and maybe add them to the queue for flashing.
				grid.neighbors(point)
					.filter(pointIsNotZero)
					.forEach(neighbor => incrementAndMaybeFlash(neighbor, flashQueue))
			})
	}

	return totalFlashed
}
