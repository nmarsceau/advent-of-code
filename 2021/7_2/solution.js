export async function solution(input) {
	const crabs = input[0].split(",").map(n => Number(n))
	const minCrab = Math.min(...crabs), maxCrab = Math.max(...crabs)
	let minFuelValue = Infinity

	function fuelAlgorithm(crab, target) {
		const distance = Math.abs(crab - target)
		return distance * (distance + 1) / 2
	}

	for (let i = minCrab; i <= maxCrab; i++) {
		const fuelValue = crabs.reduce((fuelValue, crab) => fuelValue + fuelAlgorithm(crab, i), 0)
		minFuelValue = Math.min(minFuelValue, fuelValue)
	}

	return minFuelValue
}
