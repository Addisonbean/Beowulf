<<<<<<< HEAD
//gameData.map = getEntranceMap();
//gameData.map = getIceMap3();
gameData.map = getForestMap3();
=======
gameData.map = getEntranceMap();
>>>>>>> d3ec53673aaac77ac08c116543cba5b71d34952a

var canGiveInput = true;
// Waits until the images have loaded to do anything
loadImages(itemImages, urls, function() {
	document.addEventListener("keydown", function(e) {
		if (canGiveInput === true) {
			if ([D_LEFT, D_RIGHT, D_UP, D_DOWN].includes(e.keyCode)) {gameData.moveItem(gameData.player, e.keyCode);}
			if (e.keyCode >= 48 && e.keyCode <= 57 || [65, 83, 68, 70].includes(e.keyCode)) {gameData.player.inventory.useItem(e.keyCode);}
		}

	});

	// Update the map every 1/5 of a second (every 200 miliseconds)
	window.setInterval(gameData.updateMap.bind(gameData), 200);

	// Add the player in the center of the current map
	gameData.map.addItemAtPoint(this.gameData.player, { x: (gameData.map.width - 1) / 2, y: (gameData.map.height - 1) / 2 });

	// Draw crap
	gameData.map.draw();
	gameData.player.inventory.draw();
	gameData.stats.draw();
	gameData.console.draw();
});

