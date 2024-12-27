/*
Assumptions:
- There is at least 1 solution that works.
- The target area is in the 3rd quadrant. (xMin and xMax are positive, and yMin and yMax are negative.)

Explanation:
The X velocity can basically be ignored since we assume there is at least 1 X velocity for which there is a solution.
The Y velocity always changes by 1 point each step.
	So if the path goes up with velocities 3, 2, 1, 0, then it will always go back down -1, -2, -3, etc.
	So it will always pass back through line y = 0 at a Y velocity the opposite of its starting Y velocity.
The path with the highest Y point will always land on the bottom row of the target area on the very next step after it passes through y = 0.
	If the Y velocity was any higher, it would miss the target area entirely after passing back through y = 0.
	If the Y velocity was any lower, then there's a higher Y velocity that will make the path go higher and still land within the target area.
The formula for finding the highest Y point is yMin * (yMin + 1) / 2.
	This is the formula for finding the sum of the first N natural numbers.
	This works because we know that at the highest point of the path, the Y velocity is 0.
	We also know that at the end, the Y velocity is -yMin since it jumps from the line y = 0 to the bottom of the target area in one step.
	And since the Y velocity decrements by 1 each step, it forms a series 0, -1, -2, -3, ..., -(yMin - 1), -yMin.
	So the sum of the velocity values through -(yMin - 1) will determine the height that it reached at the top of the path.
	That formula is -(yMin - 1) * (-(yMin - 1) + 1) / 2.
	Which simplifies to:
		-(yMin + 1) * -((yMin - 1) + 1) / 2
		-(yMin + 1) * -(yMin) / 2
		yMin * (yMin + 1) / 2

*/
export async function solution(input) {
	// Parse the input.
	const [ xMin, xMax, yMin, yMax ] = input[0]
		.match(/target area: x=(-?\d+)\.\.(-?\d+), y=(-?\d+)\.\.(-?\d+)/)
		.slice(1)
		.map(Number)

	return yMin * (yMin + 1) / 2
}
