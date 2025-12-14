package com.nmarsceau.advent_of_code_2025_day_5_part_1;

class Ingredient {
	private long value;

	Ingredient(long value) {
		this.value = value;
	}

	Ingredient(String value) {
		this(Long.parseLong(value));
	}

	public long getValue() {
		return this.value;
	}
}
