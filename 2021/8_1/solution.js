export async function solution(input) {
	const outputs = input.map(line => line.split(" | ")[1].trim().split(" "))
	return outputs.reduce((easyDigits, output) => {
		output.forEach(item => {
			// 1 -> 2 segments
			// 7 -> 3 segments
			// 4 -> 4 segments
			// 8 -> 7 segments
			if ([2, 3, 4, 7].includes(item.length)) {
				easyDigits++
			}
		})
		return easyDigits
	}, 0)
}
