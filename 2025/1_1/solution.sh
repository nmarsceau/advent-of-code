#!/bin/bash

position=50
timesAtZero=0

while read line; do
	# Move the position
	number=${line//R/}
	number=${number//L/-}
	position=$((position+number))

	# Rotate
	while [ $position -gt 99 ] ; do ((position-=100)) done
	while [ $position -lt 0 ] ; do ((position+=100)) done

	# Increment timesAtZero
	if [ $position == 0 ] ; then ((timesAtZero++)) fi
done

echo $timesAtZero
