import fileinput

def parseInput(lines: list[str]) -> list[list[int]]:
	return [[int(c) for c in stripped] for line in lines if (stripped := line.strip())]

def maxOrNone(digits: list[int]) -> int | None:
	return None if len(digits) == 0 else max(digits)

def findMaxJoltage(bank: list[int]) -> int:
	largest = maxOrNone(bank)
	largestIndex = bank.index(largest)
	before = maxOrNone(bank[0:largestIndex]) or ''
	after = maxOrNone(bank[largestIndex+1::]) or ''
	return max(int(f"{before}{largest}"), int(f"{largest}{after}"))

joltageSum = sum([findMaxJoltage(bank) for bank in parseInput(fileinput.input())])
print(joltageSum)
