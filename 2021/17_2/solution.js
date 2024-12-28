export async function solution(input) {
	// Parse the input.
	const [ xMin, xMax, yMin, yMax ] = input[0]
		.match(/target area: x=(-?\d+)\.\.(-?\d+), y=(-?\d+)\.\.(-?\d+)/)
		.slice(1)
		.map(Number)

	// Initialize a variable to count the results.
	let distinctInitialVelocities = 0

	// The minimum X velocity is 0 since the path cannot go backward, so the X velocity cannot be negative.
	// The maximum X velocity is xMax, because if it was any higher, it would overshoot the target area in a single step.
	for (let vX = 0; vX <= xMax; vX++) {
		// The mininum Y velocity is yMin because if we went any lower, we'd overshoot the target area in a single step. (yMin is a negative value.)
		// The maximum Y velocity is -yMin - 1, because that's the velocity that gives us the highest Y point on a path (see part 1), and going any higher would mean we would also overshoot the target area.
		for (let vY = yMin; vY <= -yMin - 1; vY++) {
			// Initialize position and velocity.
			const pos = {x: 0, y: 0}
			const vel = {x: vX, y: vY}

			// Simulate the trajectory.
			for (let withinTarget = false, overshotTarget = false; !withinTarget && !overshotTarget; ) {
				// Update positions.
				pos.x += vel.x
				pos.y += vel.y

				// Update velocities.
				if (vel.x > 0) { vel.x-- }
				vel.y--

				// Determine whether this trajectory is finished.
				overshotTarget = pos.x > xMax || pos.y < yMin
				withinTarget = xMin <= pos.x && xMax >= pos.x && yMin <= pos.y && yMax >= pos.y

				// Increment the counter if we found a trajectory that lands in the target area.
				if (withinTarget) {
					distinctInitialVelocities++
				}
			}
		}
	}

	return distinctInitialVelocities
}
