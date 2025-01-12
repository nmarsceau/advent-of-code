export class Image {
	constructor(input) {
		// Convert "#" and "." to "1" and "0" to make processing easier.
		input = input.map(line => line.replaceAll("#", "1").replaceAll(".", "0"))

		this.enhancementAlgorithm = input[0]
		this.image = input.splice(2).map(line => Array.from(line.trim()))
	}

	expand(n) {
		// Expand columns
		const columnAddition = "0".repeat(n)
		this.image = this.image.map(line => {
			line.unshift(...Array.from(columnAddition))
			line.push(...Array.from(columnAddition))
			return line
		})

		// Expand rows
		const rowLength = this.image[0].length ?? 0
		const newRow = "0".repeat(rowLength)
		for (let i = 0; i < n; i++) {
			this.image.unshift(Array.from(newRow))
			this.image.push(Array.from(newRow))
		}
	}

	enhance(n) {
		// Make room for the image to grow during the enhancements.
		this.expand(n + 1)

		// Run the enhancements.
		for (let i = 0; i < n; i++) {
			this.#enhance()
		}
	}

	#enhance() {
		this.image = this.image.map((row, i) => row.map((pixel, j) => {
			const pixels = 
				(this.image[i - 1]?.[j - 1] ?? this.image[i][j]) + // top left
				(this.image[i - 1]?.[j]     ?? this.image[i][j]) + // top center
				(this.image[i - 1]?.[j + 1] ?? this.image[i][j]) + // top right

				(this.image[i]?.[j - 1]     ?? this.image[i][j]) + // center left
				pixel                                            + // center center
				(this.image[i]?.[j + 1]     ?? this.image[i][j]) + // center right

				(this.image[i + 1]?.[j - 1] ?? this.image[i][j]) + // bottom left
				(this.image[i + 1]?.[j]     ?? this.image[i][j]) + // bottom center
				(this.image[i + 1]?.[j + 1] ?? this.image[i][j])   // bottom right
			return this.#enhancedPixel(pixels)
		}))
	}

	#enhancedPixel(pixels) {
		return this.enhancementAlgorithm[parseInt(pixels, 2)]
	}

	countLitPixels() {
		return this.image.reduce((sum, row) => {
			return sum + row.filter(pixel => pixel === "1").length
		}, 0)
	}
}
