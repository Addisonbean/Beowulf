var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");

var m = new Map(ctx);
m.init();

loadImages(itemImages, urls, function() {

	document.addEventListener("keydown", function(e) {
		console.log(e.keyCode);
		m.movePlayer(e.keyCode);
	});

	m.draw();
	m.movePlayer("left");
});

