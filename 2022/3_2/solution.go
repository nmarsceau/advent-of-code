package main

import (
	"bufio"
	"fmt"
	"os"
	"slices"
	"strings"
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

func unique[T comparable](slice []T) []T {
	unique := []T{}
	for _, value := range slice {
		if !slices.Contains(unique, value) {
			unique = append(unique, value)
		}
	}
	return unique
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
	if len(*input)%3 != 0 {
		panic("Invalid rucksack contents!")
	}

	totalPriority := 0
	for i := 0; i < len(*input); i += 3 {
		intersection := unique(intersect(
			strings.Split((*input)[i], ""),
			strings.Split((*input)[i+1], ""),
			strings.Split((*input)[i+2], ""),
		))
		for _, str := range intersection {
			for _, ch := range str {
				totalPriority += calculatePriority(ch)
			}
		}
	}
	fmt.Println(totalPriority)
}
