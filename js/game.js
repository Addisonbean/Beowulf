// var canvas = document.getElementById("game-canvas");
// var ctx = canvas.getContext("2d");

// let m = allMaps.start;
// var m = new Map(ctx);
// m.init();
gameData.map = getStartMap();

loadImages(itemImages, urls, function() {

	console.log(gameData.canvas);

	document.addEventListener("keydown", function(e) {
		gameData.movePlayer(e.keyCode);
	});

	gameData.map.draw();
	gameData.player.inventory.draw();
});

