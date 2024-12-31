import { SnailNumber } from "./snailNumber.js"

export async function solution(input) {
	const snailNumbers = input.map(line => new SnailNumber(line))

	let largestMagnitude = 0
	for (let i = 0; i < snailNumbers.length - 1; i++) {
		for (let j = i + 1; j < snailNumbers.length; j++) {
			largestMagnitude = Math.max(
				largestMagnitude,
				snailNumbers[i].clone().add(snailNumbers[j].clone()).magnitude(),
				snailNumbers[j].clone().add(snailNumbers[i].clone()).magnitude(),
			)
		}
	}
	return largestMagnitude
}
