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
		const EXPECTED = 5353
		return getTestInput("./input1.test.dat")
			.then(solution)
			.then(result => expect(result).toBe(EXPECTED))
	})
	test("test input 2", async () => {
		const EXPECTED = 61229
		return getTestInput("./input2.test.dat")
			.then(solution)
			.then(result => expect(result).toBe(EXPECTED))
	})
})
