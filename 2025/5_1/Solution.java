package com.nmarsceau.advent_of_code_2025_day_5_part_1;

import java.util.Arrays;
import java.util.Scanner;
import com.nmarsceau.advent_of_code_2025_day_5_part_1.IngredientRange;

class Solution {
	private static String getInput() {
		return new Scanner(System.in).useDelimiter("\\A").next();
	}

	private static String[] parseSections(String input) {
		return input.split("\r?\n{2}");
	}

	private static IngredientRange[] parseFreshIngredientRanges(String input) {
		String[] ranges = input.split("\r?\n");
		IngredientRange[] freshIngredientRanges = new IngredientRange[ranges.length];
		for (int i = 0; i < ranges.length; i++) {
			freshIngredientRanges[i] = new IngredientRange(ranges[i]);
		}
		return freshIngredientRanges;
	}

	private static Ingredient[] parseAvailableIngredients(String input) {
		String[] available = input.split("\r?\n");
		Ingredient[] availableIngredients = new Ingredient[available.length];
		for (int i = 0; i < available.length; i++) {
			availableIngredients[i] = new Ingredient(available[i]);
		}
		return availableIngredients;
	}

	public static void main(String[] args) {
		String[] inputSections = parseSections(getInput());
		IngredientRange[] freshIngredientRanges = parseFreshIngredientRanges(inputSections[0]);
		Ingredient[] availableIngredients = parseAvailableIngredients(inputSections[1]);

		int freshIngredientCount = 0;
		for (Ingredient availableIngredient : availableIngredients) {
			for (IngredientRange freshIngredientRange : freshIngredientRanges) {
				if (freshIngredientRange.contains(availableIngredient)) {
					freshIngredientCount++;
					break;
				}
			}
		}

		System.out.println(freshIngredientCount);
	}
}
