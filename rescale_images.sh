#!/usr/bin/env bash

SAVEIFS=$IFS
IFS=$(echo -en "\n\b")
for img in $(ls img); do
	convert "img/$img" -interpolate Nearest -filter point -resize 200% "img/@2x_$img"
done
IFS=$SAVEIFS

