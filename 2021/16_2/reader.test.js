import { StringReader } from "./reader.js"

describe("reader tests", () => {
	test("length example", () => {
		const reader = new StringReader("abcdefg")
		expect(reader.read(3)).toBe("abc")
		expect(reader.read(4)).toBe("defg")
	})

	test("regexp example", () => {
		const reader = new StringReader("foo123333333345bar")
		expect(reader.read(3)).toBe("foo")
		expect(reader.read(/123+45/)).toBe("123333333345")
		expect(reader.read(3)).toBe("bar")
	})
})
