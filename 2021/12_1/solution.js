import { CaveMap } from "./caveMap.js"

export async function solution(input) {
	const caveMap = new CaveMap(input)

	for (let keepChecking = true; keepChecking; ) {
		keepChecking = false
		for (let path of caveMap.getNonTerminalPaths()) {
			const newCaves = caveMap.getAdjacentPossibleCaves(path)
			if (newCaves.length > 0) {
				keepChecking = true
				caveMap.duplicatePath(path, newCaves)
			}
		}
	}

	return caveMap.getTerminalPaths().length
}
