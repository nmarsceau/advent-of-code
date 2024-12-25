export function hex2bin(hex) {
	// Parsing character-by-character to avoid integer overflows with larger numbers.
	return hex
		.split("")
		.map(ch => parseInt(ch, 16).toString(2).padStart(4, "0"))
		.join("")
}
