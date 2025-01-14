/* Explanation:

The outcome of a turn will be the same for any universe where the players start at the same starting points, the same player is rolling, and the same value is rolled.
There are many combinations of 3 Dirac die rolls that result in the same value. For instance, rolls 1, 2, 3 and 3, 2, 1 are both a 6.
So we don't have to simulate each individual universe, only the unique states that "converge" to the same result.

*/

export async function solution(input) {
	// Parse input and initialize state.
	const
		initialPositions = input.map(line => Number(line.match(/Player \d+ starting position: (\d+)/)[1])),
		initialScores = new Array(input.length).fill(0),
		wins = new Array(input.length).fill(0)
	let universes = {[JSON.stringify([initialPositions, initialScores])]: 1}
	const rollOccurrences = { 3:1, 4:3, 5:6, 6:7, 7:6, 8:3, 9:1 } // These are the numbers of die roll combinations that result in each unique value.

	while (Object.entries(universes).length > 0) {
		for (const player of initialPositions.keys()) {
			universes = Object.entries(universes).reduce((nextUniverses, [ state, universeCount ]) => {
				const [positions, scores] = JSON.parse(state)
				for (const [ roll, count ] of Object.entries(rollOccurrences)) {
					// Update the player's position and score.
					const nextPositions = positions.with(player, (positions[player] + Number(roll) - 1) % 10 + 1)
					const nextScores = scores.with(player, scores[player] + nextPositions[player])

					// Check for a win.
					if (nextScores[player] >= 21) {
						wins[player] += universeCount * count
						continue
					}

					// If no one won, add this universe back to the tracker object.
					const nextState = JSON.stringify([nextPositions, nextScores])
					nextUniverses[nextState] = (nextUniverses[nextState] ?? 0) + universeCount * count
				}
				return nextUniverses
			}, {})
		}
	}

	return Math.max(...wins)
}
