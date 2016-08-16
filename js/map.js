function Map(gameData) {
	this.tileSize = 32;
	this.height = 17;
	this.width = 17;

	this.backgroundTiles = [];
	this.tiles = [];

	this.playerPosition = { x: 0, y: 0 };
	this.player = createHero();

	this.initialized = false;
	this.gameData = gameData;
}

Map.prototype.init = function() {
	this.tiles = [];
	for (var y = 0; y < this.height; y++) {
		this.tiles.push([]);
		for (var x = 0; x < this.width; x++) {
			this.tiles[y][x] = undefined;
		}
	}
	this.backgroundTiles = [];
	for (var y = 0; y < this.height; y++) {
		this.backgroundTiles.push([]);
		for (var x = 0; x < this.width; x++) {
			this.backgroundTiles[y][x] = createPebble();
		}
	}
	this.playerPosition = { x: (this.width - 1) / 2, y: (this.height - 1) / 2 }
	this.tiles[this.playerPosition.y][this.playerPosition.x] = this.player;
};

Map.prototype.draw = function() {
	for (var y = 0; y < this.height; y++) {
		for (var x = 0; x < this.width; x++) {
			var tile = this.backgroundTiles[y][x];
			this.gameData.ctx.drawImage(tile.sprite, x * this.tileSize, y * this.tileSize);
		}
	}
	for (var y = 0; y < this.height; y++) {
		for (var x = 0; x < this.width; x++) {
			var tile = this.tiles[y][x];
			if (!tile) { continue }
			this.gameData.ctx.drawImage(tile.sprite, x * this.tileSize, y * this.tileSize);
		}
	}
};

Map.prototype.addItemAtPoint = function(item, point) {
	this.tiles[point.y][point.x] = item;
	for (var y = point.y + 1; y < point.y + item.height; y++) {
		for (var x = point.x + 1; x < point.x + item.width; x++) {
			this.tiles[y][x] = { x: point.x, y: point.y };
		}
	}
};

Map.prototype.getItemAtPoint = function(point) {
	let item = this.tiles[point.y][point.x];
	if (Item.prototype.isPrototypeOf(item)) {
		return item;
	} else {
		return this.getItemAtPoint(item);
	}
};

Map.prototype.prettyPrint = function() {
	for (var y = 0; y < this.height; y++) {
		var strs = [];
		for (var x = 0; x < this.width; x++) {
			strs.push(this.getItemAtPoint({ x: x, y: y }));
		}
		console.log(strs.join(" "));
	}
};

Map.prototype.drawTileAtPosition = function(pos) {
	var bgTile = this.backgroundTiles[pos.y][pos.x];
	var tile = this.tiles[pos.y][pos.x];
	var size = tile ? [tile.width, tile.height] : [this.tileSize, this.tileSize];
	gameData.ctx.clearRect(pos.x * this.tileSize, pos.y * this.tileSize, size[0], size[1]);
	if (bgTile) {
		this.gameData.ctx.drawImage(bgTile.sprite, pos.x * this.tileSize, pos.y * this.tileSize);
	}
	if (tile) {
		this.gameData.ctx.drawImage(tile.sprite, pos.x * this.tileSize, pos.y * this.tileSize);
	}
};

// TODO: bounds check
Map.prototype.movePlayer = function(keyCode) {
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
	if (newPos.x < 0 || newPos.x + 1 > this.width || newPos.y < 0 || newPos.y + 1 > this.height) return;
	var item = this.tiles[newPos.y][newPos.x];
	if (item) {
		if (item.obtainable) {
			this.player.inventory.addItem(item);
		} else {
			item.collideWith(this.player);
			return;
		}
	}

	this.playerPosition = newPos;

	this.tiles[newPos.y][newPos.x] = this.player;
	this.tiles[oldPos.y][oldPos.x] = undefined;
	this.drawTileAtPosition(oldPos);
	this.drawTileAtPosition(newPos);
};

