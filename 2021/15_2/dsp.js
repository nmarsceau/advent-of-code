import { Grid } from "./grid.js"

// This class implements Dijkstra's shortest path algorithm.
// https://en.wikipedia.org/wiki/Dijkstra's_algorithm
export class DSP {
	#grid
	#queue

	constructor(weights) {
		// Input is expected to be a 2D array of weights for each point in the grid.
		this._weights = weights
	}

	#reset() {
		// Reset #grid and #queue to a fresh state for running the shortest path algorithm.
		const weights = this._weights.map((row) => row.map((weight) => ({ weight, visited: false, distance: Infinity })))
		this.#grid = new Grid(weights)
		this.#queue = new Set()
	}

	shortestPath(startX, startY, endX, endY) {
		this.#reset()

		const
			start = this.#grid.get(startX, startY),
			end = this.#grid.get(endX, endY)

		// Initialize the queue with the starting point.
		start.value.distance = 0 // The starting point is never actually entered, so its weight doesn't count.
		this.#queue.add(start)

		// This is the core of the shortest path algorithm.
		while (!end.value.visited) {
			// Get the next point that should be evaluated from the queue.
			const point = this.#nextPoint()

			// Update its unvisited neighbors with the distance value it would take to visit them.
			this.#grid.neighbors(point)
				.filter(neighbor => !neighbor.value.visited)
				.forEach(neighbor => {
					neighbor.value.distance = Math.min(neighbor.value.distance, point.value.distance + neighbor.value.weight)
					this.#queue.add(neighbor) // Add each of these neighbors to the queue to be evaluated.
				})
			
			// Mark the current point visited.
			point.value.visited = true
		}
	
		// This will be the shortest distance.
		return end.value.distance
	}

	#nextPoint() {
		// Find the point from the queue with the lowest distance.
		let nextPoint = null
		for (const point of this.#queue) {
			if (nextPoint === null || point.value.distance < nextPoint.value.distance) {
				nextPoint = point
			}
		}

		// Throw if we couldn't find another point for some reason.
		if (nextPoint === null) {
			throw new Error("Could not find another point to evaluate.")
		}

		// Remove our next point from the queue and return it.
		this.#queue.delete(nextPoint)
		return nextPoint
	}
}
