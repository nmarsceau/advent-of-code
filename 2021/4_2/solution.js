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
	let bingoBoards = splitLinesOnEmptyString(input.slice(2)).map(rawBoard => new BingoBoard(rawBoard))

	for (const n of numberSequence) {
		let lastSolvedBoard

		for (const bb of bingoBoards) {
			bb.markNumber(n)
			if (bb.isSolved()) {
				lastSolvedBoard = bb
			}
		}
		bingoBoards = bingoBoards.filter(bb => !bb.isSolved())

		if (bingoBoards.length === 0) {
			return lastSolvedBoard.score() * n
		}
	}

	throw new Error("Finished number sequence before finding the last winning board!")
}
