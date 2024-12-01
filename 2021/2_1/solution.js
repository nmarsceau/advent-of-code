export async function solution(input) {
	let horizontalPosition = 0, depth = 0

	for (const instruction of input) {
		let [direction, distance] = instruction.split(" ")
		distance = Number(distance)
		switch (direction) {
			case "forward":
				horizontalPosition += distance
				break
			case "up":
				depth -= distance
				break
			case "down":
				depth += distance
				break
		}
	}

	return horizontalPosition * depth
}
