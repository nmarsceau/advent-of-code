import { hex2bin } from "./hex2bin.js"
import { StringReader } from "./reader.js"

export class Packet {
	static #packetTypes = [ "sum", "product", "minimum", "maximum", "literal", "greater than", "less than", "equal to" ]

	constructor(input) {
		// Accept input as a string or an instance of StringReader.
		if (input instanceof StringReader) { this.reader = input }
		else if (typeof input === "string") { this.reader = new StringReader(hex2bin(input)) }
		else { throw new Error("Invalid packet input.") }

		// Initialize properties.
		this.length = 0
		this.version = this.#readInt(3)
		const typeId = this.#readInt(3)
		this.type = Packet.#packetTypes[typeId]
		this.literal = this.#parseLiteralValue()
		this.subPackets = this.#parseSubpackets()
	}

	#parseLiteralValue() {
		if (this.type !== "literal") return null

		// Read 5-bit chunks until we find one that starts with "0" (indicates the end of the binary literal).
		const chunks = this.#read(/^(?:1[01]{4})*0[01]{4}/)

		// Remove the leading bit from each chunk, leaving just the bits that make up the literal.
		const literal = chunks.replace(/[01]([01]{4})/g, "$1")

		// Convert it to a number
		return parseInt(literal, 2)
	}

	#parseSubpackets() {
		if (this.type === "literal") return []

		// Parse subpackets depending on the type of subpacket specified.
		const subpacketType = this.#readInt(1)
		return subpacketType === 0 ? this.#parseSubpacketsByLength() : this.#parseSubpacketsByCount()
	}

	#parseSubpacketsByLength() {
		// Read the value that indicates how long we should continue reading subpackets.
		const length = this.#readInt(15)

		// Read subpackets until we reach the length specified.
		const subPackets = []
		let lengthRead = 0
		while (lengthRead < length) {
			const subPacket = new Packet(this.reader)
			lengthRead += subPacket.getLength()
			subPackets.push(subPacket)
		}

		return subPackets
	}

	#parseSubpacketsByCount() {
		// Read the value that indicates how many subpackets we should read.
		const count = this.#readInt(11)

		// Read that many subpackets.
		const subPackets = []
		while (subPackets.length < count) {
			subPackets.push(new Packet(this.reader))
		}

		return subPackets
	}

	// Reads either a specified length or matches a regex from this.reader.
	// Handles updating the length of the packet.
	#read(request) {
		const value = this.reader.read(request)
		this.length += value.length
		return value
	}

	// Reads a specified length and converts it to an integer.
	#readInt(request) {
		return parseInt(this.#read(request), 2)
	}

	getLength() {
		return this.length + this.subPackets.reduce((sum, sp) => sum + sp.getLength(), 0)
	}

	solve() {
		switch (this.type) {
			case "sum":
				return this.subPackets.reduce((sum, sp) => sum + sp.solve(), 0)
			case "product":
				return this.subPackets.reduce((sum, sp) => sum * sp.solve(), 1)
			case "minimum":
				return Math.min(...this.subPackets.map(sp => sp.solve()))
			case "maximum":
				return Math.max(...this.subPackets.map(sp => sp.solve()))
			case "literal":
				return this.literal
			case "greater than":
				return this.subPackets[0].solve() > this.subPackets[1].solve() ? 1 : 0
			case "less than":
				return this.subPackets[0].solve() < this.subPackets[1].solve() ? 1 : 0
			case "equal to":
				return this.subPackets[0].solve() === this.subPackets[1].solve() ? 1 : 0
		}
	}
}
