gameData.player = createHero();

var allMaps = {
	start: new Map(gameData),
	cave: new Map(gameData)
};

var doors = {
	startToCave: createDoor(getCaveMap),
	caveToStart: createDoor(getStartMap)
};

doors.startToCave.exit = doors.caveToStart;
doors.startToCave.position = { x: 12, y: 5 };
doors.caveToStart.exit = doors.startToCave;
doors.caveToStart.position = { x: 9, y: 8 };

// TODO: make a general "initMap" function w/ a callback for adding crap

function getStartMap() {
	var m = allMaps.start;
	if (!m.initialized) {
		allMaps.start.init();
		allMaps.start.addItemAtPoint(createCoin(), { x: 10, y: 4 });
		allMaps.start.addItemAtPoint(doors.startToCave, doors.startToCave.position, true);
		allMaps.start.addItemAtPoint(createStoneBlock(), { x: 4, y: 4 });
		allMaps.start.addItemAtPoint(createEnemy(), { x: 5, y: 10 });
		allMaps.start.addItemAtPoint(createEnemy(), { x: 3, y: 10 });
		allMaps.start.addItemAtPoint(createEnemy(), { x: 7, y: 12 });
		allMaps.start.addItemAtPoint(createEnemy(), { x: 8, y: 6 });
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
		allMaps.cave.addItemAtPoint(doors.caveToStart, doors.caveToStart.position, true);
	}
	return m;
}

