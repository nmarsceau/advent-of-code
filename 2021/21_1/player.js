export class Player {
	constructor(startingPlace) {
		this.place = startingPlace
		this.score = 0
	}

	roll(rollAmount) {
		this.place = (this.place + rollAmount - 1) % 10 + 1
		this.score += this.place
	}
}
