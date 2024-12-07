import { decode7Segments } from "./decode7Segment.js"

export async function solution(input) {
	const outputs = input.map(line => {
		// Parse input
		const [ patterns, outputCode ] = line
			.split(" | ")
			.map(piece => piece.split(" ").map(pattern => pattern.split("").sort().join("") /* Sort the characters of each pattern */))
		
		// Decode 7-segment pieces
		const decoded = decode7Segments(patterns)

		// Translate the output using the decoded pieces
		return Number(outputCode.map(oc => String(decoded.indexOf(oc))).join(""))
	})

	return outputs.reduce((sum, output) => sum + output, 0)
}
