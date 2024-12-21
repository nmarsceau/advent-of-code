import { readFile } from "node:fs/promises"

import { solution } from "./solution.js"

async function getInput() {
	return readFile("./input.dat", "utf8")
		.then(content => {
			const lines = content.trim().split("\n")
			return lines
		})
}

getInput()
	.then(solution)
	.then(result => console.log(`The answer is\n${result}`))
