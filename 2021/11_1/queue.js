function isIterable(obj) {
	if (obj === null) { return false }
	return typeof obj[Symbol.iterator] === "function"
}

export class Queue {
	constructor(arr) {
		if (arr === undefined) { this.arr = [] }
		else if (isIterable(arr)) { this.arr = [...arr] }
		else { this.arr = [ arr ] }
	}

	push(...items) {
		this.arr.push(...items)
	}

	*items() {
		while (this.arr.length > 0) {
			yield this.arr.shift()
		}
	}
}
