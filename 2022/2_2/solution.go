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

var decryptOutcome = map[string]outcome{
	"X": loss,
	"Y": draw,
	"Z": win,
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

func determineMyMove(opponentMove move, desiredOutcome outcome) move {
	if desiredOutcome == draw {
		return opponentMove
	} else if (opponentMove == rock && desiredOutcome == win) || (opponentMove == scissors && desiredOutcome == loss) {
		return paper
	} else if (opponentMove == paper && desiredOutcome == win) || (opponentMove == rock && desiredOutcome == loss) {
		return scissors
	} else {
		return rock
	}
}

func calculateScoreForRound(round string) int {
	encryptedRound := strings.Split(round, " ")
	opponentMove, _ := decryptMove[encryptedRound[0]]
	desiredOutcome, _ := decryptOutcome[encryptedRound[1]]
	myScore, _ := outcomeScore[desiredOutcome]
	myMove := determineMyMove(opponentMove, desiredOutcome)
	roundScore, _ := moveScore[myMove]
	return myScore + roundScore
}

func main() {
	totalScore := 0
	for _, round := range *(getInput()) {
		totalScore += calculateScoreForRound(round)
	}
	fmt.Println(totalScore)
}
