package com.nmarsceau.advent_of_code_2025_day_5_part_2;

class IngredientRange {
	private long start;
	private long end;

	IngredientRange(long start, long end) {
		this.start = start;
		this.end = end;
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

	public long getStart() {
		return this.start;
	}

	public long getEnd() {
		return this.end;
	}

	public long getSize() {
		return this.end - this.start + 1;
	}

	public boolean overlaps(IngredientRange that) {
		return this.end >= that.start && this.start <= that.end;
	}
}
