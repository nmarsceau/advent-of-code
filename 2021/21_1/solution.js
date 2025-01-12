import { DeterministicDie } from "./die.js"
import { Player } from "./player.js"

function checkForWin(players) {
	return players.some(p => p.score >= 1000)
}

export async function solution(input) {
	// Parse each line of input into a new player.
	const players = input.map(line => new Player(Number(line.match(/Player \d+ starting position: (\d+)/)[1])))
	
	// Run the game.
	const die = new DeterministicDie()
	for (let playerIndex = 0; !checkForWin(players); playerIndex = (playerIndex + 1) % players.length) {
		players[playerIndex].roll(die.roll() + die.roll() + die.roll())
	}
	
	// Compute the result.
	const losingScore = Math.min(...players.map(player => player.score))
	return losingScore * die.rolls
}
