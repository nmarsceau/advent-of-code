import { readFile } from "node:fs/promises"

import { solution } from "./solution.js"
import { SnailNumber } from "./snailNumber.js"

async function getTestInput(filename) {
	return readFile(filename, "utf8")
		.then(content => {
			const lines = content.trim().split("\n")
			return lines
		})
}

describe("addition tests", () => {
	test("example 1", () => {
		const snailNumbers = [
			new SnailNumber("[1,2]"),
			new SnailNumber("[[3,4],5]"),
		]
		const sum = snailNumbers.slice(1).reduce((sum, cur) => sum.add(cur), snailNumbers[0])
		expect(sum.str).toBe("[[1,2],[[3,4],5]]")
	})

	test("example 2", () => {
		const snailNumbers = [
			new SnailNumber("[[[[4,3],4],4],[7,[[8,4],9]]]"),
			new SnailNumber("[1,1]"),
		]
		const sum = snailNumbers.slice(1).reduce((sum, cur) => sum.add(cur), snailNumbers[0])
		expect(sum.str).toBe("[[[[0,7],4],[[7,8],[6,0]]],[8,1]]")
	})

	test("example 3", () => {
		const snailNumbers = [
			new SnailNumber("[1,1]"),
			new SnailNumber("[2,2]"),
			new SnailNumber("[3,3]"),
			new SnailNumber("[4,4]"),
		]
		const sum = snailNumbers.slice(1).reduce((sum, cur) => sum.add(cur), snailNumbers[0])
		expect(sum.str).toBe("[[[[1,1],[2,2]],[3,3]],[4,4]]")
	})

	test("example 4", () => {
		const snailNumbers = [
			new SnailNumber("[1,1]"),
			new SnailNumber("[2,2]"),
			new SnailNumber("[3,3]"),
			new SnailNumber("[4,4]"),
			new SnailNumber("[5,5]"),
		]
		const sum = snailNumbers.slice(1).reduce((sum, cur) => sum.add(cur), snailNumbers[0])
		expect(sum.str).toBe("[[[[3,0],[5,3]],[4,4]],[5,5]]")
	})

	test("example 5", () => {
		const snailNumbers = [
			new SnailNumber("[1,1]"),
			new SnailNumber("[2,2]"),
			new SnailNumber("[3,3]"),
			new SnailNumber("[4,4]"),
			new SnailNumber("[5,5]"),
			new SnailNumber("[6,6]"),
		]
		const sum = snailNumbers.slice(1).reduce((sum, cur) => sum.add(cur), snailNumbers[0])
		expect(sum.str).toBe("[[[[5,0],[7,4]],[5,5]],[6,6]]")
	})

	test("example 6", () => {
		const snailNumbers = [
			new SnailNumber("[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]"),
			new SnailNumber("[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]"),
			new SnailNumber("[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]"),
			new SnailNumber("[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]"),
			new SnailNumber("[7,[5,[[3,8],[1,4]]]]"),
			new SnailNumber("[[2,[2,2]],[8,[8,1]]]"),
			new SnailNumber("[2,9]"),
			new SnailNumber("[1,[[[9,3],9],[[9,0],[0,7]]]]"),
			new SnailNumber("[[[5,[7,4]],7],1]"),
			new SnailNumber("[[[[4,2],2],6],[8,7]]"),
		]
		const sum = snailNumbers.slice(1).reduce((sum, cur) => sum.add(cur), snailNumbers[0])
		expect(sum.str).toBe("[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]")
	})
})

describe("magnitude tests", () => {
	test("example 1", () => {
		const sn = new SnailNumber("[9,1]")
		expect(sn.magnitude()).toBe(29)
	})

	test("example 2", () => {
		const sn = new SnailNumber("[[9,1],[1,9]]")
		expect(sn.magnitude()).toBe(129)
	})

	test("example 3", () => {
		const sn = new SnailNumber("[[1,2],[[3,4],5]]")
		expect(sn.magnitude()).toBe(143)
	})

	test("example 4", () => {
		const sn = new SnailNumber("[[[[0,7],4],[[7,8],[6,0]]],[8,1]]")
		expect(sn.magnitude()).toBe(1384)
	})

	test("example 5", () => {
		const sn = new SnailNumber("[[[[1,1],[2,2]],[3,3]],[4,4]]")
		expect(sn.magnitude()).toBe(445)
	})

	test("example 6", () => {
		const sn = new SnailNumber("[[[[3,0],[5,3]],[4,4]],[5,5]]")
		expect(sn.magnitude()).toBe(791)
	})

	test("example 7", () => {
		const sn = new SnailNumber("[[[[5,0],[7,4]],[5,5]],[6,6]]")
		expect(sn.magnitude()).toBe(1137)
	})

	test("example 8", () => {
		const sn = new SnailNumber("[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]")
		expect(sn.magnitude()).toBe(3488)
	})
})

describe("final test", () => {
	test("test input", async () => {
		const EXPECTED = 4140
		return getTestInput("./input.test.dat")
			.then(solution)
			.then(result => expect(result).toBe(EXPECTED))
	})
})
