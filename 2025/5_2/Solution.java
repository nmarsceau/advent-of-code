package com.nmarsceau.advent_of_code_2025_day_5_part_2;

import java.util.Scanner;

class Solution {
	private static String getInput() {
		return new Scanner(System.in).useDelimiter("\\A").next();
	}

	private static String[] parseRawIngredientRanges(String input) {
		return input.split("\r?\n{2}")[0].split("\r?\n");
	}

	public static void main(String[] args) {
		// Parse the raw input.
		String[] rawIngredientRanges = parseRawIngredientRanges(getInput());

		// Parse the raw ingredient ranges, combining any that overlap.
		IngredientRangeList	combinedIngredientRanges = new IngredientRangeList();
		for (String range : rawIngredientRanges) {
			combinedIngredientRanges.combine(new IngredientRange(range));
		}

		System.out.println(combinedIngredientRanges.getSize());
	}
}
