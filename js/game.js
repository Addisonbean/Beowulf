// var canvas = document.getElementById("game-canvas");
// var ctx = canvas.getContext("2d");

// let m = allMaps.start;
// var m = new Map(ctx);
// m.init();
gameData.map = getStartMap();

loadImages(itemImages, urls, function() {

	document.addEventListener("keydown", function(e) {
		gameData.moveItem(gameData.player, e.keyCode);
	});

	// window.setInterval(gameData.map.update.bind(gameData.map), 200);
	window.setInterval(gameData.updateMap.bind(gameData), 200);

	gameData.map.draw();
	gameData.player.inventory.draw();
	gameData.stats.draw();
});

