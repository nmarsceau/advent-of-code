export class SnailNumber {
	constructor(str) {
		this.str = str
	}

	add(that) {
		this.str = `[${this.str},${that.str}]`
		this.reduce()
		return this
	}

	reduce() {
		while (this.explode() || this.split()) { /* No loop body. */ }
	}

	explode() {
		let unmatchedBrackets = 0
		for (const [i, ch] of this.str.split("").entries()) {
			// Maintain a count of unmatched opening brackets so we know our current nesting depth.
			if (ch === "[") { unmatchedBrackets++ }
			else if (ch === "]") { unmatchedBrackets-- }

			// If we ever exceed 4 nesting levels, that pair needs to be exploded!
			if (unmatchedBrackets > 4) {
				// Define all the regexes we'll use in this section.
				const pairRegex = /\[(\d+),(\d+)\]/
				const lastNumberRegex = /(\d+)(?!.*\d)/
				const nextNumberRegex = /(\d+)/

				// Starting at the current index, match the pair that needs to be exploded.
				const match = this.str.substring(i).match(pairRegex)
				const [ pair, left, right ] = match

				// Pull out the portions of the original string surrounding the pair.
				let preString = this.str.substring(0, i)
				let postString = this.str.substring(i + pair.length)

				// Add the pieces of the exploding pair to the surrounding numbers.
				preString = preString.replace(lastNumberRegex, match => Number(match) + Number(left))
				postString = postString.replace(nextNumberRegex, match => Number(match) + Number(right))

				// Put it all back together, putting a "0" where the pair used to be.
				this.str = `${preString}0${postString}`

				return true
			}
		}
		return false
	}

	split() {
		// Define the regex used in this section.
		const doubleDigitRegex = /\d\d/

		// Find the first occurrence of a double-digit number.
		const match = this.str.match(doubleDigitRegex)?.[0]

		// If we did find one, perform a split.
		if (match) {
			this.str = this.str.replace(match, `[${Math.floor(match/2)},${Math.ceil(match/2)}]`)

			return true
		}
		return false
	}

	magnitude() {
		// Parse the snail number into a nested array, and then use a recursive function to calculate its magnitude.
		return SnailNumber.#magnitude(JSON.parse(this.str))
	}

	static #magnitude(node) {
		return (
			3 * (Array.isArray(node[0]) ? SnailNumber.#magnitude(node[0]) : node[0]) +
			2 * (Array.isArray(node[1]) ? SnailNumber.#magnitude(node[1]) : node[1])
		)
	}

	clone() {
		return new SnailNumber(this.str)
	}
}
