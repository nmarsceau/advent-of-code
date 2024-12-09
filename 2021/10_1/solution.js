function isOpeningSymbol(ch) {
	return ["(", "[", "{", "<"].includes(ch)
}

function getCorrespondingOpeningSymbol(ch) {
	return {
		")": "(",
		"]": "[",
		"}": "{",
		">": "<",
	}[ch]
}

function getInvalidSyntaxScore(ch) {
	return {
		")": 3,
		"]": 57,
		"}": 1197,
		">": 25137
	}[ch]
}

export async function solution(input) {
	return input
		// Determine the invalid syntax score of each line, if any.
		.map(line => {
			const stack = []
			for (const ch of line) {
				// Add each opening symbol to a stack.
				if (isOpeningSymbol(ch)) { stack.push(ch) }
				// If we encounter a closing symbol, it should match the last opening symbol on the stack.
				else {
					if (stack.pop() !== getCorrespondingOpeningSymbol(ch)) {
						return getInvalidSyntaxScore(ch)
					}
				}
			}
			return 0
		})
		// Add them up.
		.reduce((sum, score) => sum + score)
}
