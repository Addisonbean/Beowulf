gameData.player = createHero();

var allMaps = {
	start: new Map(gameData, createPebble),
	entrance: new Map(gameData, createPebble),
	cave: new Map(gameData, createPebble),
	forest: new Map(gameData, createGrass),
	grass: new Map(gameData, createGrass),
	grass1: new Map(gameData, createGrass),
	grass2: new Map(gameData, createGrass),
	grass3: new Map(gameData, createGrass),
	desert: new Map(gameData, createSand),
	desert1: new Map(gameData, createSand),
	desert2: new Map(gameData, createSand)
};

var doors = {
	startToCave: createDoor(getCaveMap, "startKey"),
	caveToStart: createDoor(getStartMap),
	doorFromEntranceToCave: createDoor(getCaveMap),
	doorFromCaveToEntrance: createDoor(getEntranceMap)
};

doors.startToCave.exit = doors.caveToStart;
doors.startToCave.position = { x: 12, y: 5 };
doors.caveToStart.exit = doors.startToCave;
doors.caveToStart.position = { x: 9, y: 8 };

doors.doorFromEntranceToCave.exit = doors.doorFromCaveToEntrance;
doors.doorFromEntranceToCave.position = { x: 8, y: 1 };
doors.doorFromCaveToEntrance.exit = doors.doorFromEntranceToCave;
doors.doorFromCaveToEntrance.position = { x: 8, y: 16 };


allMaps.entrance.surrounding_maps["w"] = getDesertMap;
allMaps.entrance.surrounding_maps["e"] = getGrassMap;
allMaps.entrance.surrounding_maps["n"] = getCaveMap;


// allMaps.start.surrounding_maps["w"] = getCaveMap;
// allMaps.start.surrounding_maps["n"] = getForestMap;

allMaps.cave.surrounding_maps["e"] = getGrassMap1;
allMaps.cave.surrounding_maps["s"] = getEntranceMap;

allMaps.grass.surrounding_maps["n"] = getGrassMap1;
allMaps.grass.surrounding_maps["e"] = getGrassMap2;
allMaps.grass.surrounding_maps["w"] = getEntranceMap;

allMaps.grass1.surrounding_maps["e"] = getGrassMap3;
allMaps.grass1.surrounding_maps["s"] = getGrassMap;
allMaps.grass1.surrounding_maps["w"] = getCaveMap;

allMaps.grass2.surrounding_maps["n"] = getGrassMap3;
allMaps.grass2.surrounding_maps["w"] = getGrassMap;

allMaps.grass3.surrounding_maps["s"] = getGrassMap2;
allMaps.grass3.surrounding_maps["w"] = getGrassMap1;

allMaps.desert.surrounding_maps["e"] = getEntranceMap;
allMaps.desert.surrounding_maps["w"] = getDesertMap1;

allMaps.desert1.surrounding_maps["n"] = getDesertMap2;
allMaps.desert1.surrounding_maps["e"] = getDesertMap;

allMaps.desert2.surrounding_maps["s"] = getDesertMap1;



allMaps.forest.surrounding_maps["s"] = getStartMap;


// TODO: make a general "initMap" function w/ a callback for adding crap

function getEntranceMap() {
	var m = allMaps.entrance;
	if (!m.initialized) {
		m.init();

		m.coverRegionWithTile(0, 0, 17, 1, createStoneBlock, false);
		m.coverRegionWithTile(0, 1, 8, 1, createStoneBlock, false);
		m.coverRegionWithTile(9, 1, 8, 1, createStoneBlock, false);
		m.addItemAtPoint(doors.doorFromEntranceToCave, doors.doorFromEntranceToCave.position, true);
		
	}
	return m;
}

gameData.map = getEntranceMap();

function getStartMap() {
	var m = allMaps.start;
	if (!m.initialized) {
		m.init();
		m.addItemAtPoint(createCoin(), { x: 10, y: 4 });
		m.addItemAtPoint(doors.startToCave, doors.startToCave.position, true);
		m.addItemAtPoint(createStoneBlock(), { x: 4, y: 4 });
		m.addItemAtPoint(createKnight(), { x: 5, y: 10 });
		m.addItemAtPoint(createKnight(), { x: 3, y: 10 });
		m.addItemAtPoint(createKnight(), { x: 7, y: 12 });
		m.addItemAtPoint(createKnight(), { x: 8, y: 6 });
		m.addItemAtPoint(createKey("startKey"), { x: 8, y: 4 });
		m.addItemAtPoint(createBeowulf(), { x: 5, y: 1});

		//example usage:
		// allMaps.start.coverRegionWithTile(1, 1, 2, 3, createGrass);
		//allMaps.start.coverRegionWithTile(1, 1, 2, 3, createKnight, false);
	}
	return m;
}

function getCaveMap() {
	var m = allMaps.cave;
	if (!m.initialized) {
		m.init();

		m.coverRegionWithTile(0, 16, 8, 1, createStoneBlock, false);
		m.coverRegionWithTile(9, 16, 8, 1, createStoneBlock, false);

		m.addItemAtPoint(createCoin(), { x: 11, y: 4 });
		m.addItemAtPoint(createCoin(), { x: 12, y: 5 });
		m.addItemAtPoint(createHealthPotion(), { x: 14, y: 5 });
		m.addItemAtPoint(createXpPotion(), { x: 15, y: 5 });
		m.addItemAtPoint(doors.doorFromCaveToEntrance, doors.doorFromCaveToEntrance.position, true);
		m.addItemAtPoint(createWeapon("woodenStaff", 3, itemImages.staff),{ x: 3, y: 2 });
		m.addItemAtPoint(createKnight(), { x: 5, y: 10 });
	}
	return m;
}

function getForestMap() {
	var m = allMaps.forest;
	if (!m.initialized) {
		m.init();
		m.coverRegionWithTile(0, 0, 17, 1, createShrubbery, false);
		m.coverRegionWithTile(0, 1, 1, 15, createShrubbery, false);
		m.coverRegionWithTile(16, 1, 1, 15, createShrubbery, false);

		m.addItemAtPoint(createWolf(), { x: 5, y: 10 });
		m.addItemAtPoint(createWolf(), { x: 10, y: 10 });
		m.addItemAtPoint(createWolf(), { x: 3, y: 8 });
	}
	return m;
}

function getGrassMap() {
	var m = allMaps.grass;
	if (!m.initialized) {
		m.init();

		m.addItemAtPoint(createWolf(), { x: 2, y: 8 });
		m.addItemAtPoint(createWolf(), { x: 4, y: 8 });
		m.addItemAtPoint(createWolf(), { x: 7, y: 5 });
		
	}
	return m;
}

function getGrassMap1() {
	var m = allMaps.grass1;
	if (!m.initialized) {
		m.init();

		m.coverRegionWithTile(0, 0, 17, 1, createShrubbery, false);

		m.addItemAtPoint(createCoin(), { x: 2, y: 8 });
		
		
	}
	return m;
}

function getGrassMap2() {
	var m = allMaps.grass2;
	if (!m.initialized) {
		m.init();

		m.addItemAtPoint(createWolf(), { x: 5, y: 9 });
		
		
	}
	return m;
}

function getGrassMap3() {
	var m = allMaps.grass3;
	if (!m.initialized) {
		m.init();

		m.coverRegionWithTile(0, 0, 4, 1, createShrubbery, false);

		m.addItemAtPoint(createCoin(), { x: 5, y: 2 });
		
		
	}
	return m;
}

function getDesertMap() {
	var m = allMaps.desert;
	if (!m.initialized) {
		m.init();

		m.addItemAtPoint(createKnight(), { x: 5, y: 10 });

		m.addItemAtPoint(createKnight(), { x: 3, y: 2 });
		
	}
	return m;
}

function getDesertMap1() {
	var m = allMaps.desert1;
	if (!m.initialized) {
		m.init();

		m.addItemAtPoint(createKnight(), { x: 5, y: 10 });
		
	}
	return m;
}

function getDesertMap2() {
	var m = allMaps.desert2;
	if (!m.initialized) {
		m.init();

		m.addItemAtPoint(createXpPotion(), { x: 4, y: 11 });
		
	}
	return m;
}

