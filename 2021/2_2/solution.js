export async function solution(input) {
	let horizontalPosition = 0, depth = 0, aim = 0

	for (const instruction of input) {
		let [direction, distance] = instruction.split(" ")
		distance = Number(distance)
		switch (direction) {
			case "forward":
				horizontalPosition += distance
				depth += aim * distance
				break
			case "up":
				aim -= distance
				break
			case "down":
				aim += distance
				break
		}
	}

	return horizontalPosition * depth
}
