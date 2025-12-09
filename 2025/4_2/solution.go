package main

import (
	"bufio"
	"fmt"
	"iter"
	"os"
)

type grid [][]rune

type point struct {
	x, y int
}

func parseGrid(inputScanner *bufio.Scanner) *grid {
	inputGrid := grid{}
	for inputScanner.Scan() {
		line := inputScanner.Text()
		if line != "" {
			inputGrid = append(
				inputGrid,
				[]rune(line),
			)
		}
	}
	if err := inputScanner.Err(); err != nil {
		panic("Unexpected error occurred reading from stdin.")
	}
	return &inputGrid
}

func (g *grid) at(x, y int) rune {
	return (*g)[y][x]
}

func (g *grid) iterateAllPoints() iter.Seq[point] {
	return func(yield func(point) bool) {
		for y := 0; y < len(*g); y++ {
			for x := 0; x < len((*g)[y]); x++ {
				yield(point{x, y})
			}
		}
		return
	}
}

func (g *grid) iterateAdjacentPoints(p point) iter.Seq[point] {
	directions := []point{
		point{-1, -1},
		point{-1, 0},
		point{-1, 1},
		point{0, -1},
		point{0, 1},
		point{1, -1},
		point{1, 0},
		point{1, 1},
	}
	return func(yield func(point) bool) {
		for _, d := range directions {
			newX, newY := p.x+d.x, p.y+d.y
			if newX >= 0 && newX < len((*g)[p.y]) && newY >= 0 && newY < len(*g) {
				yield(point{newX, newY})
			}
		}
		return
	}
}

func (g *grid) iterateBales() iter.Seq[point] {
	return func(yield func(point) bool) {
		for p := range g.iterateAllPoints() {
			if g.at(p.x, p.y) == '@' {
				yield(p)
			}
		}
		return
	}
}

func (g *grid) countAdjacentBales(p point) int {
	bales := 0
	for ap := range g.iterateAdjacentPoints(p) {
		if g.at(ap.x, ap.y) == '@' {
			bales++
		}
	}
	return bales
}

func (g *grid) getMoveableBales() *[]point {
	moveableBales := []point{}
	for p := range g.iterateBales() {
		if g.countAdjacentBales(p) < 4 {
			moveableBales = append(moveableBales, p)
		}
	}
	return &moveableBales
}

func (g *grid) removeBales(points *[]point) {
	for _, p := range *points {
		(*g)[p.y][p.x] = '.'
	}
}

func (g *grid) countAllMoveableBales() int {
	totalMoveableBales := 0
	for mb := g.getMoveableBales(); len(*mb) > 0; mb = g.getMoveableBales() {
		totalMoveableBales += len(*mb)
		g.removeBales(mb)
	}
	return totalMoveableBales
}

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	grid := parseGrid(scanner)
	fmt.Println(grid.countAllMoveableBales())
}
