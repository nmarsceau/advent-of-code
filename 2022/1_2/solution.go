package main

import (
	"bufio"
	"fmt"
	"os"
	"sort"
	"strconv"
)

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

func calculateCaloriesPerElf(input *[]string) *[]int {
	elfCalories := []int{0}
	i := 0
	for _, calories := range *input {
		if calories == "" {
			elfCalories = append(elfCalories, 0)
			i++
		} else {
			calories, _ := strconv.Atoi(calories)
			elfCalories[i] += calories
		}
	}
	return &elfCalories
}

func main() {
	elfCalories := calculateCaloriesPerElf(getInput())

	// Sort calories per elf in descending order
	sort.Slice(*elfCalories, func(i, j int) bool {
		return (*elfCalories)[i] > (*elfCalories)[j]
	})

	fmt.Println((*elfCalories)[0] + (*elfCalories)[1] + (*elfCalories)[2])
}
