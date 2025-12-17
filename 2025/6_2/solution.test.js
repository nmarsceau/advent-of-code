import { readFile } from "node:fs/promises"

import { solution } from "./solution.js"

async function getTestInput(filename) {
	return readFile(filename, "utf8")
		.then(content => {
			const lines = content.trim().split("\n")
			return lines
		})
}

describe("test", () => {
	test("test input", async () => {
		const EXPECTED = 3263827
		return getTestInput("./input.test")
			.then(solution)
			.then(result => expect(result).toBe(EXPECTED))
	})
})
