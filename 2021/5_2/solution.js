import { Vent } from "./vent.js"
import { Grid } from "./grid.js"

export async function solution(input) {
	const vents = input.map(line => new Vent(line))
	const grid = new Grid(vents)
	return grid.countDangerousPoints()
}
