import { BingoBoard } from "./bingoBoard.js"

function splitLinesOnEmptyString(input) {
	return input
		.reduce((prev, cur) => {
			if (cur === "") {
				prev.push([])
			} else {
				prev[prev.length - 1].push(cur)
			}
			return prev
		}, [[]])
		.filter(item => item.length > 0)
}

export async function solution(input) {
	const numberSequence = input[0].split(",").map(n => Number(n))
	const bingoBoards = splitLinesOnEmptyString(input.slice(2)).map(rawBoard => new BingoBoard(rawBoard))

	for (const n of numberSequence) {
		for (const bb of bingoBoards) {
			bb.markNumber(n)
			if (bb.isSolved()) {
				return bb.score() * n
			}
		}
	}

	throw new Error("Finished number sequence before finding a winning board!")
}
