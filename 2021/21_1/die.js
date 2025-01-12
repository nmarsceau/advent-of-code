export class DeterministicDie {
	constructor() {
		this.currentNumber = 1
		this.rolls = 0
	}

	roll() {
		this.rolls++
		try {
			return this.currentNumber
		} finally {
			this.currentNumber++
			if (this.currentNumber > 100) {this.currentNumber = 1}
		}
	}
}
