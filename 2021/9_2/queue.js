export class Queue {
	constructor(arr) {
		if (arr !== undefined) {
			if (!Array.isArray(arr)) {
				arr = [ arr ]
			}
			this.arr = arr
		}
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
