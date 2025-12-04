<?php

$position=50;
$timesAtZero=0;

$input = fopen("php://stdin", "r");

while ($line = trim(fgets($input))) {
	// Parse the rotation
	preg_match('/(?<direction>[RL])(?<distance>\d+)/', $line, $matches);
	$direction = $matches['direction'];
	$distance = (int) $matches['distance'];

	// Rotate one point at a time to avoid having to check for passing zero
	for ($i = 0; $i < $distance; $i++) {
		if ($direction === 'R') {
			$position++;
		} else {
			$position--;
		}

		// Increment timesAtZero
		if ($position % 100 === 0) {
			$timesAtZero++;
		}
	}
}

fclose($input);

echo $timesAtZero . "\n";
