function isOpeningSymbol(ch) {
	return ["(", "[", "{", "<"].includes(ch)
}

function getCorrespondingSymbol(ch) {
	return {
		")": "(",
		"(": ")",
		"]": "[",
		"[": "]",
		"}": "{",
		"{": "}",
		">": "<",
		"<": ">",
	}[ch]
}

function getCompletionString(line) {
	const stack = []

	// Work through all the valid symbols in the line.
	for (const ch of line) {
		// Add each opening symbol to a stack.
		if (isOpeningSymbol(ch)) { stack.push(ch) }
		// If we encounter a closing symbol, it should match the last opening symbol on the stack.
		else if (stack.pop() !== getCorrespondingSymbol(ch)) {
			// If the symbol doesn't match the last one on the stack, that means the line is invalid.
			return null
		}
	}

	// It's a valid line! Determine the string it would take to complete the line.
	return stack
		.reverse()
		.map(ch => getCorrespondingSymbol(ch))
		.join("")
}

function calculateCompletionScore(completionString) {
	const symbolScores = {
		")": 1,
		"]": 2,
		"}": 3,
		">": 4,
	}

	return completionString.split("")
		.map(ch => symbolScores[ch])
		.reduce((score, chScore) => score * 5 + chScore, 0)
}

export async function solution(input) {
	const scores = input
		.map(getCompletionString)
		.filter(str => str !== null) // Remove corrupted lines (null).
		.map(calculateCompletionScore)
		.sort((a, b) => a - b) // This sorts in numerical order instead of alphabetical order.
	
	return scores[Math.floor(scores.length / 2)]
}
