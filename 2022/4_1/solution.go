package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

type assignment struct {
	start, end int
}

func (a *assignment) contains(b *assignment) bool {
	return a.start <= b.start && a.end >= b.end
}

func newAssignment(input string) assignment {
	parts := strings.Split(input, "-")
	return assignment{
		start: parseInt(parts[0]),
		end:   parseInt(parts[1]),
	}
}

type pair struct {
	a, b assignment
}

func newPair(input string) pair {
	parts := strings.Split(input, ",")
	return pair{
		a: newAssignment(parts[0]),
		b: newAssignment(parts[1]),
	}
}

func parseInt(input string) int {
	converted, err := strconv.Atoi(input)
	if err != nil {
		panic("Unexpected error occurred converting to integer.")
	}
	return converted
}

func getInput() *[]string {
	scanner := bufio.NewScanner(os.Stdin)
	input := []string{}
	for scanner.Scan() {
		input = append(input, scanner.Text())
	}
	if err := scanner.Err(); err != nil {
		panic("Unexpected error occurred reading from stdin.")
	}
	return &input
}

func parsePairs(input *[]string) *[]pair {
	pairs := []pair{}
	for _, line := range *input {
		if line != "" {
			pairs = append(pairs, newPair(line))
		}
	}
	return &pairs
}

func main() {
	pairs := parsePairs(getInput())

	pairsFullyContained := 0
	for _, pair := range *pairs {
		if pair.a.contains(&pair.b) || pair.b.contains(&pair.a) {
			pairsFullyContained++
		}
	}
	fmt.Println(pairsFullyContained)
}
