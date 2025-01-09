/* Explanation:

See the full explanation in part 1.

pusherW + pusherC + popperB = popperW.

Since we're looking for the smallest possible model number in part 2, we're looking for the minimum value that each digit can hold and meet all the requirements.
So one of them will be 1, and the other one will be 1 + Math.abs(difference).

If difference is > 0, we know that pusherW must be less than popperW.
So pusherW will be 1 and popperW will be 1 + Math.abs(difference).

If difference is <= 0, we know that pusherW must be greater than or equal to popperW.
So popperW will be 1 and pusherW will be 1 + Math.abs(difference).

Repeating this for each pair of chunks gives us all the digits in the smallest valid model number.

*/

function splitInputByChunkLength(input, n) {
	const chunks = []
	for (let i = 0; i * n < input.length; i++) {
		chunks.push(input.slice(i * n, (i + 1) * n))
	}
	return chunks
}

function getNumberFromInstruction(program, step) {
	const numberRegex = /-?\d+/
	return Number(program[step - 1].match(numberRegex)?.[0])
}

export async function solution(input) {
	const chunks = splitInputByChunkLength(input, 18), stack = [], digits = []
	for (const [i, chunk] of chunks.entries()) {
		if (getNumberFromInstruction(chunk, 5) === 1) {
			stack.push([ i, chunk ])
		} else {
			const [ j, old ] = stack.pop()
			const difference = getNumberFromInstruction(old, 16) + getNumberFromInstruction(chunk, 6)
			const max = 1 + Math.abs(difference), min = 1; // It pains me, but this semicolon is necessary due to the [ ] operator on the next line.
			[ digits[j], digits[i] ] = (difference > 0 ? [ min, max ] : [ max, min ])
		}
	}
	return Number(digits.join(""))
}
