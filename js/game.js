var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");

var m = new Map(ctx);
m.init();

loadImages(itemImages, urls, function() {

	document.addEventListener("keydown", function(e) {
		m.movePlayer(e.keyCode);
	});

	m.addItemAtPoint(createCoin(), { x: 4, y: 4 });
	m.addItemAtPoint(createCoin(), { x: 5, y: 4 });
	m.addItemAtPoint(createCoin(), { x: 6, y: 4 });
	m.addItemAtPoint(createCoin(), { x: 10, y: 8 });
	m.addItemAtPoint(createCoin(), { x: 11, y: 7 });
	m.draw();
	m.player.inventory.draw();
});

