function Map(gameData) {
	this.tileSize = 32;
	this.height = 17;
	this.width = 17;

	this.backgroundTiles = [];
	this.tiles = [];

	this.initialized = false;
	this.gameData = gameData;

	this.enemies = [];
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
	this.gameData.player.position = { x: (this.width - 1) / 2, y: (this.height - 1) / 2 };
	this.tiles[this.gameData.player.position.y][this.gameData.player.position.x] = this.gameData.player;
	this.initialized = true;
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
	item.position = point;
	if (item.constructor === Enemy) {
		this.enemies.push(item);
	}
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
	this.gameData.ctx.clearRect(pos.x * this.tileSize, pos.y * this.tileSize, size[0], size[1]);
	if (bgTile) {
		this.gameData.ctx.drawImage(bgTile.sprite, pos.x * this.tileSize, pos.y * this.tileSize);
	}
	if (tile) {
		this.gameData.ctx.drawImage(tile.sprite, pos.x * this.tileSize, pos.y * this.tileSize);
	}
};

Map.prototype.update = function() {
	for (var i = 0; i < this.enemies.length; i++) {
		if (Math.random() < 0.1) {
			var dir = [D_LEFT, D_RIGHT, D_UP, D_DOWN][Math.floor(Math.random() * 4)];
			this.gameData.moveItem(this.enemies[i], dir);
		}
	}
};

