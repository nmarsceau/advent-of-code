import { solution } from "./solution.js"

describe("solution tests", () => {
	test("test input 1", async () => {
		const EXPECTED = 6
		return solution(["D2FE28"]).then(result => expect(result).toBe(EXPECTED))
	})

	test("test input 2", async () => {
		const EXPECTED = 9
		return solution(["38006F45291200"]).then(result => expect(result).toBe(EXPECTED))
	})

	test("test input 3", async () => {
		const EXPECTED = 14
		return solution(["EE00D40C823060"]).then(result => expect(result).toBe(EXPECTED))
	})

	test("test input 4", async () => {
		const EXPECTED = 16
		return solution(["8A004A801A8002F478"]).then(result => expect(result).toBe(EXPECTED))
	})

	test("test input 5", async () => {
		const EXPECTED = 12
		return solution(["620080001611562C8802118E34"]).then(result => expect(result).toBe(EXPECTED))
	})

	test("test input 6", async () => {
		const EXPECTED = 23
		return solution(["C0015000016115A2E0802F182340"]).then(result => expect(result).toBe(EXPECTED))
	})

	test("test input 7", async () => {
		const EXPECTED = 31
		return solution(["A0016C880162017C3686B18A3D4780"]).then(result => expect(result).toBe(EXPECTED))
	})
})
