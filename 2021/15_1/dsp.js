import { Grid } from "./grid.js"

// This class implements Dijkstra's shortest path algorithm.
// https://en.wikipedia.org/wiki/Dijkstra's_algorithm
export class DSP {
	#grid

	constructor(weights) {
		// Input is expected to be a 2D array of weights for each point in the grid.
		this._weights = weights
	}

	#reset() {
		// Reset #grid to a fresh state for running the shortest path algorithm.
		const weights = this._weights.map((row) => row.map((weight) => ({ weight, visited: false, distance: Infinity })))
		this.#grid = new Grid(weights)
	}

	shortestPath(startX, startY, endX, endY) {
		this.#reset()

		const
			start = this.#grid.get(startX, startY),
			end = this.#grid.get(endX, endY)

		// The starting point is never actually entered, so its weight doesn't count.
		start.value.distance = 0

		while (!end.value.visited) {
			const point = this.#nextPoint()
			this.#grid.neighbors(point)
				.filter(neighbor => !neighbor.value.visited)
				.forEach(neighbor => {
					neighbor.value.distance = Math.min(neighbor.value.distance, point.value.distance + neighbor.value.weight)
				})
			point.value.visited = true
		}
	
		// This will be the shortest distance.
		return end.value.distance
	}

	#nextPoint() {
		let nextPoint = null
		for (const row of this.#grid.grid) {
			for (const point of row) {
				if (point.value.visited) continue
				if (nextPoint === null || point.value.distance < nextPoint.value.distance) {
					nextPoint = point
				}
			}
		}
		return nextPoint
	}
}
