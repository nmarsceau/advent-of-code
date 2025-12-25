package main

import (
	"bufio"
	"fmt"
	"os"
	"slices"
)

type rucksack struct {
	compartment1, compartment2 map[string]int
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

func keys[M ~map[K]V, K comparable, V any](m M) []K {
	r := make([]K, len(m))
	for k := range m {
		r = append(r, k)
	}
	return r
}

func intersect[T comparable](_slices ...[]T) []T {
	intersection := []T{}
	oldIntersection := _slices[0]
	for _, slice := range _slices[1:] {
		for _, value := range slice {
			if slices.Contains(oldIntersection, value) {
				intersection = append(intersection, value)
			}
		}
		oldIntersection = intersection
		intersection = []T{}
	}
	return oldIntersection
}

func parseRucksack(rucksackContents string) *rucksack {
	if len(rucksackContents)%2 != 0 {
		panic("Invalid rucksack contents!")
	}
	compartmentSize := int(len(rucksackContents) / 2)
	rucksack := rucksack{
		*parseCompartment(rucksackContents[0:compartmentSize]),
		*parseCompartment(rucksackContents[compartmentSize:]),
	}
	return &rucksack
}

func parseCompartment(rawContents string) *map[string]int {
	contents := make(map[string]int)
	for _, char := range rawContents {
		contents[string(char)]++
	}
	return &contents
}

func calculatePriority(ch rune) int {
	subtrahend := 38
	if ch >= 97 && ch <= 122 {
		subtrahend = 96
	}
	return int(ch) - subtrahend
}

func main() {
	input := getInput()
	totalPriority := 0
	for _, rucksackContents := range *input {
		rucksack := parseRucksack(rucksackContents)
		compartmentIntersection := intersect(keys(rucksack.compartment1), keys(rucksack.compartment2))
		for _, str := range compartmentIntersection {
			for _, ch := range str {
				totalPriority += calculatePriority(ch)
			}
		}
	}
	fmt.Println(totalPriority)
}
