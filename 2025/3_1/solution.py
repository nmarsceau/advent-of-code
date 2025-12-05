import fileinput

def parseInput(lines: list[str]) -> list[str]:
	return [stripped for line in lines if (stripped := line.strip())]

def findLargestDigit(s: str) -> int | None:
	digits = [int(ch) for ch in s]
	return None if len(digits) == 0 else max(digits)

joltageSum = 0

for bank in parseInput(fileinput.input()):
	largest = findLargestDigit(bank)
	largestIndex = bank.find(str(largest))
	before = findLargestDigit(bank[0:largestIndex]) or ''
	after = findLargestDigit(bank[largestIndex+1::]) or ''

	joltageSum += max(int(f"{before}{largest}"), int(f"{largest}{after}"))

print(joltageSum)
