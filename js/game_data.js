Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function GameData() {
	// this.player = createHero();
	this.player = undefined;
	this.map = undefined;
	this.playerPosition = { x: 0, y: 0 };
	this.tileSize = 32
	this.mapWidth = 17
	this.mapHeight = 17
};

gameData = new GameData();

GameData.prototype.movePlayer = function(keyCode) {
	var oldPos = this.playerPosition;
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
			this.player.inventory.addItem(item);
		} else {
			item.collideWith(this.player);
			return;
		}
	}

	this.playerPosition = newPos;

	this.map.tiles[newPos.y][newPos.x] = this.player;
	this.map.tiles[oldPos.y][oldPos.x] = undefined;
	this.map.drawTileAtPosition(oldPos);
	this.map.drawTileAtPosition(newPos);
};

gameData.canvas = document.getElementById("game-canvas");
gameData.ctx = gameData.canvas.getContext("2d");

