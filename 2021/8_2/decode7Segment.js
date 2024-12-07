export function decode7Segments(patterns) {
	const decoded = []

	// The patterns with unique lengths.
	decoded[1] = patterns.find(p => p.length === 2)
	decoded[4] = patterns.find(p => p.length === 4)
	decoded[7] = patterns.find(p => p.length === 3)
	decoded[8] = patterns.find(p => p.length === 7)

	// The remaining segments are all 5 and 6 segments long.
	const fiveSegments = patterns.filter(p => p.length === 5)
	const sixSegments = patterns.filter(p => p.length === 6)

	// 6 shares exactly 1 segment in common with 1.
	decoded[6] = sixSegments.find(p => p.split("").filter(ch => decoded[1].includes(ch)).length === 1)
	sixSegments.splice(sixSegments.indexOf(decoded[6]), 1)

	// 5 shares all of its segments with 6.
	decoded[5] = fiveSegments.find(p => p.split("").every(ch => decoded[6].includes(ch)))
	fiveSegments.splice(fiveSegments.indexOf(decoded[5]), 1)

	// 0 shares a segment in common with 6 that 5 does not have.
	const extraSegment = decoded[6].split("").find(ch => !decoded[5].includes(ch))
	decoded[0] = sixSegments.find(p => p.includes(extraSegment))
	sixSegments.splice(sixSegments.indexOf(decoded[0]), 1)

	// 9 is the only remaining item with 6 segments.
	decoded[9] = sixSegments[0]

	// 3 contains both segments of 1.
	decoded[3] = fiveSegments.find(p => decoded[1].split("").every(ch => p.includes(ch)))
	fiveSegments.splice(fiveSegments.indexOf(decoded[3]), 1)

	// 2 is the only remaining item with 5 segments.
	decoded[2] = fiveSegments[0]

	return decoded
}
