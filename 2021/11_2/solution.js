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

	// Get the count of all the octopi.
	const octopusCount = [...grid.iterate()].length

	// Do 100 steps.
	for (let step = 1; true; step++) {
		let flashedThisStep = 0

		// Initialize flash queue.
		const flashQueue = new Queue()
		grid.iterate().forEach(point => incrementAndMaybeFlash(point, flashQueue))

		// Process the queue.
		flashQueue.items()
			.filter(pointIsNotZero)
			.forEach(point => {
				// Flash the current point.
				point.value = 0
				flashedThisStep++

				// Increment neighbors and maybe add them to the queue for flashing.
				grid.neighbors(point)
					.filter(pointIsNotZero)
					.forEach(neighbor => incrementAndMaybeFlash(neighbor, flashQueue))
			})

		if (flashedThisStep === octopusCount) {
			return step
		}
	}
}
