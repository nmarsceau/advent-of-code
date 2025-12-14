package com.nmarsceau.advent_of_code_2025_day_5_part_2;

import java.util.ArrayList;
import java.util.stream.Collectors;

class IngredientRangeList {
	private ArrayList<IngredientRange> ranges;

	IngredientRangeList() {
		this.ranges = new ArrayList<IngredientRange>();
	}

	IngredientRangeList(IngredientRange newRange) {
		this.ranges = new ArrayList<IngredientRange>();
		this.ranges.add(newRange);
	}

	IngredientRangeList(ArrayList<IngredientRange> ranges) {
		this.ranges = ranges;
	}

	public ArrayList<IngredientRange> getValue() {
		return this.ranges;
	}

	public long getSize() {
		return this.ranges.stream().mapToLong(range -> range.getSize()).sum();
	}

	public void combine(IngredientRange newRange) {
		// Get the list of all ranges that overlap with the new one, including the new one.
		ArrayList<IngredientRange> overlapping = this.ranges.stream()
			.filter(range -> range.overlaps(newRange))
			.collect(Collectors.toCollection(ArrayList::new));
		overlapping.add(newRange);

		// Reset ranges to only contain the non-overlapping ones.
		this.ranges = this.ranges.stream()
			.filter(range -> !range.overlaps(newRange))
			.collect(Collectors.toCollection(ArrayList::new));

		// Add a new range that spans the full size of any overlapping ones.
		this.ranges.add(new IngredientRange(
			overlapping.stream().mapToLong(range -> range.getStart()).min().getAsLong(),
			overlapping.stream().mapToLong(range -> range.getEnd()).max().getAsLong()
		));
	}
}
