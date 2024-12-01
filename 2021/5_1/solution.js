import { Vent } from "./vent.js"
import { Grid } from "./grid.js"

export async function solution(input) {
	const vents = input
		.map(line => new Vent(line))
		.filter(vent => vent.start.x === vent.end.x || vent.start.y === vent.end.y) // Remove diagonals from consideration

	const grid = new Grid(vents)

	return grid.countDangerousPoints()
}
