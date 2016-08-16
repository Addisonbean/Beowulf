// var canvas = document.getElementById("game-canvas");
// var ctx = canvas.getContext("2d");

// let m = allMaps.start;
// var m = new Map(ctx);
// m.init();
var m = gameData.map;

loadImages(itemImages, urls, function() {

	console.log(gameData.canvas);

	document.addEventListener("keydown", function(e) {
		gameData.movePlayer(e.keyCode);
	});

	// document.addEventListener("keydown", function(e) {
	// 	m.movePlayer(e.keyCode);
	// });

	// m.addItemAtPoint(createCoin(), { x: 4, y: 4 });
	// m.addItemAtPoint(createCoin(), { x: 5, y: 4 });
	// m.addItemAtPoint(createCoin(), { x: 6, y: 4 });
	// m.addItemAtPoint(createCoin(), { x: 10, y: 8 });
	// m.addItemAtPoint(createCoin(), { x: 11, y: 7 });
	// m.addItemAtPoint(createDoor(), { x: 6, y: 12 });
	gameData.map.draw();
	gameData.map.player.inventory.draw();
});

