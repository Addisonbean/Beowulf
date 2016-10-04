gameData.player = createHero();

var allMaps = {
	start: new Map(gameData, createPebble),
	cave: new Map(gameData, createPebble),
	forest: new Map(gameData, createGrass)
};

var doors = {
	startToCave: createDoor(getCaveMap, "startKey"),
	caveToStart: createDoor(getStartMap)
};

doors.startToCave.exit = doors.caveToStart;
doors.startToCave.position = { x: 12, y: 5 };
doors.caveToStart.exit = doors.startToCave;
doors.caveToStart.position = { x: 9, y: 8 };

allMaps.start.surrounding_maps["w"] = getCaveMap;
allMaps.start.surrounding_maps["n"] = getForestMap;

allMaps.cave.surrounding_maps["e"] = getStartMap;

allMaps.forest.surrounding_maps["s"] = getStartMap;


// TODO: make a general "initMap" function w/ a callback for adding crap

function getStartMap() {
	var m = allMaps.start;
	if (!m.initialized) {
		allMaps.start.init();
		allMaps.start.addItemAtPoint(createCoin(), { x: 10, y: 4 });
		allMaps.start.addItemAtPoint(doors.startToCave, doors.startToCave.position, true);
		allMaps.start.addItemAtPoint(createStoneBlock(), { x: 4, y: 4 });
		allMaps.start.addItemAtPoint(createKnight(), { x: 5, y: 10 });
		allMaps.start.addItemAtPoint(createKnight(), { x: 3, y: 10 });
		allMaps.start.addItemAtPoint(createKnight(), { x: 7, y: 12 });
		allMaps.start.addItemAtPoint(createKnight(), { x: 8, y: 6 });
		allMaps.start.addItemAtPoint(createKey("startKey"), { x: 8, y: 4 });
		allMaps.start.addItemAtPoint(createBeowulf(), { x: 5, y: 1});

		//example usage:
		// allMaps.start.coverRegionWithTile(1, 1, 2, 3, createGrass);
		//allMaps.start.coverRegionWithTile(1, 1, 2, 3, createKnight, false);
	}
	return m;
}

gameData.map = getStartMap();

function getCaveMap() {
	var m = allMaps.cave;
	if (!m.initialized) {
		allMaps.cave.init();
		allMaps.cave.addItemAtPoint(createCoin(), { x: 11, y: 4 });
		allMaps.cave.addItemAtPoint(createCoin(), { x: 12, y: 5 });
		allMaps.cave.addItemAtPoint(createHealthPotion(), { x: 14, y: 5 });
		allMaps.cave.addItemAtPoint(createXpPotion(), { x: 15, y: 5 });
		allMaps.cave.addItemAtPoint(doors.caveToStart, doors.caveToStart.position, true);
		allMaps.cave.addItemAtPoint(createWeapon("woodenStaff", 3, itemImages.staff),{ x: 3, y: 2 });
		allMaps.cave.addItemAtPoint(createKnight(), { x: 5, y: 10 });
	}
	return m;
}

function getForestMap() {
	var m = allMaps.forest;
	if (!m.initialized) {
		allMaps.forest.init();
		allMaps.forest.coverRegionWithTile(0, 0, 17, 1, createShrubbery, false);
		allMaps.forest.coverRegionWithTile(0, 1, 1, 15, createShrubbery, false);
		allMaps.forest.coverRegionWithTile(16, 1, 1, 15, createShrubbery, false);

		allMaps.forest.addItemAtPoint(createWolf(), { x: 5, y: 10 });
		allMaps.forest.addItemAtPoint(createWolf(), { x: 10, y: 10 });
		allMaps.forest.addItemAtPoint(createWolf(), { x: 3, y: 8 });
	}
	return m;
}

