function slidingWindowSum(input, n) {
	const output = []

	for (let i = 0; i + n <= input.length; i++) {
		let x = 0
		for (let j = 0; j < n; j++) {
			x += Number(input[i + j])
		}
		output.push(x)
	}

	return output
}

export async function solution(input) {
	input = slidingWindowSum(input, 3)

	let numberIncreased = 0
	for (let i = 1; i < input.length; i++) {
		const current = Number(input[i]), previous = Number(input[i - 1])
		if (current > previous) {
			numberIncreased++
		}
	}
	return numberIncreased
}
