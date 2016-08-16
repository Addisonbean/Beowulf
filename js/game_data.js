Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function GameData() {
	// player: 
	this.tileSize = 32
	this.mapWidth = 17
	this.mapHeight = 17
};

gameData = new GameData();

GameData.prototype.movePlayer = function(keyCode) {
	var oldPos = this.map.playerPosition;
	var newPos;
	switch (keyCode) {
		case 37:
			newPos = { x: oldPos.x - 1, y: oldPos.y };
			break;
		case 38:
			newPos = { x: oldPos.x, y: oldPos.y - 1 };
			break;
		case 39:
			newPos = { x: oldPos.x + 1, y: oldPos.y };
			break
		case 40:
			newPos = { x: oldPos.x, y: oldPos.y + 1 };
			break;
		default:
			return;
	}
	if (newPos.x < 0 || newPos.x + 1 > this.mapWidth || newPos.y < 0 || newPos.y + 1 > this.mapHeight) return;
	var item = this.map.tiles[newPos.y][newPos.x];
	if (item) {
		if (item.obtainable) {
			this.map.player.inventory.addItem(item);
		} else {
			item.collideWith(this.map.player);
			return;
		}
	}

	this.map.playerPosition = newPos;

	this.map.tiles[newPos.y][newPos.x] = this.map.player;
	this.map.tiles[oldPos.y][oldPos.x] = undefined;
	this.map.drawTileAtPosition(oldPos);
	this.map.drawTileAtPosition(newPos);
};

gameData.canvas = document.getElementById("game-canvas");
gameData.ctx = gameData.canvas.getContext("2d");

