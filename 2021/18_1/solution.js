import { SnailNumber } from "./snailNumber.js"

export async function solution(input) {
	const snailNumbers = input.map(line => new SnailNumber(line))
	const sum = snailNumbers.reduce((sum, cur) => sum.add(cur))
	return sum.magnitude()
}
