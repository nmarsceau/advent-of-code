export class CaveMap {
	constructor(caves) {
		this.map = {}
		for (const caveSet of caves) {this.#connectCaves(...caveSet.split("-"))}
		this.paths = [ ["start"] ]
	}

	#connectCaves(a, b) {
		if (!this.map.hasOwnProperty(a)) {this.map[a] = []}
		if (!this.map.hasOwnProperty(b)) {this.map[b] = []}
		this.map[a].push(b)
		this.map[b].push(a)
	}

	getAdjacentPossibleCaves(path) {
		// Find any caves that connect to the last cave on this path.
		// They need to either be big caves, or small caves we haven't visited yet.
		return this
			.map[path.at(-1)]
			.filter(cave => this.getType(cave) === "big" || !path.includes(cave) || (!this.hasDuplicateSmallCave(path) && !['start', 'end'].includes(cave)))
	}

	duplicatePath(path, newCaves) {
		// Duplicate the path for each new cave, saving the last one. (See below.)
		for (const cave of newCaves.slice(0, newCaves.length - 1)) {
			this.paths.push([...path, cave])
		}

		// Add the last new cave to the existing path we already had.
		path.push(newCaves.at(-1))
	}

	hasDuplicateSmallCave(path) {
		const smallCaves = path.filter(cave => this.getType(cave) === "small")
		for (const [i, cave] of smallCaves.entries()) {
			// If the index of the current cave does not match the first index of that cave in the list, we have a duplicate.
			if (i !== smallCaves.indexOf(cave)) { return true }
		}
		return false
	}

	getType(cave) {
		return cave === cave.toUpperCase() ? "big" : "small"
	}

	getNonTerminalPaths() {
		return this.paths.filter(path => path.at(-1) !== "end")
	}

	getTerminalPaths() {
		return this.paths.filter(path => path.at(-1) === "end")
	}
}
