export class FoldingGrid {
	constructor(points) {
		// Determine grid dimensions.
		const maxX = Math.max(...points.map(point => point.x))
		const maxY = Math.max(...points.map(point => point.y))

		// Initialize grid.
		this.grid = Array.from({ length: maxY + 1 }, () => Array.from({ length: maxX + 1 }, () => "."))

		// Draw points.
		for (const point of points) {
			this.grid[point.y][point.x] = "#"
		}
	}

	toString() {
		return this.grid.map(row => row.join("")).join("\n")
	}

	fold(instruction) {
		switch (instruction.axis) {
			case "x":
				this.#foldLeft(instruction.line)
				break
			case "y":
				this.#foldUp(instruction.line)
				break
			default:
				throw new Error("Invalid axis.")
		}
	}

	#foldLeft(line) {
		this.grid = this.grid.map(row => FoldingGrid.#foldLines(
			row.slice(0, line),       // First half of the row.
			row.slice(line).reverse() // Second half of the row.
		))
	}

	#foldUp(line) {
		const bottomHalf = this.grid.slice(line).reverse() // Bottom half of the grid.
		this.grid = this.grid
			.slice(0, line) // Top half of the grid.
			.map((line, i) => FoldingGrid.#foldLines(line, bottomHalf[i] ?? []))
	}

	static #foldLines(a, b) {
		return a.map((point, i) => point === "#" || b[i] === "#" ? "#" : ".")
	}
}
