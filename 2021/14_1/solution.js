import { Polymer } from "./polymer.js"

export async function solution(input) {
	// Initialize the polymer object.
	const polymer = new Polymer(input[0], input.slice(2))

	// Run the specified number of steps.
	polymer.runSteps(10)

	// Return the strength of the polymer.
	return polymer.strength()
}
