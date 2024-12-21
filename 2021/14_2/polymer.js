export class Polymer {
	constructor(template, rules) {
		this.#parsePairs(template)
		this.#parseRules(rules)
	}

	#parseRules(rules) {
		this.rules = rules.reduce((rules, rawRule) => {
			const [ pair, insert ] = rawRule.split(" -> ")
			rules[pair] = insert
			return rules
		}, {})
	}

	#parsePairs(template) {
		this.pairs = {}
		for (let i = 0; i < template.length; i++) {
			// Each set of 2 elements in the template is a pair.
			const pair = template.substring(i, i + 2)
			this.pairs[pair] ??= 0
			this.pairs[pair]++
		}
		// We intentionally don't do anything to handle the last character the template differently.
		// This is an easy way to make sure the very last element in the polymer can be counted correctly later.
	}

	runSteps(n) {
		for (let i = 0; i < n; i++) {
			this.#runStep()
		}
	}

	#runStep() {
		this.pairs = Object.entries(this.pairs).reduce((pairs, entry) => {
			const [ pair, count ] = entry // Convert Object.entries back to well-named variables.
			const newPairs = []

			// Either transform the pair to 2 new ones, or carry it forward.
			if (pair in this.rules) {
				const newElement = this.rules[pair]
				newPairs.push(`${pair[0]}${newElement}`)
				newPairs.push(`${newElement}${pair[1]}`)
			} else {
				newPairs.push(pair)
			}

			// Add any new pairs. They will have the same count as the existing pair.
			for (const newPair of newPairs) {
				pairs[newPair] ??= 0
				pairs[newPair] += count
			}

			return pairs
		}, {})
	}

	// The strength is determined by subtracting the elements that occur most and least frequently in the polymer.
	strength() {
		const counts = Object.values(this.countElements())
		return Math.max(...counts) - Math.min(...counts)
	}

	countElements() {
		// Since the polymer is represented as pairs, we don't want to double-count elements.
		// So we only add the count to the first element in each pair.
		// (The very last element in the polymer will be counted correctly because of how we initially set up the pairs.)
		return Object.keys(this.pairs).reduce((counts, pair) => {
			const element = pair[0]
			counts[element] ??= 0
			counts[element] += this.pairs[pair]
			return counts
		}, {})
	}
}
