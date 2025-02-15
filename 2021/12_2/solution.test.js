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
		const EXPECTED = 36
		return getTestInput("./input1.test.dat")
			.then(solution)
			.then(result => expect(result).toBe(EXPECTED))
	})
	test("test input 2", async () => {
		const EXPECTED = 103
		return getTestInput("./input2.test.dat")
			.then(solution)
			.then(result => expect(result).toBe(EXPECTED))
	})
	test("test input 3", async () => {
		const EXPECTED = 3509
		return getTestInput("./input3.test.dat")
			.then(solution)
			.then(result => expect(result).toBe(EXPECTED))
	})
})
