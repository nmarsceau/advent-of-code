export class Vent {
	constructor(input) {
		[ this.start, this.end ] = Vent.#parseFromRaw(input)
	}

	static #parseFromRaw(raw) {
		return raw
			.split(" -> ")
			.map(piece => piece.split(",").map(n => Number(n)))
			.map(coordinate => ({x: coordinate[0], y: coordinate[1]}))
	}
}
