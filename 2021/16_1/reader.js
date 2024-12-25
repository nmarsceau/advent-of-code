export class StringReader {
	#str
	#readHead

	constructor(str) {
		this.#str = str
		this.#readHead = 0
	}

	// Supports either reading a specified length or matching against a regexp.
	read(value) {
		if (typeof value === "number") {
			return this.#readLength(value)
		} else if (value instanceof RegExp) {
			return this.#readRegex(value)
		} else {
			throw new Error ("Invalid argument to StringReader.read().")
		}
	}

	#readLength(len) {
		// Starting at the current point where the read head is, take a substring of the length specified, updating the read head value.
		return this.#str.substring(this.#readHead, this.#readHead += len)
	}

	#readRegex(reg) {
		// Starting at the current point where the read head is, try to match against the regexp.
		// If no matches are found, fall back to an empty string.
		const match = this.#str.substring(this.#readHead).match(reg)?.[0] ?? ""

		// Update the read head with the length of whatever was matched.
		this.#readHead += match.length

		return match
	}
}
