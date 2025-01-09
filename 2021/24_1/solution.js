/* Explanation:

Everything about the ALU in the puzzle instructions is a bit of a red herring.
Attempting to brute-force the puzzle by executing the MONAD program according to the ALU instructions would take far too long.
Instead, the MONAD program can be reverse-engineered to find a simpler way to locate the min and max model numbers.

To begin, we notice that the puzzle input can be divided into 14 sections of 18 lines.
(Each chunk begins with an "inp" instruction.)
Since the model numbers are also 14 digits long, we can assume that each chunk is associated with one digit of the model number.

Taking a diff of each chunk of the input shows that the only differences between each chunk are the numbers in steps 5, 6, and 16.
For reference, we assign these numbers to a, b, and c respectively.
The first thing to notice is that a is always either 1 or 26, and there are exactly 7 of each.
Second, b is >= 10 when a is 1 and <= 0 when a is 26.

A chunk of the program can be simplified into this pseudo code:

	// z carries over from one chunk to the next.
	w = the next digit of the input
	x = (z % 26) + b != w ? 1 : 0
	z = Math.floor(z / a) * (25 * x + 1) + ((w + c) * x)

The chunks of the program can be divided into 2 types depending on their value of a.
When a is 26, the pseudo code for a single chunk remains relatively unchanged.
But when a is 1, the program can be simplified further to this pseudo code:

	// z carries over from one chunk to the next.
	w = the next digit of the input
	z = z * 26 + w + c

Remember from earlier that when a is 1, b is >= 10, so it stands to reason that (z % 26) + b will always be greater than w, which is a single digit between 1 and 9.
So when a is 1, x is always 1 too.
So, knowing that, the next line becomes z = Math.floor(z / 1) * (25 * 1 + 1) + ((w + c) * 1), which then simplifies to z = z * 26 + w + c.

Looking at the simplified pseudo code, we can see that when a is 1, we always increase z by multiplying it by 26 and adding w + c.
When a is 26, we may either increase or decrease z depending on the value of x.
Remember, for a model number to be valid, z must equal 0 after processing all digits.
So it stands to reason that z needs to be decreased at least as many times as it increases.
If a chunk where a = 26 ever increases z, we can assume that z will never be able to reach 0 again, so it is not a valid model number.
So when a = 26, we need x to evaluate to 0 for the model number to be valid.

So, considering that when a is 1, we increase z, and when a is 26, we decrease z, it is helpful to think about z as if it were a stack.
7 chunks of input add values to the "stack", and the other 7 pop values off the "stack".
From here on, we'll refer to these chunks of the program as "pushers" and "poppers" respectively.
Since there are exactly 7 of each type of chunk, we can group pairs of them together.
Each popper can be paired with the pusher that it pops off the stack.

With all of this in mind, it's helpful to further simplify the pseudo code and take another look at it.
In addition to applying our assumptions, the multplication and division that actually manipulate the "stack" have been removed.
This leaves us with the core logic that applies to each pair of chunks in the stack.

Pushers:
	
	// z carries over from one chunk to the next.
	w = the next digit of the input
	z = w + c

Poppers:

	// z carries over from one chunk to the next.
	w = the next digit of the input
	z = w - b

So for each pair of chunks, for z to equal zero, w + c from the pusher must equal w - b from the popper.
This can be rewritten as:

	pusherW + pusherC + popperB = popperW.

Since pusherC and popperB are integers, they can be simplified to a single value, the "difference" value seen in the solution below.
From here, we can derive the range of possible values for both pusherW and popperW.
Remember, each pusher and popper is associated with a single digit in the model number.
Also remember, the possible values for each digit in a model number are 1-9. Zeroes are not allowed.

Since we're looking for the largest possible model number, we're looking for the maximum value that each digit can hold and meet all the requirements above.
So one of them will be 9, and the other one will be 9 - Math.abs(difference).

If difference is > 0, we know that pusherW must be less than popperW.
So popperW will be 9 and pusherW will be 9 - Math.abs(difference).

If difference is <= 0, we know that pusherW must be greater than or equal to popperW.
So pusherW will be 9 and popperW will be 9 - Math.abs(difference).

Repeating this for each pair of chunks gives us all the digits in the largest valid model number.

*/

function splitInputByChunkLength(input, n) {
	const chunks = []
	for (let i = 0; i * n < input.length; i++) {
		chunks.push(input.slice(i * n, (i + 1) * n))
	}
	return chunks
}

function getNumberFromInstruction(program, step) {
	const numberRegex = /-?\d+/
	return Number(program[step - 1].match(numberRegex)?.[0])
}

export async function solution(input) {
	const chunks = splitInputByChunkLength(input, 18), stack = [], digits = []
	for (const [i, chunk] of chunks.entries()) {
		if (getNumberFromInstruction(chunk, 5) === 1) {
			stack.push([ i, chunk ])
		} else {
			const [ j, old ] = stack.pop()
			const difference = getNumberFromInstruction(old, 16) + getNumberFromInstruction(chunk, 6)
			const max = 9, min = 9 - Math.abs(difference); // It pains me, but this semicolon is necessary due to the [ ] operator on the next line.
			[ digits[j], digits[i] ] = (difference > 0 ? [ min, max ] : [ max, min ])
		}
	}
	return Number(digits.join(""))
}
