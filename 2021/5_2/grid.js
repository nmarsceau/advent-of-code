export class Grid {
	constructor(vents) {
		// Determine the biggest coordinates we have so we know how big to make the grid.
		const { maxX, maxY } = Grid.#getMaxCoordinates(vents)

		// Initialize the grid.
		this.grid = Array.from({ length: maxY + 1 }, () => Array.from({ length: maxX + 1 }, () => 0))
		
		// Draw the vents.
		for (const vent of vents) {
			this.#drawVent(vent)
		}
	}
	
	countDangerousPoints() {
		return this.grid.reduce((prev, row) => {
			return prev + row.reduce((prev, point) => {
				if (point > 1) {
					prev++
				}
				return prev
			}, 0)
		}, 0)
	}

	#drawVent(vent) {
		if (vent.start.x === vent.end.x) { // Horizontal
			const minY = Math.min(vent.start.y, vent.end.y)
			const maxY = Math.max(vent.start.y, vent.end.y)
			for (let y = minY; y <= maxY; y++) {
				this.grid[y][vent.start.x]++
			}
		} else if (vent.start.y === vent.end.y) { // Vertical
			const minX = Math.min(vent.start.x, vent.end.x)
			const maxX = Math.max(vent.start.x, vent.end.x)
			for (let x = minX; x <= maxX; x++) {
				this.grid[vent.start.y][x]++
			}
		} else { // Diagonal
			const
				xDirection = vent.start.x < vent.end.x ? 1 : -1,
				yDirection = vent.start.y < vent.end.y ? 1 : -1,
				xStop = vent.end.x + xDirection,
				yStop = vent.end.y + yDirection
			for (let x = vent.start.x, y = vent.start.y; x !== xStop && y !== yStop; x += xDirection, y += yDirection) {
				this.grid[y][x]++
			}
		}
	}

	static #getMaxCoordinates(vents) {
		return vents.reduce((maxes, vent) => {
			maxes.maxX = Math.max(maxes.maxX, vent.start.x, vent.end.x)
			maxes.maxY = Math.max(maxes.maxY, vent.start.y, vent.end.y)
			return maxes
		}, {maxX: 0, maxY: 0})
	}
}
