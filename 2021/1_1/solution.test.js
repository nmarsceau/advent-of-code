import { readFile } from "node:fs/promises"

import { solution } from "./solution.js"

async function getTestInput(filename) {
	return readFile(filename, "utf8")
		.then(content => {
			const lines = content.trim().split("\n")
			return lines
		})
}

describe("tests", () => {
	test("test input 1", async () => {
		const EXPECTED = 7
		return getTestInput("./input.test.dat")
			.then(solution)
			.then(result => expect(result).toBe(EXPECTED))
	})
})
