export async function solution(input) {
	const fishes = input[0].split(",").map(n => Number(n))
	const days = [0, 0, 0, 0, 0, 0, 0, 0, 0]
	const DAYS = 256

	// Populate the initial list of fishes.
	for (let fish of fishes) {
		days[fish] += 1
	}

	// For the specified number of days, compute how many new fish would spawn.
	for (let i = 0; i < DAYS; i++) {
		const today = i % days.length
		days[(today + 7) % days.length] += days[today]
	}

	return days.reduce((sum, day) => sum + day)
}
