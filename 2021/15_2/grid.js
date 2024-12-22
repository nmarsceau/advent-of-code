export class Grid {
	constructor(_2dArr) {
		this.grid = _2dArr
		for (const [y, row] of this.grid.entries()) {
			for (const [x, value] of row.entries()) {
				this.grid[y][x] = { x, y, value }
			}
		}
	}

	get(x, y) {
		return this.grid.at(y).at(x)
	}

	neighbors(point) {
		const x = point.x, y = point.y
		const coordinates = [
			{y: y - 1, x: x}, // up
			{y: y + 1, x: x}, // down
			{y: y, x: x - 1}, // left
			{y: y, x: x + 1}, // right
		]
		return coordinates.reduce((neighbors, c) => {
			if (this.grid[c.y]?.[c.x] !== undefined) {
				neighbors.push(this.grid[c.y][c.x])
			}
			return neighbors
		}, [])
	}
}
