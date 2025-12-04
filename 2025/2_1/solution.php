<?php

$input = file_get_contents("php://stdin");
$ranges = preg_split('/[,\s]+/', trim($input));
$invalidIDSum = 0;

foreach ($ranges as $range) {
	// Parse the range
	preg_match('/^(\d+)-(\d+)$/', $range, $matches);
	$start = (int) $matches[1];
	$end = (int) $matches[2];

	// Check for invalid IDs in the range
	for ($i = $start; $i <= $end; $i++) {
		if (preg_match('/^(\d+)\1$/', (string) $i)) {
			$invalidIDSum += $i;
		}
	}
}

echo $invalidIDSum . "\n";
