import fileinput

def parseInput(lines: list[str]) -> list[list[int]]:
	return [[int(c) for c in stripped] for line in lines if (stripped := line.strip())]

def maxOrNone(digits: list[int]) -> int | None:
	return None if len(digits) == 0 else max(digits)

def findMaxJoltage(bank: list[int], n: int = 12) -> int:
	joltage = ""
	startIndex = 0
	for i in range(n):
		endIndex = len(bank) - n + i + 1
		chunk = bank[startIndex:endIndex]
		largest = max(chunk)
		startIndex += chunk.index(largest) + 1
		joltage += str(largest)
	return int(joltage)

joltageSum = sum([findMaxJoltage(bank) for bank in parseInput(fileinput.input())])
print(joltageSum)
