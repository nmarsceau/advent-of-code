import { hex2bin } from "./hex2bin.js"

describe("hex2bin tests", () => {
	test("example 1", () => {
		expect(hex2bin("D2FE28")).toBe("110100101111111000101000")
	})

	test("example 2", () => {
		expect(hex2bin("38006F45291200")).toBe("00111000000000000110111101000101001010010001001000000000")
	})

	test("example 3", () => {
		expect(hex2bin("EE00D40C823060")).toBe("11101110000000001101010000001100100000100011000001100000")
	})
})
