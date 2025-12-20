package com.nmarsceau.advent_of_code_2025_day_7_part_1;

import java.util.Arrays;
import java.util.Scanner;

class Solution {
	private static char[][] getInput() {
		String input = new Scanner(System.in).useDelimiter("\\A").next();
		input = input
			// Replace the starting point marker with a "beam"
			.replace('S', '|')
			// Remove lines with no splitters that will have no effect on the split count.
			.replaceAll("(?m)^\\.+\r?\n", "");
		return Arrays
			.stream(input.split("\r?\n"))
			.map(line -> line.toCharArray())
			.toArray(char[][]::new);
	}

	public static void main(String[] args) {
		char[][] input = getInput();
		int splitCount = 0;

		for (int i = 0; i < input.length - 1; i++) {
			for (int j = 0; j < input[i].length; j++) {
				if (input[i][j] != '|') continue;

				if (input[i + 1][j] == '^') {
					input[i + 1][j - 1] = '|';
					input[i + 1][j + 1] = '|';

					splitCount++;
				} else {
					input[i + 1][j] = '|';
				}
			}
		}

		System.out.println(splitCount);
	}
}
