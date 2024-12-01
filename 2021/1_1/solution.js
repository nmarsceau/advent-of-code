export async function solution(input) {
	let numberIncreased = 0
	for (let i = 1; i < input.length; i++) {
		const current = Number(input[i]), previous = Number(input[i - 1])
		if (current > previous) {
			numberIncreased++
		}
	}
	return numberIncreased
}
