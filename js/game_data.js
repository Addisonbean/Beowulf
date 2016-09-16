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
	this.tileSize = 32
	this.mapWidth = 17
	this.mapHeight = 17
};

gameData = new GameData();

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
	if (newPos.x < 0 || newPos.x + 1 > this.mapWidth || newPos.y < 0 || newPos.y + 1 > this.mapHeight) return false;

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

	item.position = newPos;

	this.map.tiles[newPos.y][newPos.x] = item;
	this.map.tiles[oldPos.y][oldPos.x] = undefined;
	this.map.drawTileAtPosition(oldPos);
	this.map.drawTileAtPosition(newPos);
	return true;
};

gameData.canvas = document.getElementById("game-canvas");
gameData.ctx = gameData.canvas.getContext("2d");

