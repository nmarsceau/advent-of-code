import { Point } from "./point.js"

export class Grid {
	constructor(_2dArr) {
		this.grid = _2dArr

		for (const [y, row] of _2dArr.entries()) {
			for (const [x, value] of row.entries()) {
				this.grid[y][x] = new Point(x, y, value)
			}
		}
	}

	*iterate() {
		for (const row of this.grid) {
			for (const point of row) {
				yield point
			}
		}
	}

	neighbors(point) {
		const x = point.x, y = point.y
		const coordinates = [
			{y: y - 1, x: x}, // up
			{y: y + 1, x: x}, // down
			{y: y, x: x - 1}, // left
			{y: y, x: x + 1}, // right
			{y: y - 1, x: x - 1}, // up/left
			{y: y - 1, x: x + 1}, // up/right
			{y: y + 1, x: x - 1}, // down/left
			{y: y + 1, x: x + 1}, // down/right
		]
		return coordinates.reduce((neighbors, c) => {
			if (this.grid[c.y]?.[c.x] !== undefined) {
				neighbors.push(this.grid[c.y][c.x])
			}
			return neighbors
		}, [])
	}
}
