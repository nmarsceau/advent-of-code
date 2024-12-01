function countBits(input) {
	return input.reduce((bitCounts, row) => {
		for (const [i, char] of row.split("").entries()) {
			bitCounts[i][Number(char)]++
		}
		return bitCounts
	}, Array.from({length: input[0].length}, () => [0, 0]))
}

function determineRates(bitCounts) {
	let { gamma, epsilon } = bitCounts.reduce((prev, cur) => {
		prev.gamma += String(Number(cur[0] <= cur[1]))
		prev.epsilon += String(Number(cur[0] > cur[1]))
		return prev
	}, { gamma: "", epsilon: "" })

	return { gamma: parseInt(gamma, 2), epsilon: parseInt(epsilon, 2) }
}

export async function solution(input) {
	const { gamma, epsilon } = determineRates(countBits(input))
	return gamma * epsilon
}
