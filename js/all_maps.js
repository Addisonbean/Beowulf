gameData.player = createHero();

var allMaps = {
	// TODO:
	// start: new Map(gameData),
	// cave: new Map(gameData)
	start: new Map(gameData),
	cave: new Map(gameData)
};

// TODO: make a general "initMap" function w/ a callback for adding crap

function getStartMap() {
	var m = allMaps.start;
	if (!m.initialized) {
		allMaps.start.init();
		allMaps.start.addItemAtPoint(createCoin(), { x: 10, y: 4 });
		allMaps.start.addItemAtPoint(createDoor(getCaveMap), { x: 12, y: 5 });
		allMaps.start.addItemAtPoint(createStoneBlock(), { x: 4, y: 4 });
		allMaps.start.addItemAtPoint(createEnemy(), { x: 5, y: 10 });
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
	}
	return m;
}

