function countBits(input) {
	return input.reduce((bitCounts, row) => {
		for (const [i, char] of row.split("").entries()) {
			bitCounts[i][Number(char)]++
		}
		return bitCounts
	}, Array.from({length: input[0].length}, () => [0, 0]))
}

function determineOxygenRating(input) {
	let pos = 0
	while (input.length > 1) {
		const bitCounts = countBits(input)
		const mostCommonValue = String(Number(bitCounts[pos][1] >= bitCounts[pos][0]))
		input = input.filter(row => row.charAt(pos) === mostCommonValue)
		pos++
	}
	return parseInt(input[0], 2)
}

function determineCO2Rating(input) {
	let pos = 0
	while (input.length > 1) {
		const bitCounts = countBits(input)
		const leastCommonValue = String(Number(bitCounts[pos][1] < bitCounts[pos][0]))
		input = input.filter(row => row.charAt(pos) === leastCommonValue)
		pos++
	}
	return parseInt(input[0], 2)
}

export async function solution(input) {
	const oxygen = determineOxygenRating([...input])
	const co2 = determineCO2Rating([...input])

	return oxygen * co2
}
