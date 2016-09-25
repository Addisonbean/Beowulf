// window.setInterval = function (vCallback, nDelay /*, argumentToPass1, argumentToPass2, etc. */) {
// 	var oThis = this, aArgs = Array.prototype.slice.call(arguments, 2);
// 	return __nativeSI__(vCallback instanceof Function ? function () {
// 		vCallback.apply(oThis, aArgs);
// 	} : vCallback, nDelay);
// };

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

var D_LEFT = 37, D_RIGHT = 39, D_UP = 38, D_DOWN = 40;

function GameData() {
	// this.player = createHero();
	this.player = undefined;
	this.map = undefined;
	this.tileSize = 32;
	this.mapWidth = 17;
	this.mapHeight = 17;
	this.stats = undefined;
};

gameData = new GameData();
gameData.stats = new Stats(gameData);

GameData.prototype.moveItem = function(item, keyCode) {
	var oldPos = item.position;
	var newPos;
	switch (keyCode) {
		case D_LEFT:
			newPos = { x: oldPos.x - 1, y: oldPos.y };
			break;
		case D_UP:
			newPos = { x: oldPos.x, y: oldPos.y - 1 };
			break;
		case D_RIGHT:
			newPos = { x: oldPos.x + 1, y: oldPos.y };
			break
		case D_DOWN:
			newPos = { x: oldPos.x, y: oldPos.y + 1 };
			break;
		default:
			return false;
	}
	if (newPos.x < 0 || newPos.x + 1 > this.mapWidth || newPos.y < 0 || newPos.y + 1 > this.mapHeight) {
		if (item != this.player) return false;
		if (newPos.x < 0 && this.map.surrounding_maps["w"]) {
			var m = this.map.surrounding_maps["w"];
			this.player.gotoMap(m, { x: m().width - 1, y: newPos.y })
		}
		if (newPos.x >= this.map.width && this.map.surrounding_maps["e"]) {
			var m = this.map.surrounding_maps["e"];
			this.player.gotoMap(m, { x: 0, y: newPos.y })
		}
		if (newPos.y < 0 && this.map.surrounding_maps["n"]) {
			var m = this.map.surrounding_maps["n"];
			this.player.gotoMap(m, { x: newPos.x, y: m().height - 1 })
		}
		if (newPos.y >= this.map.height && this.map.surrounding_maps["s"]) {
			var m = this.map.surrounding_maps["s"];
			this.player.gotoMap(m, { x: newPos.x, y: 0 })
		}
		return false;
	}

	var itemFound = this.map.tiles[newPos.y][newPos.x];
	if (itemFound) {
		if (item === this.player) { 
			if (itemFound.obtainable) {
				this.player.inventory.addItem(itemFound);
			} else if (!itemFound.collideWith(item, keyCode)) {
				return false;
			}
		} else { return false };
	}

	var bgItemFound = this.map.backgroundTiles[newPos.y][newPos.x];
	if (bgItemFound) {
		if (item === this.player && bgItemFound.obtainable) {
			this.player.inventory.addItem(bgItemFound);
		} else if(!bgItemFound.collideWith(item, keyCode)) {
			return false
		}
	}

	item.position = newPos;

	this.map.tiles[newPos.y][newPos.x] = item;
	this.map.tiles[oldPos.y][oldPos.x] = undefined;
	this.map.drawTileAtPosition(oldPos);
	this.map.drawTileAtPosition(newPos);

	return true;
};

GameData.prototype.updateMap = function() {
	this.map.update();
};

function isRetinaDisplay() {
	if (window.matchMedia) {
		var mq = window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
		return (mq && mq.matches || (window.devicePixelRatio > 1)); 
	}
}

gameData.canvas = document.getElementById("game-canvas");
gameData.ctx = gameData.canvas.getContext("2d");

if (isRetinaDisplay) {
	gameData.canvas.width *= 2;
	gameData.canvas.height *= 2;
	gameData.canvas.style.width = "694px";
	gameData.canvas.style.height = "584px";
	gameData.ctx.scale(2, 2);
}

