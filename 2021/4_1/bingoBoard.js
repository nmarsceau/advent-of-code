export class BingoBoard {
	constructor(input) {
		this.board = BingoBoard.#parseFromRaw(input)
	}

	markNumber(n) {
		for (const row of this.board) {
			for (const item of row) {
				if (item.value === n) {
					item.marked = true
				}
			}
		}
	}

	isSolved() {
		return this.#isSolvedVertical() || this.#isSolvedHorizontal()
	}

	#isSolvedVertical() {
		// Convert rows to columns
		const columns = this.board.reduce((columns, row) => {
			for (const [i, item] of row.entries()) {
				columns[i].push(item)
			}			
			return columns
		}, Array.from({length: this.board[0].length}, () => []))

		return this.#isAnySetSolved(columns)
	}

	#isSolvedHorizontal() {
		return this.#isAnySetSolved(this.board)
	}

	#isAnySetSolved(sets) {
		return sets.some(set => set.every(item => item.marked))
	}

	score() {
		return this.board.reduce((score, row) => {
			return score + row
				.filter(item => !item.marked)
				.reduce((score, item) => score + item.value, 0)
		}, 0)
	}

	toString() {
		return this.board
			.map(line => {
				return line
					.map(item => {
						return `\t${item.value}${item.marked ? "*" : " "}`
					})
					.join("")
			})
			.join("\n")
	}

	print() {
		console.log(this.toString())
	}

	static #parseFromRaw(raw) {
		return raw.map(line => line
			.trim() // Remove leading/trailing whitespace.
			.split(new RegExp("\\s+")) // There can be sequences of 1 or more spaces between numbers.
			.map(n => ({ value: Number(n), marked: false })) // Each "node" is a number and a flag to indicate whether it's marked or not.
		)
	}
}
