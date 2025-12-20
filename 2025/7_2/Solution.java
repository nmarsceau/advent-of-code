package com.nmarsceau.advent_of_code_2025_day_7_part_2;

import java.util.Arrays;
import java.util.Scanner;
import java.util.Map;

class Solution {
	private static long[][] getInput() {
		String input = new Scanner(System.in).useDelimiter("\\A").next();

		// Remove lines with no splitters that will have no effect on the timeline count.
		input = input.replaceAll("(?m)^\\.+\r?\n", "");

		// Map the characters in the input to integers (longs) to make processing easier below.
		Map<String, String> mapping = Map.of("S", "1", "^", "-1", ".", "0");
		return Arrays.stream(input.split("\r?\n"))
			.map(line -> line.split(""))
			.map(line -> {
				return Arrays.stream(line)
					.map(ch -> mapping.getOrDefault(ch, "0"))
					.mapToLong(Long::parseLong)
					.toArray();
			})
			.toArray(long[][]::new);
	}

	public static void main(String[] args) {
		long[][] input = getInput();

		for (int i = 0; i < input.length - 1; i++) {
			for (int j = 0; j < input[i].length; j++) {
				// Skip the current character if it's blank space or a splitter (0 or -1).
				if (input[i][j] <= 0) continue;

				if (input[i + 1][j] == -1) {
					// Next character is a splitter
					input[i + 1][j - 1] = input[i + 1][j - 1] + input[i][j];
					input[i + 1][j + 1] = input[i + 1][j + 1] + input[i][j];
				} else {
					// Next character is blank space
					input[i + 1][j] = input[i + 1][j] + input[i][j];
				}
			}
		}

		System.out.println(
			Arrays.stream(input[input.length - 1])
				.filter(n -> n > 0)
				.sum()
		);
	}
}
