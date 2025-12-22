package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

type move int64

const (
	rock move = iota
	paper
	scissors
)

type outcome int64

const (
	loss outcome = iota
	draw
	win
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

var decryptMove = map[string]move{
	"A": rock,
	"X": rock,
	"B": paper,
	"Y": paper,
	"C": scissors,
	"Z": scissors,
}

var moveScore = map[move]int{
	rock:     1,
	paper:    2,
	scissors: 3,
}

var outcomeScore = map[outcome]int{
	draw: 3,
	win:  6,
	loss: 0,
}

func determineOutcome(opponentMove, myMove move) outcome {
	if opponentMove == myMove {
		return draw
	} else if (opponentMove == rock && myMove == paper) || (opponentMove == paper && myMove == scissors) || (opponentMove == scissors && myMove == rock) {
		return win
	} else {
		return loss
	}
}

func calculateScoreForRound(round string) int {
	encryptedMoves := strings.Split(round, " ")
	opponentMove, _ := decryptMove[encryptedMoves[0]]
	myMove, _ := decryptMove[encryptedMoves[1]]
	myScore, _ := moveScore[myMove]
	roundOutcome := determineOutcome(opponentMove, myMove)
	roundScore, _ := outcomeScore[roundOutcome]
	myScore += roundScore
	return myScore
}

func main() {
	totalScore := 0
	for _, round := range *(getInput()) {
		totalScore += calculateScoreForRound(round)
	}
	fmt.Println(totalScore)
}
