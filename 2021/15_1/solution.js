import { DSP } from "./dsp.js"

export async function solution(input) {
	const dsp = new DSP(input.map(row => row.split("").map(Number)))
	return dsp.shortestPath(0, 0, -1, -1)
}
