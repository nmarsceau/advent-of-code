package com.nmarsceau.advent_of_code_2025_day_5_part_1;

class IngredientRange {
	private Ingredient start;
	private Ingredient end;

	IngredientRange(Ingredient start, Ingredient end) {
		this.start = start;
		this.end = end;
	}

	IngredientRange(long start, long end) {
		this(new Ingredient(start), new Ingredient(end));
	}

	IngredientRange(String start, String end) {
		this(Long.parseLong(start), Long.parseLong(end));
	}

	IngredientRange(String[] range) {
		this(range[0], range[1]);
	}

	IngredientRange(String range) {
		this(range.split("-"));
	}

	public Ingredient getStart() {
		return this.start;
	}

	public Ingredient getEnd() {
		return this.end;
	}

	public boolean contains(Ingredient ingredient) {
		return this.start.getValue() <= ingredient.getValue() && this.end.getValue() >= ingredient.getValue();
	}
}
