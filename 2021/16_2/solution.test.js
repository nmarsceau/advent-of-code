import { solution } from "./solution.js"

describe("solution tests", () => {
	test("test input 1", async () => {
		const EXPECTED = 2021
		return solution(["D2FE28"]).then(result => expect(result).toBe(EXPECTED))
	})

	test("test input 2", async () => {
		const EXPECTED = 1
		return solution(["38006F45291200"]).then(result => expect(result).toBe(EXPECTED))
	})

	test("test input 3", async () => {
		const EXPECTED = 3
		return solution(["EE00D40C823060"]).then(result => expect(result).toBe(EXPECTED))
	})

	test("test input 4", async () => {
		const EXPECTED = 15
		return solution(["8A004A801A8002F478"]).then(result => expect(result).toBe(EXPECTED))
	})

	test("test input 5", async () => {
		const EXPECTED = 46
		return solution(["620080001611562C8802118E34"]).then(result => expect(result).toBe(EXPECTED))
	})

	test("test input 6", async () => {
		const EXPECTED = 46
		return solution(["C0015000016115A2E0802F182340"]).then(result => expect(result).toBe(EXPECTED))
	})

	test("test input 7", async () => {
		const EXPECTED = 54
		return solution(["A0016C880162017C3686B18A3D4780"]).then(result => expect(result).toBe(EXPECTED))
	})

	test("test input 8", async () => {
		const EXPECTED = 3
		return solution(["C200B40A82"]).then(result => expect(result).toBe(EXPECTED))
	})

	test("test input 9", async () => {
		const EXPECTED = 54
		return solution(["04005AC33890"]).then(result => expect(result).toBe(EXPECTED))
	})

	test("test input 10", async () => {
		const EXPECTED = 7
		return solution(["880086C3E88112"]).then(result => expect(result).toBe(EXPECTED))
	})

	test("test input 11", async () => {
		const EXPECTED = 9
		return solution(["CE00C43D881120"]).then(result => expect(result).toBe(EXPECTED))
	})

	test("test input 12", async () => {
		const EXPECTED = 1
		return solution(["D8005AC2A8F0"]).then(result => expect(result).toBe(EXPECTED))
	})

	test("test input 13", async () => {
		const EXPECTED = 0
		return solution(["F600BC2D8F"]).then(result => expect(result).toBe(EXPECTED))
	})

	test("test input 14", async () => {
		const EXPECTED = 0
		return solution(["9C005AC2F8F0"]).then(result => expect(result).toBe(EXPECTED))
	})

	test("test input 15", async () => {
		const EXPECTED = 1
		return solution(["9C0141080250320F1802104A08"]).then(result => expect(result).toBe(EXPECTED))
	})
})
