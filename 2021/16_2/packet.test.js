import { Packet } from "./packet.js"

describe("packet tests", () => {
	test("example 1", () => {
		const packet = new Packet("D2FE28")
		expect(packet.version).toBe(6)
		expect(packet.type).toBe("literal")
		expect(packet.literal).toBe(2021)
	})

	test("example 2", () => {
		const packet = new Packet("38006F45291200")
		expect(packet.version).toBe(1)
		expect(packet.type).toBe("less than")
		expect(packet.subPackets.length).toBe(2)

		expect(packet.subPackets[0].type).toBe("literal")
		expect(packet.subPackets[0].literal).toBe(10)

		expect(packet.subPackets[1].type).toBe("literal")
		expect(packet.subPackets[1].literal).toBe(20)
	})

	test("example 3", () => {
		const packet = new Packet("EE00D40C823060")
		expect(packet.version).toBe(7)
		expect(packet.type).toBe("maximum")
		expect(packet.subPackets.length).toBe(3)

		expect(packet.subPackets[0].type).toBe("literal")
		expect(packet.subPackets[0].literal).toBe(1)

		expect(packet.subPackets[1].type).toBe("literal")
		expect(packet.subPackets[1].literal).toBe(2)

		expect(packet.subPackets[2].type).toBe("literal")
		expect(packet.subPackets[2].literal).toBe(3)
	})
})
